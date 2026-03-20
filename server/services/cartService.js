// SERVICE-FIL - Behandlar den service/tjänster (funktioner) som i detta fall kundvagnen erbjuder. 

const db = require('../models'); // Modellerna hämtas in, så att vi kan använda dem i tjänsten.
const {
	createResponseSuccess,
	createResponseError,
	createResponseMessage
} = require('../helpers/responseHelper'); // Hjälpfunktioner för att skapa enhetliga svar från tjänsten. 
// Dessa används i alla funktioner nedan för att skapa svar som skickas tillbaka till klienten.

// Funktion #1 - Hämta den aktiva kundvagnen för en användare, eller skapa en ny om ingen finns.
async function getActiveCartByUser(userId) {
	if (!userId) {
		return createResponseError(422, 'userId är obligatoriskt.');
	}

	try {
		const user = await db.user.findByPk(userId);
		if (!user) {
			return createResponseError(404, 'Hittade ingen användare.');
		}

		const cart = await _getOrCreateActiveCart(userId);
		const fullCart = await _getCartWithRows(cart.id);
		return createResponseSuccess(_formatCart(fullCart));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

// Funktion #2 - Hämta en kundvagn baserat på dess ID.
async function getCartById(cartId) {
	if (!cartId) {
		return createResponseError(422, 'cartId är obligatoriskt.');
	}

	try {
		const cart = await _getCartWithRows(cartId);
		if (!cart) {
			return createResponseError(404, 'Hittade ingen kundvagn.');
		}
		return createResponseSuccess(_formatCart(cart));
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

// Funktion #3 - Lägg till en produkt i kundvagnen, eller uppdatera mängden om produkten redan finns i vagnen.
async function addProduct(userId, productId, amount = 1) {
	if (!userId || !productId) {
		return createResponseError(422, 'userId och productId är obligatoriska.');
	}

	const parsedAmount = Number(amount);
	if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
		return createResponseError(422, 'amount måste vara större än 0.');
	}

	const transaction = await db.sequelize.transaction();
	try {
		const user = await db.user.findByPk(userId, { transaction });
		if (!user) {
			await transaction.rollback();
			return createResponseError(404, 'Hittade ingen användare.');
		}

		const product = await db.product.findByPk(productId, { transaction });
		if (!product) {
			await transaction.rollback();
			return createResponseError(404, 'Hittade ingen produkt.');
		}

		const cart = await _getOrCreateActiveCart(userId, transaction);
		const existingRow = await db.cartRow.findOne({
			where: { cartId: cart.id, productId },
			transaction
		});

		if (existingRow) {
			existingRow.amount += parsedAmount;
			await existingRow.save({ transaction });
		} else {
			await db.cartRow.create(
				{
					cartId: cart.id,
					productId,
					amount: parsedAmount
				},
				{ transaction }
			);
		}

		await transaction.commit();

		const fullCart = await _getCartWithRows(cart.id);
		return createResponseSuccess(_formatCart(fullCart));
	} catch (error) {
		await transaction.rollback();
		return createResponseError(error.status, error.message);
	}
}

// Funktion #4 - Uppdatera mängden av en specifik varurad i kundvagnen.
async function updateRowAmount(userId, cartRowId, amount) {
	if (!userId || !cartRowId) {
		return createResponseError(422, 'userId och cartRowId är obligatoriska.');
	}

	const parsedAmount = Number(amount);
	if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
		return createResponseError(422, 'amount måste vara större än 0.');
	}

	const transaction = await db.sequelize.transaction();
	try {
		const row = await db.cartRow.findOne({
			where: { id: cartRowId },
			include: [db.cart],
			transaction
		});

		if (!row) {
			await transaction.rollback();
			return createResponseError(404, 'Hittade ingen varurad.');
		}
		if (row.cart.userId !== Number(userId)) {
			await transaction.rollback();
			return createResponseError(403, 'Ingen behörighet att ändra denna varurad.');
		}
		if (row.cart.payed) {
			await transaction.rollback();
			return createResponseError(409, 'Kundvagnen är redan betalad.');
		}

		row.amount = parsedAmount;
		await row.save({ transaction });
		await transaction.commit();

		const fullCart = await _getCartWithRows(row.cart.id);
		return createResponseSuccess(_formatCart(fullCart));
	} catch (error) {
		await transaction.rollback();
		return createResponseError(error.status, error.message);
	}
}

// Funktion #5 - Ta bort en varurad från kundvagnen.
async function removeRow(userId, cartRowId) {
	if (!userId || !cartRowId) {
		return createResponseError(422, 'userId och cartRowId är obligatoriska.');
	}

	const transaction = await db.sequelize.transaction();
	try {
		const row = await db.cartRow.findOne({
			where: { id: cartRowId },
			include: [db.cart],
			transaction
		});

		if (!row) {
			await transaction.rollback();
			return createResponseError(404, 'Hittade ingen varurad.');
		}
		if (row.cart.userId !== Number(userId)) {
			await transaction.rollback();
			return createResponseError(403, 'Ingen behörighet att ta bort denna varurad.');
		}
		if (row.cart.payed) {
			await transaction.rollback();
			return createResponseError(409, 'Kundvagnen är redan betalad.');
		}

		const cartId = row.cart.id;
		await row.destroy({ transaction });
		await transaction.commit();

		const fullCart = await _getCartWithRows(cartId);
		return createResponseSuccess(_formatCart(fullCart));
	} catch (error) {
		await transaction.rollback();
		return createResponseError(error.status, error.message);
	}
}

// Funktion #6 - Töm kundvagnen genom att ta bort alla varor.
async function clearCart(userId) {
	if (!userId) {
		return createResponseError(422, 'userId är obligatoriskt.');
	}

	const transaction = await db.sequelize.transaction();
	try {
		const cart = await db.cart.findOne({
			where: { userId, payed: false },
			transaction
		});

		if (!cart) {
			await transaction.rollback();
			return createResponseError(404, 'Hittade ingen aktiv kundvagn.');
		}

		await db.cartRow.destroy({ where: { cartId: cart.id }, transaction });
		await transaction.commit();

		const fullCart = await _getCartWithRows(cart.id);
		return createResponseSuccess(_formatCart(fullCart));
	} catch (error) {
		await transaction.rollback();
		return createResponseError(error.status, error.message);
	}
}

// Funktion #7 - Checka ut kundvagnen genom att markera den som betalad.
async function checkout(userId) {
	if (!userId) {
		return createResponseError(422, 'userId är obligatoriskt.');
	}

	const transaction = await db.sequelize.transaction();
	try {
		const cart = await db.cart.findOne({
			where: { userId, payed: false },
			include: [
				{
					model: db.cartRow,
					include: [db.product]
				}
			],
			transaction
		});

		if (!cart) {
			await transaction.rollback();
			return createResponseError(404, 'Hittade ingen aktiv kundvagn.');
		}
		if (!cart.cartRows || cart.cartRows.length === 0) {
			await transaction.rollback();
			return createResponseError(409, 'Kundvagnen är tom och kan inte checkas ut.');
		}

		cart.payed = true;
		await cart.save({ transaction });
		await transaction.commit();

		const payedCart = await _getCartWithRows(cart.id);
		return createResponseSuccess(_formatCart(payedCart));
	} catch (error) {
		await transaction.rollback();
		return createResponseError(error.status, error.message);
	}
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion hämtar en kundvagn med alla dess varurader och tillhörande produktinfo, 
// baserat på kundvagnens ID.
async function _getCartWithRows(cartId) {
	return db.cart.findByPk(cartId, {
		include: [
			{
				model: db.cartRow,
				include: [db.product]
			}
		]
	});
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion hämtar den aktiva kundvagnen för en användare, 
// eller skapar en ny om ingen aktiv kundvagn finns.
async function _getOrCreateActiveCart(userId, transaction) {
	let cart = await db.cart.findOne({
		where: { userId, payed: false },
		transaction
	});

	if (!cart) {
		cart = await db.cart.create(
			{
				userId,
				payed: false
			},
			{ transaction }
		);
	}

	return cart;
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion formaterar en kundvagnsdata till ett mer användarvänligt format, 
// inklusive beräkning av totalsummor och strukturering av varurader.
function _formatCart(cart) {
	const rows = (cart.cartRows || []).map((row) => {
		const unitPrice = Number(row.product?.price || 0);
		const quantity = Number(row.amount || 0);
		return {
			id: row.id,
			amount: quantity,
			lineTotal: unitPrice * quantity,
			product: {
				id: row.product?.id,
				productName: row.product?.productName,
				price: unitPrice,
				imageUrl: row.product?.imageUrl
			}
		};
	});

	const totalAmount = rows.reduce((sum, row) => sum + row.amount, 0);
	const totalPrice = rows.reduce((sum, row) => sum + row.lineTotal, 0);

	return {
		id: cart.id,
		userId: cart.userId,
		payed: cart.payed,
		totalAmount,
		totalPrice,
		rows
	};
}


// Här ser vi de node-moduler som exporterats till denna fil.
// Node-mudulerna i detta sammanhang är färdiga funktioner som är användbara 
// i kundvagn-tjänsten. 
module.exports = {
	getActiveCartByUser,
	getCartById,
	addProduct,
	updateRowAmount,
	removeRow,
	clearCart,
	checkout
};
import axios from './api';

/* Funktion för att hämta den inloggade användarens varukorg */
export async function getMyCart() {
	try {
		const response = await axios.get('/carts/me');
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}
/* Funktion för att hämta en varukorg baserat på dess ID */
export async function getCartById(id) {
	try {
		const response = await axios.get(`/carts/${id}`);
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}
/* Funktion för att lägga till en produkt i den inloggade användarens varukorg */
export async function addProductToCart(productId, amount = 1) {
	try {
		const response = await axios.post('/carts/me/rows', { productId, amount });
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

/* Funktion för att uppdatera mängden av en produkt i den inloggade användarens varukorg */
export async function updateCartRowAmount(rowId, amount) {
	try {
		const response = await axios.put(`/carts/me/rows/${rowId}`, { amount });
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

/* Funktion för att ta bort en produkt från den inloggade användarens varukorg */
export async function removeCartRow(rowId) {
	try {
		const response = await axios.delete(`/carts/me/rows/${rowId}`);
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

/* Funktion för att tömma den inloggade användarens varukorg */
export async function clearCart() {
	try {
		const response = await axios.delete('/carts/me/rows');
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}
/* Funktion för att genomföra checkout för den inloggade användarens varukorg */
export async function checkoutCart() {
	try {
		const response = await axios.post('/carts/me/checkout');
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

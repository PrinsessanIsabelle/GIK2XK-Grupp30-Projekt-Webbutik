// ROUTES-FIL för kundvagnshantering.
// Här hanteras alla endpoints relaterade till kundvagnen. 

const router = require('express').Router(); // Routern skapas från Express.
const db = require('../models'); // Modellerna hämtas in.
const cartService = require('../services/cartService'); // CartService hämtas in, för att kunna anropa funktioner.
const { requireAuthenticatedUser } = require('../helpers/authHelper'); // Använder hjälpfunktion för att kräva att användaren är inloggad för att använda dessa endpoints.

// Endpoint #1 - Hämta den aktiva kundvagnen för den inloggade användaren
router.get('/me', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.getActiveCartByUser(req.authUserId);
	res.status(result.status).json(result.data);
});

// Endpoint #2 - Hämta en specifik kundvagn (endast om den tillhör den inloggade användaren)
router.get('/:id', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.getCartById(req.params.id);
	if (result.status !== 200) {
		return res.status(result.status).json(result.data);
	}

	if (result.data.userId !== Number(req.authUserId)) {
		return res.status(403).json({ error: 'Ingen behörighet till denna kundvagn.' });
	}

	return res.status(result.status).json(result.data);
});

// Endpoint #3 - Lägg till en produkt i den aktiva kundvagnen för den inloggade användaren
router.post('/me/rows', requireAuthenticatedUser, async (req, res) => {
	const { productId, amount } = req.body;
	const result = await cartService.addProduct(req.authUserId, productId, amount);
	res.status(result.status).json(result.data);
});

// Endpoint #4 - Uppdatera mängden av en produkt i kundvagnen
router.put('/me/rows/:rowId', requireAuthenticatedUser, async (req, res) => {
	const { amount } = req.body;
	const result = await cartService.updateRowAmount(req.authUserId, req.params.rowId, amount);
	res.status(result.status).json(result.data);
});

// Endpoint #5 - Ta bort en produkt från kundvagnen
router.delete('/me/rows/:rowId', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.removeRow(req.authUserId, req.params.rowId);
	res.status(result.status).json(result.data);
});

// Endpoint #6 - Töm/ta bort kundvagnen
router.delete('/me/rows', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.clearCart(req.authUserId);
	res.status(result.status).json(result.data);
});

// Endpoint #7 - Genomför köp/checkout av kundvagnen
router.post('/me/checkout', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.checkout(req.authUserId);
	res.status(result.status).json(result.data);
});

module.exports = router;
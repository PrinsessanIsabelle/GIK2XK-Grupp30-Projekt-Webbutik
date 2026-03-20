const router = require('express').Router();
const cartService = require('../services/cartService');
const { requireAuthenticatedUser } = require('../helpers/authHelper');

router.get('/me', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.getActiveCartByUser(req.authUserId);
	res.status(result.status).json(result.data);
});

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

router.post('/me/rows', requireAuthenticatedUser, async (req, res) => {
	const { productId, amount } = req.body;
	const result = await cartService.addProduct(req.authUserId, productId, amount);
	res.status(result.status).json(result.data);
});

router.put('/me/rows/:rowId', requireAuthenticatedUser, async (req, res) => {
	const { amount } = req.body;
	const result = await cartService.updateRowAmount(req.authUserId, req.params.rowId, amount);
	res.status(result.status).json(result.data);
});

router.delete('/me/rows/:rowId', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.removeRow(req.authUserId, req.params.rowId);
	res.status(result.status).json(result.data);
});

router.delete('/me/rows', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.clearCart(req.authUserId);
	res.status(result.status).json(result.data);
});

router.post('/me/checkout', requireAuthenticatedUser, async (req, res) => {
	const result = await cartService.checkout(req.authUserId);
	res.status(result.status).json(result.data);
});

module.exports = router;
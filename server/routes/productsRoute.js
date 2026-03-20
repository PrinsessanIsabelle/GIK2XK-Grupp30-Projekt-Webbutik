const router = require('express').Router();
const productService = require('../services/productService');
const ratingService = require('../services/ratingService');
const { requireAuthenticatedUser } = require('../helpers/authHelper');

router.get('/category/:name', async (req, res) => {
    const result = await productService.getByCategory(req.params.name);
    res.status(result.status).json(result.data);
});

router.get('/:id/ratings/summary', async (req, res) => {
  const result = await ratingService.getProductRatingSummary(req.params.id);
  res.status(result.status).json(result.data);
});

router.get('/:id/ratings', async (req, res) => {
  const result = await ratingService.getRatingsByProduct(req.params.id);
  res.status(result.status).json(result.data);
});

router.post('/:id/ratings', requireAuthenticatedUser, async (req, res) => {
  const result = await ratingService.createRating(req.authUserId, req.params.id, req.body);
  res.status(result.status).json(result.data);
});

router.put('/ratings/:ratingId', requireAuthenticatedUser, async (req, res) => {
  const result = await ratingService.updateOwnRating(req.authUserId, req.params.ratingId, req.body);
  res.status(result.status).json(result.data);
});

router.delete('/ratings/:ratingId', requireAuthenticatedUser, async (req, res) => {
  const result = await ratingService.deleteOwnRating(req.authUserId, req.params.ratingId);
  res.status(result.status).json(result.data);
});

router.get('/:id', async (req, res) => {
  const result = await productService.getById(req.params.id);
  res.status(result.status).json(result.data);
});

router.get('/', async (req, res) => {
  const result = await productService.getAll();
  res.status(result.status).json(result.data);
});

router.post('/', requireAuthenticatedUser, async (req, res) => {
  const result = await productService.create(req.body);
  res.status(result.status).json(result.data);
});

router.put('/:id', requireAuthenticatedUser, async (req, res) => {
  const result = await productService.update(req.body, req.params.id);
  res.status(result.status).json(result.data);
});

router.delete('/:id', requireAuthenticatedUser, async (req, res) => {
  const result = await productService.destroy(req.params.id);
  res.status(result.status).json(result.data);
});

module.exports = router;

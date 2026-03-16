const router = require('express').Router();
const productService = require('../services/productService');
const db = require('../models');

router.post('/:id/addRating', async (req, res) => {
  const result = await productService.addRating(req.params.id, req.body);
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

router.post('/', async (req, res) => {
  const result = await productService.create(req.body);
  res.status(result.status).json(result.data);
});

router.put('/:id', async (req, res) => {
  const result = await productService.update(req.body, req.params.id);
  res.status(result.status).json(result.data);
});

router.delete('/:id', async (req, res) => {
  const result = await productService.destroy(req.params.id);
  res.status(result.status).json(result.data);
});

module.exports = router;

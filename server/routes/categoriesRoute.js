const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService.js');
const { requireAuthenticatedUser } = require('../helpers/authHelper');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');

router.get('/:name/products', async (req, res) => {
  const result = await productService.getByCategory(req.params.name);
  res.status(result.status).json(result.data);
});

router.get('/', async (req, res) => {
  try {
    const categories = await db.category.findAll();
    const result = createResponseSuccess(categories);
    res.status(result.status).json(result.data);
  } catch (error) {
    const result = createResponseError(error.status, error.message);
    res.status(result.status).json(result.data);
  }
});

router.post('/', requireAuthenticatedUser, async (req, res) => {
  try {
    const category = await db.category.create(req.body);
    const result = createResponseSuccess(category);
    res.status(result.status).json(result.data);
  } catch (error) {
    const result = createResponseError(error.status, error.message);
    res.status(result.status).json(result.data);
  }
});

router.delete('/:id', requireAuthenticatedUser, async (req, res) => {
  try {
    const deletedRows = await db.category.destroy({ where: { id: req.params.id } });
    if (!deletedRows) {
      const notFound = createResponseError(404, 'Hittade ingen kategori att radera.');
      return res.status(notFound.status).json(notFound.data);
    }

    const result = createResponseMessage(200, 'Kategorin borttagen');
    return res.status(result.status).json(result.data);
  } catch (error) {
    const result = createResponseError(error.status, error.message);
    return res.status(result.status).json(result.data);
  }
});

module.exports = router;

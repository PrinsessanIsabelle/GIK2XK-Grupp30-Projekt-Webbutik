// ROUTES-FIL för kategorier.
// Här hanteras alla endpoints relaterade till kategorier.

const router = require('express').Router(); // Routern skapas från Express.
const db = require('../models'); // Modellerna hämtas in.
const productService = require('../services/productService.js'); // ProductService hämtas in, för att kunna anropa funktioner.
const { requireAuthenticatedUser } = require('../helpers/authHelper'); // Använder hjälpfunktion för att kräva att användaren är inloggad för att använda vissa endpoints.
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper'); // Använder hjälpfunktioner för att skapa enhetliga API-responser (success, error etc från servern).

// Endpoint #1 - Hämta alla produkter inom en kategori.
router.get('/:name/products', async (req, res) => {
  const result = await productService.getByCategory(req.params.name);
  res.status(result.status).json(result.data);
});

// Endpoint #2 - Hämta alla kategorier.
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

// Endpoint #3 - Skapa en ny kategori (endast för inloggade användare).
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

// Endpoint #4 - Radera en kategori (endast för inloggade användare).
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

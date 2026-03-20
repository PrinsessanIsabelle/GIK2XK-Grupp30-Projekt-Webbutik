// ROUTES-FIL för produkter.
// Här hanteras alla endpoints relaterade till produkter.

const router = require('express').Router(); // Routern skapas från Express.
const db = require('../models'); // Modellerna hämtas in.
const productService = require('../services/productService'); // ProductService hämtas in, för att kunna anropa funktioner.
const ratingService = require('../services/ratingService'); // RatingService hämtas in, för att kunna anropa funktioner relaterade till produktbetyg.
const { requireAuthenticatedUser } = require('../helpers/authHelper'); // Använder hjälpfunktion för att kräva att användaren är inloggad. 

// Endpoint #1 - Hämta alla produkter inom en kategori.
router.get('/category/:name', async (req, res) => {
    const result = await productService.getByCategory(req.params.name);
    res.status(result.status).json(result.data);
});

// Endpoint #2 - Hämta en specifik produkt med dess detaljer.
router.get('/:id/ratings/summary', async (req, res) => {
  const result = await ratingService.getProductRatingSummary(req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #3 - Hämta alla betyg för en specifik produkt.
router.get('/:id/ratings', async (req, res) => {
  const result = await ratingService.getRatingsByProduct(req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #4 - Skapa ett nytt betyg för en produkt (endast för inloggade användare).
router.post('/:id/ratings', requireAuthenticatedUser, async (req, res) => {
  const result = await ratingService.createRating(req.authUserId, req.params.id, req.body);
  res.status(result.status).json(result.data);
});

// Endpoint #5 - Uppdatera ett eget betyg för en produkt (endast för inloggade användare).
router.put('/ratings/:ratingId', requireAuthenticatedUser, async (req, res) => {
  const result = await ratingService.updateOwnRating(req.authUserId, req.params.ratingId, req.body);
  res.status(result.status).json(result.data);
});

// Endpoint #6 - Ta bort ett eget betyg för en produkt (endast för inloggade användare).
router.delete('/ratings/:ratingId', requireAuthenticatedUser, async (req, res) => {
  const result = await ratingService.deleteOwnRating(req.authUserId, req.params.ratingId);
  res.status(result.status).json(result.data);
});

// Endpoint #7 - Hämta en specifik produkt med dess detaljer.
router.get('/:id', async (req, res) => {
  const result = await productService.getById(req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #8 - Hämta alla produkter.
router.get('/', async (req, res) => {
  const result = await productService.getAll();
  res.status(result.status).json(result.data);
});

// Endpoint #9 - Skapa en ny produkt (endast för inloggade användare).
router.post('/', requireAuthenticatedUser, async (req, res) => {
  const result = await productService.create(req.body);
  res.status(result.status).json(result.data);
});

// Endpoint #10 - Uppdatera en produkt (endast för inloggade användare).
router.put('/:id', requireAuthenticatedUser, async (req, res) => {
  const result = await productService.update(req.body, req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #11 - Radera en produkt (endast för inloggade användare).
router.delete('/:id', requireAuthenticatedUser, async (req, res) => {
  const result = await productService.destroy(req.params.id);
  res.status(result.status).json(result.data);
});

module.exports = router;

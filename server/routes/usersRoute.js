// ROUTES-FIL för användare.
// Här hanteras alla endpoints relaterade till användare.

const router = require('express').Router(); // Routern skapas från Express.
const db = require('../models'); // Modellerna hämtas in.
const userService = require('../services/userService'); // UserService hämtas in, för att kunna anropa funktioner relaterade till användare.
const { requireAuthenticatedUser } = require('../helpers/authHelper'); // Använder hjälpfunktion för att kräva att användaren är inloggad.

// Endpoint #1 - Hämta alla användare.
router.get('/', async (req, res) => {
  const result = await userService.getAll();
  res.status(result.status).json(result.data);
});

// Endpoint #2 - Hämta en specifik användare med dess detaljer.
router.get('/:id', async (req, res) => {
  const result = await userService.getById(req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #3 - Hämta en specifik användare med dess betyg.
router.get('/:id/ratings', async (req, res) => {
  const result = await userService.getUserWithRatings(req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #4 - Skapa en ny användare.
router.post('/', async (req, res) => {
  const result = await userService.create(req.body);
  res.status(result.status).json(result.data);
});

// Endpoint #5 - Uppdatera en användare (endast för inloggade användare).
router.put('/:id', requireAuthenticatedUser, async (req, res) => {
  if (Number(req.params.id) !== Number(req.authUserId)) {
    return res.status(403).json({ error: 'Du kan bara uppdatera ditt eget konto.' });
  }
  const result = await userService.update(req.body, req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #6 - Ta bort en användare (endast för inloggade användare).
router.delete('/:id', requireAuthenticatedUser, async (req, res) => {
  if (Number(req.params.id) !== Number(req.authUserId)) {
    return res.status(403).json({ error: 'Du kan bara ta bort ditt eget konto.' });
  }
  const result = await userService.destroy(req.params.id);
  res.status(result.status).json(result.data);
});

// Endpoint #7 - Logga in
router.post('/login', async (req, res) => {
    const result = await userService.login(req.body);
    res.status(result.status).json(result.data);
});

module.exports = router;

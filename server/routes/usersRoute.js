const router = require('express').Router();
const userService = require('../services/userService');

router.get('/', async (req, res) => {
  const result = await userService.getAll();
  res.status(result.status).json(result.data);
});

router.get('/:id', async (req, res) => {
  const result = await userService.getById(req.params.id);
  res.status(result.status).json(result.data);
});

router.get('/:id/ratings', async (req, res) => {
  const result = await userService.getUserWithRatings(req.params.id);
  res.status(result.status).json(result.data);
});

router.post('/', async (req, res) => {
  const result = await userService.create(req.body);
  res.status(result.status).json(result.data);
});

router.put('/:id', async (req, res) => {
  const result = await userService.update(req.body, req.params.id);
  res.status(result.status).json(result.data);
});

router.delete('/:id', async (req, res) => {
  const result = await userService.destroy(req.params.id);
  res.status(result.status).json(result.data);
});

module.exports = router;

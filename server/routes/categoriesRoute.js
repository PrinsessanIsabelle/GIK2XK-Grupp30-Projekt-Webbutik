const router = require('express').Router();
const db = require('../models');
const productService = require('../services/productService.js');

router.get('/:name/products', (req, res) => {
  const name = req.params.name;

  productService.getByCategory(name).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/', (req, res) => {
  db.category.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', (req, res) => {
  const category = req.body;
  db.category.create(category).then((result) => {
    res.send(result);
  });
});

router.delete('/', (req, res) => {
  db.category
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json(`Kategorin borttagen`);
    });
});

module.exports = router;
const router = require('express').Router();
const db = require('../models');
const { hashPassword } = require('../helpers/passwordHelper');

router.get('/', (req, res) => {
  db.user.findAll().then((result) => {
    res.send(result);
  });
});

router.post('/', async (req, res) => {
  const user = req.body;

  if (!user.email || !user.username) {
    return res.status(422).json({ error: 'email och username är obligatoriska.' });
  }
  if (!user.password || user.password.length < 6) {
    return res.status(422).json({ error: 'password är obligatoriskt och minst 6 tecken.' });
  }

  try {
    const passwordHash = await hashPassword(user.password);
    const { password, ...safeUserData } = user;
    const createdUser = await db.user.create({
      ...safeUserData,
      passwordHash
    });
    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Okänt fel' });
  }
});

router.put('/', async (req, res) => {
  const user = req.body;
  const id = user.id;

  if (!id) {
    return res.status(422).json({ error: 'Id är obligatoriskt.' });
  }

  try {
    const updatePayload = { ...user };
    if (updatePayload.password !== undefined) {
      if (!updatePayload.password || updatePayload.password.length < 6) {
        return res.status(422).json({ error: 'password måste vara minst 6 tecken.' });
      }
      updatePayload.passwordHash = await hashPassword(updatePayload.password);
      delete updatePayload.password;
    }

    await db.user.update(updatePayload, {
      where: { id: user.id }
    });
    return res.status(200).send('Användaren har uppdaterats.');
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Okänt fel' });
  }
});
router.delete('/', (req, res) => {
  db.user
    .destroy({
      where: { id: req.body.id }
    })
    .then(() => {
      res.json('Användaren raderades');
    });
});

module.exports = router;

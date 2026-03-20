// ROUTES-FIL för autenisering & inloggning.
// Viktigt vid exempelvis att ha behörighet att göra en rating. 

const router = require('express').Router(); //  Routern skapas från Express.
const db = require('../models'); // Modellerna hämtas in.
const { comparePassword } = require('../helpers/passwordHelper'); // Använder hjälpfunktion att jämföra lösenord för användare.


// Endpoint #1 - Logga in
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: 'Skicka email och password för inloggning.' });
  }

  try {
    const user = await db.user.unscoped().findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Hittade ingen användare.' });
    }

    if (!user.passwordHash) {
      return res.status(409).json({
        error: 'Kontot saknar lösenord. Uppdatera användaren med ett password först.'
      });
    }

    const validPassword = await comparePassword(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Felaktig e-post eller lösenord.' });
    }

    req.session.userId = user.id;

    return res.status(200).json({
      message: 'Inloggning lyckades.',
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Okänt fel' });
  }
});

// Endpoint #2 - Logga ut
router.post('/logout', (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(200).json({ message: 'Ingen aktiv session att logga ut.' });
  }

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: 'Kunde inte logga ut.' });
    }
    return res.status(200).json({ message: 'Utloggning lyckades.' });
  });
});

// Endpoint #3 - Hämta info om inloggad användare
router.get('/me', async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Du är inte inloggad.' });
  }

  try {
    const user = await db.user.findByPk(req.session.userId, {
      attributes: ['id', 'email', 'username', 'firstName', 'lastName', 'imageUrl']
    });

    if (!user) {
      return res.status(404).json({ error: 'Användaren i sessionen finns inte längre.' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Okänt fel' });
  }
});

module.exports = router;

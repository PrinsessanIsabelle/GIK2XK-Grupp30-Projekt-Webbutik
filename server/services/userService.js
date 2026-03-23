// SERVICE-FIL - Behandlar den service/tjänster (funktioner) som i detta fall användare har. 

const db = require('../models'); // Modellerna hämtas in, så att vi kan använda dem i tjänsten.
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const { hashPassword, comparePassword } = require('../helpers/passwordHelper');
const jwt = require('jsonwebtoken');
// Hjälpfunktioner för att skapa enhetliga svar från tjänsten. 
// Dessa används i alla funktioner nedan för att skapa svar som skickas tillbaka till klienten.


// Privat funktion (understreck) för att validera e-postadresser. Används i create och update-funktionerna nedan.
function _isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Funktion #1 - Listar alla användare (users) i ordning "nyast skapande först"
async function getAll() {
  try {
    const users = await db.user.findAll({
      order: [['created_at', 'DESC']]
    });
    return createResponseSuccess(users);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #2 - Hämtar användare baserat på id. Returnerar 404 om ingen användare hittas.
async function getById(id) {
  if (!id) {
    return createResponseError(422, 'id är obligatoriskt.');
  }
  try {
    const user = await db.user.findByPk(id);
    if (!user) {
      return createResponseError(404, 'Hittade ingen användare.');
    }
    return createResponseSuccess(user);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
// Funktion #3 - Hämtar en användare med deras omdömen (ratings)
async function getUserWithRatings(id) {
  if (!id) {
    return createResponseError(422, 'id är obligatoriskt.');
  }
  try {
    const user = await db.user.findByPk(id, {
      include: [
        {
          model: db.rating,
          include: [db.product]
        }
      ]
    });
    if (!user) {
      return createResponseError(404, 'Hittade ingen användare.');
    }
    return createResponseSuccess(_formatUserWithRatings(user));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #4 - Skapar en ny användare utefter nedanstående krav. 
async function create(userData) {
  if (!userData.email || !userData.username || !userData.password) {
    return createResponseError(
      422,
      'email, username och password är obligatoriska.'
    );
  }

  if (!_isValidEmail(userData.email)) {
    return createResponseError(422, 'E-postadressen är i ett felaktigt format.');
  }

  if (userData.username.length < 3 || userData.username.length > 50) {
    return createResponseError(
      422,
      'Användarnamnet måste vara mellan 3 och 50 tecken.'
    );
  }

  if (userData.password.length < 6) {
    return createResponseError(422, 'Lösenordet måste vara minst 6 tecken.');
  }

  try {
    const existingEmail = await db.user.findOne({
      where: { email: userData.email }
    });
    if (existingEmail) {
      return createResponseError(409, 'E-postadressen är redan registrerad.');
    }

    const existingUsername = await db.user.findOne({
      where: { username: userData.username }
    });
    if (existingUsername) {
      return createResponseError(409, 'Användarnamnet är redan registrerat.');
    }

    const passwordHash = await hashPassword(userData.password);
    const { password, ...safeData } = userData;

    const newUser = await db.user.create({
      ...safeData,
      passwordHash
    });

    return createResponseSuccess(_formatUser(newUser));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #5 - Uppdaterar en användare.
async function update(userData, id) {
  if (!id) {
    return createResponseError(422, 'id är obligatoriskt.');
  }

  if (userData.email && !_isValidEmail(userData.email)) {
    return createResponseError(422, 'E-postadressen är i ett felaktigt format.');
  }

  if (userData.username && (userData.username.length < 3 || userData.username.length > 50)) {
    return createResponseError(
      422,
      'Användarnamnet måste vara mellan 3 och 50 tecken.'
    );
  }

  try {
    const existingUser = await db.user.findByPk(id);
    if (!existingUser) {
      return createResponseError(404, 'Hittade ingen användare att uppdatera.');
    }

    if (userData.email && userData.email !== existingUser.email) {
      const conflictEmail = await db.user.findOne({
        where: { email: userData.email }
      });
      if (conflictEmail) {
        return createResponseError(409, 'E-postadressen är redan registrerad.');
      }
    }

    if (userData.username && userData.username !== existingUser.username) {
      const conflictUsername = await db.user.findOne({
        where: { username: userData.username }
      });
      if (conflictUsername) {
        return createResponseError(409, 'Användarnamnet är redan registrerat.');
      }
    }

    const updatePayload = { ...userData };
    if (updatePayload.password) {
      if (updatePayload.password.length < 6) {
        return createResponseError(422, 'Lösenordet måste vara minst 6 tecken.');
      }
      updatePayload.passwordHash = await hashPassword(updatePayload.password);
      delete updatePayload.password;
    }

    await db.user.update(updatePayload, { where: { id } });
    const updatedUser = await db.user.findByPk(id);

    return createResponseSuccess(_formatUser(updatedUser));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #6 - Radera en användare. 
async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'id är obligatoriskt.');
  }

  try {
    const existingUser = await db.user.findByPk(id);
    if (!existingUser) {
      return createResponseError(404, 'Hittade ingen användare att radera.');
    }

    await db.user.destroy({ where: { id } });
    return createResponseMessage(200, 'Användaren raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function login(userData) {
    if (!userData.email || !userData.password) {
        return createResponseError(422, 'Email och lösenord är obligatoriska.');
    }
    try {
        const user = await db.user.scope(null).findOne({ where: { email: userData.email } });
        if (!user) {
            return createResponseError(401, 'Fel email eller lösenord.');
        }
        const isValid = await comparePassword(userData.password, user.passwordHash);
        if (!isValid) {
            return createResponseError(401, 'Fel email eller lösenord.');
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        return createResponseSuccess({ token, user: _formatUser(user) });
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion formaterar en användardata till ett mer användarvänligt format, 
// inklusive att strukturera omdömen (ratings) och produktinformation.
function _formatUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    description: user.description,
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion formaterar en användardata med dess omdömen (ratings) till ett mer användarvänligt format, 
// inklusive att strukturera omdömen och produktinformation.
function _formatUserWithRatings(user) {
  const formatted = _formatUser(user);
  formatted.ratings = (user.ratings || []).map((r) => ({
    id: r.id,
    rating: r.rating,
    body: r.body,
    createdAt: r.createdAt,
    product: r.product
      ? {
          id: r.product.id,
          productName: r.product.productName,
          price: r.product.price
        }
      : null
  }));
  return formatted;
}

// Här ser vi de node-moduler som exporterats till denna fil.
// Node-mudulerna i detta sammanhang är färdiga funktioner som är användbara 
// i användar-tjänsten. 
module.exports = {
  getAll,
  getById,
  getUserWithRatings,
  create,
  update,
  destroy,
  login
};
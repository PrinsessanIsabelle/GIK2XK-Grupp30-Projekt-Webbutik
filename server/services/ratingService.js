// SERVICE-FIL - Behandlar den service/tjänster (funktioner) som i detta fall rating erbjuder/innebär. 

const db = require('../models'); // Modellerna hämtas in, så att vi kan använda dem i tjänsten.
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper'); // Hjälpfunktioner för att skapa enhetliga svar från tjänsten.

// Funktion #1 - Hämta alla betyg för en produkt, inklusive användarinformation.
async function getRatingsByProduct(productId) {
  if (!productId) {
    return createResponseError(422, 'productId är obligatoriskt.');
  }
  try {
    const product = await db.product.findByPk(productId);
    if (!product) {
      return createResponseError(404, 'Hittade ingen produkt.');
    }
    const ratings = await db.rating.findAll({
      where: { productId },
      include: [
        {
          model: db.user,
          attributes: ['id', 'username']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    return createResponseSuccess(ratings.map(_formatRating));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #2 - Hämta en sammanfattning av betyg för en produkt, inklusive genomsnitt och fördelning.
async function getProductRatingSummary(productId) {
  if (!productId) {
    return createResponseError(422, 'productId är obligatoriskt.');
  }
  try {
    const product = await db.product.findByPk(productId);
    if (!product) {
      return createResponseError(404, 'Hittade ingen produkt.');
    }
    const ratings = await db.rating.findAll({ where: { productId } });

    const count = ratings.length;
    const average =
      count > 0
        ? Math.round((ratings.reduce((sum, r) => sum + r.rating, 0) / count) * 10) / 10
        : null;

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach((r) => {
      const star = Math.round(r.rating);
      if (distribution[star] !== undefined) distribution[star]++;
    });

    return createResponseSuccess({ productId: Number(productId), count, average, distribution });
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #3 - Skapa ett nytt betyg för en produkt.
async function createRating(userId, productId, data) {
  if (!userId || !productId) {
    return createResponseError(422, 'userId och productId är obligatoriska.');
  }
  const score = Number(data.rating);
  if (!Number.isFinite(score) || score < 1 || score > 5) {
    return createResponseError(422, 'rating måste vara ett tal mellan 1 och 5.');
  }
  try {
    const product = await db.product.findByPk(productId);
    if (!product) {
      return createResponseError(404, 'Hittade ingen produkt.');
    }
    const newRating = await db.rating.create({
      userId,
      productId,
      rating: score,
      body: data.body || null
    });
    const full = await db.rating.findByPk(newRating.id, {
      include: [{ model: db.user, attributes: ['id', 'username'] }]
    });
    return createResponseSuccess(_formatRating(full));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #4 - Uppdatera ett befintligt betyg som användaren har skapat.
async function updateOwnRating(userId, ratingId, data) {
  if (!userId || !ratingId) {
    return createResponseError(422, 'userId och ratingId är obligatoriska.');
  }
  if (data.rating !== undefined) {
    const score = Number(data.rating);
    if (!Number.isFinite(score) || score < 1 || score > 5) {
      return createResponseError(422, 'rating måste vara ett tal mellan 1 och 5.');
    }
  }
  try {
    const existing = await db.rating.findByPk(ratingId);
    if (!existing) {
      return createResponseError(404, 'Hittade ingen recension.');
    }
    if (existing.userId !== Number(userId)) {
      return createResponseError(403, 'Du kan bara ändra dina egna recensioner.');
    }
    if (data.rating !== undefined) existing.rating = Number(data.rating);
    if (data.body !== undefined) existing.body = data.body;
    await existing.save();

    const full = await db.rating.findByPk(ratingId, {
      include: [{ model: db.user, attributes: ['id', 'username'] }]
    });
    return createResponseSuccess(_formatRating(full));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #5 - Radera ett befintligt betyg som användaren har skapat.
async function deleteOwnRating(userId, ratingId) {
  if (!userId || !ratingId) {
    return createResponseError(422, 'userId och ratingId är obligatoriska.');
  }
  try {
    const existing = await db.rating.findByPk(ratingId);
    if (!existing) {
      return createResponseError(404, 'Hittade ingen recension.');
    }
    if (existing.userId !== Number(userId)) {
      return createResponseError(403, 'Du kan bara ta bort dina egna recensioner.');
    }
    await existing.destroy();
    return createResponseMessage(200, 'Recensionen raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion formaterar en ratingdata till ett mer användarvänligt format, inklusive att strukturera användarinformation.
function _formatRating(rating) {
  return {
    id: rating.id,
    rating: rating.rating,
    body: rating.body,
    createdAt: rating.createdAt,
    updatedAt: rating.updatedAt,
    user: rating.user
      ? { id: rating.user.id, username: rating.user.username }
      : null
  };
}
// Här ser vi de node-moduler som exporterats till denna fil.
// Node-mudulerna i detta sammanhang är färdiga funktioner som är användbara 
// i rating-tjänsten. 
module.exports = {
  getRatingsByProduct,
  getProductRatingSummary,
  createRating,
  updateOwnRating,
  deleteOwnRating
};
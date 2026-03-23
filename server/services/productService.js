// SERVICE-FIL - Behandlar den service/tjänster (funktioner) som i detta fall produkterna erbjuder. 

const db = require('../models'); // Modellerna hämtas in, så att vi kan använda dem i tjänsten.
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper'); // Hjälpfunktioner för att skapa enhetliga svar från tjänsten.

// Funktion #1 - Hämta alla produkter, inklusive deras kategorier och betyg.
async function getAll() {
  try {
    const allProducts = await db.product.findAll({
      include: [
        db.category,
        { model: db.rating, include: [db.user] }
      ]
    });
    return createResponseSuccess(allProducts.map(_formatProduct));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #2 - Hämta en produkt baserat på dess ID, inklusive dess kategori och betyg.
async function getById(id) {
  try {
    const product = await db.product.findOne({
      where: { id },
      include: [
        db.category,
        { model: db.rating, include: [db.user] }
      ]
    });
    if (!product) {
      return createResponseError(404, 'Hittade ingen produkt.');
    }
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #3 - Hämta alla produkter som tillhör en viss kategori, inklusive deras betyg.
async function getByCategory(categoryName) {
  try {
    const category = await db.category.findOne({ where: { name: categoryName } });
    if (!category) {
      return createResponseError(404, 'Kategorin hittades inte.');
    }
    const allProducts = await category.getProducts({
      include: [db.category, { model: db.rating, include: [db.user] }]
    });
    return createResponseSuccess(allProducts.map(_formatProduct));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #4 - Lägg till ett betyg för en produkt.
async function addRating(productId, rating) {
  if (!productId) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    rating.productId = productId;
    const newRating = await db.rating.create(rating);
    return createResponseSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #5 - Skapa en ny produkt, inklusive att hantera kategorier.
async function create(product) {
  if (!product.productName || product.productName.length < 2 || product.productName.length > 100) {
    return createResponseError(422, 'Produktnamnet måste vara mellan 2 och 100 tecken.');
  }
  try {
    const newProduct = await db.product.create(product);
    await _addCategoryToProduct(newProduct, product.categories);
    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #6 - Uppdatera en befintlig produkt, inklusive att hantera kategorier.
async function update(product, id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  if (product.productName && (product.productName.length < 2 || product.productName.length > 100)) {
    return createResponseError(422, 'Produktnamnet måste vara mellan 2 och 100 tecken.');
  }
  try {
    const existingProduct = await db.product.findOne({ where: { id } });
    if (!existingProduct) {
      return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
    }
    if (product.categories) {
      await _addCategoryToProduct(existingProduct, product.categories);
    }
    await db.product.update(product, { where: { id } });
    return createResponseMessage(200, 'Produkten uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Funktion #7 - Radera en produkt baserat på dess ID.
async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.product.destroy({ where: { id } });
    return createResponseMessage(200, 'Produkten raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion formaterar en produktdata till ett mer användarvänligt format,
// inklusive att strukturera kategorier som en lista av namn och betyg med användarinformation.
function _formatProduct(product) {
  const cleanProduct = {
    id: product.id,
    productName: product.productName,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    categories: [],
    ratings: []
  };

  if (product.categories) {
    cleanProduct.categories = product.categories.map((c) => c.name);
  }

  if (product.ratings) {
    cleanProduct.ratings = product.ratings.map((r) => ({
      id: r.id,
      rating: r.rating,
      body: r.body,
      createdAt: r.createdAt,
      userId: r.userId,
      username: r.user?.username
    }));
  }

  return cleanProduct;
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion hittar eller skapar en kategori baserat på dess namn, och returnerar dess ID.
async function _findOrCreateCategoryId(name) {
  name = name.toLowerCase().trim();
  const [category] = await db.category.findOrCreate({ where: { name } });
  return category.id;
}

// Ingen importerad node-modul-funktion - Understreck visar att den är privat.
// Denna funktion lägger till kategorier till en produkt genom att hitta eller skapa kategorier och sedan associera dem med produkten.
async function _addCategoryToProduct(product, categories) {
  await db.productCategory.destroy({where: { productId: product.id }});

  if (!categories || categories.length === 0) return;
  const categoryIds = await Promise.all(categories.map(_findOrCreateCategoryId));
  await product.setCategories(categoryIds);
}

// Här ser vi de node-moduler som exporterats till denna fil.
// Node-mudulerna i detta sammanhang är färdiga funktioner som är användbara 
// i product-tjänsten. 
module.exports = {
  getAll,
  getById,
  getByCategory,
  addRating,
  create,
  update,
  destroy
};

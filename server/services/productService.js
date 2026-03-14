<<<<<<< HEAD
const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');

const constraints = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: '^Titeln måste vara minst %{count} tecken lång.',
      tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
    }
  }
};

async function getByCategory(productName) {
  try {
    const category = await db.tag.findOne({ where: { name: productName } });
    const allProducts = await category.getProducts({ include: [db.user, db.category] });
    /* Om allt blev bra, returnera allProducts */
    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getByAuthor(userId) {
  try {
    const user = await db.user.findOne({ where: { id: userId } });
    const allProducts = await user.getProducts({ include: [db.user, db.category] });
    /* Om allt blev bra, returnera allProducts */
    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const product = await db.post.findOne({
      where: { id },
      include: [
        db.user,
        db.category,
        {
          model: db.comment,
          include: [db.user]
        }
      ]
    });
    /* Om allt blev bra, returnera product */
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allProducts = await db.post.findAll({ include: [db.user, db.category] });
    /* Om allt blev bra, returnera allProducts */
    return createResponseSuccess(allProducts.map((product) => _formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addRating(id, rating) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    rating.postId = id;
    const newRating = await db.rating.create(rating);
    return createResponseSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(product) {
  const invalidData = validate(product, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const newProduct = await db.post.create(post);
    //post tags är en array av namn
    //lägg till eventuella taggar
    await _addCategoryToProduct(newPost, post.tags);

    return createResponseSuccess(newPost);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(product, id) {
  const invalidData = validate(product, constraints); //kanske post istället för product?
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const existingProduct = await db.post.findOne({ where: { id } });
    if (!existingProduct) {
      return createResponseError(404, 'Hittade ingen produkt att uppdatera.');
    }
    await _addCategoryToProduct(existingProduct, product.categories);
    await db.post.update(product, {
      where: { id }
    });
    return createResponseMessage(200, 'Produkten uppdaterades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.post.destroy({
      where: { id }
    });
    return createResponseMessage(200, 'Produkten raderades.');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

function _formatProduct(product) {
  const cleanProduct = {
    id: product.id,
    title: product.title,
    body: product.body,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    author: {
      id: product.user.id,
      username: product.user.username,
      email: product.user.email,
      firstName: product.user.firstName,
      lastName: product.user.lastName,
      imageUrl: product.user.imageUrl
    },
    categories: []
  };

  if (product.ratings) {
    cleanProduct.ratings = [];

    product.ratings.map((rating) => {
      return (cleanProduct.ratings = [
        {
          title: rating.title,
          body: rating.body,
          author: rating.user.username,
          createdAt: rating.createdAt
        },
        ...cleanProduct.ratings
      ]);
    });
  }

  if (product.category) {
    product.category.map((category) => {
      return (cleanProduct.categories = [category.name, ...cleanProduct.categories]);
    });
    return cleanProduct;
  }
}

async function _findOrCreateCategoryId(name) {
  name = name.toLowerCase().trim();
  const foundOrCreatedCategory = await db.category.findOrCreate({ where: { name } });

  return foundOrCreatedCategory[0].id;
}

async function _addCategoryToProduct(product, categories) {
  await db.postCategory.destroy({ where: { postId: product.id } });

  if (categories) {
    categories.forEach(async (category) => {
      const categoryId = await _findOrCreateCategoryId(category);
      await product.addCategory(categoryId);
    });
  }
}

module.exports = {
  getByCategory,
  getByAuthor,
  getById,
  getAll,
  addRating,
  create,
  update,
  destroy
};
=======
/* Allt gällande products och categories*/
>>>>>>> b6da9ab0da38621e80b4c14a1a7cb14d00ec4c9f

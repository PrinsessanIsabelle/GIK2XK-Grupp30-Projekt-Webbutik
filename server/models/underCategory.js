module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
<<<<<<< HEAD:server/models/underCategory.js
    'underCategory', {
=======
    'productCategory', {
>>>>>>> b6da9ab0da38621e80b4c14a1a7cb14d00ec4c9f:server/models/productcategory.js
        id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
    }, { underscored: true });
};

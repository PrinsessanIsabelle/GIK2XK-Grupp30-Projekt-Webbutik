'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
 /*   En användare kan ha flera carts. Tar bort cart om användare tas bort */
db.cart.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.cart, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true });

 /*   En produkt kan ha flera ratings. Tar bort rating om produkt tas bort */
db.rating.belongsTo(db.product, { foreignKey: { allowNull: false } });
db.product.hasMany(db.rating, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true });

 /*   En användare kan ha flera ratings. Tar bort rating om användare tas bort */
db.rating.belongsTo(db.user, { foreignKey: { allowNull: false } });
db.user.hasMany(db.rating, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true });

 /*  Produkter och kategorier har många till många förhållande.  */
db.product.belongsToMany(db.category, { through: db.productCategory, onDelete: 'CASCADE', hooks: true });
db.category.belongsToMany(db.product, { through: db.productCategory, onDelete: 'CASCADE', hooks: true })

 /*   Cart och Produkter har ett många till många förhållande här är cartRow en mellantabell */
db.cartRow.belongsTo(db.cart, { foreignKey: { allowNull: false } });
db.cart.hasMany(db.cartRow, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true });

 /*   Väljer att inte använda Through: då cartRow har fler columner med värdefull information  */
db.cartRow.belongsTo(db.product, { foreignKey: { allowNull: false } });
db.product.hasMany(db.cartRow, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

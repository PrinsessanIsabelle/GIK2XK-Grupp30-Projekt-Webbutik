module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'productCategory', {
        id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
    }, { underscored: true });
};

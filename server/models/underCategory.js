module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'underCategory', {
        id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
    }, { underscored: true });
};

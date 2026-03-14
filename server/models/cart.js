module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'cart', 
    {
        id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        payed:{
            type: DataTypes.BOOL,
            allowNull: false
        }

  }, { underscored: true });
};

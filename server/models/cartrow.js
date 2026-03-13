module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'cartRow', 
    {
        id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        amount:{
            type: DataTypes.DOUBLE,
            allowNull: false
        }

  }, { underscored: true });
};

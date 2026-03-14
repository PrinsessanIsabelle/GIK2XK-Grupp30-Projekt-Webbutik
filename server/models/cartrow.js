module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
<<<<<<< HEAD
    'cartrow', 
=======
    'cartRow', 
>>>>>>> b6da9ab0da38621e80b4c14a1a7cb14d00ec4c9f
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

// Modeller beskriver hur en *tabell* ska se ut. Tänk ER-diagram och de tabeller som definderas där.

module.exports = (sequelize, DataTypes) => { // Exporterar en funktion som definierar modellen.
  return sequelize.define(
    'cart', 
    {
        id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        payed:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

  }, { underscored: true });
};

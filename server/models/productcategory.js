module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'postTag', {
        id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
    }, { underscored: true });
};

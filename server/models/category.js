module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "category", 
        {
            id:{ 
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {underscored: true}
    );
}; 
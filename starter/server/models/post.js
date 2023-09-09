const {DataTypes} = require('sequelize')

const {sequelize} = require('../utils/database')

module.exports = {
    //  In the value of this property, we will call a function from Sequelize to set up what the user objects should look like.
    Post: sequelize.define('post', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN
    })
};
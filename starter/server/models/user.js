// ! This is where I'll define what my user objects should look like.
// ! Because we’re using Sequelize, this is how we’ll be defining our tables.
// ! Sequelize will take our models and set up the database for us.

const {DataTypes} = require('sequelize')

const {sequelize} = require('../utils/database')

module.exports = {
    //  In the value of this property, we will call a function from Sequelize to set up what the user objects should look like.
    User: sequelize.define('user', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: DataTypes.STRING,
        hashedPass: DataTypes.STRING
    })
};
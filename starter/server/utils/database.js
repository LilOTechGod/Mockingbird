// ! This is where we'll connect to the database with sequqlize.

require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
})

module.exports = {
    sequelize
}
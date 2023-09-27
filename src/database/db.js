const { Sequelize, DataTypes } = require('sequelize');
const { DATABASE } = require('../config/db')

const sequelize = new Sequelize(DATABASE.DB_DBNAME, DATABASE.DB_USERNAME, DATABASE.DB_PASSWORD, {
    host: DATABASE.DB_HOST,
    dialect: DATABASE.DB_DIALECT,
    port: DATABASE.DB_PORT,
    timezone: "+07:00",
    define: {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
});




sequelize.models.users = require('../models/user')(sequelize, DataTypes)


//sequelize.sync({alter: true})

module.exports = sequelize;
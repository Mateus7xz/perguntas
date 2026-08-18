const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas', 'root','Anaheim91',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
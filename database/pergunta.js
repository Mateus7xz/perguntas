const Sequelize = require("sequelize");
const connection = require("./database");

//Vira tabela no banco de dados
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() =>{});

module.exports = Pergunta;
const Sequelize = require('sequelize'); 

const conection = new Sequelize('question_guide', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conection;
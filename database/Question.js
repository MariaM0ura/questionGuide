const Sequelize = require('sequelize');
const conection = require('./database');

const Question = conection.define('questions', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
});

Question.sync({force: false}).then(() => {});

module.exports = Question;  
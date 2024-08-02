const Sequelize = require('sequelize');
const conection = require('./database');

const Answers = conection.define('answers', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answers.sync({force: false});

module.exports = Answers;
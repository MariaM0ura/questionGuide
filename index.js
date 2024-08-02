const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const conection = require('./database/database');
const Question = require('./database/Question');
const Answers = require('./database/Answers');

conection.authenticate().then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    Question.findAll({ raw: true, order:[['id', 'DESC']] }).then(questions => {
        res.render('index', {
            questions: questions
        });
    }).catch(error => {
        console.error(error);
        res.status(500).send('Erro ao obter as perguntas');
    });
});


app.get('/ask', (req, res) => {
    res.render('ask');
});

app.post('/savequestion', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/question/:id', (req, res) => {
    var id = req.params.id;
    Question.findOne({
        where: { id: id }
    }).then(question => {
        if (question != undefined) {
            res.render('question', {
                question: question
            });
        } else {
            res.redirect('/');
        }
    });
});

app.post('/answer', (req, res) => {
    var body = req.body.body;
    var questionId = req.body.question_id;

    Answers.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect('/question/' + questionId);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Erro ao salvar a resposta');
    });
});



app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
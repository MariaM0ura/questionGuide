const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const conection = require('./database/database');

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
    res.render('index');
});

app.get('/question', (req, res) => {
    res.render('question');
});

app.post('/savequestion', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    res.send('formulario recebido titulo: ' + title + ' descricao: ' + description);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
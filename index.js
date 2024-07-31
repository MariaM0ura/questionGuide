const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/question', (req, res) => {
    res.render('question');
});

app.post('/savequestion', (req, res) => {
    res.send('formulario recebudo');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
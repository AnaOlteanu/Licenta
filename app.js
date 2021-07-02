const express = require('express');

const app = express();
app.listen(5000);

app.set('view engine', 'ejs')

app.use(express.static(__dirname));
app.use('/css', express.static('css'));
app.use('/images', express.static('images'));

const server = app.listen(() => {
	console.log('express server started on port: 5000' );
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/details', (req, res) => {
    res.render('details')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})
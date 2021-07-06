const express = require('express');
const session = require('express-session')
const adminRoutes = require('./routes/admins-routes.cjs');

const app = express();


app.set('view engine', 'ejs')
app.use(express.static(__dirname))
    .use('/css', express.static('css'))
    .use('/images', express.static('images'))
    .use(express.urlencoded({extended: true}))
    .use(express.json())
    .use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }))
 
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/home', (req, res) => {
    if(req.session.loggedin){
        res.render('home' , { admin: req.session.username})
    }
    else{
        res.render('home',{admin: ''})
    }
    
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

//admin routes
app.use(adminRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
  });


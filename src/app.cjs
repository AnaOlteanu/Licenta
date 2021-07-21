const express = require('express');
const session = require('express-session')
const adminRoutes = require('./routes/admins-routes.cjs');
const userRoutes = require('./routes/users-routes.cjs');

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
        res.render('home' , { user: req.session.username})
    }
    else{
        res.render('home',{user: ''})
    }
    
})

app.get('/details', (req, res) => {
    res.render('details')
})


//admin routes
app.use(adminRoutes);

//user routes
app.use(userRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
  });


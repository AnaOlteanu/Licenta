const express = require('express');
const session = require('express-session')
const adminRoutes = require('./routes/admins-routes.cjs');
const userRoutes = require('./routes/users-routes.cjs');
const movieLikesRoutes = require('./routes/movie-likes-routes.cjs');
const movieDislikesRoutes = require('./routes/movie-dislikes-routes.cjs');
const favouriteMoviesRoutes = require('./routes/favourites-routes.cjs');
const dislikedMoviesRoutes = require('./routes/dislikes-routes.cjs');
const recommendationRoutes = require('./routes/recommendations-routes.cjs');



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
        saveUninitialized: true,
        already_liked: false,
        adminLoggedIn: false
    }))
 
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/home', (req, res) => {
    if(req.session.loggedin){
        res.render('home' , { 
            user: req.session.username,
            isLoggedIn: true
        })
    }
    else{
        res.render('home',{
            user: '',
            isLoggedIn: false})
    }
    
})

app.get('/details', (req, res) => {
    if(req.session.loggedin){
        res.render('details' , { 
            isLoggedIn: true,
            already_like: req.session.already_liked,
            user: req.session.username
        })
    }
    else{
        res.render('details',{
            isLoggedIn: false,
            already_like:  req.session.already_liked,
            user: req.session.username
        })
    }
})

//admin routes
app.use(adminRoutes);

//user routes
app.use(userRoutes);

//movie likes routes
app.use(movieLikesRoutes);

//movie dislikes routes
app.use(movieDislikesRoutes);

//favourite movies routes
app.use(favouriteMoviesRoutes);

//disliked movies routes
app.use(dislikedMoviesRoutes);

//recommended movies routes
app.use(recommendationRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
  });


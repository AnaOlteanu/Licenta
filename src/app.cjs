const express = require('express');
const session = require('express-session')
const adminRoutes = require('./routes/admins-routes.cjs');
const userRoutes = require('./routes/users-routes.cjs');
const movieLikesRoutes = require('./routes/movie-likes-routes.cjs');
const movieDislikesRoutes = require('./routes/movie-dislikes-routes.cjs');
const recommendationRoutes = require('./routes/recommendations-routes.cjs');
const homeRoutes = require('./routes/home-routes.cjs');
const topLikesRoutes = require('./routes/top-likes.cjs');
const searchedMovieRoutes = require('./routes/search-routes.cjs');
const detailsRoutes = require('./routes/details-routes.cjs');
const commentsRoutes = require('./routes/comments-routes.cjs');
const profileRoutes = require('./routes/profile-routes.cjs');
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


//home route
app.use(homeRoutes);

//movie details route
app.use(detailsRoutes);

//admin routes
app.use(adminRoutes);

//user routes
app.use(userRoutes);

//movie likes routes
app.use(movieLikesRoutes);

//movie dislikes routes
app.use(movieDislikesRoutes);

//recommended movies routes
app.use(recommendationRoutes);

//top 10 liked movies routes
app.use(topLikesRoutes);

//searched movie by name routes
app.use(searchedMovieRoutes);

//comments for movies routes
app.use(commentsRoutes);

//user profile route
app.use(profileRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
  });


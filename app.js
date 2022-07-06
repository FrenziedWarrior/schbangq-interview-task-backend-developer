require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const jwt = require('jsonwebtoken');
const axios = require('axios');

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', error => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database connected');
});

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

app.use(
    session({
        secret: 'keyboard cat session secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL })
    })
);

require('./config/google');

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const User = require('./models/user/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findOne({ id });
    done(null, currentUser);
});

const bookRoutes = require('./routes/books');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
}),
    (req, res) => {
        res.cookie('jwt', jwt.sign({ data: req.user }, "jwt secret", {
            expiresIn: 604800
        }), {
            httpOnly: true
        });
        return res.redirect("/directory");
});

app.use('/api', passport.authenticate('jwt', {session: false}), bookRoutes);

app.get("/directory", passport.authenticate('jwt', {session: false}), (req, res) => {
    let responseHandle = res;
    axios.get(process.env.BASE_APP_URL + '/api/books', {
        headers: {
            Cookie: "jwt=" + req.cookies['jwt']
        }
    }).then(res => {
        responseHandle.render("directory.ejs", { user: req.user, books: res.data, token: req.cookies['jwt'] });
    });
});

app.get("/auth/logout", (req, res) => {
    req.session.destroy(function () {
        res.clearCookie("connect.sid");
        res.clearCookie("jwt");
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
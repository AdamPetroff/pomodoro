var express = require('express');
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('cookie-parser');
var bodyParser = require('body-parser');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
    return done(null, {'menicko': username, 'passwordik': password});
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var app = express();

app.use(bodyParser());
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.get('/', function(req, res) {
//     return res.send('wild success');
// });

app.get('/login', function (req, res) {
    return res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    function (req, res) {
        console.log(req.user);
        return res.send('cock');
    }
);


app.listen(3000, function () {
    console.log('Listening on 3000');
});
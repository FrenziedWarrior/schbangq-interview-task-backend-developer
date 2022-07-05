var JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
var UserService = require('../models/user');

var cookieExtractor = function(req) {
    console.log(req.path);
    console.log(req.cookies['jwt']);
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = cookieExtractor;
    opts.secretOrKey = "jwt secret";
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
        const currentUser = await UserService.getUserByEmail({ email: jwt_payload.data.email });
        if (currentUser) {
            currentUser.lastVisited = new Date();
            done(null, currentUser);
        } else {
            done(null, false);
        }
    }));
};
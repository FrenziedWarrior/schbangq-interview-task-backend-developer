const passport = require('passport');
const UserService = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            callbackURL: process.env.CALLBACK_URL,
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        async (accessToken, refreshToken, profile, done) => {
            // console.log('user profile is: ', profile)
            const id = profile.id;
            const email = profile.emails[0].value;
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            const profilePhoto = profile.photos[0].value;
            const source = "google";

            const currentUser = await UserService.getUserByEmail({ email })

            if (!currentUser) {
                const newUser = await UserService.addGoogleUser({
                    id,
                    email,
                    firstName,
                    lastName,
                    profilePhoto
                })
                return done(null, newUser);
            }

            if (currentUser.source !== 'google') {
                // return error
                return (null, false, { message: 'You have previously signed up with a different provider.'})
            }

            currentUser.lastVisited = new Date();
            return done(null, currentUser);
        }
    )
)
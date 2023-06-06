import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            scope: ['email', 'profile']
        },(accessToken, refreshToken, profile, done) => {
    return done(null, {name: profile.displayName,
            email: profile.emails,
            photos: profile.photos,
            id: profile.id,
            provider : profile.provider},
        {token : accessToken});
}));

passport.serializeUser((user, done) => {
    //@ts-ignore
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    //@ts-ignore
    done(null, id);
})
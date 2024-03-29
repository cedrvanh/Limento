/*
Import external libraries
*/
import passport from 'passport';
import * as passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import passportFacebook from 'passport-facebook';

/*
Import internal libraries
*/
import { User } from '../database';
import config from '../../../config';

/*
Constants
*/
const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
const { ExtractJwt, Strategy: JwtStrategy } = passportJWT;

class AuthService {
    constructor() {
        this.initializeLocalStrategy();
        this.initializeJwtStrategy();
        this.initializeFbStrategy();
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((user, done) => {
            done(null, user);
        });
        this.passport = passport;
    }

    initializeLocalStrategy = () => {
        passport.use(new LocalStrategy(
            {
                usernameField: 'email',
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({
                        email,
                    });

                    if (!user) {
                        return done(null, false, { message: 'No user by that email' });
                    }

                    return user.comparePassword(password, (isMatch) => {
                        if (!isMatch) {
                            return done(null, false);
                        }
                        return done(null, user);
                    });
                } catch (error) {
                    return done(error);
                }
            },
        ));
    }

    initializeJwtStrategy = () => {
        passport.use(new JwtStrategy(
            {
                secretOrKey: config.auth.jwtSecret,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            },
            (jwtPayload, done) => {
                const { id } = jwtPayload;
                User.findById(id, (err, user) => {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    return done(null, user);
                });
            },
        ));
    }

    initializeFbStrategy = () => {
        passport.use(new FacebookStrategy(
            {
                clientID: config.auth.facebook.clientID,
                clientSecret: config.auth.facebook.clientSecret,
                callbackURL: '/login/facebook/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(accessToken);
                console.log(refreshToken);
                console.log(profile);
            }
        ))
    }

}

export default AuthService;

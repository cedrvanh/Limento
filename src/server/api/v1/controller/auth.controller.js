/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { APIError, handleAPIError, createToken } from '../../../utilities';
import config from '../../../config';
import { User } from '../database';

class AuthController {
    loginLocal = async (authService, req, res, next) => {
        authService.passport.authenticate('local', config.jwtSession, (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                return next(new Error("No user found."));
            }
            req.auth = {
                id: user.id,
            };
            const token = createToken(req.auth);
            return res.status(200).json({
                uid: user.id,
                email: user.email,
                token: `${token}`,
                strategy: 'local',
            });
        })(req, res, next);
    };

    register = async (req, res, next) => {
        const { name, email, city, street, password } = req.body;
        
        const findUser = await User.findOne({ "email": email });
        if (findUser) {
            return next(new Error("Email already in use"))
        };

        const newUser = new User({
            name,
            email,
            address: {
                city,
                street
            },
            localProvider: {
                password
            }
        });

        await newUser.save();
    }
}

export default AuthController;

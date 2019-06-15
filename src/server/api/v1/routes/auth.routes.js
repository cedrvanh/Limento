/*
Import the internal libraries:
- AuthController
*/
import { AuthController } from '../controller';
import passport from 'passport';

// Create instance of AuthController otherwise you can't use it
const authController = new AuthController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.post('/login/local', (req, res, next) => authController.loginLocal(authService, req, res, next));
    parentRouter.get('/login/facebook', passport.authenticate('facebook'));
    parentRouter.get('/login/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
    parentRouter.post('/register', (req, res, next) => authController.register(req, res, next));
};

export default initializeEndpoints;

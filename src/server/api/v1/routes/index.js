/*
Import the external libraries:
- express
*/
import express from 'express';

/*
Import the internal libraries:
- category.routes.js
- post.routes.js
*/
import AuthService from '../service';
import authRouter from './auth.routes';
import categoryRouter from './category.routes';
import conversationRouter from './conversation.routes';
import postRouter from './post.routes';
import userRouter from './user.routes';
import tagRouter from './tag.routes';
import messageRouter from './message.routes';
import commentRouter from './comment.routes';
import postTypeRouter from './postType.routes';
import mediaRouter from './media.routes';

// Initialize the AuthService
const authService = new AuthService();

// Define and initiate an express router
const apiV1Router = express.Router();

authRouter(apiV1Router, authService);
categoryRouter(apiV1Router, authService);
conversationRouter(apiV1Router, authService);
postRouter(apiV1Router, authService);
userRouter(apiV1Router);
tagRouter(apiV1Router, authService);
messageRouter(apiV1Router, authService);
commentRouter(apiV1Router, authService);
postTypeRouter(apiV1Router, authService);
mediaRouter(apiV1Router, authService);

export default apiV1Router;

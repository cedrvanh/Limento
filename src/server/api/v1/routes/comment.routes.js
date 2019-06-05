/*
Import the internal libraries:
- CommentController
*/
import { CommentController } from '../controller';

// Create instance of CommentController otherwise you can't use it
const commentController = new CommentController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/comments', commentController.index);
};

export default initializeEndpoints;

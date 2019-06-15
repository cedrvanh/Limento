/*
Import the internal libraries:
- CommentController
*/
import { CommentController } from '../controller';

// Create instance of CommentController otherwise you can't use it
const commentController = new CommentController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/comments', commentController.index);
    parentRouter.post('/comments', commentController.store);
    parentRouter.put('/comments/:id', commentController.update);
};

export default initializeEndpoints;

/*
Import the internal libraries:
- PostController
*/
import { PostTypeController } from '../controller';

// Create instance of PostController otherwise you can't use it
const postTypeController = new PostTypeController();

const initializeEndpoints = (parentRouter, authService) => {

    parentRouter.get('/types', postTypeController.index);

};

export default initializeEndpoints;

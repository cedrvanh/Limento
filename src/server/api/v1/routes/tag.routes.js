/*
Import the internal libraries:
- TagController
*/
import { TagController } from '../controller';

// Create instance of TagController otherwise you can't use it
const tagController = new TagController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/tags', tagController.index);

    parentRouter.get('/tags/create/', tagController.create);

    parentRouter.get('/tags/:id', tagController.show);

    parentRouter.post('/tags', tagController.store);

    parentRouter.get('/tags/:id/edit', tagController.edit);

    parentRouter.put('/tags/:id', tagController.update);

    parentRouter.delete('/tags/:id', tagController.destroy);
};

export default initializeEndpoints;

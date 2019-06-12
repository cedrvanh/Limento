/*
Import the internal libraries:
- TagController
*/
import { MediaController } from '../controller';

// Create instance of TagController otherwise you can't use it
const mediaController = new MediaController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/media', mediaController.index);

    parentRouter.get('/media/create/', mediaController.create);

    parentRouter.get('/media/:id', mediaController.show);

    parentRouter.post('/media', mediaController.store);

    parentRouter.get('/media/:id/edit', mediaController.edit);

    parentRouter.put('/media/:id', mediaController.update);

    parentRouter.delete('/media/:id', mediaController.destroy);
};

export default initializeEndpoints;

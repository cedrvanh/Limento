/*
Import the internal libraries:
- MessageController
*/
import { MessageController } from '../controller';

// Create instance of TagController otherwise you can't use it
const messageController = new MessageController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/messages', messageController.index);

    parentRouter.get('/messages/create/', messageController.create);

    parentRouter.get('/messages/:id', messageController.show);

    parentRouter.post('/messages', messageController.store);

    parentRouter.get('/messages/:id/edit', messageController.edit);

    parentRouter.put('/messages/:id', messageController.update);

    parentRouter.delete('/messages/:id', messageController.destroy);
};

export default initializeEndpoints;

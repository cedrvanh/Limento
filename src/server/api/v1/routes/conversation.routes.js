/*
Import the internal libraries:
- MessageController
*/
import { ConversationController } from '../controller';

// Create instance of TagController otherwise you can't use it
const conversationController = new ConversationController();

const initializeEndpoints = (parentRouter, authService) => {
    parentRouter.get('/conversations', conversationController.index);

    parentRouter.get('/conversations/create/', conversationController.create);

    parentRouter.get('/conversations/:id', conversationController.show);

    parentRouter.post('/conversations', conversationController.store);

    parentRouter.get('/conversations/:id/edit', conversationController.edit);

    parentRouter.put('/conversations/:id', conversationController.update);

    parentRouter.delete('/conversations/:id', conversationController.destroy);
};

export default initializeEndpoints;

/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Conversation } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class ConversationController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            
            let posts = null;

            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate:  'user',
                    sort: { created_at: -1 },
                };
                posts = await Conversation.paginate({}, options);
            } else {
                posts = await Conversation.find()
                .populate('userOne', 'avatar name')
                .populate('userTwo', 'avatar name')
                .populate('messages')
                    .sort({ created_at: -1 }).exec();
            }
            if (posts === undefined || posts === null) {
                throw new APIError(404, 'Collection for posts not found!');
            }
            return res.status(200).json(posts);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving posts', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Conversation.findById(id)
            .populate('messages')
            .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    select: 'name avatar'
                }
            })
            .populate('user').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Conversation with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving posts', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            categories: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            console.log(req);
            const postCreate = new Conversation({
                userOne: req.body.userOne,
                userTwo: req.body.userTwo,
                messages: req.body.message
            });
            const post = await postCreate.save();
            return res.status(201).json(post);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Conversation!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const post = await Conversation.findById(id).exec();

            if (!post) {
                throw new APIError(404, `Conversation with id: ${id} not found!`);
            } else {
                const vm = {
                    post,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Conversation with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const postUpdate = req.body;

            const post = await Conversation.findOneAndUpdate({ _id: id },{ $push: { messages: postUpdate.messages }},{ new: true }).exec();

            if (!post) {
                throw new APIError(404, `Conversation with id: ${id} not found!`);
            }
            return res.status(200).json(post);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Conversation with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let post = null;

            let { mode } = req.query;
            if (mode) {
                post = await Conversation.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                post = await Conversation.findOneAndRemove({ _id: id });
            }

            if (!post) {
                throw new APIError(404, `Conversation with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Conversation with id: ${id}!`, post, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Conversation with id: ${id}!`, next);
        }
    }
}

export default ConversationController;

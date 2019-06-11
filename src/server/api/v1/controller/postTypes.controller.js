import { PostType } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class PostTypeController {
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let postTypes = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                postTypes = await PostType.paginate({}, options);
            } else {
                postTypes = await PostType.find().sort({ created_at: -1 }).exec();
            }

            if (postTypes === undefined || postTypes === null) {
                throw new APIError(404, 'Collection for postTypes not found!');
            }
            return res.status(200).json(postTypes);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving postTypes', next);
        }
    }

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await PostType.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `PostType with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving postTypes', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            postTypes: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const PostTypeCreate = new PostType({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
            });
            const PostType = await PostTypeCreate.save();
            return res.status(201).json(PostType);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the PostType!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const PostType = await PostType.findById(id).exec();

            if (!PostType) {
                throw new APIError(404, `PostType with id: ${id} not found!`);
            } else {
                const vm = {
                    PostType,
                    postTypes: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the PostType with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const PostTypeUpdate = req.body;
            const PostType = await PostType.findOneAndUpdate({ _id: id }, PostTypeUpdate, { new: true }).exec();

            if (!PostType) {
                throw new APIError(404, `PostType with id: ${id} not found!`);
            }
            return res.status(200).json(PostType);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the PostType with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            const PostType = await PostType.findOneAndRemove({ _id: id });

            if (!PostType) {
                throw new APIError(404, `PostType with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the PostType with id: ${id}!` });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the PostType with id: ${id}!`, next);
        }
    }
}

export default PostTypeController;
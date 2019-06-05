import { Comment } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class CommentController {
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let comments = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                comments = await Comment.paginate({}, options);
            } else {
                comments = await Comment.find().sort({ created_at: -1 }).exec();
            }

            if (comments === undefined || comments === null) {
                throw new APIError(404, 'Collection for comments not found!');
            }
            return res.status(200).json(comments);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving comments', next);
        }
    }

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Comment.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Comment with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving comments', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            comments: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const CommentCreate = new Comment({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
            });
            const Comment = await CommentCreate.save();
            return res.status(201).json(Comment);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Comment!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Comment = await Comment.findById(id).exec();

            if (!Comment) {
                throw new APIError(404, `Comment with id: ${id} not found!`);
            } else {
                const vm = {
                    Comment,
                    comments: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Comment with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const CommentUpdate = req.body;
            const Comment = await Comment.findOneAndUpdate({ _id: id }, CommentUpdate, { new: true }).exec();

            if (!Comment) {
                throw new APIError(404, `Comment with id: ${id} not found!`);
            }
            return res.status(200).json(Comment);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Comment with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Comment = await Comment.findOneAndRemove({ _id: id });

            if (!Comment) {
                throw new APIError(404, `Comment with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Comment with id: ${id}!` });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Comment with id: ${id}!`, next);
        }
    }
}

export default CommentController;
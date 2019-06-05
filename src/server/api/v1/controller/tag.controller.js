import { Tag } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class TagController {
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let tags = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                tags = await Tag.paginate({}, options);
            } else {
                tags = await Tag.find().sort({ created_at: -1 }).exec();
            }

            if (tags === undefined || tags === null) {
                throw new APIError(404, 'Collection for tags not found!');
            }
            return res.status(200).json(tags);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving tags', next);
        }
    }

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Tag.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Tag with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving tags', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            tags: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const TagCreate = new Tag({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
            });
            const Tag = await TagCreate.save();
            return res.status(201).json(Tag);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Tag!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Tag = await Tag.findById(id).exec();

            if (!Tag) {
                throw new APIError(404, `Tag with id: ${id} not found!`);
            } else {
                const vm = {
                    Tag,
                    tags: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Tag with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const TagUpdate = req.body;
            const Tag = await Tag.findOneAndUpdate({ _id: id }, TagUpdate, { new: true }).exec();

            if (!Tag) {
                throw new APIError(404, `Tag with id: ${id} not found!`);
            }
            return res.status(200).json(Tag);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Tag with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Tag = await Tag.findOneAndRemove({ _id: id });

            if (!Tag) {
                throw new APIError(404, `Tag with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Tag with id: ${id}!` });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Tag with id: ${id}!`, next);
        }
    }
}

export default TagController;
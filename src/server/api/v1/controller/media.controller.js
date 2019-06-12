import { Media } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class MediaController {
    index = async (req, res, next) => {
        try {
            const { limit, skip } = req.query;
            let medias = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: { created_at: -1 },
                };
                medias = await Media.paginate({}, options);
            } else {
                medias = await Media.find().sort({ created_at: -1 }).exec();
            }

            if (medias === undefined || medias === null) {
                throw new APIError(404, 'Collection for medias not found!');
            }
            return res.status(200).json(medias);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving medias', next);
        }
    }

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const { id } = req.params;
            const item = await Media.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Media with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving medias', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            medias: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const MediaCreate = new Media({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
            });
            const Media = await MediaCreate.save();
            return res.status(201).json(Media);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Media!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Media = await Media.findById(id).exec();

            if (!Media) {
                throw new APIError(404, `Media with id: ${id} not found!`);
            } else {
                const vm = {
                    Media,
                    medias: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Media with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const MediaUpdate = req.body;
            const Media = await Media.findOneAndUpdate({ _id: id }, MediaUpdate, { new: true }).exec();

            if (!Media) {
                throw new APIError(404, `Media with id: ${id} not found!`);
            }
            return res.status(200).json(Media);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Media with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            const Media = await Media.findOneAndRemove({ _id: id });

            if (!Media) {
                throw new APIError(404, `Media with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Media with id: ${id}!` });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Media with id: ${id}!`, next);
        }
    }
}

export default MediaController;
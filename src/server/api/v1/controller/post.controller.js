/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Post } from '../database';
import { APIError, handleAPIError } from '../../../utilities';

class PostController {
    /* TODO: Make Cleaner */
    // List all the models
    index = async (req, res, next) => {
        try {
            const { limit, skip, search, category } = req.query;
            
            

            let posts;
            let query;
            let sort;

            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate:  ['category', 'user', 'type', 'media', 'tags'],
                    sort: { created_at: -1 },
                };
                posts = await Post.paginate({}, options);
            }  else {
                
                if (search) {
                    query = {
                        title: {
                            $regex: search,
                            $options: 'i'
                        }
                    }
                }
           
                sort = req.query.sort || { created_at: -1 }; 
    
                posts = await Post.find(query)
                    .populate('category', 'name')
                    .populate('user', 'avatar name address')
                    .populate('type', 'name')
                    .populate('tags', 'name')
                    .populate('media')
                    .sort(sort).exec();
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
            const item = await Post.findById(id)
            .populate('category')
            .populate('user')
            .populate('type')
            .populate('tags')
            .populate('media').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Post with id: ${id} not found!`);
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
            const postCreate = new Post({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
                category: req.body.categoryId,
                type: req.body.type,
                user: req.body.user,
                tags: req.body.tags
            });
            const post = await postCreate.save();
            return res.status(201).json(post);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Post!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const { id } = req.params;

        try {
            const post = await Post.findById(id).exec();

            if (!post) {
                throw new APIError(404, `Post with id: ${id} not found!`);
            } else {
                const vm = {
                    post,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Post with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const { id } = req.params;

        try {
            const postUpdate = req.body;
            const post = await Post.findOneAndUpdate({ _id: id }, postUpdate, { new: true }).exec();

            if (!post) {
                throw new APIError(404, `Post with id: ${id} not found!`);
            }
            return res.status(200).json(post);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Post with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const { id } = req.params;

        try {
            let post = null;

            let { mode } = req.query;
            if (mode) {
                post = await Post.findByIdAndUpdate({ _id: id }, { deleted_at: (mode === 'softdelete' ? Date.now() : null) }, { new: true });
            } else {
                mode = 'delete';
                post = await Post.findOneAndRemove({ _id: id });
            }

            if (!post) {
                throw new APIError(404, `Post with id: ${id} not found!`);
            } else {
                return res.status(200).json({ message: `Successful deleted the Post with id: ${id}!`, post, mode });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Post with id: ${id}!`, next);
        }
    }
}

export default PostController;

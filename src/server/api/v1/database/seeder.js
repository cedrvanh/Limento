/*
Import the external libraries:
- faker
*/
import faker from 'faker';

/*
Import the internal libraries:
- logger
- Blog
- Category
- Post
- User
*/
import { logger } from '../../../utilities';
import { Blog, Category, Post, User, Tag, PostType, Media } from './schemas';

class Seeder {
    constructor() {
        this.blogs = [];
        this.categories = [];
        this.posts = [];
        this.users = [];
        this.tags = [];
        this.postTypes = [];
        this.media = [];
    }

    blogCreate = async (title, description) => {
        const blogDetail = {
            title,
            description,
            categoryId: this.getRandomCategory(),
            posts: this.getRandomPosts(),
        };
        const blog = new Blog(blogDetail);

        try {
            const newblog = await blog.save();
            this.blogs.push(newblog);

            logger.log({ level: 'info', message: `Blog created with id: ${newblog.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a blog: ${err}!` });
        }
    }

    categoryCreate = async (name, description) => {
        const categoryDetail = {
            name,
            description,
        };
        const category = new Category(categoryDetail);

        try {
            const newCategory = await category.save();

            this.categories.push(newCategory);

            logger.log({ level: 'info', message: `Category created with id: ${newCategory.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a category: ${err}!` });
        }
    }

    mediaCreate = async (path) => {
        const mediaDetail = {
            path,
        };
        const singleMedia = new Media(mediaDetail);

        try {
            const newMedia = await singleMedia.save();

            this.media.push(newMedia);

            logger.log({ level: 'info', message: `Media created with id: ${newMedia.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating media: ${err}!` });
        }
    }

    postTypeCreate = async (name, description) => {
        const postTypeDetail = {
            name,
            description
        };
        const postType = new PostType(postTypeDetail);

        try {
            const newPostType = await postType.save();
            this.postTypes.push(newPostType);

            logger.log({ level: 'info', message: `Post type created with id: ${newPostType.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a post type: ${err}!` });
        }
    }

    postCreate = async (title, synopsis, body) => {
        const postDetail = {
            title,
            synopsis,
            body,
            user: this.getRandomUser(),
            type: this.getRandomPostType(),
            category: this.getRandomCategory(),
            media: this.getRandomMedia(),
        };
        const post = new Post(postDetail);

        try {
            const newPost = await post.save();
            this.posts.push(newPost);

            logger.log({ level: 'info', message: `Post created with id: ${newPost.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a post: ${err}!` });
        }
    }

    userCreate = async (avatar, name, email, city, street, password) => {
        const userDetail = {
            avatar,
            name,
            email,
            address: {
                city,
                street
            },
            localProvider: {
                password,
            }
        };
        const user = new User(userDetail);

        try {
            const newUser = await user.save();
            this.users.push(newUser);

            logger.log({ level: 'info', message: `User created with id: ${newUser.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a user: ${err}!` });
        }
    }

    tagCreate = async (name, description) => {
        const tagDetail = {
            name,
            description,
        };
        const tag = new Tag(tagDetail);

        try {
            const newTag = await tag.save();

            this.tags.push(newTag);

            logger.log({ level: 'info', message: `Tag created with id: ${newTag.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a tag: ${err}!` });
        }
    }

    createBlogs = async () => {
        await Promise.all([
            (async () => this.blogCreate(faker.lorem.sentence(), faker.lorem.paragraph()))(),
        ]);
    }

    createCategories = async () => {
        await Promise.all([
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
        ]);
    }

    createMedia = async () => {
        await Promise.all([
            (async () => this.mediaCreate('https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'))(),
            (async () => this.mediaCreate('https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'))(),
            (async () => this.mediaCreate('https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'))(),
            (async () => this.mediaCreate('https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'))(),
        ]);
    }

    createUsers = async () => {
        await Promise.all([
            (async () => this.userCreate('https://randomuser.me/api/portraits/men/67.jpg', faker.name.firstName() + ' ' + faker.name.lastName(), faker.internet.email(), faker.address.city(), faker.address.streetAddress(), 'wicked4u'))(),
            (async () => this.userCreate('https://randomuser.me/api/portraits/women/67.jpg', faker.name.firstName() + ' ' + faker.name.lastName(), faker.internet.email(), faker.address.city(), faker.address.streetAddress(), 'wicked4u'))(),
            (async () => this.userCreate('https://randomuser.me/api/portraits/men/50.jpg', faker.name.firstName() + ' ' + faker.name.lastName(), faker.internet.email(), faker.address.city(), faker.address.streetAddress(), 'wicked4u'))(),
            (async () => this.userCreate('https://randomuser.me/api/portraits/men/27.jpg', faker.name.firstName() + ' ' + faker.name.lastName(), faker.internet.email(), faker.address.city(), faker.address.streetAddress(), 'wicked4u'))(),
            (async () => this.userCreate('https://randomuser.me/api/portraits/men/34.jpg', 'John Doe', 'test@example.com', faker.address.city(), faker.address.streetAddress(), 'secret'))(),
        ]);
    }

    createPosts = async () => {
        await Promise.all([
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
        ]);
    }

    createPostTypes = async () => {
        await Promise.all([
            (async () => this.postTypeCreate('Offer', 'Post for people offering food'))(),
            (async () => this.postTypeCreate('Request', 'Post for people that are looking for something to eat'))(),
        ]);
    }

    createTags = async () => {
        await Promise.all([
            (async () => this.tagCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.tagCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.tagCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.tagCreate(faker.lorem.word(), faker.lorem.sentence()))(),
        ]);
    }

    getRandomCategory = () => {
        let category = null;
        if (this.categories && this.categories.length > 0) {
            category = this.categories[Math.round(Math.random() * (this.categories.length - 1))];
        }
        return category;
    }

    getRandomMedia = () => {
        let singleMedia = null;
        if (this.media && this.media.length > 0) {
            singleMedia = this.media[Math.round(Math.random() * (this.media.length - 1))];
        }
        return singleMedia;
    }

    getRandomUser = () => {
        let user = null;
        if (this.users && this.users.length > 0) {
            user = this.users[Math.round(Math.random() * (this.users.length - 1))];
        }
        return user;
    }
    
    getRandomPostType = () => {
        let postType = null;
        if (this.postTypes && this.postTypes.length > 0) {
            postType = this.postTypes[Math.round(Math.random() * (this.postTypes.length - 1))];
        }
        return postType;
    }

    getRandomPosts = () => {
        let cPosts = null;
        if (this.posts && this.posts.length > 0) {
            const nPosts = Math.round(Math.random() * (this.posts.length - 1));
            cPosts = this.posts.slice(0, this.posts.length);
            while (cPosts.length > nPosts) {
                cPosts.splice(Math.round(Math.random() * (this.posts.length - 1)), 1);
            }
        }
        return cPosts;
    }

    seed = async () => {
        this.categories = await Category.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createCategories();
            }
            return Category.find().exec();
        });

        this.media = await Media.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createMedia();
            }
            return Media.find().exec();
        });

        this.users = await User.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createUsers();
            }
            return User.find().exec();
        });  

        this.postTypes = await PostType.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createPostTypes();
            }
            return PostType.find().exec();
        });

        this.posts = await Post.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createPosts();
            }
            return Post.find().exec();
        });

        this.blogs = await Blog.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createBlogs();
            }
            return Blog.find().exec();
        });

        this.tags = await Tag.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createTags();
            }
            return Tag.find().exec();
        });
    }
}
export default Seeder;

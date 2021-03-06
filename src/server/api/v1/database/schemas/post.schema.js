import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        title: { type: String, required: true, max: 128 },
        synopsis: { type: String, required: true, max: 1024 },
        body: { type: String, required: false },
        slug: {
            type: String, lowercase: true, unique: true, required: true,
        },
        price: { type: Number, required: false },
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
        media: { type: Schema.Types.ObjectId, ref: 'Media', required: false },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: Schema.Types.ObjectId, ref: 'PostType', required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: false }]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

PostSchema.methods.slugify = function () {
    this.slug = slug(this.title);
};

PostSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

PostSchema.virtual('id').get(function () { return this._id; });

/*
TODO: Move

PostSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});

PostSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id',
    justOne: true,
});

PostSchema.virtual('type', {
    ref: 'PostType',
    localField: 'typeId',
    foreignField: '_id',
    justOne: true,
});

PostSchema.virtual('media', {
    ref: 'Media',
    localField: 'media',
    foreignField: '_id',
    justOne: true,
});
*/

PostSchema.index({ title: "text" });

PostSchema.plugin(mongoosePaginate);
export default mongoose.model('Post', PostSchema);

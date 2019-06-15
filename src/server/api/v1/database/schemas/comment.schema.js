import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        author: { 
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true 
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true,
        },
        body: { type: String, required: true, max: 512 },
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

CommentSchema.virtual('id').get(function () { return this._id; });

CommentSchema.plugin(mongoosePaginate);
export default mongoose.model('Comment', CommentSchema);
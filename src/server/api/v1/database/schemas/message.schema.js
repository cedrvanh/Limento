import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
        body: { type: String, required: true, max: 512 },
        author: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
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

MessageSchema.virtual('id').get(function () { return this._id; });
MessageSchema.virtual('user', {
    ref: 'User',
    localField: 'author',
    foreignField: '_id',
    justOne: true,
});

MessageSchema.plugin(mongoosePaginate);
export default mongoose.model('Message', MessageSchema);
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const ConversationSchema = new Schema(
    {
        userOneId: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        userTwoId: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Messages'
        }],
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

ConversationSchema.virtual('id').get(function () { return this._id; });
ConversationSchema.virtual('user', {
    ref: 'User',
    localField: 'author',
    foreignField: '_id',
    justOne: true,
});

ConversationSchema.plugin(mongoosePaginate);
export default mongoose.model('Conversation', ConversationSchema);
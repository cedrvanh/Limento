import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const ConversationSchema = new Schema(
    {
        userOne: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        userTwo: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
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

ConversationSchema.plugin(mongoosePaginate);
export default mongoose.model('Conversation', ConversationSchema);

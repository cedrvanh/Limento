import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const MessageSchema = new Schema(
    {
        conversation: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true 
        },
        sender: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
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

MessageSchema.virtual('id').get(function () { return this._id; });

MessageSchema.plugin(mongoosePaginate);
export default mongoose.model('Message', MessageSchema);
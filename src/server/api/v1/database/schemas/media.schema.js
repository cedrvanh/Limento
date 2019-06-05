import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;

const MediaSchema = new Schema(
    {
        path: { type: String, required: true },
        type: { type: String, required: true },
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

MediaSchema.virtual('id').get(function () { return this._id; });

MediaSchema.plugin(mongoosePaginate);
export default mongoose.model('Media', MediaSchema);
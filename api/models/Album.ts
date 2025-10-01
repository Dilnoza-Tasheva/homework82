import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: [true, 'Artist is requried'],
    },
    releaseDate: {
        type: Number,
        required: true,
    },
    coverImage: String,
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;


import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'Album is required'],
    },
    length: String,
    trackNumber: {
        type: String,
        required: true,
    },
    performer: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;
import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
    try {
        const albumId = req.query.album;

        if (albumId) {
            const tracks = await Track.find({ album: albumId }).populate("album", "title");
           res.send(tracks);
           return;
        }

        const tracks = await Track.find().populate("album", "title");
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', async (req, res, next) => {
    if (req.body.album) {
        const album = await Album.findById(req.body.album);
        if (!album) {
            res.status(404).send('Not Found album');
            return;
        }
    }

    const newTrack = {
        album: req.body.album,
        title: req.body.title,
        length: req.body.length,
    };

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;

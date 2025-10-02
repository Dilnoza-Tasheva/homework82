import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

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

tracksRouter.post('/', auth, async (req, res, next) => {
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

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findByIdAndDelete(req.params.id);
        if (!track) {
            res.status(404).send({message: "Track not found"});
            return;
        }
        res.send({message: "Track deleted"});
    } catch (e) {
        next(e);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            res.status(404).send({message: "Track not found"});
            return;
        }
        track.isPublished = !track.isPublished;
        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;

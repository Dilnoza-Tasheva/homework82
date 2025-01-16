import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistWihtoutId} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('photo'), async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send("Name is required");
        return;
    }

    const newArtist: ArtistWihtoutId = {
        name: req.body.name,
        photo: req.file ? '/fixtures' + req.file.filename : null,
        information: req.body.information,
    };

    try {
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch (e) {
        next(e);
    }
});

export default artistsRouter;


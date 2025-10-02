import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistWihtoutId} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', auth, imagesUpload.single('photo'), async (req, res, next) => {
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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            res.status(404).send({message: 'Artist not found'});
            return;
        }
        res.send({message: 'Artist deleted'});
    } catch (e) {
        next(e);
    }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
   try {
       const artist = await Artist.findById(req.params.id);
       if(!artist) {
           res.status(404).send({message: 'Artist not found'});
           return;
       }
       artist.isPublished = !artist.isPublished;
       await artist.save();
       res.send(artist);
   } catch (e) {
       next(e);
   }
});

export default artistsRouter;


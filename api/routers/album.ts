import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    try {
        const artistId = req.query.artist;

        if (artistId) {
            const albums = await Album.find({ artist: artistId }).populate("artist", "name");
            res.send(albums);
            return;
        }

        const albums = await Album.find().populate("artist", "name");
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    if (!req.params.id) {
        res.status(404).send('Not found!');
    }

    try {
        const album = await Album.findById(id).populate("artist", "name photo information");

        if (!album) res.status(404).send('Album not found!');

        res.send(album);
    }catch (e) {
        next(e);
    }
});

albumsRouter.post('/', imagesUpload.single('coverImage'), async (req, res, next) => {

    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);
        if (!artist) {
            res.status(404).send('Artist not found')
            return;
        }
    }

    const newAlbum = {
        artist: req.body.artist,
        title: req.body.title,
        releaseDate: req.body.releaseDate,
        coverImage: req.file ? '/images' + req.file.filename : null,
    };

    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;
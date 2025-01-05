import express from "express";
import mongoose from "mongoose";
import artistsRouter from "./routers/artist";
import albumsRouter from "./routers/album";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(err => console.log(err));

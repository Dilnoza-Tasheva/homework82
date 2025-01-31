import express from "express";
import mongoose from "mongoose";
import artistsRouter from "./routers/artist";
import albumsRouter from "./routers/album";
import tracksRouter from "./routers/track";
import userRouter from "./routers/users";
import trackHistoryRouter from "./routers/trackHistory";
import cors from 'cors';
import config from "./config";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/fixtures', express.static('public/fixtures'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', userRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(err => console.log(err));

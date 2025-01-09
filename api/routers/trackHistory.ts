import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).send({error: 'Authorization header is missing'});
        return;
    }

    try {
        const user = await User.findOne({token: authToken});

        if (!user) {
            res.status(401).send({error: 'Invalid authorization token'});
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: req.body.track,
            dateTime: new Date(),
        });

        await trackHistory.save();
        res.status(201).send(trackHistory);

    } catch (e) {
        next (e);
    }
});

export default trackHistoryRouter;
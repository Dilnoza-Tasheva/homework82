import express from "express";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    try {
        const trackHistory = new TrackHistory({
            user: user._id,
            track: req.body.track,
        });

        await trackHistory.save();
        res.status(201).send(trackHistory);
    } catch (e) {
        next(e);
    }
});

trackHistoryRouter.get("/", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser
    const user = expressReq.user;
    try {
        const history = await TrackHistory.find({ user: user._id })
            .populate("track", "title")
            .populate({
                path: "track",
                populate: { path: "album", select: "title" },
            })
            .sort({ dateTime: -1 });

        res.send(history);
    } catch (e) {
        next(e);
    }
});

export default trackHistoryRouter;
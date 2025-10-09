import express from "express";
import { Error } from 'mongoose';
import User from "../models/User";
import bcrypt from "bcrypt";
import auth, {RequestWithUser} from "../middleware/auth";

const userRouter = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

userRouter.post("/google", async (req, res, next) => {
    try {
        const { credential } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            res.status(400).send({ error: "Google login error!" });
            return;
        }

        const email = payload["email"];
        const googleID = payload["sub"];
        const displayName = payload["name"];
        const avatar = payload["picture"];

        if (!email) {
            res.status(400).send({ error: "Not enough user data to continue" });
            return;
        }

        let user = await User.findOne({ googleID });

        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                googleID,
                displayName,
                avatar,
            });
        }

        user.generateToken();
        await user.save();

        res.send({ message: "Login with Google successful!", user });
        return;
    } catch (e) {
        next(e);
    }
});

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: 'Username not found'});
            return;
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password is incorrect'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Username and password are correct', user});

    } catch (error) {
        if (error instanceof  Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

userRouter.delete('/sessions', auth, async (req, res, next) => {
    try {
        const request = req as RequestWithUser;
        const user = request.user;

        user.generateToken();
        await user.save();

        res.send({message: 'Logged out successfully'});
    } catch (e) {
        next(e);
    }
});

export default userRouter;
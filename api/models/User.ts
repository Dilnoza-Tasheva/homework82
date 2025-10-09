import mongoose, { HydratedDocument, Model } from "mongoose";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { UserFields } from "../types";

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<HydratedDocument<UserFields>, UserModel, UserMethods>({
    username: {
        type: String,
        required: function () {
            return !this.googleID;
        },
        unique: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleID;
        },
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    avatar: String,
    googleID: String,
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

UserSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

const User = mongoose.model("User", UserSchema);

export default User;

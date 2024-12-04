import { Schema, Model, model } from "mongoose";
import Iuser from "../interface";

const userSchema = new Schema<Iuser>({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const User: Model<Iuser> = model<Iuser>("User", userSchema);

export default User;
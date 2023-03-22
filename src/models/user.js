import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    contactNumber: {
        required: true,
        type: Number,
    },
    profileImg: {
        required: false,
        type: String,
    }
},{versionKey: false})
export const UserModel = mongoose.model('user', userSchema, 'user')

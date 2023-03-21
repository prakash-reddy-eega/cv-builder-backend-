import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email_id: String,
    contact_num: Number,
    profile_img: String
},{versionKey: false})
export const userModel = mongoose.model('user', userSchema, 'user')

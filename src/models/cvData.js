import mongoose from "mongoose";
const cvDataSchema = new mongoose.Schema({
    userId: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    templete: {
        required: true,
        type: String,
    },
    cvDetails: {
        required: true,
        type: Array,
    }
},{versionKey: false})
export const cvDataModel = mongoose.model('cvData', cvDataSchema, 'cv_data')
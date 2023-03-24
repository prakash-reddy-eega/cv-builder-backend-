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
        basicDetails: {
            required: true,
            type: Array
        },
        education: {
            required: true,
            type: Array
        },
        employmentDetails: {
            required: true,
            type: Array
        },
        projects: {
            required: true,
            type: Array
        },
        skills: {
            required: true,
            type: Array
        },
        socialProfiles: {
            required: false,
            type: Array
        }
    }
},{versionKey: false})
export const cvDataModel = mongoose.model('cvData', cvDataSchema, 'cv_data')
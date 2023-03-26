import mongoose from "mongoose";
const cvDataSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    template: {
        required: true,
        type: String,
    },
    cvDetails: {
        basicDetails: {
            required: false,
            type: Array
        },
        education: {
            required: false,
            type: Array
        },
        employmentDetails: {
            required: false,
            type: Array
        },
        projects: {
            required: false,
            type: Array
        },
        skills: {
            required: false,
            type: Array
        },
        socialprofiles: {
            required: false,
            type: Array
        }
    }
},{versionKey: false})
export const CvDataModel = mongoose.model('cvData', cvDataSchema, 'cv_data')
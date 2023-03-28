import { CvDataModel } from "../../models/cvData.js";
import { APIResponse } from "../../utils/common.js";
import jwt from 'jsonwebtoken'
import { UserModel } from "../../models/user.js";

export const addCv = async (req, res) => {
    try {
        const cvData = req.body
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const id = jwt.decode(token).userID;
        cvData['userId'] = id
        const doc = new CvDataModel(cvData);
        await doc.save();
        const response = new APIResponse(1, "Cv Saved Successfully")
        res.status(201).send(response)
    } catch (err) {
        console.log(err);
        const response = new APIResponse(0, "Exception Occurs: try again later", {
        error: err.message,
        });
        res.status(404).send(response);
    }
}

export const getCvs = async (req, res ) =>{
    try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const id = jwt.decode(token).userID;
        const cvData = await CvDataModel.find({userId: id})
        const response = new APIResponse(1, "Data Found", cvData)
        res.status(200).send(response)
    } catch (err) {
        console.log(err);
        const response = new APIResponse(0, "Exception Occurs: try again later", {
        error: err.message,
        });
        res.status(404).send(response);
    }
}

export const editCv = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id
        const doc = await CvDataModel.findByIdAndUpdate({_id: id},{template: data.template, cvDetails: data.cvDetails})
        const response = new APIResponse(1, "Cv Updated Successfully")
        res.status(200).send(response)
    } catch (err) {
        console.log(err);
        const response = new APIResponse(0, "Exception Occurs: try again later", {
        error: err.message,
        });
        res.status(404).send(response);
    }
}

export const deleteCv = async (req, res) => {
    try {
        const id = req.params.id
        const doc = await CvDataModel.findByIdAndDelete({_id: id})
        const response = new APIResponse(1, "Cv Deleted Successfully")
        res.status(200).send(response)
    } catch (err) {
        console.log(err);
        const response = new APIResponse(0, "Exception Occurs: try again later", {
        error: err.message,
        });
        res.status(404).send(response);
    }
}


import mongoose from "mongoose";

const connectDB = () => {
    return new Promise( (resolve, reject) => {
        console.log(`DB connectiong to ${process.env.MONGOURI}`)
        const dbOptions = {
            dbName: process.env.DB_NAME
        }
        mongoose.connect(process.env.MONGOURI, dbOptions).then( (res, err) => {
            if(err) reject(err)
            console.log("DB connected successfully...");
            resolve()
          }).catch( err => {
            console.log("Error in Connecting to Db !!");
          });
    })
}

export default connectDB
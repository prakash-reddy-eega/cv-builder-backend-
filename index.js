import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import connectDB from './src/config/db.js';
import { authRoutes } from './src/services/index.js';
const port = process.env.PORT;
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json())
app.use('/api', authRoutes)

await connectDB()
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
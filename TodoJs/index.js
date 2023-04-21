import * as dotenv from 'dotenv'
dotenv.config()
import express from "express"
import mongoose from "mongoose";
import router from "./router.js";

import cookieParser from "cookie-parser"
import cors from "cors"

const app = express();

const DB_URL = process.env.MONGO_URL
const PORT = 3000

const corsOptions = {
    origin: process.env.ORIGIN,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use("/", router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
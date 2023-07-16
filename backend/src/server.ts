import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from 'dotenv';
import * as seed from "./seed.js"

//to use the file .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//to log request http
app.use(morgan("dev"));

seed;

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Tournament API listening on: ${process.env.SERVER_PORT}`);
})
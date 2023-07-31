import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from 'dotenv';
//import insertData from "./seed.js";
import  employee  from "./routers/employee.js";
import corsOptions from "./corsConfig.js";

//to use the file .env
dotenv.config();

const app = express();
//app.use(cors());
app.use(cors(corsOptions));

app.use(express.json());
//to log request http
app.use(morgan("dev"));

//insertData();
app.use("/employee", employee);

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`API listening on: ${process.env.SERVER_PORT}`);
})
import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from 'dotenv';
import  employee  from "./routers/employee.js";
import sector from "./routers/sector.js";
import holidaysType from "./routers/holidaysType.js"
import leaveRequest from "./routers/leaveRequest.js"
import documentType from "./routers/documentType.js"
import position from "./routers/position.js"
import corsOptions from "./corsConfig.js";
import report from "./routers/report.js";

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
app.use("/sector", sector);
app.use("/holidaysType", holidaysType);
app.use("/leaveRequest", leaveRequest);
app.use("/documentType", documentType);
app.use("/position", position);
app.use("/report", report);

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`API listening on: ${process.env.SERVER_PORT}`);
})
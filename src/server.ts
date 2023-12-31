require('dotenv').config();
import express = require("express");
import cors = require("cors");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import patientsRouter from "./modules/patients/patientsRouter";
import recordsRouter from "./modules/records/recordsRouter";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());

// @ts-ignore   
// app.use(rawBody)


app.use((req, res, next) => {

    // const origin = req.headers.origin as string;
    // res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Contxprol-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});

app.use((req, res, next) => {
    console.log(req.originalUrl, "\t", req.method, "\t", req.url);
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// router middlewares
app.use("/patients", patientsRouter);
app.use("/records", recordsRouter);

app.get("/", (req, res) => {
    res.send("Hello world");
});

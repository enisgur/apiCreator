const https = require("https");
const http = require("http");
const pathLib = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const config = require("config");

//  my imports
const { testRoute } = require("./config/routes");
const connectDB = require("./config/db");

// Conntect to Database
try {
  connectDB();
} catch (err) {
  console.error("Can't connect to database : ", err);
}

const app = express();
app.use(express.json());

app.use(cors());

app.use(testRoute.testing.main, require(testRoute.testing.mainPath));

// ssl certificates
// const getCertificates = require("./components/functions/sslCredentials");
// const credentials = getCertificates();

const PORThttp = 6000;
const PORThttps = 6060;
// const PORThttp = 80;
// const PORThttps = 443;

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

httpServer.listen(PORThttp, () => console.log("http"));
// httpsServer.listen(PORThttps, () => console.log("https"));

import express from "express";
import cors from "cors"
import initWebRoute from "./routes/api.routes";
var methodOverride = require("method-override");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

global.__basedir = __dirname;
app.use(cors())
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
initWebRoute(app);

app.listen(port, () => {});

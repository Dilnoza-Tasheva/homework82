import express from "express";
import mongoDb from "./mongoDb";
import * as mongoose from "mongoose";
import fs = require("fs");

const app = express();
const port = 8000;

app.use(express.static('public'));
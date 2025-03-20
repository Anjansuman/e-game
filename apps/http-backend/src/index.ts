import express from "express";

const app = express();
app.use(express.json());

import signup from "./routes/auth/signup";
import signin from "./routes/auth/signin";

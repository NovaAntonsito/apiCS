import "reflect-metadata";
import cors from "cors";
import "dotenv/config";
import {router} from "./routes/index";
import express from 'express';
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
require('./utils/strategies')

const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json())
app.use(session({
  secret: process.env.JWT_SECRET as string,
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', router);


app.listen(port, () => {
  console.log("Servidor escuchando desde el puerto", port);
});
  



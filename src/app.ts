import "reflect-metadata";
import cors from "cors";
import "dotenv/config";
import {router} from "./routes/index";
import express from 'express';
import passport from "passport";
require('./utils/strategies')

const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json())
app.use(passport.initialize())
app.use('/api', router);

app.listen(port, () => {
  console.log("Servidor escuchando desde el puerto", port);
});
  



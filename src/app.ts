import "reflect-metadata";
import cors from "cors";
import "dotenv/config";
import {DBConfig} from './config/DBConfig'
import {router} from "./routes/index";
import express from 'express';


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
app.use('/api', router);

app.listen(port, () => {
  console.log("Servidor escuchando desde el puerto", port);
  DBConfig.initialize()
    .then(() => {
      console.log("Conexion con la base de datos fue exitosa");
    })
    .catch((e) => {
      console.log("Error al conectar con la base de datos", e);
    });
});

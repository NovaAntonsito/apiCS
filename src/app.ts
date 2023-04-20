import express from "express";
import "reflect-metadata";
import cors from "cors";
import "dotenv/config";
import {DBConfig} from './config/DBConfig'
import userRouter from './routes/user';


const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json())
app.use('/api',userRouter)

app.listen(port, () => {
  console.log("Servidor escuchando desde el puerto", port);
  DBConfig.initialize()
    .then(() => {
      console.log("Conexion con la base de datos fue exitosa");
    })
    .catch((err) => {
      console.log("Error al conectar con la base de datos", err);
    });
});

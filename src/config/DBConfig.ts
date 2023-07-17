import {DataSource} from 'typeorm'
import {seedtipoPersona} from "../models/Seeds/TiposPersonaSEEDS";

const DBConfig = new DataSource({
    type: 'mariadb',
    host: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.HOST,
    port: 3306,
    username: process.env.NODE_ENV === 'development' ? 'root' : process.env.USER,
    password: process.env.NODE_ENV === 'development' ? '1234' : process.env.PASSWORD,
    database: process.env.NODE_ENV === 'development' ? 'db_local' : process.env.DATABASE,
    entities: [process.env.NODE_ENV === 'development' ?
        './src/models/*{.ts,.js}' :
        './build/models/*.js'],
    extra: {
        connectionLimit: 50
    }
})




DBConfig.initialize()
.then(async() => {
    await seedtipoPersona();
  console.log("Conexion con la base de datos fue exitosa");
})
.catch((e) => {
  console.log("Error al conectar con la base de datos", e);
});


export const getDataSource = (delay = 5000): Promise<DataSource> => {
    if (DBConfig.isInitialized) return Promise.resolve(DBConfig);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (DBConfig.isInitialized) resolve(DBConfig);
        else reject("Failed to create connection with database");
      }, delay);
    });
};
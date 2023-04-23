import {DataSource} from 'typeorm'

const DBConfig = new DataSource({
    type:'mariadb',
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities:["./src/models/*.{js,ts}"],
    synchronize : true,
    extra: {
        connectionLimit: 50,
    }
})
DBConfig.initialize()
.then(async() => {
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
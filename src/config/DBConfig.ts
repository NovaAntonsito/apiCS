import {DataSource} from 'typeorm'

export const DBConfig = new DataSource({
    type:'mariadb',
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities:["./src/models/*.ts"]
})



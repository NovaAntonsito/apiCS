import {MonedaDTO} from "./interfaces/monedaDTO";
import {Repository} from "typeorm";
import {Moneda} from "../models/moneda";
import {getDataSource} from "../config/DBConfig";
import {Cotizaciones} from "../models/cotizacion";

let monedaRepository : Repository<Moneda>;

const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        monedaRepository = appDataSource.getRepository(Moneda)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
initRepo()
const createMoneda = async ({codigo,nombre}:MonedaDTO) =>{
    await initRepo();
    const monedaFound = await monedaRepository.find({where:{codigo,nombre}})
    if(!monedaFound) return false;
    const newMoneda = monedaRepository.create({codigo,nombre})
    const monedaDB = await monedaRepository.save(newMoneda)
    return monedaDB
}

const viewAllMonedas = async () =>{
    await initRepo()
    const monedasFound = await monedaRepository.find();
    if (monedasFound.length === 0) return false;
    return monedasFound
}

const viewOneMoneda = async (id : number)=>{
    await initRepo()
    const monedaFound = await monedaRepository.findOne({where:{id}})
    if(!monedaFound) return false;
    return monedaFound;
}



export {createMoneda,viewOneMoneda,viewAllMonedas}
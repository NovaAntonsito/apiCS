import {MonedaDTO} from "./interfaces/monedaDTO";
import {Repository} from "typeorm";
import {Moneda} from "../models/moneda";
import {getDataSource} from "../config/DBConfig";
import {ResDTO} from "./interfaces/RespuestaDTO";
import {Cotizaciones} from "../models/cotizacion";

let monedaRepository : Repository<Moneda>;
let cotizacionRepository: Repository<Cotizaciones>

const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        monedaRepository = appDataSource.getRepository(Moneda)
        cotizacionRepository = appDataSource.getRepository(Cotizaciones)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
initRepo()
const createMoneda = async ({codigo,nombre,locale}:MonedaDTO) =>{
    await initRepo();
    const monedaFound = await monedaRepository.find({where:{codigo,nombre}})
    if(!monedaFound) return false;
    const newMoneda = monedaRepository.create({codigo,nombre,locale})
    const monedaDB = await monedaRepository.save(newMoneda)
    return new ResDTO(monedaDB.id,true,"La moneda fue creada")
}

const viewAllMonedas = async (pageNumber: number, pageSize: number) =>{
    await initRepo()
    const [monedasFound,totalCount ] = await monedaRepository.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
    });
    if (monedasFound.length === 0) return false;
    return {
        data: monedasFound,
        perPage: pageSize,
        totalRecords: totalCount,
        next: pageNumber + 1,
        previous : pageNumber<=0 ? 0 : pageNumber-1
    };
}

const getCotizacionWithMoneda = async (id: number,pageNumber: number, pageSize: number, order : boolean) =>{
    await initRepo()
    const orderBy = order ? "ASC" : "DESC"
    const [cotizacionFound, totalCount] = await cotizacionRepository
        .createQueryBuilder("c")
        .innerJoin("c.moneda", "m")
        .where("m.id = :id", {id : id})
        .andWhere("c.fecha_Vigencia IS NOT NULL")
        .skip((pageNumber - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount()
    return {
        data: cotizacionFound,
        perPage: pageSize,
        totalRecords: totalCount,
        next: pageNumber + 1,
        previous: pageNumber <= 0 ? 0 : pageNumber - 1
    };
}

const viewOneMoneda = async (id : number)=>{
    await initRepo()
    const monedaFound = await monedaRepository.findOne({where:{id}})
    if(!monedaFound) return false;
    return monedaFound;
}

const updateMoneda = async ({codigo,nombre,locale}:MonedaDTO, id : number) =>{
    await initRepo()
    const monedaFound = await monedaRepository.findOne({where:{id}})
    if (!monedaFound) return false;
    const newMoneda = monedaRepository.create({codigo,nombre,locale})
    Object.assign(monedaFound, newMoneda)
    await monedaRepository.save(monedaFound)
    return true
}

const deleteMoneda = async (id : number) =>{
    await initRepo()
    const monedaFound = await monedaRepository.findOne({where:{id}})
    if (!monedaFound) return false;
    await monedaRepository.delete(id)
    return true
  }




export {createMoneda,viewOneMoneda,viewAllMonedas,updateMoneda, deleteMoneda,getCotizacionWithMoneda}
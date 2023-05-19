import {Cotizaciones} from "../models/cotizacion";
import {Repository} from "typeorm";
import {getDataSource} from "../config/DBConfig";
import {Provincia} from "../models/provincia";
import {Sucursales} from "../models/sucursal";
import {CotizacionDTO} from "./interfaces/cotizacionDTO";
import {Moneda} from "../models/moneda";
import {MonedaDTO} from "./interfaces/monedaDTO";
import {ResDTO} from "./interfaces/RespuestaDTO";


let cotizacionRepository : Repository<Cotizaciones>;
let monedaRepository : Repository<Moneda>


const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        cotizacionRepository = appDataSource.getRepository(Cotizaciones);
        monedaRepository = appDataSource.getRepository(Moneda)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

initRepo();


const viewAllCotizaciones = async (pageNumber: number, pageSize: number) =>{
    await initRepo();
    const allCotizaciones = await cotizacionRepository.find({
        where:{deleted: false},
        relations:["monedas"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize})
    if(allCotizaciones.length === 0) return false
    return {
        data: allCotizaciones,
        perPage: pageSize,
        next: pageNumber + 1,
        previous : pageNumber<=0 ? 0 : pageNumber-1
    };
}

const viewOneCotizaciones = async (id : number) =>{
    await initRepo()
    const cotizacion = await cotizacionRepository.findOne({where:{id}, relations: ["monedas"]})
    if (!cotizacion) return false;
    return cotizacion
}

const createCotizacion = async ({monedas, valor,fechaCotizacion,fechaVigencia}: CotizacionDTO) =>{
    await initRepo();
    const cotiFound = await cotizacionRepository.findOne({where:{monedas,valor,fechaCotizacion,fechaVigencia}})
    if(cotiFound) return false;
    let monedasList : Moneda[] = [];
    await Promise.all(monedas.map(async ({codigo,id} : MonedaDTO) =>{
        const monedaFound = await monedaRepository.findOne({where:{codigo, id}}) as Moneda;
        if(monedaFound){
            monedasList.push(monedaFound)
        }
    }));
    console.log(monedasList)
    const newCotizacion = cotizacionRepository.create({
        valor,
        fechaCotizacion,
        fechaVigencia,
        monedas : monedasList})

    const newCotizacionDB = await cotizacionRepository.save(newCotizacion);
    return new ResDTO(newCotizacionDB.id,true,"La cotizacion fue creada")
}

const softDeleteCotizacion = async (id : number) =>{
    await initRepo();
    const cotiFound = await cotizacionRepository.findOne({where:{id}})
    if(cotiFound){
        cotiFound.deleted = true;
        await cotizacionRepository.save(cotiFound);
        return true
    }else{
        return false
    }
}

const updateCotizacion = async ({monedas, valor,fechaCotizacion,fechaVigencia}:CotizacionDTO, id : number) =>{
    await initRepo();
    const cotiFound = await cotizacionRepository.findOne({where:{id}})
    if(cotiFound){
        let monedasList: Moneda[] = []
        await Promise.all(monedas.map(async ({codigo,id} : MonedaDTO) =>{
            const monedaFound = await monedaRepository.findOne({where:{codigo, id}}) as Moneda;
            if(monedaFound){
                monedasList.push(monedaFound)
            }
        }));
        const newCoti = cotizacionRepository.create({valor,fechaCotizacion,fechaVigencia,monedas : monedasList})
        Object.assign(cotiFound, newCoti)
        await cotizacionRepository.save(cotiFound)
        return true
    }else{
        return false
    }
}


export {createCotizacion,viewAllCotizaciones,viewOneCotizaciones,softDeleteCotizacion, updateCotizacion}
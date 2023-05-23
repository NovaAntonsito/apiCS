import { Cotizaciones } from "../models/cotizacion";
import { Repository } from "typeorm";
import { getDataSource } from "../config/DBConfig";
import { Provincia } from "../models/provincia";
import { Sucursales } from "../models/sucursal";
import { CotizacionDTO } from "./interfaces/cotizacionDTO";
import { Moneda } from "../models/moneda";
import { MonedaDTO } from "./interfaces/monedaDTO";
import { ResDTO } from "./interfaces/RespuestaDTO";
import { obtenerFechaHora } from '../utils/obtenerFechaHora';


let cotizacionRepository: Repository<Cotizaciones>;
let monedaRepository: Repository<Moneda>


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


const viewAllCotizaciones = async (pageNumber: number, pageSize: number) => {
    await initRepo();
    const [allCotizaciones, totalCount] = await cotizacionRepository.findAndCount({
        where: { deleted: false },
        relations: ["moneda"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize
    });
    if (allCotizaciones.length === 0) return false;
    return {
        data: allCotizaciones,
        perPage: pageSize,
        totalRecords: totalCount,
        next: pageNumber + 1,
        previous: pageNumber <= 0 ? 0 : pageNumber - 1
    };
};

const viewOneCotizaciones = async (id: number) => {
    await initRepo()
    const cotizacion = await cotizacionRepository.findOne({ where: { id }, relations: ["monedas"] })
    if (!cotizacion) return false;
    return cotizacion
}

const createCotizacion = async ({ moneda, valor,estado, fechaCotizacion, fechaVigencia }: CotizacionDTO) => {
    await initRepo();
    const cotiFound = await cotizacionRepository.findOne({ where: { moneda,estado, valor, fechaCotizacion, fechaVigencia } })
    if(cotiFound) return false;
    const monedaFound = await monedaRepository.findOne({where:{id : moneda.id, nombre : moneda.nombre}}) as Moneda
    
    //var fechaActual = moment().tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
    const fechaActual = new Date // obtenerFechaHora()
    console.log(fechaActual);

    const fechaCotizacionActual = fechaCotizacion ? fechaCotizacion : fechaActual; // Asignar fecha actual si no se proporciona una fecha

    const newCotizacion = cotizacionRepository.create({
        valor,
        fechaCotizacion: fechaCotizacionActual,
        fechaVigencia,
        estado,
        moneda: monedaFound
    })
    const newCotizacionDB = await cotizacionRepository.save(newCotizacion);
    return new ResDTO(newCotizacionDB.id, true, "La cotizacion fue creada")
}

const softDeleteCotizacion = async (id: number) => {
    await initRepo();
    const cotiFound = await cotizacionRepository.findOne({ where: { id } })
    if (cotiFound) {
        cotiFound.deleted = true;
        await cotizacionRepository.save(cotiFound);
        return true
    } else {
        return false
    }
}

const updateCotizacion = async ({ moneda, valor, estado ,fechaCotizacion, fechaVigencia }: CotizacionDTO, id: number) => {
    await initRepo();

    const cotiFound = await cotizacionRepository.findOne({ where: { id } })
    console.log(cotiFound)
    if (cotiFound) {
        const monedaFound = await monedaRepository.findOne({where: {id : moneda.id, nombre : moneda.nombre}}) as Moneda
        console.log(monedaFound)
        const newCoti = cotizacionRepository.create({ valor, fechaCotizacion,estado ,fechaVigencia, moneda: monedaFound })
        Object.assign(cotiFound, newCoti)
        await cotizacionRepository.save(cotiFound)
        return true
    } else {
        return false
    }
}


export { createCotizacion, viewAllCotizaciones, viewOneCotizaciones, softDeleteCotizacion, updateCotizacion }
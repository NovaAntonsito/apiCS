import { Cotizaciones } from "../models/cotizacion";
import { Repository } from "typeorm";
import { getDataSource } from "../config/DBConfig";
import { CotizacionDTO } from "./interfaces/cotizacionDTO";
import { Moneda } from "../models/moneda";
import { ResDTO } from "./interfaces/RespuestaDTO";



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


const viewAllCotizaciones = async (pageNumber: number, pageSize: number, order: boolean) => {
    await initRepo();
    const orderBy = order ? "ASC" : "DESC"

    const [allCotizaciones, totalCount] = await cotizacionRepository.findAndCount({
        where: { deleted: false },
        relations: ["moneda"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
            fechaCotizacion: orderBy
        }
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

const viewAllCotizacionesEvenDeleted = async (pageNumber: number, pageSize: number, order: boolean) => {
    await initRepo();
    const orderBy = order ? "ASC" : "DESC"
    const [allCotizaciones, totalCount] = await cotizacionRepository.findAndCount({
        relations: ["moneda"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
            fechaCotizacion: orderBy
        }
    });
    if (allCotizaciones.length === 0) return false;
    return {
        data: allCotizaciones,
        perPage: pageSize,
        totalRecords: totalCount,
        next: pageNumber + 1,
        previous: pageNumber <= 0 ? 0 : pageNumber - 1
    };
}

const viewOneCotizaciones = async (id: number) => {
    await initRepo()
    const cotizacion = await cotizacionRepository.findOne({ where: { id }, relations: ["moneda"] })
    if (!cotizacion) return false;
    return cotizacion
}

const createCotizacion = async ({ moneda, valor, estado }: CotizacionDTO) => {
    await initRepo();
    const monedaFound = await monedaRepository.findOne({ where: { id: moneda.id } }) as Moneda
    const cotizacionAnterior = await cotizacionRepository
        .createQueryBuilder("c")
        .innerJoin("c.moneda", "moneda")
        .where("moneda.id = :id", { id: monedaFound.id })
        .andWhere("c.estado = ':estado'", { estado: estado })
        .andWhere("c.deleted = false")
        .getOne()
    if (cotizacionAnterior) {
        console.log(cotizacionAnterior.id)
        await softDeleteCotizacion(cotizacionAnterior.id)
    }
    if (!monedaFound) return false;
    const fechaCotizacionActual = new Date()
    const newCotizacion = cotizacionRepository.create({
        valor,
        fechaCotizacion: fechaCotizacionActual,
        fechaVigencia: null,
        estado,
        moneda: monedaFound
    })
    const newCotizacionDB = await cotizacionRepository.save(newCotizacion);
    return new ResDTO(newCotizacionDB.id, true, "La cotizacion fue creada")
}

const getCotizacionWithMoneda = async (id: number,pageNumber: number, pageSize: number, order : boolean) =>{
    await initRepo()
    const orderBy = order ? "ASC" : "DESC"
    const [cotizacionFound, totalCount] = await cotizacionRepository
        .createQueryBuilder("c")
        .innerJoin("c.moneda", "m")
        .addSelect("m")
        .where("m.id = :id", {id : id})
        .andWhere("c.fecha_Vigencia IS NULL")
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

const softDeleteCotizacion = async (id: number) => {
    await initRepo();
    const cotiFound = await cotizacionRepository.findOne({ where: { id } })
    const fechaActual = new Date()

    if (cotiFound) {
        cotiFound.fechaVigencia = fechaActual
        cotiFound.deleted = true;
        await cotizacionRepository.save(cotiFound);
        return true
    } else {
        return false
    }
}




export { 
    createCotizacion, 
    viewAllCotizaciones, 
    viewOneCotizaciones,
    softDeleteCotizacion, 
    viewAllCotizacionesEvenDeleted,
    getCotizacionWithMoneda
 }
import {getDataSource} from "../config/DBConfig";
import {Repository} from "typeorm";
import {MovimientoCaja} from "../models/MovimientoCaja";
import {CuentaCorriente} from "../models/CuentaCorriente";
import {MovimientoDTO} from "./interfaces/MovimientoDTO";
import {ResDTO} from "./interfaces/RespuestaDTO";

let MovimientoRepository : Repository<MovimientoCaja>
let CuentaCorrienteRepository : Repository<CuentaCorriente>

const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        MovimientoRepository = appDataSource.getRepository(MovimientoCaja)
        CuentaCorrienteRepository = appDataSource.getRepository(CuentaCorriente)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

initRepo()

const createMovimiento = async ({descripcion,monto,tipoMovimiento,cta}: MovimientoDTO)=>{
    await initRepo();
    const movFound = await MovimientoRepository.findOne({
        where : {
            descripcion,
            monto,
            tipoMovimiento,
            cta : {id : cta.id}
        }})
    if(movFound) return "Ya existe ese movimiento"
    const cuentaFound = await CuentaCorrienteRepository.findOne({where : {
        id : cta.id
        }})
    if(!cuentaFound) return "No existe esa cuenta"

    const movCreated = await MovimientoRepository.save(
        MovimientoRepository.create(
            {descripcion,
            monto,
            tipoMovimiento,
            cta : cuentaFound,
            fecha : new Date()
            }
    ))
    return new ResDTO(movCreated.id, true, "El movimiento fue creado")
}

const viewAllMovimientos = async (pageNumber: number, pageSize: number, order: boolean) =>{
    await initRepo();
    const orderBy = order ? "ASC" : "DESC"
    const [allMovs, totalRecords] = await MovimientoRepository.findAndCount({
        relations : ["cta"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
            fecha : orderBy
        }
    })
    if(allMovs.length === 0) return "No existen movimientos en la base de datos"
    return {
        data: allMovs,
        perPage: pageSize,
        totalRecords: totalRecords,
        next: pageNumber + 1,
        previous : pageNumber<=0 ? 0 : pageNumber-1
    };
}

const viewOneMovimiento = async (id : number) =>{
    await initRepo();
    const oneMov = await MovimientoRepository.findOne({where : {id}})
    if(!oneMov) return "No existe ese movimiento"
    return oneMov
}

const delMovimiento = async (id : number) =>{
    await initRepo();
    const oneMov = await MovimientoRepository.findOne({where : {id}})
    if(!oneMov) return "No existe ese movimiento"
    await MovimientoRepository.delete(id)
    return new ResDTO(id, true, "Se borro el movimiento")
}

const updateMovimiento = async (id: number, {descripcion,monto,tipoMovimiento,cta}:MovimientoDTO) =>{
    await initRepo();
    const movFound = await MovimientoRepository.findOne({where: {id}})
    if(!movFound) return "No existe ese movimiento"
    const newMov = MovimientoRepository.create({descripcion,monto,tipoMovimiento,cta, fecha : new Date()})
    await MovimientoRepository.save(
        Object.assign(movFound, newMov)
    );
    return new ResDTO(id, true, "Se actualizo el movimiento")
}


export {viewOneMovimiento, viewAllMovimientos, createMovimiento, delMovimiento, updateMovimiento}
import {Repository} from "typeorm";
import {getDataSource} from "../config/DBConfig";
import {Cuenta} from "../models/cuenta";
import {CuentaDTO} from "./interfaces/cuentaDTO";
import {ResDTO} from "./interfaces/RespuestaDTO";
import {Persona} from "../models/persona";



let cuentaRepository : Repository<Cuenta>
let personaRepository : Repository<Persona>
const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        cuentaRepository = appDataSource.getRepository(Cuenta)
        personaRepository = appDataSource.getRepository(Persona)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

initRepo();


const createCuenta = async ({descripcion, persona}: CuentaDTO) =>{
    await initRepo();
    const cuentaFound = await cuentaRepository.findOne({
        where :{persona : {id : persona.id}}})
    if(cuentaFound) return false
    const personaFound  = await personaRepository.findOne({where : {id : persona.id}})
    if(!personaFound) return false

    const newCuenta = await cuentaRepository.save(cuentaRepository.create({descripcion, persona : personaFound}))
    return new ResDTO(newCuenta.id, true, "La cuenta fue creada")
}

const viewAllCuentas = async (pageNumber: number, pageSize: number, order: boolean)=>{
    await initRepo();
    const orderBy = order ? "ASC" : "DESC"
    const [allCuentas, totalRecords] = await cuentaRepository.findAndCount({
        relations: ["persona"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order : {
            descripcion : orderBy
        }
    })
    if(allCuentas.length === 0) return false
    return {
        data: allCuentas,
        perPage: pageSize,
        totalRecords: totalRecords,
        next: pageNumber + 1,
        previous: pageNumber <= 0 ? 0 : pageNumber - 1
    };
}

const viewOneCuenta=  async (id : number) =>{
    await  initRepo()
    const cuentaFound = await cuentaRepository.findOne({where : {id}})
    if(!cuentaFound) return false
    return cuentaFound;
}

const deleteCuenta = async (id : number) =>{
    await initRepo()
    const cuentaFound = await cuentaRepository.findOne({where: {id}})
    if(!cuentaFound) return false;
    await cuentaRepository.delete(id)
    return new ResDTO(id, true, "La cuenta fue borrada")
}

const updateCuenta = async (id: number, {descripcion, persona}: CuentaDTO)=>{
    await initRepo()
    const cuentaFound = await cuentaRepository.findOne({where: {id}})
    if(!cuentaFound) return false
    const personaFound = await personaRepository.findOne({where:{id : persona.id}})
    if(!personaFound) return false
    const updateCuenta = cuentaRepository.create({descripcion, persona : personaFound})
    const updatedCuenta = Object.assign(cuentaFound, updateCuenta)
    await cuentaRepository.save(updatedCuenta)
    return new ResDTO(id, true, "La cuenta fue actualizada")
}


export {createCuenta,viewAllCuentas,viewOneCuenta,deleteCuenta, updateCuenta}
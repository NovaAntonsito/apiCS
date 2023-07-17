import {getDataSource} from "../config/DBConfig";
import {Repository} from "typeorm";
import {CuentaCorriente} from "../models/CuentaCorriente";
import {CtaDTO} from "./interfaces/ctaDTO";
import {Persona} from "../models/persona";
import {Moneda} from "../models/moneda";
import {ResDTO} from "./interfaces/RespuestaDTO";

let CtaRepository : Repository<CuentaCorriente>;
let PersonaRepository : Repository<Persona>
let MonedaRepository : Repository<Moneda>

const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        CtaRepository = appDataSource.getRepository(CuentaCorriente);
        PersonaRepository = appDataSource.getRepository(Persona);
        MonedaRepository = appDataSource.getRepository(Moneda);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

initRepo();


const viewAllCTAs = async (pageNumber: number, pageSize: number, order: boolean) =>{
    await initRepo();
    const orderBy = order ? "ASC" : "DESC";
    const [allCTAs, totalRecords] = await CtaRepository.findAndCount({
        relations : ["moneda", "persona"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
            saldo : orderBy
        }})
    if(allCTAs.length === 0) return false

    return {
        data: allCTAs,
        perPage: pageSize,
        totalRecords: totalRecords,
        next: pageNumber + 1,
        previous: pageNumber <= 0 ? 0 : pageNumber - 1
    };
}

const viewOneCTA = async (id : number) =>{
    await initRepo()
    const oneCTA = await CtaRepository.findOne({
        relations : ["moneda", "persona"],
        where : {id}
    })
    if(!oneCTA) return false
    return oneCTA;
}

const createCTA = async ({persona,moneda,saldo}:CtaDTO)=>{
 await initRepo();
 if(moneda && persona){
     const cuentaFound = await CtaRepository.findOne({
         where: {
             persona : {
                 id : persona.id
             }}
     })
     const monedaFound = await MonedaRepository.findOne({where : {id : moneda.id}})
     const personaFound = await PersonaRepository.findOne({where: {id : persona.id}})
     if(cuentaFound) return "Ya existe la cuenta";
     if(monedaFound && personaFound){
         const newCTA = CtaRepository.create({persona,moneda,saldo})
         const newCTADB = await CtaRepository.save(newCTA)
         return new ResDTO(newCTADB.id, true, "La cuenta fue creada")
     }else{
         return "No existe la moneda o la persona"
     }
 }else{
     return "Faltan elementos el body";
 }
}

const updateCTA = async (id : number,{persona,moneda,saldo}:CtaDTO) =>{
    await initRepo();
    const cuentaFound = await CtaRepository.findOne({where : {id}})
    if(!cuentaFound) return "Cuenta no encontrada"
    const monedaFound = await MonedaRepository.findOne({where:{id : moneda.id}})
    if(!monedaFound) return "Moneda no encontrada"
    const personaFound = await PersonaRepository.findOne({where: {id : persona.id}})
    if(!personaFound) return "Persona no encontrada"
    const newCTA = CtaRepository.create({persona : personaFound,moneda: monedaFound,saldo})
    await CtaRepository.save(Object.assign(cuentaFound, newCTA))
    return new ResDTO(id, true, "La cuenta fue actualizado")
}

const delCTA = async (id : number) =>{
    await initRepo();
    const cuentaFound = await CtaRepository.findOne({where : {id}})
    if(!cuentaFound) return false;
    await CtaRepository.delete(id);
    return new ResDTO(id, true, "La cuenta fue borrada")
}

export {delCTA,updateCTA,createCTA,viewOneCTA,viewAllCTAs}
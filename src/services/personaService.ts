
import {getDataSource} from "../config/DBConfig";
import {Persona} from "../models/persona";
import {Repository} from "typeorm";
import {PersonaDTO} from "./interfaces/PersonaDTO";
import {Pais} from "../models/pais";
import {Provincia} from "../models/provincia";
import {ResDTO} from "./interfaces/RespuestaDTO";
import {TipoTransaccion} from "../models/tipoTransaccion";

let PersonaRepository : Repository<Persona>
let PaisRepository : Repository<Pais>
let ProvinciaRepositroy : Repository<Provincia>
let TipoRepository : Repository<TipoTransaccion>
const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        PersonaRepository = appDataSource.getRepository(Persona)
        PaisRepository = appDataSource.getRepository(Pais)
        ProvinciaRepositroy = appDataSource.getRepository(Provincia)
        TipoRepository = appDataSource.getRepository(TipoTransaccion)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

initRepo();


const createPersona = async ({nombre,tipoTransaccion,razonSocial,cuit,telefono,direccion,pais,provincia,email}:PersonaDTO) =>{
    await initRepo()
    const personaFound = await PersonaRepository.findOne({where:{cuit, nombre}})
    if(personaFound) return false;

    if(pais && provincia){
        const paisFound = await PaisRepository.findOne({where: {id : pais.id}})
        const provinciaFound = await ProvinciaRepositroy.findOne({where:{id : provincia.id}})
        let tipoArray : TipoTransaccion[] = []
        if (tipoTransaccion) {
            await Promise.all(
                tipoTransaccion.map(async (tipo) => {
                    const tipoFound = await TipoRepository.findOne({ where: { id: tipo.id } });
                    console.log(tipoFound);
                    if (tipoFound) {
                        tipoArray.push(tipoFound);
                    } else {
                        throw new Error("No existe esa transaccion");
                    }
                })
            );
        }
        const createNewPersona = await PersonaRepository.save(
            PersonaRepository.create({
                nombre,
                tipos : tipoArray,
                razonSocial,
                cuit,
                telefono,
                direccion,
                pais : paisFound,
                provincia : provinciaFound,
                email
            })
        )
        return new ResDTO(createNewPersona.id, true, "La persona fue creada")
    }else{
        return new ResDTO(0, false, "No tiene provincia o pais")
    }

}

const viewAllPersona = async (pageNumber: number, pageSize: number, order: boolean)=>{
    await initRepo();
    const orderBy = order ? "ASC" : "DESC"
    const [allPersonas, totalRecords] = await PersonaRepository.findAndCount({
        relations:["pais","provincia", "tipos"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
            nombre: orderBy
        }
    })
    if(allPersonas.length === 0) return false
 return {
        data: allPersonas,
        perPage: pageSize,
        totalRecords: totalRecords,
        next: pageNumber + 1,
        previous: pageNumber <= 0 ? 0 : pageNumber - 1
    };
}


const viewOnePersona = async (id : number) =>{
    await initRepo()
    const personaFound = await PersonaRepository.findOne({where:{id}, relations: ["pais","provincia"]})
    if(!personaFound) return false
    return personaFound
}

const deletePersona = async (id: number) =>{
    await initRepo()
    const personaFound = await PersonaRepository.findOne({where:{id}})
    if(!personaFound) return false
    await PersonaRepository.delete(id)
    return new ResDTO(id, true, "La persona fue borrada de la base de datos")
}

const updatePersona = async ({nombre,tipoTransaccion,telefono,cuit,direccion,email,razonSocial,pais,provincia}:PersonaDTO, id : number) =>{
    await initRepo()
    const personaFound = await PersonaRepository.findOne({where:{id}}) as Persona
    if(!personaFound) return false;
    const paisFound = await PaisRepository.findOne({where: {id: pais?.id}})
    const provinciaFound = await ProvinciaRepositroy.findOne({where: {id: provincia?.id}})
    personaFound.tipos = [];
    let tipoArray : TipoTransaccion[] = []
    if(tipoTransaccion){
        tipoTransaccion.map(async (tipo) =>{
            const tipoFound = await TipoRepository.findOne({where: {id : tipo.id}})
            if(tipoFound){
                tipoArray.push(tipoFound)
            }else{
                return "No existe esa transaccion"
            }
        })
    }
    const createNewPersona = PersonaRepository.create({
        nombre,
        razonSocial,
        tipos : tipoArray,
        cuit,
        telefono,
        direccion,
        pais: paisFound,
        provincia: provinciaFound,
        email
    })

    const updatedPersona = Object.assign(personaFound, createNewPersona)
    await PersonaRepository.save(updatedPersona)
    return new ResDTO(id, true, "La persona fue actualizado")
}


export {viewAllPersona,viewOnePersona,deletePersona,updatePersona,createPersona}
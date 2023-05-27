import {getDataSource} from "../config/DBConfig";
import {Repository} from "typeorm";
import {Pais} from "../models/pais";
import {ResDTO} from "./interfaces/RespuestaDTO";


let paisRepository : Repository<Pais>
const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        paisRepository = appDataSource.getRepository(Pais)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
initRepo()

const createPais = async (nombre : string) =>{
    await initRepo();
    console.log(nombre)
    const paisFound = await paisRepository.findOne({where : {nombre}})
    if(paisFound) return false;
    const newPaisTemplate = paisRepository.create({nombre})
    const newPais = await paisRepository.save(newPaisTemplate)
    console.log(newPais)
    return new ResDTO(newPais.id, true, "El pais fue creado")
}

const viewAllPaises = async (pageNumber : number, pageSize : number, order : boolean)=>{
    await initRepo()
    const orderBy = order ? "ASC" : "DESC"
    const [allPaises, totalRecords] = await paisRepository.findAndCount({
        relations : ["personas", "provincias"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
            nombre: orderBy
        }
    })
    if(allPaises.length === 0) return false;
    return {
        data: allPaises,
        perPage: pageSize,
        totalRecords: totalRecords,
        next: pageNumber + 1,
        previous : pageNumber<=0 ? 0 : pageNumber-1
    };
}

const viewOnePais = async (id : number) =>{
    await  initRepo()
    const paisFound = await paisRepository.findOne({relations: ["personas", "provincias"], where: {id}})
    if (paisFound) return false;
    return paisFound;
}

const deletePais = async (id : number) =>{
    await initRepo()
    const paisFound = await paisRepository.findOne({where:{id}})
    if(!paisFound) return false;
    await paisRepository.delete(id)
    return new ResDTO(id, true, "El pais fue borrado de la base de datos")
}

const updatePais = async (nombre : string, id : number) =>{
    await initRepo()
    const paisFound = await paisRepository.findOne({where: {id}}) as Pais
    if (paisFound) return false;
    const updatePais = paisRepository.create({nombre})
    const updatedPais = Object.assign(paisFound, updatePais)
    return new ResDTO(id, true, "El pais fue actualizado")
}

export {createPais,viewOnePais,viewAllPaises,updatePais,deletePais}
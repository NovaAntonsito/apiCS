import {getDataSource} from "../config/DBConfig";
import {Repository} from "typeorm";
import {Empresa} from "../models/empresa";
import {EmpresaDTO} from "./interfaces/empresaDTO";
import {ResDTO} from "./interfaces/RespuestaDTO";
import {PaisDTO} from "./interfaces/paisDTO";

let EmpresaRepository : Repository<Empresa>
const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        EmpresaRepository = appDataSource.getRepository(Empresa)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

initRepo();

const createEmpresa = async ({nombre}: EmpresaDTO) =>{
    await initRepo();
    const empresaFound = await EmpresaRepository.findOne({where:{nombre}})
    if(empresaFound) return false;
    const newEmpresa = EmpresaRepository.create({nombre})
    const newEmpresaDB = await EmpresaRepository.save(newEmpresa);
    return new ResDTO(newEmpresaDB.id, true, "La empresa fue creada")
}

const viewAllEmpresa = async (pageNumber : number, pageSize : number, order : boolean ) =>{
    await initRepo();
    const orderBy = order ? "ASC" : "DESC"
    const [allEmpresas, totalRecords] = await EmpresaRepository.findAndCount({
        relations: ["empleados"],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        order: {
            nombre: orderBy
        }
    })
    if(allEmpresas.length === 0) return false;
    return {
        data: allEmpresas,
        perPage: pageSize,
        totalRecords: totalRecords,
        next: pageNumber + 1,
        previous: pageNumber <= 0 ? 0 : pageNumber - 1
    };
}

const viewOneEmpresa = async (id : number) =>{
    await initRepo()
    const empresaFound = await EmpresaRepository.findOne({
        relations: ["empleados"],
        where : {id}
    })
    if(!empresaFound) return false;
    return empresaFound
}

const deleteEmpresa = async (id : number) =>{
    await initRepo();
    const empresaFound = await EmpresaRepository.findOne({where:{id}})
    if(!empresaFound) return false;
    await EmpresaRepository.delete(id);
    return new ResDTO(0, true, "La empresa fue borrada de la base de datos")
}

const updateEmpresa = async ({id, nombre}: PaisDTO) =>{
    await initRepo();
    const empresaFound = await EmpresaRepository.findOne({where: {id}}) as Empresa
    if (!empresaFound) return false
    const empresaUpdate = EmpresaRepository.create({nombre})
    const updatedEmpresa = Object.assign(empresaFound, empresaUpdate);
    await EmpresaRepository.save(updatedEmpresa)
    return new ResDTO(updatedEmpresa.id, true, "La empresa fue actualizada")
}

export {viewAllEmpresa,viewOneEmpresa,createEmpresa,updateEmpresa,deleteEmpresa}

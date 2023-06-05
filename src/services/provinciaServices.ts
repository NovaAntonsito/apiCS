import { getDataSource } from "../config/DBConfig";
import { Repository } from "typeorm";
import { Provincia } from "../models/provincia";
import { Sucursales } from "../models/sucursal";
import { provinciaDTO } from './interfaces/provinciaDTO';
import {ResDTO} from "./interfaces/RespuestaDTO";
import {Pais} from "../models/pais";

let ProvinciaRepository: Repository<Provincia>;
let SucursalRepository: Repository<Sucursales>;
let PaisRepository: Repository<Pais>

const initRepo = async () => {
  try {
    const appDataSource = await getDataSource();
    ProvinciaRepository = appDataSource.getRepository(Provincia);
    SucursalRepository = appDataSource.getRepository(Sucursales);
    PaisRepository = appDataSource.getRepository(Pais)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initRepo();


//TODO Pass every arrow function args to a provinciaDTO
const createProvincia = async ({nombre, pais} : provinciaDTO) => {
  await initRepo();
  const provinciaFound  = await ProvinciaRepository.findOne({
    where: { nombre },
  });
  if (provinciaFound) return false;
  if (pais){
    const newProvincia = await ProvinciaRepository.create({ nombre , pais });
    const newProvinciaDB = await ProvinciaRepository.save(newProvincia);
    return new ResDTO(newProvinciaDB.id, true, "La provincia fue creada");
  }else{
    return new ResDTO(0, false, "No se pudo crear la provincia sin un pais")
  }
};

const viewAllProvincias = async (pageNumber: number, pageSize: number) => {
  await initRepo();
  const [provinciaFound, totalCount] = await ProvinciaRepository.findAndCount({
    relations: ["sucursales", "pais"],
    skip: (pageNumber - 1) * pageSize,
    take: pageSize});
  if (provinciaFound.length === 0) return false;
  return {
    data: provinciaFound,
    perPage: pageSize,
    totalRecords: totalCount,
    next: pageNumber + 1,
    previous : pageNumber<=0 ? 0 : pageNumber-1
  };
};

const viewOneProvincia = async ({id}: provinciaDTO) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({ where: { id }, relations: ["sucursales", "pais"] });
  if (!provinciaFound) return false;
  return provinciaFound;
};

const deleteProvincia = async (id : number) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({
    where: { id },
    relations:["sucursales"]
  });
  if (!provinciaFound) return false;

  if(provinciaFound.sucursales?.length !== 0){
    return "No se puede borrar una provincia con hijas"
  }
  await ProvinciaRepository.delete(id);
  return true
};

const updateProvincia = async ({nombre, id, pais} : provinciaDTO) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({ where: { id  }});
  if (!provinciaFound) return false;
  console.log(pais)
  const provinciaToUpdate = await ProvinciaRepository.create({ nombre , pais  });
  console.log(provinciaToUpdate)
  const updatedProvincia = Object.assign(provinciaFound, provinciaToUpdate);
  await ProvinciaRepository.save(updatedProvincia);
  return updatedProvincia;
};

export {
  createProvincia,
  viewAllProvincias,
  viewOneProvincia,
  deleteProvincia,
  updateProvincia,
};

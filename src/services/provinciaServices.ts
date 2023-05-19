import { getDataSource } from "../config/DBConfig";
import { Repository } from "typeorm";
import { Provincia } from "../models/provincia";
import { Sucursales } from "../models/sucursal";
import { provinciaDTO } from './interfaces/provinciaDTO';
import {ResDTO} from "./interfaces/RespuestaDTO";

let ProvinciaRepository: Repository<Provincia>;
let SucursalRepository: Repository<Sucursales>;

const initRepo = async () => {
  try {
    const appDataSource = await getDataSource();
    ProvinciaRepository = appDataSource.getRepository(Provincia);
    SucursalRepository = appDataSource.getRepository(Sucursales);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initRepo();


//TODO Pass every arrow function args to a provinciaDTO
const createProvincia = async ({nombre} : provinciaDTO) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({
    where: { nombre },
  });
  if (provinciaFound) return false;
  const newProvincia = await ProvinciaRepository.create({ nombre });
  const newProvinciaDB = await ProvinciaRepository.save(newProvincia);
  return new ResDTO(newProvinciaDB.id, true, "La provincia fue creada");
};

const viewAllProvincias = async () => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.find({relations: ["sucursales"]});
  if (provinciaFound.length === 0) return false;
  return provinciaFound;
};

const viewOneProvincia = async ({id}: provinciaDTO) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({ where: { id }, relations: ["sucursales"] });
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

const updateProvincia = async ({nombre, id} : provinciaDTO) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({ where: { id  }});
  if (!provinciaFound) return false;
  const provinciaToUpdate = await ProvinciaRepository.create({ nombre  });
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

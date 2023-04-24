import { getDataSource } from "../config/DBConfig";
import { Repository } from "typeorm";
import { Provincia } from "../models/provincia";
import { Sucursales } from "../models/sucursal";

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

const createProvincia = async (nombre: string) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({
    where: { nombre },
  });
  if (provinciaFound) return false;
  const newProvincia = await ProvinciaRepository.create({ nombre });
  await ProvinciaRepository.save(newProvincia);
  return newProvincia;
};

const viewAllProvincias = async () => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.find();
  if (provinciaFound.length === 0) return false;
  return provinciaFound;
};

const viewOneProvincia = async (nombre: string) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.find({ where: { nombre } });
  if (!provinciaFound) return false;
  return provinciaFound;
};

const deleteProvincia = async (nombre: string) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({
    where: { nombre },
  });
  if (!provinciaFound) return false;
  const deletedProvincia = await ProvinciaRepository.delete(provinciaFound);
  return true;
};

const updateProvincia = async (nombre: string, id: number) => {
  await initRepo();
  const provinciaFound = await ProvinciaRepository.findOne({ where: { id } });
  if (!provinciaFound) return false;
  const provinciaToUpdate = await ProvinciaRepository.create({ nombre });
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

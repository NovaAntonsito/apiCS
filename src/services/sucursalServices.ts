import {getDataSource} from '../config/DBConfig'
import { Repository } from 'typeorm';
import { Provincia } from '../models/provincia';
import { Sucursales } from '../models/sucursal';
import { SucursalDTO } from './interfaces/sucursalDTO';



let ProvinciaRepository : Repository<Provincia>
let SucursalRepository : Repository<Sucursales>

const initRepo = async () => {
    try {
      const appDataSource = await getDataSource();
      ProvinciaRepository = appDataSource.getRepository(Provincia);
      SucursalRepository = appDataSource.getRepository(Sucursales)
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};


initRepo()

//TODO Pass every arrow function args to a sucursalDTO
const createSucursal = async ({name, provincia} : SucursalDTO) =>{
    await initRepo()
    const sucursalFound = await SucursalRepository.findOne({where:{name}})
    if (sucursalFound) return false;
    const provinciaFound = await ProvinciaRepository.findOne({where:{nombre : provincia}}) as Provincia
    if (!provinciaFound) return false
    const newSucursal = await SucursalRepository.create({name, provincia : provinciaFound })
    await SucursalRepository.save(newSucursal);

    return newSucursal
}


const deleteSucursal = async ({name}: SucursalDTO) =>{
  await initRepo()
  const sucursalFound = await SucursalRepository.findOne({where:{name}}) as Sucursales
  if (sucursalFound) return false;
  await SucursalRepository.delete(sucursalFound)
  return;

}

const viewAllSucursales = async () => {
  await initRepo();
  const sucursalesFound = await SucursalRepository.find();
  if(!sucursalesFound) return false;
  return sucursalesFound;
}

const viewOneSucursales = async ({id} : SucursalDTO) =>{
  await initRepo();
  const sucursalFound = await SucursalRepository.findOne({where:{id}})
  console.log(sucursalFound)
  if(!sucursalFound) return false;
  return sucursalFound;
}

const updateSucursal = async ({id, name, provincia} : SucursalDTO) => {
  await initRepo();
  const sucursalFound = await SucursalRepository.findOne({where:{id}})
  if(!sucursalFound) return false;
  const provinciaFound = await ProvinciaRepository.findOne({where:{nombre : provincia}}) as Provincia
  if (!provinciaFound) return false
  const newSucursal = await SucursalRepository.create({name, provincia : provinciaFound})
  const updatedSucursal = Object.assign(sucursalFound, newSucursal)
  return updatedSucursal
}

export {createSucursal, deleteSucursal, viewAllSucursales, viewOneSucursales, updateSucursal}
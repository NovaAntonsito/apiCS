import {getDataSource} from '../config/DBConfig'
import { Repository } from 'typeorm';
import { Provincia } from '../models/provincia';
import { Sucursales } from '../models/sucursal';
import { SucursalDTO } from './interfaces/sucursalDTO';
import {ResDTO} from "./interfaces/RespuestaDTO";



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
const createSucursal = async ({nombre, provincia} : SucursalDTO) =>{
    await initRepo()
    const provinciaFound = await ProvinciaRepository.findOne({where:{id : provincia?.id, nombre : provincia?.nombre}})
    if (!provinciaFound) return false
    const newSucursal = await SucursalRepository.create({nombre, provincia : provinciaFound })
    const newSucursalDB =  await SucursalRepository.save(newSucursal);
    return new ResDTO(newSucursalDB.id,true,"La sucursal fue creada")
}


const deleteSucursal = async (id : number) =>{
  await initRepo()
  const sucursalFound = await SucursalRepository.findOne({where:{id}})
  if (!sucursalFound) return false;
  await SucursalRepository.delete(id)
  return true
}

const viewAllSucursales = async () => {
  await initRepo();
  const sucursalesFound = await SucursalRepository.find({ relations: ["provincia"] });
  if(sucursalesFound.length === 0) return false;
  return sucursalesFound;
}

const viewOneSucursales = async (id : number) =>{
  await initRepo();
  const sucursalFound = await SucursalRepository.findOne({where:{id}, relations: ["provincia"]})
  if(!sucursalFound) return false;
  return sucursalFound;
}

const updateSucursal = async ({id, nombre, provincia} : SucursalDTO) => {
  await initRepo();
  const sucursalFound = await SucursalRepository.findOne({where:{id}})
  if(!sucursalFound) return false;
  const provinciaFound = await ProvinciaRepository.findOne({where:{id : provincia?.id, nombre : provincia?.nombre}}) as Provincia
  if (!provinciaFound) return false
  const newSucursal = await SucursalRepository.create({nombre, provincia : provinciaFound})
  const updatedSucursal = Object.assign(sucursalFound, newSucursal)
    if(!provincia){
        updatedSucursal.provincia = null;
    }
  await SucursalRepository.save(updatedSucursal)
  
  return new ResDTO(updatedSucursal.id,true,"La sucursal fue actualizada")
}

export {createSucursal, deleteSucursal, viewAllSucursales, viewOneSucursales, updateSucursal}
import {getDataSource} from '../config/DBConfig'
import { Repository } from 'typeorm';
import { Provincia } from '../models/provincia';
import { Sucursales } from '../models/sucursal';




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

const createSucursal = async (name : string, provinciaName : string) =>{
    const sucursalFound = await SucursalRepository.findOne({where:{name}})
    if (sucursalFound) throw "Ya existe la sucursal";
    const provinciaFound = await ProvinciaRepository.findOne({where:{nombre : provinciaName}}) as Provincia
    if (!provinciaFound) throw "No existe la provincia"
    const newSucursal = await SucursalRepository.create({name, provincia : provinciaFound })
    await SucursalRepository.save(newSucursal);

    return newSucursal
}


export {createSucursal}
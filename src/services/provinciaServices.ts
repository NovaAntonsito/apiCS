import {getDataSource} from '../config/DBConfig'
import { Repository } from 'typeorm';
import { Provincia} from '../models/provincia';
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

const createProvincia = async (nombre : string) =>{
    await initRepo();
    const provinciaFound = await ProvinciaRepository.findOne({where:{nombre}})
    if(provinciaFound) return false;
    const newProvincia = await ProvinciaRepository.create({nombre})    
    await ProvinciaRepository.save(newProvincia)
    return newProvincia
}



export {createProvincia}

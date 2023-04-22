import { auth } from './interfaces/auth.interface';
import { DBConfig } from '../config/DBConfig'
import { User } from '../models/user';
import { Sucursales } from '../models/sucursal';


const UserRepository = DBConfig.getRepository(User);
const SucursalRepository = DBConfig.getRepository(Sucursales);

const registerNewUser = async ({email , password ,username , sucursalname} : auth) =>{
    const userFound = await UserRepository.findOne({where: {email , username}})
    /*if(userFound){
        return
    }*/
    const sucursalFound = await SucursalRepository.findOne({where:{name : sucursalname}})as Sucursales

    const newUser = await UserRepository.create({email, password, username, sucursal:sucursalFound})

    await UserRepository.save(newUser)    
}

const loginUser = async () =>{

}


export {registerNewUser, loginUser}
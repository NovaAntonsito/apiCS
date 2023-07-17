import {userDTO} from './interfaces/userDTO';
import {getDataSource} from "../config/DBConfig";
import {User} from "../models/user";
import {Sucursales} from "../models/sucursal";
import {encrypt, verifyPass} from "../utils/handlePassword";
import {Repository} from "typeorm";
import {genToken} from "../utils/handleJWT";
import {ResDTO} from "./interfaces/RespuestaDTO";

let UserRepository: Repository<User>;
let SucursalRepository: Repository<Sucursales>;

const initRepo = async () => {
  try {
    const appDataSource = await getDataSource();
    UserRepository = appDataSource.getRepository(User);
    SucursalRepository = appDataSource.getRepository(Sucursales);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initRepo();

const registerNewUser = async ({username,password,email,sucursales}: userDTO) => {
  try {
    await initRepo();
    const userFound = await UserRepository.findOne({
      where: { email, username },
    });
    if (userFound) return false;
    let sucursalList : Sucursales[] = [];
    if(!sucursales) return;
    sucursales.map(async sucursal =>{
      const sucursalFound = await SucursalRepository.findOne({where: {
              id : sucursal.id,
              nombre : sucursal.nombre
      }})
      if (sucursalFound) {
        sucursalList.push(sucursalFound);
      }
    })
    const passHashed = await encrypt(password as string);
  
    const newUser = UserRepository.create({
      email,
      password: passHashed,
      username,
      sucursales: sucursalList,
    });
    const newUserDB =await UserRepository.save(newUser);
    return new ResDTO(newUserDB.id, true, "El usuario fue creado");
  } catch (e) {
    console.log(e);
  }
};

const loginUser = async ({ email, password }: userDTO) => {
  await initRepo();
  const userFound = await UserRepository.findOne({ where: { email } });
  if (!userFound) return false;
  const passSend= password as string;
  const passValid = await verifyPass(userFound.password, passSend);
  if (!passValid) return false;
  userFound.active = true;
  await UserRepository.save(userFound)
  const tokenJWT = genToken(userFound.username);
  return tokenJWT;
};

const forgotPass = async ({email, password}: userDTO) =>{
  await initRepo();
  const userFound = await UserRepository.findOne({where:{email}});
  if(!userFound) return false;
  const newPassword = password as string;
  userFound.password = newPassword;   
  await UserRepository.save(userFound)
  return userFound;
}

const addSucursalesToUser = async (id : number,{sucursales}: userDTO) =>{
  await initRepo();
  const userFound = await UserRepository.findOne({where:{id}})
  if(!userFound) return false;
  let SucursalesFound : Sucursales[] = [];
  if (sucursales) {
    sucursales.map(async (sucursal) => {
      const sucursalFound = await SucursalRepository.findOne({where:{id : sucursal.id}}) as Sucursales;
      if(sucursalFound){
        SucursalesFound.push(sucursalFound);
      }else{
        console.log("No existe esa sucursal")
      }
    })
  }
  const userUpdate = await UserRepository.create({sucursales : SucursalesFound})
  const userUpdated = Object.assign(userFound, userUpdate)
  await UserRepository.save(userUpdated);
  return new ResDTO(id, true, "Se añadieron sucursales al usuario")
}



export { registerNewUser, loginUser, forgotPass };

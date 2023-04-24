import { auth } from "../controllers/interfaces/auth.interface";
import { getDataSource } from "../config/DBConfig";
import { User } from "../models/user";
import { Sucursales } from "../models/sucursal";
import { encrypt, verifyPass } from "../utils/handlePassword";
import { Repository } from "typeorm";
import { genToken } from "../utils/handleJWT";

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

const registerNewUser = async (
  username: string,
  password: any,
  email: string,
  surcursalNames: string[]
) => {
  try {
    await initRepo();
    const userFound = await UserRepository.findOne({
      where: { email, username },
    });
    if (userFound) return false;
    const sucursalesList: Sucursales[] = [];
    for (let i = 0; i < surcursalNames.length; i++) {
      const sucursalFound = (await SucursalRepository.findOne({
        where: { name: surcursalNames[i] },
      })) as Sucursales;
      sucursalesList.push(sucursalFound);
    }
    const passHashed = await encrypt(password);

    const newUser = UserRepository.create({
      email,
      password: passHashed,
      username,
      sucursales: sucursalesList,
    });
    await UserRepository.save(newUser);
    return newUser;
  } catch (e) {
    console.log(e);
  }
};

const loginUser = async ({ email, password }: auth) => {
  await initRepo();
  const userFound = await UserRepository.findOne({ where: { email } });
  if (!userFound) return false;
  const passValid = await verifyPass(userFound.password, password);
  if (!passValid) return false;
  const tokenJWT = genToken(userFound.username);
  return tokenJWT;
};

export { registerNewUser, loginUser };

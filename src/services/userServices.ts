import { getDataSource } from "../config/DBConfig";
import { User } from "../models/user";
import { Repository } from 'typeorm';


let userRepository: Repository<User>;

const initRepo = async () => {
  try {
    const appDataSource = await getDataSource();
    userRepository = appDataSource.getRepository(User);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

initRepo();
export const viewAllUsers = async () => {
  await initRepo()
  const allUsers = await userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.sucursales", "sucursales")
    .getMany();
  const allUsersMod: any = allUsers.map((User) => {
    const { password, ...NoPassword } = User;
    return NoPassword;
  });
  return allUsersMod;
};

export const viewOneUser = async (id: number) => {
  await initRepo()
  const userFound = await userRepository.findOne({
    where: { id },
    relations: ["sucursales"],
  });

  if (!userFound) {
    return;
  }
  const { password, ...noPassword } = userFound;

  return userFound;
};

export const deleteUser = async (id: number) => {
  await initRepo()
  let confirm: boolean = true;
  const userFound = await userRepository.findOne({
    where: { id },
  });
  if (!userFound) {
    confirm = false;
    return confirm;
  }
  await userRepository.delete(id);
  return confirm;
};
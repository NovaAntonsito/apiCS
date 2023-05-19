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
export const viewAllUsers = async (pageNumber: number, pageSize: number) => {
  await initRepo()
  const allUsers = await userRepository.find({
    relations:["sucursales"],
    skip: (pageNumber - 1) * pageSize,
    take: pageSize})
  if (!allUsers) return false;
  const allUsersMod: any = allUsers.map((User) => {
    const { password ,active, ...user  } = User;
    return user;
  });
  return {
    data: allUsersMod,
    perPage: pageSize,
    next: pageNumber + 1,
    previous : pageNumber<=0 ? 0 : pageNumber-1
  };
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
  const { password , active, ...user } = userFound;

  return user;
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



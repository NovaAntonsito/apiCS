import { DBConfig } from "../config/DBConfig";
import { User } from "../models/user";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import exp from "constants";

const UserRepository = DBConfig.getRepository(User);

/**
 *
 * @param req
 * @param res
 *
 * Register
 */
export const createUser = async (req: Request, res: Response) => {
  const newUser = UserRepository.create(req.body);
  UserRepository.save(newUser);
  res.send(newUser);
};

export const getAllUser = async (req: Request, res: Response) => {
  const allUsers = await UserRepository.find();
  const allUsersMod: any = allUsers.map((User) => {
    const { password, ...NoPassword } = User;
    console.log(NoPassword);
    return NoPassword;
  });
  if (allUsers.length === 0) {
    res.status(StatusCodes.NOT_FOUND).send("Usuarios no encontrados");
    return;
  }
  res.send(allUsersMod);
};

export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await UserRepository.findOne({
    where: {
      id: parseInt(id),
    },
  });

  if (!userFound) {
    res.status(StatusCodes.NOT_FOUND).send("No se encontro el usuario");
    return;
  }
  const {password, ...noPassword} = userFound
  
  
  res.send(noPassword);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound: any = await UserRepository.findOne({
    where: { id: parseInt(id) },
  });
  if (!userFound) {
    res.status(StatusCodes.NOT_FOUND).send("No se encontro el usuario");
    return;
  }
  const newUserBuild = Object.assign(userFound, req.body);
  UserRepository.save(newUserBuild);
  res.send(newUserBuild);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userFound = await UserRepository.findOne({
    where: { id: parseInt(id) },
  });
  if (!userFound) {
    res.status(StatusCodes.NOT_FOUND).send("No se encontro el usuario");
    return;
  }
  await UserRepository.delete(id);
  res.send("El usuario fue borrado");
};


import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteUser, viewAllUsers, viewOneUser } from '../services/userServices';

//TODO Pass every arrow function args Req to {body}
export const getAllUser = async (req: Request, res: Response) => {
    const allUsers : [] = await viewAllUsers()
    if(allUsers.length === 0){
      res.status(StatusCodes.NOT_FOUND).send("No hay usuarios disponibles")
      return;
    }
    res.send(allUsers)
};

export const getOneUser = async (req: Request, res: Response) => {
  const {id} = req.params
  const user = await viewOneUser(parseInt(id))
  if(!user){
    res.status(StatusCodes.NOT_FOUND).send("No existe el usuario")
    return;
  }
  res.send(user)  
};

export const userDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const confirm = await deleteUser(parseInt(id))
  if (confirm){
    res.send("El usuario fue borrado")
    return;
  }
  res.status(StatusCodes.NOT_FOUND).send("No existe el usuario")
};


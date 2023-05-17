import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteUser, viewAllUsers, viewOneUser } from '../services/userServices';

//TODO Pass every arrow function args Req to {body}
export const getAllUser = async (req: Request, res: Response) => {
    const allUsers : [] = await viewAllUsers()
    if(allUsers.length === 0){
      res.status(StatusCodes.NOT_FOUND).json({
          success : false,
          message : "No hay usuarios en la base de datos"
      })
      return;
    }
    res.send(allUsers)
};

export const getOneUser = async (req: Request, res: Response) => {
  const {id} = req.params
  const user = await viewOneUser(parseInt(id))
  if(!user){
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "No existe ese usuario en la base de datos"
    })
    return;
  }
  res.send(user)  
};

export const userDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const confirm = await deleteUser(parseInt(id))
  if (confirm){
    res.status(StatusCodes.OK).json({
        success : true,
        message : "El usuario fue borrado de la base de datos"
    })
    return;
  }
  res.status(StatusCodes.NOT_FOUND).json({
      success: true,
      message: "No se encontro el usuario en la base de datos"
  })
};


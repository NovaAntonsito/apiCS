import { Request, Response } from 'express'
import { registerNewUser,loginUser } from '../services/authServices'
import { StatusCodes } from 'http-status-codes';



export const registerCtrl = async ({body} : Request, res: Response) => {
    const {username, password, email, surcursalNames} = body
    const newUser = await registerNewUser(username, password, email, surcursalNames)
    if(newUser === false){
        res.status(StatusCodes.CONFLICT).send("Ya existe el usuario")
        return;
    }
    res.send(newUser) 
}

export const loginCtrl = async ({body} : Request, res : Response) => {
    const data = await loginUser(body)
    if(data === false){
        res.status(StatusCodes.BAD_REQUEST).send("Contraseña Incorrecta")
        return;
    }
    const newJWT = {
        "Access-Token" : data
    }
    res.send(newJWT)   
}
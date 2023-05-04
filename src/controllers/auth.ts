import { Request, Response } from 'express'
import { registerNewUser,loginUser, forgotPass } from '../services/authServices'
import { StatusCodes } from 'http-status-codes';



const registerCtrl = async ({body} : Request, res: Response) => { 
    const newUser = await registerNewUser(body)
    if(newUser === false){
        res.status(StatusCodes.CONFLICT).send("Ya existe el usuario")
        return;
    }
    res.send(newUser) 
}

const loginCtrl = async ({body} : Request, res : Response) => {
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

const updateUser =async ({body}:Request, res:Response) => {
    try{
    const data = await forgotPass(body)
    if (!data) throw "No se pudo actualizar el usuario";
    res.send({user: data, mensaje: "Fue actualizado"})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).send(error)
    }
}



export {loginCtrl, registerCtrl, updateUser}
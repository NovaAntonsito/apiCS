import { Request, Response } from 'express'
import { registerNewUser,loginUser, forgotPass } from '../services/authServices'
import { StatusCodes } from 'http-status-codes';



const registerCtrl = async ({body} : Request, res: Response) => { 
    const newUser = await registerNewUser(body)
    if(newUser === false){
        res.status(StatusCodes.CONFLICT).json({
            success : false,
            message : "El usuario ya existe"
        })
        return;
    }
    res.send(newUser) 
}

const loginCtrl = async ({body} : Request, res : Response) => {
    const data = await loginUser(body)
    if(data === false){
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message : "Contraseña incorrecta"
        })
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
    res.status(StatusCodes.OK).json({
        user: data,
        message : "Fue actualizado"
    })
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({
            success : false,
            message : error
        })
    }
}



export {loginCtrl, registerCtrl, updateUser}
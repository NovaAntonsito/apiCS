import {Request, Response} from 'express'
import { createProvincia } from '../services/provinciaServices'
import { StatusCodes } from 'http-status-codes';



const CreateProvincia = async (req: Request, res:Response) =>{
    try{
    const {nombre} = req.body
    const provincias = await createProvincia(nombre)
    res.send(provincias)
    }catch(e){
        res.status(StatusCodes.CONFLICT).send(e)
    }
}





export {CreateProvincia}
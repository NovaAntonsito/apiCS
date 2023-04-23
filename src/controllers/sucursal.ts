import {Response, Request} from 'express'
import { createSucursal } from '../services/sucursalServices'
import { StatusCodes } from 'http-status-codes';

const newSucursal = async (req:Request, res:Response) =>{
    try{
    const {name , provinciaName} = req.body
    const newSucursal = await createSucursal(name, provinciaName)
    res.send(newSucursal)
    }catch(e){
        res.status(StatusCodes.CONFLICT).send(e)
    }
}


export{newSucursal}
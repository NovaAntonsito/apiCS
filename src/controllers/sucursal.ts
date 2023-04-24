import {Response, Request} from 'express'
import { createSucursal, deleteSucursal} from '../services/sucursalServices'
import { StatusCodes } from 'http-status-codes';

const newSucursal = async (req:Request, res:Response) =>{
    try{
    const {name , provinciaName} = req.body
    const newSucursal = await createSucursal(name, provinciaName)
    if(newSucursal) throw "Hubo un error en la creacion"
    res.send(newSucursal)
    }catch(e){
        res.status(StatusCodes.CONFLICT).send(e)
    }
}

const delSucursal = async (req:Request, res:Response) =>{
    try {
        const name : string = req.params.name
        const deleteSucursalActual = await deleteSucursal(name)
        if(deleteSucursalActual) throw "No existe la sucursal";
        res.send(`La sucursal ${name} fue borrado`).status(StatusCodes.OK)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).send(error)
    }

} 


export{newSucursal, delSucursal}
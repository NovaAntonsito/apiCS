import {Response, Request} from 'express'
import { createSucursal, deleteSucursal, updateSucursal, viewAllSucursales, viewOneSucursales} from '../services/sucursalServices'
import { StatusCodes } from 'http-status-codes';

//TODO Pass every arrow function args Req to {body}
const newSucursal = async ({body}:Request, res:Response) =>{
    try{
    const {name , provincia} = body
    const newSucursal = await createSucursal({name, provincia})
    if(newSucursal) throw "Hubo un error en la creacion"
    res.send(newSucursal)
    }catch(e){
        res.status(StatusCodes.CONFLICT).send(e)
    }
}

const delSucursal = async ({params}:Request, res:Response) =>{
    try {
        const provincia : string = params.name
        const deleteSucursalActual = await deleteSucursal({provincia})
        if(deleteSucursalActual) throw "No existe la sucursal";
        res.send(`La sucursal fue borrado`).status(StatusCodes.OK)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).send(error)
    }

} 

const getAllSurcursales = async (req:Request, res:Response) => {
    try {
        const sucursalesFound = await viewAllSucursales();
        if(!sucursalesFound) throw "No hay usuarios en la base de datos"
        res.send(sucursalesFound).status(StatusCodes.OK)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).send(error)
    }
}

const getOneSucursal = async ({params}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const sucursalFound = await viewOneSucursales({id})
        if(!sucursalFound) throw "No se encontro la sucursal"
        res.send(sucursalFound)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).send(error)
    }
}

const putSucursal = async ({body, params}:Request, res:Response) => {
    try {
        const id = parseInt(params.id)
        const {name, provincia} = body
        const updatedSucursal = await updateSucursal({id, name, provincia})
        if(updatedSucursal) throw "La sucursal actualizada no es valida"
        res.send(updatedSucursal)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }
}


export{newSucursal, delSucursal, getAllSurcursales, getOneSucursal, putSucursal}
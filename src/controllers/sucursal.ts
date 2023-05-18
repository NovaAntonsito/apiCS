import {Response, Request} from 'express'
import { createSucursal, deleteSucursal, updateSucursal, viewAllSucursales, viewOneSucursales} from '../services/sucursalServices'
import { StatusCodes } from 'http-status-codes';

//TODO Pass every arrow function args Req to {body}
const newSucursal = async ({body}:Request, res:Response) =>{
    try{
    const newSucursal = await createSucursal(body)
    if(!newSucursal) throw "Hubo un error en la creacion"
    res.send(newSucursal)
    }catch(e){
        res.status(StatusCodes.CONFLICT).json({
            success : false,
            message: e
        })
    }
}

const delSucursal = async ({params}:Request, res:Response) =>{
    try {
        const id : number = parseInt(params.id)
        const deleteSucursalActual = await deleteSucursal({id})
        if(deleteSucursalActual) throw "No existe la sucursal";
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Ya se borro la sucursal"
        })
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: error
        })
    }

} 

const getAllSurcursales = async (req:Request, res:Response) => {
    try {
        const sucursalesFound = await viewAllSucursales();
        if(!sucursalesFound) throw "No hay usuarios en la base de datos"
        res.send(sucursalesFound)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            message: error
        })
    }
}

const getOneSucursal = async ({params}:Request, res:Response)=>{
    try {
        const id : number = parseInt(params.id)
        const sucursalFound = await viewOneSucursales(id)
        if(!sucursalFound) throw "No se encontro la sucursal"
        res.send(sucursalFound)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            message: error
        })
    }
}

const putSucursal = async ({body, params}:Request, res:Response) => {
    try {
        const id = parseInt(params.id)
        const {nombre, provincia} = body
        const updatedSucursal = await updateSucursal({id, nombre, provincia})
        if(updatedSucursal) throw "La sucursal actualizada no es valida"
        res.send(updatedSucursal)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success : false,
            message: error
        })
    }
}


export{newSucursal, delSucursal, getAllSurcursales, getOneSucursal, putSucursal}
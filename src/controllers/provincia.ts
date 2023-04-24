import {Request, Response} from 'express'
import { createProvincia,viewAllProvincias, viewOneProvincia, deleteProvincia, updateProvincia } from '../services/provinciaServices'
import { StatusCodes } from 'http-status-codes';




const PostProvincia = async (req: Request, res:Response) =>{
    try{
    const {nombre} = req.body
    const provincias = await createProvincia(nombre)
    res.send(provincias)
    }catch(e){
        res.status(StatusCodes.CONFLICT).send(e)
    }
}

const GetAllProvincias = async (req:Request, res:Response)=>{
    try {
        const provinciasFound = await viewAllProvincias()
        if(!provinciasFound) throw "No se encontro las provincias" 
        res.send(provinciasFound)
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).send(e)
    }
}

const GetOneProvincia =async (req:Request, res:Response) => {
    try {
        const nombre = req.params.nombre  
        const provinciaFound = await viewOneProvincia(nombre)
        if(provinciaFound) throw "No existe la provincia"
        res.send(provinciaFound)
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).send(e)
    }
    
}

const DeleteProvincia = async (req:Request, res:Response) => {
    try {
        const {nombre} = req.body
        const provinciaFound = await deleteProvincia(nombre)
        if(provinciaFound) throw "No existe la provincia"
        res.status(StatusCodes.OK).send(`${nombre} fue borrado de la base de datos`)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).send(error)
    }
   
}

const PatchProvincia = async (req:Request, res:Response) => {
    try{
    const {nombre} = req.body
    const id = req.params.id
    const updatedProvincia = await updateProvincia(nombre,parseInt(id))
    if(!updatedProvincia) throw "No se encontro el usuario"
    res.status(StatusCodes.OK).send("Se actualizo el usuario")
    }catch(e){
        res.status(StatusCodes.NOT_FOUND).send(e)
    }


}





export {PostProvincia, GetAllProvincias, GetOneProvincia, DeleteProvincia,PatchProvincia}
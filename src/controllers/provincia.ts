import {Request, Response} from 'express'
import { createProvincia,viewAllProvincias, viewOneProvincia, deleteProvincia, updateProvincia } from '../services/provinciaServices'
import { StatusCodes } from 'http-status-codes';



//TODO Pass every arrow function args Req to {body}
const PostProvincia = async ({body}: Request, res:Response) =>{
    try{
    const provincias = await createProvincia(body)
    res.send(provincias)
    }catch(e){
        res.status(StatusCodes.CONFLICT).send(e)
    }
}

const GetAllProvincias = async ({body}:Request, res:Response)=>{
    try {
        const provinciasFound = await viewAllProvincias()
        if(!provinciasFound) throw "No se encontro las provincias" 
        res.send(provinciasFound)
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).send(e)
    }
}

const GetOneProvincia =async ({params}:Request, res:Response) => {
    try { 
        console.log("estoy en el getOneProvincia")
        const id:number = parseInt(params.id);
            //TODO Fix this 
        // const provinciaFound = await viewOneProvincia(body)
        // if(!provinciaFound) throw "No existe la provincia"
        // res.send(provinciaFound)
        const provinciaFound = await viewOneProvincia({id})
        console.log(provinciaFound)
        if(!provinciaFound) throw "No existe la provincia"
        res.send(provinciaFound)
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).send(e)
    }
    
}

const DeleteProvincia = async ({body}:Request, res:Response) => {
    try {
    
        const provinciaFound = await deleteProvincia(body)
        if(provinciaFound) throw "No existe la provincia"
        res.status(StatusCodes.OK).send(`${body.nombre} fue borrado de la base de datos`)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).send(error)
    }
   
}
//TODO Fix this 
const PatchProvincia = async ({body, params}:Request, res:Response) => {
    try{
    const id = parseInt(params.id);
    const nombre = body.nombre;
    const updatedProvincia = await updateProvincia({nombre, id})
    if(!updatedProvincia) throw "No se encontro el usuario"
    res.status(StatusCodes.OK).send("Se actualizo el usuario")
    }catch(e){
        res.status(StatusCodes.NOT_FOUND).send(e)
    }


}





export {PostProvincia, GetAllProvincias, GetOneProvincia, DeleteProvincia,PatchProvincia}
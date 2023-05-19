import {Request, Response} from 'express'
import { createProvincia,viewAllProvincias, viewOneProvincia, deleteProvincia, updateProvincia } from '../services/provinciaServices'
import { StatusCodes } from 'http-status-codes';



//TODO Pass every arrow function args Req to {body}
const PostProvincia = async ({body}: Request, res:Response) =>{
    try{
        const provincias = await createProvincia(body);
        if(!provincias) throw "Ya existe una provincia"
        res.send(provincias);
    }catch(e){
        res.status(StatusCodes.CONFLICT).json({
            success : false,
            message : e
        })
    }
}

const GetAllProvincias = async ({body}:Request, res:Response)=>{
    try {
        const provinciasFound = await viewAllProvincias()
        if(!provinciasFound) throw "No se encontro las provincias" 
        res.send(provinciasFound)
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const GetOneProvincia = async ({params}:Request, res:Response) => {
    try {
        const id:number = parseInt(params.id);
        const provinciaFound = await viewOneProvincia({id})
        if(!provinciaFound) throw "No existe la provincia"
        res.send(provinciaFound)
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            message : e
        })
    }
    
}

const DeleteProvincia = async ({params}:Request, res:Response) => {
    try {
        const id = parseInt(params.id)
        const result = await deleteProvincia(id)
        //Si tiene hijas muestro este error
        if (typeof result === 'string') {
            res.status(StatusCodes.BAD_REQUEST).json({
                success : false,
                message : result
            })
            return;
        }
        //Si no encuentro ninguna provincia con esa id muestro este error
        if (result === false) {
            console.log(result, " Controller")
            res.status(StatusCodes.NOT_FOUND).json({
                success : false,
                message : "No se encontro la provincia"
            })
            return;
        }
        res.status(StatusCodes.OK).json({
            success : true,
            message : `La sucursal fue eliminada de la base de datos`
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error)
    }
}
//TODO Fix this 
const PatchProvincia = async ({body, params}:Request, res:Response) => {
    try{
    const id = parseInt(params.id);
    const nombre = body.nombre;
    const updatedProvincia = await updateProvincia({nombre, id})
    if(!updatedProvincia) throw "No se encontro la provincia"
    res.status(StatusCodes.OK).json({
        success : true,
        data : updatedProvincia,
        message : "Actualizado"
    })
    }catch(e){
        res.status(StatusCodes.NOT_FOUND).json({
            success : true,
            message : e
        })
    }


}





export {PostProvincia, GetAllProvincias, GetOneProvincia, DeleteProvincia,PatchProvincia}
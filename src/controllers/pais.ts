import {query, Request, Response} from 'express'
import {StatusCodes} from "http-status-codes";
import {createPais, deletePais, updatePais, viewAllPaises, viewOnePais} from "../services/paisServices";


const postPais = async ({body}: Request, res: Response)=>{
    try {
        const nombreFromBody = body.nombre
        const newPais = await createPais(nombreFromBody)
        if(!newPais) throw "Pais no valido"
        res.send(newPais)
    }catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
    }
}
const getAllPaises = async ({query}: Request, res:Response) =>{
    try {
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;
        const allPaises = await viewAllPaises(page,pageSize,order)
        if(!allPaises) throw "No hay paises en la base de datos"
        res.send(allPaises)
    }catch (e){
        console.error(e)
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const getOnePais = async ({params}:Request,res: Response) =>{
    try {
        const id = parseInt(params.id)
        const paisFound = await viewOnePais(id)
        if(!paisFound) throw "No existe ese pais en la base de datos"
        res.send(paisFound)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const deletePaisCons = async ({params}:Request,res:Response)=>{
    try {
        const id : number = parseInt(params.id)
        const deletedPais = await deletePais(id)
        if(!deletedPais) throw "No existe ese pais en la base de datos"
        res.send(deletedPais)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const putPais = async ({body,params}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const updatedPais = await updatePais(body,id)
        if(!updatedPais) throw "No existe ese pais en la base de datos"
        res.send(updatedPais)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

export {getAllPaises,getOnePais,putPais,postPais,deletePaisCons}
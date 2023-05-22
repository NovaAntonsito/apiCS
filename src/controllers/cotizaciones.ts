import { Request, Response } from 'express'
import {
    createCotizacion,
    softDeleteCotizacion, updateCotizacion,
    viewAllCotizaciones,
    viewOneCotizaciones
} from "../services/cotizacionService";
import {StatusCodes} from "http-status-codes";

const postCotizacion = async ({body}: Request, res: Response)=>{
    try {
        const newCotizacion = await createCotizacion(body)
        if (!newCotizacion) throw "Cotizacion no valida"
        res.send(newCotizacion)
    }catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
        console.log(e)
    }

}
const getAllCotizaciones = async ({query}: Request, res:Response) =>{
    try {
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const allCotizaciones = await viewAllCotizaciones(page,pageSize)
        if(!allCotizaciones) throw "No hay cotizaciones en la base de datos"
        res.send(allCotizaciones)
    }catch (e){
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

// const searchByCodigoFecha = async ({query}:Request,res:Response)=>{
//     try {
//         const page = parseInt(query.page as string) || 1;
//         const pageSize = parseInt(query.pageSize as string) || 10;
//         const fecha = new Date(query.fecha as string)
//         const codigo = query.code as string
//         const searchActual = await searchByVigenciaAndCode(codigo,fecha,page,pageSize);
//         if(!searchActual) throw "No existen cotizaciones con esos campos"
//         res.send(searchActual)
//     }catch (e) {
//         res.status(StatusCodes.NOT_FOUND).json({
//             success: false,
//             message: e
//         })
//     }
//
//
// }

const getOneCotizaciones = async ({params}:Request, res:Response) =>{
    try {
        const id = parseInt(params.id)
        const cotizacion = await viewOneCotizaciones(id)
        if(!cotizacion) throw "No existe la cotizacion buscada"
        res.send(cotizacion);
    }catch (e){
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
        console.log(e)
    }

}
const DeleteCotizacion = async ({params}:Request, res:Response) =>{
    try {
        const id = parseInt(params.id)
        const deletedCotizacion = await softDeleteCotizacion(id);
        if(!deletedCotizacion)throw "No existe esa cotizacion"
        res.status(StatusCodes.OK).json({
            success: true,
            message: "La cotizacion fue borrada"
        })
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const patchCotizacion = async ({body,params}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const updatedCotizacion = await updateCotizacion(body, id)
        if (!updatedCotizacion) throw "No existe la cotizacion"
        res.status(StatusCodes.OK).json({
            success: true,
            message : "La cotizacion fue actualizada"
        })
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

export {getAllCotizaciones,getOneCotizaciones, postCotizacion,DeleteCotizacion, patchCotizacion}
import { Request, Response } from 'express'
import {createCotizacion, viewAllCotizaciones, viewOneCotizaciones} from "../services/cotizacionService";
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
    }

}
const getAllCotizaciones = async (req: Request, res:Response) =>{
    try {
        const allCotizaciones = await viewAllCotizaciones()
        if(!allCotizaciones) throw "No hay cotizaciones en la base de datos"
        res.send(allCotizaciones)
    }catch (e){
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

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

export {getAllCotizaciones,getOneCotizaciones, postCotizacion}
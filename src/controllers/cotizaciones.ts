import { Request, Response } from 'express'
import {
    createCotizacion,
    viewAllCotizaciones,
    viewAllCotizacionesEvenDeleted,
    viewOneCotizaciones,
    getCotizacionWithMoneda
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
    }

}
const getAllCotizaciones = async ({query}: Request, res:Response) =>{
    try {
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;

        const allCotizaciones = await viewAllCotizaciones(page,pageSize,order)
        if(!allCotizaciones) throw "No hay cotizaciones en la base de datos"
        res.send(allCotizaciones)
    }catch (e){
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}
const getAllAdmin = async ({query}: Request, res:Response) =>{
    try {
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;
        const allCotizaciones = await viewAllCotizacionesEvenDeleted(page,pageSize,order)
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

const getCotizacionesByMoneda = async ({query}:Request,res:Response)=>{
    try {
        const id = parseInt(query.id as string)
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;
        console.log(id) 
        const cotizacionesFound = await getCotizacionWithMoneda(id,page,pageSize,order)
        res.send(cotizacionesFound)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}


export { 
    getAllCotizaciones, 
    getOneCotizaciones, 
    postCotizacion, 
    getAllAdmin, 
    getCotizacionesByMoneda}
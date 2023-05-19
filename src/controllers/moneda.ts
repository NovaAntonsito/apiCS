import {Request, Response} from 'express'
import {createMoneda, updateMoneda, viewAllMonedas, viewOneMoneda} from "../services/monedaService";
import {StatusCodes} from "http-status-codes";

const postMoneda = async ({body}: Request, res:Response ) =>{
    try {
        const newMoneda = await createMoneda(body);
        if(!newMoneda) throw "Ya existe una moneda parecida"
        res.send(newMoneda)
    }catch (e){
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
    }
}

const getOneMoneda = async ({params}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const monedaFound = await viewOneMoneda(id)
        if(!monedaFound) throw "No existe la moneda"
        res.send(monedaFound)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const getAllMonedas = async (req:Request, res:Response)=>{
    try {
        const allMonedas = await viewAllMonedas();
        if(!allMonedas) throw "No existen monedas en la base de datos"
        res.send(allMonedas)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}
const putMoneda = async ({body,params}:Request,res:Response) =>{
    try {
        const id = parseInt(params.id)
        const monedaUpdated = await updateMoneda(body,id)
        if (!monedaUpdated) throw "No existe la moneda seleccionada en la base de datos"
        res.status(StatusCodes.OK).send({
            success: true,
            message: "La moneda fue actualizada"
        })
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

export {getOneMoneda,postMoneda,getAllMonedas,putMoneda}
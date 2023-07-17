import { Request, Response } from 'express'
import {StatusCodes} from "http-status-codes";
import {
    createMovimiento,
    delMovimiento,
    updateMovimiento,
    viewAllMovimientos,
    viewOneMovimiento
} from "../services/MovimientoService";



const postMovimiento = async ({body}:Request, res: Response) =>{
    try {
        const movCreated = await createMovimiento(body)
        if(typeof movCreated === "string") throw movCreated;
        res.send(movCreated)
    }catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
    }
}


const getAllMovimiento = async ({query}:Request, res:Response) =>{
    try {
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false
        const allMovs = await viewAllMovimientos(page,pageSize,order)
        if(typeof allMovs === "string") throw allMovs;
        res.send(allMovs)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const getOneMovimiento = async ({params}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const oneMov = await viewOneMovimiento(id)
        if(typeof oneMov === "string")throw oneMov;
        res.send(oneMov)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const deleteMovimiento = async ({params}:Request, res:Response) =>{
    try {
        const id = parseInt(params.id)
        const deletedMov = await delMovimiento(id)
        if(typeof deletedMov === "string") throw deletedMov;
        res.send(deletedMov)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const putMovimiento = async ({params, body}:Request, res:Response) =>{
    try {
        const id = parseInt(params.id)
        const updatedMov = await updateMovimiento(id, body)
        if(typeof updatedMov === "string") throw updatedMov
        res.send(updatedMov)
    }catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
    }
}

export {getOneMovimiento,getAllMovimiento,putMovimiento,postMovimiento,deleteMovimiento}
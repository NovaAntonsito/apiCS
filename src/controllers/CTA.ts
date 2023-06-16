import { Request, Response } from 'express'
import {createCTA, delCTA, updateCTA, viewAllCTAs, viewOneCTA} from "../services/CuentaCorrienteService";
import {StatusCodes} from "http-status-codes";


const postCTA = async ({body}: Request, res: Response) =>{
    try {
        const newCTA = await createCTA(body);
        if(typeof newCTA === "string") throw newCTA
        res.send(newCTA)
    }catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
    }
}
const getAllCTA = async ({query}: Request, res:Response)=>{
    try {
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;

        const allCTA = await viewAllCTAs(page,pageSize,order)
        if(!allCTA) throw "No existe cuentas en la base de datos"
        res.send(allCTA)
    }catch (e){
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const getOneCTA = async ({params}:Request, res:Response) =>{
    try {
        const id = parseInt(params.id)
        const oneCTA = await viewOneCTA(id)
        if(!oneCTA) throw "No existe esa cuenta"
        res.send(oneCTA)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const putCTA = async ({params, body}:Request, res:Response) =>{
    try {
        const id = parseInt(params.id)
        const updatedCTA = await updateCTA(id , body);
        if(typeof updatedCTA === "string") throw updatedCTA;
        res.send(updatedCTA)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const deleteCTA = async ({params}:Request, res:Response) =>{
    try {
        const id = parseInt(params.id)
        const deletedCTA = await delCTA(id);
        if(!deletedCTA) throw "No existe esa cuenta"
        res.send(deletedCTA)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

export {getAllCTA,getOneCTA,postCTA,putCTA,deleteCTA}
import { Request, Response } from 'express'
import {StatusCodes} from "http-status-codes";
import {createCuenta, deleteCuenta, updateCuenta, viewAllCuentas, viewOneCuenta} from "../services/cuentaService";


const getAllCuentas = async ({query}:Request, res: Response)=>{
    try{
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;
        const allCuentas = await viewAllCuentas(page,pageSize,order)
        if(!allCuentas) throw "No existen cuentas en la base de datos"
        res.send(allCuentas)
    }catch (e) {
        console.log(e)
        res.status(StatusCodes.NOT_FOUND).send({
            success : false,
            message : e
        })
    }
}

const postCuenta = async ({body}: Request, res: Response)=>{
    try {
        const newCuenta = await createCuenta(body)
        if(!newCuenta) throw "Ya existe una cuenta"
        res.send(newCuenta)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).send({
            success : false,
            message : e
        })
    }
}

const getOneCuenta = async ({params}:Request, res:Response )=> {
    try {
        const id = parseInt(params.id)
        const oneCuenta = await viewOneCuenta(id)
        if (!oneCuenta) throw "No existe esta cuenta"
        res.send(oneCuenta)
    } catch (e) {
        res.status(StatusCodes.NOT_FOUND).send({
            success: false,
            message: e
        })
    }
}

const deleteCuentaCons = async ({params}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const deletedCuenta = await deleteCuenta(id)
        if(!deletedCuenta) throw "No existe esta cuenta"
        res.send(deletedCuenta)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).send({
            success: false,
            message: e
        })
    }
}

const putCuenta = async ({params, body}:Request, res:Response)=>{
    try{
        const id = parseInt(params.id)
        const updatedCuenta = await updateCuenta(id, body)
        if(!updatedCuenta) throw "No existe esa cuenta"
        res.send(updatedCuenta)
    }catch (e) {
        console.log(e)
        res.status(StatusCodes.NOT_FOUND).send({
            success: false,
            message: e
        })
    }
}

export {getAllCuentas,getOneCuenta,postCuenta,putCuenta,deleteCuentaCons}
import { Request, Response } from 'express'
import {StatusCodes} from "http-status-codes";
import {createEmpresa, deleteEmpresa, updateEmpresa, viewAllEmpresa, viewOneEmpresa} from "../services/empresaService";

const PostEmpresa = async ({body}:Request, res:Response)=>{
    try{
        const newEmpresa = await createEmpresa(body);
        if(!newEmpresa) throw "Empresa no valida"
        res.send(newEmpresa)
    }catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
    }
}

const getAllEmpresas = async ({query}:Request, res:Response)=>{
    try{
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;
        const allEmpresas = await viewAllEmpresa(page,pageSize,order)
        if(!allEmpresas) throw "No existen empresas en la base de datos"
        res.send(allEmpresas)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const getOneEmpresa = async ({params}:Request, res:Response)=>{
    try{
        const id = parseInt(params.id)
        const empresaFound = await viewOneEmpresa(id)
        if(!empresaFound) throw "No existe esa empresa"
        res.send(empresaFound)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

const deleteEmpresaController = async ({params}:Request, res:Response)=>{
    try{
        const id = parseInt(params.id)
        const deletedEmpresa = await deleteEmpresa(id)
        if(!deletedEmpresa) throw "No existe esa empresa"
        res.send(deletedEmpresa)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}
const putEmpresa = async ({body, params}:Request, res:Response)=>{
    try{
        const id = parseInt(params.id)
        const nombre = body.nombre
        const updatedEmpresa = await updateEmpresa({id, nombre})
        if (!updatedEmpresa) throw "No existe esa empresa"
        res.send(updatedEmpresa)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: e
        })
    }
}

export {getAllEmpresas,getOneEmpresa,PostEmpresa,putEmpresa,deleteEmpresaController}
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import {createPersona, deletePersona, updatePersona, viewAllPersona, viewOnePersona} from "../services/personaService";


const getAllPersonas = async ({ query }: Request, res: Response)=>{
    try {
        const page = parseInt(query.page as string) || 1;
        const pageSize = parseInt(query.pageSize as string) || 10;
        const order = query.desc === "true" ? true : false;

        const allPersonas = await viewAllPersona(page,pageSize,order)
        if(!allPersonas) throw "No existen personas en la base de datos"

        res.send(allPersonas)

    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            message : e
        })
    }
}

const getOnePeronsa = async ({params}: Request, res: Response)=>{
    try {
        const id = parseInt(params.id)
        const personaFound = await viewOnePersona(id)
        if(!personaFound) throw "No existe esa persona"
        res.send(personaFound)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            message : e
        })
    }
}

const postPersona = async ({body}:Request, res: Response)=>{
    try {
        const newPersona = await createPersona(body)
        if (!newPersona) throw "La persona ya existe la base de datos"
        res.send(newPersona)
    }catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: e
        })
    }
}

const deletePersonaController = async ({params}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const deletedPersona = await deletePersona(id)
        if (!deletedPersona) throw "No existe esa persona"
        res.send(deletedPersona)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            message : e
        })
    }
}

const putPersona = async ({params, body}:Request, res:Response)=>{
    try {
        const id = parseInt(params.id)
        const updatedPersona = await updatePersona(body,id)
        if (!updatedPersona) throw "No existe esa persona"
        res.send(updatedPersona)
    }catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({
            success : false,
            message : e
        })
    }
}

export {getAllPersonas,getOnePeronsa, putPersona,postPersona,deletePersonaController}
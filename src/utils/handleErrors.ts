import { StatusCodes } from "http-status-codes"
import {Response} from 'express'

const handleHttp = (res:Response, msg: String, code : StatusCodes) =>{
    res.status(code).send({msg})
}



export { handleHttp }
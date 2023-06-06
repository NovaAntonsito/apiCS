import { NextFunction,Request,Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from "../utils/handleJWT";

const checkJWT = (req:Request, res: Response, next: NextFunction)=>{
    try {
        const jwtByUser = req.headers.authorization || ' ';
        const JWT = jwtByUser.split(' ').pop()
        const isValid = verifyToken(`${JWT}`)
        if(!isValid){
            res.status(StatusCodes.NOT_ACCEPTABLE).send({
                success : false,
                message : "El JWT no es valido"
            })
        }else{
            next();
        }
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send({
            success : false,
            message : "El JWT no es valido"
        })
    }
}





export {checkJWT}
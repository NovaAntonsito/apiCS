import { Router } from 'express';
import { registerCtrl, loginCtrl } from '../controllers/auth';
import {Request,Response} from 'express'
import passport from "passport";


const router = Router()

router.post('/register', registerCtrl)

router.get('/google', passport.authenticate('google'),(req:Request, res:Response)=>{res.send("hola")})

router.get('/google/redirect', passport.authenticate('google'), (req:Request, res:Response)=>{res.send("hola")})

router.post('/login', loginCtrl)



export {router}
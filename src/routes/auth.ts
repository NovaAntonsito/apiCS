import {Router} from 'express';
import { registerCtrl, loginCtrl } from '../controllers/auth';

import passport from "passport";
import {handleUser} from "../middlewares/handleUserOAuth";


const router = Router()

router.post('/register', registerCtrl)
//http://localhost:3000/api/auth/google (Llamada a google, void)
router.get('/google', passport.authenticate('google', {failureRedirect:'/'}))
//http://localhost:3000/api/auth/google/redirect (Redirect al backend )
router.get('/google/redirect', passport.authenticate('google',{failureRedirect: '/'}),handleUser)
//http://localhost:3000/api/auth/login (Login propio (email, password))
router.post('/login', loginCtrl)



export {router}
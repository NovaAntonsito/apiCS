import {Router} from 'express';
import { registerCtrl, loginCtrl } from '../controllers/auth';

import passport from "passport";
import {handleUser} from "../middlewares/handleUserOAuth";


const router = Router()

router.post('/register', registerCtrl)

router.get('/google', passport.authenticate('google', {failureRedirect:'/'}))

router.get('/google/redirect', passport.authenticate('google',{failureRedirect: '/'}),handleUser)

router.post('/login', loginCtrl)



export {router}
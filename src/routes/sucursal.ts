import { Router } from 'express';
import { newSucursal } from '../controllers/sucursal';



const router = Router()

//Get One
router.get('')

//Get All
router.get('', ()=>{})

//Delete
router.delete('', ()=>{})

//Put-Patch
router.patch('', ()=>{})

//Post 
router.post('',newSucursal)


export {router}
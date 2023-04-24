import { Router } from 'express';
import { delSucursal, newSucursal } from '../controllers/sucursal';



const router = Router()

//Get One
router.get('')

//Get All
router.get('', ()=>{})

//Delete
router.delete('/:name', delSucursal)

//Put-Patch
router.patch('', ()=>{})

//Post 
router.post('',newSucursal)


export {router}
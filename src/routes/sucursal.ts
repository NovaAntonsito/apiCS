import { Router } from 'express';
import { delSucursal, getAllSurcursales, getOneSucursal, newSucursal } from '../controllers/sucursal';



const router = Router()

//Get One
router.get('/:name', getOneSucursal)

//Get All
router.get('', getAllSurcursales)

//Delete
router.delete('/:name', delSucursal)

//Put-Patch
router.patch('', ()=>{})

//Post 
router.post('',newSucursal)


export {router}
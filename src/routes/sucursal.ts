import { Router } from 'express';
import { delSucursal, getAllSurcursales, getOneSucursal, newSucursal , putSucursal} from '../controllers/sucursal';



const router = Router()

//Get One
router.get('/:id', getOneSucursal)

//Get All
router.get('', getAllSurcursales)

//Delete
router.delete('/:id', delSucursal)

//Put-Patch
router.put('/:id', putSucursal)

//Post 
router.post('',newSucursal)


export {router}
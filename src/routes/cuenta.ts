import {Router} from "express";
import {deleteCuentaCons, getAllCuentas, getOneCuenta, postCuenta, putCuenta} from "../controllers/cuenta";


const router = Router()

//Get All
router.get('',getAllCuentas)

//Get One
router.get('/:id',getOneCuenta )

//Delete
router.delete('/:id',deleteCuentaCons )

//Put-Patch
router.put('/:id',putCuenta)

//Post
router.post('',postCuenta)

export {router}
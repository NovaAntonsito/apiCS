import {Router} from "express";
import {deleteEmpresaController, getAllEmpresas, getOneEmpresa, PostEmpresa, putEmpresa} from "../controllers/empresa";
const router = Router()

//Get All
router.get('', getAllEmpresas )

//Get One
router.get('/:id',getOneEmpresa )

//Delete
router.delete('/:id',deleteEmpresaController )

//Put-Patch
router.put('/:id',putEmpresa)

//Post
router.post('',PostEmpresa)



export {router}
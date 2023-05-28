import {Router} from "express";
import {deletePersonaController, getAllPersonas, getOnePeronsa, postPersona, putPersona} from "../controllers/persona";

const router = Router()

//Get All
router.get('', getAllPersonas)

//Get One
router.get('/:id',getOnePeronsa )

//Delete
router.delete('/:id', deletePersonaController )

//Put-Patch
router.put('/:id', putPersona )

//Post
router.post('', postPersona)



export {router}
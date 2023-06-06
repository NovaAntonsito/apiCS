import {Router} from "express";
import {deletePersonaController, getAllPersonas, getOnePersona, postPersona, putPersona} from "../controllers/persona";
import {checkJWT} from "../middlewares/Authenticate";


const router = Router()

//Get All
router.get('' ,getAllPersonas)

//Get One
router.get('/:id',getOnePersona )

//Delete
router.delete('/:id' ,deletePersonaController )

//Put-Patch
router.put('/:id',putPersona )

//Post
router.post('' ,postPersona)



export {router}
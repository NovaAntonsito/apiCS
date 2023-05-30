import {Router} from "express";
import {deletePersonaController, getAllPersonas, getOnePersona, postPersona, putPersona} from "../controllers/persona";
import {checkJWT} from "../middlewares/Authenticate";


const router = Router()

//Get All
router.get('',checkJWT ,getAllPersonas)

//Get One
router.get('/:id',checkJWT,getOnePersona )

//Delete
router.delete('/:id',checkJWT ,deletePersonaController )

//Put-Patch
router.put('/:id',checkJWT ,putPersona )

//Post
router.post('',checkJWT ,postPersona)



export {router}
import {Router} from "express";
import {getAllCotizaciones, getOneCotizaciones, postCotizacion} from "../controllers/cotizaciones";


const router = Router()


//Get All
router.get('', getAllCotizaciones)

//Get One
router.get('/:id', getOneCotizaciones)

//Delete
router.delete('/:id', )

//Put-Patch
router.patch('/:id', )

//Post
router.post('', postCotizacion)


export {router}
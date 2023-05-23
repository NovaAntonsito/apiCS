import {Router} from "express";
import {
    getAllAdmin,
    getAllCotizaciones,
    getOneCotizaciones,
    postCotizacion,
} from "../controllers/cotizaciones";


const router = Router()

router.get('/all', getAllAdmin)
// Get All

router.get('', getAllCotizaciones);

// Get One
router.get('/:id', getOneCotizaciones);


// Post
router.post('', postCotizacion);


export {router}
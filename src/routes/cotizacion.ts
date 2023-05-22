import {Router} from "express";
import {
    DeleteCotizacion,
    getAllCotizaciones,
    getOneCotizaciones,
    patchCotizacion,
    postCotizacion,
} from "../controllers/cotizaciones";


const router = Router()


// Get All
router.get('', getAllCotizaciones);

// Busqueda por codigo y por fecha de vigencia
//router.get('/searchby', searchByCodigoFecha);

// Get One
router.get('/:id', getOneCotizaciones);

// Delete
router.delete('/:id', DeleteCotizacion);

// Put-Patch
router.put('/:id', patchCotizacion);

// Post
router.post('', postCotizacion);


export {router}
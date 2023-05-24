import {Router} from "express";
import {
    getAllMonedas,
    getOneMoneda,
    postMoneda,
    putMoneda,
    delMoneda,
    getCotizacionesByMoneda
} from "../controllers/moneda";


const router = Router()


router.get("/searchCotizaciones", getCotizacionesByMoneda)

//Get All
router.get('',getAllMonedas )

//Get One
router.get('/:id',getOneMoneda )

//Delete
router.delete('/:id', delMoneda )

//Put-Patch
router.put('/:id', putMoneda)

//Post
router.post('',postMoneda)


export {router}
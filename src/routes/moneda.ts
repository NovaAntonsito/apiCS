import {Router} from "express";
import {getAllMonedas, getOneMoneda, postMoneda, putMoneda} from "../controllers/moneda";


const router = Router()


//Get All
router.get('',getAllMonedas )

//Get One
router.get('/:id',getOneMoneda )

//Delete
router.delete('/:id', )

//Put-Patch
router.put('/:id', putMoneda)

//Post
router.post('',postMoneda)


export {router}
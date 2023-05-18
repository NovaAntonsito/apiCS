import {Router} from "express";
import {getAllMonedas, getOneMoneda, postMoneda} from "../controllers/moneda";


const router = Router()


//Get All
router.get('',getAllMonedas )

//Get One
router.get('/:id',getOneMoneda )

//Delete
router.delete('/:id', )

//Put-Patch
router.patch('/:id', )

//Post
router.post('',postMoneda)


export {router}
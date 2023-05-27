import {Router} from "express";
import {getAllPaises, getOnePais, postPais, putPais,deletePaisCons} from "../controllers/pais";


const router = Router()

router.get('', getAllPaises)

router.get('/:id', getOnePais)

router.post('', postPais)

router.put('/:id', putPais)

router.delete('/:id', deletePaisCons)

export {router}
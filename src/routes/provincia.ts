import { Router } from 'express';
import { DeleteProvincia, GetAllProvincias, GetOneProvincia, PatchProvincia, PostProvincia } from '../controllers/provincia';





const router = Router()




//Get All
router.get('', GetAllProvincias)

//Get One
router.get('/:id', GetOneProvincia)

//Delete
router.delete('/:id', DeleteProvincia)

//Put-Patch
router.put('/:id', PatchProvincia)

//Post 
router.post('',PostProvincia)







export {router}
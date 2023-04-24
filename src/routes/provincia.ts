import { Router } from 'express';
import { DeleteProvincia, GetAllProvincias, GetOneProvincia, PatchProvincia, PostProvincia } from '../controllers/provincia';





const router = Router()


//Get One
router.get('/:nombre', GetOneProvincia)

//Get All
router.get('', GetAllProvincias)

//Delete
router.delete('/:nombre', DeleteProvincia)

//Put-Patch
router.patch('/:id', PatchProvincia)

//Post 
router.post('',PostProvincia)







export {router}
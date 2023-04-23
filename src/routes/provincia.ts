import { Router } from 'express';
import { CreateProvincia } from '../controllers/provincia';


const router = Router()


//Get One
router.get('')

//Get All
router.get('', ()=>{})

//Delete
router.delete('', ()=>{})

//Put-Patch
router.patch('', ()=>{})

//Post 
router.post('',CreateProvincia)







export {router}
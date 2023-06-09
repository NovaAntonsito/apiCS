import {Router} from 'express'
import {getAllUser, getOneUser, userDelete} from '../controllers/user';

const router = Router();


router.get('', getAllUser)

router.get('/:id', getOneUser)

router.delete('/:id', userDelete)


export {router};
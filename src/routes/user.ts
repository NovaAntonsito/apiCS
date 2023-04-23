import {Router} from 'express'
import {getAllUser, getOneUser, userDelete} from '../controllers/user';
import { checkJWT } from '../middlewares/session';

const router = Router();


router.get('', getAllUser)

router.get('/:id', checkJWT, getOneUser)

router.delete('/:id', userDelete)


export {router};
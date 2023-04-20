import {Router} from 'express'
import { createUser, getAllUser, getOneUser, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();


router.get('', getAllUser)

router.post('', createUser)

router.get('/:id', getOneUser)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)


export default router;
import {Request, Response} from 'express'
import {registerNewUser,loginUser} from '../services/authServices'


export const registerCtrl = async ({body} : Request, res: Response) => {
    const newUser = await registerNewUser(body)
    
}

export const loginCtrl = async (req : Request, res : Response) => {
    
}
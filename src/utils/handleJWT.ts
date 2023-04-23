import {sign,verify} from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'api_key_temp_69420';

const genToken = (name : string) =>{
    const JWT = sign({name},JWT_SECRET,{
        expiresIn:"3h"
    })
    return JWT;
}

const verifyToken = (jwt : string) =>{
    const isOk = verify(jwt,JWT_SECRET)
   return isOk
}

export {genToken, verifyToken}
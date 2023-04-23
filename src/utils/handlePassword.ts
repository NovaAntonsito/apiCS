import {hash, compare} from 'bcrypt'
 
const encrypt = async (pass : string) =>{
    try{
    const passwordHashed = await hash(pass, 10)
    return passwordHashed
    }catch(e){
        console.log(e);
        
    }
}

const verifyPass = async (passHashed : string, passActual : string) => {
    const isValid = await compare(passActual, passHashed)
    return isValid
    
}

export {encrypt, verifyPass}
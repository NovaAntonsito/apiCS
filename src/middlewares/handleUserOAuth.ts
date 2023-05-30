import {NextFunction, Request, Response} from 'express'
import {Repository} from "typeorm";
import {User} from "../models/user";
import {getDataSource} from "../config/DBConfig";
import {genToken} from "../utils/handleJWT";

let UserRepository: Repository<User>;

const initRepo = async () => {
    try {
        const appDataSource = await getDataSource();
        UserRepository = appDataSource.getRepository(User);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
initRepo()
const handleUser = async (req: Request, res: Response, next:NextFunction) => {
    await initRepo();
    //@ts-ignore
    const { id ,name, email, photos, provider } = req.user;
    let emailValue = email[0].value;
    let photosValue = photos[0].value;
    const userFoundProvider = await UserRepository.findOne({where : {providerID : id}});
    if(!userFoundProvider) {
        const newUserOAUTH = UserRepository.create({
            username: name,
            email: emailValue,
            urlImagen: photosValue,
            provider: provider,
            providerID: id
        });
        await UserRepository.save(newUserOAUTH);
        res.send({accessToken : genToken(newUserOAUTH.username)})
        next()
    }else{
        res.send({accessToken : genToken(userFoundProvider.username)})
        next()
    }
};


export {handleUser}
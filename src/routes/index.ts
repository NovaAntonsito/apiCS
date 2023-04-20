const express = require('express');
const fs = require('fs')
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName : string) => {
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file : string) => {
    const name : any = removeExtension(file)
    console.log(`/${name}.controller`, require(`./${name}`));
    
    const skip : any = ['index'].includes(name)
    if (!skip) {
        router.use(`/${name}.controller`, require(`./${name}`))
    }
})


module.exports = router;

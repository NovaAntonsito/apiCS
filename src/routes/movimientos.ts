import {Router} from "express";
import {
    deleteMovimiento,
    getAllMovimiento,
    getOneMovimiento,
    postMovimiento,
    putMovimiento
} from "../controllers/movimiento";

const router = Router()

//Get all
router.get("", getAllMovimiento)

//Get one
router.get("/:id", getOneMovimiento)

//Post
router.post("", postMovimiento)

//Put
router.put("/:id", putMovimiento)

//Delete
router.delete("/:id", deleteMovimiento)


export {router}
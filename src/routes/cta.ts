import {Router} from "express";
import {deleteCTA, getAllCTA, getOneCTA, postCTA, putCTA} from "../controllers/CTA";

const router = Router()

router.get('', getAllCTA)
// Get All

router.get("/:id",getOneCTA )

router.put("/:id", putCTA);

// Get One
router.delete('/:id', deleteCTA);


// Post
router.post('', postCTA);

export {router}
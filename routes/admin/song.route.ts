import {Router} from "express"
import * as songController from "../../controllers/admin/song.controller"
import multer from "multer" 
import * as uploadSingle from "../../middlewares/admin/upload.middleware"

const upload =multer()
const router:Router = Router()
router.get("/",songController.index)
router.get("/create",songController.create)
router.post("/create",upload.single("avatar"),uploadSingle.uploadSingle, songController.createPost)
export const songRoutes:Router = router
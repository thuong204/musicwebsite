import express,{Router} from "express"
import * as uploadController from "../../controllers/admin/upload.controller"

import multer from "multer"
import * as uploadSingle from "../../middlewares/admin/upload.middleware"

const upload = multer()
const router :Router = Router()
router.post("/",
    upload.single("file"),
    uploadSingle.uploadSingle,  uploadController.upload)
export const uploadRoutes:Router = router
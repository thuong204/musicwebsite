import { Router } from "express"
import * as songController from "../../controllers/admin/song.controller"
import multer from "multer"
import * as uploadSingle from "../../middlewares/admin/upload.middleware"

const upload = multer()
const router: Router = Router()
router.get("/", songController.index)
router.get("/create", songController.create)
router.post("/create",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "audio", maxCount: 1 }]),
        uploadSingle.uploadFields, songController.createPost)
router.get("/edit/:songId",songController.edit)
router.patch(`/edit/:songId`, upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 }]),
    uploadSingle.uploadFields, songController.editPatch)
export const songRoutes: Router = router
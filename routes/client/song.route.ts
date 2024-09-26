import express,{Router} from "express";
import * as songController from "../../controllers/client/song.controller"
const router: Router = Router()
router.get("/:slugTopic",songController.list)
router.get("/detail/:slugSong",songController.detail)

export const songRoutes:Router =  router
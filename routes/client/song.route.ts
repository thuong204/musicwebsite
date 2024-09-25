import express,{Router} from "express";
import * as songController from "../../controllers/client/song.controller"
const router: Router = Router()
router.get("/:slugTopic",songController.index)

export const songRoutes:Router =  router
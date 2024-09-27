import express,{Router} from "express";
import * as songController from "../../controllers/client/song.controller"
const router: Router = Router()
router.get("/:slugTopic",songController.list)
router.get("/detail/:slugSong",songController.detail)
router.patch("/like/:typeLike/:idSong",songController.like)
router.patch("/favorite/:typeFavorite/:idSong",songController.favorite)
router.patch("/listen/:songId",songController.listen)


export const songRoutes:Router =  router
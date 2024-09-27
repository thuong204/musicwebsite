
import * as favoriteController from "../../controllers/client/favorites-songs.controller"
import express,{ Router } from "express";
const router:Router = Router()
export const favoriteRoutes:Router = router
router.get("/", favoriteController.index)
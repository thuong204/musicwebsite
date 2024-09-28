
import * as favoriteController from "../../controllers/client/favorites-songs.controller"
import express,{ Router } from "express";
const router:Router = Router()
router.get("/", favoriteController.index)
export const favoriteRoutes:Router = router
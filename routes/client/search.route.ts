
import * as searchController from "../../controllers/client/search.controller"
import express,{ Router } from "express";
const router:Router = Router()
export const searchRoutes:Router = router
router.get("/:type", searchController.search)
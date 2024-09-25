import express ,{Router} from "express";
import * as topicController from "../../controllers/client/topic.controller"
const router:Router = Router()

router.get("/", topicController.index)
export const topicRoutes:Router = router
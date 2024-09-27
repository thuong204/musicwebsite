import  express,{Router} from "express"
import * as dashboardController from "../../controllers/admin/dashboard.controller"
const router:Router  =Router()
router.get("/", dashboardController.index)
export  const dashboardRoutes:Router = router
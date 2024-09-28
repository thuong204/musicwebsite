import { Express } from "express";
import  {dashboardRoutes} from "./dashboard.route"
import { systemconfig } from "../../config/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";

const routes  = (app:Express):void =>{
    const PATH_ADMIN:string = systemconfig.prefix_admin
    app.use(`/${PATH_ADMIN}/dashboard`, dashboardRoutes)
    app.use(`/${PATH_ADMIN}/topics`,topicRoutes)
    app.use(`/${PATH_ADMIN}/songs`,songRoutes)
    app.use(`/${PATH_ADMIN}/upload`,uploadRoutes)


}
export default routes
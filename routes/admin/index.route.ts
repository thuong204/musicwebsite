import { Express } from "express";
import  {dashboardRoutes} from "./dashboard.route"
import { systemconfig } from "../../config/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

const routes  = (app:Express):void =>{
    const PATH_ADMIN:string = systemconfig.prefix_admin
    app.use(`/${PATH_ADMIN}/dashboard`, dashboardRoutes)
    app.use(`/${PATH_ADMIN}/topics`,topicRoutes)
    app.use(`/${PATH_ADMIN}/songs`,songRoutes)


}
export default routes
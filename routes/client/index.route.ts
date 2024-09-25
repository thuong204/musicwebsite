import {Express} from "express"
import {topicRoutes} from "./topic.route"
import { songRoutes } from "./song.route"

const routes  = (app: Express):void =>{
    app.use("/topics",topicRoutes)
    app.use("/songs",songRoutes)
}
export default routes
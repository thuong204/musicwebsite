import {Express} from "express"
import {topicRoutes} from "./topic.route"
import { songRoutes } from "./song.route"
import { favoriteRoutes } from "./favorite-songs.route"
import { searchRoutes } from "./search.route"

const routes  = (app: Express):void =>{
    app.use("/topics",topicRoutes)
    app.use("/songs",songRoutes)
    app.use("/favorite-songs", favoriteRoutes)
    app.use("/search",searchRoutes)
}
export default routes
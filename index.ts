import express,{Express,Request,Response} from "express"
import routesClient from "./routes/client/index.route"
import routesAdmin from "./routes/admin/index.route"
import dotenv from "dotenv"
import * as connectDatabase from "./config/database"
import { systemconfig } from "./config/config"
import bodyParser from "body-parser"
import path from "path"

dotenv.config()
const app:Express  =express()
const port:number |string = process.env.PORT || 3000;

app.use(express.static("public"))

app.set("views","./views");
app.set("view engine","pug")

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.locals.prefixAdmin = systemconfig.prefix_admin

app.use(express.json())
app.use(express.urlencoded({extended: false}))

connectDatabase.connect()

routesClient(app)
routesAdmin(app)


app.listen(port,()=>{

    console.log(`App listen to port ${port}`)

})



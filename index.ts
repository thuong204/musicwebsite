import express,{Express,Request,Response} from "express"
import routes from "./routes/client/index.route"
import dotenv from "dotenv"
import * as connectDatabase from "./config/database"

dotenv.config()
const app:Express  =express()
const port:number |string = process.env.PORT || 3000;

app.use(express.static("public"))

app.set("views","./views");
app.set("view engine","pug")

connectDatabase.connect()

routes(app)
app.get("/",(req,res)=>{
    res.json({
        code:200,
        "message":"OK"
    })
})

app.listen(port,()=>{

    console.log(`App listen to port ${port}`)

})



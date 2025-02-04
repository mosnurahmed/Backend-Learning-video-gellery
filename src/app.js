import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded({extended:true,}))
app.use(express.static("public"))
app.use(cookieParser())


// router import 


import userRouter from "./routes/userRouter.js"
app.use("/user", userRouter)


export {app}
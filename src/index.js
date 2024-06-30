import { app } from "./app.js";
import dbConnection from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path:'./env'
})
dbConnection().then(() =>{
    app.listen(process.env.PORT || 8000,()=> console.log(`Server is running at port: ${process.env.PORT}`))
}).catch((err) =>console.log("MONGO DB CONNECTION FAILED ! ! !"))

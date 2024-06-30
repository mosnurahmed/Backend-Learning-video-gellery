import mongoose from "mongoose"

import { DB_NAME } from "../constrains.js"

 const dbConnection = async()=>{
  try{
    console.log(`url : ${process.env.CONNECTION_STRING }/${DB_NAME}`)
    const connectionInstance = await mongoose.connect(`${process.env.CONNECTION_STRING }/${DB_NAME}`)
    console.log(`\n Mongodb Connected !! DB Host : ${connectionInstance.connection.host}`)
  } catch(error){
    console.log(`MONGODB CONNECTION FAILED `,error);
    process.exit(1)
  }

}
export default dbConnection
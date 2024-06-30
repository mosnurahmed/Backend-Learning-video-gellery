import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_KEY 
});

const uploaderCloudinary= async (localFilePath) =>{
   try{
    if(!localFilePath) null
    const response= cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
    })

    console.log("Cloudinary Response: " ,response)
    return response
   }catch(err){
fs.unlinkSync(localFilePath)
   }
}

export {uploaderCloudinary}


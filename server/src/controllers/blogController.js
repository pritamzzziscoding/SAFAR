import { db } from "../config/database.js";
import { getImageUrl } from "./uploadController.js";
import { delete_local_file } from "./uploadController.js";
// import jwt from "jsonwebtoken";
// import { authenticateUser } from "../middlewares/authMiddleware.js";

export const insertblog = async (req,res)=>{
    try {
        const userId  =req.user.id;
        const userType = req.user.type;
        const {caption,location,description} = req.body;
        const imgUrl = await getImageUrl(req.file.path);
        const query = `INSERT INTO BLOGS (UserID,UserType,Title,IMGURL,Location,Description) VALUES(?,?,?,?,?,?)`
        await db.query(query,[userId,userType,caption,imgUrl,location,description]);
        delete_local_file(req.file.path);
        return res.status(200).json({
            success:true,
            message:"Blog successfully inserted into the database! "
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}

export const getAllBlogs = async (req,res)=>{
    try {
        const query = `SELECT * FROM BLOGS`;
        const result = await db.query(query);
        console.log(result[0]);
        res.status(200).json({
            success:true,
            message:"Fetched all records successfully !",
            blogs:result[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}

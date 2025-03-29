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

export const deleteblog = async (req,res)=>{
    try {
        const {BlogID} = req.body
        console.log(BlogID)
        const query = `DELETE FROM BLOGS WHERE BLOGID = ?`;
        await db.query(query,[BlogID]);
        res.status(200).json({
            success:true,
            message:"Blog Deleted Successfully!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:""
        })
    }
}


export const likehelper = async(req,res)=>{
    try {
        const {BlogID} = req.body;
        const id = req.user.id ;
        const type = req.user.type;
        const like_check = `SELECT * FROM LIKES WHERE BlogID = ? AND UserID = ? AND UserType = ?`
        const like_result = await db.query(like_check,[BlogID,id,type]);
        let like = false;
        if(!like_result[0][0]){
            const add_query = `INSERT INTO LIKES (BlogID,USERID,USERTYPE) VALUES (?,?,?)`;
            await db.query(add_query,[BlogID,id,type]);
            like = true;
            updateLikeCountInBlog(BlogID);
        }
        else{
            const delete_query = `DELETE FROM LIKES WHERE BlogID = ? AND userid =? AND usertype=?`;
            await db.query(delete_query,[BlogID,id,type]);
            like = false;
            updateLikeCountInBlog(BlogID);
        }
        return res.status(200).json({
            success:true,
            like,
            message:"Likes manipulated successfully!"
        })
    } catch (error) {
        console.log(error);
       return  res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const getCurrentLike = async (req,res)=>{
        try {
        const {BlogID} = req.params;
        // console.log(BlogID);
        const id = req.user.id ;
        const type = req.user.type;
        const like_check = `SELECT * FROM LIKES WHERE BlogID = ? AND UserID = ? AND UserType = ?`
        const like_result = await db.query(like_check,[BlogID,id,type]);
        if(!like_result[0][0]){
            return res.status(200).json({
                success: true,
                like: false,
                message:"Abhi like nahi hai bhai"
            })
        }
        else{
            return res.status(200).json({
                success:true,
                like:true,
                message:"Already like kar rakha hai"
            })
        }

        } catch (error) {
            console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


const updateLikeCountInBlog = async (BlogID)=>{
    const khatarnak = `UPDATE BLOGS SET LIKES = (SELECT COUNT(*) FROM LIKES WHERE BLOGID = ?) WHERE BLOGID = ?`;
    await db.query(khatarnak,[BlogID,BlogID]);
}



export const updateBlog = async (req,res)=>{
    try {
        const {caption,location,description} = req.body;
        let imgURL = "";
        const userId = req.user.id;
        const userType = req.user.type;
        if(req.file){
            imgURL = await getImageUrl(req.file.path);
            const query = `UPDATE BLOGS SET Title=?,IMGURL=?,Location=?,Description=? WHERE USERID=${userId} AND USERTYPE=${userType}`
            await db.query(query,[caption,imgURL,location,description]);
            delete_local_file(req.file.path);
        }
        else{
            const query = `UPDATE BLOGS SET Title=?,Location=?,Description=? WHERE USERID=? AND USERTYPE=?`
            await db.query(query,[caption,location,description,userId,userType]);
        }
        return res.status(200).json({
            success:true,
            message:"Blog updated successfully!"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}
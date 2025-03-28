import {db} from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const getDetails = async (req, res) => {
    try {
      const { token } = req.cookies;
      console.log(token);
      const decoded = jwt.verify(token, "ijinwincwifjqun");
      const type = decoded.type;
      const id = decoded.id ;
      const id_string = type==='tourist'?"TouristID":"AgencyID";
      const query = `SELECT email,firstname,lastname,phoneno,image_url FROM ${type} WHERE ${id_string} = ? `
      const result = await db.query(query,[id]);
      console.log(result);
      result[0][0]["type"] = type;
      res.status(200).json({
        success: true,
        result:result[0][0],
        message: "Details nahi pata chali kya ? Refresh kar!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
  

export const imgUpdate = async (req,res) => {
try {
    const {image_url} = req.body;
    const {token} = req.cookies;
    const decoded = jwt.verify(token,"ijinwincwifjqun");
    const id = decoded.id;
    const type = decoded.type;
    const id_string = type==="tourist"?"TouristID":"AgencyID";
    console.log(id, id_string, type, image_url);
    
    const query = `UPDATE ${type} SET image_url = ? WHERE ${id_string} = ?`;
    await db.query(query,[image_url,id]);
    res.status(200).json({
        success:true,
        message:"Image Url Updated Successfully !"
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
}
}

export const nameUpdate = async (req,res)=>{
    try {
        const {firstname,lastname} = req.body;
        const {token} = req.cookies;
        const decoded = jwt.verify(token,"ijinwincwifjqun");
        const id = decoded.id;
        const type = decoded.type;
        const id_string = type==="tourist"?"TouristID":"AgencyID";
        console.log(id, id_string, type, firstname,lastname);
        
        const query = `UPDATE ${type} SET firstname = ? , lastname =? WHERE ${id_string} = ?`;
        await db.query(query,[firstname,lastname,id]);
        res.status(200).json({
            success:true,
            message:"Frist and Last name Updated Successfully !"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const passwordUpdate = async(req,res)=>{
    try {
        const {current,confirm} = req.body;
        const {token} = req.cookies;
        const decoded = jwt.verify(token,"ijinwincwifjqun");
        const id = decoded.id;
        const type = decoded.type;
        const id_string = type==="tourist"?"TouristID":"AgencyID";
        // console.log(id, id_string, type, firstname,lastname);
        const password_check_query = `SELECT password from ${type} WHERE ${id_string}=?`;

        
        // const query = `UPDATE ${type} SET firstname = ? , lastname =? WHERE ${id_string} = ?`;
        const result = await db.query(password_check_query,[id]);
        // console.log(result[0][0].password);
        const isMatch = await bcrypt.compare(result[0][0].password,current);
        if(!isMatch){
            return res.status(200).json({
                success:false,
                message:"Your entered current password doesn't match your original password"
            })
        }
        const hashedpassword = await bcrypt.hash(confirm,10);
        console.log(hashedpassword);
        const update_query = `UPDATE ${type} SET password = ? WHERE ${id_string} =?`
        await db.query(update_query,[hashedpassword,id]);
        res.status(200).json({
            success:true,
            message:"Password Updated Successfully !"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            
            success:false,
            message:"Internal Server Error"
        })
    }
}
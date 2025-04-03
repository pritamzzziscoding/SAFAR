import { db } from "../config/database.js";

export const cancelButtonClicked = async (req,res)=>{
    try {
        const {BookingID} = req.body;
        const query = `UPDATE BOOKINGS SET CANCELSTATUS = 1 WHERE BOOKINGID = ? `
        await db.query(query,[BookingID]);
        res.status(200).json({
            success:true,
            message:"Successfully updated the cancel status"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error!"
        })
    }
}
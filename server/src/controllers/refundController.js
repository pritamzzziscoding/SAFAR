import { db } from "../config/database.js";
export const refundButtonClicked = async (req,res)=>{
    try {
        const {BookingID} = req.body;
        const query = `UPDATE BOOKINGS SET CANCELSTATUS = ? WHERE BOOKINGID = ?`
        await db.query(query,[2,BookingID])
        return res.status(200).json({
            success:true,
            message:"Refund successfully done!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR!"
        })
    }
}
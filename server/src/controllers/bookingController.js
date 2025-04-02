import { db } from "../config/database.js";
import jwt from "jsonwebtoken";

export const showAllBookings = async(req,res)=>{
  try {
    const touristid = req.user.id;
    const bookingsQuery = `SELECT B.BookingID , p.destination,p.title FROM BOOKINGS B LEFT JOIN PACKAGES P ON B.PACKAGEID = P.PACKAGEID  WHERE B.TOURISTID = ?`
    const bookings = await db.query(bookingsQuery,[touristid]);
    res.status(200).json({
      success:true,
      message:"All bookings  of fetched successfully",
      bookings:bookings[0]
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error !"
    })
  }
}


export const getBookingDetails = async (req,res)=>{
  try {
    const {id} = req.params;
    const bookingQuery = `SELECT * FROM BOOKINGS WHERE BOOKINGID = ?`
    const result = await db.query(bookingQuery,[Number(id)]);
    const memberQuery = 'SELECT MemberName, age, gender FROM MEMBERS WHERE BOOKINGID=?'
    const member_result = await db.query(memberQuery,[Number(id)]);
    // console.log(result[0],member_result);
    result[0][0]["members"] = member_result[0];
    const pkgID = result[0][0]["PackageID"];
    console.log(pkgID);
    const extra_query = `SELECT Title,Duration,Destination FROM PACKAGES WHERE PACKAGEID =?`
    const extra_result = await db.query(extra_query,[pkgID]);
    // console.log(extra_result);
    result[0][0]["packagename"] = extra_result[0][0]["Title"];
    result[0][0]["duration"]  = extra_result[0][0]["Duration"];
    result[0][0]["destination"]  = extra_result[0][0]["Destination"];
    res.status(200).json({
      success:true,
      message:"Booking Details Fetched",
      booking:result[0][0]
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error!"
    })
  }
  
}
import { db } from "../config/database.js";
import jwt from "jsonwebtoken";



export const showAllBookings = async (req, res) => {
  try {
    if (req.user.type === "agency") {
      return res.redirect("http://localhost:5173/packages");
    }

    const touristid = req.user.id;
    const bookingsQuery = `
      SELECT B.BookingID, p.destination, p.title, p.ImgURL 
      FROM BOOKINGS B 
      LEFT JOIN PACKAGES P ON B.PACKAGEID = P.PACKAGEID  
      WHERE B.TOURISTID = ? AND B.STATUS = ?`;

    let bookings = await db.query(bookingsQuery, [touristid, "VERIFIED"]);
    bookings = bookings[0];

    bookings = await Promise.all(bookings.map(async (obj) => {
      const ret_obj = obj;
      const bookingID = ret_obj.BookingID;

      const query = `
        SELECT 
          CASE 
            WHEN NOW() > DATE_ADD(b.FromDate, INTERVAL p.duration DAY) 
            THEN 1 
            ELSE 0 
          END AS isExpired
        FROM Bookings b
        JOIN Packages p ON b.packageID = p.packageID
        WHERE b.bookingID = ? AND b.cancelstatus = 0;
      `;

      const [rows] = await db.execute(query, [bookingID]);
      const isExpired = rows.length > 0 ? rows[0].isExpired === 1 : false;
      ret_obj["isReviewable"] = isExpired;
      return ret_obj;
    }));
    console.log(bookings)
    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully",
      bookings
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};



export const getBookingDetails = async (req,res)=>{
  try {
    const touristID = req.user.id;
    if(req.user.type === "agency"){
      return res.redirect("http://localhost/packages")
    }
    const {id} = req.params;
    const bookingQuery = `SELECT * FROM BOOKINGS WHERE BOOKINGID = ?`
    const result = await db.query(bookingQuery,[Number(id)]);
    if(result[0][0]["TouristID"]!=touristID){
          return res.redirect("http://localhost:5173/home")
    }
    const memberQuery = 'SELECT MemberName, age, gender FROM MEMBERS WHERE BOOKINGID=?'
    const member_result = await db.query(memberQuery,[Number(id)]);
    // console.log(result[0],member_result);
    result[0][0]["members"] = member_result[0];
    const pkgID = result[0][0]["PackageID"];
    console.log(pkgID);
    const extra_query = `SELECT Title,Duration,Destination FROM PACKAGES WHERE PACKAGEID =?`
    const extra_result = await db.query(extra_query,[pkgID]);
    // const time = extra_result[0][0]["Duration"]; // Time in days
    // const startDate = new Date(result[0][0]["FromDate"]); // Convert to Date object
    const bookingDate = new Date(result[0][0]["BookingDate"]);
    const durationInMs =  24 * 60 * 60 * 1000; 
    const targetDate = new Date(bookingDate.getTime() + durationInMs);
    const currentDate = new Date();
    let isCancellable = true;
    if(currentDate>targetDate){
      isCancellable = false;
    }
    // console.log(extra_result);
    result[0][0]["packagename"] = extra_result[0][0]["Title"];
    result[0][0]["duration"]  = extra_result[0][0]["Duration"];
    result[0][0]["destination"]  = extra_result[0][0]["Destination"];
    result[0][0]["isCancellable"] = isCancellable;

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
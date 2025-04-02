import { db } from "../config/database.js";
import jwt from "jsonwebtoken";

export const addReview = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(200)
        .json({ success: false, message: "Please login first!" });
    }
    const decoded = jwt.verify(token, "ijinwincwifjqun");
    const TouristID = decoded.id;

    const [result] = await db.query(
      "SELECT * FROM BOOKINGS WHERE TouristID = ?",
      [TouristID]
    );
    if (result.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "You can't review without booking!" });
    }
    const { bookingID, Rating, Feedback } = req.body;
    if (!bookingID || !Rating) {
      return res
        .status(200)
        .json({ success: false, message: "Please enter the required fields" });
    }

    const query = `
    SELECT 
      CASE 
        WHEN NOW() > DATE_ADD(b.FromDate, INTERVAL p.duration DAY) 
        THEN 1 
        ELSE 0 
      END AS isExpired
    FROM Bookings b
    JOIN Packages p ON b.packageID = p.packageID
    WHERE b.bookingID = ?;
  `;
    const [rows] = await db.execute(query, [bookingID]);
    let isExpired = rows.length > 0 ? rows[0].isExpired === 1 : false;
    if (!isExpired) {
      return res.status(200).json({
        success: false,
        message:
          "You can't review this booking as  it's duration is not complete yet.",
      });
    }

    const [result2] = await db.query(
      `SELECT * FROM BOOKINGS WHERE BOOKINGID=?`,
      [bookingID]
    );
    if (result2.length === 0) {
      return res
        .status(200)
        .json({
          success: false,
          message: "No booking exists with the given bookingID!",
        });
    }

    const package_query = "SELECT PACKAGEID FROM BOOKINGS WHERE BOOKINGID = ?";
    const [helper] = await db.query(package_query, [bookingID]);
    const PackageID = helper[0]?.PACKAGEID;

    if (!PackageID) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid BookingID" });
    }

    const reviewQuery =
      "INSERT INTO REVIEWS(BookingID, PackageID, Rating, Feedback) VALUES (?, ?, ?, ?)";
    await db.query(reviewQuery, [bookingID, PackageID, Rating, Feedback || ""]);
    res
      .status(200)
      .json({ success: true, message: "Review Added Successfully!" });
  } catch (err) {
    console.error("Error in review:", err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// DP, Tourist First name , ReviewDate,Rating,Feedback


export const getAllreviews = async (req,res)=>{
  try {
      
      const pkgid = req.params.id; 
      const select_reviews = `SELECT * FROM REVIEWS WHERE PACKAGEID=? ORDER BY REVIEWDATE DESC`
      const reviews = await db.query(select_reviews,[pkgid]);
      console.log(reviews[0]);
      for(let i=0;i<reviews[0].length;i++){
           const bookingID = reviews[0][i]["BookingID"]
           const touristIDquery = `SELECT TouristID FROM BOOKINGS WHERE BOOKINGID =?`
           const tourist_result = await db.query(touristIDquery,[bookingID])
          //  console.log(tourist_result)
           const touristID = tourist_result[0][0]["TouristID"]
           const nameQuery = `SELECT firstname,Image_url from tourist where touristID = ?`
           const nameresult = await db.query(nameQuery,[touristID])
           const firstname = nameresult[0][0]["firstname"]
           const imgURL = nameresult[0][0]["Image_url"]
           
           reviews[0][i]["firstname"] = firstname  
           reviews[0][i]["imgURL"] = imgURL     
      }
      res.status(200).json({
        success:true,
        message:"Reviews fetched successfully!",
        reviews : reviews[0]
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success:false,
      message:"Internal Server Error!"
    })
  }
}
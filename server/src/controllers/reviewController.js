import { db } from "../config/database.js";


export const addReview = async (req, res) => {
  try {
    const TouristID = req.user.id
    if(req.user.type ==="agency"){
      return res.redirect("http://localhost:5173/packages")
    }
    // console.log("1")
    const [result] = await db.query(
      "SELECT * FROM BOOKINGS WHERE TouristID = ?",
      [TouristID]
    );
    if (result.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "You can't review without booking!" });
    }
    // console.log("2")
    const { bookingID, Rating, Feedback } = req.body;
    if (!bookingID || !Rating) {
      return res
        .status(200)
        .json({ success: false, message: "Please enter the required fields" });
    }
    // console.log("3")

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
    // console.log("4")
    let isExpired = rows.length > 0 ? rows[0].isExpired === 1 : false;
    if (!isExpired) {
      return res.status(200).json({
        success: false,
        message:
          "You can't review this booking as  it's duration is not complete yet.",
      });
    }
    // console.log("5")
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
    // console.log("6")

    const package_query = "SELECT PACKAGEID FROM BOOKINGS WHERE BOOKINGID = ?";
    const [helper] = await db.query(package_query, [bookingID]);
    const PackageID = helper[0]?.PACKAGEID;
    if (!PackageID) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid BookingID" });
    }
    const ifExistQuery = `SELECT * FROM REVIEWS WHERE BOOKINGID =? AND PACKAGEID =?`
    const ifExistResult = await db.query(ifExistQuery,[bookingID,PackageID]);
    if(ifExistResult[0].length !=0){
      return res.status(200).json({
        success:false,
        message:"You can only review once per booking ! Thank You 🙏"
      })
    }
    // console.log("7")
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
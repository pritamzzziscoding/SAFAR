import { db } from "../config/database.js";
import jwt from "jsonwebtoken";

export const addReview = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please login first!" });
    }
    const decoded = jwt.verify(token, "ijinwincwifjqun");
    const TouristID = decoded.id;

    const [result] = await db.query(
      "SELECT * FROM BOOKINGS WHERE TouristID = ?",
      [TouristID]
    );
    if (result.length === 0) {
      return res
        .status(401)
        .json({ message: "You can't review without booking!" });
    }
    const { bookingID, Rating, Feedback } = req.body;
    if (!bookingID || !Rating) {
      return res
        .status(400)
        .json({ message: "Please enter the required fields" });
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
      return res.status(400).json({
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
        .status(401)
        .json({ message: "No booking exists with the given bookingID!" });
    }

    const package_query = "SELECT PACKAGEID FROM BOOKINGS WHERE BOOKINGID = ?";
    const [helper] = await db.query(package_query, [bookingID]);
    const PackageID = helper[0]?.PACKAGEID;

    if (!PackageID) {
      return res.status(400).json({ message: "Invalid BookingID" });
    }

    const reviewQuery =
      "INSERT INTO REVIEWS(BookingID, PackageID, Rating, Feedback) VALUES (?, ?, ?, ?)";
    await db.query(reviewQuery, [bookingID, PackageID, Rating, Feedback || ""]);
    res.json({ message: "Review Added Successfully!" });
  } catch (err) {
    console.error("Error in review:", err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
export const booking = async (req, res) => {
  try {
    console.log(req.cookies);
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res
        .status(200)
        .json({ success: false, message: "Please login first!" });
    }
    const decoded = jwt.verify(token, "ijinwincwifjqun");
    console.log(decoded);
    const TouristID = decoded.id;

    const { start_date, members, packageId } = req.body;
    console.log(start_date);
    console.log(members);
    console.log(packageId);
    if (!packageId || !start_date || !Array.isArray(members)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid booking data!" });
    }

    const bookQuery = `INSERT INTO bookings (TouristID, PackageID, FromDate) VALUES (?, ?, ?)`;
    const [bookingResult] = await db.query(bookQuery, [
      TouristID,
      packageId,
      start_date,
    ]);

    const BookingID = bookingResult.insertId;

    const memberQuery = `INSERT INTO members (BookingID, MemberName, Age,Gender) VALUES (?, ?, ?,?)`;
    for (const member of members) {
      await db.query(memberQuery, [
        BookingID,
        member.name,
        member.age,
        member.gender,
      ]);
    }

    res.status(200).json({ success: true, message: "Booking Successful!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
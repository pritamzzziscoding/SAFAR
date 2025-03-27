import { getPackageById } from "../models/packageModel.js";
import { db } from "../config/database.js";
import jwt from "jsonwebtoken";

export const getPackageDetails = async (req, res) => {
  try {
    const { packageID } = req.params;
    const packageData = await getPackageById(packageID);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(packageData);
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const setnewpackage = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Please login first!" });
    }

    const decoded = jwt.verify(token, "ijinwincwifjqun");
    const AgencyID = decoded.id;

    const {
      Description,
      Price,
      Duration,
      Address,
      IsActive,
      ImgURL,
      Facilities,
    } = req.body;

    const add_package = `INSERT INTO packages(AgencyID, Description, Price, Duration, Address, IsActive, ImgURL) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(add_package, [
      AgencyID,
      Description,
      Price,
      Duration,
      Address,
      IsActive,
      ImgURL,
    ]);
    const PackageID = result.insertId;
    if (!PackageID) {
      throw new Error("Failed to retreive PackageID.!");
    }

    if (Array.isArray(Facilities) && Facilities.length > 0) {
      const detail = `INSERT INTO Details(PackageID, Facilities) VALUES(?, ?)`;
      for (const facility of Facilities) {
        await db.query(detail, [PackageID, facility]);
      }
    }

    res.status(200).json({ message: "Package Added Successfully!" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error! ",
    });
  }
};

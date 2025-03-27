import { db } from "../config/database.js";

export const getPackageById = async (packageID) => {
  const query = "SELECT * FROM packages WHERE PackageID = ?";
  const [result] = await db.query(query, [packageID]);
  return result[0];
};

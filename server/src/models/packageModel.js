import { db } from "../config/database.js";

export const getPackageById = async (packageID) => {
  const query = "SELECT * FROM packages WHERE PackageID = ?";
  let [result] = await db.query(query, [packageID]);
  console.log(result);
  const agencyID = result[0].AgencyID;
  const agency_query = `SELECT phoneno FROM AGENCY WHERE AGENCYID = ?`;
  const [result_phone] = await db.query(agency_query,[agencyID]);
  const phone_no = result_phone[0].phoneno ;
  result[0]["phoneno"] = phone_no;
  return result[0];
};

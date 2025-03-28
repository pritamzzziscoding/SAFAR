import { db } from "../config/database.js";

export const getUserByEmail = async (email, type) => {
  const query = `SELECT * FROM ${type} WHERE email = ?`;
  const [result] = await db.query(query, [email]);
  return result[0];
};

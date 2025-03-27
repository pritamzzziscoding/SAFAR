import { db } from "../config/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      phoneno,
      password,
      confirmpassword,
      type,
    } = req.body;

    if (
      !email ||
      !password ||
      !firstname ||
      !phoneno ||
      !confirmpassword ||
      !type
    ) {
      return res.status(400).json({ message: "Please fill all the details!" });
    }
    if (confirmpassword !== password) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    const find_user = `SELECT * FROM ${type} WHERE email = ?;`;
    const result = await db.query(find_user, [email]);
    if (result[0].length !== 0) {
      return res
        .status(400)
        .json({ message: "User already exists! Please login." });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const add_user = `INSERT INTO ${type} (email, firstname, lastname, phoneno, password) VALUES (?, ?, ?, ?, ?);`;
    await db.query(add_user, [
      email,
      firstname,
      lastname,
      phoneno,
      hashedpassword,
    ]);

    const newresult = await db.query(find_user, [email]);
    if (newresult[0].length === 0) {
      return res
        .status(500)
        .json({ message: "Error retrieving user after insertion." });
    }

    const user = newresult[0][0];
    const userId =
      type.toLowerCase() === "tourist" ? user.TouristID : user.AgencyID;
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || "ijinwincwifjqun"
    );

    res
      .cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({ success: true, message: `New ${type} added`, user, token });
  } catch (err) {
    console.error("Error in signup: ", err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    if (!email || !password || !type) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }

    const find_user = `SELECT * FROM ${type} WHERE email = ?;`;
    const [result] = await db.query(find_user, [email]);
    if (!result[0]) {
      return res
        .status(400)
        .json({ message: "User doesn't exist! Please sign up!" });
    }

    if (!result[0].Password) {
      return res
        .status(500)
        .json({ message: "Password not found in database!" });
    }

    const isMatch = await bcrypt.compare(password, result[0].Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const userId =
      type.toLowerCase() === "agency"
        ? result[0].AgencyID
        : result[0].TouristID;
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || "ijinwincwifjqun"
    );

    res
      .cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json({ success: true, message: "User logged in successfully!" });
  } catch (err) {
    console.error("Error in login: ", err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

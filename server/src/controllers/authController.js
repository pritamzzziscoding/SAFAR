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
      return res
        .status(200)
        .json({ success: false, message: "Please fill all the details!" });
    }
    if (confirmpassword !== password) {
      return res
        .status(200)
        .json({ success: false, message: "Passwords do not match!" });
    }

    const find_user = `SELECT * FROM ${type} WHERE email = ?;`;
    const result = await db.query(find_user, [email]);
    if (result[0].length !== 0) {
      return res.status(200).json({
        success: false,
        message: "User already exists! Please login.",
      });
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
      return res.status(500).json({
        success: false,
        message: "Error retrieving user after insertion.",
      });
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
      .status(200)
      .json({ success: true, message: `New ${type} added`, user, token });
  } catch (err) {
    console.error("Error in signup: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    if (!email || !password || !type) {
      return res
        .status(200)
        .json({ success: false, message: "Email and password are required!" });
    }

    const find_user = `SELECT * FROM ${type} WHERE email = ?;`;
    const [result] = await db.query(find_user, [email]);
    console.log("User find kiya idhar", result);
    if (!result[0]) {
      console.log("if user doesn't exist then i have returned ");
      return res.status(200).json({
        success: false,
        message: "User doesn't exist! Please sign up!",
      });
    }
    console.log("2");
    if (!result[0].Password) {
      return res
        .status(500)
        .json({ success: false, message: "Password not found in database!" });
    }

    const isMatch = await bcrypt.compare(password, result[0].Password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ success: false, message: "Incorrect Password!" });
    }
    console.log("Password match kiya");
    const userId =
      type.toLowerCase() === "agency"
        ? result[0].AgencyID
        : result[0].TouristID;
    const token = jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || "ijinwincwifjqun"
    );
    console.log("token generate kiya");
    res
      .cookie("token", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, message: "User logged in successfully!" });
    console.log("response bhej diya");
  } catch (err) {
    console.error("Error in login: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "successfully logged out",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
  try {
    // console.log("Inside the auth");
    let token = req.cookies.token || req.body.token;
    
    // Handle Authorization header properly
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    
    // console.log("yaha tk to aa gay")
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    //verify token
    try {
      console.log("Before verification");
      // Make sure token is properly formatted before verification
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("After verification");
      req.user = decode;
    } catch (error) {
      console.log(error.message);
      if (error.name === "JsonWebTokenError" || error.message === "jwt malformed") {
        return res.status(401).json({
          success: false,
          message: "Invalid or malformed token. Please login again.",
        });
      }
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

//isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for Instructor only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is the protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

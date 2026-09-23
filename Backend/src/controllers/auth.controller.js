const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists.",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    role: "student",
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: "student",
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username,
      email,
      role: "student",
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    return res.status(400).json({
      message: "Username or Email is required and Password is required",
    });
  }
  //isko upgrade kar sakte hai ki agar username aur email dono me se kuch bhi nhi dala
  //tab return karo ki dono me se ek necessary hai
  //aur password nhi dala ho to return karo ki password nhi dala

  const searchUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!searchUser) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  //isko ese upgrade kar sakte hai ki user ko batao ki actually invalid kya hai
  //password hai email hai ya username hai

  const isPasswordValid = await bcrypt.compare(password, searchUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = await jwt.sign(
    {
      id: searchUser._id,
      role: searchUser.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  res.status(200).json({
    message: "User loggedin successfully",
    searchUser: {
      id: searchUser._id,
      username,
      role: searchUser.role,
    },
  });
}

async function logout(req, res) {
  //token black listing
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });

  return res.status(200).json({
    message: "User logged out successfully.",
  });
}

async function getme(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");

  if(!user){
    return res.status(404).json({
        message :"User not found."
    })
  }

  return res.status(200).json({
    message: "Current session fetched",
    user
  })
}

module.exports = { registerUser, loginUser, logout, getme };

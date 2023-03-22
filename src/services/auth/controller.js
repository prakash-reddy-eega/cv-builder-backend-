import { UserModel } from "../../models/user.js";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { APIResponse } from "../../utils/common.js";
import { DUMMY_PROFILE } from "../../utils/constant.js";
import { SALT } from "../../utils/constant.js";

//user registration
export const userRegistration = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    username,
    profileImg,
    constactNumber,
  } = req.body;
  if (!profileImg) {
    profileImg = DUMMY_PROFILE;
  }
  const emailCheck = await UserModel.findOne({ email: email });
  const usernameCheck = await UserModel.findOne({ username: username });
  if (emailCheck || usernameCheck) {
    if (emailCheck && usernameCheck) {
      const response = new APIResponse(0, "Email and Username already exists");
      res.status(200).send(response);
    } else if (emailCheck) {
      const response = new APIResponse(0, "Email already exists");
      res.status(200).send(response);
    } else if (emailCheck) {
      const response = new APIResponse(0, "username already exists");
      res.status(200).send(response);
    }
  } else {
    if (password === confirmPassword) {
      try {
        const salt = await bcrypt.genSalt(SALT);
        const hashPassword = await bcrypt.hash(password, salt);
        const doc = new UserModel({
          name: name,
          email: email,
          username: username,
          password: hashPassword,
          constactNumber: constactNumber,
          profileImg: profileImg,
        });
        const savedUser = await doc.save();
        // Generate JWT Token
        const token = jwt.sign(
          { userID: savedUser._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5d" }
        );
      } catch (err) {
        console.log(err);
        const response = new APIResponse(0, "Exception Occurs:", {
          error: err.message,
        });
        res.status(400).send(response);
      }
    } else {
      const response = new APIResponse(
        0,
        "Password and Confirm Password doesn't match"
      );
      res.status(200).send(response);
    }
  }
};

//user login
export const userLogin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user;
    if (username) {
      user = await UserModel.findOne({ username: username });
    } else {
      user = await UserModel.findOne({ email: email });
    }
    if (user != null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Generate JWT Token
        const token = jwt.sign(
          { userID: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );
        const response = new APIResponse(1, "Login Successfull", {
          token: token,
        });
        res.send(response);
      } else {
        const response = new APIResponse(0, "Invalid Password");
        res.status(401).send(response);
      }
    } else {
      const response = new APIResponse(0, "Invald Username or Email");
      res.status(401).send(response);
    }
  } catch (err) {
    console.log(err);
    const response = new APIResponse(0, "Exception Occurs:", {
      error: err.message,
    });
    res.status(400).send(response);
  }
};

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    // check if user already exists
    const user = await User.findone({ email });
    if (user) {
      return res
        .status(400)
        .json({ messaage: "User already exists", success: false });
    }
    // convert password to hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      message: `${fullname} registered successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      messaage: "Server Error registring",
      success: false,
    });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required field",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Couldn't found the User.",
        success: false,
      });
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }
    // check role correctly or not
    if (user.role !== role) {
      return res.status(403).json({
        message: "Invalid role for accessing this resource.",
        success: false,
      });
    }

    // generating the token
    const tokenData = {
      id: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    // stores the token in the cookies
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: strict,
      })
      .json({
        message: `welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error login",
      success: false,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({
        message: `${req.user.fullname} logged out successfully`,
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error logout",
      success: false,
    });
  }
};

export const updateProfile = async  (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body; 
    const file = req.files;
    if(!fullname || !email || !phoneNumber ||bio || !skills) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }


  // cloundinary


    // converting into array format
    const skillsArray = skills.split(',');
    const userId = req.id; // learn from middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.fullname = fullname;
    user.email = email; 
    user.phoneNumber = phoneNumber;
    user.bio = bio; 
    user.skills = skillsArray;
    // resume
    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: `${fullname} profile updated successfully`,
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error updating profile",
      success: false,
    });
  }
}
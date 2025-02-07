import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;

export const signUp = asyncHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (await User.findOne({ email: email })) {
      return next(
        new ErrorResponse("User with that email already exists", 400)
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error saving user or getting URL:", err);
    next(new ErrorResponse("Error creating a user", 500));
  }
});

export const signIn = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    if (!password || !user.password) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({ success: "User signed in" });
  } catch (err) {
    console.error("Error signing in user:", err);
    next(new ErrorResponse("Error signing in user", 500));
  }
});

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: "User signed out" });
  } catch (err) {
    console.error("Error signing out user:", err);
    next(new ErrorResponse("Error signing out user", 500));
  }
};

// export const createPost = asyncHandler(async (req, res, next) => {
//   const { body } = req;
//   const newPost = await (await Post.create({ ...body })).populate('author');
//   res.status(201).json(newPost);
// });

// export const getSinglePost = asyncHandler(async (req, res, next) => {
//   const {
//     params: { id }
//   } = req;
//   if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
//   const post = await Post.findById(id).populate('author');
//   if (!post) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
//   res.send(post);
// });

// export const updatePost = asyncHandler(async (req, res, next) => {
//   const {
//     body,
//     params: { id }
//   } = req;
//   if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
//   const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true }).populate('author');
//   if (!updatedPost) throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
//   res.json(updatedPost);
// });

// export const deletePost = asyncHandler(async (req, res, next) => {
//   const {
//     params: { id }
//   } = req;
//   if (!isValidObjectId(id)) throw new ErrorResponse('Invalid id', 400);
//   const deletedPost = await Post.findByIdAndDelete(id).populate('author');
//   if (!deletedPost) throw new Error(`Post with id of ${id} doesn't exist`);
//   res.json({ success: `Post with id of ${id} was deleted` });
// });

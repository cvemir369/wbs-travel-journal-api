// import { isValidObjectId } from "mongoose";
// import User from "../models/User.js";
// import asyncHandler from "../utils/asyncHandler.js";
// import ErrorResponse from "../utils/ErrorResponse.js";

// export const getAllUsers = asyncHandler(async (req, res, next) => {
//   const users = await User.find().populate("author");
//   res.json(posts);
// });

// export const createPost = asyncHandler(async (req, res, next) => {
//   const { body } = req;
//   const newPost = await (await Post.create({ ...body })).populate("author");
//   res.status(201).json(newPost);
// });

// export const getSinglePost = asyncHandler(async (req, res, next) => {
//   const {
//     params: { id },
//   } = req;
//   if (!isValidObjectId(id)) throw new ErrorResponse("Invalid id", 400);
//   const post = await Post.findById(id).populate("author");
//   if (!post)
//     throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
//   res.send(post);
// });

// export const updatePost = asyncHandler(async (req, res, next) => {
//   const {
//     body,
//     params: { id },
//   } = req;
//   if (!isValidObjectId(id)) throw new ErrorResponse("Invalid id", 400);
//   const updatedPost = await Post.findByIdAndUpdate(id, body, {
//     new: true,
//   }).populate("author");
//   if (!updatedPost)
//     throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
//   res.json(updatedPost);
// });

// export const deletePost = asyncHandler(async (req, res, next) => {
//   const {
//     params: { id },
//   } = req;
//   if (!isValidObjectId(id)) throw new ErrorResponse("Invalid id", 400);
//   const deletedPost = await Post.findByIdAndDelete(id).populate("author");
//   if (!deletedPost) throw new Error(`Post with id of ${id} doesn't exist`);
//   res.json({ success: `Post with id of ${id} was deleted` });
// });

/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from 'express-async-handler';
import  { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../config/generateToken';
import { IUser } from '../models/User';


export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void | any> => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
      }
    const userExists = await User.findOne({ email: req.body.email });

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }


    const user = await User.create({ username, email, password });
    console.log("-------------------------------------");
    console.log(user);
    

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id)
    });
  } else {
        res.status(400);
        throw new Error("User not found");
    }
});


export const allUsers = asyncHandler(async (req: Request, res: Response): Promise<void| any> => {
    // const keyword = req.query.search
    //   ? {
    //       $or: [
    //         { name: { $regex: req.query.search, $options: "i" } },
    //         { email: { $regex: req.query.search, $options: "i" } },
    //       ],
    //     }
    //   : {};
  
   const users = await User.find();
   res.send(users);
  });

export const authUser = asyncHandler(async (req: Request, res: Response): Promise<void | any> => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.validatePassword(password))) {
      return res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  
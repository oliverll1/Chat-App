/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import User from '../models/User';
import Chat from '../models/Chat';

export const accessChat = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;

  
    if (!userId) {
      console.log("UserId param not sent with request");
      res.sendStatus(400);
      return;
    }
  
    // Check if there is an existing chat between the current user (req.user) and the specified userId
    const isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: req.user?._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    }).populate("users", "-password")
      .populate("latestMessage");
  
    // Populate sender information for the latest message
    const currentChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username email",
    });
    
    // If there is an existing chat between the users, send the chat data
    if (currentChat.length > 0) {
      res.send(currentChat[0]);
      return;
    } 

    // If there's no existing chat, create a new one
    const chatData = {
        chatName: 'User chat',       
        users: [req.user?._id, userId],  // Include the current user and the specified user in the chat
    };

    try {
        const createdChat = await Chat.create(chatData);

        // Retrieve the newly created chat with populated user data
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
        );

        res.status(200).json(FullChat);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400);
            throw new Error(error.message);
        } else {
            res.status(400);
            throw new Error("An unknown error occurred");
        }
    }   
});

  // Fetch all chats for a user
 export const fetchChats = asyncHandler(async (req: Request, res: Response): Promise<void | any> => {
    try {
        const results = await Chat.find({ users: { $elemMatch: { $eq: req.user?._id } } })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

        const populatedResults = await User.populate(results, {
            path: "latestMessage.sender",
            select: "username email",
        });

        res.status(200).send(populatedResults);
    
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400);
            throw new Error(error.message);
        } else {
            res.status(400);
            throw new Error("An unknown error occurred");
        }
    }   
  });

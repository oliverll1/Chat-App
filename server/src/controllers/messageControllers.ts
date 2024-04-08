import asyncHandler from "express-async-handler";
import Message, { IMessage } from "../models/Message";
import { Request, Response } from 'express';
import User from "../models/User";
import Chat from "../models/Chat";
import { Document } from "mongoose";

// Get all Messages
export const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");
    res.json(messages);
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

// Create New Message
export const sendMessage = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    res.sendStatus(400);
    return;
  }

  const newMessage = {
    sender: req.user?._id,
    content: content,
    chat: chatId,
  };

  try {
    let message: Document<IMessage> = await Message.create(newMessage);

    await message.populate("sender", "name email");
    await message.populate("chat");
    message = await User.populate(message, {
        path: "chat.users",
        select: "name email",
      });
  

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);

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

module.exports = { allMessages, sendMessage };
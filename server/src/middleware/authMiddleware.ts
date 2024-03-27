
import jwt from "jsonwebtoken";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express"


interface JwtPayload {
  id: string
}

export const protect = asyncHandler(async (req: Request , res: Response, next: NextFunction ) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        // Decodes token id
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '') as JwtPayload;
  
        req.user = await User.findById(decoded.id).select("-password");
  
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });
  
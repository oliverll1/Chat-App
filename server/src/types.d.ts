import { Document } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      user?: Document
    }
  }
}
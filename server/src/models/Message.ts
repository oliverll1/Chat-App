import {
    Schema,
    model,
    Document
} from 'mongoose';


export interface IMessage extends Document {
    sender: string;
    content: string;
    chat: string;
    readBy: string[];
}

const messageSchema = new Schema(
  {
    sender: { 
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: { 
        type: String, 
        trim: true 
    },
    chat: { 
        type: Schema.Types.ObjectId,
        ref: "Chat" 
    },
    readBy: [{ type: Schema.Types.ObjectId, 
        ref: "User" 
    }],
  },
  { timestamps: true }
);


export default model<IMessage>('Message', messageSchema);

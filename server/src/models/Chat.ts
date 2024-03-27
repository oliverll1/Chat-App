import {
    Schema,
    model,
    Document
} from 'mongoose';


export interface IChat extends Document {
    chatName: string;
    isGroupChat: boolean;
    users: string[];
    latestMessage: string;
    groupAdmin: string;
}

const chatSchema = new Schema({
        chatName: {
            type: String,
            trim: true
        },
        // isGroupChat: {
        //     type: Boolean,
        //     default: false
        // },
        users: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
        // groupAdmin: {
        //     type: Schema.Types.ObjectId,
        //     ref: "User"
        // }
}, { timestamps: true });

export default model<IChat>('Chat', chatSchema);

import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
    username:{
        type: String,
        required:true,
        min: 3,
        lowercase:true
    },
    email:{
        type: String,
        unique: true,
        required:true,
        lowercase:true
    },
    password: {
        type: String,
        required:true,
    },
    image:{
        type: String,
        default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    }
});

userSchema.pre('save', async function (next) {
    if( !this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next()
  })


userSchema.methods.validatePassword = async function (password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);

import { Schema, model, Document } from "mongoose";

export interface User extends Document{
    eMail: string;
    password: string;
    safePercentage: number;
};

const userSchema = new Schema<User>(
    {
        eMail:  {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            private: true
        },
        safePercentage: {
            type: Number,
            required: true
        }
    }
);

const userModel = model("User", userSchema);

export default userModel;
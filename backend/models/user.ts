import mongoose from "mongoose";

export interface User extends mongoose.Document {
    email: string;
    password: string;
    role: string;
    skills: string[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model<User>("User", userSchema);

export default User;
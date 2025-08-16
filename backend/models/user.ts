import mongoose from "mongoose";

export interface IUSER extends mongoose.Document {
    _id: mongoose.Types.ObjectId;

    email: string;
    password: string;
    role: string;
    skills: string[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUSER>(
    {
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
    },
    { timestamps: true }
);

const User = mongoose.model<IUSER>("User", userSchema);

export default User;

import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for the Ticket document
export interface ITicket extends Document {
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    createdBy: Types.ObjectId;
    assignedTo: Types.ObjectId | null;
    priority: "LOW" | "MEDIUM" | "HIGH";
    deadline: Date;
    helpfulNotes: string;
    relatedSkills: string[];
    createdAt: Date;
}

// Define the Ticket schema
const ticketSchema: Schema<ITicket> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["TODO", "IN_PROGRESS", "DONE"],
        default: "TODO",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    priority: {
        type: String,
        enum: ["LOW", "MEDIUM", "HIGH"],
        required: true,
    },
    deadline: { type: Date, required: true },
    helpfulNotes: String,
    relatedSkills: [String],
    createdAt: { type: Date, default: Date.now },
});

// Export the Mongoose model
export default mongoose.model<ITicket>("Ticket", ticketSchema);

import { inngest } from "../inggest/client";
import Ticket, { type ITicket } from "../models/ticket";
import { type Request, type Response } from "express";
import type { IUSER } from "../models/user";

export const createTicket = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const user = req.user as IUSER;
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    try {
        const ticket = await Ticket.create({ title, description, createdBy: user._id.toString() });
        console.log(`ticket in controller= ${ticket}`);

        if (!ticket) {
            console.error("Failed to create ticket at line 16");
            return res.status(500).json({ message: "Failed to create ticket" });
        }

        await inngest.send({
            name: "ticket/create",
            data: {
                ticketId: (ticket.id as string).toString(),
                title,
                description,
                createdBy: user._id.toString(),
            },
        });

        return res.status(201).json({
            message: "Ticket created and processing started",
            ticket,
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(500).json({ message: "Failed to create ticket" });
    }
};

export const getTickets = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUSER;
        let tickets = [];
        console.log(user);
        if (user.role !== "user") {
            tickets = await Ticket.find({})
                .populate("assignedTo", ["email", "_id"])
                .sort({ createdAt: -1 });
        } else {
            tickets = await Ticket.find({ createdBy: user._id })
                .select("title description status createdAt")
                .sort({ createdAt: -1 });
        }
        return res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching tickets", (error as Error).message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getTicket = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUSER;
        let ticket;

        if (user.role !== "user") {
            ticket = Ticket.findById(req.params.id).populate("assignedTo", ["email", "_id"]);
        } else {
            ticket = Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id,
            }).select("title description status createdAt");
        }

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        return res.status(404).json({ ticket });
    } catch (error) {
        console.error("Error fetching ticket", (error as Error).message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

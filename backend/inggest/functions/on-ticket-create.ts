import { NonRetriableError } from "inngest";
import User, { type IUSER as UserModel } from "../../models/user";
import { inngest } from "../client";
import { sendMail } from "../../libs/mailer";
import Ticket, { type ITicket } from "../../models/ticket";
import analyzeTicket from "../../libs/ai";

export const onTicketCreate = inngest.createFunction(
    { id: "on-ticket-create", retries: 2 },
    { event: "ticket/create" },
    async ({ event, step }) => {
        try {
            const { ticketId } = event.data;

            const ticket: any = await step.run("get-ticket", async () => {
                const ticket = await Ticket.findById(ticketId);
                if (!ticket) {
                    throw new NonRetriableError("Ticket not found");
                }

                return ticket;
            });

            await step.run("update-ticket-status", async () => {
                await Ticket.findByIdAndUpdate(ticket._id, { status: "TODO" });
            });

            const aiResponse = await analyzeTicket(ticket);

            const relatedSkills = await step.run("ai-processing", async () => {
                let skills = [];

                if (aiResponse) {
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        priority: !["low", "medium", "high"].includes(aiResponse.priority)
                            ? "medium"
                            : aiResponse.priority,
                        helpfulNotes: aiResponse.helpfulNotes,
                        relatedSkills: aiResponse.relatedSkills,
                        status: "IN_PROGRESS",
                    });
                    skills = aiResponse.relatedSkills;
                }
                return skills;
            });

            const moderator = (await step.run("assign-moderator", async () => {
                let user = await User.findOne({
                    role: "moderator",
                    skills: {
                        $eleMatch: {
                            $regex: relatedSkills.join("|"),
                            $options: "i",
                        },
                    },
                });

                if (!user) {
                    user = await User.findOne({ role: "admin" });

                    Ticket.findByIdAndUpdate(ticket._id, {
                        assignedTo: user?._id,
                    });
                }

                return user;
            })) as UserModel | null;

            await step.run("send-email", async () => {
                if (moderator) {
                    const ticket = await Ticket.findById(ticketId);

                    await sendMail(
                        moderator.email,
                        "ticket assigned",
                        `A new ticket is assigned to you  ${ticket?.title}`
                    );
                }
            });

            return { success: true };
        } catch (error) {
            console.error(`❌ Error in onTicketCreate function`, error);
        }
    }
);

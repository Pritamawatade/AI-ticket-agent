"use client"
import axios from "axios"
import React from "react"
import { useEffect } from "react"

function TicketPage() {
    const [tickets, setTickets] = React.useState([])
    useEffect(() => {
        const fetchTickets = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            const tickets = await response.data
            setTickets(tickets)
        }
        fetchTickets()
    }, [])
    return (
        <div>
            <h1>Ticket Page</h1>
            <div>
                <h2>All Tickets</h2>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tickets.map((ticket: any) => (
                        <li key={ticket._id} className="p-4 rounded-lg bg-gray-900 shadow-md">
                            <h3 className="text-lg font-medium">{ticket.title}</h3>
                            <p className=" ">{ticket.description}</p>
                            <div className="flex gap-4 my-2">
                                <div className="  px-2 py-1 rounded-lg">
                                    <p className=" ">Status:</p>
                                    <p className="font-medium">{ticket.status}</p>
                                </div>
                                <div className="  px-2 py-1 rounded-lg">
                                    <p className=" ">Created At:</p>
                                    <p className="font-medium">{ticket.createdAt}</p>
                                </div>
                                <div className="  px-2 py-1 rounded-lg">
                                    <p className=" ">Created By:</p>
                                    <p className="font-medium">{ticket.createdBy}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 my-2">
                                <div className="  px-2 py-1 rounded-lg">
                                    <p className=" ">Assigned To:</p>
                                    <p className="font-medium">{ticket.assignedTo}</p>
                                </div>
                                <div className="  px-2 py-1 rounded-lg">
                                    <p className=" ">Priority:</p>
                                    <p className="font-medium">{ticket.priority}</p>
                                </div>
                                <div className="  px-2 py-1 rounded-lg">
                                    <p className=" ">Deadline:</p>
                                    <p className="font-medium">{ticket.deadline}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 my-2">
                                <div className="  px-2 py-1 rounded-lg">
                                    <p className=" ">Helpful Notes:</p>
                                    <p className="font-medium">{ticket.helpfulNotes}</p>
                                </div>
                            </div>
                            {ticket.relatedSkills && (
                                <div className="flex gap-4 my-2">
                                    <div className="  px-2 py-1 rounded-lg">
                                        <p className=" ">Related Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {ticket.relatedSkills.map((skill: string) => (
                                                <div key={skill}>{skill}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TicketPage

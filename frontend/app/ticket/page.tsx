"use client"
import axios from "axios"
import React from "react"
import { useEffect } from "react"

function TicketPage() {
    const [tickets, setTickets] = React.useState([])
    useEffect(() => {
        const fetchTickets = async () => {
            console.log(process.env.NEXT_PUBLIC_SERVER_URL)
            console.log(`before fetch`)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(`after fetch`)
            const tickets = await response.data
            console.log(tickets)
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
                        <li key={ticket._id} className="p-4 rounded-lg bg-white shadow-md">
                            <h3 className="text-lg font-medium">{ticket.title}</h3>
                            <p className="text-gray-500">{ticket.description}</p>
                            <div className="flex gap-4 my-2">
                                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                    <p className="text-gray-500">Status:</p>
                                    <p className="font-medium">{ticket.status}</p>
                                </div>
                                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                    <p className="text-gray-500">Created At:</p>
                                    <p className="font-medium">{ticket.createdAt}</p>
                                </div>
                                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                    <p className="text-gray-500">Created By:</p>
                                    <p className="font-medium">{ticket.createdBy}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 my-2">
                                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                    <p className="text-gray-500">Assigned To:</p>
                                    <p className="font-medium">{ticket.assignedTo}</p>
                                </div>
                                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                    <p className="text-gray-500">Priority:</p>
                                    <p className="font-medium">{ticket.priority}</p>
                                </div>
                                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                    <p className="text-gray-500">Deadline:</p>
                                    <p className="font-medium">{ticket.deadline}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 my-2">
                                <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                    <p className="text-gray-500">Helpful Notes:</p>
                                    <p className="font-medium">{ticket.helpfulNotes}</p>
                                </div>
                            </div>
                            {ticket.relatedSkills && (
                                <div className="flex gap-4 my-2">
                                    <div className="bg-gray-200 px-2 py-1 rounded-lg">
                                        <p className="text-gray-500">Related Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {ticket.relatedSkills.map((skill: string) => (
                                                <div>{skill}</div>
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

"use client"
import CheckAuth from "@/components/CheckAuth"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { FormEvent, useState } from "react"

export default function CreateTicketPage() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description })
        })
    }
    return (
        <CheckAuth protectedRoute={true}>
            <Card>
                <CardHeader>Create a ticket</CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <CardAction>
                            <Button type="submit">Create</Button>
                        </CardAction>
                    </form>
                </CardContent>
            </Card>
        </CheckAuth>
    )
}

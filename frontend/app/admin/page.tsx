"use client"
import CheckAuth from "@/components/CheckAuth"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { LoaderOne } from "@/components/ui/loader"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
function AdminPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        // This will only run on the client side
        setToken(localStorage.getItem("token"))
    }, [])

    const fetchUsers = async () => {
        if (!token) return

        setLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (res.status === 200) {
                setUsers(res.data.users)
            }
        } catch (error) {
            console.error("Error fetching users:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (token) {
            fetchUsers()
        } else {
            setLoading(false)
        }
    }, [token])
    return (
        <CheckAuth protectedRoute={true}>
            <div className="flex items-center min-h-screen justify-center p-4">
                {loading ? (
                    <LoaderOne />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {users.map((user: any) => (
                            <Card key={user._id} className="w-full">
                                <CardHeader>
                                    <CardTitle>{user.email} </CardTitle>
                                    <CardDescription>{user.role}</CardDescription>
                                    <CardAction>
                                        <Button variant="link">Edit</Button>
                                    </CardAction>
                                </CardHeader>
                                <CardContent>
                                    <p>{user.skills.join(", ")}</p>
                                </CardContent>
                                <CardFooter className="flex-col gap-2">
                                    <Button type="submit" className="w-full">
                                        Delete
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Edit
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </CheckAuth>
    )
}

export default AdminPage

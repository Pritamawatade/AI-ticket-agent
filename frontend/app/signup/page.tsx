"use client"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

export default function signup() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const signup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`, form)

            if (res.status === 200) {
                const { user, token } = res.data

                localStorage.setItem("token", token)
                navigate.push("/")
            } else {
                setLoading(false)
                alert(res.data.error)
            }
        } catch (error: any) {
            console.log(`something went wrong at signupd ${error}`)
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center min-h-screen justify-center p-4">
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle>signup to your account</CardTitle>
                    <CardDescription>Enter your email below to signup to your account</CardDescription>
                    <CardAction>
                        <Button variant="link" disabled={loading}>
                            Login
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={signup}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={handleChange}
                                    value={form.email}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Already have an account?
                                    </a>
                                </div>
                                <Input
                                    onChange={handleChange}
                                    value={form.password}
                                    id="password"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                        signup
                    </Button>
                    <Button variant="outline" className="w-full">
                        signup with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

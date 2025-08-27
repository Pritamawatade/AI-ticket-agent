"use client"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, form)

            if (res.status === 200) {
                const { user, token } = res.data

                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                navigate.push("/")
            } else {
                setLoading(false)
                alert(res.data.error)
            }
        } catch (error: any) {
            console.log(`something went wrong at logind ${error}`)
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center min-h-screen justify-center p-4">
            <Card className="w-full max-w-sm ">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link href={"/signup"}>Signup</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={login}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={form.email}
                                    onChange={handleChange}
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
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-8" disabled={loading}>
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-[-11px]">
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

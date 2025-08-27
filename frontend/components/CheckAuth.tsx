import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LoaderOne } from "./ui/loader"

export default function CheckAuth({ children, protectedRoute = true }: { children: any; protectedRoute?: boolean }) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (protectedRoute && !token) {
            router.push("/login")
        } else if (!protectedRoute && token) {
            router.push("/")
        }
        setIsLoading(false)
    }, [router, protectedRoute])

    return isLoading ? (
        <div>
            <LoaderOne />
        </div>
    ) : (
        <>{children}</>
    )
}

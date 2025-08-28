import React from "react"
import CreateTicketPage from "./createticket/page"
import TicketPage from "./ticket/page"

function page() {
    return (
        <div>
            <CreateTicketPage />

            <TicketPage />
        </div>
    )
}

export default page

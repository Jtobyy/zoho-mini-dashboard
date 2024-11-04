import axios from 'axios';

export async function POST(req) {
    const newTicketData = await req.json();

    const ticketPayload = {
        data: [
            {
                Owner: { id: process.env.ZOHO_OWNER_ID || "default-user-id" },
                Who_Id: { id: process.env.ZOHO_CONTACT_ID || "default-contact-id" },
                What_Id: { id: process.env.ZOHO_RECORD_ID || "default-record-id" },
                $se_module: process.env.ZOHO_RECORD_MODULE || "default-module",
                Status: newTicketData.status || "In Progress",
                Send_Notification_Email: true,
                Description: newTicketData.description || "No description provided.",
                Due_Date: newTicketData.due_date || "2024-12-31",
                Priority: newTicketData.priority || "Low",
                send_notification: true,
                Subject: newTicketData.subject || "Untitled Ticket",
                Remind_At: {
                    ALARM: "FREQ=NONE;ACTION=EMAIL;TRIGGER=DATE-TIME:2024-12-31T17:09:00+05:30",
                },
            },
        ],
    };

    try {
        const response = await axios.post('https://www.zohoapis.com/crm/v2/Tasks', ticketPayload, {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
                "Content-Type": "application/json",
            },
        });
        
        return new Response(JSON.stringify(response.data), { status: 201 });
    } catch (error) {
        console.error("Error adding ticket:", error);
        return new Response(JSON.stringify({ message: "Failed to add ticket" }), { status: 500 });
    }
}

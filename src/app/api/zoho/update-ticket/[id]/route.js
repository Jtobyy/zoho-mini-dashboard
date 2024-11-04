import axios from 'axios';

export async function PUT(req, { params }) {
    const { id } = params;
    const updatedData = await req.json();

    // Define default values based on Zoho's sample body structure
    const data = {
        Owner: {
            id: updatedData.Owner?.id || "{{user-id}}",
        },
        Who_Id: {
            id: updatedData.Who_Id?.id || "{{contact-id}}",
        },
        What_Id: {
            id: updatedData.What_Id?.id || "{{record-id}}",
        },
        $se_module: updatedData.$se_module || "{{record-module}}",
        Status: updatedData.Status || "In Progress",
        Send_Notification_Email: updatedData.Send_Notification_Email !== undefined ? updatedData.Send_Notification_Email : true,
        Description: updatedData.Description || "Design your own layouts that align your business processes precisely. Assign them to profiles appropriately.",
        Due_Date: updatedData.Due_Date || "2018-01-25",
        Priority: updatedData.Priority || "Low",
        send_notification: updatedData.send_notification !== undefined ? updatedData.send_notification : true,
        Subject: updatedData.Subject || "Subject",
        Remind_At: updatedData.Remind_At || { ALARM: "FREQ=NONE;ACTION=EMAIL;TRIGGER=DATE-TIME:2018-01-25T17:09:00+05:30" },
    };

    try {
        const response = await axios.put(
            `https://www.zohoapis.com/crm/v2/Tasks/${id}`,
            { data: [data] },
            {
                headers: {
                    Authorization: process.env.ZOHO_AUTH_TOKEN,
                    "Content-Type": "application/json",
                },
            }
        );
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error updating ticket:', error.response?.data || error.message);
        return new Response(JSON.stringify({ message: "Failed to update ticket" }), { status: 500 });
    }
}

import axios from 'axios';

export async function DELETE(req, { params }) {
    const { id } = params;
    try {
        await axios.delete(`https://www.zohoapis.com/crm/v2/Tasks/${id}`, {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
                "Content-Type": "application/json",
            },
        });
        return new Response(null, { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to delete ticket" }), { status: 500 });
    }
}

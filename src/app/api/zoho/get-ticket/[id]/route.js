import axios from 'axios';

export async function GET(req, { params }) {
    const { id } = params;
    try {
        const response = await axios.get(`https://www.zohoapis.com/crm/v2/Tasks/${id}`, {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
                "Content-Type": "application/json",
            },
        });
        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch ticket" }), { status: 500 });
    }
}

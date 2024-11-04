// app/api/zoho/get-lead/route.js
import axios from 'axios';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('ids');

    if (!id) {
        return new Response(JSON.stringify({ message: "Lead ID is required" }), { status: 400 });
    }

    try {
        const response = await axios.get(`https://www.zohoapis.com/crm/v2/Leads?ids=${id}`, {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
                'Content-Type': 'application/json',
            },
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("Error fetching lead:", error);
        return new Response(JSON.stringify({ message: 'Failed to fetch lead' }), { status: 500 });
    }
}

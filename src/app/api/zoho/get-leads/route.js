// app/api/zoho/get-leads/route.js
import axios from 'axios';

export async function GET(request) {
    try {
        const response = await axios.get('https://www.zohoapis.com/crm/v2/Leads', {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
            },
        });

        // Extract the leads data from the response
        const leads = response.data.data;
        return new Response(JSON.stringify(leads), { status: 200 });
    } catch (error) {
        console.error('Error fetching leads from Zoho:', error.response?.data || error.message);
        return new Response(JSON.stringify({ message: 'Failed to fetch leads' }), { status: 500 });
    }
}

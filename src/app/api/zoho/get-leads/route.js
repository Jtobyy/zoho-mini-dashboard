// app/api/zoho/get-leads/route.js
import axios from 'axios';

export async function GET(request) {
    try {
        const response = await axios.get('https://www.zohoapis.com/crm/v2/Leads', {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.66b2c60ed8572e2254ec970bfd9d8494.4e1a3d765ce6e41d808e1cea34200314`,
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

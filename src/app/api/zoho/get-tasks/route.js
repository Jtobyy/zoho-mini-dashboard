import axios from 'axios';

export async function GET(request) {
    try {
        const response = await axios.get('https://www.zohoapis.com/crm/v2/Tasks', {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
            },
        });

        const tasks = response.data.data;
        return new Response(JSON.stringify(tasks), { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks from Zoho:', error.response?.data || error.message);
        return new Response(JSON.stringify({ message: 'Failed to fetch tasks' }), { status: 500 });
    }
}

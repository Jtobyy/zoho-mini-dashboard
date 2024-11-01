// app/api/zoho/get-tasks/route.js
import axios from 'axios';

export async function GET(request) {
    try {
        // Replace 'YOUR_ACCESS_TOKEN' with the actual Zoho access token
        const response = await axios.get('https://www.zohoapis.com/crm/v2/Tasks', {
            headers: {
                Authorization: `Zoho-oauthtoken 1000.66b2c60ed8572e2254ec970bfd9d8494.4e1a3d765ce6e41d808e1cea34200314`,
            },
        });

        // Extract the tasks (tickets) data from the response
        const tasks = response.data.data;
        return new Response(JSON.stringify(tasks), { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks from Zoho:', error.response?.data || error.message);
        return new Response(JSON.stringify({ message: 'Failed to fetch tasks' }), { status: 500 });
    }
}

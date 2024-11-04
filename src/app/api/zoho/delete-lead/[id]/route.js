import axios from 'axios';

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const response = await axios.delete(`https://www.zohoapis.com/crm/v2/Leads/${id}`, {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
                'Content-Type': 'application/json',
            },
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error deleting lead:', error);
        return new Response(JSON.stringify({ message: 'Failed to delete lead' }), { status: 500 });
    }
}

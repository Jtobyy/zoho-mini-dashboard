// app/api/zoho/update-lead/[id]/route.js
import axios from 'axios';

export async function PUT(request, { params }) {
    const { id } = params;
    const leadData = await request.json();

    const data = {
        data: [
            {
                Owner: {
                    id: process.env.USER_ID,
                },
                Last_Name: leadData.Last_Name || "Doe",
                First_Name: leadData.First_Name || "John",
                Email: leadData.Email || "newcrmapi@zoho.com",
                Description: leadData.description || "New lead added via API",
                Rating: leadData.rating || "Acquired",
                Website: leadData.website || "crm.zoho.com",
                Twitter: leadData.twitter || "Twitter",
                Salutation: leadData.salutation || "Mr.",
                Lead_Status: leadData.Lead_Status || "Attempted to Contact",
                Industry: leadData.industry || "ASP",
                Skype_ID: leadData.skypeId || "Skype_ID",
                Phone: leadData.phone || "98883434559",
                Street: leadData.street || "Street",
                Zip_Code: leadData.zipCode || "Zip_Code",
                Email_Opt_Out: leadData.emailOptOut || false,
                Designation: leadData.designation || "Designation",
                City: leadData.city || "City",
                No_of_Employees: leadData.noOfEmployees || 1791,
                Mobile: leadData.mobile || "98883434559",
                State: leadData.state || "State",
                Lead_Source: leadData.leadSource || "Advertisement",
                Country: leadData.country || "Country",
                Fax: leadData.fax || "Fax",
                Annual_Revenue: leadData.annualRevenue || 136.67,
                Secondary_Email: leadData.secondaryEmail || "newcrmapi@zoho.com"
            },
        ],
    };

    try {
        const response = await axios.put(
            `https://www.zohoapis.com/crm/v2/Leads/${id}`,
            data,
            {
                headers: {
                    Authorization: process.env.ZOHO_AUTH_TOKEN,
                    "Content-Type": "application/json",
                },
            }
        );

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error('Error updating lead:', error.response?.data || error.message);
        return new Response(JSON.stringify({ message: 'Failed to update lead' }), { status: 500 });
    }
}

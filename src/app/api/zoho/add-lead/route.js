// app/api/zoho/add-lead/route.js
import axios from 'axios';

export async function POST(request) {
    try {
        const leadData = await request.json();

        const data = {
            data: [
                {
                    Owner: {
                        id: process.env.USER_ID,
                    },
                    Last_Name: leadData.lastName || "Doe",
                    First_Name: leadData.firstName || "John",
                    Email: leadData.email || "newcrmapi@zoho.com",
                    Description: leadData.description || "New lead added via API",
                    Rating: leadData.rating || "Acquired",
                    Website: leadData.website || "crm.zoho.com",
                    Twitter: leadData.twitter || "Twitter",
                    Salutation: leadData.salutation || "Mr.",
                    Lead_Status: leadData.leadStatus || "Attempted to Contact",
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

        const response = await axios.post('https://www.zohoapis.com/crm/v2/Leads', data, {
            headers: {
                Authorization: process.env.ZOHO_AUTH_TOKEN,
                "Content-Type": "application/json",
            },
        });

        // Return 201 status if creation is successful
        if (response.status === 201) {
            return new Response(JSON.stringify(response.data), { status: 201 });
        } else {
            console.error('Unexpected status code from Zoho:', response.status);
            return new Response(JSON.stringify({ message: 'Unexpected response status' }), { status: 500 });
        }
    } catch (error) {
        console.error('Error adding lead to Zoho:', error.response?.data || error.message);
        return new Response(JSON.stringify({ message: 'Failed to add lead' }), { status: 500 });
    }
}

"use client"
// components/LeadList.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LeadList() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get('/api/zoho/get-leads');
                setLeads(response.data);
            } catch (error) {
                console.error('Error fetching leads:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    if (loading) return <p>Loading leads...</p>;

    return (
        <ul>
            {leads.map((lead) => (
                <li key={lead.id}>
                    <strong>{lead.Full_Name}</strong> - {lead.Email} - {lead.Lead_Status}
                </li>
            ))}
        </ul>
    );
}


"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('/api/zoho/get-tasks');
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    if (loading) return <p>Loading tickets...</p>;

    return (
        <ul>
            {tickets.map((ticket) => (
                <li key={ticket.id}>
                    <strong>{ticket.Subject}</strong> - {ticket.Status} - {ticket.Due_Date}
                </li>
            ))}
        </ul>
    );
}

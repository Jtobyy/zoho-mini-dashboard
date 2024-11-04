"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function TicketList() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(null);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/zoho/delete-ticket/${id}`);
            setTickets(tickets.filter(ticket => ticket.id !== id));
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    if (loading) return <p>Loading tickets...</p>;

    return (
        <div style={styles.listContainer}>
            <ul style={styles.list}>
                {tickets.map((ticket) => (
                    <li key={ticket.id} style={styles.item}>
                        <div style={styles.ticketInfo}>
                            <strong>{ticket.Subject}</strong> - {ticket.Status} - {ticket.Due_Date}
                        </div>
                        <button
                            onClick={() => setMenuOpen(menuOpen === ticket.id ? null : ticket.id)}
                            style={styles.dotButton}
                        >
                            •••
                        </button>
                        {menuOpen === ticket.id && (
                            <div style={styles.menu}>
                                <Link href={`/tickets/${ticket.id}`}>
                                    <button style={styles.menuButton}>Update</button>
                                </Link>
                                <button style={styles.menuButton} onClick={() => handleDelete(ticket.id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
const styles = {
    listContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    list: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #eaeaea',
        position: 'relative',
    },
    ticketInfo: {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    dotButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#3182CE',
    },
    menu: {
        position: 'absolute',
        right: '10px',
        top: '40px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
    },
    menuButton: {
        padding: '10px 16px',
        color: '#333',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        textAlign: 'left',
        border: 'none',
        display: 'block',
    },
};

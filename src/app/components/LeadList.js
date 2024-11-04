"use client";

// components/LeadList.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function LeadList() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(null);
    const [deleting, setDeleting] = useState(null);

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

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this lead?");
        if (!confirmDelete) return;

        setDeleting(id);
        try {
            await axios.delete(`/api/zoho/delete-lead/${id}`);
            setLeads(leads.filter(lead => lead.id !== id));
        } catch (error) {
            console.error('Error deleting lead:', error);
        } finally {
            setDeleting(null);
        }
    };

    if (loading) return <p>Loading leads...</p>;

    return (
        <div style={styles.listContainer}>
            <ul style={styles.list}>
                {leads.map((lead) => (
                    <li key={lead.id} style={styles.item}>
                        <div style={styles.leadInfo}>
                            <strong>{lead.Full_Name}</strong> - {lead.Email} - {lead.Lead_Status}
                        </div>
                        <button
                            onClick={() => setMenuOpen(menuOpen === lead.id ? null : lead.id)}
                            style={styles.dotButton}
                        >
                            •••
                        </button>
                        {menuOpen === lead.id && (
                            <div style={styles.menu}>
                                <Link href={`/leads/${lead.id}`}>
                                    <button style={styles.menuButton}>Update</button>
                                </Link>
                                <button
                                    style={styles.menuButton}
                                    onClick={() => handleDelete(lead.id)}
                                    disabled={deleting === lead.id}
                                >
                                    {deleting === lead.id ? "Deleting..." : "Delete"}
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
        width: '100%',
        maxWidth: '600px',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #eaeaea',
        position: 'relative',
    },
    leadInfo: {
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
        width: '100%',
    },
};

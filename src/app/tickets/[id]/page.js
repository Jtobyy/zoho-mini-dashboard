"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

export default function TicketUpdatePage() {
    const { id } = useParams();
    const router = useRouter();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`/api/zoho/get-ticket/${id}`);
                setTicket(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching ticket:', error);
                setError("Failed to fetch ticket details.");
            } finally {
                setLoading(false);
            }
        };
        fetchTicket();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await axios.put(`/api/zoho/update-ticket/${id}`, ticket);
            setSuccess("Ticket updated successfully!");
        } catch (error) {
            console.error("Error updating ticket:", error);
            setError("Failed to update ticket.");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`/api/zoho/delete-ticket/${id}`);
            setSuccess("Ticket deleted successfully!");
            router.push('/tickets');
        } catch (error) {
            console.error("Error deleting ticket:", error);
            setError("Failed to delete ticket.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <p>Loading ticket details...</p>;

    return (
        <div style={styles.container}>
            <h1>Update Ticket</h1>
            {success && <p style={styles.success}>{success}</p>}
            {error && <p style={styles.error}>{error}</p>}
            {ticket && (
                <form onSubmit={handleUpdate} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={ticket.Subject || ''}
                        onChange={(e) => setTicket({ ...ticket, Subject: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Status"
                        value={ticket.Status || ''}
                        onChange={(e) => setTicket({ ...ticket, Status: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Priority"
                        value={ticket.Priority || ''}
                        onChange={(e) => setTicket({ ...ticket, Priority: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="date"
                        placeholder="Due Date"
                        value={ticket.Due_Date || ''}
                        onChange={(e) => setTicket({ ...ticket, Due_Date: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={ticket.Description || ''}
                        onChange={(e) => setTicket({ ...ticket, Description: e.target.value })}
                        style={styles.textarea}
                    />
                    <input
                        type="text"
                        placeholder="Who ID (Contact)"
                        value={ticket.Who_Id?.id || ''}
                        onChange={(e) => setTicket({ ...ticket, Who_Id: { id: e.target.value } })}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="What ID (Related Record)"
                        value={ticket.What_Id?.id || ''}
                        onChange={(e) => setTicket({ ...ticket, What_Id: { id: e.target.value } })}
                        style={styles.input}
                    />
                    <button type="submit" style={{ ...styles.button, ...(updating ? styles.buttonLoading : {}) }} disabled={updating}>
                        {updating ? "Updating..." : "Update Ticket"}
                    </button>
                    <button type="button" onClick={handleDelete} style={{ ...styles.deleteButton, ...(deleting ? styles.buttonLoading : {}) }} disabled={deleting}>
                        {deleting ? "Deleting..." : "Delete Ticket"}
                    </button>
                </form>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '700px',
        minWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
    },
    textarea: {
        padding: '10px',
        fontSize: '16px',
        height: '100px',
        resize: 'vertical',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#3182CE',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease',
    },
    deleteButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#E53E3E',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease',
    },
    buttonLoading: {
        opacity: 0.6,
        cursor: 'not-allowed',
    },
    success: {
        color: 'green',
    },
    error: {
        color: 'red',
    },
};

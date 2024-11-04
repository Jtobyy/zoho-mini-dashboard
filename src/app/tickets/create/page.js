"use client";

import { useState } from 'react';
import axios from 'axios';

export default function AddTicketPage() {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const newTicket = { subject, description, priority, status };
            const response = await axios.post('/api/zoho/add-ticket', newTicket);

            if (response.status === 201) {
                setSuccess("Ticket added successfully!");
                setSubject('');
                setDescription('');
                setPriority('');
                setStatus('');
            } else {
                setError("Unexpected response status. Please try again.");
            }
        } catch (error) {
            console.error("Error adding ticket:", error);
            setError("Failed to add ticket. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Add New Ticket</h1>
            {success && <p style={styles.success}>{success}</p>}
            {error && <p style={styles.error}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    style={styles.input}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={styles.textarea}
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                    style={styles.select}
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    style={styles.select}
                >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Adding Ticket...' : 'Add Ticket'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        maxWidth: '500px',
        minWidth: '400px',
        margin: '0 auto',
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
        resize: 'vertical',
        minHeight: '80px',
    },
    select: {
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#3182CE',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    success: {
        color: 'green',
    },
    error: {
        color: 'red',
    },
};

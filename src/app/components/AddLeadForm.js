"use client";

import { useState } from 'react';
import axios from 'axios';

export default function AddLeadForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
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
            const newLead = { firstName, lastName, email, status };

            const response = await axios.post('/api/zoho/add-lead', newLead);
            if (response.status === 201) {
                setSuccess("Lead added successfully!");
                setFirstName('');
                setLastName('');
                setEmail('');
                setStatus('');
            } else {
                setError("Unexpected response status. Please try again.");
            }
        } catch (error) {
            console.error("Error adding lead:", error);
            setError("Failed to add lead. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
            <button
                type="submit"
                disabled={loading}
                style={{
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.3s ease',
                }}
            >
                {loading ? 'Adding Lead...' : 'Add Lead'}
            </button>

            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

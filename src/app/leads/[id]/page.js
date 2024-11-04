"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function LeadUpdatePage() {
    const { id } = useParams();
    const router = useRouter();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await axios.get(`/api/zoho/get-lead?ids=${id}`);
                if (response.data.data && response.data.data.length > 0) {
                    setLead(response.data.data[0]);
                } else {
                    setError("Lead not found");
                }
            } catch (error) {
                console.error('Error fetching lead:', error);
                setError("Failed to fetch lead details.");
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);
        setSuccess(null);
        try {
            await axios.put(`/api/zoho/update-lead/${id}`, lead);
            setSuccess("Lead updated successfully!");
        } catch (error) {
            console.error("Error updating lead:", error);
            setError("Failed to update lead.");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`/api/zoho/delete-lead/${id}`);
            setSuccess("Lead deleted successfully!");
            router.push('/leads'); // Redirect to leads page after deletion
        } catch (error) {
            console.error("Error deleting lead:", error);
            setError("Failed to delete lead.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <p>Loading lead details...</p>;

    return (
        <div style={styles.container}>
            <h1>Update Lead</h1>
            {success && <p style={styles.success}>{success}</p>}
            {error && <p style={styles.error}>{error}</p>}
            {lead && (
                <form onSubmit={handleUpdate} style={styles.form}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={lead.First_Name || ''}
                        onChange={(e) => setLead({ ...lead, First_Name: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lead.Last_Name || ''}
                        onChange={(e) => setLead({ ...lead, Last_Name: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={lead.Email || ''}
                        onChange={(e) => setLead({ ...lead, Email: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Lead Status"
                        value={lead.Lead_Status || ''}
                        onChange={(e) => setLead({ ...lead, Lead_Status: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            ...(updating ? styles.buttonLoading : {}),
                        }}
                        disabled={updating}
                    >
                        {updating ? "Updating..." : "Update Lead"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        style={{
                            ...styles.deleteButton,
                            ...(deleting ? styles.buttonLoading : {}),
                        }}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete Lead"}
                    </button>
                </form>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '500px',
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

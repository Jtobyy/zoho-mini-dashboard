import Link from 'next/link';

export default function Dashboard() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Zoho Mini Dashboard</h1>
                <p style={styles.subtitle}>
                    Manage your leads and support tickets efficiently.
                </p>
            </header>

            <main style={styles.main}>
                <section style={styles.cardContainer}>
                    <div style={styles.card}>
                        <h2>Leads</h2>
                        <p>Manage customer and lead information from Zoho CRM.</p>
                        <div style={styles.buttonGroup}>
                            <Link href="/leads">
                                <button style={styles.button}>View Leads</button>
                            </Link>
                            <Link href="/leads/create">
                                <button style={styles.button}>Add Lead</button>
                            </Link>
                        </div>
                    </div>

                    <div style={styles.card}>
                        <h2>Tickets</h2>
                        <p>Handle support tickets to streamline customer support.</p>
                        <div style={styles.buttonGroup}>
                            <Link href="/tickets">
                                <button style={styles.button}>View Tickets</button>
                            </Link>
                            <Link href="/tickets/create">
                                <button style={styles.button}>Add Ticket</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
        position: 'relative',
        height: '100vh',
    },
    header: {
        marginBottom: '40px',
    },
    title: {
        fontSize: '2.5rem',
        color: '#2D3748',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#4A5568',
    },
    main: {
        display: 'flex',
        justifyContent: 'center',
    },
    cardContainer: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    card: {
        width: '300px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        backgroundColor: '#F7FAFC',
    },
    buttonGroup: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        backgroundColor: '#3182CE',
        color: '#FFFFFF',
        border: 'none',
        cursor: 'pointer',
    },
};

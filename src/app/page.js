import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Zoho Mini Dashboard</h1>
            <nav>
                <Link href="/leads">View Recent Leads</Link><br />
                <Link href="/tickets">View Open Tickets</Link><br />
                <Link href="/leads/create">Add New Lead</Link>
            </nav>
        </div>
    );
}

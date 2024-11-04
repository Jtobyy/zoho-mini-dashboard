import TicketList from '../components/TicketList';
import Link from 'next/link';

export default function Tickets() {
    return (
        <div>
            <h2>Open Tickets</h2>
            <button style={{marginTop: '100px',}}>
                <Link href="/tickets/create">Add New Ticket</Link>
            </button>
            <TicketList />
        </div>
    );
}

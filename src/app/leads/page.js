import LeadList from '../components/LeadList';
import Link from 'next/link';

export default function Leads() {
    return (
        <div>
            <h2>Recent Leads</h2>
            <button style={{marginTop: '100px',}}>
                <Link href="/leads/create">Add New Lead</Link>
            </button>
            <LeadList />
        </div>
    );
}

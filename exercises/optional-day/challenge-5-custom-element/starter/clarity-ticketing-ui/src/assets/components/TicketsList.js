import React, {useEffect, useState} from 'react';
import '../style.css';
import Ticket from './Ticket';

function TicketsList() {
	const [tickets, setTickets] = useState([]);
	const [activeTab, setActiveTab] = useState('all');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// TODO: fetch GET /o/c/tickets?pageSize=20 using Liferay.authToken as a
		// Bearer token. On success, call setTickets(data.items || []) and
		// setLoading(false). On error, call setError(err.message) and
		// setLoading(false).
		setLoading(false);
	}, []);

	const filteredTickets =
		activeTab === 'all'
			? tickets
			: tickets.filter((t) => t.ticketStatus?.key === activeTab);

	const tabs = [
		{key: 'all', label: 'All'},
		{key: 'open', label: 'Open'},
		{key: 'inProgress', label: 'In Progress'},
		{key: 'closed', label: 'Closed'},
	];

	if (loading) {
		return <div className="loading">Loading tickets...</div>;
	}

	if (error) {
		return <div className="error">Error: {error}</div>;
	}

	return (
		<div className="tickets-container">
			<div className="tabs">
				{tabs.map((tab) => (
					<button
						className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<div className="tickets-list">
				{filteredTickets.length === 0 ? (
					<div className="no-tickets">No tickets found.</div>
				) : (
					filteredTickets.map((ticket) => (
						<Ticket key={ticket.id} ticket={ticket} />
					))
				)}
			</div>
		</div>
	);
}

export default TicketsList;

import React, {useEffect, useState} from 'react';
import '../style.css';
import Ticket from './Ticket';

function TicketsList() {
	const [tickets, setTickets] = useState([]);
	const [activeTab, setActiveTab] = useState('all');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// TODO: Fetch GET /o/c/tickets?pageSize=20 and store the response items in
		// state. Important: include the X-CSRF-Token header set to
		// Liferay.authToken — Liferay requires it to authenticate same-origin
		// session requests to the headless API. Check response.ok before calling
		// response.json() to handle HTTP errors gracefully. On success, call
		// setTickets(data.items || []) and setLoading(false). On error, call
		// setError(err.message) and setLoading(false).
		setLoading(false); // remove this line when you implement the fetch
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
			<h3 className="tickets-title">Clarity Tickets</h3>

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
					<div className="no-tickets">
						{tickets.length === 0
							? 'No tickets loaded yet. Complete the TODO in TicketsList.js.'
							: 'No tickets in this category.'}
					</div>
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

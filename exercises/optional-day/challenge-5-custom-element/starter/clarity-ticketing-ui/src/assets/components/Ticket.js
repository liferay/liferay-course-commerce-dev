import React, {useState} from 'react';

const Ticket = ({ticket}) => {
	const [expanded, setExpanded] = useState(false);
	const {description, priority, subject, ticketStatus} = ticket;

	return (
		<div className="ticket-card" onClick={() => setExpanded(!expanded)}>
			<div className="ticket-header">
				<h3 className="ticket-subject">{subject}</h3>

				<span className={`ticket-status ${priority?.key || ''}`}>
					{priority?.name || '—'}
				</span>
			</div>

			{expanded && (
				<div className="ticket-details">
					<p>{description}</p>

					<p>
						<strong>Status:</strong> {ticketStatus?.name}
					</p>
				</div>
			)}
		</div>
	);
};

export default Ticket;

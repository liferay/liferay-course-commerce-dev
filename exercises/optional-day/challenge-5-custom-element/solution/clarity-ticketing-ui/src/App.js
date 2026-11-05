import React from 'react';
import TicketsList from './assets/components/TicketsList';

function App({title}) {
	return (
		<div className="App">
			{title && <h2 style={{textAlign: 'center'}}>{title}</h2>}

			<TicketsList />
		</div>
	);
}

export default App;

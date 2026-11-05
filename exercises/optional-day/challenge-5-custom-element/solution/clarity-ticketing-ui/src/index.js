import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class ClarityTicketingUI extends HTMLElement {
	connectedCallback() {
		const title = this.getAttribute('title') || 'Clarity Tickets';
		ReactDOM.render(<App title={title} />, this);
	}

	disconnectedCallback() {
		ReactDOM.unmountComponentAtNode(this);
	}
}

if (!customElements.get('clarity-ticketing-ui')) {
	customElements.define('clarity-ticketing-ui', ClarityTicketingUI);
}

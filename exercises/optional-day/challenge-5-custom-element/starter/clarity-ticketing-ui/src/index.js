import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class ClarityTicketingUI extends HTMLElement {
	connectedCallback() {
		ReactDOM.render(<App />, this);
	}

	disconnectedCallback() {
		ReactDOM.unmountComponentAtNode(this);
	}
}

if (!customElements.get('clarity-ticketing-ui')) {
	customElements.define('clarity-ticketing-ui', ClarityTicketingUI);
}

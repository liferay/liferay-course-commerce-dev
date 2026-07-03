import React from 'react';
import {createRoot} from 'react-dom/client';
import CheckoutStepApp from './components/CheckoutStepApp';

export default function CommerceCheckoutStep() {
    const containerId =
        '_com_liferay_commerce_checkout_web_internal_portlet_' +
        'CommerceCheckoutPortlet_commerceCheckoutStepContainer';

    const container = document.getElementById(containerId);

    if (container) {
        container.innerHTML = '';

        const mountPoint = document.createElement('div');
        container.appendChild(mountPoint);

        createRoot(mountPoint).render(<CheckoutStepApp />);
    }
    else {
        console.error(
            'Clarity Checkout Step Error: Liferay container not found on the page.'
        );
    }
}
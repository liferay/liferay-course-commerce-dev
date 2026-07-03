export default function CommerceCheckoutStep() {
    const containerId = '_com_liferay_commerce_checkout_web_internal_portlet_CommerceCheckoutPortlet_commerceCheckoutStepContainer';
    const container = document.getElementById(containerId);

    if (container) {
        container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'clarity-b2b-po-checkout-step p-4 bg-light rounded border';

        wrapper.innerHTML = `
            <h3 class="text-dark">REPLACE FORM NAME HERE</h3>
            <p class="text-secondary">
                REPLACE DESCRIPTION HERE
            </p>
            
            <div class="form-group mt-4">
                <label for="poNumber">REPLACE FIELD NAME HERE</label>
                <input 
                    id="poNumber"
                    class="form-control"
                    name="_com_liferay_commerce_checkout_web_internal_portlet_CommerceCheckoutPortlet_poNumber"
                    placeholder="e.g., PO-998877"
                    type="text"
                />
            </div>
        `;

        container.appendChild(wrapper);
    } else {
        console.error("Clarity Checkout Step Error: Liferay container not found on the page.");
    }
}
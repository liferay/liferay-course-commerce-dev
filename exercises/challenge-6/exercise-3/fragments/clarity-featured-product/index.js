// ─────────────────────────────────────────────────────────────────────────────
// Clarity Featured Product — Fragment JavaScript
//
// Depends on: clarity-b2b-utils JS Import Map Entry client extension.
// Make sure the clarity-b2b-utils CET is deployed before adding this
// fragment to a page.
// ─────────────────────────────────────────────────────────────────────────────

// ── Configuration ─────────────────────────────────────────────────────────────
// Adjust these constants to change which product is featured and what
// threshold triggers the Low Stock badge.

/** SKU of the product to feature in this card. */
const SKU = 'CVS-STD-SV-2003';

/** Commerce Channel ID for the Distributor Portal. */
const CHANNEL_ID = 97521;

/**
 * Stock quantity at or below which the Low Stock badge is shown.
 * This value should match the Low Stock Threshold configured on the
 * product's Configuration tab (Module 6 exercise).
 */
const LOW_STOCK_THRESHOLD = 5;

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Fetches product name, SKU, and price from the Headless Commerce Admin
 * Catalog API and populates the corresponding DOM elements.
 *
 * The request uses the browser's session cookie for authentication — it works
 * automatically when the user is logged in to the Distributor Portal.
 *
 * @param {HTMLElement} container - The fragment's root element (fragmentElement)
 */
async function loadProductData(container) {

    // Step A — Resolve SKU → productId + price
    const skuResponse = await fetch(
        `/o/headless-commerce-admin-catalog/v1.0/skus?search=${encodeURIComponent(SKU)}&pageSize=1`,
        { headers: { Accept: 'application/json' } }
    );

    if (!skuResponse.ok) {
        console.warn('[clarity-featured-product] SKU lookup failed:', skuResponse.status);
        return;
    }

    const skuData = await skuResponse.json();
    const skuItem = skuData.items?.[0];

    if (!skuItem) {
        console.warn('[clarity-featured-product] SKU not found:', SKU);
        return;
    }

    // Step B — Resolve productId → product name and customFields
    const productResponse = await fetch(
        `/o/headless-commerce-admin-catalog/v1.0/products/${skuItem.productId}`,
        { headers: { Accept: 'application/json' } }
    );

    if (!productResponse.ok) return;

    const product = await productResponse.json();

    // Step C — Populate the card DOM
    const nameEl  = container.querySelector('.cfp-name');
    const skuEl   = container.querySelector('.cfp-sku-value');
    const priceEl = container.querySelector('.cfp-price');

    if (nameEl) nameEl.textContent = product.name?.en_US ?? SKU;
    if (skuEl)  skuEl.textContent  = SKU;

    // Format the price using the shared formatPrice utility
    if (priceEl) {
        const { formatPrice } = await import('clarity:b2b-utils');
        priceEl.textContent = formatPrice(skuItem.price || 0, 'USD');
    }
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {

    // `fragmentElement` is provided by Liferay and refers to the fragment's
    // root container element in the page DOM.
    const container = fragmentElement;

    // 1. Populate product name, SKU, and price
    try {
        await loadProductData(container);
    }
    catch (err) {
        console.warn('[clarity-featured-product] Could not load product data:', err);
    }

    // 2. Check inventory and show the Low Stock badge when appropriate.
    //
    //    fetchProductInventory() is provided by the clarity-b2b-utils Import Map
    //    Entry. It calls the Headless Commerce API and returns the stock quantity
    //    as a number.
    //
    //    NOTE: fetchProductInventory() throws until the TODO in
    //    client-extensions/clarity-b2b-utils/assets/b2b-utils.js is completed.
    //    The badge will remain hidden until that implementation is done.
    try {
        const { fetchProductInventory, isLowStock } = await import('clarity:b2b-utils');

        const quantity = await fetchProductInventory(SKU, CHANNEL_ID);

        const badge = container.querySelector('.cfp-badge--low-stock');

        // ─────────────────────────────────────────────────────────────────────
        // TODO: Show the Low Stock badge when the quantity is at or below the
        //       configured threshold.
        //
        // Use isLowStock(quantity, LOW_STOCK_THRESHOLD) to evaluate whether
        // the badge should be visible, then add the CSS modifier class to
        // make it appear.
        //
        // When complete, this block should look like:
        //
        //   if (badge && isLowStock(quantity, LOW_STOCK_THRESHOLD)) {
        //       badge.classList.add('cfp-badge--visible');
        //   }
        // ─────────────────────────────────────────────────────────────────────

    }
    catch (err) {
        // Expected during the scaffold phase — fetchProductInventory() throws
        // until b2b-utils.js Step 1–4 are implemented.
        console.info(
            '[clarity-featured-product] Inventory check pending implementation:',
            err.message
        );
    }

})();

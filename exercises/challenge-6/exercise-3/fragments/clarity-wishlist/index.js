// ─────────────────────────────────────────────────────────────────────────────
// Clarity Wishlist — Fragment JavaScript
//
// Depends on: clarity-b2b-utils JS Import Map Entry client extension.
// Make sure the clarity-b2b-utils CET is deployed before adding this
// fragment to a page.
// ─────────────────────────────────────────────────────────────────────────────

// ── Configuration ─────────────────────────────────────────────────────────────

/** Commerce Channel ID for the Distributor Portal. */
const CHANNEL_ID = 97521;

/**
 * Stock quantity at or below which 'Low Stock' is shown.
 * Must match the Low Stock Threshold set on each product (Module 6).
 */
const LOW_STOCK_THRESHOLD = 5;

/** localStorage key for persisting the wishlist across page loads. */
const STORAGE_KEY = 'clarity-b2b-wishlist';

/**
 * Demo SKUs pre-loaded the first time the fragment renders.
 * Students see a populated list immediately without manual data entry.
 */
const DEMO_SKUS = [
    'CLARITY-PRX-BLB-001',   // ProRX Digital Blue Light Blocker   — $149.99
    'CLARITY-ELITE-TI-001',  // EliteFrame Titanium Business Glasses — $249.99
    'CLARITY-ULTRA-PHC-001', // ClarityUltra Photochromic Lenses    — $179.99
];

// ── Wishlist management (localStorage) ────────────────────────────────────────

/** Returns the current wishlist from localStorage. */
function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
}

/** Persists the wishlist to localStorage, deduplicating entries. */
function saveWishlist(skus) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(skus)]));
}

/** Removes a single SKU from the persisted wishlist. */
function removeFromWishlist(sku) {
    saveWishlist(getWishlist().filter(s => s !== sku));
}

// ── Inventory status ───────────────────────────────────────────────────────────

/**
 * Converts a raw stock quantity into an inventory status string.
 *
 * The returned value controls:
 *   - The badge colour and text shown next to the product
 *   - Whether the "Add to Cart" button is enabled or disabled
 *
 * @param {number} quantity - Current available stock quantity
 * @param {number} threshold - The low-stock threshold (from Module 6)
 * @returns {'in-stock' | 'low-stock' | 'out-of-stock'}
 */
function getInventoryStatus(quantity, threshold) {

    // TODO START ─────────────────────────────────────────────────────────────
    //
    // Replace the placeholder return below with your own implementation.
    //
    // Rules:
    //   - 'out-of-stock'  → quantity is exactly 0 (nothing available)
    //   - 'low-stock'     → quantity is > 0 AND <= threshold (running low)
    //   - 'in-stock'      → quantity is > threshold (healthy stock level)
    //
    // The three possible return values map to badge CSS classes and colours:
    //   'in-stock'     → .cwl-badge--in-stock    (green)
    //   'low-stock'    → .cwl-badge--low-stock   (orange)
    //   'out-of-stock' → .cwl-badge--out-of-stock (red)
    //
    // Example implementation:
    //
    //   if (quantity === 0)        return 'out-of-stock';
    //   if (quantity <= threshold) return 'low-stock';
    //   return 'in-stock';

    return 'in-stock'; // Placeholder — all products show "In Stock" until this is implemented.

    // TODO END ───────────────────────────────────────────────────────────────
}

// ── Product data ───────────────────────────────────────────────────────────────

/**
 * Fetches product name and price for a SKU from the Headless Catalog API.
 * Uses the user's browser session for same-origin authentication.
 * Falls back gracefully on any error.
 *
 * @param {string} sku
 * @returns {Promise<{sku: string, name: string, price: number}>}
 */
async function fetchProductData(sku) {
    try {
        const skuRes = await fetch(
            `/o/headless-commerce-admin-catalog/v1.0/skus?search=${encodeURIComponent(sku)}&pageSize=1`,
            { headers: { Accept: 'application/json' } }
        );
        if (!skuRes.ok) return { sku, name: sku, price: 0 };

        const skuData = await skuRes.json();
        const skuItem = skuData.items?.[0];
        if (!skuItem) return { sku, name: sku, price: 0 };

        const prodRes = await fetch(
            `/o/headless-commerce-admin-catalog/v1.0/products/${skuItem.productId}`,
            { headers: { Accept: 'application/json' } }
        );
        if (!prodRes.ok) return { sku, name: sku, price: skuItem.price ?? 0 };

        const product = await prodRes.json();
        return {
            sku,
            name: product.name?.en_US ?? sku,
            price: skuItem.price ?? 0,
        };
    } catch {
        return { sku, name: sku, price: 0 };
    }
}

// ── Rendering ──────────────────────────────────────────────────────────────────

/** Maps each status key to a display label and CSS modifier class. */
const STATUS_CONFIG = {
    'in-stock':     { label: 'In Stock',     cssClass: 'cwl-badge--in-stock' },
    'low-stock':    { label: 'Low Stock',    cssClass: 'cwl-badge--low-stock' },
    'out-of-stock': { label: 'Out of Stock', cssClass: 'cwl-badge--out-of-stock' },
};

/**
 * Creates and returns a <li> element for one wishlist product.
 *
 * @param {{sku: string, name: string, price: number}} product
 * @param {'in-stock' | 'low-stock' | 'out-of-stock'} status
 * @param {{formatPrice: Function}} utils - Utilities from clarity:b2b-utils
 * @returns {HTMLLIElement}
 */
function createListItem(product, status, { formatPrice }) {
    const { label, cssClass } = STATUS_CONFIG[status] ?? STATUS_CONFIG['in-stock'];
    const isOutOfStock = status === 'out-of-stock';

    const li = document.createElement('li');
    li.className = 'cwl-item';
    li.dataset.sku = product.sku;

    li.innerHTML = `
        <div class="cwl-item-info">
            <span class="cwl-item-name">${product.name}</span>
            <span class="cwl-item-sku">SKU: <code>${product.sku}</code></span>
            <span class="cwl-item-price">${formatPrice(product.price, 'USD')}</span>
        </div>
        <div class="cwl-item-actions">
            <span class="cwl-badge ${cssClass}">${label}</span>
            <button
                class="btn btn-primary btn-sm cwl-add-to-cart"
                type="button"
                ${isOutOfStock ? 'disabled aria-disabled="true"' : ''}
            >Add to Cart</button>
            <button class="btn btn-link btn-sm cwl-remove" type="button"
                    aria-label="Remove ${product.sku} from wishlist">
                &times; Remove
            </button>
        </div>
    `;

    return li;
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {

    // `fragmentElement` is a Liferay-provided global that refers to this
    // fragment's root container element in the page DOM.
    const container = fragmentElement;

    const list     = container.querySelector('.cwl-list');
    const input    = container.querySelector('.cwl-sku-input');
    const addBtn   = container.querySelector('.cwl-add-btn');
    const emptyMsg = container.querySelector('.cwl-empty');

    // ── Import shared utilities ──────────────────────────────────────────────
    // fetchProductInventory: calls Headless Commerce Delivery Catalog API
    //   (its body is the TODO in clarity-b2b-utils/assets/b2b-utils.js)
    // isLowStock: quantity <= threshold (already implemented)
    // formatPrice: Intl.NumberFormat wrapper (already implemented)
    const { fetchProductInventory, isLowStock, formatPrice } =
        await import('clarity:b2b-utils');

    // ── Helpers ──────────────────────────────────────────────────────────────

    /** Shows/hides the empty-state message based on list contents. */
    function toggleEmpty() {
        if (emptyMsg) {
            emptyMsg.style.display =
                (list?.children.length ?? 0) === 0 ? 'block' : 'none';
        }
    }

    /**
     * Fetches product data and inventory for one SKU in parallel, then
     * appends a rendered <li> to the wishlist.
     *
     * @param {string} sku
     */
    async function renderSku(sku) {
        // Run both API calls concurrently; handle each failure independently
        const [productResult, inventoryResult] = await Promise.allSettled([
            fetchProductData(sku),
            fetchProductInventory(sku, CHANNEL_ID),
        ]);

        const product = productResult.status === 'fulfilled'
            ? productResult.value
            : { sku, name: sku, price: 0 };

        // qty is -1 while the fetchProductInventory TODO is still pending.
        // When qty < 0 we skip getInventoryStatus() and default to 'in-stock'
        // so the list renders without errors in the scaffold phase.
        const qty = inventoryResult.status === 'fulfilled'
            ? inventoryResult.value
            : -1;

        if (inventoryResult.status === 'rejected') {
            console.info(
                '[clarity-wishlist] Inventory pending for', sku, ':',
                inventoryResult.reason?.message
            );
        }

        const status = qty >= 0
            ? getInventoryStatus(qty, LOW_STOCK_THRESHOLD)
            : 'in-stock';

        const li = createListItem(product, status, { formatPrice });

        // Wire the Remove button
        li.querySelector('.cwl-remove').addEventListener('click', () => {
            removeFromWishlist(sku);
            li.remove();
            toggleEmpty();
        });

        list?.appendChild(li);
    }

    // ── Handle "Add to Wishlist" ──────────────────────────────────────────────

    async function handleAddSku() {
        const sku = input?.value.trim().toUpperCase();
        if (!sku) return;

        const currentList = getWishlist();
        if (currentList.includes(sku)) {
            // Already in wishlist — clear the input and do nothing
            if (input) input.value = '';
            return;
        }

        saveWishlist([...currentList, sku]);
        if (input) input.value = '';

        await renderSku(sku);
        toggleEmpty();
    }

    addBtn?.addEventListener('click', handleAddSku);
    input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAddSku();
    });

    // ── Initial load ──────────────────────────────────────────────────────────

    // Seed demo SKUs if the wishlist has never been saved before
    if (!localStorage.getItem(STORAGE_KEY)) {
        saveWishlist(DEMO_SKUS);
    }

    const savedSkus = getWishlist();
    toggleEmpty();

    // Render all saved SKUs concurrently
    await Promise.all(savedSkus.map(renderSku));
    toggleEmpty();

})();

/**
 * Clarity B2B Utils
 *
 * Shared utility module for Distributor Portal fragments.
 * Import this module in fragments via the bareSpecifier:
 *
 *   import { fetchProductInventory, isLowStock, formatPrice } from 'clarity:b2b-utils';
 */

/**
 * Fetches the stock quantity for a given SKU from the Headless Commerce
 * Delivery Catalog API.
 *
 * @param {string} sku - The SKU code to look up (e.g. "CVS-STD-SV-2003")
 * @param {number} channelId - The Commerce Channel ID to scope the request
 * @returns {Promise<number>} Resolves to the available stock quantity
 *
 * @example
 * const qty = await fetchProductInventory('CVS-STD-SV-2003', 101234);
 * if (isLowStock(qty, 5)) {
 *   console.log('Running low!');
 * }
 */
export async function fetchProductInventory(sku, channelId) {

	// TODO: Implement the API call to retrieve the stock quantity for the
	// given SKU within the specified channel.
	//
	// Suggested endpoint (Headless Commerce Delivery Catalog):
	//
	//   GET /o/headless-commerce-delivery-catalog/v1.0/channels/{channelId}/products
	//       ?skus={sku}&fields=skus
	//
	// Steps:
	//   1. Build the request URL using `channelId` and `sku`.
	//   2. Call fetch() — no Authorization header is needed for guest-accessible
	//      channels; add one if the channel requires authentication.
	//   3. Parse the JSON response and locate the SKU entry.
	//   4. Extract and return the stock quantity from the response.
	//      Hint: look for a field like `stockQuantity` or `availability`
	//      within the `skus` array of the matching product.
	//
	// Skeleton (adapt the response shape to what the API returns):
	//
	//   const url = `/o/headless-commerce-delivery-catalog/v1.0/channels/${channelId}/products?skus=${encodeURIComponent(sku)}&fields=skus`;
	//   const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
	//   if (!response.ok) {
	//       throw new Error(`Inventory request failed: ${response.status}`);
	//   }
	//   const data = await response.json();
	//   const product = data.items?.[0];
	//   const skuEntry = product?.skus?.find(s => s.sku === sku);
	//   return skuEntry?.stockQuantity ?? 0;

	throw new Error(
		'fetchProductInventory() is not yet implemented. ' +
		'Follow the TODO instructions in clarity-b2b-utils/assets/b2b-utils.js.'
	);
}

/**
 * Determines whether a stock quantity is at or below the low-stock threshold.
 *
 * @param {number} quantity - The current available stock quantity
 * @param {number} threshold - The minimum acceptable stock level
 * @returns {boolean} True if `quantity` is at or below `threshold`
 *
 * @example
 * isLowStock(3, 5);  // true
 * isLowStock(10, 5); // false
 */
export function isLowStock(quantity, threshold) {
	return quantity <= threshold;
}

/**
 * Formats a monetary amount for display using the browser's Intl API.
 * The locale is derived from the browser's language setting.
 *
 * @param {number} amount - The raw monetary amount (e.g. 55.00)
 * @param {string} currency - ISO 4217 currency code (e.g. "USD", "EUR", "GBP")
 * @returns {string} Locale-formatted price string (e.g. "$55.00")
 *
 * @example
 * formatPrice(55, 'USD');  // "$55.00"
 * formatPrice(49.5, 'EUR'); // "€49.50"
 */
export function formatPrice(amount, currency) {
	return new Intl.NumberFormat(navigator.language, {
		currency,
		style: 'currency',
	}).format(amount);
}

package com.clarity.commerce.product.endpoint.model;

/**
 * Simplified product summary returned by the B2B product endpoint.
 *
 * <p>Fields aggregated from two Liferay Headless Commerce APIs:
 * <ul>
 *   <li>{@code name} — from Admin Catalog product</li>
 *   <li>{@code price} — from Admin Catalog SKU</li>
 *   <li>{@code stockQuantity} — from Admin Inventory warehouse items</li>
 *   <li>{@code wholesaleOnly} — from Admin Catalog product customFields</li>
 * </ul>
 *
 * @param sku           the SKU code (e.g. "CVS-STD-SV-2003")
 * @param name          the product display name
 * @param price         the SKU list price
 * @param stockQuantity the total available stock across all warehouses
 * @param wholesaleOnly whether the product is restricted to B2B buyers
 */
public record ProductSummary(
	String sku,
	String name,
	double price,
	int stockQuantity,
	boolean wholesaleOnly
) {
}

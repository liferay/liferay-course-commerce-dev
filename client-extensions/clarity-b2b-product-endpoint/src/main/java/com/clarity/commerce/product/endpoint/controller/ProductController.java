package com.clarity.commerce.product.endpoint.controller;

import com.clarity.commerce.product.endpoint.model.ProductSummary;
import com.clarity.commerce.product.endpoint.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller exposing the B2B product endpoint.
 *
 * <p>Base path: {@code /products}
 *
 * <p>Intended to be called by Distributor Portal fragments to retrieve
 * a simplified product payload that aggregates catalog and inventory data.
 */
@RestController
@RequestMapping("/products")
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	/**
	 * Returns a simplified product summary for the given SKU.
	 *
	 * <p>Example request:
	 * <pre>
	 *   GET http://localhost:58081/products/CVS-STD-SV-2003
	 * </pre>
	 *
	 * <p>Example response (after completing the TODOs in {@link ProductService}):
	 * <pre>
	 * {
	 *   "sku": "CVS-STD-SV-2003",
	 *   "name": "ProVision Lens",
	 *   "price": 55.00,
	 *   "stockQuantity": 120,
	 *   "wholesaleOnly": true
	 * }
	 * </pre>
	 *
	 * @param sku the product SKU code (path variable)
	 * @return 200 OK with a {@link ProductSummary} payload,
	 *         or 404 Not Found if no product matches the SKU
	 */
	@GetMapping("/{sku}")
	public ResponseEntity<ProductSummary> getProduct(@PathVariable String sku) {
		ProductSummary summary = productService.getProductBySku(sku);

		if (summary == null) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(summary);
	}

}

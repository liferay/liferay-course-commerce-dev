# Bonus Challenge 5: Republish a SKU via Headless Commerce API

## Scenario

During a high-demand period, Clarity Vision Solutions' **EcoVision Sustainable Frames** product ran low on stock. Because a **Low Stock Action** was configured in Commerce Admin (threshold: 25 units, action: *Set as Unpublished*), the SKU `CLARITY-ECOVISION-001` was automatically unpublished when a distributor order reduced inventory below the threshold.

A key distributor account just called with an urgent bulk order. The warehouse team has already replenished stock, but the SKU is still unpublished, blocking purchases in the Distributor Portal.

Your task: use the **Headless Commerce Admin Catalog API** to republish the SKU immediately — no Admin UI required.

---

## Goal

Use REST API calls to:

1. Find the numeric ID of the EcoVision SKU.
2. Verify the SKU is currently unpublished (`published: false`).
3. Republish it with a single PATCH call.
4. Confirm purchases are unblocked in the Distributor Portal.

---

## Prerequisites

- Liferay DXP running at `http://localhost:8080`
- The EcoVision Sustainable Frames product exists with ERC `CLARITY_ECOVISION_BAMBOO` and SKU `CLARITY-ECOVISION-001` (imported in Exercise 3)
- Admin credentials: `admin@clarityvisionsolutions.com` / `learn`
- The SKU has been set to `published: false` (simulating the Low Stock Action trigger). If it is still published, run the following call to put it in the blocked state before starting:

  ```bash
  # Simulate the Low Stock Action effect
  curl -X PATCH \
    -u "admin@clarityvisionsolutions.com:learn" \
    -H "Content-Type: application/json" \
    -d '{"published": false}' \
    "http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/skus/{skuId}"
  ```

---

## Steps

### Step 1 — Find the SKU ID

The PATCH endpoint requires the numeric SKU ID, not the SKU code. Retrieve it by listing the SKUs for the EcoVision product using its External Reference Code (ERC):

```bash
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/products/by-externalReferenceCode/CLARITY_ECOVISION_BAMBOO/skus"
```

In the response, locate the entry where `"sku": "CLARITY-ECOVISION-001"` and note its `"id"` value. You will also see `"published": false`, confirming the SKU is blocked.

**Example response (excerpt):**

```json
{
  "items": [
    {
      "id": 104726,
      "sku": "CLARITY-ECOVISION-001",
      "published": false,
      "purchasable": true,
      ...
    }
  ],
  "totalCount": 1
}
```

---

### Step 2 — Republish the SKU

Call `PATCH /o/headless-commerce-admin-catalog/v1.0/skus/{id}` with body `{"published": true}`, replacing `{id}` with the numeric ID from Step 1:

```bash
curl -X PATCH \
  -u "admin@clarityvisionsolutions.com:learn" \
  -H "Content-Type: application/json" \
  -d '{"published": true}' \
  "http://localhost:8080/o/headless-commerce-admin-catalog/v1.0/skus/104726"
```

A successful response returns the updated SKU object with `"published": true`.

> **Note:** The effect is **immediate** — no cache flush or re-indexing is required. The SKU becomes purchasable as soon as the PATCH response is returned.

---

### Step 3 — Verify in the Distributor Portal

Log in to the Distributor Portal as a distributor buyer (e.g., `daniel.raymond@irisoptical.com` / `learn`) and navigate to the EcoVision Sustainable Frames product page.

Add the product to the cart and proceed to checkout. The purchase should succeed immediately after the PATCH.

You can also verify programmatically via the Delivery Catalog API:

```bash
# Replace {channelId} with your storefront channel ID (e.g., 97521)
# Replace {productId} with the CPDefinition ID returned by the products endpoint
curl -u "daniel.raymond@irisoptical.com:learn" \
  "http://localhost:8080/o/headless-commerce-delivery-catalog/v1.0/channels/{channelId}/products/{productId}/skus"
```

The response should show `"published": true` for SKU `CLARITY-ECOVISION-001`.

---

## Key Takeaways

| API | Endpoint | Purpose |
|-----|----------|---------|
| Admin Catalog | `GET .../products/by-externalReferenceCode/{ERC}/skus` | Look up the numeric SKU ID by product ERC |
| Admin Catalog | `PATCH .../skus/{id}` | Update SKU fields — including `published` status |
| Delivery Catalog | `GET .../channels/{channelId}/products/{productId}/skus` | Verify buyer-facing SKU visibility |

The `published` field on a SKU is the same flag that the **Set as Unpublished** Low Stock Action writes. A single PATCH with `{"published": true}` is sufficient to fully restore purchase capability — no additional steps are needed.

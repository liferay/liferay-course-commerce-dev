# clarity-b2b-product-endpoint

Spring Boot microservice that exposes a simplified product endpoint for
Distributor Portal fragments.

## Endpoint

```
GET http://localhost:58081/products/{sku}
```

**Example response** (after completing the exercise):

```json
{
  "sku": "CVS-STD-SV-2003",
  "name": "ProVision Lens",
  "price": 55.00,
  "stockQuantity": 120,
  "wholesaleOnly": true
}
```

## Exercise — What you need to complete

Open `src/main/java/com/clarity/commerce/product/endpoint/service/ProductService.java`
and implement the `getProductBySku(String sku)` method by following the
three TODO steps in the file.

## Build

Requires Java 17 or 21. If running Java 25, set `JAVA_HOME` to a Java 21 installation:

```bash
cd client-extensions/clarity-b2b-product-endpoint
JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu ./gradlew build
```

The executable JAR is created at `build/libs/clarity-b2b-product-endpoint-1.0.0-SNAPSHOT.jar`.

## Run locally

```bash
~/.sdkman/candidates/java/21.0.10-zulu/bin/java \
  -jar build/libs/clarity-b2b-product-endpoint-1.0.0-SNAPSHOT.jar
```

The server starts on port **58081**. Test it:

```bash
curl http://localhost:58081/products/CVS-STD-SV-2003
```

## Deploy the OAuth2 Application

Liferay DXP 2026.Q1.2-LTS does not support `oAuthApplicationHeadlessServer` as a
client extension type. Register the OAuth2 application manually:

1. Navigate to **Control Panel → Security → OAuth 2 Administration**
2. Click **Add** and configure:
   - **Application Name:** Clarity B2B Product Endpoint
   - **Client Profile:** Headless Server
   - **Allowed Grant Types:** ✅ Client Credentials
3. Click **Save**, then open the application and go to the **Scopes** tab
4. Enable:
   - `Liferay.Headless.Commerce.Admin.Catalog.everything`
   - `Liferay.Headless.Commerce.Delivery.Catalog.everything`
5. Copy the **Client ID** and **Client Secret** from the Details tab

### Using OAuth2 in the application

Restart the app with the OAuth2 credentials:

```bash
CLIENT_ID=<paste-client-id> \
CLIENT_SECRET=<paste-client-secret> \
  ~/.sdkman/candidates/java/21.0.10-zulu/bin/java \
  -jar build/libs/clarity-b2b-product-endpoint-1.0.0-SNAPSHOT.jar
```

Then update `ProductService.basicAuth()` to use an OAuth2 bearer token:

```java
private String bearerToken() {
    // POST to /o/oauth2/token with client_credentials grant
    // return "Bearer " + <access_token>;
}
```

## API References

- Admin Catalog SKUs: `GET /o/headless-commerce-admin-catalog/v1.0/skus?search={sku}`
- Admin Catalog Products: `GET /o/headless-commerce-admin-catalog/v1.0/products/{productId}`
- Admin Inventory: `GET /o/headless-commerce-admin-inventory/v1.0/skus/{sku}/warehouseItems`

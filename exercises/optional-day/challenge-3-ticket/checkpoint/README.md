# Checkpoint — Import Ticket Object Definition

Use these JSON files to import the Ticket object definition and its picklists without building them manually in the UI.

---

## Step 1 — Import the picklists

Go to **Global Menu (⊞) > Control Panel > Picklists**.

Click the **Import** icon (↑) in the top right corner and upload each file:

1. `picklist-priority.json` → creates the **Priority** picklist
2. `picklist-ticket-status.json` → creates the **Ticket Status** picklist

The import calls `POST /o/headless-admin-list-type/v1.0/list-type-definitions` internally.

---

## Step 2 — Import the object definition

Go to **Global Menu (⊞) > Control Panel > Objects**.

Click the **Import** icon (↑) in the top right corner and upload:

3. `object-ticket.json` → creates the **Ticket** object definition

The import calls `POST /o/object-admin/v1.0/object-definitions` internally.

> The object definition references the picklists by their `externalReferenceCode`. The picklists must be imported first so the reference resolves correctly.

---

## Step 3 — Publish the object

After importing, the object is in **Draft** state. Open it in the Objects UI and click **Publish**.

---

## Verification

```bash
# Should return 200 with totalCount: 0
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/c/tickets" | python3 -m json.tool
```

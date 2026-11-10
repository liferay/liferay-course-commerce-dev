# Checkpoint — Import Ticket Object Definition

Use these JSON files to import the Ticket object definition and its picklists without building them manually in the UI.

> **Order matters.** Import the picklists **before** the object. If you import the object first, Liferay creates empty placeholder picklists and links the object fields to those — the batch import in Challenge 4 will fail. If this happens, delete the auto-created picklists and the Ticket object definition from the UI, then start over from Step 1.

---

## Step 1 — Import the picklists

Go to **Global Menu (⊞) > Control Panel > Picklists**.

Click the **Import** icon (↑) in the top right corner and upload each file:

1. `picklist-priority.json` → creates the **Priority** picklist (`CLARITY_PRIORITY_LIST`) with keys `low`, `medium`, `high`
2. `picklist-ticket-status.json` → creates the **Ticket Status** picklist (`CLARITY_TICKET_STATUS_LIST`) with keys `open`, `inProgress`, `closed`

**Alternative (API):** if the Import button is not available, use curl:

```bash
curl -u "admin@clarityvisionsolutions.com:learn" \
  -H "Content-Type: application/json" \
  -d @picklist-priority.json \
  "http://localhost:8080/o/headless-admin-list-type/v1.0/list-type-definitions"

curl -u "admin@clarityvisionsolutions.com:learn" \
  -H "Content-Type: application/json" \
  -d @picklist-ticket-status.json \
  "http://localhost:8080/o/headless-admin-list-type/v1.0/list-type-definitions"
```

Both calls should return **200** with the picklist JSON.

---

## Step 2 — Import the object definition

Go to **Global Menu (⊞) > Control Panel > Objects**.

Click the **Import** icon (↑) in the top right corner and upload:

3. `object-ticket.json` → creates the **Ticket** object definition

> The object references the picklists by their `externalReferenceCode`. The picklists must exist first so the reference resolves to the correct IDs.

---

## Step 3 — Configure the object

Open the **Ticket** object in the Objects UI and go to the **Details** tab.

Set the following before publishing:

| Section | Field | Value |
|---------|-------|-------|
| Entry Display | Title Field | Subject |
| Configuration | Panel Link | Object |

Setting **Title Field** makes each ticket entry display its subject as the title in the UI. Setting **Panel Link** to **Object** places the Ticket list under **Control Panel → Object → Tickets** so you can browse entries directly.

---

## Step 4 — Publish the object

After configuring, click **Publish** in the top right corner. The object is in **Draft** state until published — the REST API is not available until this step.

---

## Verification

```bash
# Should return 200 with totalCount: 0
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/c/tickets" | python3 -m json.tool
```

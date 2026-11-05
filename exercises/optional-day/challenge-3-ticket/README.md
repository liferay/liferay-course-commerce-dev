# Challenge 3 — Create the Ticket Object

## Goal

Create the **Ticket** custom object in Liferay using the Objects UI, including two picklists and four custom fields.

> **Checkpoint:** If you prefer to import the pre-built definition instead of building by hand, follow the instructions in `checkpoint/README.md` and then proceed to Challenge 4.

---

## Step 1 — Create the picklists

Picklists must exist before you create the object fields that reference them.

Go to **Global Menu (⊞) > Control Panel > Picklists**.

### Picklist 1: Priority

| Field | Value |
|-------|-------|
| Name | `Priority` |

Add entries:

| Key | Name |
|-----|------|
| `low` | Low |
| `medium` | Medium |
| `high` | High |

### Picklist 2: Ticket Status

| Field | Value |
|-------|-------|
| Name | `Ticket Status` |

Add entries:

| Key | Name |
|-----|------|
| `open` | Open |
| `inProgress` | In Progress |
| `closed` | Closed |

---

## Step 2 — Create the object definition

Go to **Global Menu (⊞) > Control Panel > Objects > Add (⊕)**.

| Field | Value |
|-------|-------|
| Label | `Ticket` |
| Plural Label | `Tickets` |
| Object Name | `Ticket` |
| Scope | Company |
| Panel Link | Control Panel |

---

## Step 3 — Add custom fields

In the object definition, go to the **Fields** tab and add:

| Label | Field Name | Type | Picklist | Required |
|-------|-----------|------|---------|---------|
| Subject | `subject` | Text | — | No |
| Description | `description` | Long Text | — | No |
| Priority | `priority` | Picklist | Priority | No |
| Ticket Status | `ticketStatus` | Picklist | Ticket Status | No |

> **Bonus:** Make **Subject** required. Update the form validation in Challenge 6.

---

## Step 4 — Publish the object

Click **Publish** in the top right corner. Liferay will generate:

- REST endpoint: `http://localhost:8080/o/c/tickets`
- GraphQL schema under `c { tickets }`

Verify in the **API Explorer** (`http://localhost:8080/o/api`).

---

## Step 5 — Set the title field

In the object definition > **Details** tab, set **Title Field** to `subject` so individual ticket entries display their subject as the page title.

---

## Verification

```bash
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/c/tickets" | python3 -m json.tool
```

Expect a response with `"totalCount": 0` and an empty `"items"` array.

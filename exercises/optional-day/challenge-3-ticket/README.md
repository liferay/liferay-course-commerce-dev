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

## Step 4 — Configure the object

Before publishing, open the **Ticket** object and go to the **Details** tab.

Set the following:

| Section | Field | Value |
|---------|-------|-------|
| Entry Display | Title Field | Subject |
| Configuration | Panel Link | Object |

Setting **Title Field** makes each ticket entry display its subject as the title in the UI. Setting **Panel Link** to **Object** places the Ticket list under **Control Panel → Object → Tickets** so you can browse entries directly.

---

## Step 5 — Publish the object

Click **Publish** in the top right corner. Liferay will generate:

- REST endpoint: `http://localhost:8080/o/c/tickets`
- GraphQL schema under `c { tickets }`

Verify in the **API Explorer** (`http://localhost:8080/o/api`).

---

## Verification

```bash
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/c/tickets" | python3 -m json.tool
```

Expect a response with `"totalCount": 0` and an empty `"items"` array.

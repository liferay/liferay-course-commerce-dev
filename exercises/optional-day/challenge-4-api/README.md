# Challenge 4 — API: Import & Query Tickets

## Goal

Use the auto-generated Ticket REST and GraphQL APIs to import legacy ticket data, then explore pagination, sorting, filtering, and mutation operations.

---

## Prerequisites

- Challenge 3 (or checkpoint) completed: Ticket object is published at `/o/c/tickets`.
- Liferay running at `http://localhost:8080`.

---

## Step 1 — Batch import via API Explorer

Open the API Explorer: `http://localhost:8080/o/api` → section **c**.

Find the endpoint:
```
POST /o/c/tickets/batch
```

Paste the contents of `import_legacy_tickets.json` into the request body and execute.

Expected: **202 Accepted** with a task ID in the response.

Verify the import:
```bash
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/c/tickets" | python3 -m json.tool
# "totalCount" should be 10
```

---

## Step 2 — Pagination

```bash
# Page 1, 5 tickets per page
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/c/tickets?page=1&pageSize=5" | python3 -m json.tool
```

Notice `lastPage`, `page`, `pageSize`, and `totalCount` in the response envelope.

---

## Step 3 — Sorting

```bash
# Sort by priority ascending
curl -u "admin@clarityvisionsolutions.com:learn" \
  "http://localhost:8080/o/c/tickets?sort=priority%3Aasc" | python3 -m json.tool
```

Try sorting by `ticketStatus:desc` as well.

---

## Step 4 — GraphQL

Open the GraphQL playground: `http://localhost:8080/o/graphql`

Run the query from `query.graphql`. Notice:
- Picklist fields return an object with `key` and `name`.
- The `filter` parameter accepts OData-style expressions.

---

## Step 5 — PATCH a ticket

Pick the numeric `id` of the **"Order Tracking"** ticket from the GET response.

```bash
curl -X PATCH \
  -u "admin@clarityvisionsolutions.com:learn" \
  -H "Content-Type: application/json" \
  -d '{"ticketStatus": "inProgress"}' \
  "http://localhost:8080/o/c/tickets/<ID>"
```

Verify: GET the same ticket and confirm `ticketStatus.key` is `"inProgress"`.

---

## Bonus — PUT (full replacement)

PATCH updates only the fields you send. PUT replaces the entire resource.

```bash
curl -X PUT \
  -u "admin@clarityvisionsolutions.com:learn" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Lens Features (updated)",
    "description": "Do you offer blue light blocking lenses? Also anti-glare?",
    "priority": "medium",
    "ticketStatus": "open"
  }' \
  "http://localhost:8080/o/c/tickets/<ID>"
```

> See `requests.sh` for all calls as a runnable script.

---

## Priority remapping reference

The legacy data used a different priority vocabulary. The import file already remaps:

| Legacy | Imported |
|--------|---------|
| `critical` | `high` |
| `major` | `medium` |
| `minor` | `low` |

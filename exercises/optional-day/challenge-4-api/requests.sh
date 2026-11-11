#!/bin/bash
# Challenge 4 — Ticket API requests
# Run from the challenge-4-api/ folder.

HOST="http://localhost:8080"
AUTH="admin@clarityvisionsolutions.com:learn"

# ── 1. Batch import ──────────────────────────────────────────────────────────
# Prerequisite: Ticket object must be published (Challenge 3 or checkpoint).
# Expected response: 202 Accepted

echo "=== POST batch import ==="
curl -s -X POST \
  "$HOST/o/c/tickets/batch" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d @import_legacy_tickets.json | python3 -m json.tool

# ── 2. GET all tickets (default page) ────────────────────────────────────────
echo ""
echo "=== GET /o/c/tickets ==="
curl -s "$HOST/o/c/tickets" \
  -u "$AUTH" | python3 -m json.tool

# ── 3. Pagination: page 1, pageSize 5 ────────────────────────────────────────
echo ""
echo "=== GET page=1&pageSize=5 ==="
curl -s "$HOST/o/c/tickets?page=1&pageSize=5" \
  -u "$AUTH" | python3 -m json.tool

# ── 4. Sort by priority ascending ────────────────────────────────────────────
echo ""
echo "=== GET sort=priority:asc ==="
curl -s "$HOST/o/c/tickets?sort=priority%3Aasc" \
  -u "$AUTH" | python3 -m json.tool

# ── 5. PATCH a ticket ────────────────────────────────────────────────────────
# Replace <TICKET_ID> with a numeric ID from the GET response above.
TICKET_ID="<TICKET_ID>"

echo ""
echo "=== PATCH /o/c/tickets/$TICKET_ID ==="
curl -s -X PATCH \
  "$HOST/o/c/tickets/$TICKET_ID" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"ticketStatus": "inProgress"}' | python3 -m json.tool

# ── BONUS: PUT (full replacement) ─────────────────────────────────────────────
echo ""
echo "=== BONUS: PUT /o/c/tickets/$TICKET_ID ==="
curl -s -X PUT \
  "$HOST/o/c/tickets/$TICKET_ID" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Lens Features (updated)",
    "description": "Do you offer blue light blocking lenses? Also anti-glare?",
    "priority": "medium",
    "ticketStatus": "open"
  }' | python3 -m json.tool

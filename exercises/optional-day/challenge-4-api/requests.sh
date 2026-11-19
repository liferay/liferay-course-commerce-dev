#!/bin/bash
# Challenge 4 — Ticket API requests
# Run from the challenge-4-api/ folder.
# Prerequisites:
#   - Ticket object published (Challenge 3 or checkpoint)
#   - 10 tickets imported (POST /o/c/tickets/batch with import_legacy_tickets.json)

HOST="http://localhost:8080"
AUTH="admin@clarityvisionsolutions.com:learn"

# ── 1. GET all tickets ───────────────────────────────────────────────────────
echo "=== 1. GET /o/c/tickets ==="
curl -s -u "$AUTH" \
  -w "\nHTTP %{http_code}\n" \
  "$HOST/o/c/tickets"

# ── 2. GET pageSize=2, sort by subject ascending ─────────────────────────────
echo ""
echo "=== 2. GET /o/c/tickets?pageSize=2&sort=subject:asc ==="
curl -s -u "$AUTH" \
  -w "\nHTTP %{http_code}\n" \
  "$HOST/o/c/tickets?pageSize=2&sort=subject%3Aasc"

# ── 3. Find id of "Order Tracking" ticket (filter by subject) ────────────────
echo ""
echo "=== 3. GET id of 'Order Tracking' ==="
RESPONSE=$(curl -s -u "$AUTH" \
  -w "\n%{http_code}" \
  "$HOST/o/c/tickets?filter=subject%20eq%20%27Order%20Tracking%27")
echo "$RESPONSE" | sed '$d'
echo "HTTP $(echo "$RESPONSE" | tail -1)"
TICKET_ID=$(echo "$RESPONSE" | sed '$d' | grep -Eo '/o/c/tickets/[0-9]+' | grep -Eo '[0-9]+' | head -1)
echo "Order Tracking ID: $TICKET_ID"

# ── 4. PATCH priority: high ───────────────────────────────────────────────────
echo ""
echo "=== 4. PATCH /o/c/tickets/$TICKET_ID — priority: high ==="
curl -s -X PATCH \
  "$HOST/o/c/tickets/$TICKET_ID" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"priority": "high"}' \
  -w "\nHTTP %{http_code}\n"

# ── 5. BONUS: PUT — full replacement (subject + priority only) ───────────────
echo ""
echo "=== 5. BONUS PUT /o/c/tickets/$TICKET_ID ==="
curl -s -X PUT \
  "$HOST/o/c/tickets/$TICKET_ID" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"subject": "Order Tracking", "priority": "medium"}' \
  -w "\nHTTP %{http_code}\n"

# ── 6. PATCH — restore original description and ticketStatus ─────────────────
echo ""
echo "=== 6. PATCH /o/c/tickets/$TICKET_ID — restore ==="
curl -s -X PATCH \
  "$HOST/o/c/tickets/$TICKET_ID" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"description": "How can I track my order for prescription lenses?", "ticketStatus": "open"}' \
  -w "\nHTTP %{http_code}\n"

# Challenge 6 — Design Elements

## Goal

Use the Liferay page editor to build a **Ticket submission form** and a **ticket collection browser** on the Tickets page, using only no-code fragments — no additional client extensions required.

---

## Prerequisites

- Ticket object published (Challenge 3 or checkpoint).
- At least one ticket exists (Challenge 4 or created manually).
- The Tickets content page exists and is hidden from navigation (created as part of the course setup).

---

## Step 1 — Form Container (create a ticket)

1. Open the Tickets page in the Clarity Public Enterprise Website and click **Edit**.
2. From the **Fragments and Widgets** panel, drag a **Form Container** onto the page.
3. In the form configuration, set:
   - **Object**: Ticket
   - **Success page**: the Tickets page itself (redirect after submit).
4. Add the following fields inside the Form Container:
   - **Text** field mapped to `subject`
   - **Text area** mapped to `description`
   - **Select** mapped to `priority` (picklist)
   - **Select** mapped to `ticketStatus` (picklist)
5. Add a **Submit Button**.
6. Click **Publish** and test the form as `ian.miller@clarityvisionsolutions.com`.

---

## Step 2 — Collection Display (list tickets)

1. Below the Form Container, drag a **Collection Display** onto the page.
2. In the collection configuration:
   - **Collection**: Choose **Object Collection Provider** → Ticket.
   - **Style display**: List.
   - **Maximum number of items**: 20.
3. Inside the Collection Display, add a **Heading** fragment mapped to the `subject` field.
4. Add a **Text** fragment mapped to `ticketStatus`.
5. Click **Publish**.

Reload the page. The tickets you imported in Challenge 4 should appear in the collection.

---

## Bonus A — Display Page Template

Create a Display Page Template for the Ticket object so each ticket has its own URL:

1. Go to **Site Builder > Display Page Templates > Add (⊕)**.
2. Choose **Ticket** as the content type.
3. Add fragments: Heading (subject), Rich Text (description), Text (priority), Text (ticketStatus).
4. Mark it as the **default** display page for Ticket.
5. Click on a ticket subject in the Collection Display — it should open the ticket's display page.

---

## Bonus B — Style Book token

Apply the Clarity colour palette to the Tickets page via a Style Book token instead of inline CSS:

1. Go to **Site Builder > Style Books**.
2. Duplicate the existing style book and rename it **Clarity Tickets Style**.
3. Modify the **Primary** colour token to `#0070c0`.
4. Apply the style book to the Tickets page via Page Design Options.
5. Verify that the form submit button picks up the new primary colour.

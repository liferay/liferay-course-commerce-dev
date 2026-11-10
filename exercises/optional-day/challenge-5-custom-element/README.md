# Challenge 5 — Custom Element Client Extension

## Goal

Convert the `clarity-ticketing-ui` React app into a Liferay **custom element** client extension, deploy it from the workspace, and place it on the Tickets page.

---

## Prerequisites

- Challenge 3 or checkpoint completed (Ticket object published).
- Challenge 4 completed (10 legacy tickets imported).
- Node.js available (`node -v`).
- Java 21 for `blade gw deploy`.

---

## Overview

| Folder | Purpose |
|--------|---------|
| `starter/clarity-ticketing-ui/` | Starting point — compilable app, `TicketsList` has a TODO |
| `solution/clarity-ticketing-ui/` | Complete implementation |

Work in the **starter**. Consult the **solution** only if stuck.

---

## Step 1 — Inspect the starter

```bash
cd starter/clarity-ticketing-ui
ls
```

Key files:

| File | Role |
|------|------|
| `client-extension.yaml` | Declares this as a `customElement` extension |
| `package.json` | webpack build (no React in deps — provided by Liferay at runtime) |
| `webpack.config.js` | Outputs to `build/static/`, `useESM: true` compatible |
| `src/index.js` | Registers `<clarity-ticketing-ui>` as a custom HTML element |
| `src/App.js` | Root React component |
| `src/assets/components/TicketsList.js` | **TODO: implement fetch logic here** |
| `src/assets/components/Ticket.js` | Renders a single ticket card |

---

## Step 2 — Install dependencies and verify the build

```bash
yarn install
yarn build
# Expect: build/static/index.<hash>.js
```

The build must succeed before you proceed. If it fails, check that `node -v` works independently of `JAVA_HOME`.

---

## Step 3 — Implement TicketsList

Open `src/assets/components/TicketsList.js` and replace the TODO with a `useEffect` that:

1. Fetches `GET /o/c/tickets?pageSize=20` with an `X-CSRF-Token` header set to `Liferay.authToken`. Liferay requires this token to authenticate same-origin session requests to the headless API — without it the API treats the request as a guest call and returns no results.
2. Checks `response.ok` before calling `response.json()` to handle HTTP errors gracefully.
3. Stores the response `items` array in state.
4. Renders the tickets using the `Ticket` component.

The `Ticket` component expects a `ticket` prop with fields: `id`, `subject`, `description`, `priority` (object with `key`/`name`), and `ticketStatus` (object with `key`/`name`).

```js
// Fetch pattern:
const headers = {};
if (typeof Liferay !== 'undefined' && Liferay.authToken) {
    headers['X-CSRF-Token'] = Liferay.authToken;
}

fetch('/o/c/tickets?pageSize=20', {headers})
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        setTickets(data.items || []);
        setLoading(false);
    })
    .catch((err) => {
        setError(err.message);
        setLoading(false);
    });
```

---

## Step 4 — Deploy

```bash
# From inside starter/clarity-ticketing-ui/:
JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu blade gw deploy
```

Confirm the deploy succeeded — either way works:

- **Console log:** look for a line like `STARTED clarity-ticketing-ui_x.x.x [<bundle-id>]` in the Liferay output.
- **File system:** verify the ZIP was hot-deployed:
  ```bash
  # From the workspace root (liferay-course-commerce-dev/):
  ls bundles/osgi/client-extensions/ | grep clarity-ticketing
  # Should show:  clarity-ticketing-ui.zip
  ```

---

## Step 5 — Place on the Tickets page

1. Open the Tickets page in the Clarity Public Enterprise Website.
2. Click **Edit** (pencil icon).
3. In the **Fragments and Widgets** panel, open the **Widgets** tab.
4. Expand the **Client Extensions** category, or search for **Clarity Ticketing UI**.
5. Drag the widget onto the page and click **Publish**.

After placing the widget and publishing the page, reload it.

- **Before completing the TODO:** you should see the **"Clarity Tickets"** heading and the message *"No tickets loaded yet. Complete the TODO in TicketsList.js."*, plus the tab bar (All / Open / In Progress / Closed). This confirms the widget is wired up correctly.
- **After completing the TODO:** the ticket list appears with 10 ticket cards, organized by tabs. The **All** tab shows all 10 tickets; **Open**, **In Progress**, and **Closed** filter by the ticket's `ticketStatus.key` field. Each card shows the subject, description, priority, and status.

> **Note:** You are deploying the **starter** (after completing the TODO). The `solution/` folder is for reference only — do not deploy it.

> **Troubleshooting — widget shows no tickets:** Liferay's headless API requires the `X-CSRF-Token` header (set to `Liferay.authToken`) when called from a session-authenticated browser context. Without it the API treats the request as a guest call and returns an empty list even though tickets exist. If you see "No tickets found." while there are tickets in the Objects admin, check that your fetch includes this header.

---

## Bonus — Configuration property for the title

Add an `instanceProperties` entry in `client-extension.yaml` so the page editor can customise the widget title:

```yaml
clarity-ticketing-ui:
    ...
    instanceProperties:
        -   default: Clarity Tickets
            name: title
            type: String
```

Read the value in `src/index.js` via `this.getAttribute('title')` and pass it as a prop to `App`.

---

## How the custom element works

```
<clarity-ticketing-ui> (HTML custom element)
    └── connectedCallback()
            └── ReactDOM.render(<App />, this)

Liferay loads index.<hash>.js as an ES module.
React and ReactDOM are provided by Liferay (externals in webpack).
Liferay.authToken is injected by the page renderer.
```

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
npm install
npm run build
# Expect: build/static/index.<hash>.js
```

The build must succeed before you proceed. If it fails, check that `JAVA_HOME` is not interfering (`node -v` should work independently).

---

## Step 3 — Implement TicketsList

Open `src/assets/components/TicketsList.js` and replace the TODO with a `useEffect` that:

1. Fetches `GET /o/c/tickets?pageSize=20` using `Liferay.authToken` as a Bearer token.
2. Stores the response `items` array in state.
3. Renders the tickets using the `Ticket` component.

The `Ticket` component expects a `ticket` prop with fields: `id`, `subject`, `description`, `priority` (object with `key`/`name`), and `ticketStatus` (object with `key`/`name`).

```js
// Fetch pattern:
fetch('/o/c/tickets?pageSize=20', {
    headers: {
        Authorization: `Bearer ${Liferay.authToken}`,
    },
})
    .then((res) => res.json())
    .then((data) => setTickets(data.items || []));
```

---

## Step 4 — Deploy

```bash
# From inside starter/clarity-ticketing-ui/:
JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu blade gw deploy
```

Watch the Liferay console for `STARTED clarity-ticketing-ui`.

---

## Step 5 — Place on the Tickets page

1. Open the Tickets page in the Clarity Public Enterprise Website.
2. Click **Edit** (pencil icon).
3. In the **Fragments and Widgets** panel, search for **clarity-ticketing-ui**.
4. Drag it onto the page and **Publish**.

Reload the page as `ian.miller@clarityvisionsolutions.com` and verify the ticket list appears.

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

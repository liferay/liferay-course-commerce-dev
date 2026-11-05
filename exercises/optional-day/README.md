# Optional Day 1 — Liferay Platform Overview

This Optional Day precedes the three-day **Liferay Commerce Developer** course. It introduces the Liferay platform using artefacts and patterns you will reuse throughout the Commerce core.

> **Important:** Everything you create here (the Ticket object, the Tickets page, `clarity-ticketing-ui`) coexists in the same database as the Commerce core. Do not wipe the database between Optional Day and Day 1.

---

## Challenges

| # | Challenge | Skill area |
|---|-----------|-----------|
| 1 | [Find It OOTB](challenge-1-find-it-ootb/README.md) | Platform exploration |
| 2 | [Liferay Workspace](challenge-2-workspace/README.md) | Tooling & deployment |
| 3 | [Create the Ticket Object](challenge-3-ticket/README.md) | Objects (no-code) |
| 4 | [API: Import & Query Tickets](challenge-4-api/README.md) | Headless API |
| 5 | [Custom Element](challenge-5-custom-element/README.md) | React client extension |
| 6 | [Design Elements](challenge-6-design-elements/README.md) | Page builder |

---

## Checkpoint path

If you skip Challenge 3 (building the object by hand), import the pre-built definition from `challenge-3-ticket/checkpoint/` before starting Challenge 4.

---

## Deploy pattern for Challenges 2 and 5

All client extensions in this day are deployed directly from their `exercises/` subfolder — you do **not** copy them to `client-extensions/`.

```bash
# From inside any client extension subfolder (e.g., starter/clarity-ticketing-ui):
JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu blade gw deploy
```

---

## Environment

| Item | Value |
|------|-------|
| Liferay URL | `http://localhost:8080` |
| Admin user | `admin@clarityvisionsolutions.com` / `learn` |
| Business user | `ian.miller@clarityvisionsolutions.com` / `learn` |
| Workspace product | `dxp-2026.q1.2-lts` |
| Java | `~/.sdkman/candidates/java/21.0.10-zulu` (Java 21) |

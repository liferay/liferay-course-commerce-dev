# Challenge 1 — Find It Out of the Box

## Scenario

Before writing a single line of code, Clarity Vision Solutions wants to understand what the Liferay platform provides out of the box so the team can avoid reinventing wheels.

Your goal: explore the platform and identify built-in capabilities that could cover each requirement below, **without** creating any custom code.

---

## Requirements to evaluate

1. **Object storage** — store and manage simple business records (tickets) with custom fields and picklist values.
2. **Headless API** — expose those records via REST and GraphQL without custom endpoints.
3. **Page builder** — place a form and a collection display on a content page so end users can create and browse records.
4. **Display Page Template** — render a single record on its own URL.
5. **Permissions** — restrict who can create, view, or update records.

---

## Steps

### Step 1 — Objects

Go to **Global Menu (⊞) > Control Panel > Objects**.

- Can you create a custom object definition with fields and picklists?
- Does Liferay auto-generate a REST endpoint for your object?
- Find the endpoint in the **API Explorer** (`http://localhost:8080/o/api`).

### Step 2 — Page builder components

Open the **Clarity Public Enterprise Website** in Site Builder > Pages. Create a **blank content page** (you can delete it afterwards).

- Find the **Form Container** fragment. Can it be mapped to an object?
- Find the **Collection Display** fragment. Can it list object entries?

### Step 3 — API Explorer

Open `http://localhost:8080/o/api` and browse to the **c** (custom objects) section.

- Identify the auto-generated endpoints: GET list, GET by ID, POST, PUT, PATCH, DELETE, POST batch.
- Find the **GraphQL** playground and run a simple query against `c { tickets { items { id } } }`.

### Step 4 — Reflection

| Requirement | Built-in solution | Gaps / limitations |
|-------------|------------------|--------------------|
| Object storage | | |
| Headless API | | |
| Page builder | | |
| Display page | | |
| Permissions | | |

Fill in the table based on your exploration. Keep this as a reference for Challenges 3–6.

---

## No files to submit — this challenge is exploratory.

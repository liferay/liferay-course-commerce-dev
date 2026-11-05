# Challenge 2 — Liferay Workspace

## Goal

Bootstrap a Liferay Workspace, deploy a simple client extension from it, and understand how `blade gw deploy` triggers the build pipeline.

---

## Prerequisites

- Java 21 is required. The system default may be Java 25+, which breaks the workspace toolchain.

  ```bash
  # Always set JAVA_HOME before any blade/gradle command in this course:
  export JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu
  java -version   # must print "21.x.x"
  ```

- blade CLI is available at `/home/me/jpm/bin/blade`.

---

## Step 1 — Initialize a workspace

> Skip this step if you are deploying directly from the Commerce course workspace (`/home/me/workspace/liferay-course-commerce-dev`). The course workspace is already configured.

```bash
# In any directory outside the course repos:
blade init -v dxp-2026.q1.2-lts my-liferay-workspace
cd my-liferay-workspace
```

Inspect the generated structure:

| File/dir | Purpose |
|----------|---------|
| `settings.gradle` | Multi-project Gradle root |
| `gradle.properties` | Workspace product version (`liferay.workspace.product`) |
| `client-extensions/` | Default location for client extensions |
| `configs/local/` | Server configuration overrides |

---

## Step 2 — Deploy the sample client extension

The `sample/` folder next to this README is a minimal **Global CSS** client extension with no JavaScript build step.

```bash
cd exercises/optional-day/challenge-2-workspace/sample
JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu blade gw deploy
```

After deploy, reload any page in the Clarity site and confirm the yellow banner appears at the top of the page.

Inspect `sample/client-extension.yaml` to understand:
- The `type: globalCSS` declaration.
- The `assemble` block that maps the static folder to the ZIP.

---

## Step 3 — Understand the build pipeline

Run the deploy with `--info` to see what Gradle tasks run:

```bash
JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu blade gw deploy --info 2>&1 | grep -E "Task|Deploy"
```

Notice that for a `globalCSS` extension there is no Node.js step — the workspace packages the CSS file directly into a `.zip` and hot-deploys it to `configs/local/osgi/client-extensions/`.

---

## Bonus — Global CSS on the Tickets page

The `solution/clarity-global-css/` folder contains a Global CSS client extension with Clarity branding applied specifically to the Tickets page.

1. Deploy it:
   ```bash
   cd exercises/optional-day/challenge-2-workspace/solution/clarity-global-css
   JAVA_HOME=~/.sdkman/candidates/java/21.0.10-zulu blade gw deploy
   ```
2. Navigate to the Tickets page. The page title area should use Clarity's brand colour.
3. Add the client extension to the Tickets page via the **Page Design Options** side panel > **CSS Client Extensions**.

---

## Extra — Two workspaces side by side

If you want to compare the LAD workspace with the Commerce workspace:

```bash
# LAD workspace (read-only)
ls /home/me/workspace/liferay-course-liferay-app-dev/

# Commerce workspace (this course)
ls /home/me/workspace/liferay-course-commerce-dev/
```

Both point to the same running Liferay instance. `blade gw deploy` in either workspace deploys to `http://localhost:8080`.

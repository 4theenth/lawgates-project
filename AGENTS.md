# LawGates Engineering & Development Guidelines

> **Engineering standards, architecture conventions, coding practices, development workflow, and AI-assisted development rules for the LawGates project.**

All developers and AI coding agents working inside this repository **MUST** follow these guidelines unless a task explicitly requires an exception.

---

## 1. Purpose and Scope

LawGates is a legal regulation intelligence platform responsible for managing,
integrating, searching, presenting, and serving legal regulation data and
documents.

This document defines how LawGates code should be:

- structured;
- implemented;
- validated;
- tested;
- documented;
- reviewed;
- maintained; and
- extended.

These guidelines apply to:

- Laravel backend code;
- React frontend code;
- Inertia integration;
- database-related code;
- HTTP and API handling;
- external system integrations;
- authorization;
- asynchronous jobs;
- testing;
- TypeScript code;
- reusable UI components;
- AI-assisted development;
- Git workflow and Pull Requests.

This document defines engineering rules and development behavior.

Detailed implementation documentation for specific modules, integrations, or
infrastructure should be maintained separately when necessary.

---

## 2. Core Engineering Principles

All development should follow these principles:

1. Prefer simple and maintainable solutions.
2. Keep responsibilities separated.
3. Follow the existing architecture before introducing a new one.
4. Reuse existing code before creating new code.
5. Avoid unnecessary abstraction.
6. Avoid duplicated business logic.
7. Keep controllers thin.
8. Keep frontend components focused and reusable.
9. Use explicit and meaningful types.
10. Validate data at the appropriate system boundary.
11. Protect application and user data.
12. Do not introduce dependencies without a clear reason.
13. Make code understandable to developers who did not write it.
14. Keep changes as small and focused as reasonably possible.
15. Every implementation should be verifiable through appropriate checks.

The goal is not to write the smallest amount of code possible.

The goal is to write code that is:

- correct;
- understandable;
- maintainable;
- testable;
- reusable;
- secure; and
- consistent with the architecture.

---

## 3. Application Architecture

LawGates uses Laravel as the backend application framework with React and
Inertia for the frontend.

High-level architecture:

```text
External Systems
        │
        │ Processed data / documents / external information
        ▼
┌─────────────────────────────────────────────┐
│                  LawGates                   │
│                                             │
│ React + Inertia                             │
│        │                                    │
│        ▼                                    │
│ Controllers                                 │
│        │                                    │
│        ▼                                    │
│ Services / Actions                          │
│        │                  │                 │
│        ▼                  ▼                 │
│ PostgreSQL       External Integrations      │
│                                             │
│ Jobs / Application Workers                  │
└─────────────────────────────────────────────┘
```

LawGates is responsible for:

application functionality;
regulation data management;
search;
authorization;
user interface;
document access;
data persistence;
integration with external systems;
application workflows.

The architecture should remain modular so that changes in one responsibility do not unnecessarily affect unrelated parts of the system.

---

## 4. External System Boundary

LawGates may integrate with external systems that provide processed data,
documents, or other required information.

Some upstream processing activities may be handled outside the LawGates
repository.

The implementation of external processing itself is outside the scope of
LawGates unless explicitly required by a task.

For example, if an external system is responsible for document processing,
LawGates should consume the resulting output rather than reimplementing the
same processing functionality internally.

When implementing an external integration:

follow the agreed integration contract;
validate incoming data;
isolate external-system-specific logic;
handle integration failures appropriately;
avoid undocumented assumptions;
keep unrelated application code independent from external-system details.

Do NOT introduce internal implementations of external functionality unless the task explicitly requires them.

---

## 5. MVC Responsibilities

MVC is the foundation of the LawGates backend architecture.

MVC does not mean that all business logic must be placed directly inside Models or Controllers.

Supporting layers may be introduced when they provide clear value.

### Model

Models are responsible for:

representing application data;
defining relationships;
defining casts;
defining scopes;
defining model-specific behavior;
representing persistence-related rules.

Models should not become containers for unrelated application workflows.

### Controller

Controllers are responsible for:

receiving HTTP requests;
invoking validation;
authorizing actions;
calling application/business logic;
returning appropriate responses.

Controllers should remain thin.

### View

The presentation layer is implemented using React and Inertia.

Frontend pages are responsible for:

presenting application data;
coordinating user interaction;
composing reusable components;
handling page-level presentation concerns.

Business rules should not be unnecessarily duplicated in the frontend.

---

## 6. Controller Standards

Controllers should primarily orchestrate requests.

A controller should generally:

receive the request;
authorize the operation;
validate input;
call the appropriate application logic;
return the appropriate response.

Avoid placing large business workflows directly inside controllers.

Avoid:

complex database workflows;
large business calculations;
repeated validation logic;
external integration logic;
unrelated responsibilities.

Controllers should not become "god classes".

---

## 7. Form Request Standards

Use Laravel Form Requests when request validation is meaningful or reusable.

Form Requests should contain:

validation rules;
authorization logic when appropriate;
request-specific validation behavior.

Example:

```php
class StoreRegulationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'document_id' => ['required', 'string'],
        ];
    }
}
```

Avoid placing unrelated business logic inside Form Requests.

Backend validation is authoritative.

Frontend validation may improve user experience but MUST NOT replace backend validation.

---

## 8. Service and Action Standards

Services or Actions may be used for meaningful application or business
operations.

Examples:

ImportProcessedRegulation
SynchronizeRegulationData
GenerateRegulationReport
GenerateDocumentAccessUrl
SynchronizeExternalData

Use a Service or Action when the operation:

contains meaningful business logic;
spans multiple models;
coordinates multiple operations;
interacts with external systems;
would make a controller unnecessarily complex.

Do NOT create abstractions for trivial operations merely to increase the
number of files.

The abstraction should provide a real architectural benefit.

---

## 9. Job Standards

Jobs should be used for operations that are appropriate to run asynchronously.

Examples:

GenerateReportJob
SynchronizeExternalDataJob
ProcessImportedDataJob
SendNotificationJob

Jobs should:

have a clear responsibility;
be safely retryable where appropriate;
handle failures appropriately;
avoid unnecessary database queries;
avoid storing sensitive information in job payloads;
be observable when failure matters.

Jobs may be used for internal asynchronous application operations or external
system synchronization.

Jobs should not become a place to hide unrelated business logic.

---

## 10. Resource and Response Standards

Laravel API Resources or equivalent response transformers should be used when
response transformation provides meaningful value.

Resources should explicitly define what data is exposed to consumers.

Do not expose entire models blindly.

Avoid exposing:

unnecessary internal identifiers;
credentials;
tokens;
secrets;
internal implementation details;
sensitive fields.

Response structures should remain consistent across related endpoints.

---

## 11. Authorization Standards

Authorization MUST be enforced on the backend.

Use appropriate Laravel mechanisms such as:

Policies;
Gates;
middleware;
authorization checks.

Frontend permission checks are only for user experience.

Hiding a button does NOT constitute authorization.

Sensitive operations must have appropriate server-side authorization.

Examples include:

creating records;
modifying regulation metadata;
deleting records;
accessing restricted documents;
generating protected resources;
administrative operations.

---

## 12. Frontend Architecture

The frontend uses React with Inertia.

The main frontend structure should follow:

```
resources/js/
├── components/
├── layouts/
├── pages/
├── hooks/
├── types/
└── utils/
```

### Responsibilities:

- **components/** — Reusable UI components
- **layouts/** — Shared page layouts and structural UI
- **pages/** — Route-level and screen-level components
- **hooks/** — Reusable React-specific logic
- **types/** — Shared TypeScript definitions
- **utils/** — Pure utility functions

Follow the existing project structure before introducing new directories.

Do not create new architectural directories merely because they are common in other projects.

---

## 13. React Page Standards

Pages represent application screens or route-level views.

A page should coordinate:

page-level data;
user interaction;
composition of reusable components;
navigation;
page-specific presentation.

Pages should not contain large reusable UI implementations that could
reasonably exist as components.

If the same UI pattern appears across multiple pages, consider extracting it into a reusable component.

---

## 14. React Component Standards

Components should have a clear responsibility.

Examples:

RegulationCard
RegulationFilters
RegulationTable
DocumentPreview
SearchInput
Pagination
StatusBadge

Avoid large components that handle unrelated responsibilities.

Components should:

have clear inputs;
have predictable behavior;
avoid unnecessary side effects;
remain reusable when reuse is meaningful;
follow existing project conventions.

Split components when doing so improves readability, responsibility, or reuse.

Do not split components merely because a file has reached an arbitrary line count.

---

## 15. Reusable Component Policy

Before creating a new component, **ALWAYS** check whether an existing component already solves the problem.

### Preferred order:

```
1. Reuse
   ↓
2. Extend
   ↓
3. Compose
   ↓
4. Create only when necessary
```

Before creating a component:

search resources/js/components;
inspect similar pages;
inspect existing layouts;
inspect related components;
check whether the desired behavior can be composed from existing pieces.

Avoid duplicate components with slightly different names.

For example, avoid:

PrimaryButton
MainButton
CommonButton
BaseButton
ActionButton

when they represent the same concept.

Prefer one well-defined reusable component with appropriate variants.

---

## 16. Avoid Over-Generalized Components

Reusability does NOT mean every component should support every possible
use case.

Avoid abstractions such as:

UniversalDataTable
UniversalForm
UniversalModal
UniversalCard
UniversalPage

when their abstraction makes the code harder to understand.

Reusable components should represent meaningful shared concepts.

A component should be reusable because its responsibility is genuinely shared, not because every piece of UI is expected to become reusable.

---

## 17. Hooks

Custom React hooks should encapsulate reusable React-specific logic.

Examples:

useDebounce
usePagination
useRegulationFilters
useDocumentViewer

A hook should have a clear responsibility.

Do not create hooks merely to move code into another file.

Pure utility logic that does not depend on React should generally belong in `utils/`.

---

## 18. TypeScript Standards

TypeScript should be used consistently throughout the frontend.

### Rules:

- Avoid `any`
- Avoid `unknown` unless properly narrowed
- Avoid `@ts-ignore`
- Avoid unnecessary type assertions
- Prefer explicit reusable types
- Keep shared types in `resources/js/types`
- Use meaningful type names
- Keep types aligned with actual application data

If `any` is genuinely necessary, document why it is necessary.

**Bad:**
```typescript
const data: any = response.data;
```

**Prefer:**
```typescript
interface Regulation {
    id: string;
    title: string;
}
```

Types should describe actual application data rather than simply silence the TypeScript compiler.

---

## 19. Naming Conventions

Use consistent naming throughout the project.

### PHP

**Classes:** `PascalCase`

Examples:
- `RegulationController`
- `StoreRegulationRequest`
- `RegulationPolicy`
- `ImportProcessedRegulation`

**Methods and variables:** `camelCase`

Examples:
- `storeRegulation()`
- `getRegulation()`
- `$regulationData`

### React / TypeScript

**Components:** `PascalCase`

Examples:
- `RegulationCard`
- `SearchFilters`
- `DocumentViewer`

**Functions and variables:** `camelCase`

Examples:
- `fetchRegulations()`
- `handleSearch()`
- `selectedRegulation`

Use descriptive names.

Avoid vague names such as:

Helper
Common
Misc
Utility
Manager
Handler

unless the name accurately represents a well-defined responsibility.

---

## 20. Function Standards

Functions should:

have one clear responsibility;
use descriptive names;
avoid excessive parameters;
avoid hidden side effects;
return predictable values;
remain reasonably small when possible.

**Prefer:**
```javascript
getFilteredRegulations(filters)
```

**over:**
```javascript
processData(data)
```

Function names should communicate intent.

When a function performs multiple unrelated responsibilities, consider separating those responsibilities.

---

## 21. Code Comments and Documentation

Code should be understandable primarily through:

clear naming;
clear structure;
appropriate separation of responsibility.

Do NOT add comments to every function simply for the sake of documentation.

Comments should explain:

why something is done;
business rules;
non-obvious constraints;
important technical decisions;
workarounds;
integration assumptions.

Avoid comments that merely repeat the code.

**Bad:**
```javascript
// Set loading to true
setLoading(true);
```

**Better:**
```javascript
// Keep the previous results visible while the next search is loading
// to prevent the table from visually jumping between states.
setIsLoading(true);
```

---

## 22. Code Section Documentation

Large files should use clear section markers when they improve readability.

Example:

```javascript
// ─────────────────────────────────────────────
// State
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Data Fetching
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Event Handlers
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────
```

Do not add excessive section markers to small files.

Section markers should make the purpose and structure of a large file easier to understand.

---

## 23. Error Handling

Errors must be handled intentionally.

Do NOT silently ignore errors.

**Avoid:**
```javascript
try {
    await fetchData();
} catch {
}
```

Errors should:

provide useful feedback when appropriate;
be logged when operational visibility is required;
avoid exposing sensitive internal information;
distinguish expected validation failures from unexpected system failures.

Never expose:

stack traces to end users;
database credentials;
API keys;
internal secrets;
sensitive infrastructure information.

---

## 24. Validation

Validation should occur at the appropriate system boundary.

Backend validation is authoritative.

Frontend validation may be used to:

provide faster feedback;
improve UX;
prevent obviously invalid submissions.

Frontend validation MUST NOT be treated as a security boundary.

When receiving data from an external system, LawGates should validate the
received data before persisting or using it.

Validation logic should not be unnecessarily duplicated across layers.

---

## 25. Database Standards

LawGates uses PostgreSQL.

Database changes should be implemented through Laravel migrations.

Migrations should:

have meaningful names;
define appropriate constraints;
define appropriate indexes;
define foreign keys where appropriate;
preserve data integrity.

When changing existing database structures, consider:

existing data;
migration order;
backwards compatibility;
indexing;
query performance.

Do not modify database structure manually when the change should be represented as a migration.

---

## 26. Database Query Standards

Database access should be efficient and intentional.

Avoid:

N+1 queries;
unnecessary queries;
loading unnecessarily large datasets;
selecting unnecessary columns;
duplicated query logic.

Use appropriate Laravel/Eloquent features such as:

eager loading;
scopes;
pagination;
query constraints;
appropriate indexes.

Performance should be considered for:

regulation search;
filtering;
document lists;
relationship-heavy pages;
large datasets.

---

## 27. External Integration Principles

External integrations should be isolated from unrelated application logic.

Integration code should clearly handle:

input expectations;
validation;
mapping;
persistence;
error handling;
synchronization behavior;
retry behavior where appropriate;
idempotency where appropriate.

Do not tightly couple unrelated domain logic to an external system.

External-system-specific assumptions should remain within the appropriate
integration boundary.

If an external contract changes, update the integration layer rather than
spreading external-system-specific changes throughout the application.

Detailed integration specifications should be documented separately when required.

---

## 28. Security Standards

Security is mandatory.

### Never commit:

- `.env`
- API keys
- Passwords
- Access tokens
- Private keys
- Cloud credentials
- Database credentials
- Secret configuration

### Never expose secrets through:

- frontend source code
- API responses
- logs
- exceptions
- Git history

Use environment variables and appropriate server-side configuration for
secrets.

Backend authorization MUST always be enforced for protected resources.

Sensitive data should only be exposed when required by the application.

---

## 29. Dependency Management

Do not add a dependency unless it provides meaningful value.

Before adding a package:

Check whether the framework already provides the functionality.
Check whether an existing dependency already solves the problem.
Consider maintenance and security implications.
Consider frontend bundle size.
Confirm compatibility with the current stack.

Do not upgrade major dependencies as part of an unrelated feature unless the
upgrade is explicitly part of the task.

Dependency changes should be intentional and reviewable.

---

## 30. Linting

All frontend code should pass the configured linting rules.

Before opening a Pull Request, run:

```bash
npm run lint
```

Lint errors MUST be resolved before the Pull Request is considered complete.

Do not disable lint rules merely to make the command pass.

Avoid unnecessary use of:

```javascript
// eslint-disable
```

---

## 31. Type Checking

TypeScript code must pass the project's type-checking command.

Before opening a Pull Request, run:

```bash
npm run types
```

Type errors MUST be resolved.

Do not use:

```typescript
// @ts-ignore
```

as a shortcut for unresolved type problems.

---

## 32. Build Verification

When frontend changes may affect production compilation, run:

```bash
npm run build
```

The build should complete successfully before the Pull Request is considered
ready.

Build failures should not be ignored.

---

## 33. Testing Standards

Backend tests should be run using:

```bash
php artisan test
```

Tests should be added or updated when the change affects:

business rules;
authorization;
validation;
data persistence;
integrations;
important application workflows.

Tests should provide meaningful confidence rather than simply increasing
coverage numbers.

Frontend testing should follow the testing framework established by the
project.

Do not introduce a new frontend testing framework solely for a single small feature unless there is a clear architectural reason.

---

## 34. Test Before Pull Request

Before opening a Pull Request, run the checks relevant to the change.

**Minimum frontend verification:**
```bash
npm run lint
npm run types
```

**When applicable:**
```bash
npm run build
```

**Backend:**
```bash
php artisan test
```

Not every change requires every command, but enough verification should be performed to demonstrate that the change is safe.

---

## 35. Git Standards

LawGates uses Git and GitHub for source control.

**The development integration branch is:**
- `dev`

**The stable/production branch is:**
- `main`

Developers should **NOT** push directly to:
- `dev`
- `main`

unless explicitly authorized.

Development should happen through task-specific branches and Pull Requests.

---

## 36. Branch Strategy

The standard development flow is:

```
main
  │
  └── Stable / Production

dev
  │
  ├── feature/LG-101/auth-login
  ├── feature/LG-102/regulation-search
  ├── bugfix/LG-201/search-pagination
  └── refactor/LG-301/regulation-service
```

### Standard workflow:

1. Switch to `dev`
2. Pull the latest `dev`
3. Create a task branch
4. Implement the task
5. Run verification
6. Commit changes
7. Push the task branch
8. Create Pull Request to `dev`
9. Review and checks
10. Merge to `dev`
11. Release / approval process
12. Merge to `main`

Only the PM or explicitly authorized maintainers should manage releases or merges into `main`.

---

## 37. Branch Naming

Use:

```
<type>/<task-id>/<short-description>
```

**Examples:**
- `feature/LG-101/auth-login`
- `feature/LG-102/regulation-search`
- `bugfix/LG-201/search-pagination`
- `refactor/LG-301/regulation-service`
- `hotfix/LG-401/document-access`

**When no task ID exists:**

```
<type>/<module>/<short-description>
```

**Examples:**
- `feature/auth/login`
- `feature/regulation/search`
- `bugfix/document/access`

### Rules:

- use lowercase
- use kebab-case
- avoid spaces
- keep names concise
- use the task ID when available
- describe the actual purpose of the branch

### Avoid:

- `test`
- `new-feature`
- `fix`
- `update`
- `branch1`
- `my-branch`

---

## 38. Commit Standards

Commit messages should follow:

```
<type>: <description>
```

**Recommended types:**
- `feat`
- `fix`
- `refactor`
- `test`
- `docs`
- `chore`
- `style`
- `perf`

**Examples:**
- `feat: add regulation search`
- `fix: handle empty regulation results`
- `refactor: simplify regulation service`
- `test: add regulation authorization tests`
- `docs: update development guidelines`
- `chore: update frontend dependencies`

Commits should represent meaningful changes.

**Avoid meaningless commit messages such as:**
- `update`
- `fix`
- `changes`
- `test`
- `asdf`

---

## 39. Pull Request Standards

Pull Requests should:

- target `dev` for normal development
- have a clear title
- describe what changed
- explain important implementation decisions
- mention relevant Task IDs
- describe testing performed
- identify known limitations when applicable

**Recommended title:**
```
[LG-102] Add Regulation Search
```

A Pull Request should generally contain one coherent change.

Avoid combining unrelated features, refactors, and fixes in the same Pull Request unless there is a clear reason.

---

## 40. Scope Control

Do not unnecessarily expand the scope of a task.

For example, while implementing regulation search, do not automatically:

redesign unrelated pages;
refactor unrelated services;
upgrade major dependencies;
rename unrelated components;
change unrelated database structures.

If an improvement is discovered outside the task scope:

determine whether it is required for correctness;
implement it only if necessary;
otherwise document it as a separate follow-up task.

The goal is to keep Pull Requests focused and easy to review.

---

## 41. Refactoring Standards

Refactoring should improve code without unnecessarily changing behavior.

Before refactoring:

understand existing behavior;
identify affected dependencies;
determine whether the refactor is actually necessary;
ensure appropriate verification exists.

Prefer incremental refactoring over large unrelated changes.

Do not use a feature task as an excuse to rewrite unrelated parts of the application.

---

## 42. AI Development Workflow

AI coding agents MUST follow a structured workflow before modifying the
repository.

The agent MUST NOT immediately start editing files after receiving a task.

### Required workflow:

```
Understand
    ↓
Inspect
    ↓
Identify Existing Patterns
    ↓
Identify Affected Files
    ↓
Explain Why
    ↓
Create Implementation Plan
    ↓
Implement
    ↓
Verify
    ↓
Report
```

### Step 1 — Understand

The agent must determine:

what the task is asking for;
what behavior is expected;
what is in scope;
what is out of scope;
which application areas may be affected.

If the requirement is ambiguous and the ambiguity could materially change the implementation, ask for clarification rather than inventing requirements.

### Step 2 — Inspect

Before making changes, inspect the relevant existing code.

Look for:

controllers;
models;
Form Requests;
services/actions;
jobs;
policies;
resources;
React pages;
reusable components;
hooks;
types;
utilities;
routes;
migrations;
existing integration patterns.

The purpose is to understand how similar problems are already solved.

### Step 3 — Identify Existing Patterns

Before creating new code, determine whether an existing pattern can be reused.

The agent should ask:

```
Does an existing implementation already solve this?
        │
        ├── Yes → Reuse
        │
        └── No
             ↓
Can it be extended?
        │
        ├── Yes → Extend
        │
        └── No
             ↓
Can existing components be composed?
        │
        ├── Yes → Compose
        │
        └── No → Create new
```

### Step 4 — Identify Affected Files

Before implementation, identify the files expected to be:

modified;
created;
deleted.

Do not include a file merely because it is located near the feature.

Each file should have a clear reason for being changed.

### Step 5 — Explain Why

Before implementation, explain why each affected file needs to change.

For each file, identify:

its role;
why it needs to change;
what type of change will be made;
why the change belongs in that file;
whether an existing file could be reused instead.

**Example:**

#### Planned File Changes

1. RegulationIndexRequest.php

   Why:
   The new filter introduces an additional request parameter that requires
   server-side validation.

2. RegulationSearchService.php

   Why:
   The existing search logic already belongs in this service. The new
   filtering behavior should extend this logic instead of being duplicated
   inside the controller.

3. Regulations/Index.tsx

   Why:
   This is the existing regulation listing page and is the appropriate
   presentation layer for the new filter interaction.

4. RegulationFilters.tsx

   Why:
   The filter UI is a reusable regulation-specific component and should
   remain separate from the page-level implementation.

5. RegulationController.php

   Why:
   No structural change is required if the existing controller already
   delegates the request to the search service.

The agent should explicitly identify files that do not need to change when that helps demonstrate that the scope has been considered.

### Step 6 — Create Implementation Plan

Before coding, create a concise implementation plan.

The plan should contain:

#### Implementation Plan

1. Backend
   - Update request validation.
   - Extend the existing search service.
   - Preserve the existing controller flow.

2. Frontend
   - Reuse the existing filter component.
   - Add only the missing UI behavior.
   - Update the regulation listing page.

3. Testing
   - Add or update relevant backend tests.
   - Run frontend lint and type checking.

The implementation plan should:

be based on inspected code;
remain within task scope;
identify the main implementation steps;
identify the verification steps.

Avoid speculative plans based on files or systems that have not been inspected.

### Step 7 — Implement

After the plan has been established, implement the task.

During implementation:

follow the plan;
reuse existing code;
keep the change focused;
preserve existing behavior unless the task requires otherwise;
avoid unrelated refactoring;
follow all standards in this document.

If implementation reveals that the plan must materially change, explain the reason before proceeding with the new approach.

### Step 8 — Verify

After implementation, the agent MUST verify the changes.

At minimum, run the relevant checks:

```bash
npm run lint
npm run types
```

When applicable:

```bash
npm run build
php artisan test
```

The agent must inspect and resolve relevant failures.

The agent MUST NOT:

- ignore errors
- hide errors
- disable checks merely to make them pass
- use `@ts-ignore` as a shortcut
- remove tests simply because they fail

### Step 9 — Report

After implementation and verification, the agent should provide a concise report containing:

- **Changes Made** — What was implemented
- **Files Changed** — Which files were modified, created, or deleted
- **Why** — The architectural reason for important file changes
- **Verification** — Which commands were executed and their results

**Example:**

```
Changes Made
- Added regulation status filtering.
- Reused the existing filter component.
- Extended the existing search service.

Files Changed
- RegulationIndexRequest.php
- RegulationSearchService.php
- Regulations/Index.tsx
- RegulationFilters.tsx

Verification
- npm run lint       ✓
- npm run types      ✓
- php artisan test   ✓
```

If a verification step could not be run, explicitly state that.

Never imply that a command passed if it was not actually executed.

---

## 43. AI Decision and Scope Rules

AI agents should prefer the smallest correct implementation that fits the existing architecture.

### Before creating new code, prefer:

```
Reuse
  ↓
Extend
  ↓
Compose
  ↓
Create
```

AI agents MUST NOT:

invent requirements;
invent undocumented APIs;
invent undocumented integration contracts;
introduce unnecessary architecture;
create duplicate components;
perform unrelated refactoring;
upgrade dependencies without justification;
modify unrelated files;
bypass validation;
bypass authorization;
implement functionality outside the responsibility of LawGates.

When multiple technically valid approaches exist, prefer the approach that:

matches the existing architecture;
reuses existing code;
minimizes unnecessary changes;
is easy to understand;
is easy to test;
is easy to maintain.

If a broader architectural change is genuinely required, explain why it is necessary.

---

## 44. Definition of Done

A task is considered complete when the following requirements are satisfied.

### ✅ Architecture
- [ ] The implementation follows the existing architecture
- [ ] Responsibilities are placed in the appropriate layer
- [ ] Controllers remain appropriately thin
- [ ] No unnecessary abstraction was introduced
- [ ] Existing reusable components were considered
- [ ] External processing responsibilities remain outside LawGates unless explicitly required

### ✅ Backend
- [ ] Validation is implemented appropriately
- [ ] Authorization is enforced server-side
- [ ] Database queries are reasonable
- [ ] Database changes use migrations where applicable
- [ ] Error handling is appropriate
- [ ] External integrations validate incoming data

### ✅ Frontend
- [ ] Existing reusable components were checked first
- [ ] Components have clear responsibilities
- [ ] TypeScript types are explicit and meaningful
- [ ] No unjustified `any` was introduced
- [ ] No unnecessary duplication exists
- [ ] UI behavior is consistent with existing patterns

### ✅ Code Quality
- [ ] Naming is clear and consistent
- [ ] Code is reasonably structured
- [ ] Comments explain non-obvious reasons where necessary
- [ ] Large files use useful section markers where appropriate
- [ ] No unrelated refactoring was introduced

### ✅ Verification
- [ ] `npm run lint` passes
- [ ] `npm run types` passes
- [ ] `php artisan test` passes when relevant
- [ ] `npm run build` passes when applicable

### ✅ Security
- [ ] No secrets are committed
- [ ] Sensitive data is not unnecessarily exposed
- [ ] Backend authorization is enforced
- [ ] External integrations do not expose credentials or secrets

### ✅ Git
- [ ] Branch follows the naming convention
- [ ] Commit messages follow the project convention
- [ ] Pull Request targets `dev`
- [ ] Pull Request scope is focused
- [ ] Verification results are documented
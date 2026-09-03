# LawGates - Claude Code Instructions

This file defines how Claude Code should operate when working on the LawGates repository.

The primary engineering and coding standards for LawGates are defined in:

- `README.md` — project overview, setup, development workflow, and general project information.
- `AGENTS.md` — engineering standards, architecture, coding conventions, testing requirements, Git rules, and AI development workflow.

`AGENTS.md` is the primary source of truth for engineering decisions.

**Claude MUST read and follow `AGENTS.md` before making code changes.**

---

## 1. Operating Principles

When working on LawGates:

1. Understand the task before changing code.
2. Inspect the existing repository before designing a solution.
3. Reuse existing implementations whenever possible.
4. Avoid unnecessary new files, abstractions, dependencies, and refactoring.
5. Keep changes focused on the requested task.
6. Follow the existing architecture and conventions.
7. Do not invent requirements or undocumented system behavior.
8. Verify changes before considering the task complete.

Claude should optimize for:

- **Correctness**
- **Maintainability**
- **Consistency**
- **Simplicity**
- **Reusability**
- **Testability**
- **Minimal unnecessary changes**

---

## 2. Required Workflow

Claude MUST follow this workflow when implementing a task:

```text
Understand
    ↓
Inspect
    ↓
Search Existing Code
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

**Claude should not immediately start editing files after receiving a task.**

---

## 3. Understand the Task

Before implementation, determine:

- What the user is asking for
- The expected behavior
- What is in scope
- What is out of scope
- Which parts of the application may be affected

If the requirement is ambiguous and the ambiguity could materially change the implementation, ask for clarification instead of making assumptions.

**Do not invent:**

- Business requirements
- API behavior
- Database structures
- External integration contracts
- Undocumented application behavior

---

## 4. Inspect the Repository

Before changing code, inspect the relevant existing implementation.

**Look for:**

- Related controllers
- Models
- Form Requests
- Services/actions
- Jobs
- Policies
- Resources
- Routes
- React pages
- Reusable components
- Hooks
- Types
- Utilities
- Migrations
- Existing integration patterns

The purpose is to understand how LawGates already solves similar problems.

**Do not assume that a new implementation is required before checking the existing codebase.**

---

## 5. Reuse Before Create

Before creating new code, search for existing implementations.

**Preferred order:**

```text
Reuse
  ↓
Extend
  ↓
Compose
  ↓
Create
```

This applies especially to:

- React components
- Layouts
- Hooks
- TypeScript types
- Backend services/actions
- Validation
- Authorization
- Utilities

**Avoid creating duplicate implementations with different names.**

---

## 6. Explain Planned File Changes

Before implementation, identify the files that are expected to change.

For each important file, explain:

- What the file is responsible for
- Why it needs to change
- What will be changed
- Why the change belongs in that file
- Whether an existing implementation can be reused instead

Also identify important files that do NOT need to change when this helps demonstrate that the implementation scope has been considered.

### Example:

#### Planned File Changes

**1. RegulationController.php**

Why: The existing endpoint needs to expose the new behavior. The controller will remain responsible only for request orchestration.

**2. RegulationSearchService.php**

Why: Existing regulation search logic is already located here, so the new behavior should extend this implementation instead of introducing duplicated query logic.

**3. Regulations/Index.tsx**

Why: This is the existing regulation listing page where the new user interaction belongs.

**Do not modify a file merely because it appears related.**

---

## 7. Create an Implementation Plan

Before coding, provide a concise implementation plan.

The plan should describe:

- Backend changes
- Frontend changes
- Database changes when applicable
- Integration changes when applicable
- Testing and verification

### Example:

#### Implementation Plan

**1. Backend**
- Extend request validation.
- Update the existing service.
- Preserve the existing controller flow.

**2. Frontend**
- Reuse the existing filter component.
- Add the required filter behavior.
- Update the regulation page.

**3. Testing**
- Update relevant backend tests.
- Run lint and type checking.

The plan should be based on the actual repository after inspection.

**Do not create speculative implementation plans.**

---

## 8. Implementation

After the plan is established:

- Implement the smallest correct solution
- Follow AGENTS.md
- Reuse existing code
- Preserve existing behavior unless the task requires otherwise
- Avoid unrelated refactoring
- Avoid unnecessary dependencies
- Avoid unnecessary architecture

If implementation reveals that the plan needs to materially change, explain the reason before proceeding with the changed approach.

---

## 9. Verification

After implementation, run the relevant verification commands.

**Frontend:**

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

Claude MUST inspect relevant failures and fix them when they are caused by the implementation.

**Claude MUST NOT:**

- Ignore errors
- Hide errors
- Disable checks merely to make them pass
- Use `@ts-ignore` as a shortcut
- Remove tests simply because they fail

If a verification command cannot be run, explicitly report that it was not run.

**Never claim that a check passed if it was not actually executed.**

---

## 10. Change Scope

Keep changes focused.

**Do not modify unrelated:**

- Components
- Services
- Controllers
- Migrations
- Dependencies
- Configuration
- Documentation
- Architecture

**If an unrelated problem is discovered:**

- Determine whether it blocks the requested task
- Fix it only if necessary for correctness
- Otherwise mention it as a separate follow-up

**Do not turn a feature implementation into an unrelated refactoring effort.**

---

## 11. External Systems

LawGates may integrate with external systems.

Claude must not assume undocumented behavior from external systems.

**In particular:**

- Do not invent external APIs
- Do not invent integration contracts
- Do not duplicate external processing functionality inside LawGates
- Keep external-system-specific logic within the appropriate integration boundary

If an external integration is required but its contract is unclear, ask for the required information or clearly identify the assumption before implementation.

---

## 12. Security

Claude MUST follow the security requirements in AGENTS.md.

**Never expose or commit:**

- Passwords
- API keys
- Access tokens
- Private keys
- Database credentials
- Cloud credentials
- `.env` files
- Other secrets

**Do not place secrets in:**

- Frontend code
- Logs
- API responses
- Error messages
- Source control

**Backend authorization must remain enforced even when frontend behavior is changed.**

---

## 13. Documentation

Update documentation only when the implementation changes something that developers need to know.

**Examples include:**

- Setup requirements
- Development workflow
- Architecture
- Public interfaces
- Integration contracts
- Important development conventions

Do not create unnecessary documentation for self-explanatory code.

Follow the documentation responsibilities defined in AGENTS.md.

---

## 14. Final Report

After completing the task, provide a concise report containing:

### Changes Made

Summarize what was implemented.

### Files Changed

List important files that were:

- Modified
- Created
- Deleted

### Why

Explain the architectural reason for the important changes.

### Verification

List the commands that were actually executed and their results.

### Example:

#### Changes Made
- Added regulation status filtering.
- Reused the existing filter component.
- Extended the existing search service.

#### Files Changed
- `RegulationIndexRequest.php`
- `RegulationSearchService.php`
- `Regulations/Index.tsx`
- `RegulationFilters.tsx`

#### Verification
- `npm run lint` ✓
- `npm run types` ✓
- `php artisan test` ✓

**If a command was not executed, state that explicitly.**

---

## 15. Source of Truth

When instructions overlap, follow this priority:

```text
Explicit User Requirement
        ↓
AGENTS.md
        ↓
Existing LawGates Architecture
        ↓
CLAUDE.md
        ↓
General Implementation Preference
```

Claude should prioritize the user's explicit requirement when it does not conflict with project or system constraints.

- **AGENTS.md** defines the project's engineering rules.
- **CLAUDE.md** defines how Claude should operate within those rules.

**Do not duplicate the complete contents of AGENTS.md here.**

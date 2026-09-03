# LawGates

> **Legal Regulation Intelligence Platform**

LawGates is a legal regulation intelligence platform designed to collect, process, structure, search, and analyze Indonesian legal regulations.

The platform is developed using a Laravel and React-based architecture, with a focus on maintainability, scalability, structured legal data, and AI-assisted development.

<img width="640" height="360" alt="LawGatesTeaser" src="https://github.com/user-attachments/assets/67ff4563-b164-4a9e-8f45-2f8ebaacab86" />

## Table of Contents

- [Project Overview](#project-overview)
- [Project Objectives](#project-objectives)
- [Core Capabilities](#core-capabilities)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Development Requirements](#development-requirements)
- [Initial Setup](#initial-setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Database](#database)
- [Git Workflow](#git-workflow)
- [Branch Strategy](#branch-strategy)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Convention](#commit-convention)
- [Pull Request Workflow](#pull-request-workflow)
- [Development Rules](#development-rules)
- [AI-Assisted Development](#ai-assisted-development)
- [Testing](#testing)
- [Project Status](#project-status)
- [Documentation](#documentation)
- [License](#license)

---

## Project Overview

LawGates is intended to provide a centralized platform for working with Indonesian legal regulations.

The platform focuses on transforming regulatory documents into structured and searchable information.

The general data flow is:

```text
Legal Regulation Sources
        │
        ▼
     Scraping
        │
        ▼
   Document / PDF
        │
        ▼
      OCR
        │
        ▼
    Parsing
        │
        ▼
 Structured Regulation Data
        │
        ├────────────────┐
        ▼                ▼
PostgreSQL Database   Object Storage
        │                │
        └────────┬───────┘
                 ▼
           LawGates API
                 │
                 ▼
          React / Inertia UI
```

The exact implementation of each processing component may evolve during development.

---

## Project Objectives

The main objectives of LawGates are:

- Collect Indonesian legal regulations from relevant sources
- Store regulatory documents in a structured manner
- Store original PDF documents separately from transactional application data
- Perform OCR and document parsing
- Transform regulatory documents into structured data
- Provide search and discovery capabilities
- Establish relationships between regulations and their legal entities
- Provide a maintainable foundation for future legal intelligence features
- Support AI-assisted development while maintaining consistent engineering standards

---

## Core Capabilities

### Regulation Management

- Regulation listing
- Regulation detail
- Regulation metadata
- Regulation classification
- Regulation status
- Regulation versioning

### Document Management

- PDF document storage
- Object Storage integration
- Document metadata
- Secure document access
- Presigned URL-based document access

### Data Processing

- Web scraping
- Document ingestion
- OCR processing
- Document parsing
- Structured JSON generation
- Data validation

### Search

- Regulation search
- Full-text search
- Filtering
- Sorting
- Search by regulation metadata

### Legal Relationship

**Future capabilities may include:**

- Regulation relationships
- Amendments
- Revocations
- References between regulations
- Legal hierarchy
- Graph-based visualization

---

## Technology Stack

### Backend

- PHP 8.3+
- Laravel 13
- Composer

### Frontend

- React
- TypeScript
- Inertia.js
- Vite
- Tailwind CSS

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- Node.js
- npm

### Planned Infrastructure

Additional infrastructure may include:

- Object Storage
- OCR Engine
- Search Engine
- Graph Database

These components will be introduced according to the requirements of each development phase.

---

## System Architecture

LawGates follows a separation of responsibilities between the application layers.

At a high level:

                    ┌─────────────────────┐
                    │      React UI       │
                    │   TypeScript / UI   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Inertia        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Laravel        │
                    │     Application     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        PostgreSQL        Object Storage    Processing
                                             / Jobs / OCR

Detailed architectural rules are maintained separately in:

- `AGENTS.md`
- `CLAUDE.md`

---

## Project Structure

The project follows the standard Laravel structure with additional frontend organization.

```
lawgates-project/
│
├── app/
│   ├── Http/
│   ├── Models/
│   ├── Providers/
│   └── ...
│
├── bootstrap/
│
├── config/
│
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
│
├── public/
│
├── resources/
│   ├── css/
│   ├── js/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── ...
│   └── views/
│
├── routes/
│   ├── web.php
│   └── ...
│
├── storage/
│
├── tests/
│
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── composer.json
├── package.json
└── vite.config.ts
```

The exact internal structure may evolve as the project architecture becomes more mature.

---

## Development Requirements

Before starting development, make sure the following tools are installed.

| Requirement | Version |
|-------------|----------|
| PHP | 8.3+ |
| Composer | 2.x |
| Laravel | 13.x |
| Node.js | 20.19+ or 22.12+ |
| npm | Compatible with Node.js |
| PostgreSQL | Supported project version |
| Git | Latest stable |
| GitHub Account | Required |

Check the installed versions:

```bash
php -v
composer -V
node -v
npm -v
git --version
psql --version
```

---

## Initial Setup

### 1. Clone the Repository

Clone the repository:

```bash
git clone https://github.com/4theenth/lawgates-project.git
```

Move into the project directory:

```bash
cd lawgates-project
```

### 2. Switch to the Development Branch

All development work must be based on the `dev` branch.

```bash
git switch dev
```

Or:

```bash
git checkout dev
```

Always make sure the local `dev` branch is up to date:

```bash
git pull origin dev
```

⚠️ **Do not start development directly from `main`.**

### 3. Install Backend Dependencies

Install Laravel dependencies:

```bash
composer install
```

### 4. Install Frontend Dependencies

Install Node dependencies:

```bash
npm install
```

### 5. Create Environment File

**Windows CMD:**
```cmd
copy .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

### 6. Generate Application Key

```bash
php artisan key:generate
```

### 7. Configure Environment

Update `.env` according to your local environment.

Example PostgreSQL configuration:

```env
APP_NAME=LawGates
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=lawgates
DB_USERNAME=postgres
DB_PASSWORD=
```

⚠️ **Do not commit `.env` into Git.**

### 8. Create PostgreSQL Database

Create a local PostgreSQL database named: `lawgates`

For example, using `psql`:

```sql
CREATE DATABASE lawgates;
```

Make sure the PostgreSQL server is running before executing migrations.

### 9. Run Database Migration

```bash
php artisan migrate
```

If seed data is available:

```bash
php artisan migrate --seed
```

---

## Running the Application

Start the Laravel development server:

```bash
php artisan serve
```

In another terminal, start the frontend development server:

```bash
npm run dev
```

The application will normally be available at:

🌐 **http://localhost:8000**

### Frontend Development

The frontend uses:

- React
- TypeScript
- Inertia.js
- Vite
- Tailwind CSS

Run the development server:

```bash
npm run dev
```

Build the frontend for production:

```bash
npm run build
```

---

## Database

LawGates currently uses: **PostgreSQL**

Laravel's database configuration is defined through the `.env` file.

Example:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=lawgates
DB_USERNAME=postgres
DB_PASSWORD=
```

Database migrations are stored in: `database/migrations/`

Factories: `database/factories/`

Seeders: `database/seeders/`

⚠️ **Database schema changes must be implemented through Laravel migrations.**

⚠️ **Do not manually modify the database schema without an appropriate migration.**

---

## Git Workflow

LawGates uses a controlled Git workflow.

The main branches are:

- `main`
- `dev`

Additional branches are created for individual development tasks.

The basic workflow is:

```text
Task Tracker
     │
     ▼
Create Branch
     │
     ▼
Development
     │
     ▼
Commit
     │
     ▼
Push Branch
     │
     ▼
Pull Request
     │
     ▼
dev
     │
     ▼
Release
     │
     ▼
main
```

---

## Branch Strategy

### main

`main` represents the stable and production-ready codebase.

**Rules:**

- `main` is managed by the PM
- Developers must not push directly to `main`
- Developers must not merge directly into `main`
- Feature development must never be based directly on `main`
- Changes to `main` must go through the approved release process
- `main` should always contain stable code

Developers may still have read access to `main` depending on their GitHub repository permissions.

```text
main
│
└── Stable / Production
```

### dev

`dev` is the primary development and integration branch.

**Rules:**

- All development tasks start from `dev`
- Feature branches are created from `dev`
- Pull Requests from development branches target `dev`
- Developers should not push directly to `dev`
- Changes must be reviewed before being merged
- `dev` contains the latest integrated development work

```text
dev
│
├── feature/*
├── bugfix/*
├── refactor/*
└── hotfix/*
```

---

## Branch Naming Convention

Every task should have its own development branch.

The recommended naming convention is:

```
<type>/<task-id>/<short-description>
```

For example:

```
feature/LG-101/auth-login
feature/LG-102/regulation-search
feature/LG-103/regulation-detail
```

The `task-id` should correspond to the ID in the team's Task Tracker.

This allows the team to trace the relationship between:

```text
Task Tracker
     │
     ▼
   Branch
     │
     ▼
  Commit
     │
     ▼
 Pull Request
     │
     ▼
    dev
```

### Branch Types

#### feature

Used for developing new functionality.

```
feature/LG-101/auth-login
feature/LG-102/regulation-search
feature/LG-103/regulation-detail
```

#### bugfix

Used to fix bugs found during development or testing.

```
bugfix/LG-201/login-validation
bugfix/LG-202/search-pagination
```

#### refactor

Used for restructuring or improving existing code without changing the intended functionality.

```
refactor/LG-301/regulation-service
refactor/LG-302/frontend-components
```

#### hotfix

Used for urgent fixes that require immediate attention.

```
hotfix/LG-401/auth-session
hotfix/LG-402/document-access
```

⚠️ **Hotfix branches should only be used for urgent issues.**

### Branch Naming Rules

Branch names must:

- Use lowercase
- Use kebab-case for descriptions
- Include the Task ID whenever available
- Be short and descriptive
- Describe the actual feature, bug, or technical change
- Never contain spaces

**✅ Recommended:**

```
feature/LG-101/auth-login
feature/LG-102/regulation-search
bugfix/LG-201/search-pagination
refactor/LG-301/regulation-service
```

**❌ Avoid:**

```
feature/new
feature/testing
feature/fix
feature/my-branch
feature/new-feature-final
```

### Starting a New Task

Before starting a task, make sure the local `dev` branch is up to date.

```bash
git switch dev
git pull origin dev
```

Create a branch for the task:

```bash
git switch -c feature/LG-101/auth-login
```

Then begin development.

### Keeping a Feature Branch Updated

The `dev` branch may continue receiving changes while you work.

Update your local `dev` branch:

```bash
git switch dev
git pull origin dev
```

Return to your feature branch:

```bash
git switch feature/LG-101/auth-login
```

Synchronize the feature branch with `dev`.

The project should use one agreed synchronization strategy consistently, such as merge or rebase.

Example using rebase:

```bash
git rebase dev
```

Resolve conflicts if necessary before continuing development.

---

## Commit Convention

Commits should clearly describe the change being made.

Recommended format:

```
<type>: <description>
```

Examples:

```
feat: add regulation search
fix: resolve regulation pagination issue
refactor: simplify regulation service
docs: update project README
test: add regulation search tests
chore: update frontend dependencies
```

### Microcommit Practice

**Make small, focused commits frequently** — avoid "god commits" that bundle many unrelated changes.

✅ **Good Practice:**

```bash
git add app/Http/Controllers/RegulationController.php
git commit -m "feat: add regulation search endpoint"

git add resources/js/pages/RegulationSearch.tsx
git commit -m "feat: add regulation search UI component"

git add tests/Feature/RegulationSearchTest.php
git commit -m "test: add regulation search tests"
```

❌ **Avoid:**

```bash
git add .
git commit -m "feat: add regulation search feature"
# (includes controller, UI, tests, config changes, unrelated files)
```

**Benefits of microcommits:**

- Easier to review in Pull Requests
- Easier to understand the development flow
- Easier to revert specific changes if needed
- Better git history and blame tracking
- Clearer intention of each change

**When to commit:**

- After completing a logical unit of work (one function, one component, one fix)
- After adding or modifying tests
- After updating documentation related to the change
- Before switching to a different task or approach

**Commit frequency guideline:**

Commit every 15-30 minutes of focused work, or whenever you complete a self-contained change.

### Commit Types
```
| Type | Purpose |
|------|----------|
| `feat` | New functionality |
| `fix` | Bug fix |
| `refactor` | Code restructuring |
| `test` | Adding or modifying tests |
| `docs` | Documentation changes |
| `chore` | Maintenance / tooling |
| `style` | Formatting or styling |
| `perf` | Performance improvement |
```
---

## Pull Request Workflow

All development work must go through a Pull Request.

The standard workflow is:

```text
dev
 │
 ├──► feature/LG-101/auth-login
 │
 │    Development
 │
 └──────────────► Pull Request
                         │
                         ▼
                        dev
```

### Step 1 — Create Branch

Start from the latest `dev`:

```bash
git switch dev
git pull origin dev
git switch -c feature/LG-101/auth-login
```

### Step 2 — Develop

Implement the assigned task.

Keep changes within the scope of the assigned Task Tracker item.

### Step 3 — Test

Run the relevant tests and development checks.

Make sure the application still works as expected.

### Step 4 — Commit

Example:

```bash
git add .
git commit -m "feat: add authentication login"
```

### Step 5 — Push Branch

```bash
git push -u origin feature/LG-101/auth-login
```

### Step 6 — Create Pull Request

Create the Pull Request with:

**Source:** `feature/LG-101/auth-login`

**Target:** `dev`

⚠️ **Never create a normal feature Pull Request directly into `main`.**

### Step 7 — Pull Request Title

Pull Request titles should contain the Task Tracker ID.

Recommended format:

```
[LG-101] Add Authentication Login
```

Examples:

```
[LG-102] Add Regulation Search
[LG-103] Add Regulation Detail
[LG-201] Fix Search Pagination
```

This makes it easier to connect GitHub activity with the project's Task Tracker.

### Step 8 — Code Review

The Pull Request should be reviewed before merging.

The review should consider:

- Functional correctness
- Code quality
- Architecture
- Security
- Validation
- Error handling
- Testing
- Performance
- Naming conventions
- Maintainability
- Scope of changes

### Step 9 — Merge to dev

After the required review and checks are completed, the Pull Request can be merged into: `dev`

---

## Release Flow

The release flow is:

```text
feature/*
bugfix/*
refactor/*
hotfix/*
      │
      │ Pull Request
      ▼
     dev
      │
      │ Release / Approval
      ▼
     main
```

Developers work against `dev`.

`main` is reserved for stable releases and is managed by the PM.

The exact release procedure may evolve as deployment and CI/CD infrastructure are finalized.

---

## GitHub Branch Protection

The GitHub repository should enforce branch protection rules.

### main

Recommended rules:

- Require Pull Request before merging
- Require approval
- Require required status checks
- Prevent direct pushes for developers
- Restrict merge permission to PM / authorized maintainers
- Prevent force pushes
- Prevent branch deletion

### dev

Recommended rules:

- Require Pull Request before merging
- Require code review
- Require required status checks
- Prevent direct pushes
- Prevent force pushes

These rules should be configured through the GitHub repository settings.

---

## Development Rules

All contributors should follow the engineering standards defined in: **`AGENTS.md`**

The main principles include:

- Follow the existing project architecture
- Avoid unnecessary changes outside the assigned task
- Keep features modular
- Keep controllers thin
- Validate user input
- Handle errors explicitly
- Avoid duplicating business logic
- Write tests for important application behavior
- Do not commit secrets
- Do not commit `.env`
- Do not commit generated dependencies such as `node_modules`
- Do not introduce dependencies without a clear reason
- Keep frontend and backend responsibilities separated
- Prefer readable and maintainable code over premature optimization

---

## AI-Assisted Development

LawGates allows the use of AI-assisted development tools.

Examples include:

- Claude Code
- GitHub Copilot
- ChatGPT
- Other approved AI development tools

AI-generated code must still follow the project's engineering standards.

Before making changes, AI coding agents should read: **`AGENTS.md`**

Claude-specific instructions are maintained in: **`CLAUDE.md`**

AI-generated code must be reviewed by the developer before committing.

AI tools must not be treated as a replacement for:

- Code review
- Testing
- Security review
- Architecture decisions
- Developer responsibility

---

## Testing

Backend tests can be executed using:

```bash
php artisan test
```

Frontend testing commands will be documented when the project's frontend testing framework is finalized.

Before creating a Pull Request, developers should ensure that:

- The application runs successfully
- Relevant tests pass
- No unintended files are committed
- No secrets are exposed
- The implementation follows `AGENTS.md`
- The branch is based on the latest appropriate `dev` state

---

## Project Status

LawGates is currently under active development.

The repository structure, architecture, and technology choices may evolve during development.

Major architectural decisions should be documented when finalized.

---

## Documentation

Current key documents:

- `README.md`
- `AGENTS.md`
- `CLAUDE.md`

Additional technical documentation may be added under: `docs/`

Possible documentation structure:
```
docs/
├── architecture/
├── database/
├── api/
├── deployment/
└── development/
```
The documentation structure should remain simple until there is a clear need for additional documents.

---

## License

This project is proprietary and intended for authorized development and use only.

Copyright © LawGates Project.

# Contributing to Eventra

Thank you for contributing to Eventra! To maintain a clean and reliable codebase, please adhere to these coding and architecture guidelines.

## Branch Naming Convention
- Features: `feature/name-of-feature`
- Bugfixes: `bugfix/name-of-bug`
- Refactoring: `refactor/name-of-refactor`

## Commit Messages
Use the following prefix conventions:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `refactor:` for code cleanups/refactoring
- `test:` for adding/updating tests
- `chore:` for build system/dependencies

## Backend (Django REST Framework)
Follow the layered pattern for apps:
1. **API Views**: Handle request parameters and serialization. Must remain thin.
2. **Services**: Contain business logic (writes/mutations).
3. **Selectors**: Read queries from models (read-only).
4. **Models**: Light declarations representing tables, constraints, and relationships.

## Frontend (React)
- Strictly feature-based directories.
- Always use the Axios client (`src/shared/api`) for network queries; never use `fetch` directly from pages.
- Handle loading, success, and error states gracefully in components.

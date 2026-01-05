# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants (like Claude) working with this codebase. It covers structure, conventions, workflows, and best practices to ensure efficient and consistent development.

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Codebase Structure](#codebase-structure)
3. [Development Workflows](#development-workflows)
4. [Code Conventions](#code-conventions)
5. [Testing Guidelines](#testing-guidelines)
6. [Git Workflow](#git-workflow)
7. [AI Assistant Best Practices](#ai-assistant-best-practices)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)

---

## Repository Overview

### Purpose
<!-- Describe the primary purpose and goals of this project -->
This repository contains [PROJECT DESCRIPTION].

### Key Technologies
<!-- List the main technologies, frameworks, and tools used -->
- **Language**: [e.g., TypeScript, Python, Go]
- **Framework**: [e.g., React, Node.js, Django]
- **Build Tool**: [e.g., Webpack, Vite, Make]
- **Package Manager**: [e.g., npm, yarn, pip, cargo]
- **Testing**: [e.g., Jest, pytest, Go test]
- **Linting**: [e.g., ESLint, pylint, golangci-lint]

### Quick Start

```bash
# Clone the repository
git clone [REPOSITORY_URL]
cd [REPOSITORY_NAME]

# Install dependencies
[INSTALL_COMMAND]

# Run development server
[DEV_COMMAND]

# Run tests
[TEST_COMMAND]

# Build for production
[BUILD_COMMAND]
```

---

## Codebase Structure

### Directory Layout

```
.
├── src/                # Source code
│   ├── components/     # Reusable components
│   ├── services/       # Business logic and API services
│   ├── utils/          # Utility functions and helpers
│   ├── types/          # Type definitions
│   └── config/         # Configuration files
├── tests/              # Test files
├── docs/               # Documentation
├── scripts/            # Build and automation scripts
├── public/             # Static assets
└── config/             # Project configuration
```

### Key Files

| File | Purpose |
|------|---------|
| `package.json` / `Cargo.toml` / `requirements.txt` | Dependencies and project metadata |
| `tsconfig.json` / `setup.py` / `go.mod` | Language/build configuration |
| `.env.example` | Environment variable template |
| `README.md` | Project documentation |
| `CONTRIBUTING.md` | Contribution guidelines |

### Module Organization

<!-- Describe how code is organized into modules/packages -->
- **Feature-based**: Code organized by feature/domain
- **Layer-based**: Organized by architectural layer (presentation, business, data)
- **Hybrid**: Combination of both approaches

---

## Development Workflows

### Setting Up Development Environment

1. **Prerequisites**
   ```bash
   # Required software versions
   # Node.js: >= 18.x
   # Python: >= 3.9
   # Go: >= 1.21
   ```

2. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env

   # Edit .env with appropriate values
   # KEY_NAME=value
   ```

3. **Dependency Installation**
   ```bash
   # Install all dependencies
   [INSTALL_COMMAND]
   ```

### Running the Application

```bash
# Development mode with hot reload
[DEV_COMMAND]

# Production mode
[PROD_COMMAND]

# With specific configuration
[CONFIG_COMMAND]
```

### Building

```bash
# Development build
[DEV_BUILD_COMMAND]

# Production build (optimized)
[PROD_BUILD_COMMAND]

# Clean build artifacts
[CLEAN_COMMAND]
```

---

## Code Conventions

### Naming Conventions

- **Files**: `kebab-case.ts`, `snake_case.py`, `PascalCase.go`
- **Variables**: `camelCase` (JS/TS), `snake_case` (Python), `camelCase` (Go)
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes**: `PascalCase`
- **Functions**: `camelCase` (JS/TS), `snake_case` (Python), `PascalCase` for exported (Go)
- **Interfaces/Types**: `PascalCase`, prefix with `I` if applicable

### Code Style

```typescript
// TypeScript/JavaScript Example
export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export function getUserProfile(userId: string): Promise<UserProfile> {
  // Implementation
}
```

```python
# Python Example
class UserProfile:
    def __init__(self, user_id: str, name: str, email: str):
        self.user_id = user_id
        self.name = name
        self.email = email

def get_user_profile(user_id: str) -> UserProfile:
    """Retrieve user profile by ID."""
    # Implementation
```

### Project-Specific Patterns

1. **Error Handling**
   - Use custom error types/classes
   - Always handle errors explicitly
   - Log errors with appropriate context
   - Never swallow exceptions silently

2. **Async Operations**
   - Use async/await consistently
   - Handle promise rejections
   - Implement proper timeout handling

3. **State Management**
   - [Describe state management approach]
   - Keep state immutable where possible
   - Use appropriate state management libraries

4. **API Design**
   - RESTful conventions or GraphQL schema
   - Consistent response formats
   - Proper HTTP status codes
   - API versioning strategy

---

## Testing Guidelines

### Test Structure

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data and mocks
```

### Testing Conventions

1. **Unit Tests**
   ```typescript
   // test-file.test.ts
   describe('FunctionName', () => {
     it('should do something specific', () => {
       // Arrange
       const input = 'test';

       // Act
       const result = functionName(input);

       // Assert
       expect(result).toBe('expected');
     });
   });
   ```

2. **Test Coverage**
   - Aim for 80%+ coverage on business logic
   - 100% coverage on critical paths
   - Focus on meaningful tests over coverage metrics

3. **Mocking**
   - Mock external dependencies
   - Use dependency injection for testability
   - Avoid over-mocking internal implementations

### Running Tests

```bash
# Run all tests
[TEST_COMMAND]

# Run specific test file
[TEST_FILE_COMMAND]

# Run with coverage
[COVERAGE_COMMAND]

# Run in watch mode
[WATCH_COMMAND]
```

---

## Git Workflow

### Branch Strategy

- **`main`** / **`master`**: Production-ready code
- **`develop`**: Integration branch for features
- **`feature/`**: New features (`feature/user-authentication`)
- **`fix/`**: Bug fixes (`fix/login-error`)
- **`hotfix/`**: Critical production fixes
- **`claude/`**: AI assistant generated changes (requires session ID suffix)

### Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat(auth): add OAuth2 authentication flow
fix(api): resolve race condition in user service
docs(readme): update installation instructions
refactor(database): optimize query performance
```

### Pull Request Guidelines

1. **Before Creating PR**
   - Ensure all tests pass
   - Update documentation
   - Follow code style guidelines
   - Rebase on latest main/develop

2. **PR Description Template**
   ```markdown
   ## Summary
   Brief description of changes

   ## Changes Made
   - Change 1
   - Change 2

   ## Testing
   - [ ] Unit tests added/updated
   - [ ] Integration tests pass
   - [ ] Manual testing completed

   ## Related Issues
   Fixes #123
   ```

3. **Review Process**
   - At least one approval required
   - All CI checks must pass
   - No merge conflicts
   - Documentation updated

---

## AI Assistant Best Practices

### When Working with This Codebase

1. **Always Read Before Modifying**
   - Never propose changes to code you haven't read
   - Understand existing patterns before adding new code
   - Check for similar implementations elsewhere

2. **Maintain Consistency**
   - Follow existing code style and patterns
   - Use the same libraries/approaches as existing code
   - Match the project's architectural decisions

3. **Avoid Over-Engineering**
   - Make only requested changes
   - Don't add unnecessary features
   - Keep solutions simple and focused
   - Don't refactor unrelated code

4. **Security First**
   - Watch for common vulnerabilities (SQL injection, XSS, etc.)
   - Validate user input at boundaries
   - Use parameterized queries
   - Avoid exposing sensitive data

5. **Testing Requirements**
   - Add tests for new functionality
   - Update tests when modifying existing code
   - Ensure tests pass before committing
   - Write meaningful test descriptions

6. **Documentation**
   - Update relevant documentation with code changes
   - Add comments only where logic isn't self-evident
   - Keep CLAUDE.md updated with structural changes

### Using Tools Effectively

1. **File Operations**
   - Use `Read` before `Edit` or `Write`
   - Use `Glob` for finding files by pattern
   - Use `Grep` for searching code content
   - Prefer specialized tools over bash commands

2. **Code Search**
   - Use `Task` tool with `Explore` agent for open-ended searches
   - Use `Grep` for specific patterns
   - Search before creating duplicate functionality

3. **Git Operations**
   - Always work on feature branches
   - Commit with clear, conventional messages
   - Push to `claude/` prefixed branches with session ID
   - Use `git push -u origin <branch-name>`

### Common Pitfalls to Avoid

- Don't create files unless absolutely necessary
- Don't add emojis unless explicitly requested
- Don't make backwards-compatibility hacks
- Don't add error handling for impossible scenarios
- Don't create abstractions for one-time operations
- Don't design for hypothetical future requirements
- Don't add TODOs or placeholder comments

---

## Common Tasks

### Adding a New Feature

1. Create feature branch from develop
   ```bash
   git checkout -b feature/feature-name develop
   ```

2. Implement feature following conventions
   - Read related existing code
   - Follow established patterns
   - Write tests alongside implementation

3. Test thoroughly
   ```bash
   [TEST_COMMAND]
   ```

4. Commit and push
   ```bash
   git add .
   git commit -m "feat(scope): description"
   git push -u origin feature/feature-name
   ```

5. Create pull request

### Fixing a Bug

1. Create fix branch
   ```bash
   git checkout -b fix/bug-description
   ```

2. Identify root cause
   - Review error logs
   - Add reproduction test
   - Debug systematically

3. Implement fix
   - Minimal change to resolve issue
   - Add regression test
   - Verify fix works

4. Commit and push
   ```bash
   git commit -m "fix(scope): description of bug fix"
   git push -u origin fix/bug-description
   ```

### Refactoring Code

1. Ensure tests exist and pass
2. Make incremental changes
3. Run tests after each change
4. Commit frequently with clear messages
5. Don't change functionality

### Updating Dependencies

```bash
# Check for outdated dependencies
[CHECK_OUTDATED_COMMAND]

# Update specific dependency
[UPDATE_SPECIFIC_COMMAND]

# Update all dependencies (carefully)
[UPDATE_ALL_COMMAND]

# Run tests after updating
[TEST_COMMAND]
```

---

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache and rebuild
[CLEAN_COMMAND]
[BUILD_COMMAND]

# Check for dependency issues
[INSTALL_COMMAND]
```

#### Test Failures

```bash
# Run specific failing test with verbose output
[VERBOSE_TEST_COMMAND]

# Clear test cache
[CLEAR_TEST_CACHE_COMMAND]
```

#### Development Server Issues

```bash
# Check port availability
[CHECK_PORT_COMMAND]

# Kill existing processes
[KILL_PROCESS_COMMAND]

# Restart with fresh state
[RESTART_COMMAND]
```

### Getting Help

- Check existing documentation in `docs/`
- Review related issues on GitHub
- Consult team members or maintainers
- Search codebase for similar implementations

---

## Appendix

### Useful Commands Reference

```bash
# Development
[DEV_COMMANDS]

# Testing
[TEST_COMMANDS]

# Building
[BUILD_COMMANDS]

# Git
git status
git log --oneline -10
git diff
git branch -a

# Debugging
[DEBUG_COMMANDS]
```

### External Resources

- [Project Documentation](docs/)
- [API Documentation](docs/api/)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

---

## Changelog

### Document Updates

- **2026-01-05**: Initial CLAUDE.md creation
- Update this section when making significant changes to this guide

---

## Notes for AI Assistants

This document is specifically designed to help AI assistants work effectively with this codebase. When in doubt:

1. **Ask clarifying questions** rather than making assumptions
2. **Read existing code** to understand patterns
3. **Make minimal changes** that directly address the request
4. **Test thoroughly** before marking tasks complete
5. **Update documentation** when making structural changes

Remember: The goal is to maintain a clean, consistent, and maintainable codebase that follows established patterns and conventions.

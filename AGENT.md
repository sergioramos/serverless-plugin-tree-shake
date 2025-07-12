# serverless-plugin-tree-shake

## Project Overview

A Serverless Framework plugin that optimizes deployment packages by analyzing dependency trees and only including necessary files. Uses `@vercel/nft` for dependency tracing and reduces bundle sizes from thousands of files to dozens by eliminating unused files.

## Build & Commands

### Development Commands
- `yarn test` - Run AVA tests with 5-minute timeout
- `yarn benchmark` - Run performance benchmarks
- `yarn eslint` - Lint JavaScript files
- `yarn fmt` - Format code with Prettier

### Testing Commands
- `yarn test` - Execute all test scenarios in `test/index.js`
- Tests cover TypeScript/JavaScript, Yarn PnP/node_modules, individual/single packaging variations

## Code Style

### Formatting Rules
- Prettier config: 2 spaces, single quotes, trailing commas, 80 char width
- ESLint extends: eslint:recommended, xo-space/esnext, prettier

### Naming Conventions
- Variables: camelCase
- Constants: UPPER_CASE
- Files: kebab-case for test fixtures

### Best Practices
- Husky pre-commit hooks enforce lint-staged formatting
- No new-cap, camelcase, or capitalized-comments rules

## Testing

### Testing Framework
- AVA test framework with 5-minute timeout
- Test files: `test/index.js` only

### Conventions
- Test fixtures in `test/__fixtures__/` with naming pattern: `{js|ts}-{nm|pnp}-{individually|single}`
- Setup via `test/setup.js` links plugin files and cleans cache
- Tests use snapshots for file tree and output validation

### Execution Guidelines
- Run `yarn test` to execute all scenarios
- Tests simulate real Serverless projects with different configurations

## Security

### Security Considerations
- Only processes Node.js runtimes (checks `/^nodejs/` pattern)
- Falls back to native packaging for other runtimes
- Uses `path-is-inside` for path validation to prevent traversal attacks

### Data Protection Guidelines
- Handles symlinks carefully to prevent path traversal
- Validates file paths before processing
- Caches are scoped to prevent cross-contamination

## Architecture

### Technology Stack
- Node.js with Serverless Framework
- `@vercel/nft` for dependency tracing
- TypeScript support with conditional loading
- Yarn PnP compatibility

### Key Frameworks and Tools
- Serverless Framework plugin architecture
- AVA for testing
- Prettier + ESLint for code quality
- Husky for Git hooks

### Design Patterns
- Single class extending Serverless packaging services
- Hook-based lifecycle integration
- Caching pattern for transpiled files and symlinks
- Fallback resolution for module loading

## Configuration

### Environment Setup
- Node.js project with Yarn
- TypeScript peer dependency (optional)
- Serverless Framework peer dependency

### Configuration Management
- Plugin configuration via `serverless.yml`
- Package settings: `excludeDevDependencies: false`
- Supports `package.individually: true`

### Key Configuration Points
- Runtime detection for Node.js only
- File extension handling: `.tsx`, `.ts`, `.node`, `.mjs`, `.cjs`, `.js`
- Symlink and PnP support detection

## Git Workflow

This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification with [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) rules.

### Commit Message Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Allowed Types
- `build`: Changes to build system or external dependencies
- `chore`: Routine tasks, maintenance, or tooling changes
- `ci`: Changes to CI/CD configuration files and scripts
- `docs`: Documentation changes
- `feat`: New features
- `fix`: Bug fixes
- `perf`: Performance improvements
- `refactor`: Code refactoring without feature changes
- `revert`: Revert previous commits
- `style`: Code style changes (formatting, missing semi-colons, etc.)
- `test`: Adding or modifying tests

### Rules
- Type must be lowercase and from the allowed list
- Subject cannot be empty or end with a period
- Use lowercase for subject (no sentence-case, start-case, pascal-case, or upper-case)
- Maximum header length: 100 characters
- Maximum body/footer line length: 100 characters
- Body and footer should have leading blank lines
- Use `!` after type/scope or `BREAKING CHANGE:` footer for breaking changes

### Examples
```
feat: add user authentication
fix(auth): resolve password reset bug
docs: update API documentation
feat!: redesign user interface (breaking change)
chore: upgrade dependencies
```

### Semantic Versioning Mapping
- `fix:` → PATCH release (0.0.1)
- `feat:` → MINOR release (0.1.0)
- Breaking changes → MAJOR release (1.0.0)

### Additional Guidelines
- Do NOT include "🤖 Generated with <agent name (e.g. "Claude Code")>" footer in commit messages
- Do NOT include "Co-Authored-By: <agent name (e.g. "Claude")> <email>" footer in commit messages
- Keep commit messages clean and focused on the changes made

### Branch Management
- Main branch: `main`
- Standard GitHub flow for contributions

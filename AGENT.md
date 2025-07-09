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

### Commit Guidelines
- Conventional commits via `@commitlint/config-conventional`
- Pre-commit hooks run lint-staged
- Commit message validation via Husky

### Branch Management
- Main branch: `master`
- Standard GitHub flow for contributions
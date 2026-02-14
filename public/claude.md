# Logtrail Integration Guide for Claude

This guide is optimized for Claude (Anthropic) to help it integrate Logtrail into projects.

<logtrail_api_context>
## Authentication
- **Base URL**: `https://api.logtrail.net/api/v1/workspace`
- **Auth Header**: `X-API-Key: <YOUR_KEY>`
- **Environment Prefixes**: `lt_development_` (Dev), `lt_staging_` (Staging), `lt_production_` (Prod).

## Core Capabilities
- **Info**: `GET /info` (Metadata about project/plan).
- **Usage**: `GET /usage` (Current consumption summary).
- **Validation**: `POST /logs/validate` (Dry-run for single/batch).
- **Ingestion**: `POST /logs` (JSON) or `POST /logs/bulk` (Array of JSON).
- **Search**: `POST /logs/query` using LCQL.

## LCQL Syntax
Facet-based: `column:operator:value`
- `level=error`
- `actor.email~"admin*"`
- `message@"timeout"`
- `timestamp > "2026-02-14T00:00:00Z"`

## System Guardrails
- **Plan Tiers**: Limits are determined by the plan (Free, Dev, Pro). **Subject to change.**
- **Max Log Size**: 700B (Free) to 2KB (Pro).
- **Max Batch Size**: 50 (Free) to 1,000 (Pro).
- Enforce RFC3339 for `clientTimestamp`.
</logtrail_api_context>

<integration_task_patterns>
### Task: Adding Logtrail to a Node.js project
Use the `/logs` endpoint via `fetch` or `axios`. Wrap in a lightweight transport function.

### Task: Generating a Search Query
Always prefer facets over general search for performance. 
Example: `query: 'action="user.signup" metadata.plan="pro"'`
</integration_task_patterns>

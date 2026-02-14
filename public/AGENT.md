# Logtrail AI Agent Guide

This document is specifically designed for AI agents and vibe coding tools to help them integrate Logtrail into applications effectively.

## Core Integration Patterns

### 1. Ingestion (Write)
To send logs to Logtrail, use the `/logs` or `/logs/bulk` endpoints.
- **Header**: `X-API-Key: <YOUR_KEY>`
- **Content-Type**: `application/json`
- **Schema**: See `openapi.yaml` for `CreateLogRequest`.
- **Validation**: Use `POST /logs/validate` for dry-run testing of payloads.

### 2. Querying (Read)
To retrieve logs, use the `/logs/query` endpoint with the Logtrail Custom Query Language (LCQL).
- **Endpoint**: `POST /logs/query`
- **Body**: `{ "query": "level=error actor.id=user_123" }`

### 3. Metadata & Discovery (Read)
- **Workspace Info**: `GET /info` returns project, organization, and API key scope.
- **Usage**: `GET /usage` returns current ingestion vs plan limits.

## Custom Query Language (LCQL) Reference

AI agents should use LCQL facets for precise filtering:
- `column=value`: Exact match.
- `column~"value*"`: Partial match (Trigram).
- `jsonb.field="value"`: Dot notation for nested metadata.
- `column@value`: Full-text search.

## System Guardrails
- **Plan Tiers**: Limits vary by tier (Free, Dev, Pro). **Subject to change.** Always check plan-specific constraints.
- **Max Payload**: 700B to 2KB depending on plan.
- **Max Batch**: 50 to 1,000 logs depending on plan.
- **Rate Limits**: Respect `X-RateLimit-Remaining` headers.

## Reference Material
- **OpenAPI Spec**: [openapi.yaml](./openapi.yaml)
- **Technical Roadmap**: [llms.txt](./llms.txt)

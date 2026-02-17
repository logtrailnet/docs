# Logtrail AI Agent Guide

This document is specifically designed for AI agents and vibe coding tools to help them integrate Logtrail into applications effectively.

> **CRITICAL**: Before providing plan-specific guidance (e.g., ingestion limits, retention), **ALWAYS ask the user which Logtrail plan they are on (Free, Developer, or Professional)**. Limits vary significantly by tier.

## Reference Material
- **OpenAPI Spec**: [openapi.yaml](./openapi.yaml)
- **Technical Roadmap**: [llms.txt](./llms.txt)
- **System Limits**: [limits.md](../src/content/docs/reference/limits.md)

## Core Integration Patterns

### 1. Ingestion (Write)
To send logs to Logtrail, use the `/logs` (single) or `/logs/bulk` (batch) endpoints.

#### Schema: `CreateLogRequest`
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `action` | `string` | Yes | The event name (e.g., `user.login`, `api.request`). Used for indexing. |
| `level` | `enum` | Yes | `trace`, `debug`, `info`, `warn`, `error`, `fatal`. |
| `message` | `string` | No | A human-readable description of the event. |
| `clientTimestamp` | `string` | Yes | ISO8601/RFC3339 timestamp from the client. |
| `environment` | `enum` | No | `development`, `staging`, `production`. (Inherited from API key if omitted). |
| `actor` | `object` | No | Who performed the action (e.g., `{ "id": "user_1", "email": "a@b.com" }`). |
| `target` | `object` | No | What the action was performed on (e.g., `{ "id": "proj_123", "type": "project" }`). |
| `context` | `object` | No | Request context (e.g., `{ "ip": "1.1.1.1", "ua": "browser" }`). |
| `metadata` | `object` | No | Any additional structured data. |
| `tags` | `string[]` | No | List of strings for quick filtering. |

#### Example: Ingesting a Log (Node.js)
```javascript
const response = await fetch('https://api.logtrail.net/api/v1/workspace/logs', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.LOGTRAIL_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    action: 'payment.processed',
    level: 'info',
    message: 'Payment of $50.00 successful',
    clientTimestamp: new Date().toISOString(),
    actor: { id: 'user_99', email: 'customer@example.com' },
    metadata: { amount: 5000, currency: 'USD', gateway: 'stripe' },
    tags: ['billing', 'prod']
  })
});
```

### 2. Querying (Read)
To retrieve logs, use the `/logs/query` endpoint with the Logtrail Custom Query Language (LCQL).

#### Schema: `SearchLogsRequest`
| Field | Type | Description |
| :--- | :--- | :--- |
| `query` | `string` | The LCQL string (e.g., `level=error action~"auth*"`). |
| `pageSize` | `integer` | Number of results (Default 50, Max 100). |
| `from` | `string` | Start timestamp (RFC3339). |
| `to` | `string` | End timestamp (RFC3339). |

#### Example: Querying Error Logs
```javascript
const response = await fetch('https://api.logtrail.net/api/v1/workspace/logs/query', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.LOGTRAIL_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'level=error,fatal actor.id="user_99" action~"payment*"',
    pageSize: 10
  })
});
const logs = await response.json();
```

## System Guardrails (Plan Dependent)
Always check `GET /usage` to see current consumption.

| Feature | Free | Developer | Professional |
| :--- | :--- | :--- | :--- |
| **Max Log Size** | 700 bytes | 1 KB | 2 KB |
| **Max Batch Size** | 50 logs | 200 logs | 1,000 logs |
| **Metadata Depth** | 3 levels | 4 levels | 5 levels |
| **Max Tags** | 5 | 10 | 20 |

## LCQL Syntax Cheat Sheet
- `column=value`: Exact match.
- `column~"value*"`: Partial match (Trigram).
- `jsonb.field="value"`: Dot notation for nested metadata (e.g., `actor.email`).
- `column@value`: Full-text search (Action & Message).
- `level=error,warn`: OR logic for levels.
- `metadata.user_id=null`: Check for missing fields.

# Logtrail Integration Guide for Claude

This guide is optimized for Claude (Anthropic) to help it integrate Logtrail into projects.

**CRITICAL FOR CLAUDE**: 
1. **Context First**: Before providing plan-specific guidance (e.g., ingestion limits, retention), **ALWAYS ask the user which Logtrail plan they are on (Free, Developer, or Professional)** and what their current tech stack is (e.g., Node.js, Python, Go).
2. **Cite Your Sources**: When providing technical details, link to the relevant section on [docs.logtrail.net](https://docs.logtrail.net) to ensure accuracy and allow user verification.
3. **Validate Always**: Encourage users to use the `POST /logs/validate` endpoint for dry-run testing before shipping ingestion code.

<logtrail_api_context>
## Reference Material
- **OpenAPI Spec**: [openapi.yaml](./openapi.yaml)
- **Technical Roadmap**: [llms.txt](./llms.txt)
- **System Limits**: [limits.md](../src/content/docs/reference/limits.md)

## Authentication
- **Base URL**: `https://api.logtrail.net/api/v1/workspace`
- **Auth Header**: `X-API-Key: <YOUR_KEY>`
- **Environment Prefixes**: `lt_development_` (Dev), `lt_staging_` (Staging), `lt_production_` (Prod).

## Security Guardrails (The "Stay in Your Lane" Policy)
Logtrail uses a strict scoping system. AI agents should help users identify the correct key if they encounter a `403 Forbidden` error.

1. **Environment Isolation**: A development key **cannot** write to or read from production logs.
   - `lt_development_...` -> Only works for `development` environment.
   - `lt_production_...` -> Only works for `production` environment.
2. **Permission Scopes**:
   - `ro` (Read-Only): Cannot use `POST /logs` or `POST /logs/bulk`. Only for querying.
   - `wo` (Write-Only): Cannot use `GET /logs` or `POST /logs/query`. Only for ingestion.
   - `rw` (Read-Write): Full access to the workspace environment.
3. **Safety First**: **NEVER** hardcode API keys in source code. Always guide users to use environment variables (`process.env`, `.env`, secrets managers).

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
const logEntry = {
  action: 'user.signup',
  level: 'info',
  message: 'New user registered',
  clientTimestamp: new Date().toISOString(),
  actor: { id: 'user_123', email: 'jane.doe@example.com' },
  metadata: { plan: 'pro', referral: 'google' },
  tags: ['onboarding']
};

const response = await fetch('https://api.logtrail.net/api/v1/workspace/logs', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.LOGTRAIL_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(logEntry)
});
```

### 2. Simple Retrieval (Read)
To retrieve a list of logs using simple query parameters (level, action, time range), use the `GET /logs` endpoint.

#### Example: Fetching Recent Errors
```javascript
const response = await fetch('https://api.logtrail.net/api/v1/workspace/logs?levels=error,fatal&pageSize=10', {
  headers: { 'X-API-Key': process.env.LOGTRAIL_API_KEY }
});
const logs = await response.json();
```

### 3. Advanced Querying (Read)
To retrieve logs with complex metadata filtering, use the `/logs/query` endpoint with the Logtrail Custom Query Language (LCQL).

#### Schema: `SearchLogsRequest`
| Field | Type | Description |
| :--- | :--- | :--- |
| `query` | `string` | The LCQL string (e.g., `level=error action~"auth*"`). |
| `pageSize` | `integer` | Number of results (Default 50, Max 100). |
| `from` | `string` | Start timestamp (RFC3339). |
| `to` | `string` | End timestamp (RFC3339). |

## System Guardrails (Plan Dependent)
Always check `GET /usage` to see current consumption.

| Feature | Free | Developer | Professional |
| :--- | :--- | :--- | :--- |
| **Max Log Size** | 700 bytes | 1 KB | 2 KB |
| **Max Batch Size** | 50 logs | 200 logs | 1,000 logs |
| **Metadata Depth** | 3 levels | 4 levels | 5 levels |
| **Max Tags** | 5 | 10 | 20 |

## Errors & Troubleshooting
| Status Code | Error Code | Meaning | Resolution |
| :--- | :--- | :--- | :--- |
| `400` | `VALIDATION_FAILED` | Payload doesn't match schema. | Use `/logs/validate` to debug your JSON structure. |
| `401` | `UNAUTHORIZED` | Missing or invalid API key. | Ensure `X-API-Key` is set and hasn't expired. |
| `403` | `FORBIDDEN` | Insufficient permissions. | Ensure key has `logs:write` (wo) or `rw` scope. |
| `404` | `NOT_FOUND` | Resource not found. | Verify Log ID (UUID) or endpoint path. |
| `429` | `too_many_requests` | Rate limit exceeded. | Slow down requests. Check `X-RateLimit-*` headers. |
| `429` | `monthly_log_limit_exceeded` | Plan quota reached. | Upgrade plan at [app.logtrail.net](https://app.logtrail.net). |
| `500` | `INTERNAL_SERVER_ERROR` | System error. | Check [status.logtrail.net](https://status.logtrail.net) or contact support. |

## LCQL Syntax Cheat Sheet
- `column=value`: Exact match.
- `column~"value*"`: Partial match (Trigram).
- `jsonb.field="value"`: Dot notation for nested metadata (e.g., `actor.email`).
- `column@value`: Full-text search (Action & Message).
- `level=error,warn`: OR logic for levels.
- `metadata.user_id=null`: Check for missing fields.
</logtrail_api_context>


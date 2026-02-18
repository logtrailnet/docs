---
title: Authentication
description: Learn how to authenticate your requests to the Logtrail Workspace API.
---

:::caution[Public Beta]
Logtrail is currently in Public Beta. While we are committed to maintaining maximum backward compatibility, the API surface and schema are subject to change as we refine the platform based on user feedback.
:::

Logtrail uses API keys to authenticate requests. You can manage your API keys in the [Logtrail Dashboard](https://app.logtrail.net/settings/api-keys).

## API Key Format

All Logtrail API keys follow a structured format that helps you identify their scope and environment at a glance:

`lt_{environment}_{type}_{random_string}`

### Environment Prefixes
- `lt_development_`: Used for testing and local development.
- `lt_staging_`: Used for pre-production environments.
- `lt_production_`: Used for your live production environment.

### Permission Type Prefixes
- `ro_`: **Read-Only**. Can only query logs (`GET /logs`, `POST /logs/query`).
- `wo_`: **Write-Only**. Can only ingest logs (`POST /logs`, `POST /logs/bulk`).
- `rw_`: **Read-Write**. Full access to ingest and query logs.

## Using Your API Key

Authentication is performed by passing your API key in the `X-API-Key` header of your HTTP requests.

```bash
curl -X GET https://api.logtrail.net/api/v1/workspace/info 
  -H "X-API-Key: lt_production_rw_your_key_here"
```

Alternatively, you can use the `Authorization` header with the `ApiKey` scheme:

```bash
Authorization: ApiKey lt_production_rw_your_key_here
```

## Scoping and Isolation

Logtrail enforces strict isolation between environments to prevent accidental data contamination:

- **Environment Isolation**: A key created for the `development` environment **cannot** read from or write to the `production` environment.
- **Permission Enforcement**: If you attempt to ingest a log using a `ro_` (Read-Only) key, the API will return a `403 Forbidden` error.

## Error Codes

When authentication fails, the API will return one of the following status codes:

| Status Code | Error Code | Description |
| :--- | :--- | :--- |
| `401` | `unauthorized` | The API key is missing, invalid, or has been revoked. |
| `403` | `forbidden` | The API key does not have the necessary permissions (scope) for the requested action. |
| `403` | `environment_mismatch` | The API key is being used for an environment it was not scoped for. |

## Key Expiry and Rotation

While Logtrail API keys do not expire by default, we strongly recommend rotating your keys periodically as a security best practice. If you believe a key has been compromised, you should revoke it immediately in the dashboard and generate a new one.

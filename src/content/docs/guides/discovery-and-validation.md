---
title: Discovery & Validation
description: Learn how to verify your integration and validate log payloads.
---

Logtrail provides specialized endpoints to help you verify your API key configuration and test your log payloads before they are ingested.

## 1. Workspace Discovery

Use the `GET /info` endpoint to retrieve metadata about your current workspace, organization, and API key scope. This is particularly useful during SDK initialization to verify connectivity.

### What it returns:
*   **Organization & Project**: Names and IDs.
*   **API Key Scope**: The permissions (`logs:read`, `logs:write`) and environment scopes (e.g., `env:development`) assigned to your key.
*   **Plan Details**: Your current plan tier and its associated ingestion/retention limits.
*   **Usage**: Current consumption for the month and when your quota resets.

## 2. Usage Tracking

If you need to programmatically monitor your ingestion volume, you can use the `GET /usage` endpoint. It returns a simplified summary of your current usage vs. plan limits.

```json
{
  "used": 15420,
  "limit": 50000,
  "remaining": 34580,
  "resets_at": "2026-03-01T00:00:00Z",
  "plan_code": "dev"
}
```

## 3. Payload Validation (Dry Run)

To avoid consuming your monthly quota during development or to debug complex JSON structures, use the `POST /logs/validate` endpoint.

### Key Benefits:
*   **No Quota Consumption**: Validation requests do not count toward your monthly log limit.
*   **Deep Inspection**: Verifies your payload against size limits, nesting depth, and data types.
*   **Batch Support**: You can validate a single log or an array of up to 1,000 logs (depending on your plan).

### Example Response:
```json
{
  "valid": false,
  "errors": [
    {
      "field": "metadata",
      "message": "depth 6 exceeds maximum 5"
    }
  ]
}
```

## Next Steps

*   Check out the [System Limits](/reference/limits) to understand the guardrails for each plan tier.
*   Explore the [API Reference](/api-reference) for the full request/response schemas.

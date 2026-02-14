---
title: System Limits
description: Understanding Logtrail's tier-based ingestion and query limits.
---

Logtrail enforces limits to ensure high availability and consistent performance for all customers. These limits are determined by your current **Plan Tier**.

**Note: All plan tiers, pricing, and specific system limits are subject to change at any time.**

## Plan Comparison

| Feature | Free | Developer | Professional |
| :--- | :--- | :--- | :--- |
| **Logs / Month** | 5,000 | 50,000 | 500,000 |
| **Retention** | 21 Days | 45 Days | 120 Days |
| **Req / Minute** | 120 | 300 | 1,000 |
| **Max Log Size** | 700 bytes | 1 KB | 2 KB |
| **Max Batch Size** | 50 logs | 200 logs | 1,000 logs |
| **Metadata Depth** | 3 levels | 4 levels | 5 levels |
| **Max Tags** | 5 | 10 | 20 |

## Ingestion Guardrails

To maintain sub-second search performance, we enforce strict validation on incoming log entries:

*   **Max Log Size**: Includes all keys and values in the JSON payload.
*   **Max Batch Size**: The number of entries in a single `/bulk` request.
*   **Metadata Complexity**: Limits on the number of keys and nesting depth within `actor`, `target`, `context`, and `metadata` objects.

## Rate Limiting

Logtrail uses a token-bucket algorithm for rate limiting. Limits are enforced per API key.

*   **X-RateLimit-Remaining**: This header indicates how many requests you have left in the current window.
*   **Monthly Quota**: If you exceed your monthly ingestion quota, the API will return a `429 Too Many Requests` status with the error code `monthly_log_limit_exceeded`.

## Overages & Grace Periods

If you exceed your plan limits, Logtrail will continue to accept logs for a short grace period while notifying your organization via email. After the grace period, ingestion may be throttled or suspended until the account is upgraded or the monthly quota resets.

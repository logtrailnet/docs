---
title: Quickstart
description: Get started with Logtrail in 5 minutes.
---

Welcome to Logtrail! Follow this guide to send your first log entry and see it in your dashboard.

## 1. Get an API Key

Log in to the [Logtrail Dashboard](https://app.logtrail.net) and navigate to **Settings > API Keys**. 
Generate a new key with `logs:write` permissions. Your key will look like `lt_development_rw_...`.

## 2. Send your first log

Use the following `curl` command to send a test log entry. Replace `<YOUR_API_KEY>` with the key you generated.

```bash
curl -X POST https://api.logtrail.net/api/v1/workspace/logs 
  -H "X-API-Key: <YOUR_API_KEY>" 
  -H "Content-Type: application/json" 
  -d '{
    "action": "user.login",
    "level": "info",
    "message": "Hello from the quickstart!",
    "clientTimestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",
    "actor": {
      "id": "user_123",
      "email": "alex@example.com"
    }
  }'
```

## 3. Verify in Dashboard

Go to your **Live Tail** or **Search** page in the Logtrail dashboard. You should see your "Hello from the quickstart!" log appear instantly.

## Next Steps

- Explore the [Query Language (LCQL)](/guides/lcql) to learn how to filter your logs.
- Check out the [API Reference](/api-reference) for advanced ingestion options.

---
title: Migrating to Production
description: Learn how to transition your Logtrail integration from development to production safely.
---

Moving from a local development environment to a live production environment requires careful attention to security and configuration. Follow this checklist to ensure a smooth migration.

## 1. Switch Your API Key

The most important step is to switch from your development key (`lt_development_...`) to a production key (`lt_production_...`).

- **Generate a new key** in the dashboard scoped specifically for the `production` environment.
- **Environment Isolation**: Remember that development data will not show up in your production workspace, and vice versa.

## 2. Secure Your Keys

Ensure that your production keys are stored securely and never committed to version control.

- **Use Secrets Management**: Use tools like GitHub Secrets, Vercel Environment Variables, or AWS Secrets Manager.
- **Least Privilege**: Use a **Write-Only** (`wo_`) key for ingestion if your production app doesn't need to perform queries.

## 3. Review Plan Limits

Production traffic is often significantly higher than development traffic.

- **Check Your Tier**: Ensure your current plan (Free, Dev, or Pro) has high enough monthly log limits and retention for your production needs.
- **Monitor Usage**: Use the `GET /usage` endpoint or the dashboard to keep an eye on your consumption during the first few days of production.

## 4. Implement Error Handling

Production apps should handle API errors gracefully to ensure logging doesn't impact your user experience.

- **Network Failures**: Implement retries with exponential backoff for ingestion requests.
- **Rate Limits**: Respect the `X-RateLimit-*` headers and handle `429 Too Many Requests` responses.

## 5. Enable User Activity Feeds (Optional)

If you're using Logtrail to power user-facing activity feeds:

- **Audit Actions**: Review the actions you've flagged as "public" to ensure no sensitive technical information is exposed to end users.
- **Test Templates**: Verify that your human-readable activity templates look correct with live production data.

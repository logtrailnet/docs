---
title: Security & Privacy
description: How Logtrail protects your sensitive data.
---

As a SaaS provider, Logtrail takes security and data privacy with the utmost seriousness. We understand that logs often contain sensitive information, and we have built our platform to ensure your data remains protected.

## Data Isolation

Logtrail uses a multi-tenant architecture with strict logical isolation. Your data is always scoped to your **Organization** and **Project**. 

### Environment Segregation
Data sent to different environments (e.g., `development` vs `production`) is stored and queried separately. API keys are scoped to these environments to prevent accidental leakage.

## Data Retention

We offer flexible data retention policies based on your plan. 

*   **Standard Retention**: Logs are kept for 30 days by default.
*   **Custom Retention**: Enterprise plans can configure retention periods from 7 days up to 7 years.
*   **Auto-Deletion**: Once a log entry exceeds its retention window, it is permanently purged from our primary storage and backups within 24 hours.

## Encryption

*   **In Transit**: All data sent to our API or accessed via the dashboard is encrypted using TLS 1.2 or higher.
*   **At Rest**: Your logs are encrypted at rest using industry-standard AES-256 encryption.

## Best Practices for Sensitive Data

While Logtrail encrypts your data, we recommend following these best practices:
1.  **PII Masking**: Scrub Personally Identifiable Information (PII) like passwords or credit card numbers before sending logs to Logtrail.
2.  **Least Privilege**: Use scoped API keys. Give `logs:write` only keys to your ingestion services and `logs:read` keys to your internal auditing tools.

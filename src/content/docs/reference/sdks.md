---
title: SDKs & Libraries
description: Official and community-supported SDKs for Logtrail.
---

Logtrail provides official SDKs for major programming languages to simplify ingestion and querying.

## Official SDKs

| Language | Status | Repository |
| :--- | :--- | :--- |
| **Go** | Stable | [logtrailnet/logtrail-go](https://github.com/logtrailnet/logtrail-go) |
| **Node.js** | Beta | [logtrailnet/logtrail-node](https://github.com/logtrailnet/logtrail-node) |
| **Python** | Alpha | [logtrailnet/logtrail-python](https://github.com/logtrailnet/logtrail-python) |

## Community Integrations

We are working with the community to provide native adapters for popular logging frameworks:

*   **Winston/Pino (Node.js)**: In development.
*   **Zap/Logrus (Go)**: Coming soon.
*   **Serilog (.NET)**: Planned for Q3 2026.

## Using the REST API

If an SDK is not yet available for your language, you can interact directly with our [REST API](/api-reference). 
Our API is fully OpenAPI compliant, meaning you can generate your own client using tools like `openapi-generator`.

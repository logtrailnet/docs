---
title: SDKs & Libraries
description: Official and community-supported SDKs for Logtrail.
---

Logtrail is currently in Public Beta. While we are building out our native SDK ecosystem, the primary way to integrate Logtrail is via our robust REST API.

## Official SDKs (Coming Soon)

We are actively developing official SDKs to provide a type-safe, idiomatic experience for your favorite languages.

| Language | Status | Expected |
| :--- | :--- | :--- |
| **Node.js / TypeScript** | In Development | Q2 2026 |
| **Go** | In Development | Q2 2026 |
| **Python** | Planned | Q3 2026 |
| **Rust** | Planned | Q4 2026 |

## Community & Framework Integrations

Native adapters for popular logging frameworks are on our roadmap to allow for "drop-in" integration:

*   **Winston / Pino (Node.js)**: Coming soon.
*   **Zap / Logrus (Go)**: Coming soon.
*   **Python Logging / Loguru**: Planned.
*   **Serilog (.NET)**: Planned.

## Integration via REST API

Until the SDKs are released, you can easily integrate Logtrail using our standard REST API. It is designed to be simple and highly compatible with any language that can make HTTP requests.

### Key Resources

*   **[Quickstart Guide](/getting-started/quickstart)**: Send your first log in 5 minutes using `curl`.
*   **[API Reference](/api-reference)**: Comprehensive documentation of all endpoints.
*   **[OpenAPI Spec](/openapi.yaml)**: Use this to generate your own type-safe client in any language using tools like `openapi-generator` or `buf`.

### Integration Best Practices

We recommend wrapping your API calls in a simple internal utility or using the **Interface + Anti-corruption Layer** pattern as described in our [Architecture Guide](/concepts/architecture#best-practices-integration-patterns). This ensures a smooth transition once the official SDKs are available.

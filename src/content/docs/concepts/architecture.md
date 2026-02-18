---
title: Architecture Overview
description: How Logtrail processes your data.
---

Logtrail is designed for extreme scale and low-latency access. Our architecture is optimized to ensure that logs are available for search within milliseconds of being received.

## Data Flow

1.  **Ingestion**: Logs are sent via the REST API or one of our native SDKs. 
2.  **Validation**: Every log entry is validated against your plan's limits (size, nesting depth, etc.).
3.  **Buffering**: Validated logs are placed in a high-speed ingestion buffer.
4.  **Storage**: Logs are persisted to our highly-optimized storage engine, featuring multi-layered indexing designed for sub-second retrieval at scale.
5.  **Querying**: When you search via the dashboard or API, our query engine translates your LCQL into highly efficient SQL.

## User Activity Feeds

Unlike traditional logging platforms, Logtrail is built to power user-facing interfaces.

- **Unified Pipeline**: You send one log entry. Logtrail handles the duality of internal debugging and user-facing activity.
- **Activity Flagging**: By default, logs are internal. You can flag specific events or actions as "public" via the dashboard or API, making them available to your end users through our embeddable components or activity API.
- **Human-Readable Templates**: Transform technical logs into beautiful activity items (e.g., "User alex@example.com logged in from Chrome") using our dynamic template engine.

## High Availability

Logtrail is built on a distributed cloud infrastructure. We maintain multiple redundancies for our ingestion pipeline and storage layers to ensure that your logs are never lost, even during infrastructure failures.

## Scalability

Our backend automatically scales horizontally based on ingestion volume. Whether you are sending 100 logs per hour or 100,000 per second, Logtrail maintains consistent performance.

## Best Practices: Integration Patterns

When integrating Logtrail into your core application, we recommend using these two clean-architecture patterns to ensure your code remains maintainable and decoupled from any external dependency.

### 1. The Interface Pattern

Define a generic Logger interface in your application's domain layer. This interface should only contain the logging methods your app actually needs.

```typescript
// domain/logger.ts
export interface Logger {
  info(message: string, meta?: Record<string, any>): void;
  error(message: string, error: Error, meta?: Record<string, any>): void;
  trackUserActivity(userId: string, action: string, meta?: Record<string, any>): void;
}
```

By coding against this interface rather than the Logtrail SDK directly, you can easily swap out the implementation for testing or if you ever decide to change providers.

### 2. The Anti-Corruption Layer (ACL)

Implement the Logger interface using a Logtrail-specific class. This class acts as an Anti-Corruption Layer, translating your application's domain objects into the specific format required by Logtrail.

```typescript
// infrastructure/logtrail-logger.ts
import { Logtrail } from 'logtrail-sdk';
import { Logger } from '../domain/logger';

export class LogtrailLogger implements Logger {
  private client: Logtrail;

  constructor(apiKey: string) {
    this.client = new Logtrail({ apiKey });
  }

  info(message: string, meta?: Record<string, any>) {
    this.client.info(message, meta);
  }

  trackUserActivity(userId: string, action: string, meta?: Record<string, any>) {
    // Translate app-specific 'action' into Logtrail 'event'
    this.client.info(action, { 
      ...meta, 
      userId, 
      is_public: true // Flag for user activity feed
    });
  }
  
  // ... other methods
}
```

This pattern ensures that "leaky abstractions" from the SDK don't bleed into your business logic, keeping your core codebase clean and focused on its primary purpose.

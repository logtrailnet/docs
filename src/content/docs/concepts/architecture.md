---
title: Architecture Overview
description: How Logtrail processes your data.
---

Logtrail is designed for extreme scale and low-latency access. Our architecture is optimized to ensure that logs are available for search within milliseconds of being received.

## Data Flow

1.  **Ingestion**: Logs are sent via the REST API or one of our native SDKs. 
2.  **Validation**: Every log entry is validated against your plan's limits (size, nesting depth, etc.).
3.  **Buffering**: Validated logs are placed in a high-speed ingestion buffer.
4.  **Storage**: Logs are persisted to our optimized Postgres storage engine, where they are indexed using Trigram and GIN indexes for fast retrieval.
5.  **Querying**: When you search via the dashboard or API, our query engine translates your LCQL into highly efficient SQL.

## High Availability

Logtrail is built on a distributed cloud infrastructure. We maintain multiple redundancies for our ingestion pipeline and storage layers to ensure that your logs are never lost, even during infrastructure failures.

## Scalability

Our backend automatically scales horizontally based on ingestion volume. Whether you are sending 100 logs per hour or 100,000 per second, Logtrail maintains consistent performance.

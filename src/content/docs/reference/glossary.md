---
title: Glossary
description: Definitions for common terms used throughout the Logtrail ecosystem.
---

New to Logtrail? Here is a breakdown of the common terms we use across our documentation and dashboard.

## A

### Action
The name of the event being logged (e.g., `user.login`, `invoice.paid`). This is the primary way you'll categorize and filter your logs.

### Actor
The entity that performed the action. Usually a user, but can also be a background process or system (e.g., `{ "id": "user_123", "type": "user" }`).

## C

### Client Timestamp
The time the event actually occurred on your server or client device. This is different from the **Server Timestamp**, which is when Logtrail received the log.

### Context
Metadata about the environment where the event occurred, such as the IP address, user agent, or request ID.

## E

### Environment
A logical isolation boundary for your logs. Logtrail provides `development`, `staging`, and `production` environments by default.

## F

### Facet
A specific field or property in your logs that you can filter by (e.g., `level`, `action`, `actor.email`).

## I

### Ingestion
The process of sending log data to Logtrail's API.

## L

### LCQL
**Logtrail Custom Query Language**. A simple, facet-based language used to search and filter logs.

### Level
The severity of the log entry. Supported levels are `trace`, `debug`, `info`, `warn`, `error`, and `fatal`.

## M

### Metadata
Any additional structured JSON data you want to attach to your log entry.

## S

### Server Timestamp
The time (in UTC) when the log entry was received and processed by Logtrail's servers.

## T

### Tags
Simple strings attached to logs for quick filtering (e.g., `["auth", "v3", "critical"]`).

### Target
The entity that the action was performed upon (e.g., `{ "id": "project_abc", "type": "project" }`).

## W

### Workspace
Your private area within Logtrail where your projects, API keys, and logs live.

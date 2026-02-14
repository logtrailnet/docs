---
title: Query Language (LCQL)
description: Master the Logtrail Custom Query Language.
---

The Logtrail Custom Query Language (LCQL) allows you to perform powerful, high-performance searches across millions of log entries.

## Basic Syntax

LCQL uses a "facet" system: `column:operator:value`.

### Supported Operators

| Operator | Name | Description |
| :--- | :--- | :--- |
| `=` | Equals | Exact match (Case-insensitive for text). |
| `!=` | Not Equals | Exclude specific values. |
| `~` | Partial Match | Case-insensitive match using Trigram indexing. |
| `!~` | Not Partial | Exclude partial matches. |
| `@` | Full-Text | Search across actions and messages. |
| `>`, `<` | Range | Used for timestamps. |

## Filtering by Field

### Enums and UUIDs
```sql
level=error
id="0198aa31-..."
environment=production
```

### Text Search
```sql
action~"login*"
message@"database connection"
```

## JSONB Filtering (Deep Nesting)

Access nested data in `actor`, `target`, `context`, or `metadata` using dot notation.

```sql
actor.email="user@example.com"
metadata.status_code=500
context.request_id!=null
```

## Grouping Logic

Use commas to perform an "OR" search within a single field.

```sql
level=error,warn,fatal
tag=prod,critical
```

## Sorting

All results are automatically sorted by `server_timestamp DESC` (newest first), then by `id DESC`.

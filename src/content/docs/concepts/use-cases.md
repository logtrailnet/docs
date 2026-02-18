---
title: Use Cases
description: How developers are using Logtrail to ship faster.
---

Logtrail is versatile, powering both internal engineering workflows and customer-facing features. Here are some of the most common ways developers use Logtrail.

## 1. Unified Debugging & Audit Logs
**The Problem**: You have internal logs for debugging (hidden in a complex tool) and a separate "Activity History" system for your users.
**The Solution**: Use Logtrail as your single source of truth. Send every event to Logtrail. Use tags and metadata to distinguish between technical logs (internal) and human-readable activity (public).
**Benefit**: Reduce infrastructure complexity and ensure consistency between what you see and what your users see.

## 2. Customer-Facing Activity Feeds
**The Problem**: Building a "Recent Activity" component (like on GitHub or Stripe) requires custom database schemas, API endpoints, and UI components.
**The Solution**: Flag specific events as `is_public: true` in Logtrail. Use our Activity API or embeddable React components to display these events directly to your users.
**Benefit**: Add professional activity feeds to your app in minutes, not days.

## 3. Monitoring AI Agent Performance
**The Problem**: AI agents (like those built with LangChain or OpenAI) can be unpredictable. You need to see exactly what they are doing in real-time.
**The Solution**: Log agent thoughts, tool calls, and final responses to Logtrail. Use our deep JSON filtering to query by `run_id` or `agent_type`.
**Benefit**: Debug LLM hallucinations and optimize your agentic workflows with granular visibility.

## 4. Multi-Tenant Audit Trails
**The Problem**: Enterprise customers require audit logs of everything that happens in their workspace.
**The Solution**: Tag every log entry with a `workspace_id`. Provide your customers with a filtered view of these logs via the Logtrail API.
**Benefit**: Fulfill enterprise compliance requirements (SOC2, HIPAA) without building a custom audit system.

## 5. Usage-Based Analytics
**The Problem**: You need to track how often users interact with specific features to inform product decisions.
**The Source**: Instead of complex event-tracking libraries, use your existing logs.
**The Solution**: Log feature interactions (e.g., `feature_used: "export_pdf"`) with associated metadata like `user_tier`. Query these logs via LCQL to generate instant usage reports.
**Benefit**: Get product insights from the data you're already collecting for debugging.

## 6. Powering In-App Notification Centers
**The Problem**: Building a robust notification system with "read" states, filtering by type, and real-time updates is a significant engineering effort.
**The Solution**: Treat notifications as a specialized log stream. When a significant event occurs (e.g., "new comment," "task assigned"), log it to Logtrail with `is_public: true` and specific metadata for the recipient. Use our Query API to fetch "unread" events for a specific user.
**Benefit**: Launch a functional notification center without spinning up new databases or complex pub/sub infrastructure.


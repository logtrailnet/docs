---
title: Security Best Practices
description: Essential tips for keeping your Logtrail data and API keys safe.
---

Keeping your Logtrail data and API keys secure is critical for protecting your application and your users. Follow these essential tips to ensure your setup is as secure as possible.

## 1. Environment Variable isolation

**Never hardcode your API keys** directly into your source code. If you hardcode a key and commit it to a public repository (like GitHub), anyone can access your Logtrail data.

Instead, store your API keys in environment variables:

### Node.js (with dotenv)
Create a `.env` file in your project root:
```env
LOGTRAIL_API_KEY=lt_development_rw_your_key_here
```

Then, use it in your code:
```javascript
const apiKey = process.env.LOGTRAIL_API_KEY;
```

## 2. Environment Isolation

Logtrail provides dedicated environments for `development`, `staging`, and `production`. Use them to keep your testing data separate from your live production data.

- **Development Keys**: Only for local testing and debugging.
- **Production Keys**: Only for your live application.

## 3. Principle of Least Privilege

When creating an API key, only grant it the permissions it actually needs. This minimizes the potential impact if a key is ever compromised.

- **Ingestion Only**: If your application only needs to send logs, create a **Write-Only** (`wo_`) key.
- **Dashboard Only**: If you're building an internal monitoring tool, use a **Read-Only** (`ro_`) key.

## 4. Key Rotation

Periodically rotate your API keys by generating new ones and revoking the old ones. This is a common security practice that helps mitigate the risk of long-term key compromise.

## 5. What to Do If a Key Is Compromised

If you suspect an API key has been leaked or compromised:

1.  **Revoke the key immediately** in the [Logtrail Dashboard](https://app.logtrail.net/settings/api-keys).
2.  **Generate a new key** and update your application's environment variables.
3.  **Audit your logs** to see if there was any unauthorized access or ingestion during the compromise.

## 6. Secure Your Frontend

If you're using Logtrail in a client-side application (like a React or Vue app), be aware that your API keys **will be visible in the browser's Network tab**.

- **Use Write-Only Keys**: For frontend ingestion, always use a **Write-Only** (`wo_`) key. This prevents users from being able to read your other log data.
- **Proxy Requests**: For the highest security, consider proxying Logtrail requests through your own backend server, where you can safely store and use your API keys.

---
title: API Error Codes
description: A comprehensive list of error codes returned by the Logtrail API.
---

Logtrail uses standard HTTP status codes to indicate the success or failure of an API request. In general, codes in the `2xx` range indicate success, codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.), and codes in the `5xx` range indicate an error with Logtrail's servers (these are rare).

## HTTP Status Codes

| Code | Status | Description |
| :--- | :--- | :--- |
| `200` | **OK** | Everything worked as expected. |
| `201` | **Created** | The resource was successfully created (e.g., a log entry). |
| `400` | **Bad Request** | The request was unacceptable, often due to missing a required parameter. |
| `401` | **Unauthorized** | No valid API key provided. |
| `402` | **Request Failed** | The parameters were valid but the request failed. |
| `403` | **Forbidden** | The API key doesn't have permissions to perform the request. |
| `404` | **Not Found** | The requested resource doesn't exist. |
| `409` | **Conflict** | The request conflicts with another request (e.g., using a duplicate ID). |
| `429` | **Too Many Requests** | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |
| `500`, `502`, `503`, `504` | **Server Errors** | Something went wrong on Logtrail's end. (These are rare). |

## Error Body Format

When an error occurs, the API returns a JSON object with the following structure:

```json
{
  "error": {
    "type": "invalid_request_error",
    "message": "The log payload exceeds the maximum allowed size of 100KB.",
    "code": "payload_too_large",
    "param": "metadata"
  }
}
```

### Error Fields

- **`type`**: The type of error returned. Can be `api_error`, `card_error`, `idempotency_error`, or `invalid_request_error`.
- **`message`**: A human-readable message providing more details about the error.
- **`code`**: A short string that identifies the specific error (e.g., `invalid_api_key`, `rate_limit_exceeded`).
- **`param`**: The parameter the error relates to if the error is parameter-specific.

## Error Codes

The following error codes can be returned in the `code` field of the error response.

### Authentication Errors

| Code | Description |
| :--- | :--- |
| `AUTH_MISSING_API_KEY` | The `X-API-Key` header is missing or empty. |
| `AUTH_INVALID_API_KEY` | The provided API key is invalid or does not exist. |
| `AUTH_API_KEY_EXPIRED` | The API key has expired and needs to be rotated. |
| `AUTH_CONTEXT_MISSING` | Internal authentication context could not be established. |
| `AUTH_API_KEY_SCOPE_MISMATCH` | The API key does not have the required permissions (e.g., trying to write with a read-only key). |

### Rate Limits & Quotas

| Code | Description |
| :--- | :--- |
| `RATE_LIMIT_IP_EXCEEDED` | The request limit for your IP address has been exceeded. |
| `RATE_LIMIT_PLAN_EXCEEDED` | The request limit for your current plan has been exceeded. |
| `RATE_LIMIT_VALIDATE_EXCEEDED` | The limit for `/validate` endpoint requests has been exceeded. |
| `QUOTA_MONTHLY_LOG_LIMIT_EXCEEDED` | Your workspace has reached its monthly log ingestion limit. |

### Validation Errors

| Code | Description |
| :--- | :--- |
| `VALIDATION_INVALID_REQUEST` | The request format is invalid. |
| `VALIDATION_INVALID_CONTENT_TYPE` | The `Content-Type` header must be `application/json`. |
| `VALIDATION_EMPTY_BODY` | The request body cannot be empty. |
| `VALIDATION_INVALID_JSON` | The provided JSON is malformed or invalid. |
| `VALIDATION_INVALID_ENVIRONMENT` | The environment specified in the request is invalid. |
| `VALIDATION_FAILED` | General validation failure (check the `message` for details). |
| `VALIDATION_BULK_LIMIT_EXCEEDED` | A bulk ingestion request exceeds the maximum allowed count. |
| `VALIDATION_QUERY_INVALID` | The LCQL query provided is invalid. |
| `VALIDATION_QUERY_SYNTAX` | Syntax error in the LCQL query. |
| `VALIDATION_QUERY_TIME_RANGE` | The requested time range is invalid or exceeds plan limits. |
| `VALIDATION_QUERY_CONSTRAINT` | The query violates a system constraint (e.g., too many filters). |

### Resource & Internal Errors

| Code | Description |
| :--- | :--- |
| `LOG_NOT_FOUND` | The requested log entry could not be found. |
| `INTERNAL_AUTH_ERROR` | An unexpected error occurred during authentication. |
| `INTERNAL_LOG_SERVICE_ERROR` | An internal error occurred while processing the log. |
| `INTERNAL_SERVER_ERROR` | An unexpected error occurred on our servers. |


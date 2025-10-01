# Event Contracts

This document defines the **event schemas** for the event-driven product management system.  
Each event includes a `type`, `data`, and `timestamp` field.

---

## Common Fields

| Field      | Type      | Description                                  |
|------------|-----------|----------------------------------------------|
| `type`     | string    | Event type identifier (e.g., PRODUCT_CREATED)|
| `data`     | object    | Event-specific payload                       |
| `timestamp`| string    | ISO 8601 timestamp of when event was emitted |

---

## Event Types

### 1. CONNECTED

Event sent when a client first connects to the event stream.

```json
{
  "type": "CONNECTED",
  "message": "Event stream connected"
}
```

Schema:
- `type` (string) — always `"CONNECTED"`
- `message` (string) — connection confirmation text

---

### 2. PRODUCT_CREATED

Triggered when a new product is created.

```json
{
  "type": "PRODUCT_CREATED",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "integer",
    "categoryId": "integer",
    "sellerId": "integer",
    "isActive": true,
    "createdAt": "string (date-time)",
    "updatedAt": "string (date-time)"
  },
  "timestamp": "string (date-time)"
}
```

---

### 3. PRODUCT_UPDATED

Triggered when an existing product is updated.

```json
{
  "type": "PRODUCT_UPDATED",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "integer",
    "categoryId": "integer",
    "sellerId": "integer",
    "isActive": true,
    "createdAt": "string (date-time)",
    "updatedAt": "string (date-time)"
  },
  "timestamp": "string (date-time)"
}
```

---

### 4. PRODUCT_DELETED

Triggered when a product is marked as deleted (isActive = false).

```json
{
  "type": "PRODUCT_DELETED",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "integer",
    "categoryId": "integer",
    "sellerId": "integer",
    "isActive": false,
    "createdAt": "string (date-time)",
    "updatedAt": "string (date-time)"
  },
  "timestamp": "string (date-time)"
}
```

---

### 5. LOW_STOCK_WARNING

Triggered when a product’s stock goes below a defined threshold.

```json
{
  "type": "LOW_STOCK_WARNING",
  "data": {
    "product": {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": "number",
      "quantity": "integer",
      "categoryId": "integer",
      "sellerId": "integer",
      "isActive": true,
      "createdAt": "string (date-time)",
      "updatedAt": "string (date-time)"
    },
    "threshold": "string"
  },
  "timestamp": "string (date-time)"
}
```

---

## Summary

- `CONNECTED` — confirms SSE connection
- `PRODUCT_CREATED` — emitted on new product creation
- `PRODUCT_UPDATED` — emitted on product update
- `PRODUCT_DELETED` — emitted when product is deactivated
- `LOW_STOCK_WARNING` — emitted when product quantity is below threshold

# Summary

This document lists the Summary and assumptions made during the design, implementation, and documentation of the **Event-Driven Product Management System**.

---

## Backend

1. **Database**
   - MySQL is used as the primary database.
   - Prisma is the ORM, generating models for `Product`, `Category`, and `Seller`.

2. **Identifiers**
   - `Product.id` is assumed to be a string (UUID/CUID).
   - `Category.id` and `Seller.id` are integers.

3. **Product Deletion**
   - Products are not hard-deleted. Instead, `isActive` is set to `false`.

4. **Validation**
   - Backend enforces constraints such as:
     - Price must have at most 2 decimal places.
     - Quantity must be a non-negative integer.
   - Frontend also validates these before sending requests.

5. **Events**
   - Product service emits the following event types only:
     - `PRODUCT_CREATED`
     - `PRODUCT_UPDATED`
     - `PRODUCT_DELETED`
     - `LOW_STOCK_WARNING`
   - Events are delivered via Server-Sent Events (SSE).
   - `CONNECTED` is sent once when a client subscribes.

---

## Frontend

1. **Framework**
   - React is used for development.
   - CSS Modules are used for styling.
   - React Hot Toast is used for Notifications. 

2. **Global State**
   - Event data (from SSE) is shared globally via React Context.

---

## Testing

1. **Unit Tests**
   - Prisma client methods (`findUnique`, `findMany`, `create`, `update`) are mocked.
   - Event publishers are mocked.
   - Tests verify both **happy path** and **error scenarios**.

---

## Authentication (ToDo)

1. **Jwt token authentication**
   - Backed needs to issue a jwt token when a user's initial login and userId (or sellerId) need to be included in the token payload.
   - Frontend needs to attach the given token inside the request authentication header (Only on authenticated endpoints).
   - Finally Backend can read the userId from the received token payload and validate the request.
   - **Note:** In this Application, the sellerId is hardcoded at the Frontend side and manually attached to the request body. 

---

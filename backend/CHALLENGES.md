# FastAPI Break-and-Fix Challenges

Learn FastAPI by debugging intentional bugs. Each challenge introduces one bug that teaches a core concept. Run the app, observe the breakage, trace the error, and fix it.

```bash
cd backend && uvicorn app.main:app --reload
```

---

## Challenge 1: "The Missing Await" — Easy

- **Concept**: async/await
- **What to try**: `POST /api/v1/intake/` with any valid payload
- **What breaks**: Server returns a 500 error about serializing a coroutine object
- **Hint**: Look at the return value of the endpoint. What does an async function return if you don't unwrap it?

---

## Challenge 2: "The Broken Injection" — Easy

- **Concept**: Dependency Injection
- **What to try**: Any endpoint
- **What breaks**: Endpoints fail because `db` isn't a database session — it's something else entirely
- **Hint**: How does FastAPI know to *call* a dependency function vs just assigning it?

---

## Challenge 3: "The Silent Rollback" — Medium

- **Concept**: Database transactions
- **What to try**: POST to create an intake, then GET to list intakes
- **What breaks**: POST returns 201 (looks successful!) but GET returns an empty list — data vanishes
- **Hint**: There's a difference between sending SQL to the database and making it permanent

---

## Challenge 4: "The Broken Serialization" — Medium

- **Concept**: Pydantic ORM mode
- **What to try**: Any endpoint that returns data
- **What breaks**: Validation errors when converting database objects to JSON responses
- **Hint**: Pydantic models don't know how to read SQLAlchemy object attributes by default

---

## Challenge 5: "The CORS Wall" — Medium

- **Concept**: Middleware / CORS
- **What to try**: Use the app from the frontend (not `/docs` or curl)
- **What breaks**: Backend works fine via Swagger UI and curl, but the frontend gets blocked
- **Hint**: Browsers enforce a security policy that servers must explicitly opt into

---

## Challenge 6: "The Lost Route" — Hard

- **Concept**: Router prefix stacking
- **What to try**: Any endpoint via the frontend or curl
- **What breaks**: All endpoints return 404. The app starts fine. `/docs` shows URLs that look almost right.
- **Hint**: Check how route prefixes combine across `main.py` and the router file

---

## Challenge 7: "The Stale Default" — Hard

- **Concept**: Query parameter defaults
- **What to try**: GET `/api/v1/intake/` without specifying dates, after the app has been running for a while
- **What breaks**: The default date range doesn't include recent data — it's frozen in the past
- **Hint**: When is a default value evaluated? Once at import time, or fresh per request?

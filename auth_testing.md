# Auth-Gated App Testing Playbook (Soumyajit Samal Portfolio)

## Whitelisted admin emails
- soumyajits2000@gmail.com
- soumyajitsomu@gmail.com

(also stored in `ADMIN_EMAILS` env var on the backend)

## Auth endpoints
- `POST /api/auth/session` — exchange `session_id` (from URL fragment) for a session cookie
- `GET  /api/auth/me`      — returns current user (404/401 if not signed in)
- `POST /api/auth/logout`  — clears the session cookie + DB row

## Protected endpoints (require admin email)
- `POST  /api/research`
- `PATCH /api/research/{id}`
- `DELETE /api/research/{id}`
- `POST  /api/news`
- `DELETE /api/news/{id}`
- `GET   /api/contact` (list messages — admin only)

Public (no auth):
- `GET /api/research`, `GET /api/research/{id}`
- `GET /api/news`
- `POST /api/contact`
- `GET /api/health`, `GET /api/`

## Manual test plan (browser)
1. Visit `/admin/research` → should redirect to `/admin/login`.
2. Click **Sign in with Google**.
3. Complete Google OAuth.
4. Browser returns to `/admin/research#session_id=…`.
5. AuthCallback exchanges session_id, sets cookie, navigates to `/admin/research`.
6. Admin UI loads with the signed-in user info shown in the header.
7. Try POST/PATCH/DELETE actions — they must succeed.
8. Open the same URL in a private window with a non-whitelisted Google account → POST/PATCH/DELETE should return 403.
9. Click **Sign out** → cookie cleared, redirected to `/admin/login`.

## Direct API test (with curl + manual session row)
```bash
# create a dummy admin user + session row
mongosh "$MONGO_URL" --eval '
const dbN = "test_database"; // see DB_NAME in /app/backend/.env
const _db = db.getSiblingDB(dbN);
const userId = "user_" + Math.random().toString(36).slice(2, 14);
const token = "test_session_" + Date.now();
_db.users.insertOne({user_id: userId, email: "soumyajits2000@gmail.com", name: "Test", created_at: new Date()});
_db.user_sessions.insertOne({user_id: userId, session_token: token, expires_at: new Date(Date.now() + 7*24*3600*1000), created_at: new Date()});
print(token);
'

# call protected endpoint
curl -X POST "$BACKEND_URL/api/research" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title":"X","summary":"Y"}'
```

## Cleanup
```js
db.users.deleteMany({email: /test/});
db.user_sessions.deleteMany({session_token: /test_session/});
```

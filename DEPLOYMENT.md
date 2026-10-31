# Deployment guide

The source is ready to deploy, but this archive is **not** a claim of a deployed live site. You must supply your own MongoDB, hosting, Google and optional imgbb accounts. Use stable production domains rather than random preview URLs for authentication.

## 1. Database and secrets

Create an Atlas database user with access only to your application database. Add your server's outbound IP/range in Atlas Network Access. Prefer provider-specific egress rules; do not leave unrestricted access enabled on a real deployment. URI-encode special characters in database passwords.

Generate independent long random values for `BETTER_AUTH_SECRET` and `JWT_SECRET`. Never put either in a `NEXT_PUBLIC_*` variable. Keep secrets identical across server instances so a request remains valid when routed to another instance. Set `MONGODB_DB=studiospace` or your chosen name on every instance. Seed from a trusted local machine against that URI once, then remove/change `SEED_PASSWORD` in the production environment.

## 2. Recommended production topology: same-origin API proxy

A browser may block third-party cookies between `your-client.vercel.app` and `your-api.onrender.com`, even with `Secure; SameSite=None`. CORS headers cannot override that policy. To make login reliable without a custom domain, use the supplied Next.js rewrite:

- Browser opens `https://your-client.vercel.app`.
- Browser calls `https://your-client.vercel.app/api/*`.
- Vercel proxies those requests to `https://your-api.onrender.com/api/*` (or your server's Vercel domain).
- Set-Cookie responses belong to the client host, so auth is first-party.

### Client environment (Vercel)

```dotenv
NEXT_PUBLIC_API_URL=https://your-client.vercel.app
API_PROXY_URL=https://your-api.onrender.com
```

`API_PROXY_URL` is the actual server origin without a trailing slash or `/api`. It must not point back at the client. `NEXT_PUBLIC_API_URL` is intentionally the **client** origin in proxy mode. The included `next.config.mjs` rewrites `/api/:path*` only; page routing stays with Next.js.

### Server environment in proxy mode

```dotenv
NODE_ENV=production
CLIENT_ORIGIN=https://your-client.vercel.app
BETTER_AUTH_URL=https://your-client.vercel.app
TRUST_PROXY=true
MONGODB_URI=your-private-Atlas-URI
MONGODB_DB=studiospace
BETTER_AUTH_SECRET=your-generated-auth-secret
JWT_SECRET=your-different-generated-jwt-secret
GOOGLE_CLIENT_ID=your-optional-google-id
GOOGLE_CLIENT_SECRET=your-optional-google-secret
IMGBB_API_KEY=your-optional-imgbb-key
```

Here `BETTER_AUTH_URL` is the public origin that the **browser uses for auth**, not necessarily the backend deployment address. Never append `/api/auth` to this variable; BetterAuth appends its own base path. `CLIENT_ORIGIN` must exactly match the client protocol/host/port, with no trailing slash. `TRUST_PROXY=true` assumes a trusted single reverse proxy as on Render/Vercel; keep false for direct local use and review it for other hosting topologies.

Both BetterAuth and the application JWT use HTTPOnly cookies. The production configuration sets Secure and SameSite=None, as required. There is intentionally no hardcoded cookie Domain. Do not weaken the cookies to make an HTTP production deployment work; use HTTPS.

### Alternative: same-site custom subdomains

You can serve the UI at `https://app.example.com` and the API at `https://api.example.com`:

- Client: `NEXT_PUBLIC_API_URL=https://api.example.com`; leave `API_PROXY_URL` unset.
- Server: `CLIENT_ORIGIN=https://app.example.com`, `BETTER_AUTH_URL=https://api.example.com`.
- Keep production cookie settings. Requests already include credentials.

These are same-site HTTPS domains, so they avoid the cross-site Render/Vercel cookie problem. Do not use `*.vercel.app` and `*.onrender.com` as if they were custom same-site domains. For an arbitrary cross-site arrangement, cookies may work only in browsers that allow third-party cookies; use proxy mode instead.

## 3. Deploy the API to Render

1. Push **only the server folder's contents** to its own Git repository.
2. Create a Render Web Service with Node 22. If retaining the outer folder, set Root Directory to `studiospace-server` instead.
3. Build command: `npm ci --omit=dev`. Start command: `npm start`. Health check path: `/`.
4. Set the environment variables above. Let Render supply `PORT`; the app binds to `0.0.0.0`.
5. Deploy and check `https://your-api.onrender.com/` returns JSON with `status: "ok"`.
6. Seed once using the deployed database URI from your local terminal. Do not seed in the Render build/start command.

Free services may cold-start. The UI displays loaders and retry states, but an initial request can still take longer than a paid always-on instance.

## 4. Or deploy the API to Vercel

1. Import the server repository into Vercel as an **Other** framework project using Node 22.
2. Use the repository's `api/index.js` serverless handler and included `vercel.json`. Do not run the listening `src/index.js` as the serverless entry.
3. No static output directory is needed. Install dependencies with `npm ci`; no application build command is required.
4. Add the same server env vars, with `NODE_ENV=production` and the browser-visible `BETTER_AUTH_URL`. Vercel handles the port; do not set `PORT` for a function.
5. The rewrite routes all paths to the API function. Express still handles `/api/auth/*` and application `/api/*` URLs. Database connection setup is cached per warm function instance.
6. Configure Atlas network access for your provider. Keep database connection count and function limits in mind on free tiers. The optional upload route caps incoming files at 3 MB to remain under common function body limits; large uploads are deliberately not supported.

If the server project offers automatic Express detection, retain the included serverless handler/rewrite configuration as one coherent deployment method rather than adding a second conflicting entry point.

## 5. Deploy the client to Vercel

1. Push the **client folder's contents** to a separate repository.
2. Import as Next.js. Use Node 22, install `npm ci`, build `npm run build`, default Next.js output. If importing the outer archive folder, set Root Directory to `studiospace-client`.
3. Add the matching client environment variables from your chosen topology and deploy.
4. No catch-all `/index.html` rewrite is needed. Do not use `output: "export"`. Next.js resolves direct visits to `/my-bookings`, `/studios/[id]`, etc.
5. After learning the final domain, update server `CLIENT_ORIGIN`, `BETTER_AUTH_URL`, Google callbacks and the client's `NEXT_PUBLIC_API_URL`. Redeploy **both sides** after changing URLs. Client public env vars are embedded at build time.
6. Enter the actual live URL into the README before handing in the assignment.

## 6. Google sign-in

In Google Cloud Console, create a Web application OAuth client and configure the consent screen. In testing mode, add examiner Google accounts as test users. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` on the server.

Authorized redirect URI:

- Local: `http://localhost:5000/api/auth/callback/google`
- Proxy production: `https://your-client.vercel.app/api/auth/callback/google`
- Direct custom-subdomain production: `https://api.example.com/api/auth/callback/google`

If Google asks for authorized JavaScript origins, add the UI origin and the public auth origin. The callback URI must match exactly. After Google returns, the client session provider obtains the application JWT before a private page renders. Google buttons show a clear toast when the provider is not configured; email login is independent.

## 7. Image uploads

Set only `IMGBB_API_KEY` on the server. The authenticated client sends multipart `image` to `/api/uploads`; Express forwards it to imgbb and returns the URL. The browser never receives the API key. This avoids imgbb cross-origin credential/CORS problems. Without a key, paste a public image URL into the listing form. JPG, PNG and WebP up to 3 MB are accepted. imgbb and Google external calls must be allowed by your hosting network.

## 8. Production acceptance checklist

- Open Home, Explore and a detail URL directly. Refresh each.
- Register and confirm the redirect to Login. Log in, then refresh each private route without a login redirect.
- In browser DevTools, verify BetterAuth and `studiospace_token` cookies are HttpOnly/Secure/SameSite=None on HTTPS. They should not be readable in `document.cookie`.
- Check the network token exchange succeeds. A 401 with no persisted session usually means an origin/cookie mismatch; inspect the browser's blocked-cookie explanation.
- Test Google, logout, then revisit a private route. An old JWT must not survive a revoked session.
- Test studio ownership with two accounts, confirmed overlap rejection, adjacent booking and Pending-only cancellation.
- Verify no real secrets or `.env` were pushed, and the public demo password is appropriate for the classroom environment.

**Common mistakes:** CORS wildcard with credentials, trailing slash on CLIENT_ORIGIN, wrong Google callback, HTTP instead of HTTPS, mixing localhost/127.0.0.1, forgetting to rebuild the client after env changes, and direct cross-site cookies blocked by the browser. No CORS configuration can fix the last issue; use the proxy or custom subdomains.

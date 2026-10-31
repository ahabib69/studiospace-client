# Testing and examiner walkthrough

## Automated checks

From the client:

```bash
npm ci
npm run lint
npm run build
npm audit --omit=dev
```

From the server:

```bash
npm ci
npm test
# Stop any local API on port 5000 before this command.
npm run test:integration
npm audit --omit=dev
```

`test:integration` runs the real Express app and BetterAuth against an isolated `mongodb-memory-server` database. It overrides the DB URI and uses random short-lived test secrets/passwords. It does not alter your local or Atlas application database. The first run downloads a MongoDB binary; Linux needs the normal MongoDB system runtime libraries. Run integration tests on your development machine, not on serverless production.

## Checks performed while preparing this archive

- Next.js production compilation and prerendering of all routes.
- ESLint on client source.
- Four Node unit tests: password policy, adjacent/overlapping slots, date/time validation and invalid studio input.
- Real MongoDB/BetterAuth integration: seed, sign-up, sign-out, email login, session read, JWT exchange, protected unauthenticated rejection, 14 public studios, six featured studios, own listings, create/edit/delete, non-owner rejection, confirmed 409 overlap, allowed adjacent session, server-calculated price despite a forged total, cancellation and rejection of non-Pending cancellation.
- Headless Chromium at desktop and mobile sizes: six featured cards, saved theme after refresh, logged-out redirect preserving destination, successful login, authenticated private-route refresh, creating a listing, booking it, cancelling it, mobile category filtering/menu, illustrated 404 and no client page errors during that workflow.
- Production dependency audits after dependency updates.

Google OAuth, imgbb upload success with a live API key, provider deployments and real HTTPS cookies require your service credentials and were not externally exercised here. No deployed URL is claimed. The local browser flow passed both the direct API configuration and the same-origin Next.js API proxy configuration. Live HTTPS deployment still needs the production checklist.

## Manual acceptance steps

### Public pages

1. Seed the database and open `/`. Confirm at least three hero slides, six featured spaces, five category links, booking steps and host/support content.
2. Click Art Workshops: `/studios?category=Workshop` should show three seeded workshop listings. Clear filters, search for Brooklyn, and compare low/high rate sorts.
3. Search for a nonsense name. The empty state must offer a clear-filters action.
4. Open a studio. Check gallery arrows, amenities, rate, deposit, host email, capacity and reviews.
5. Open an unknown page. Use Return to Home.
6. Toggle theme. Refresh a public page and a private page; the theme should remain selected without an initial opposite-theme flash.
7. Test the mobile menu, account menu and footer newsletter. The newsletter intentionally reports a demonstration success without storing your email.

### Authentication

1. Open `/my-bookings` logged out; URL becomes `/login?next=%2Fmy-bookings`.
2. Register with a lowercase-only, uppercase-only or short password. The exact uppercase/lowercase/6-character policy message appears in the form, and no registration request is sent.
3. Register valid details, then confirm redirect to `/login`. Try a wrong password; see a toast and inline message.
4. Log in and confirm return to the originally requested page.
5. Refresh `/dashboard`, `/add-studio`, `/my-listings`, `/my-bookings` and an owned `/studios/edit/[id]`. A loader may appear while sessions load, but there must not be a login redirect for a valid session.
6. Log out, then return to a private route. You should be redirected again. No recovery/email-verification service is implemented or promised.
7. Configure Google, sign in with an authorized test account, and repeat the private refresh check.

### Listings and security

1. Log in as `examiner@studiospace.test` / `StudioDemo123` after the default seed.
2. Add a listing. Enter an image URL or configure server `IMGBB_API_KEY` and upload a JPG/PNG/WebP up to 3 MB. Check the success toast and redirect to My Studio Listings.
3. Edit the listing, change rate and amenities, save and reload its detail page.
4. Click Delete, then Keep studio. The listing must remain. Delete again and confirm; it should disappear.
5. Use a second account to try a first-account edit/delete via API. The server returns 403, even if the request body claims the first owner's email. Unauthenticated mutations return 401 JSON.
6. Remove the app JWT cookie while keeping the BetterAuth session. The next private API request should renew it once and succeed.

### Bookings

1. The seed prints a future Confirmed slot for The Daylight Loft, 10:00–12:00. Pick the printed date and try 11:00–13:00. The UI displays the conflict and prevents confirmation. Calling POST `/api/bookings` with that interval returns 409 with the same clear message.
2. Book 12:00–13:30 on that date. Adjacent sessions must work; total for the seeded $85/hour rate is $127.50. Status is Pending.
3. Try an earlier date or end before start. No booking should be saved. API validation must reject the same invalid inputs even without the UI.
4. Try sending `totalPrice: 1`, a forged userEmail or `status: "Confirmed"` manually. The saved user must be the authenticated user, price recalculated, status Pending.
5. Cancel the Pending booking through its custom dialog. Status becomes Cancelled, and the cancel action disappears.
6. Confirmed/Completed/Cancelled bookings cannot be cancelled. Seeded Confirmed booking should have no cancel button. A manual API cancellation attempt returns 409.
7. Another user cannot list or cancel your booking records. Pending requests may overlap each other by design; there is no automatic confirmation flow.

## Notes on realism

Images are remote, illustrative Unsplash URLs; the application needs internet access for them. Reviews, hosts and locations in seed data are written demonstration content, not claims about real businesses. No actual payments, insurance guarantee or staffed support are provided. Booking wall-clock times are interpreted locally to the studio, while date-in-the-past validation uses the server calendar; do not use this assignment as a multi-timezone production scheduler without adding explicit studio timezone data.

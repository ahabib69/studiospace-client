# StudioSpace — client

A cinematic, responsive frontend for discovering and requesting creative workspaces by the hour.

**Live site:** https://studiospace-asad.vercel.app

**API:** https://studiospace-server-nine.vercel.app

**Examiner login:** examiner@studiospace.test / StudioDemo123

**Booking conflict demo:** The Daylight Loft already has a Confirmed booking on 2026-12-15, 10:00-12:00. Try 11:00-13:00 that day to see the conflict error. Try 12:00-13:30 to see an adjacent slot succeed.

## Features

- Three-slide Swiper hero and a MongoDB-backed, six-card featured section.
- Search by studio/city, category deep links and price/rating sorting.
- Studio details with gallery carousel, amenities, host information and realistic seed reviews.
- BetterAuth email/password and Google sign-in with safe return-to-page redirects.
- Reload-safe private routes that wait for the session and app JWT before rendering.
- Host dashboard, reusable create/update form, optional imgbb upload and custom delete confirmation.
- Live booking totals, confirmed availability, meaningful 409 toasts and Pending-only cancellation.
- Site-wide light/dark theme, saved locally and applied before paint.
- Sticky responsive navigation, mobile menu, footer with X logo, skeletons, error/empty states and illustrated 404.
- Sonner feedback for auth, studio mutations, bookings, uploads and the demonstration newsletter form.

## Stack

Next.js 16 App Router · React 19 · JavaScript · Tailwind CSS 3 · DaisyUI 4 · BetterAuth React client · Swiper · Lucide · Sonner. DaisyUI is the only UI component library. See `package-lock.json` for exact installed versions.

## Local setup

Requires Node.js 22 and the running StudioSpace Express API.

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Default `NEXT_PUBLIC_API_URL=http://localhost:5000`. Open http://localhost:3000. API and UI must both use localhost in development. Google is optional; email/password works without OAuth credentials. To upload files, put an imgbb API key in the **server's** `IMGBB_API_KEY` environment variable. Without it, pasting a public image URL is fully supported. No API secrets belong in this client repository.

```bash
npm run lint
npm run build
npm start
```

The `API_PROXY_URL` variable is optional. In production it enables same-origin `/api/*` rewrites; see the deployment guide for its matching API URL settings. `NEXT_PUBLIC_*` changes require a rebuild.

## Examiner test credentials

Seed the server first.

| Field    | Demo value                  |
| -------- | --------------------------- |
| Email    | `examiner@studiospace.test` |
| Password | `StudioDemo123`             |

These match `SEED_PASSWORD` in the server example environment. A changed seed password takes precedence. Never reuse this demo password for a real account.

## Pages

| Path                      | Access / purpose                                               |
| ------------------------- | -------------------------------------------------------------- |
| `/`                       | Hero, featured spaces, categories, booking steps, host support |
| `/studios`                | Explore; URL-based search, category, sort                      |
| `/studios/[id]`           | Details, gallery and booking request dialog                    |
| `/login`, `/register`     | Authentication                                                 |
| `/dashboard`              | Private account navigation                                     |
| `/add-studio`             | Private listing form                                           |
| `/my-listings`            | Private owner-only listing management                          |
| `/studios/edit/[id]`      | Private owner-only update form                                 |
| `/my-bookings`            | Private reservations and Pending cancellations                 |
| `/how-it-works`, `/about` | Project and booking information                                |
| `/terms`, `/privacy`      | Honest demonstration scope and data handling                   |

Unknown paths use `app/not-found.jsx`. All routes run under Next.js, not a static SPA export, so direct links and refreshes resolve correctly on Vercel.

## Code layout

`src/app` contains route entry points. `src/components` contains focused UI and page components. `src/hooks/useData.js` handles loading, errors and refetching. `src/lib/api.js` centralizes credentialed requests and retries an expired app JWT once. `Providers.jsx` loads BetterAuth, exchanges the session for a JWT and exposes session state. `PrivatePage.jsx` never redirects until that work finishes.

## Scope

Booking requests start Pending. No payment or automatic confirmation is implied. Newsletter signup is a success-toast demonstration and does not store emails. The seed data is fictional. Optional wishlist and PDF invoices are not included. Google, external image hosting and deployment require your own service configuration.

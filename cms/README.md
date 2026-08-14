# rsd-manual CMS

Payload 3 admin for the RSD Manual. Managing editors log in here to edit
pathway text, save drafts, preview on the staging site, and request publish.
Publishers (Managing Editors) approve and publish.

This directory is a **scaffold**. It is not yet installed or deployed. To
bring it live, follow the steps below.

## Prerequisites

- A Postgres database. Options:
  - **Vercel Postgres** (recommended) — one-click from the Vercel dashboard.
  - **Neon** — free tier is enough for content of this size.
- A **Resend** account for transactional email (free tier is enough).
- Node 20+.

## Local setup

```bash
cd cms
cp .env.example .env
# Fill in DATABASE_URL, PAYLOAD_SECRET, RESEND_API_KEY, SITE_URL

npm install
npm run dev
```

Then open http://localhost:3001/admin. First visit creates the first admin
user. After that, use the Users collection to add editors and publishers.

## Seeding the current content

Once the DB is up, run the seed script to import today's hardcoded
`src/data/modules.ts` into the `pathways` collection:

```bash
npm run seed
```

The script is idempotent — safe to re-run. It populates each card's
`illustrationKey` from the current asset filename.

## Deploying to Vercel

The CMS is a Next.js app. Point Vercel at the `cms/` directory (or set it up
as a separate Vercel project alongside the SPA):

1. New Vercel project → connect the same repo → root directory `cms/`.
2. Set env vars from `.env.example`.
3. Deploy.

Optionally, on the main SPA project add a rewrite from `/admin/*` → the CMS
domain so editors can use one URL. See `vercel.json` in the repo root.

## Roles

| Role         | Can save drafts | Can request publish | Can publish |
| ------------ | :-------------: | :-----------------: | :---------: |
| `editor`     | ✓               | ✓                   |             |
| `publisher`  | ✓               | ✓                   | ✓           |
| `admin`      | ✓               | ✓                   | ✓           |

Only `admin` can add users and change roles. Only `admin` can change a slide's
`illustrationKey` — for V1 nothing should ever need this.

## The Whitehall parallel

| Whitehall concept        | Where it lives here                             |
| ------------------------ | ----------------------------------------------- |
| Integration environment  | Vercel Preview URL reading `?draft=true`        |
| Production environment   | Vercel Production URL reading published content |
| Managing Editor          | `publisher` role                                |
| Writer                   | `editor` role                                   |
| "Submit for publication" | POST /api/pathways/request-publish              |
| "Publish now"            | Payload's built-in Publish action               |
| Preview URL              | Payload Live Preview + `/preview/pathway/:slug` |
| Version history          | Payload Versions (unlimited, one-click rollback) |

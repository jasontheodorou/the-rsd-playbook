# RSD Playbook

An interactive learning tool for service designers and interaction designers working at Transform UK. Two pathways: a guided foundations slide deck and a role-filtered modular practice library.

## What it is

- **Pathway 1 — Foundations:** a 10-slide deck covering the core principles of research and service design at Transform.
- **Pathway 2 — Practice:** a tabbed, card-based learning library. Content is filtered by role (service designer or interaction designer) and account (HMCTS, DfE). Progress is tracked per user session.

## Stack

- React 19 + TypeScript + Vite 8
- Mantine v7 component library (Transform UK brand via Valencia theme)
- Framer Motion for slide transitions and illustration entry animations
- localStorage for auth, profile, and progress (V1 demo — no backend required)
- Zod for content validation

## Getting started

```bash
cp .env.example .env
# edit .env — at a minimum set VITE_GATE_PASSWORD for a non-dev build

npm install
npm run dev        # http://localhost:3007
```

## Demo accounts

| Email | Password | Role |
|---|---|---|
| `servicedesigner@demo.com` | `sponges123!` | Senior Service Designer |
| `interactiondesigner@demo.com` | `sponges123!` | Consultant Interaction Designer |

Each account sees a different module set. Account context (HMCTS or DfE) is set during the intake form after sign-in.

## Content

All pathway text lives in one of two places:

- **Pathway 1 (foundations)** — React components in `src/slides/foundations.tsx`. Not currently CMS-editable.
- **Pathway 2 (modules)** — data in `src/data/modules.ts`. Read via `src/lib/content/`, which is the abstraction layer that will flip to the CMS once it's live.

The SPA reads content through `src/lib/content/client.ts`. Today it returns local data; when `VITE_CMS_URL` is set it fetches from the CMS with timeout, retry, and Zod validation, and fails open to the local copy if the CMS misbehaves. Editors never touch this file.

## Backend / editor workflow (V2 — Payload CMS)

Scaffolded under [`cms/`](./cms). Not yet live.

Once provisioned, editors log in at `/admin`, edit **text only** (illustrations are fixed in V1), preview drafts on the staging URL, and either publish (if they have the publisher role) or click **Request Publish** to email the publishers.

Whitehall Publisher pattern applied to this project:

| Whitehall concept        | Where it lives here                               |
| ------------------------ | ------------------------------------------------- |
| Integration environment  | Vercel Preview URL reading `?draft=true`          |
| Production environment   | Vercel Production URL reading published content   |
| Managing Editor          | `publisher` role (Payload Users collection)       |
| Writer                   | `editor` role                                     |
| "Submit for publication" | POST /api/pathways/request-publish                |
| "Publish now"            | Payload's built-in Publish action (gated to role) |
| Preview URL              | Payload Live Preview + `/preview/pathway/:slug`   |
| Version history          | Payload Versions (unlimited, one-click rollback)  |

### Bringing the CMS live — steps for the human

1. Provision a Postgres database (Vercel Postgres or Neon free tier).
2. Sign up for Resend and grab an API key.
3. Copy `cms/.env.example` → `cms/.env` and fill in every var.
4. `cd cms && npm install && npm run dev` — first login creates the first admin.
5. `npm run seed` inside `cms/` — imports current `modules.ts` into the CMS.
6. Set `VITE_CMS_URL` on the SPA (locally in `.env`, and in Vercel).
7. Deploy the CMS to Vercel (either as a separate project or via the rewrites in `vercel.json`).

Once live, the SPA content path becomes: **modules.ts → CMS → SPA**, with the CMS as source of truth. Adding an editor is a one-click action in the CMS Users collection.

### V1 scope of editability

- ✅ Card titles, minutes, roles
- ✅ Card content: paragraphs, headings, lists, callouts (variant + body + CTA)
- ✅ Module titles and descriptions
- ✅ Drag-and-drop reorder of cards within a module
- ✅ Save draft → request publish → publisher approves
- ❌ Illustrations and animations (fixed at build time)
- ❌ New pathways (must be created by an admin, not an editor)

## Build and deploy

```bash
npm run build      # outputs to dist/
```

Deployed on Vercel. `vercel.json` includes a catch-all rewrite so all routes resolve to `index.html`.

## Environment variables

See `.env.example` for the SPA and `cms/.env.example` for the CMS.

## Resilience patterns applied in V1

- Fail-closed access gate (`AccessGate` returns false when `VITE_GATE_PASSWORD` is absent in production).
- Every `localStorage` access is guarded and logs to a single sink (`src/lib/log.ts`) — no silent catches.
- React `ErrorBoundary` wraps the app tree — a bad content payload or unexpected render error surfaces a fallback rather than a white screen.
- CMS fetches: 8s timeout, one retry with jitter, Zod validation on read, fail-open to local content.

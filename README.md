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

## Getting started

```bash
npm install
npm run dev        # http://localhost:3007
```

## Demo accounts

| Email | Password | Role |
|---|---|---|
| `servicedesigner@demo.com` | `sponges123!` | Senior Service Designer |
| `interactiondesigner@demo.com` | `sponges123!` | Consultant Interaction Designer |

Each account sees a different module set. Account context (HMCTS or DfE) is set during the intake form after sign-in.

## Build and deploy

```bash
npm run build      # outputs to dist/
```

Deployed on Vercel. The `vercel.json` at the project root includes a catch-all rewrite so all routes resolve to `index.html` — without it, direct URL hits 404 on a static SPA.

Add these environment variables in the Vercel dashboard (not currently active in V1, kept for V2):

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (safe to expose in frontend) |

## Content

All module content lives in `src/data/modules.ts`. Each card has `roles` and `content` fields; `getModulesForUser()` filters by email prefix and injects the correct account intro card. To add a new role or account, extend the routing logic in that function.

## V2 notes

V1 uses localStorage and hardcoded credentials — intentionally simple for a stakeholder demo. V2 will restore Supabase for real user management, with `auth.users`, `profiles`, and `progress` tables (RLS-enabled schema already designed during the V1 build).

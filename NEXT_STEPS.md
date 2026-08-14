# Next steps — bringing the editor CMS live

Written 2026-08-12 so you can pick this up cold in a week or a year.

## Where you left off

You asked for a Whitehall-style publishing setup: managing editors log in, edit **text** on the pathways, preview their changes on a staging URL, and either publish (if they're a publisher) or click "Request Publish" to email a publisher. Illustrations stay fixed in V1.

Claude scaffolded the whole thing but stopped short of anything that needs an internet service (a database, an email provider, a deployment). Everything below is what those remaining steps are.

## What's already done (don't redo this)

- Every file the CMS needs is in [`cms/`](./cms). Configuration, content model, roles, publish workflow, seed script.
- The SPA has been prepped: when `VITE_CMS_URL` is set, it fetches from the CMS instead of the hardcoded content. When it isn't set, nothing changes and the site works as it does today.
- Error handling, logging, and an ErrorBoundary have been added across the SPA — the existing site is now noticeably more robust regardless of whether the CMS ever goes live.
- The current site still builds and runs unchanged. None of this work broke anything.

## What still needs to happen

Two paths. Pick one.

### Path A — Hand it to a developer (recommended)

Send them this repo and this message:

> Claude scaffolded a Payload CMS in `cms/`. Please provision Postgres (Vercel Postgres or Neon), grab a Resend API key, then follow `cms/README.md` — install, first-boot the admin, run the seed script, and deploy to Vercel. Once the CMS URL is live, set `VITE_CMS_URL` on the SPA's Vercel project so the site reads from the CMS. Also add a `/preview/pathway/:slug` route on the SPA so Payload's Live Preview can iframe it — that's the one piece that wasn't scaffolded because it needed a live CMS to test against.

That's it. A competent web developer should need half a day.

### Path B — Do it yourself

Rough time: an evening, if you're comfortable in a terminal. Longer if you're not.

**1. Sign up for two services**

- **Database:** [vercel.com](https://vercel.com) → Storage tab → Create Postgres, OR [neon.tech](https://neon.tech) → Create project. Either way, copy the connection string that starts with `postgres://`.
- **Email:** [resend.com](https://resend.com) → sign up → API Keys → create one. Copy the key that starts with `re_`.

Both have free tiers that are more than enough for this project.

**2. Configure the CMS locally**

```bash
cd cms
cp .env.example .env
```

Open `cms/.env` in an editor. Fill in:

- `DATABASE_URL` — the Postgres URL from step 1.
- `PAYLOAD_SECRET` — any long random string. Type gibberish or run `openssl rand -hex 32`.
- `RESEND_API_KEY` — the `re_...` key.
- `RESEND_FROM` — an email address the "publish request" emails will come from. `no-reply@transformuk.com` if that's set up, or your own email while testing.
- `SITE_URL`, `CMS_URL` — leave the localhost defaults for now; change when you deploy.

**3. Start the CMS locally**

```bash
cd cms
npm install
npm run dev
```

Open `http://localhost:3001/admin`. First visit asks you to create an admin user — that's you. Make it `admin`.

**4. Import the current content**

In a second terminal:

```bash
cd cms
npm run seed
```

Two pathway documents appear in the admin. Poke around. Confirm you can edit text and save drafts.

**5. Deploy to Vercel**

Go to Vercel dashboard → New Project → import this same repo → set the **root directory** to `cms`. Copy the env vars from step 2 into Vercel's dashboard. Deploy.

You'll get a URL like `rsd-manual-cms.vercel.app`. Editors log in there.

**6. Point the SPA at the CMS**

On the SPA's existing Vercel project, add an env var: `VITE_CMS_URL=https://rsd-manual-cms.vercel.app` (whatever you got in step 5). Redeploy.

Now the live site reads from the CMS instead of the hardcoded content.

**7. Missing piece — the preview route**

This one wasn't scaffolded and does need a developer. Right now editors can save drafts, but there's no page on the SPA that renders "the pathway as it would look with these draft edits." That's a route like `/preview/pathway/:slug?draft=true` on the SPA — small piece of work, but not something you can click your way to.

If you don't have this yet, editors can still edit and publish, they just won't be able to preview changes before hitting publish. Version history means any bad publish is one click to roll back, so it's fine to launch without preview and add it later.

## Costs

Everything on the free tier. Rough limits:

- **Vercel Postgres** — 256 MB storage, 60 hours of compute/month. This project uses well under 1 MB.
- **Neon** — 500 MB storage, unlimited compute (with limits per branch). Also fine.
- **Resend** — 3,000 emails/month free. Publish requests are rare; you'll use maybe 10 a month.
- **Vercel** hosting — the existing SPA project already uses this. Adding a second project is free.

No credit card needed to start.

## Rolling back

If anything goes wrong: `git checkout` back to any earlier commit. The SPA reads from `modules.ts` again the moment `VITE_CMS_URL` is unset. Nothing about the current work has removed the option to go back.

## Files worth knowing

- `cms/README.md` — the technical version of this document, for whoever runs the setup.
- `cms/.env.example` — the env vars template.
- `cms/src/collections/Pathways.ts` — the content model. If someone asks "what fields can editors edit?", this is the answer.
- `src/lib/content/client.ts` — the SPA's data layer. Handles the local/CMS switch.
- `README.md` (root) — updated overview with the Whitehall parallel.

## When you come back to this

If it's been a while, do these three things first:

1. Read this file.
2. Read `cms/README.md`.
3. Run `git log --oneline -20` to see what's landed since.

That's the fastest way back into context.

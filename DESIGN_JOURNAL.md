# Design Journal

A running record of design decisions, trade-offs, and things learned during the build. Newest entries at the top.

---

## 2026-07-31 — Vercel SPA routing

**Decision:** Added `vercel.json` with a catch-all rewrite before the first deploy.

Vite builds a static SPA — only `index.html` exists on disk. Without the rewrite, any direct URL hit (a bookmark, a refresh, a shared link) returns a Vercel 404 because the server looks for a real file. The fix is one line of config at the project root:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

If API routes are added later, list them *before* the catch-all in `vercel.json` or they'll be swallowed.

---

## 2026-07-30 — Illustration and animation approach

**Decision:** Blur-to-sharp for illustration entry; spring physics for icons; text always arrives before images.

A pure fade or scale-up reads as a loader. The pattern that reads as intentional: text arrives first, illustration follows ~120ms later with `filter: blur(4px) → blur(0)` combined with `scale(0.97) → scale(1)` over ~400ms. The blur creates a sense of the image coming into focus rather than just appearing.

Spring physics (`stiffness: 280, damping: 20`) is right for icon grids and diagrams — tactile without being cartoonish. Timed ease is right for full-bleed illustrations — cinematic rather than bouncy. The distinction: illustrations *settle*, icons *bounce*.

**Decision:** Entrance-only animations — no `AnimatePresence mode="wait"`.

With exit + entrance both running, total perceived latency is ~440ms. The user noticed immediately. For sequential content navigation, the new content arriving is the signal; the old content disappearing is noise. Default: `motion.div` with `initial / animate` only.

**Decision:** Container width is fixed infrastructure — never widen it for an image.

A "list + image side-by-side" layout was built and removed because it required a wider container. When the column widened, the heading appeared to shift even though it stayed left-aligned. If an image can only fit by widening the container, choose a different image or a different layout.

**Decision:** Photography crops of people should use `objectPosition: top`.

`object-fit: cover` with default `center` cuts off heads. For workshop and co-design photography, `top` preserves subjects and removes from the bottom.

---

## 2026-07-29 — Auth approach for V1

**Decision:** Scrapped Supabase entirely for V1. Using localStorage + hardcoded credentials.

Three known users for a stakeholder demo have no need for a real auth backend. Each Supabase configuration touchpoint (email confirmations, RLS policies, redirect URLs) is friction that can break the demo without warning. localStorage gives the same "progress persists across refreshes" experience with zero external dependency.

Supabase remains the correct choice for V2. The schema was designed during the V1 build (auth.users + profiles + progress tables, all with RLS enabled before any real data is written) and is ready to restore.

**Decision:** Removed the auth gate interstitial — go directly to sign-in.

The auth gate explained that Pathway 2 requires an account, then offered two CTAs. When self-registration was disabled, only sign-in remained — making the screen "here is a button to the sign-in screen." Any interstitial that ends with a single action is replaceable by the action itself. The sign-in page explains by its existence that authentication is required.

**Decision:** Sign-in page reuses the `PracticeForm` visual layout, not the GDS pattern.

The GDS sign-in pattern (left-aligned, sparse, no card) was implemented first and rejected immediately. The winning approach: the same visual layout as the adjacent `PracticeForm`. For internal products with a small known audience, visual consistency between adjacent screens matters more than following an external pattern guide.

**Decision:** Deferred the admin content console to V2.

An admin UI for module content management was scoped (~2–3 days). Deferred because without a backend, edits vanish on page reload — making it useless for content designers and misleading for stakeholders. Build the backend contract first, then the admin UI.

---

## 2026-07-29 — Content architecture

**Decision:** Module content lives in `src/data/modules.ts` with `roles` fields on every card.

Even though V1 shows the same modules to everyone, role- and seniority-based filtering is a known V2 requirement. Adding `roles` metadata at authoring time costs nothing; retrofitting it later means touching every component that renders content. Personalisation is now one `.filter()` call away.

**Decision:** Seed data must exercise all visual states.

The module cards use colour-tinted resource groups (mist, yellow, blush) as a core visual treatment. When the first seed data was sparse (one group per card or fewer), the component appeared "visually dead" — as though the colour system hadn't been implemented, even though it worked. Seed data that doesn't cover all visual variants misrepresents the component to stakeholders. Write data that makes the component look like it was designed to look.

**Decision:** Dropped `ModuleLanding` before the MD demo.

The index page (form → index → module view) added a navigation step without adding persuasive value. The tabbed `ModuleView` with sidebar and progress tracking is what sells the concept. Every screen before the most impressive screen is a risk the audience bails. Cut intermediate navigation steps for demos; restore them in V2 once the concept is bought.

---

## 2026-07-30 — Role-based content routing

**Decision:** Derive role from email prefix, not a separate field.

The two demo accounts are named `servicedesigner@demo.com` and `interactiondesigner@demo.com`. The email already encodes the role. Adding a separate role field to re-encode information the address already carries would be redundant for a two-user prototype.

This is explicitly fragile by design. A production system would store role as a first-class field on the user record. Don't copy this pattern forward.

---

## 2026-07-26–27 — Form component choices

**Decision:** Replaced custom selection tiles with Mantine `Select` dropdowns in `PracticeForm`.

Custom tiles were built before any visual validation. The user rejected them on first sight. Standard Mantine `Select` achieved the same result with a fraction of the code and no custom styling. Rule: default to the framework's native control first. Build a custom component only once the native version has been validated and found wanting.

---

## 2026-07-24 — Foundations (Pathway 1)

**Decision:** Closing slide is a separate, uncounted card — not a CTA tacked onto slide 10.

Content slides that end with both a reflection exercise and two CTA buttons competing for attention are messy. The cleaner pattern: content slides end on their content; an explicit closing card (slide 11) exists solely for the transition — headline, brief copy, one primary action.

**Decision:** Slide counter hides on the closing card using a `countedSlides` prop.

Showing "11 / 11" on the closing slide breaks the experience — the user has already "finished." The `countedSlides={10}` prop lets the component derive a capped progress; the counter, progress bar, and dot indicators all respect it and hide when `currentIndex >= countedSlides`.

**Decision:** Decorative SVGs (PathwayFork) removed — twice.

A branching SVG diagram was built twice to illustrate the binary pathway choice and removed both times. The choice was already obvious from the card layout. Decorative structural diagrams add noise when the IA is already self-explanatory. When a decorative element fails on first look, question the premise before building a variant.

---

## 2026-07-24 — Tech stack

**Decision:** Vite + React + TypeScript + Mantine v7, Transform Valencia theme.

Mantine v7 is what Valencia is built on — any other library risks brand drift. The `accessibility-primer` prototype proved this stack produces the correct branded output. Two configuration lines are non-negotiable: `defaultColorScheme="light"` on `MantineProvider`, and `body { background: #FAF8F6 }` in global CSS. Remove either and Mantine renders dark.

Cards are `#FFFFFF` with a hairline `#E6E3DF` border. Orange is accent-only: the 12px wordmark dot and a single headline underline. CTA buttons use Navy `#213D59`.

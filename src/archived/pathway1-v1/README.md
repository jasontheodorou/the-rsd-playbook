# Pathway 1 — v1 (archived 2026-08-14)

Snapshot of the original `src/slides/foundations.tsx` before pathway 1 was
replaced by the bleed-layout redesign (`src/pathway1/`).

Depends on components that still live in the main tree — reference only, not
runnable in isolation without wiring back up:

- `src/components/SlideDeck.tsx` (still present — used by `src/pages/LayoutPreview.tsx`)
- `src/components/DiscoveryStar.tsx` (unused by main build; kept for future
  pathway 2 work)
- `src/components/RebuildTower.tsx` (same)

If we ever want to restore, copy this file back to `src/slides/foundations.tsx`
and re-wire `App.tsx` to render `<SlideDeck slides={createFoundationSlides(…)} />`
for the `foundations` view.

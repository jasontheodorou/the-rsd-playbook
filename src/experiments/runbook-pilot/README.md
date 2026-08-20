# Runbook Pilot

> Internal workshop for developing editorial visual patterns before any of
> them are introduced into the main product. **Not** production surface.

## Route

`/experiments/runbook-pilot` — mounted from `src/App.tsx`. Deep links are
supported via the `?pattern=<id>` query string, e.g.
`/experiments/runbook-pilot?pattern=kinetic-type-field`.

The route is only wired in `App.tsx`'s pathname switch. It is **not** added
to any nav in the RSD Playbook shell.

## Directory layout

```
src/experiments/runbook-pilot/
├── RunbookPilot.tsx        · route entry + shell composition
├── RunbookPilot.css        · scoped `.rp-*` styles + `--rp-*` tokens
├── registry.ts             · PilotPattern[] source of truth
├── shell/
│   ├── PilotHeader.tsx     · title, subtitle, canvas + reduced-motion toggles
│   ├── PilotIndex.tsx      · left rail of patterns, aria-current on active
│   └── PilotStage.tsx      · meta + framed stage (single pattern at a time)
├── patterns/
│   ├── BlueprintLattice.tsx
│   ├── KineticTypeField.tsx
│   └── SignalGrid.tsx
└── README.md               · this file
```

Everything the pilot renders lives inside this directory. Nothing here is
imported by production components.

## Running locally

```
npm run dev
```

Then open `http://localhost:3007/experiments/runbook-pilot`
(the port matches `vite.config.ts`; if you started the dev server on 3011
during a session, use that instead).

## Adding a new pattern

1. Create `patterns/YourPattern.tsx` exporting a component whose signature
   is `(props: PatternProps) => ReactElement`. `PatternProps` is
   `{ reduced: boolean; theme: 'light' | 'dark' }` — patterns must honour
   both.
2. Register it in `registry.ts` by appending a new entry to `patterns`.
   Give it a stable `id`, a two-sentence `description`, three tags, and a
   `status` of `draft` or `review`.
3. Verify it renders via
   `node scripts/shot-runbook.mjs your-pattern-id desktop`.

Patterns must:

- Support reduced motion (render a complete static state).
- Avoid animating layout properties. Prefer `transform` and `opacity`.
- Be self-contained. No imports from `src/pathway1/`, `src/components/`, etc.
- Hide decorative SVG from assistive tech (`aria-hidden`, `role="presentation"`).

## Pattern registry contract

```ts
type PilotPattern = {
  id: string
  name: string
  description: string
  status: 'draft' | 'review' | 'approved'
  tags: string[]
  component: (props: PatternProps) => ReactElement
  defaultTheme?: 'light' | 'dark'
}
```

Only the user promotes a pattern to `approved`. `draft` and `review` are
authored freely; `approved` is a governance state.

## Reduced-motion expectations

Every pattern component reads a `reduced` prop derived from
`useReducedMotion()` in the shell, plus a shell-scoped override toggle in the
header. When `reduced === true`:

- No perpetual animation. `Signal Grid` pulses off; `Blueprint Lattice`
  renders complete on first paint.
- No pointer-driven effects. `Kinetic Type Field` disables its pointer skew.
- Entry animations may finish instantly, but they must never fail to place
  the composition in its final state.

## Screenshot testing

Three Playwright scripts live under `scripts/`:

- `shot-runbook.mjs <patternId?> <viewport?>` — captures one pattern (or all
  three) at `desktop | tablet | mobile`.
- `shot-reduced.mjs` — captures all three with OS-level reduced motion
  enabled, to validate the reduced state.
- `regression-smoke.mjs` — visits every relevant route and reports any
  console errors.

Outputs land in `.playwright-shots/runbook/`.

## Dependencies added specifically for the pilot

**None.** The pilot reuses `framer-motion` (already installed) and standard
DOM/SVG/CSS. No new packages.

## External component sources

None. Every pattern is authored inline in `patterns/`. If a future pattern
adapts external source, record the origin and licence in that pattern's
header comment.

## Removal procedure

To fully remove the pilot:

1. Delete `src/experiments/runbook-pilot/`.
2. In `src/App.tsx`, remove:
   - The `import { RunbookPilot } from '...'` line.
   - The `'runbook-pilot'` case in the `View` union.
   - The `getTrail` entry for `'runbook-pilot'`.
   - The pathname check `/experiments/runbook-pilot` in the initial state.
   - The `{view.type === 'runbook-pilot' && ...}` block.
3. (Optional) Delete `scripts/shot-runbook.mjs`, `scripts/shot-reduced.mjs`,
   `scripts/regression-smoke.mjs`.

No other files need to change. No config or dependency edits.

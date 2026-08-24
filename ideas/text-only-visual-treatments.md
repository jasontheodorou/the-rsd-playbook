# Text-only visual treatments for empty-feeling pages

Fifteen ways to give text-heavy pathway 1 slides — starting with s2 (Our
north star) and s3 (Good design matters) — a visual beat that doesn't
depend on adding another photograph.

Every idea below is compatible with the pathway's existing design
language:

- **Palette** — terracotta accent `#EC671B` (marker, focus rings, card
  corner tab); Transform navy `#213D59`; ink `#111`; body copy `#2A2A2E`
  / `#3A3A3E`; paper `#FCFBF8`; brand secondaries mist `#CBD9DA`, yellow
  `#F1D46E`, soft terracotta `#D8B4A3`, blue `#619CBA`.
- **Type** — Open Sans (400 / 500 / 700 / 800), Caveat (400 / 500,
  already loaded), Georgia serif for display quote marks.
- **Body rhythm** — prose→prose 16, prose→heavy 40–48, heavy→prose
  48–64, heavy→heavy 44–56.
- **Constraints called out earlier in the build**
  — no horizontal hairlines between items
  — no sepia / vintage tone
  — handwriting used sparingly
  — heavy blocks own their footprint (padding, not overhang).

Ideas are ordered roughly from most subtle (typographic-only) to more
decorative (small colour surfaces). Cherry-pick and combine.

---

## Group A — Pure typographic

### 1. Ink-drop initial

A drop-cap on the first letter of an opening paragraph. Transform navy
`#213D59`, weight 800, `font-size: 3.5em`, `float: left`, 2–3 line
descent, 6px right margin. Editorial classic; costs nothing beyond CSS.
Best on the opening paragraph of s2 / s4 / s7.

### 2. Kerned display lede

Promote the first body paragraph from the regular `.p1v2__prose`
(17px / 1.6) to a semi-headline treatment: `1.375rem`, weight 500,
`#111`, `letter-spacing: -0.005em`, `max-width: 30ch`. No colour, no
chrome — pure typographic weight to distinguish the "in this section"
line from the paragraphs that follow.

### 3. Kicker line + gap

A very small orange eyebrow line (10.5px, weight 700, tracking 0.24em,
`#EC671B`) sitting 12px above a paragraph, e.g. `IN PRACTICE`,
`WHAT THIS MEANS`, `WHY IT MATTERS`. Reuses the pilot-marker typography.
Zero decoration; adds pure hierarchy. Composable with every other idea.

### 4. Numbered stanzas

Break a long paragraph into 2–3 short stanzas, each preceded by an
orange marker-style numeral (`01`, `02`, `03`) at 11px, weight 700,
tracking 0.22em, `#EC671B`, on the line above the stanza. Stanzas
separated by 24px. Doesn't clash with the page's `.p1v2__marker`
eyebrow because the scale + placement differ.

### 5. Question / answer pair

Set a question in `1.75rem`, weight 700, navy `#213D59`, tight leading
(1.1), `max-width: 22ch`, above a `.p1v2__prose` paragraph that answers
it. Creates cognitive rhythm without introducing a new heavy block.
Works especially well on the failure-mode pages (s4, s5) and the
purpose pages (s2, s7).

### 6. Statement ladder

A vertical list of short statements, each preceded by an orange `→` at
cap-height (`#EC671B`). Font-size steps down slightly each line
(`1.125rem` → `1rem` → `0.9375rem`) to visually taper toward a
conclusion. No bullets, no dividers. Reads as a distilled manifesto
line.

---

## Group B — Micro-accents

### 7. Threshold rule

A short vertical orange rule to the left of one paragraph — 2px wide ×
24px tall, `background: #EC671B`, `margin-right: 16px`, aligned to the
first line's cap height. Marks a paragraph as a load-bearing statement
without changing its type. Use once per page, at most.

### 8. Rule-braced pull-line

Centre a single sentence at `1.5rem`, weight 500, navy, with two short
24px orange rules to either side (like `— sentence —`). Feels like a
section breath. Reuses the marker's rule idiom at a smaller scale.

### 9. Bracketed anchor

Wrap a short phrase in oversized orange angular brackets `⟨ … ⟩` using
Georgia serif, `3rem`, `#EC671B`, no fill, spaced from the wrapped text
by 12px. Editorial, and reuses the Georgia serif we already introduce
via `.p1v2__pullquote-mark`.

### 10. Marginal cross-reference

Beside a paragraph, a small right-column aside using eyebrow typography
(0.22em tracking, 11px, `#EC671B` or navy) prefixed with `→`, e.g.
`→ SEE ALSO · PARTICIPATION`. Two-column grid, roughly `8fr / 3fr`.
Costs no new colours, uses existing marker type. Great on pages where
the right rail sits quiet.

### 11. Handwritten margin note

A small note in Caveat (already loaded), 14px, weight 400, muted grey
`#6A7386`, offset to the right of a paragraph. Optionally a 1px
`#EC671B` line arrow pointing to the referenced word. Uses the same
handwriting we introduced for the ImagesReveal caption strip, so it
stays in-family.

### 12. Vertical eyebrow rail

A narrow 60px-wide left column on a paragraph containing a rotated
90° eyebrow (`WHY IT MATTERS`), terracotta, 11px, tracked 0.22em.
Left-anchored inside the body column, not full-page — so it doesn't
compete with the pilot's actual left progress rail.

---

## Group C — Small surfaces

### 13. Tinted paper strip

A `.p1v2__prose`-width block with a very subtly warmer tint (`#F4F0E8`,
~4% darker than paper `#FCFBF8`), no border, 24 / 32 padding. Same
footprint as a card but without chrome or corner tab. Introduces
warmth, not colour. Ideal for a definitional paragraph or a callout
quote that isn't display enough for the full pullquote treatment.

### 14. Terminology chips

A row of 2–3 pill chips: term in bold navy on `#CBD9DA` mist
background, 6 / 12 padding, `border-radius: 4px`. Sits between prose.
Introduces the mist accent (already used on the HHH pattern's Hands
title) so no new colour is added. Row wraps to stack on mobile.

### 15. Diptych card without image

Reuse the `.p1v2__card` grammar (white, 720px, hairline border,
`#EC671B` corner tab) but split it into two columns: left column a
single large numeral (72px, weight 800, `#EC671B`), right column a
short paragraph. Reads as a "stat" or "principle" block. Reuses the
card's border / corner-tab language completely so it stays in-family.

---

## Where each fits best

- **s2 · North star** — 1 (ink-drop), 2 (display lede), 5 (Q/A), 8
  (rule-braced), 15 (diptych principle).
- **s3 · Good design matters** — 3 (kicker), 4 (numbered stanzas), 9
  (bracketed anchor), 13 (tinted strip).
- **s4 / s5 · When it fails** — 5 (Q/A), 7 (threshold rule), 12
  (vertical eyebrow rail).
- **s7 · The craft** — 1 (drop-cap), 6 (statement ladder), 11
  (handwritten margin note).
- **s9 · HHH** — 15 (diptych) as a principle block above the HHH
  pattern.
- **s13 · Participation** — 10 (marginal cross-reference) linking
  back to earlier chapters; 14 (terminology chips) for "consultation
  vs. participation".

## Combinability rules

Some ideas stack cleanly, some fight each other. Rough guide:

- **Combine freely**: kicker (3) + any body treatment. Threshold rule
  (7) + any adjacent paragraph. Handwritten note (11) + any prose.
- **One per page**: drop-cap (1), Q/A pair (5), rule-braced pull-line
  (8), vertical eyebrow rail (12), diptych card (15). More than one of
  any of these on a single page starts to feel decorative.
- **Do not combine**: display lede (2) with drop-cap (1) — both compete
  for opening emphasis. Numbered stanzas (4) with statement ladder (6)
  — both are ordered-list-flavoured.

## Implementation cost (rough)

- Cheapest (pure CSS, no new component): 1, 2, 3, 7, 8, 9, 13.
- Small new component (5–15 lines JSX + a scoped CSS block): 4, 5, 6,
  10, 12, 14, 15.
- Slightly larger (needs the Caveat font already loaded + a positioning
  primitive): 11.

Every idea uses only tokens already present in `Pathway1.css` and
`ImagesReveal.css`. No new fonts, no new libraries.

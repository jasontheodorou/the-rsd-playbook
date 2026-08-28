#!/usr/bin/env node
/**
 * Capture each pattern in situ — as it actually appears in the Foundations
 * pathway — for the "Where it's used" section of /patterns.
 *
 * Usage:
 *   npm run dev                       # in one terminal
 *   node scripts/shot-insitu.mjs      # in another
 *   node scripts/shot-insitu.mjs pill-tabs      # just one
 *
 * Output: public/patterns/insitu/<id>.jpg, committed to the repo so the
 * library works on a fresh clone and in production without a capture step.
 * JPEG, not PNG: these are photo-heavy page views, and PNG came out at 8.3MB
 * for the set against ~600KB as JPEG with no visible loss at this size.
 *
 * Re-run this whenever a Foundations page changes shape, or the screenshots
 * will quietly describe a page that no longer exists.
 *
 * The pathway has no deep links — it's `useState(0)` inside Pathway1 — so we
 * drive it the way a reader would: unlock the gate, open the chapter panel,
 * click the page. PILOT_PAGES order (src/pathway1/pages.ts) gives the index.
 */

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = process.env.PORT || '3014'
const GATE_KEY = 'rsd_gate'
const GATE_PASSWORD = 'transf0rmRSD2026!'

/** Viewport for the capture. Wide enough to show the page around the pattern. */
const VIEW = { width: 1280, height: 820 }

/**
 * page  — index into PILOT_PAGES.
 * sel   — the element to centre. Selectors repeat across pages (ImagesReveal
 *         and the cover-reveal wrapper both use .p1v2__reveal) but are unique
 *         within a single page, which is all we need.
 * settle— extra ms to let entrance animations finish before the shutter.
 */
const TARGETS = [
  { id: 'quote-card',          page: 1, sel: '.p1v2__qcard',        settle: 900 },
  { id: 'images-reveal',       page: 2, sel: '.p1v2__reveal',       settle: 2200 },
  { id: 'ken-burns',           page: 2, sel: '.p1v2__media',        settle: 2600 },
  { id: 'pinned-photo',        page: 4, sel: '.p1v2__paired',       settle: 2800 },
  { id: 'cover-reveal',        page: 5, sel: '.p1v2__reveal',       settle: 1400 },
  { id: 'pill-tabs',           page: 5, sel: '.p1v2__tabs',         settle: 1200 },
  { id: 'head-heart-hands',    page: 6, sel: '.hhh-pattern',        settle: 1200 },
  { id: 'offset-plane',        page: 6, sel: '.p1v2__cinema',       settle: 1400 },
  { id: 'participation-model', page: 7, sel: '.p1v2__participation',settle: 1400 },
  { id: 'sticky-board',        page: 7, sel: '.gdc',                settle: 6000 },
]

const only = process.argv[2]
const targets = only ? TARGETS.filter((t) => t.id === only) : TARGETS
if (!targets.length) {
  console.error(`No target matches "${only}". Known ids:\n  ${TARGETS.map((t) => t.id).join('\n  ')}`)
  process.exit(1)
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/patterns/insitu')
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1.5 })

// Open the gate before any app code runs, so /foundations loads directly.
await ctx.addInitScript(
  ([k, v]) => { try { localStorage.setItem(k, v) } catch { /* private mode */ } },
  [GATE_KEY, GATE_PASSWORD]
)

const page = await ctx.newPage()
const failures = []

for (const t of targets) {
  try {
    await page.goto(`http://localhost:${PORT}/foundations`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(900) // the shell's grow-in transition

    // Jump to the page via the chapter panel.
    await page.click('.pilot-hamburger')
    await page.waitForTimeout(450)
    const items = page.locator('.pilot-chappanel__item')
    const count = await items.count()
    if (t.page >= count) throw new Error(`page index ${t.page} out of range (${count} pages)`)
    await items.nth(t.page).click()
    await page.waitForTimeout(700)

    const el = page.locator(t.sel).first()
    if (!(await el.count())) throw new Error(`selector ${t.sel} not found on page ${t.page}`)

    // Centre it in the pathway's own scroll container, then let it settle.
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(t.settle)

    // A viewport shot, not an element crop — the point is to show the pattern
    // surrounded by the real page.
    await page.screenshot({
      path: resolve(outDir, `${t.id}.jpg`),
      type: 'jpeg',
      quality: 78,
    })
    console.log(`  ✓ ${t.id}`)
  } catch (err) {
    failures.push(`${t.id}: ${err.message}`)
    console.log(`  ✗ ${t.id} — ${err.message}`)
  }
}

await browser.close()

console.log(`\n${targets.length - failures.length}/${targets.length} captured → public/patterns/insitu/`)
if (failures.length) {
  console.error('\nFailures:')
  failures.forEach((f) => console.error(`  ${f}`))
  process.exit(1)
}

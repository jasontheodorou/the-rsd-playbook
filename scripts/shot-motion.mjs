import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots/runbook')

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: 'no-preference',
})
const page = await context.newPage()

// 5 frames spaced 1.2s apart, captured after the initial entry stagger (~1.4s)
// settles. This spread is long enough that any 3–7s cycle *must* land in a
// different phase across the sequence.
const stops = [1600, 2800, 4000, 5200, 6400]

for (const id of ['blueprint-lattice', 'kinetic-type-field', 'signal-grid']) {
  await page.goto(`http://localhost:3011/experiments/runbook-pilot?pattern=${id}`, {
    waitUntil: 'networkidle',
  })
  const start = Date.now()
  for (let i = 0; i < stops.length; i++) {
    const elapsed = Date.now() - start
    const wait = Math.max(0, stops[i] - elapsed)
    if (wait) await page.waitForTimeout(wait)
    const label = String.fromCharCode(97 + i) // a, b, c, d, e
    await page.screenshot({ path: resolve(outDir, `${id}_motion_${label}.png`) })
  }
  console.log(`  ✓ ${id} × ${stops.length} frames`)
}
await browser.close()

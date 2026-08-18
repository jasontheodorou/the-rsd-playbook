import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots/runbook')

const browser = await chromium.launch()
// Emulate OS-level reduced motion — this tests useReducedMotion() codepath.
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
})
const page = await ctx.newPage()

for (const id of ['blueprint-lattice', 'kinetic-type-field', 'signal-grid']) {
  await page.goto(`http://localhost:3011/experiments/runbook-pilot?pattern=${id}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const out = resolve(outDir, `${id}_reduced.png`)
  await page.screenshot({ path: out, fullPage: false })
  console.log(`  ✓ ${out}`)
}
await browser.close()

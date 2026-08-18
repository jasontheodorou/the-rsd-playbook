import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots/runbook')
const patternArg = process.argv[2] // optional pattern id
const viewportArg = process.argv[3] ?? 'desktop' // desktop|tablet|mobile

const viewports = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
}

const viewport = viewports[viewportArg] ?? viewports.desktop

const browser = await chromium.launch()
const context = await browser.newContext({ viewport, deviceScaleFactor: 2 })
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
})

const qs = patternArg ? `?pattern=${patternArg}` : ''
const url = `http://localhost:3011/experiments/runbook-pilot${qs}`
console.log('opening', url, viewportArg)
await page.goto(url, { waitUntil: 'networkidle' })
// Wait for entry animation to settle
await page.waitForTimeout(1500)

const patterns = patternArg ? [patternArg] : ['blueprint-lattice', 'kinetic-type-field', 'signal-grid']

for (const id of patterns) {
  if (patternArg == null) {
    await page.evaluate((pid) => {
      const idx = Array.from(document.querySelectorAll('.rp-index__item'))
      const target = idx.find((el) => el.textContent && el.textContent.toLowerCase().includes(pid.split('-')[0]))
      if (target) target.click()
    }, id)
    await page.waitForTimeout(1500)
  }
  const out = resolve(outDir, `${id}_${viewportArg}.png`)
  await page.screenshot({ path: out, fullPage: false })
  console.log(`  ✓ ${out}`)
}

if (errors.length) {
  console.log('\nERRORS:')
  errors.forEach((e) => console.log('  ✗', e))
} else {
  console.log('\nNo console errors ✓')
}
await browser.close()

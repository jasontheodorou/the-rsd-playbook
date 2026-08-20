import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots/pathway1-swap')

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
})

// Legacy /experiments/pilot should redirect to foundations content
await page.goto('http://localhost:3011/foundations', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: resolve(outDir, 'via-pilot-url.png') })

// Home → click "Explore the foundations" would take us to pathway1
await page.goto('http://localhost:3011/', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: resolve(outDir, 'home.png') })

console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'clean ✓')
await browser.close()

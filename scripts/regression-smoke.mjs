import { chromium } from 'playwright'

const routes = [
  '/',
  '/experiments/pilot',
  '/experiments/pilot-2',
  '/experiments/pilot-3',
  '/experiments/runbook-pilot',
  '/experiments/runbook-pilot?pattern=kinetic-type-field',
  '/experiments/runbook-pilot?pattern=signal-grid',
]

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(`pageerror @ ${page.url()}: ${e.message}`))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console.error @ ${page.url()}: ${msg.text()}`)
})

for (const r of routes) {
  const url = `http://localhost:3011${r}`
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  console.log(`  ✓ ${r}`)
}

if (errors.length) {
  console.log('\nERRORS:')
  errors.forEach((e) => console.log('  ✗', e))
  process.exitCode = 1
} else {
  console.log('\nAll routes loaded without console errors ✓')
}
await browser.close()

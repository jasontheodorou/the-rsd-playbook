import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots')

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()
await page.goto('http://localhost:3011/experiments/pilot-3', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

const scrolls = [8600, 8900, 9100, 9300]
for (const y of scrolls) {
  await page.evaluate((s) => { document.querySelector('.p3-scroll').scrollTop = s }, y)
  await page.waitForTimeout(400)
  const out = resolve(outDir, `s13_${y}.png`)
  await page.screenshot({ path: out })
  console.log('shot', y)
}
await browser.close()

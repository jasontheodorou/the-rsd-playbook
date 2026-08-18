import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const path = process.argv[2] ?? '/experiments/pilot-3'
const url = `http://localhost:3011${path}`
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots')

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

// Take a shot at each section by scrolling to its top
const sections = await page.evaluate(() => {
  const els = document.querySelectorAll('.p3-section, .p3-intro')
  return Array.from(els).map((el, i) => ({
    i,
    top: el.offsetTop,
    height: el.offsetHeight,
    tone: el.getAttribute('data-tone'),
  }))
})
console.log('sections:', JSON.stringify(sections, null, 2))

for (const s of sections) {
  await page.evaluate((top) => {
    const scroll = document.querySelector('.p3-scroll')
    scroll.scrollTop = top
  }, s.top)
  await page.waitForTimeout(200)
  const outPath = resolve(outDir, `audit_s${String(s.i).padStart(2, '0')}_${s.tone ?? 'intro'}.png`)
  await page.screenshot({ path: outPath })
  console.log(`  ✓ s${s.i} (${s.tone ?? 'intro'}) top=${s.top} h=${s.height} → ${outPath.split('/').pop()}`)
}

await browser.close()

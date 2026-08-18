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

// Find max scroll and section 13 offset
const info = await page.evaluate(() => {
  const scroll = document.querySelector('.p3-scroll')
  const sections = document.querySelectorAll('.p3-section')
  const s13 = sections[sections.length - 1]
  return {
    max: scroll.scrollHeight - scroll.clientHeight,
    s13Top: s13.offsetTop,
    s13Height: s13.offsetHeight,
    clientH: scroll.clientHeight,
  }
})
console.log('info:', info)

// Take shots at fractions of the reveal
const targets = [
  ['pre',  info.s13Top - info.clientH],       // before entry
  ['mid',  info.s13Top - info.clientH * 0.4], // partial reveal
  ['late', info.s13Top],                       // top visible
  ['done', info.max],                          // scrolled all the way
]
for (const [label, y] of targets) {
  await page.evaluate((s) => { document.querySelector('.p3-scroll').scrollTop = s }, y)
  await page.waitForTimeout(500)
  const out = resolve(outDir, `reveal_${label}.png`)
  await page.screenshot({ path: out })
  const actual = await page.evaluate(() => document.querySelector('.p3-scroll').scrollTop)
  console.log(`  ✓ ${label} target=${y} actual=${actual}`)
}
await browser.close()

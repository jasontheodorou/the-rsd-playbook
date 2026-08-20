import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots')

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()
await page.goto('http://localhost:3011/experiments/pilot-3', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)

// Find the reveal box: it's the first .p3-container child in the last p3-section
const info = await page.evaluate(() => {
  const scroll = document.querySelector('.p3-scroll')
  const sections = document.querySelectorAll('.p3-section')
  const s13 = sections[sections.length - 1]
  const box = s13.querySelector('.p3-container > div')
  return {
    scrollHeight: scroll.scrollHeight,
    clientHeight: scroll.clientHeight,
    s13Top: s13.offsetTop,
  }
})
console.log('info:', info)

// Scroll to positions where the reveal is at ~0.25, 0.5, 0.75, 1.0
// scrollYProgress = (scrollTop - (s13Top - clientHeight)) / (s13Height... actually simpler:
// with offset ['start end', 'end end']:
//   start of container's top edge at bottom of viewport → progress 0
//   bottom of container at bottom of viewport → progress 1
// So progress 0.5 = when the target box is half revealed.
// Since box is at top of section 13 with small padding, use s13Top + padding.

const fractions = [0.2, 0.4, 0.6, 0.8, 1.0]
for (const frac of fractions) {
  // Use element scrollIntoView with block negotiation
  await page.evaluate(({ f }) => {
    const scroll = document.querySelector('.p3-scroll')
    const sections = document.querySelectorAll('.p3-section')
    const s13 = sections[sections.length - 1]
    const box = s13.querySelector('.p3-container').firstElementChild
    const boxRect = box.getBoundingClientRect()
    const scrollRect = scroll.getBoundingClientRect()
    // Current top of box relative to scroll viewport
    const currentBoxTopInScroll = boxRect.top - scrollRect.top
    // Target: at progress f, box bottom should be at (clientHeight - f * boxHeight)... simpler:
    // progress 0 when box.top === clientHeight (below viewport), 1 when box.bottom === clientHeight
    // scrollDelta = (currentBoxTopInScroll - (clientHeight - f * boxHeight))
    const boxH = box.offsetHeight
    const targetBoxTopInScroll = scroll.clientHeight - f * boxH
    const delta = currentBoxTopInScroll - targetBoxTopInScroll
    scroll.scrollTop += delta
  }, { f: frac })
  await page.waitForTimeout(600)
  const out = resolve(outDir, `seam_${String(frac).replace('.', '')}.png`)
  // Screenshot the reveal box element specifically
  const box = await page.evaluateHandle(() => {
    const s = document.querySelectorAll('.p3-section')
    return s[s.length - 1].querySelector('.p3-container').firstElementChild
  })
  await box.asElement().screenshot({ path: out })
  console.log(`  ✓ ${frac} → ${out}`)
}
await browser.close()

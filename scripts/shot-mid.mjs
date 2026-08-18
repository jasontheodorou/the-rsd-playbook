import { chromium } from 'playwright'
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
const page = await context.newPage()
await page.goto('http://localhost:3011/experiments/pilot-3', { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
// Scroll to bring section 13 into view partially (mid-reveal)
await page.evaluate(() => {
  const s = document.querySelector('.p3-scroll')
  const sections = document.querySelectorAll('.p3-section')
  const last = sections[sections.length - 1]
  // Put section 13's top at 40% of viewport → about mid reveal
  s.scrollTop = last.offsetTop - s.clientHeight * 0.4
})
await page.waitForTimeout(600)
// Focus in on the box area (top ~= section 13 top - 40% viewport offset)
await page.screenshot({ path: '/Users/jayalfredos/projects/rsd-manual/.playwright-shots/mid_seam_check.png', clip: { x: 100, y: 100, width: 1240, height: 800 } })
await browser.close()

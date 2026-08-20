import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://localhost:3011/experiments/pilot-3', { waitUntil: 'networkidle' })
const info = await page.evaluate(() => {
  const sections = document.querySelectorAll('.p3-section')
  const scroll = document.querySelector('.p3-scroll')
  return {
    sectionCount: sections.length,
    tones: Array.from(sections).map(s => s.getAttribute('data-tone')),
    scrollHeight: scroll?.scrollHeight,
    clientHeight: scroll?.clientHeight,
    lastSectionOffset: sections[sections.length - 1]?.offsetTop,
    lastSectionHeight: sections[sections.length - 1]?.offsetHeight,
    bodyHeight: document.body.scrollHeight,
  }
})
console.log(JSON.stringify(info, null, 2))
await browser.close()

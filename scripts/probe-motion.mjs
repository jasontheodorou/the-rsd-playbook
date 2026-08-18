import { chromium } from 'playwright'

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'no-preference',
})
const page = await context.newPage()

await page.goto('http://localhost:3011/experiments/runbook-pilot?pattern=kinetic-type-field', {
  waitUntil: 'networkidle',
})

const initial = await page.evaluate(() => {
  const el = document.querySelector('.rp-kinetic-accent')
  if (!el) return { found: false }
  const cs = getComputedStyle(el)
  const anims = el.getAnimations().map((a) => ({
    name: a.animationName || a.effect?.getKeyframes?.()[0]?.animationName,
    playState: a.playState,
    currentTime: a.currentTime,
  }))
  return {
    found: true,
    color: cs.color,
    animationName: cs.animationName,
    animationDuration: cs.animationDuration,
    animationDelay: cs.animationDelay,
    animationPlayState: cs.animationPlayState,
    getAnimations: anims,
    parentColor: getComputedStyle(el.parentElement.parentElement).color,
  }
})

console.log('INITIAL:', JSON.stringify(initial, null, 2))

await page.waitForTimeout(2000)
const later = await page.evaluate(() => {
  const el = document.querySelector('.rp-kinetic-accent')
  return { color: getComputedStyle(el).color }
})
console.log('AFTER 2S:', JSON.stringify(later))

await browser.close()

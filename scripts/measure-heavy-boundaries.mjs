#!/usr/bin/env node
/**
 * Measurement-only script for the four flagged heavy→heavy boundaries and
 * p8's 375px typographic scale. Prints numbers to stdout; touches no files.
 *
 * Boundaries measured at 1440px viewport (matches the reference renders):
 *   p10  cinema → panel
 *   p11  paired-media → panel
 *   p12  paired-media → panel
 *   p8   panel   → paired-media
 *
 * For each boundary reports:
 *   prev.layoutBottom      — getBoundingClientRect().bottom of prev element
 *   prev.opticalBottom     — max bottom of prev *and every descendant*
 *   next.layoutTop         — getBoundingClientRect().top of next element
 *   next.opticalTop        — min top of next *and every descendant*
 *   computedGap            — next.layoutTop - prev.layoutBottom
 *   opticalGap             — next.opticalTop - prev.opticalBottom
 *   overhang.prevBottomOver — prev.opticalBottom - prev.layoutBottom
 *   overhang.nextTopOver    — prev.opticalBottom - next-side deficit above layoutTop
 */

import { chromium } from 'playwright'

const port = process.env.PORT || '3014'
const url = `http://localhost:${port}/foundations`

const BOUNDARIES = [
  { page: 'p10', clicks: 18, prevSel: '.p1v2__body > .p1v2__cinema',
    nextSel: '.p1v2__body > .p1v2__cinema + .p1v2__card' },
  { page: 'p11', clicks: 20, prevSel: '.p1v2__body > .p1v2__paired',
    nextSel: '.p1v2__body > .p1v2__paired + .p1v2__card' },
  { page: 'p12', clicks: 22, prevSel: '.p1v2__body > .p1v2__paired',
    nextSel: '.p1v2__body > .p1v2__paired + .p1v2__card' },
  { page: 'p8',  clicks: 14, prevSel: '.p1v2__body > .p1v2__card',
    nextSel: '.p1v2__body > .p1v2__card + .p1v2__paired' },
]

// Pages compared for the 375px audit.
const TYPO_PAGES = [
  { page: 'p7',  clicks: 12 },
  { page: 'p8',  clicks: 14 },
  { page: 'p9',  clicks: 16 },
  { page: 'p10', clicks: 18 },
]

const browser = await chromium.launch()

async function openPage(context, clicks) {
  const page = await context.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
  for (let i = 0; i < clicks; i++) {
    await page.waitForSelector('.pilot-next', { state: 'visible', timeout: 5000 })
    await page.click('.pilot-next')
    await page.waitForTimeout(400)
  }
  await page.waitForSelector('.p1v2', { state: 'visible', timeout: 5000 })
  await page.evaluate(() => { const s = document.querySelector('.pilot-scroll'); if (s) s.scrollTop = 0 })
  await page.waitForTimeout(800)
  return page
}

async function measureBoundary(context, b) {
  const page = await openPage(context, b.clicks)
  const result = await page.evaluate(({ prevSel, nextSel }) => {
    const prev = document.querySelector(prevSel)
    const next = document.querySelector(nextSel)
    if (!prev || !next) return { error: `missing selector — prev=${!!prev} next=${!!next}` }

    function isRendered(el) {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') return false
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }
    function walk(root) {
      const list = []
      const stack = [root]
      while (stack.length) {
        const el = stack.pop()
        if (!(el instanceof Element)) continue
        if (!isRendered(el)) continue
        list.push(el)
        for (const c of el.children) stack.push(c)
      }
      return list
    }
    function extents(root) {
      const els = walk(root)
      let bottom = -Infinity, top = Infinity
      let bottomEl = null, topEl = null
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.bottom > bottom) { bottom = r.bottom; bottomEl = el }
        if (r.top < top) { top = r.top; topEl = el }
      }
      const describe = (el) => el ? `${el.tagName.toLowerCase()}.${(el.className||'').toString().trim().replace(/\s+/g,'.')}` : null
      return { bottom, top, bottomEl: describe(bottomEl), topEl: describe(topEl) }
    }

    const pr = prev.getBoundingClientRect()
    const nr = next.getBoundingClientRect()
    const px = extents(prev)
    const nx = extents(next)

    return {
      viewport: { w: window.innerWidth, h: window.innerHeight },
      prev: { selector: prevSel, layoutBottom: pr.bottom, opticalBottom: px.bottom, opticalBottomEl: px.bottomEl },
      next: { selector: nextSel, layoutTop: nr.top, opticalTop: nx.top, opticalTopEl: nx.topEl },
      computedGap: nr.top - pr.bottom,
      opticalGap: nx.top - px.bottom,
      prevOverhangBottom: px.bottom - pr.bottom,
      nextOverhangTop: nr.top - nx.top,
    }
  }, { prevSel: b.prevSel, nextSel: b.nextSel })
  await page.close()
  return result
}

async function measureTypo(context, t) {
  const page = await openPage(context, t.clicks)
  const result = await page.evaluate(() => {
    const q = (sel) => document.querySelector(sel)
    const cs = (el) => el ? getComputedStyle(el) : null
    const rect = (el) => el ? el.getBoundingClientRect() : null
    const readTypo = (el) => {
      const c = cs(el); if (!c) return null
      return { fontSize: c.fontSize, lineHeight: c.lineHeight, fontWeight: c.fontWeight, letterSpacing: c.letterSpacing }
    }
    const readBox = (el) => {
      const c = cs(el); const r = rect(el); if (!c || !r) return null
      return {
        width: r.width, height: r.height,
        padding: [c.paddingTop, c.paddingRight, c.paddingBottom, c.paddingLeft].join(' '),
        marginBlock: [c.marginTop, c.marginBottom].join(' | '),
      }
    }

    const root       = q('.p1v2')
    const hero       = q('.p1v2__hero')
    const heroText   = q('.p1v2__hero-text')
    const headline   = q('.p1v2__headline')
    const lede       = q('.p1v2__lede')
    const bodyProse  = q('.p1v2__body .p1v2__prose')
    const card       = q('.p1v2__card')
    const cardLabel  = q('.p1v2__card-label')
    const cardLi     = q('.p1v2__card-list li')
    const cta        = q('.pilot-next.p1v2__next')
    const ctaLabel   = q('.pilot-next__label')
    const foot       = q('.p1v2__foot')

    return {
      root:      readBox(root),
      hero:      readBox(hero),
      heroText:  readBox(heroText),
      headline:  { ...readTypo(headline), box: readBox(headline) },
      hero_lede: { ...readTypo(lede),     box: readBox(lede) },
      body_prose:{ ...readTypo(bodyProse),box: readBox(bodyProse) },
      card:      readBox(card),
      cardLabel: readTypo(cardLabel),
      cardLi:    { ...readTypo(cardLi),   box: readBox(cardLi) },
      cta:       readBox(cta),
      ctaLabel:  readTypo(ctaLabel),
      foot:      readBox(foot),
    }
  })
  await page.close()
  return result
}

const context1440 = await browser.newContext({ viewport: { width: 1440, height: 2600 }, deviceScaleFactor: 1 })
console.log('\n=== BOUNDARY MEASUREMENTS @ 1440px ===')
for (const b of BOUNDARIES) {
  const r = await measureBoundary(context1440, b)
  console.log(`\n[${b.page}] ${b.prevSel}  →  ${b.nextSel}`)
  console.log(JSON.stringify(r, null, 2))
}
await context1440.close()

const context375 = await browser.newContext({ viewport: { width: 375, height: 4200 }, deviceScaleFactor: 1 })
console.log('\n=== TYPOGRAPHY @ 375px (p7, p8, p9, p10) ===')
for (const t of TYPO_PAGES) {
  const r = await measureTypo(context375, t)
  console.log(`\n[${t.page}]`)
  console.log(JSON.stringify(r, null, 2))
}
await context375.close()

await browser.close()

#!/usr/bin/env node
/**
 * Verification script for the wrapper-footprint fix on flagged heavy→heavy
 * boundaries. Runs at 1440/768/375 and reports:
 *   - boundary optical gap for p8/p10/p11/p12
 *   - ly-layered outer rect (should be unchanged by the fix)
 *   - inner ly-media img rect  (should be unchanged by the fix)
 *   - horizontal-scroll check (documentElement.scrollWidth vs innerWidth)
 *   - list of any descendant that protrudes past innerWidth
 *
 * Usage:
 *   PORT=3014 node scripts/verify-heavy-boundaries.mjs > /tmp/pre.json
 *   (apply CSS)
 *   PORT=3014 node scripts/verify-heavy-boundaries.mjs > /tmp/post.json
 */

import { chromium } from 'playwright'

const port = process.env.PORT || '3014'
const url  = `http://localhost:${port}/foundations`

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 2600 },
  { name: '768',  width: 768,  height: 3600 },
  { name: '375',  width: 375,  height: 4200 },
]

const PAGES = [
  { page: 'p8',  clicks: 14, prevSel: '.p1v2__body > .p1v2__card',
    nextSel: '.p1v2__body > .p1v2__card + .p1v2__paired',
    heavyRoot: '.p1v2__body > .p1v2__card + .p1v2__paired' },
  { page: 'p10', clicks: 18, prevSel: '.p1v2__body > .p1v2__cinema',
    nextSel: '.p1v2__body > .p1v2__cinema + .p1v2__card',
    heavyRoot: '.p1v2__body > .p1v2__cinema' },
  { page: 'p11', clicks: 20, prevSel: '.p1v2__body > .p1v2__paired',
    nextSel: '.p1v2__body > .p1v2__paired + .p1v2__card',
    heavyRoot: '.p1v2__body > .p1v2__paired' },
  { page: 'p12', clicks: 22, prevSel: '.p1v2__body > .p1v2__paired',
    nextSel: '.p1v2__body > .p1v2__paired + .p1v2__card',
    heavyRoot: '.p1v2__body > .p1v2__paired' },
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

async function measure(context, cfg) {
  const page = await openPage(context, cfg.clicks)
  const result = await page.evaluate(({ prevSel, nextSel, heavyRoot }) => {
    const round = (v, n = 2) => Math.round(v * 10 ** n) / 10 ** n
    const q = (sel) => document.querySelector(sel)
    const isRendered = (el) => {
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') return false
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }
    const walk = (root) => {
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
    const describe = (el) => el ? `${el.tagName.toLowerCase()}.${(el.className || '').toString().trim().replace(/\s+/g, '.')}` : null
    const rectSummary = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { w: round(r.width), h: round(r.height), left: round(r.left), top: round(r.top) }
    }

    const prev = q(prevSel)
    const next = q(nextSel)
    const heavy = q(heavyRoot)

    // Boundary
    const pr = prev.getBoundingClientRect()
    const nr = next.getBoundingClientRect()
    const prevEls = walk(prev)
    const nextEls = walk(next)
    let prevOpticalBottom = -Infinity, nextOpticalTop = Infinity
    let prevOverhangEl = null, nextOverhangEl = null
    for (const el of prevEls) {
      const r = el.getBoundingClientRect()
      if (r.bottom > prevOpticalBottom) { prevOpticalBottom = r.bottom; prevOverhangEl = el }
    }
    for (const el of nextEls) {
      const r = el.getBoundingClientRect()
      if (r.top < nextOpticalTop) { nextOpticalTop = r.top; nextOverhangEl = el }
    }

    // Composition dims — ly-layered and ly-media img
    const layered = heavy?.querySelector('.ly-layered')
    const layeredImg = heavy?.querySelector('.ly-media__img, .ly-media img, .ly-media')

    // Horizontal-scroll check
    const de = document.documentElement
    const scrollX = { innerWidth: window.innerWidth, scrollWidth: de.scrollWidth, delta: de.scrollWidth - window.innerWidth }

    // Any descendant of .p1v2 protruding past innerWidth
    const protrusions = []
    const iw = window.innerWidth
    for (const el of walk(document.querySelector('.p1v2'))) {
      const r = el.getBoundingClientRect()
      if (r.right > iw + 0.5) protrusions.push({ sel: describe(el), right: round(r.right), overflow: round(r.right - iw) })
    }

    return {
      boundary: {
        prevLayoutBottom: round(pr.bottom),
        prevOpticalBottom: round(prevOpticalBottom),
        prevOverhang: round(prevOpticalBottom - pr.bottom),
        prevOverhangEl: describe(prevOverhangEl),
        nextLayoutTop: round(nr.top),
        nextOpticalTop: round(nextOpticalTop),
        nextOverhang: round(nr.top - nextOpticalTop),
        nextOverhangEl: describe(nextOverhangEl),
        computedGap: round(nr.top - pr.bottom),
        opticalGap: round(nextOpticalTop - prevOpticalBottom),
      },
      layered: rectSummary(layered),
      innerMedia: rectSummary(layeredImg),
      scrollX,
      protrusions,
    }
  }, { prevSel: cfg.prevSel, nextSel: cfg.nextSel, heavyRoot: cfg.heavyRoot })
  await page.close()
  return result
}

const out = {}
for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 })
  out[vp.name] = {}
  for (const cfg of PAGES) {
    out[vp.name][cfg.page] = await measure(context, cfg)
  }
  await context.close()
}
await browser.close()
console.log(JSON.stringify(out, null, 2))

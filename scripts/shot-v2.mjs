#!/usr/bin/env node
/**
 * Full-page screenshots of a Pathway 1 v2 comparison page.
 *
 * Usage:
 *   node scripts/shot-v2.mjs                 # defaults to s3b (3 clicks)
 *   node scripts/shot-v2.mjs --clicks 5      # advance N clicks to reach any Na
 *   node scripts/shot-v2.mjs --slug s4a      # tag output files with slug
 *
 * Captures `.p1v2` at 1440, 768, 375 into `.playwright-shots/`.
 */

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const argv = process.argv.slice(2)
const argOf = (name, fallback) => {
  const i = argv.indexOf(name)
  return i >= 0 ? argv[i + 1] : fallback
}
const clicks = Number(argOf('--clicks', '3'))
const slug = argOf('--slug', 'v2-variant-c')

const port = process.env.PORT || '3014'
const url = `http://localhost:${port}/foundations`

// Height is set generously so the whole `.p1v2` fits inside one viewport
// paint — the pilot's nested overflow:auto container prevents `fullPage`
// from expanding past its own scroll region.
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 2600 },
  { name: '768',  width: 768,  height: 3200 },
  { name: '375',  width: 375,  height: 3600 },
]

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots')
mkdirSync(outDir, { recursive: true })

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

console.log(`\nCapturing v2 page at four widths from ${url}\n`)

const browser = await chromium.launch()
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
    } catch (err) {
      console.error(`  ✗ ${vp.name}: goto failed — ${err.message}`)
      await context.close()
      continue
    }

    // Walk N pages forward via Continue clicks (default 3 → s3b).
    for (let step = 0; step < clicks; step++) {
      try {
        await page.waitForSelector('.pilot-next', { state: 'visible', timeout: 5000 })
        await page.click('.pilot-next')
        // Let the article's y-transition settle before the next click.
        await page.waitForTimeout(600)
      } catch (err) {
        console.error(`  ✗ ${vp.name}: click ${step + 1} failed — ${err.message}`)
        break
      }
    }

    // Confirm we're on the v2 page — marker num should read `03·2`.
    try {
      await page.waitForSelector('.p1v2', { state: 'visible', timeout: 5000 })
    } catch (err) {
      console.error(`  ✗ ${vp.name}: did not reach .p1v2 — ${err.message}`)
      await context.close()
      continue
    }

    // Let picsum image and any residual motion settle.
    await page.waitForTimeout(1500)

    // Scroll the pilot-scroll to the top so element.screenshot captures
    // from the article's first pixel.
    await page.evaluate(() => {
      const s = document.querySelector('.pilot-scroll')
      if (s) s.scrollTop = 0
    })
    await page.waitForTimeout(300)

    const filename = `${stamp}_${slug}_${vp.name}.png`
    const outPath = resolve(outDir, filename)
    // The viewport is tall enough to hold the whole `.p1v2`, so the
    // element renders in one paint and its screenshot is complete.
    await page.locator('.p1v2').screenshot({ path: outPath })
    console.log(`  ✓ ${vp.name.padEnd(4)} → ${filename}`)
    await context.close()
  }
} finally {
  await browser.close()
}

console.log(`\nDone. Screenshots in .playwright-shots/\n`)

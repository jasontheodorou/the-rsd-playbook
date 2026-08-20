#!/usr/bin/env node
/**
 * Full-page screenshots of every v2 comparison page in Pathway 1.
 * Renders each at 1440, 768 and 375. Outputs to .playwright-shots/.
 */

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const port = process.env.PORT || '3014'
const url = `http://localhost:${port}/foundations`

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 2600 },
  { name: '768',  width: 768,  height: 3600 },
  { name: '375',  width: 375,  height: 4200 },
]

// (slug, clicks_from_welcome_to_land_on_this_page)
const PAGES = [
  { slug: 's2a',  clicks: 2 },
  { slug: 's3b',  clicks: 4 },
  { slug: 's4a',  clicks: 6 },
  { slug: 's5a',  clicks: 8 },
  { slug: 's6a',  clicks: 10 },
  { slug: 's7a',  clicks: 12 },
  { slug: 's8a',  clicks: 14 },
  { slug: 's9a',  clicks: 16 },
  { slug: 's10a', clicks: 18 },
  { slug: 's11a', clicks: 20 },
  { slug: 's12a', clicks: 22 },
  { slug: 's13a', clicks: 24 },
]

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots')
mkdirSync(outDir, { recursive: true })
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

const browser = await chromium.launch()
try {
  for (const { slug, clicks } of PAGES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      })
      const page = await context.newPage()
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })
      } catch (err) {
        console.error(`  ✗ ${slug} ${vp.name}: goto failed — ${err.message}`)
        await context.close()
        continue
      }
      let clickOK = true
      for (let step = 0; step < clicks; step++) {
        try {
          await page.waitForSelector('.pilot-next', { state: 'visible', timeout: 5000 })
          await page.click('.pilot-next')
          await page.waitForTimeout(500)
        } catch (err) {
          console.error(`  ✗ ${slug} ${vp.name}: click ${step + 1} failed — ${err.message}`)
          clickOK = false
          break
        }
      }
      if (!clickOK) { await context.close(); continue }
      try {
        await page.waitForSelector('.p1v2', { state: 'visible', timeout: 5000 })
      } catch (err) {
        console.error(`  ✗ ${slug} ${vp.name}: did not reach .p1v2 — ${err.message}`)
        await context.close()
        continue
      }
      await page.waitForTimeout(1400)
      await page.evaluate(() => {
        const s = document.querySelector('.pilot-scroll')
        if (s) s.scrollTop = 0
      })
      await page.waitForTimeout(300)
      const filename = `${stamp}_${slug}_${vp.name}.png`
      const outPath = resolve(outDir, filename)
      await page.locator('.p1v2').screenshot({ path: outPath })
      console.log(`  ✓ ${slug} ${vp.name.padEnd(4)} → ${filename}`)
      await context.close()
    }
  }
} finally {
  await browser.close()
}

console.log('\nDone.\n')

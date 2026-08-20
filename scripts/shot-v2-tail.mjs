#!/usr/bin/env node
import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const port = process.env.PORT || '3014'
const url = `http://localhost:${port}/foundations`
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 2600 },
  { name: '768',  width: 768,  height: 3600 },
  { name: '375',  width: 375,  height: 4200 },
]
const PAGES = [
  { slug: 's9a',  clicks: 16 },
  { slug: 's10a', clicks: 18 },
  { slug: 's11a', clicks: 20 },
  { slug: 's12a', clicks: 22 },
  { slug: 's13a', clicks: 24 },
]
const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '..', '.playwright-shots')
const stamp = '2026-08-19T21-09-44'  // reuse original batch stamp

const browser = await chromium.launch()
try {
  for (const { slug, clicks } of PAGES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      })
      const page = await context.newPage()
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      } catch (err) {
        console.error(`  ✗ ${slug} ${vp.name}: goto — ${err.message}`)
        await context.close()
        continue
      }
      let ok = true
      for (let step = 0; step < clicks; step++) {
        try {
          await page.waitForSelector('.pilot-next', { state: 'visible', timeout: 8000 })
          await page.click('.pilot-next')
          await page.waitForTimeout(500)
        } catch (err) {
          console.error(`  ✗ ${slug} ${vp.name}: click ${step + 1} — ${err.message}`)
          ok = false
          break
        }
      }
      if (!ok) { await context.close(); continue }
      try {
        await page.waitForSelector('.p1v2', { state: 'visible', timeout: 5000 })
      } catch (err) {
        console.error(`  ✗ ${slug} ${vp.name}: .p1v2 not found`)
        await context.close()
        continue
      }
      await page.waitForTimeout(1200)
      await page.evaluate(() => { const s = document.querySelector('.pilot-scroll'); if (s) s.scrollTop = 0 })
      await page.waitForTimeout(300)
      const filename = `${stamp}_${slug}_${vp.name}.png`
      await page.locator('.p1v2').screenshot({ path: resolve(outDir, filename) })
      console.log(`  ✓ ${slug} ${vp.name.padEnd(4)} → ${filename}`)
      await context.close()
    }
  }
} finally {
  await browser.close()
}
console.log('done')

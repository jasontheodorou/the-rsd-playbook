#!/usr/bin/env node
/**
 * Screenshot the dev server at a set of common viewports.
 *
 * Usage:
 *   npm run shot -- /experiments/pilot-3
 *   npm run shot -- /experiments/pilot-3 --full         # capture full-page
 *   PORT=3011 npm run shot -- /experiments/pilot-3      # override port
 *
 * Screenshots land in .playwright-shots/, keyed by route + viewport.
 */

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const argv = process.argv.slice(2)
const path = argv.find((a) => !a.startsWith('--')) ?? '/'
const full = argv.includes('--full')
const port = process.env.PORT || '3011'

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1280',  width: 1280, height: 800 },
  { name: 'mobile-390',   width: 390,  height: 844, isMobile: true, deviceScaleFactor: 2 },
]

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, '.playwright-shots')
mkdirSync(outDir, { recursive: true })

const url = `http://localhost:${port}${path}`
const slug = path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'root'
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

console.log(`\nShooting ${url}`)
console.log(`Output: .playwright-shots/${stamp}_${slug}_*.png\n`)

const browser = await chromium.launch()
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor ?? 1,
      isMobile: vp.isMobile ?? false,
    })
    const page = await context.newPage()
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
    } catch (err) {
      console.error(`  ✗ ${vp.name}: ${err.message}`)
      await context.close()
      continue
    }
    // Give any framer-motion enter animations a beat to settle.
    await page.waitForTimeout(700)

    const filename = `${stamp}_${slug}_${vp.name}${full ? '_full' : ''}.png`
    const outPath = resolve(outDir, filename)
    await page.screenshot({ path: outPath, fullPage: full })
    console.log(`  ✓ ${vp.name.padEnd(14)} → ${filename}`)
    await context.close()
  }
} finally {
  await browser.close()
}

console.log(`\nDone. Open .playwright-shots/ to review.\n`)

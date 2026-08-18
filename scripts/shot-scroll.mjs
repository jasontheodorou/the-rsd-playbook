import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const scroll = Number(process.argv[2] ?? 0)
const path = process.argv[3] ?? '/experiments/pilot-3'
const url = `http://localhost:3011${path}`
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outPath = resolve(root, '.playwright-shots/scroll.png')

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate((y) => {
  const el = document.querySelector('.p3-scroll') || document.scrollingElement
  el.scrollTo(0, y)
}, scroll)
await page.waitForTimeout(500)
await page.screenshot({ path: outPath })
await browser.close()
console.log('saved', outPath)

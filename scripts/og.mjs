#!/usr/bin/env node
/**
 * Generate the Open Graph card at public/og.png (1200x630).
 *
 * This is the image Slack, Teams, LinkedIn and iMessage show when someone
 * pastes the deployed URL. Regenerate it whenever the title or tagline changes.
 *
 * Usage:
 *   npm run og
 *   npm run og -- --title "Pilot 3" --tag "Follow-on layouts"
 *   npm run og -- --shot            # inset a live screenshot of the dev server
 *   PORT=3014 npm run og -- --shot
 */

import { chromium } from 'playwright'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const argv = process.argv.slice(2)
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`)
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback
}

const title = arg('title', 'The RSD Playbook')
const tagline = arg('tag', 'Practice foundations, module by module')
const eyebrow = arg('eyebrow', 'TRANSFORM')
const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', arg('out', 'og.png'))
const shot = argv.includes('--shot')
const port = process.env.PORT || '3014'

const browser = await chromium.launch()

// Optionally grab a live screenshot of the running app to inset in the card.
let inset = null
if (shot) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  try {
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle', timeout: 15000 })
    inset = (await page.screenshot({ type: 'png' })).toString('base64')
  } catch {
    console.warn(`! Could not reach http://localhost:${port} — run \`npm run dev\` first. Falling back to a plain card.`)
  }
  await page.close()
}

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c])

const html = `<!doctype html>
<html><head><meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;800&display=swap" />
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; align-items: center;
    font-family: 'Open Sans', system-ui, sans-serif;
    background: #F5F3F0; color: #333333; overflow: hidden;
  }
  .card { display: flex; width: 100%; height: 100%; }
  .copy { flex: 1; padding: 80px; display: flex; flex-direction: column; justify-content: center; gap: 24px; }
  .eyebrow { display: flex; align-items: center; gap: 14px; font-size: 20px; font-weight: 600; letter-spacing: .18em; color: #5C5C5C; }
  .dot { width: 18px; height: 18px; border-radius: 50%; background: #EC671B; flex: none; }
  h1 { font-size: ${title.length > 26 ? 66 : 82}px; font-weight: 800; line-height: 1.05; letter-spacing: -.02em; color: #1F1F1F; }
  p { font-size: 30px; line-height: 1.35; color: #5C5C5C; max-width: 22ch; }
  .shot { width: 470px; height: 100%; position: relative; overflow: hidden; background: #E6E3DF; }
  .shot img { position: absolute; top: 48px; left: 40px; width: 640px; border-radius: 12px 0 0 12px;
              box-shadow: 0 24px 60px rgba(15,15,15,.22); }
  .rule { width: 96px; height: 4px; background: #CCC8C4; }
</style></head>
<body><div class="card">
  <div class="copy">
    <div class="eyebrow"><span class="dot"></span>${esc(eyebrow)}</div>
    <h1>${esc(title)}</h1>
    <div class="rule"></div>
    <p>${esc(tagline)}</p>
  </div>
  ${inset ? `<div class="shot"><img src="data:image/png;base64,${inset}" /></div>` : ''}
</div></body></html>`

const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: out, type: 'png' })
await browser.close()

console.log(`\nWrote ${out}  (1200x630${inset ? ', with live screenshot' : ''})\n`)

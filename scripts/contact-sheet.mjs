#!/usr/bin/env node
/**
 * Compose one contact sheet PNG showing all six v2 renders side by side
 * with viewport labels. Outputs to ~/Desktop/rsd-v2-contact-sheet.png.
 */
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { homedir } from 'node:os'

const dir = '.playwright-shots'
const stamp = '2026-08-19T14-26-16'
const shots = [
  { label: '1440px  ·  desktop', file: `${stamp}_v2-variant-c_1440.png`, native: [1200, 1901] },
  { label: '1024px  ·  desktop', file: `${stamp}_v2-variant-c_1024.png`, native: [976,  1841] },
  { label: '768px  ·  hero stacked, body single-flow', file: `${stamp}_v2-variant-c_768.png`, native: [720, 2043] },
  { label: '375px  ·  mobile',   file: `${stamp}_v2-variant-c_375.png`,  native: [327, 2249] },
]

// Row 1: 1440, 1024, 901. Row 2: 899, 768, 375. Fixed target column height.
const targetH = 800
const gap = 24
const labelH = 40
const pad = 24

const scaled = shots.map((s) => {
  const [w, h] = s.native
  const scale = targetH / h
  return { ...s, w: Math.round(w * scale), h: targetH, scale }
})

const rows = [scaled.slice(0, 2), scaled.slice(2)]
const rowWidth = (row) => row.reduce((a, s) => a + s.w, 0) + gap * (row.length - 1)
const sheetW = Math.max(rowWidth(rows[0]), rowWidth(rows[1])) + pad * 2
const sheetH = (targetH + labelH) * 2 + gap + pad * 2

const images = shots.map((s) => {
  const buf = readFileSync(resolve(dir, s.file))
  return `data:image/png;base64,${buf.toString('base64')}`
})

const html = `<!doctype html><html><head><style>
  body { margin:0; background:#F2EFE9; font-family: -apple-system, 'Helvetica Neue', sans-serif; padding:${pad}px; }
  .row { display:flex; gap:${gap}px; margin-bottom:${gap}px; }
  .cell { display:flex; flex-direction:column; }
  .cell img { display:block; box-shadow: 0 2px 12px rgba(0,0,0,.14); background:#fff; }
  .label { padding: 12px 4px 0; font-size: 15px; font-weight: 600; color:#111; letter-spacing:-0.005em; }
  h1 { margin: 0 0 20px; font-size: 18px; letter-spacing:-0.01em; color:#333; }
</style></head><body>
<h1>RSD Playbook · page 03·2 (Good design matters, Variant C) · six-viewport contact sheet</h1>
${rows.map((row, ri) => `
<div class="row">
  ${row.map((s, ci) => `
    <div class="cell">
      <img src="${images[ri * 3 + ci]}" style="width:${s.w}px;height:${s.h}px" />
      <div class="label">${s.label}</div>
    </div>
  `).join('')}
</div>`).join('')}
</body></html>`

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: sheetW, height: sheetH + 60 } })
const page = await context.newPage()
await page.setContent(html)
await page.waitForLoadState('domcontentloaded')
await page.waitForTimeout(400)
const out = resolve(homedir(), 'Desktop', 'rsd-v2-contact-sheet.png')
await page.screenshot({ path: out, fullPage: true })
await browser.close()
console.log(`Contact sheet → ${out}`)

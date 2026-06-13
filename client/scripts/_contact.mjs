// THROWAWAY: build labelled contact sheets to triage raw venue photos.
import sharp from 'sharp'
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'

const SRC = path.resolve('public/venue/hall')
const OUT = path.resolve('.contact-sheets')
const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f)).sort()

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

// --- dimension stats ---
let minW = 1e9, maxW = 0, minH = 1e9, maxH = 0, portrait = 0, landscape = 0, square = 0
const dims = []
for (const f of files) {
  const m = await sharp(path.join(SRC, f)).metadata()
  dims.push({ f, w: m.width, h: m.height })
  minW = Math.min(minW, m.width); maxW = Math.max(maxW, m.width)
  minH = Math.min(minH, m.height); maxH = Math.max(maxH, m.height)
  const r = m.width / m.height
  if (r > 1.15) landscape++
  else if (r < 0.87) portrait++
  else square++
}
console.log(`files=${files.length} width:[${minW}..${maxW}] height:[${minH}..${maxH}] landscape=${landscape} portrait=${portrait} square=${square}`)

// --- contact sheets ---
const COLS = 5, ROWS = 5, TW = 250, TH = 188, LABEL = 26, PAD = 6
const cellW = TW, cellH = TH + LABEL, PER = COLS * ROWS
const sheetW = COLS * cellW + PAD * (COLS + 1)
const sheetH = ROWS * cellH + PAD * (ROWS + 1)

const mapping = []
const sheetCount = Math.ceil(files.length / PER)
for (let s = 0; s < sheetCount; s++) {
  const composites = []
  for (let k = 0; k < PER; k++) {
    const idx = s * PER + k
    if (idx >= files.length) break
    const file = files[idx]
    const { w, h } = dims[idx]
    mapping.push({ idx, file, w, h })
    const col = k % COLS, row = Math.floor(k / COLS)
    const x = PAD + col * (cellW + PAD), y = PAD + row * (cellH + PAD)
    const thumb = await sharp(path.join(SRC, file)).resize(TW, TH, { fit: 'cover' }).jpeg({ quality: 68 }).toBuffer()
    composites.push({ input: thumb, left: x, top: y })
    const o = w > h ? 'L' : w < h ? 'P' : 'S'
    const svg = `<svg width="${TW}" height="${LABEL}"><rect width="100%" height="100%" fill="#161616"/><text x="6" y="18" font-family="sans-serif" font-size="15" fill="#f4e9c8">#${idx}  ${w}x${h} ${o}</text></svg>`
    composites.push({ input: Buffer.from(svg), left: x, top: y + TH })
  }
  const out = path.join(OUT, `sheet-${s}.jpg`)
  await sharp({ create: { width: sheetW, height: sheetH, channels: 3, background: '#2a2a2a' } }).composite(composites).jpeg({ quality: 72 }).toFile(out)
  console.log('wrote', out)
}
await writeFile(path.join(OUT, 'mapping.json'), JSON.stringify(mapping))
console.log(`done: ${sheetCount} sheets`)

import type { Persona } from "./data";
import { stripSources } from "./lib/text";

export interface PdfPhoto { bytes: Uint8Array; width: number; height: number; components: number }
export interface PdfAvatar { hex: string; initials: string; photo?: PdfPhoto }

/** Reads size and channel count of a baseline/progressive JPEG; returns null for anything else. */
export function parseJpeg(bytes: Uint8Array): PdfPhoto | null {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < bytes.length) {
    if (bytes[i] !== 0xff) { i++; continue; }
    const marker = bytes[i + 1]!;
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01 || marker === 0xff) { i += marker === 0xff ? 1 : 2; continue; }
    const len = (bytes[i + 2]! << 8) | bytes[i + 3]!;
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { bytes, height: (bytes[i + 5]! << 8) | bytes[i + 6]!, width: (bytes[i + 7]! << 8) | bytes[i + 8]!, components: bytes[i + 9]! };
    }
    i += 2 + len;
  }
  return null;
}

/** Fetches a JPEG from a URL (browser). Resolves to undefined if it is not a JPEG. */
export async function loadJpeg(url: string): Promise<PdfPhoto | undefined> {
  const res = await fetch(url);
  return parseJpeg(new Uint8Array(await res.arrayBuffer())) ?? undefined;
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return `${((n >> 16) & 255) / 255} ${((n >> 8) & 255) / 255} ${(n & 255) / 255}`;
}

function bytesToString(bytes: Uint8Array) {
  let out = "";
  for (let i = 0; i < bytes.length; i += 8192) out += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return out;
}

/* Minimal dependency-free PDF writer (A4, standard Helvetica fonts). */

const W = 595.28, H = 841.89, M = 48;
const BLUE = "0.137 0.310 0.604", RED = "0.761 0 0.071", BLACK = "0 0 0", GREY = "0.541 0.541 0.537", PALE = "0.886 0.925 0.976";
const WIN: Record<string, string> = { "“": "\\223", "”": "\\224", "‘": "\\221", "’": "\\222", "–": "\\226", "—": "\\227", "·": "\\267", "•": "\\225", "…": "\\205" };

function enc(text: string) {
  let out = "";
  for (const ch of text) {
    if (WIN[ch]) out += WIN[ch];
    else if (ch === "\\" || ch === "(" || ch === ")") out += "\\" + ch;
    else if (ch.charCodeAt(0) < 32 || ch.charCodeAt(0) > 126) out += ch.charCodeAt(0) < 256 && ch.charCodeAt(0) > 160 ? "\\" + ch.charCodeAt(0).toString(8) : "?";
    else out += ch;
  }
  return out;
}

function width(text: string, size: number, bold: boolean) {
  let w = 0;
  for (const ch of text) {
    if ("iljtf.,;:'|!I() ".includes(ch)) w += 0.3;
    else if ("mwMW@%".includes(ch)) w += 0.85;
    else if (ch >= "A" && ch <= "Z") w += 0.68;
    else w += 0.54;
  }
  return w * size * (bold ? 1.05 : 1);
}

function wrap(text: string, size: number, bold: boolean, max: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && width(next, size, bold) > max) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

class Doc {
  pages: string[] = [];
  images: { data: string; w: number; h: number; cs: string }[] = [];
  cur = "";
  y = 0;
  newPage(first = false) {
    if (this.cur) this.pages.push(this.cur);
    this.cur = "";
    this.y = H - M;
    if (first) {
      this.rect(0, H - 6, W * 0.64, 6, BLUE);
      this.rect(W * 0.64, H - 6, W * 0.36, 6, RED);
      this.y = H - 40;
    }
  }
  rect(x: number, y: number, w: number, h: number, color: string) {
    this.cur += `${color} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f\n`;
  }
  circlePath(cx: number, cy: number, r: number) {
    const k = r * 0.5523;
    return `${cx + r} ${cy} m ${cx + r} ${cy + k} ${cx + k} ${cy + r} ${cx} ${cy + r} c ${cx - k} ${cy + r} ${cx - r} ${cy + k} ${cx - r} ${cy} c ${cx - r} ${cy - k} ${cx - k} ${cy - r} ${cx} ${cy - r} c ${cx + k} ${cy - r} ${cx + r} ${cy - k} ${cx + r} ${cy} c h`;
  }
  avatar(cx: number, cy: number, r: number, a: PdfAvatar | undefined) {
    if (a?.photo) {
      const ph = a.photo;
      const name = `Im${this.images.length}`;
      this.images.push({ data: bytesToString(ph.bytes), w: ph.width, h: ph.height, cs: ph.components === 1 ? "/DeviceGray" : ph.components === 4 ? "/DeviceCMYK" : "/DeviceRGB" });
      const side = Math.min(ph.width, ph.height);
      const scale = (2 * r) / side;
      const w = ph.width * scale, h = ph.height * scale;
      this.cur += `q ${this.circlePath(cx, cy, r)} W n ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${(cx - w / 2).toFixed(2)} ${(cy - h / 2).toFixed(2)} cm /${name} Do Q\n`;
    } else {
      this.cur += `${hexToRgb(a?.hex ?? "#234F9A")} rg ${this.circlePath(cx, cy, r)} f\n`;
      const letter = a?.initials ?? "";
      const size = r * 0.95;
      this.run(cx - width(letter, size, true) / 2, cy - size * 0.35, letter, size, "F2", "1 1 1");
    }
    this.cur += `${BLUE} RG 1.5 w ${this.circlePath(cx, cy, r + 2)} S\n`;
  }
  run(x: number, y: number, text: string, size: number, font: "F1" | "F2" | "F3", color: string) {
    this.cur += `BT /${font} ${size} Tf ${color} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${enc(text)}) Tj ET\n`;
  }
  ensure(h: number) { if (this.y - h < M) this.newPage(); }
  gap(n: number) { this.y -= n; }
  text(text: string, o: { size?: number; bold?: boolean; italic?: boolean; color?: string; indent?: number; lead?: number } = {}) {
    const size = o.size ?? 10.5, indent = o.indent ?? 0, lead = o.lead ?? size * 1.4;
    const font = o.bold ? "F2" : o.italic ? "F3" : "F1";
    for (const line of wrap(text, size, !!o.bold, W - 2 * M - indent)) {
      this.ensure(lead);
      this.y -= lead;
      this.run(M + indent, this.y + lead * 0.25, line, size, font, o.color ?? BLACK);
    }
  }
  bullets(items: string[]) {
    if (!items.length) { this.text("None noted", { color: GREY, indent: 12 }); return; }
    for (const item of items) {
      this.ensure(15);
      const start = this.y;
      this.text(item, { indent: 24 });
      this.run(M + 12, start - 10.5 * 1.4 + 10.5 * 0.35, "•", 10.5, "F1", BLACK);
    }
  }
  heading(text: string) {
    this.gap(10);
    this.ensure(30);
    this.text(text.toUpperCase(), { size: 9, bold: true, color: GREY });
    this.gap(1);
  }
  build() {
    if (this.cur) this.pages.push(this.cur);
    const objs: string[] = [];
    const n = this.pages.length;
    objs[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    objs[2] = `<< /Type /Pages /Kids [${this.pages.map((_, i) => `${6 + i * 2} 0 R`).join(" ")}] /Count ${n} >>`;
    objs[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
    objs[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
    objs[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>";
    const imgBase = 6 + n * 2;
    const xobj = this.images.length ? ` /XObject << ${this.images.map((_, k) => `/Im${k} ${imgBase + k} 0 R`).join(" ")} >>` : "";
    this.pages.forEach((content, i) => {
      objs[6 + i * 2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${xobj} >> /Contents ${7 + i * 2} 0 R >>`;
      objs[7 + i * 2] = `<< /Length ${content.length} >>\nstream\n${content}endstream`;
    });
    this.images.forEach((im, k) => {
      objs[imgBase + k] = `<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace ${im.cs} /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.data.length} >>\nstream\n${im.data}\nendstream`;
    });
    let pdf = "%PDF-1.4\n";
    const offsets: number[] = [];
    for (let i = 1; i < objs.length; i++) { offsets[i] = pdf.length; pdf += `${i} 0 obj\n${objs[i]}\nendobj\n`; }
    const xref = pdf.length;
    pdf += `xref\n0 ${objs.length}\n0000000000 65535 f \n`;
    for (let i = 1; i < objs.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
    pdf += `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return pdf;
  }
}

const plain = (t: string) => stripSources(t).replace(/\*\*/g, "");

function addPersona(d: Doc, p: Persona, avatar?: PdfAvatar) {
  d.newPage(true);
  d.run(M, d.y, "Intranet", 12, "F2", BLUE);
  d.run(M + width("Intranet ", 12, true), d.y, "persona", 12, "F2", RED);
  d.gap(24);
  const top = d.y;
  const r = 38;
  d.avatar(M + r + 2, top - r - 4, r, avatar);
  d.gap(20);
  const ind = 2 * r + 20;
  d.text(p.title, { size: 20, bold: true, lead: 24, indent: ind });
  d.text(p.segment, { size: 12, color: GREY, indent: ind });
  d.text(`Evidence: ${p.rating}`, { size: 10, bold: true, color: BLUE, indent: ind });
  d.y = Math.min(d.y, top - 2 * r - 14);
  d.gap(8);
  for (const t of p.intro) { d.text(plain(t)); d.gap(4); }
  d.text(`Evidence rating: ${plain(p.evidence)}`, { size: 9.5, color: GREY });
  for (const b of p.blocks) {
    d.heading(b.title);
    if (plain(b.note)) d.text(plain(b.note), { size: 9, color: GREY });
    if (b.items.length) d.bullets(b.items.map(plain));
    for (const t of b.paras) d.text(plain(t));
  }
  if (p.quotes.length) {
    d.heading("In their words");
    if (p.quoteNote) d.text(plain(p.quoteNote), { size: 9, color: GREY });
    for (const q of p.quotes) { d.gap(3); d.text(plain(q), { italic: true, indent: 10 }); }
  }
  if (p.success) { d.heading("Success looks like"); d.text(plain(p.success)); }
  const m = p.moscow;
  if (m) {
    d.heading("Where this lands in the MoSCoW prioritisation");
    for (const [label, items] of [["Must have", m.must], ["Should have", m.should], ["Could have", m.could], ["Won't have", m.wont]] as const) {
      if (!items.length) continue;
      d.gap(2);
      d.text(label, { bold: true, color: BLUE });
      d.bullets(items.map(plain));
    }
  }
  if (p.interpretation) { d.heading("Interpretation"); d.text(plain(p.interpretation)); }
  if (p.devices?.length) {
    d.heading("Devices named in the sources");
    const label = { desktop: "PC / Desktop", mobile: "Mobile", kiosk: "Kiosk" } as const;
    for (const dev of p.devices) d.text(`${label[dev.type]}: ${plain(dev.use)}`);
  }
}

export function personaPdf(personas: Persona[], avatars: Record<string, PdfAvatar> = {}) {
  const d = new Doc();
  for (const p of personas) addPersona(d, p, avatars[p.id]);
  return d.build();
}

export function downloadPdf(name: string, pdf: string) {
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 255;
  const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

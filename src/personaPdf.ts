import type { Persona } from "./data";
import { STAGES, STAGE_NAMES } from "./data";

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
    this.pages.forEach((content, i) => {
      objs[6 + i * 2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${7 + i * 2} 0 R >>`;
      objs[7 + i * 2] = `<< /Length ${content.length} >>\nstream\n${content}endstream`;
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

function addPersona(d: Doc, p: Persona, status: string) {
  d.newPage(true);
  d.run(M, d.y, "Intranet", 12, "F2", BLUE);
  d.run(M + width("Intranet ", 12, true), d.y, "persona", 12, "F2", RED);
  d.gap(30);
  d.text(p.name.replace(" (placeholder)", ""), { size: 24, bold: true, lead: 28 });
  d.text(p.role, { size: 12, color: GREY });
  d.text(`Status: ${status}`, { size: 10, bold: true, color: BLUE });
  d.gap(8);
  d.text(p.quote, { size: 12, italic: true, indent: 10 });
  d.heading("Goals"); d.bullets(p.goals);
  d.heading("Frustrations"); d.bullets(p.frustrations);
  d.heading("Channels"); d.bullets(p.channels);
  d.heading("Facts"); d.bullets(p.facts);
  d.heading("Location and profile in the company");
  for (const [k, v] of [["Site", p.org.site], ["City", `${p.org.city}, ${p.org.country}`], ["Department", p.org.department], ["Level", p.org.level], ["Reports to", p.org.reportsTo]]) d.text(`${k}: ${v}`);
  d.heading("Devices");
  const label = { desktop: "PC / Desktop", mobile: "Mobile", kiosk: "Kiosk" } as const;
  for (const dev of p.devices) d.text(`${label[dev.type]}: ${dev.use}`);
  d.heading("Journey");
  STAGES.forEach((s, i) => {
    d.ensure(70);
    d.gap(6);
    d.text(`${s} · ${STAGE_NAMES[i]}   (emotion ${p.journey.emotion[i]}/5)`, { bold: true, color: BLUE });
    const row = (label: string, items: string[] | undefined) => d.text(`${label}: ${items && items.length ? items.join("; ") : "none noted"}`, { indent: 10, size: 10 });
    row("Actions", p.journey.actions[i]);
    row("Touchpoints", p.journey.touchpoints[i]);
    row("Pain points", p.journey.pains[i]);
    row("Opportunities", p.journey.opps[i]);
  });
}

export function personaPdf(personas: Persona[], statusOf: (p: Persona) => string) {
  const d = new Doc();
  for (const p of personas) addPersona(d, p, statusOf(p));
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

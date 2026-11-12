import { toCanvas } from "html-to-image";

/** Renders an element as it looks on screen. WebGL canvases (the globe) are snapshotted first. */
export async function snap(el: HTMLElement, opts: { width?: number; exclude?: string } = {}) {
  const swaps: Array<[HTMLCanvasElement, HTMLImageElement]> = [];
  const gl = [...el.querySelectorAll("canvas")];
  if (gl.length) {
    await new Promise<void>((r) => requestAnimationFrame(() => {
      for (const c of gl) {
        try {
          const img = new Image();
          img.src = c.toDataURL("image/png");
          img.style.cssText = getComputedStyle(c).cssText;
          img.style.width = `${c.clientWidth}px`;
          img.style.height = `${c.clientHeight}px`;
          img.className = c.className;
          swaps.push([c, img]);
        } catch { /* tainted canvas: leave as is */ }
      }
      r();
    }));
    for (const [c, img] of swaps) { c.after(img); c.style.display = "none"; }
    await Promise.all(swaps.map(([, img]) => img.decode().catch(() => undefined)));
  }
  try {
    const bg = getComputedStyle(document.body).backgroundColor;
    const width = opts.width ?? el.scrollWidth;
    return await toCanvas(el, {
      pixelRatio: 2,
      backgroundColor: bg,
      width,
      height: el.scrollHeight,
      style: { width: `${width}px`, overflow: "visible", margin: "0" },
      filter: (n) => !(opts.exclude && n instanceof Element && n.matches(opts.exclude)),
    });
  } finally {
    for (const [c, img] of swaps) { img.remove(); c.style.display = ""; }
  }
}

export function stack(parts: HTMLCanvasElement[], gap = 24) {
  const w = Math.max(...parts.map((p) => p.width));
  const h = parts.reduce((s, p) => s + p.height, 0) + gap * (parts.length - 1);
  const out = document.createElement("canvas");
  out.width = w; out.height = h;
  const ctx = out.getContext("2d")!;
  ctx.fillStyle = getComputedStyle(document.body).backgroundColor;
  ctx.fillRect(0, 0, w, h);
  let y = 0;
  for (const p of parts) { ctx.drawImage(p, 0, y); y += p.height + gap; }
  return out;
}

interface Page { w: number; h: number; jpeg: string; iw: number; ih: number; dx: number; dy: number; dw: number; dh: number }

/** Multi-page PDF of screen captures; each capture is fitted to the page width and split across pages. */
export class ShotPdf {
  pages: Page[] = [];
  add(c: HTMLCanvasElement, orientation: "portrait" | "landscape", fitOnePage = false) {
    const [W, H] = orientation === "portrait" ? [595, 842] : [842, 595];
    const m = 24;
    const bg = getComputedStyle(document.body).backgroundColor;
    let scale = (W - 2 * m) / c.width;
    if (fitOnePage) scale = Math.min(scale, (H - 2 * m) / c.height);
    const sliceH = Math.floor((H - 2 * m) / scale);
    for (let y = 0; y < c.height; y += sliceH) {
      const h = Math.min(sliceH, c.height - y);
      const s = document.createElement("canvas");
      s.width = c.width; s.height = h;
      const ctx = s.getContext("2d")!;
      ctx.fillStyle = bg; ctx.fillRect(0, 0, s.width, h);
      ctx.drawImage(c, 0, y, c.width, h, 0, 0, c.width, h);
      const jpeg = atob(s.toDataURL("image/jpeg", 0.9).split(",")[1]!);
      this.pages.push({ w: W, h: H, jpeg, iw: s.width, ih: h, dx: m, dy: H - m - h * scale, dw: c.width * scale, dh: h * scale });
    }
  }
  build() {
    const objs: string[] = [];
    const add = (s: string) => { objs.push(s); return objs.length; };
    const catalog = add(""), pagesId = add("");
    const kids: number[] = [];
    for (const p of this.pages) {
      const img = add(`<< /Type /XObject /Subtype /Image /Width ${p.iw} /Height ${p.ih} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.jpeg.length} >>\nstream\n${p.jpeg}\nendstream`);
      const cs = `q ${p.dw.toFixed(2)} 0 0 ${p.dh.toFixed(2)} ${p.dx.toFixed(2)} ${p.dy.toFixed(2)} cm /Im0 Do Q`;
      const content = add(`<< /Length ${cs.length} >>\nstream\n${cs}\nendstream`);
      kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${p.w} ${p.h}] /Resources << /XObject << /Im0 ${img} 0 R >> >> /Contents ${content} 0 R >>`));
    }
    objs[catalog - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objs[pagesId - 1] = `<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(" ")}] /Count ${kids.length} >>`;
    let out = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
    const offs: number[] = [];
    objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
    const x = out.length;
    out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offs.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}`;
    out += `trailer\n<< /Size ${objs.length + 1} /Root ${catalog} 0 R >>\nstartxref\n${x}\n%%EOF`;
    return out;
  }
}

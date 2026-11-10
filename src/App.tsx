import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import productSearcherPhoto from "@/assets/persona-product-searcher.jpg";
import deptRepPhoto from "@/assets/persona-dept-rep.jpg";
import frontlinePhoto from "@/assets/persona-frontline.jpg";
import siteCommunicatorPhoto from "@/assets/persona-site-communicator.jpg";
import logo from "@/assets/hellermanntyton-logo.svg";
import TestimonialGlobe, { type GlobeTestimonial } from "@/components/ui/testimonial-globe";
import TeamLanyardRail, { type LanyardMember } from "@/components/ui/team-lanyard-rail";
import { downloadPdf, loadJpeg, personaPdf, type PdfAvatar } from "@/personaPdf";
import { stripSources } from "@/lib/text";
import { PERSONAS, type DeviceType, type Persona } from "@/data";

const NOTES_KEY = "persona-notes-v1";

function loadNotes(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "{}") as Record<string, string>; } catch { return {}; }
}

function avatar(initials: string, bg: string) {
  const fg = bg === "#ADC7EA" ? "#234F9A" : "#FFFFFF";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="${bg}"/><text x="40" y="53" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="38" font-weight="700" fill="${fg}">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/** Portraits: src/assets/persona-<id>.jpg. Personas without a file get a colored initials avatar. */
const photoFiles = import.meta.glob("/src/assets/persona-*.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const PHOTOS: Record<string, string> = {
  "product-searcher": productSearcherPhoto,
  "dept-rep": deptRepPhoto,
  frontline: frontlinePhoto,
  "site-communicator": siteCommunicatorPhoto,
  ...Object.fromEntries(Object.entries(photoFiles).map(([path, url]) => [path.replace(/^.*persona-/, "").replace(/\.\w+$/, ""), url])),
};

const AVATAR_BG = ["#234F9A", "#628FDB", "#C20012", "#ADC7EA", "#8A8A89", "#000000"];

/** Renders **bold** text; source tags like [S3, slide 8] are left out. */
function Rich({ text }: { text: string }) {
  const parts = stripSources(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>)}
    </>
  );
}

/** One short clause from the first sentence, for the back of a badge. */
function blurb(text: string) {
  const first = text.replace(/\s*\[S\d[^\]]*\]/g, "").split(/(?<=\.)\s/)[0] ?? text;
  const clause = first.split(/:|, and |, so |, locally/)[0]!.replace(/^This (persona|is) /, "").replace(/\.$/, "");
  return clause.charAt(0).toUpperCase() + clause.slice(1);
}

function Bullets({ items }: { items: string[] }) {
  return <ul>{items.map((x, i) => <li key={i}><Rich text={x} /></li>)}</ul>;
}

function Device({ type, screen }: { type: DeviceType; screen: string }) {
  const stroke = "var(--foreground)";
  const body = "var(--card)";
  const glass = "var(--accent-soft)";
  const txt = (x: number, y: number) => (
    <text x={x} y={y} textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--primary)">{screen}</text>
  );
  if (type === "mobile") {
    return (
      <svg viewBox="0 0 80 150" role="img" aria-label="Mobile phone" className="device mobile">
        <rect x="4" y="4" width="72" height="142" rx="12" fill={body} stroke={stroke} strokeWidth="3" />
        <rect x="11" y="18" width="58" height="114" rx="4" fill={glass} />
        <rect x="31" y="9" width="18" height="4" rx="2" fill={stroke} />
        {txt(40, 78)}
        <rect x="30" y="137" width="20" height="3" rx="1.5" fill={stroke} opacity=".5" />
      </svg>
    );
  }
  if (type === "desktop") {
    return (
      <svg viewBox="0 0 220 160" role="img" aria-label="Desktop computer" className="device desktop">
        <rect x="8" y="6" width="204" height="124" rx="8" fill={body} stroke={stroke} strokeWidth="3" />
        <rect x="16" y="14" width="188" height="104" rx="3" fill={glass} />
        <rect x="16" y="14" width="188" height="12" fill="var(--primary)" opacity=".85" />
        {txt(110, 72)}
        <path d="M96 130h28l4 20H92z" fill={body} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        <rect x="70" y="150" width="80" height="6" rx="3" fill={stroke} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 110 200" role="img" aria-label="Kiosk terminal" className="device kiosk">
      <rect x="12" y="4" width="86" height="120" rx="8" fill={body} stroke={stroke} strokeWidth="3" />
      <rect x="20" y="12" width="70" height="86" rx="3" fill={glass} />
      {txt(55, 58)}
      <rect x="34" y="104" width="42" height="12" rx="3" fill={stroke} opacity=".25" />
      <rect x="44" y="124" width="22" height="58" fill={body} stroke={stroke} strokeWidth="3" />
      <rect x="22" y="182" width="66" height="10" rx="4" fill={stroke} />
    </svg>
  );
}

const RATING_CLASS: Record<string, string> = { Strong: "ok", Moderate: "mid", Thin: "" };

export default function App() {
  const [pIndex, setPIndex] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [railVisible, setRailVisible] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>(loadNotes);

  const selected = pIndex !== null;
  const persona: Persona = PERSONAS[pIndex ?? 0]!;

  const setNote = (id: string, value: string) =>
    setNotes((old) => {
      const next = { ...old, [id]: value };
      try { localStorage.setItem(NOTES_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });

  const imageFor = (p: Persona, i: number) => PHOTOS[p.id] ?? avatar(p.initials, AVATAR_BG[i % AVATAR_BG.length]!);

  const lanyardItems: LanyardMember[] = useMemo(
    () => PERSONAS.map((p, i) => ({
      id: p.id,
      name: p.short,
      role: p.segment,
      team: `Evidence: ${p.rating}`,
      tone: ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5,
      image: imageFor(p, i),
      bio: blurb(p.intro[0] ?? ""),
    })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const globeItems: GlobeTestimonial[] = PERSONAS.map((p, i) => {
    const q = p.quotes[0] ? stripSources(p.quotes[0]).replace(/^["“]|["”]$/g, "") : blurb(p.intro[0] ?? "");
    return {
      id: p.id, quote: q, name: p.short, role: p.segment, company: p.org.site,
      city: p.org.city, country: p.org.country, lat: p.org.lat, lng: p.org.lng,
      image: imageFor(p, i), tone: ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5,
    };
  });

  const dimCss = PERSONAS.map((_, i) => `.picker[data-sel="${i}"] [data-lanyard]:not([data-lanyard="${i}"]){opacity:.3}`).join("\n");

  const makeAvatars = async () => {
    const out: Record<string, PdfAvatar> = {};
    await Promise.all(PERSONAS.map(async (p, i) => {
      const url = PHOTOS[p.id];
      let photo;
      try { photo = url ? await loadJpeg(url) : undefined; } catch { photo = undefined; }
      out[p.id] = { hex: AVATAR_BG[i % AVATAR_BG.length]!, initials: p.initials, photo };
    }));
    return out;
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRailVisible(e?.isIntersecting ?? true), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => {
    const r = document.documentElement;
    r.dataset.theme = r.dataset.theme === "dark" ? "light" : "dark";
  };

  const devLabel = { desktop: "PC / Desktop", mobile: "Mobile", kiosk: "Kiosk" } as const;
  const m = persona.moscow;

  return (
    <>
    <header className="top">
      <div className="brandbar" aria-hidden="true" />
      <div className="top-inner">
        <div className="titles">
          <h1><span className="t-blue">Intranet</span> <span className="t-red">persona</span></h1>
        </div>
        <div className="controls">
          <div className="btn-row">
            <button type="button" className="hbtn hbtn-primary" disabled={!selected}
              title={selected ? undefined : "Select a persona first"}
              onClick={async () => downloadPdf(`persona-${persona.id}.pdf`, personaPdf([persona], await makeAvatars()))}>
              Download PDF
            </button>
            <button type="button" className="hbtn hbtn-secondary"
              onClick={async () => downloadPdf("personas-all.pdf", personaPdf(PERSONAS, await makeAvatars()))}>
              Download all PDFs
            </button>
            <button type="button" className="hbtn hbtn-secondary" aria-label="Toggle light or dark theme" onClick={toggleTheme}>Theme</button>
          </div>
        </div>
      </div>
    </header>
    <div className="wrap">
      <style>{dimCss}</style>
      <nav className="glass-nav" data-show={!railVisible} aria-label="Switch persona" inert={railVisible}>
        <div className="glass-nav-inner">
          {PERSONAS.map((p, i) => (
            <button key={p.id} type="button" className="glass-chip" aria-pressed={pIndex === i} onClick={() => setPIndex(i)}>
              <i aria-hidden="true" style={{ background: `var(--p${i})` }} />
              {p.short}
            </button>
          ))}
        </div>
      </nav>

      <div className="picker" data-sel={pIndex ?? ""}>
        <div ref={railRef}>
        <TeamLanyardRail
          items={lanyardItems}
          logo={logo}
          eyebrow="Persona picker"
          heading="Who are we designing for?"
          onFlippedChange={(i) => { if (i !== null) setPIndex(i); }}
        />
        </div>
      {selected && (
        <div className="picker-body">
          <div className="headline">
            <div className="headline-avatar"><img src={imageFor(persona, pIndex ?? 0)} alt="" width={96} height={96} /></div>
            <h2 className="t-h1" id="persona-headline">{persona.title}</h2>
            <p className="headline-role">{persona.segment}</p>
            <span className={`badge ${RATING_CLASS[persona.rating] ?? ""}`}>Evidence: {persona.rating}</span>
          </div>

          <div className="panel" aria-live="polite">
            {persona.intro.map((t, i) => <p key={i} className="doc-p"><Rich text={t} /></p>)}
            <p className="doc-p caption-p"><b>Evidence rating:</b> <Rich text={persona.evidence} /></p>

            <section className="globe-box">
              <h3>Location</h3>
              <TestimonialGlobe
                items={globeItems}
                autoRotate={false}
                size={380}
                active={pIndex}
                onActiveChange={(i) => { if (i !== null) setPIndex(i); }}
                labels={{ previous: "Previous persona", next: "Next persona", pin: "Show persona" }}
              />
            </section>

            <div className="pgrid">
              {persona.blocks.map((b) => (
                <section key={b.title}>
                  <h3>{b.title}</h3>
                  {stripSources(b.note) && <p className="caption-p"><Rich text={b.note} /></p>}
                  {b.items.length > 0 && <Bullets items={b.items} />}
                  {b.paras.map((t, i) => <p key={i} className="doc-p"><Rich text={t} /></p>)}
                </section>
              ))}
            </div>

            {persona.quotes.length > 0 && (
              <section>
                <h3>In their words</h3>
                {persona.quoteNote && <p className="caption-p">{persona.quoteNote}</p>}
                {persona.quotes.map((q, i) => <blockquote key={i} className="pquote"><Rich text={q} /></blockquote>)}
              </section>
            )}

            {persona.success && (
              <section>
                <h3>Success looks like</h3>
                <p className="doc-p"><Rich text={persona.success} /></p>
              </section>
            )}

            {m && (
              <section>
                <h3>Where this lands in the MoSCoW prioritisation</h3>
                <div className="moscow">
                  {([["Must have", m.must], ["Should have", m.should], ["Could have", m.could], ["Won't have", m.wont]] as const).map(([label, items]) => (
                    <div key={label} className="moscow-col" data-kind={label.split(" ")[0]!.toLowerCase()}>
                      <b>{label}</b>
                      {items.length ? <Bullets items={[...items]} /> : <span className="t-caption">Nothing listed</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {persona.interpretation && (
              <p className="callout"><b>Interpretation:</b> <Rich text={persona.interpretation} /></p>
            )}

            {persona.devices && persona.devices.length > 0 && (
              <section>
                <h3>Devices named in the sources</h3>
                <div className="devices">
                  {persona.devices.map((d) => (
                    <figure key={d.type} className="devfig">
                      <Device type={d.type} screen={persona.initials} />
                      <figcaption><b>{devLabel[d.type]}</b><small><Rich text={d.use} /></small></figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3><label htmlFor="note">Your notes on this persona</label></h3>
              <textarea id="note" className="notes" placeholder="What did you hear? What is still an assumption?" value={notes[persona.id] ?? ""} onChange={(e) => setNote(persona.id, e.target.value)} />
            </section>
          </div>

          <button type="button" className="chip" onClick={() => setPIndex(null)}>Clear selection</button>
        </div>
      )}
      </div>

    </div>
    </>
  );
}

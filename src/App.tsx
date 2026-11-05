import { useEffect, useMemo, useRef, useState } from "react";
import TestimonialGlobe, { type GlobeTestimonial } from "@/components/ui/testimonial-globe";
import TeamLanyardRail, { type LanyardMember } from "@/components/ui/team-lanyard-rail";
import { PERSONAS, STAGES, STAGE_NAMES, type DeviceType, type Persona, type Status } from "@/data";

const LAYERS = [["emotion", "Emotion"], ["actions", "Actions"], ["touchpoints", "Touchpoints"], ["pains", "Pain points"], ["opps", "Opportunities"]] as const;
type LayerKey = (typeof LAYERS)[number][0];
const STATUSES: Status[] = ["Assumption", "Emerging", "Confirmed"];
const STORAGE_KEY = "persona-journeys-placeholder-v1";

type Saved = Record<string, { status?: Status; note?: string }>;

function loadSaved(): Saved {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Saved; } catch { return {}; }
}

function avatar(initials: string, bg: string) {
  const fg = bg === "#ADC7EA" ? "#234F9A" : "#FFFFFF";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="${bg}"/><text x="40" y="53" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="38" font-weight="700" fill="${fg}">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const AVATAR_BG = ["#234F9A", "#628FDB", "#C20012", "#ADC7EA", "#8A8A89"];

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

function List({ items }: { items: string[] }) {
  if (!items.length) return <span className="t-caption">None noted</span>;
  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

function Curve({ emotion, selected, hover, onHover, onSelect }: { emotion: number[]; selected: number; hover: number | null; onHover: (i: number | null) => void; onSelect: (i: number) => void }) {
  const n = emotion.length, w = 1000, h = 150, pad = 24;
  const x = (i: number) => ((i + 0.5) * w) / n;
  const y = (v: number) => h - pad - ((v - 1) * (h - 2 * pad)) / 4;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="Emotion curve across stages, scale 1 low to 5 high" onMouseLeave={() => onHover(null)}>
      {emotion.map((_, i) => (
        <rect key={`c${i}`} x={(i * w) / n} y="0" width={w / n} height={h} className="emo-col" data-on={i === hover || i === selected ? (i === selected ? "sel" : "hov") : undefined} onMouseEnter={() => onHover(i)} onClick={() => onSelect(i)} />
      ))}
      {[1, 2, 3, 4, 5].map((k) => <line key={k} x1="0" x2={w} y1={y(k)} y2={y(k)} stroke="var(--line)" strokeDasharray="4 6" pointerEvents="none" />)}
      <polyline points={emotion.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke="var(--accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" pointerEvents="none" />
      {emotion.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={i === selected || i === hover ? 9 : 6} fill={i === selected ? "var(--accent)" : "var(--surface)"} stroke="var(--accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" pointerEvents="none" style={{ transition: "r .15s" }} />
      ))}
    </svg>
  );
}

export default function App() {
  const [pIndex, setPIndex] = useState<number | null>(null);
  const [sIndex, setSIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const [railVisible, setRailVisible] = useState(true);
  const [hS, setHS] = useState<number | null>(null);
  const [layers] = useState<Record<LayerKey, boolean>>({ emotion: true, actions: true, touchpoints: true, pains: true, opps: true });
  const [saved, setSaved] = useState<Saved>(loadSaved);

  const selected = pIndex !== null;
  const persona: Persona = PERSONAS[pIndex ?? 0]!;
  const j = persona.journey;
  const n = STAGES.length;
  const statusOf = (p: Persona): Status => saved[p.id]?.status ?? p.status;
  const badgeClass = (s: Status) => (s === "Confirmed" ? "ok" : s === "Emerging" ? "mid" : "");

  const update = (key: string, patch: { status?: Status; note?: string }) =>
    setSaved((old) => {
      const next = { ...old, [key]: { ...old[key], ...patch } };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });

  const lanyardItems: LanyardMember[] = useMemo(
    () => PERSONAS.map((p, i) => ({
      id: p.id,
      name: p.name.replace(" (placeholder)", ""),
      role: p.role,
      team: statusOf(p),
      tone: ((i % 3) + 1) as 1 | 2 | 3,
      image: avatar(p.initials, AVATAR_BG[i % AVATAR_BG.length]!),
      bio: p.quote.replace(/[“”]/g, ""),
      tags: p.channels.slice(0, 2),
    })),
    // status shows on the badge; re-derive when saved statuses change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [saved],
  );

  const globeItems: GlobeTestimonial[] = PERSONAS.map((p, i) => ({
    id: p.id,
    quote: p.quote.replace(/[“”]/g, ""),
    name: p.name.replace(" (placeholder)", ""),
    role: p.org.level,
    company: p.org.department,
    city: p.org.city,
    country: p.org.country,
    lat: p.org.lat,
    lng: p.org.lng,
    image: avatar(p.initials, AVATAR_BG[i % AVATAR_BG.length]!),
    tone: ((i % 3) + 1) as 1 | 2 | 3,
  }));

  const dimCss = PERSONAS.map((_, i) => `.picker[data-sel="${i}"] [data-lanyard]:not([data-lanyard="${i}"]){opacity:.3}`).join("\n");

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRailVisible(e?.isIntersecting ?? true), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => { setPIndex(i); setSIndex(0); };

  const toggleTheme = () => {
    const r = document.documentElement;
    r.dataset.theme = r.dataset.theme === "dark" ? "light" : "dark";
  };

  const note = saved[`${persona.id}:${sIndex}`]?.note ?? "";
  const emo = j.emotion[sIndex] ?? 1;

  function row(key: Exclude<LayerKey, "emotion">, label: string, cls?: string) {
    return (
      <>
        <div className={`rl${layers[key] ? "" : " hidden"}`}>{label}</div>
        {j[key].map((c, i) => (
          <div key={i} className={`cell${i === sIndex ? " sel" : ""}${i === hS ? " hov" : ""}${layers[key] ? "" : " hidden"}`} onMouseEnter={() => setHS(i)} onClick={() => setSIndex(i)}>
            <span className={cls}><List items={c} /></span>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="wrap">
      <style>{dimCss}</style>
      <nav className="glass-nav" data-show={!railVisible} aria-label="Switch persona" inert={railVisible}>
        <div className="glass-nav-inner">
          {PERSONAS.map((p, i) => (
            <button key={p.id} type="button" className="glass-chip" aria-pressed={pIndex === i} onClick={() => pick(i)}>
              <i aria-hidden="true" style={{ background: `var(--p${i})` }} />
              {p.name.replace(" (placeholder)", "")}
            </button>
          ))}
        </div>
      </nav>
      <header className="page-header">
        <h1>Personas and journeys for intranet experience</h1>
        <button className="themebtn" type="button" aria-label="Toggle light or dark theme" onClick={toggleTheme}>Theme</button>
      </header>

      <div className="picker" data-sel={pIndex ?? ""}>
        <div ref={railRef}>
        <TeamLanyardRail
          items={lanyardItems}
          eyebrow="Persona picker"
          heading="Who are we designing for?"
          caption="Hover along the rail, then click a badge to select a persona."
          onFlippedChange={(i) => { if (i !== null) { setPIndex(i); setSIndex(0); } }}
          action={<span className="picker-action"><i aria-hidden="true" />{selected ? `Selected: ${persona.name.replace(" (placeholder)", "")}` : "No persona selected"}</span>}
        />
        </div>
      {selected && (
        <div className="picker-body">
          <div className="headline">
            <h2 className="t-h1" id="persona-headline">{persona.name.replace(" (placeholder)", "")}</h2>
            <p className="headline-role">{persona.role}</p>
            <span className={`badge ${badgeClass(statusOf(persona))}`}>{statusOf(persona)}</span>
          </div>
      <div className="pdetail nobox" aria-live="polite">
        <div className="quote">{persona.quote}</div>
        <div><h3>Goals</h3><List items={persona.goals} /></div>
        <div><h3>Frustrations</h3><List items={persona.frustrations} /></div>
        <div><h3>Channels</h3><List items={persona.channels} /></div>
        <div><h3>Facts</h3><List items={persona.facts} /></div>
        <div className="conf">
          <label htmlFor="pstatus"><b>How confident are we?</b></label>
          <select id="pstatus" value={statusOf(persona)} onChange={(e) => update(persona.id, { status: e.target.value as Status })}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <small>Assumption, emerging from evidence, or confirmed with the client.</small>
        </div>
      </div>

      <h2 className="sec">Location and profile in the company</h2>
      <div className="subbox">
        <TestimonialGlobe
          items={globeItems}
          eyebrow="Where they work"
          heading={`${persona.name.replace(" (placeholder)", "")} · ${persona.org.city}`}
          autoRotate={false}
          size={380}
          active={selected ? pIndex : null}
          onActiveChange={(i) => { if (i !== null) { setPIndex(i); setSIndex(0); } }}
          labels={{ previous: "Previous persona", next: "Next persona", pin: "Show persona" }}
        />
      </div>
      <dl className="pdetail nobox" aria-live="polite">
        {([["Site", persona.org.site], ["City", `${persona.org.city}, ${persona.org.country}`], ["Department", persona.org.department], ["Level", persona.org.level], ["Reports to", persona.org.reportsTo]] as const).map(([k, v]) => (
          <div key={k}><dt className="t-label">{k}</dt><dd style={{ margin: 0 }}>{v}</dd></div>
        ))}
      </dl>

      <h2 className="sec">Journey</h2>
      <div className="journey">
        <div className="jgrid" data-hover={hS ?? undefined} onMouseLeave={() => setHS(null)} style={{ ["--n" as string]: n, ["--cols" as string]: n + 1 }}>
          <div className="rl">Stage</div>
          {STAGES.map((s, i) => (
            <div key={s} className={`sh${i === hS ? " hov" : ""}`} onMouseEnter={() => setHS(i)}>
              <button type="button" aria-pressed={i === sIndex} onFocus={() => setHS(i)} onBlur={() => setHS(null)} onClick={() => setSIndex(i)}>{s}<small>{STAGE_NAMES[i]}</small></button>
            </div>
          ))}
          <div className={`rl${layers.emotion ? "" : " hidden"}`}>Emotion</div>
          <div className={`emo${layers.emotion ? "" : " hidden"}`}><Curve emotion={j.emotion} selected={sIndex} hover={hS} onHover={setHS} onSelect={setSIndex} /></div>
          {row("actions", "Actions")}
          {row("touchpoints", "Touchpoints")}
          {row("pains", "Pain points", "pain")}
          {row("opps", "Opportunities", "opp")}
        </div>
      </div>

      <h2 className="sec">Devices</h2>
      <div className="devices">
        {persona.devices.map((d) => (
          <figure key={d.type} className="devfig">
            <Device type={d.type} screen={persona.initials} />
            <figcaption><b>{d.type === "desktop" ? "PC / Desktop" : d.type === "mobile" ? "Mobile" : "Kiosk"}</b><small>{d.use}</small></figcaption>
          </figure>
        ))}
      </div>

      <div className="stage" aria-live="polite">
        <div className="full">
          <h3>{persona.name} · {STAGES[sIndex]}</h3>
          <b className="t-h2">{STAGE_NAMES[sIndex]}</b>{" "}
          <span className="meter" aria-label={`Emotion ${emo} out of 5`}>{[1, 2, 3, 4, 5].map((v) => <i key={v} className={v <= emo ? "on" : ""} />)}</span>
        </div>
        <div><h3>Actions</h3><List items={j.actions[sIndex] ?? []} /></div>
        <div><h3>Touchpoints</h3><List items={j.touchpoints[sIndex] ?? []} /></div>
        <div><h3>Pain points</h3><span className="pain"><List items={j.pains[sIndex] ?? []} /></span></div>
        <div><h3>Opportunities</h3><span className="opp"><List items={j.opps[sIndex] ?? []} /></span></div>
        <div className="full">
          <h3><label htmlFor="note">Your notes for this stage</label></h3>
          <textarea id="note" placeholder="What did you hear? What is still an assumption?" value={note} onChange={(e) => update(`${persona.id}:${sIndex}`, { note: e.target.value })} />
        </div>
        <div className="nav">
          <button type="button" disabled={sIndex === 0} onClick={() => setSIndex((s) => Math.max(0, s - 1))}>Previous stage</button>
          <button type="button" disabled={sIndex === n - 1} onClick={() => setSIndex((s) => Math.min(n - 1, s + 1))}>Next stage</button>
        </div>
      </div>

          <button type="button" className="chip" onClick={() => setPIndex(null)}>Clear selection</button>
        </div>
      )}
      </div>

      <footer className="page-footer">Notes and confidence settings are saved in this browser only. Content is placeholder text: replace it in <code>src/data.ts</code>.</footer>
    </div>
  );
}

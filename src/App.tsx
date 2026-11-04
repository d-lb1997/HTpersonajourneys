import { useMemo, useState } from "react";
import TestimonialGlobe, { type GlobeTestimonial } from "@/components/ui/testimonial-globe";
import TeamLanyardRail, { type LanyardMember } from "@/components/ui/team-lanyard-rail";
import { PERSONAS, STAGES, STAGE_NAMES, type Persona, type Status } from "@/data";

const LAYERS = [["emotion", "Emotion"], ["actions", "Actions"], ["touchpoints", "Touchpoints"], ["pains", "Pain points"], ["opps", "Opportunities"]] as const;
type LayerKey = (typeof LAYERS)[number][0];
const STATUSES: Status[] = ["Assumption", "Emerging", "Confirmed"];
const STORAGE_KEY = "persona-journeys-placeholder-v1";

type Saved = Record<string, { status?: Status; note?: string }>;

function loadSaved(): Saved {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Saved; } catch { return {}; }
}

function avatar(initials: string, bg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" fill="${bg}"/><text x="40" y="53" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="38" font-weight="700" fill="#fff">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const AVATAR_BG = ["#003a78", "#0062b1", "#3a9ad9"];

function List({ items }: { items: string[] }) {
  if (!items.length) return <span style={{ color: "var(--muted-foreground)" }}>None noted</span>;
  return <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

function Curve({ emotion, selected }: { emotion: number[]; selected: number }) {
  const n = emotion.length, w = 1000, h = 150, pad = 24;
  const x = (i: number) => ((i + 0.5) * w) / n;
  const y = (v: number) => h - pad - ((v - 1) * (h - 2 * pad)) / 4;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="Emotion curve across stages, scale 1 low to 5 high">
      {[1, 2, 3, 4, 5].map((k) => <line key={k} x1="0" x2={w} y1={y(k)} y2={y(k)} stroke="var(--line)" strokeDasharray="4 6" />)}
      <polyline points={emotion.map((v, i) => `${x(i)},${y(v)}`).join(" ")} fill="none" stroke="var(--accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      {emotion.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={i === selected ? 9 : 6} fill={i === selected ? "var(--accent)" : "var(--surface)"} stroke="var(--accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

export default function App() {
  const [pIndex, setPIndex] = useState(0);
  const [sIndex, setSIndex] = useState(0);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({ emotion: true, actions: true, touchpoints: true, pains: true, opps: true });
  const [saved, setSaved] = useState<Saved>(loadSaved);

  const persona: Persona = PERSONAS[pIndex]!;
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
          <div key={i} className={`cell${i === sIndex ? " sel" : ""}${layers[key] ? "" : " hidden"}`}>
            <span className={cls}><List items={c} /></span>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="wrap">
      <header className="page-header">
        <div className="row">
          <div>
            <h1>Personas and journeys</h1>
            <p>Pick a persona by flipping its badge, then see how they move through the journey. Click a stage to see detail, add notes and set how confident we are.</p>
          </div>
          <button className="themebtn" type="button" aria-label="Toggle light or dark theme" onClick={toggleTheme}>Theme</button>
        </div>
        <div className="banner"><b>Placeholder content.</b> All names, quotes, stages and scores below are examples to show how the page works. Replace them in <code>src/data.ts</code>.</div>
      </header>

      <h2 className="sec" id="h-personas">1. Personas</h2>
      <div className="picker">
        <TeamLanyardRail
          items={lanyardItems}
          eyebrow="Persona picker"
          heading="Who are we designing for?"
          caption="Hover along the rail, then click a badge to flip it and show that persona below."
          onFlippedChange={(i) => { if (i !== null) { setPIndex(i); setSIndex(0); } }}
          action={<span className="picker-action"><i aria-hidden="true" />Viewing: {persona.name.replace(" (placeholder)", "")}</span>}
        />
      </div>

      <div className="pdetail" aria-live="polite">
        <div className="who">
          <b style={{ fontSize: "1.1rem" }}>{persona.name}</b>
          <small style={{ color: "var(--muted-foreground)" }}>{persona.role}</small>
          <span className={`badge ${badgeClass(statusOf(persona))}`}>{statusOf(persona)}</span>
        </div>
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
          <small style={{ color: "var(--muted-foreground)" }}>Assumption, emerging from evidence, or confirmed with the client.</small>
        </div>
      </div>

      <h2 className="sec">2. Location and profile in the company</h2>
      <div className="picker">
        <TestimonialGlobe
          items={globeItems}
          eyebrow="Where they work"
          heading={`${persona.name.replace(" (placeholder)", "")} · ${persona.org.city}`}
          autoRotate={false}
          size={380}
          active={pIndex}
          onActiveChange={(i) => { if (i !== null) { setPIndex(i); setSIndex(0); } }}
          labels={{ previous: "Previous persona", next: "Next persona", pin: "Show persona" }}
        />
      </div>
      <dl className="pdetail" aria-live="polite">
        {([["Site", persona.org.site], ["City", `${persona.org.city}, ${persona.org.country}`], ["Department", persona.org.department], ["Level", persona.org.level], ["Reports to", persona.org.reportsTo]] as const).map(([k, v]) => (
          <div key={k}><dt style={{ fontSize: ".78rem", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--muted-foreground)", fontWeight: 700 }}>{k}</dt><dd style={{ margin: 0 }}>{v}</dd></div>
        ))}
      </dl>

      <h2 className="sec">3. Journey</h2>
      <div className="tools" role="group" aria-label="Show or hide rows">
        <span style={{ color: "var(--muted-foreground)", fontSize: ".88rem" }}>Show:</span>
        {LAYERS.map(([k, label]) => (
          <button key={k} type="button" className="chip" aria-pressed={layers[k]} onClick={() => setLayers((l) => ({ ...l, [k]: !l[k] }))}>{label}</button>
        ))}
      </div>
      <div className="journey">
        <div className="jgrid" style={{ ["--n" as string]: n, ["--cols" as string]: n + 1 }}>
          <div className="rl">Stage</div>
          {STAGES.map((s, i) => (
            <div key={s} className="sh">
              <button type="button" aria-pressed={i === sIndex} onClick={() => setSIndex(i)}>{s}<small>{STAGE_NAMES[i]}</small></button>
            </div>
          ))}
          <div className={`rl${layers.emotion ? "" : " hidden"}`}>Emotion</div>
          <div className={`emo${layers.emotion ? "" : " hidden"}`}><Curve emotion={j.emotion} selected={sIndex} /></div>
          {row("actions", "Actions")}
          {row("touchpoints", "Touchpoints")}
          {row("pains", "Pain points", "pain")}
          {row("opps", "Opportunities", "opp")}
        </div>
      </div>

      <div className="stage" aria-live="polite">
        <div className="full">
          <h3>{persona.name} · {STAGES[sIndex]}</h3>
          <b style={{ fontSize: "1.15rem" }}>{STAGE_NAMES[sIndex]}</b>{" "}
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

      <footer className="page-footer">Notes and confidence settings are saved in this browser only. Content is placeholder text.</footer>
    </div>
  );
}

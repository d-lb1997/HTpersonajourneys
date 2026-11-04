# Personas and journeys

A Vite + React + TypeScript + Tailwind CSS v4 app (shadcn project layout). A lanyard-style persona picker sits at the top; flipping a badge selects that persona and shows its detail and journey (actions, touchpoints, pain points, opportunities, emotion curve) with per-stage notes and a confidence level.

```bash
npm install
npm run dev
```

- Content is placeholder. Edit it in `src/data.ts`.
- Picker component: `src/components/ui/team-lanyard-rail.tsx` (`@/components/ui` is the shadcn default).
- Theme tokens (HellermannTyton-style navy/blue/yellow) live at the top of `src/index.css`.
- The previous single-file version is kept at `legacy/index.html`.
- Notes and confidence are saved in the browser only.

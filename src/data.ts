/* ============ DATA: replace with real content ============ */
export type Status = "Assumption" | "Emerging" | "Confirmed";

export interface Journey {
  emotion: number[];
  actions: string[][];
  touchpoints: string[][];
  pains: string[][];
  opps: string[][];
}

export type DeviceType = "mobile" | "desktop" | "kiosk";
export interface DeviceUse { type: DeviceType; use: string }

export interface Persona {
  id: string;
  initials: string;
  name: string;
  role: string;
  status: Status;
  quote: string;
  goals: string[];
  frustrations: string[];
  channels: string[];
  facts: string[];
  /** Placeholder location and place in the company; shown on the globe. */
  org: { city: string; country: string; lat: number; lng: number; site: string; department: string; level: string; reportsTo: string };
  /** Devices this persona uses, with what they do on each (placeholder). */
  devices: DeviceUse[];
  journey: Journey;
}

export const STAGES = ["Stage 1", "Stage 2", "Stage 3", "Stage 4", "Stage 5", "Stage 6"];
export const STAGE_NAMES = ["Awareness", "First contact", "Everyday use", "Problem or question", "Resolution", "Looking back"];

export const PERSONAS: Persona[] = [
  {
    id: "p1", initials: "A", name: "Persona A (placeholder)", role: "Role or segment goes here", status: "Assumption",
    quote: "“A short quote that sums up what this person cares about goes here.”",
    goals: ["Placeholder goal one", "Placeholder goal two", "Placeholder goal three"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel one", "Channel two", "Channel three"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Pinneberg", country: "DE", lat: 53.66, lng: 9.80, site: "Headquarters (placeholder)", department: "Department A", level: "Team lead", reportsTo: "Head of Department A" },
    devices: [{ type: "mobile", use: "Placeholder: quick checks on the go" }, { type: "desktop", use: "Placeholder: main daily work" }],
    journey: {
      emotion: [3, 4, 4, 2, 3, 4],
      actions: [["Hears about the topic"], ["Tries it for the first time"], ["Uses it regularly", "Shares with a colleague"], ["Gets stuck on something"], ["Asks for help", "Finds an answer"], ["Reflects on how it went"]],
      touchpoints: [["Touchpoint 1"], ["Touchpoint 2", "Touchpoint 3"], ["Touchpoint 4"], ["Touchpoint 5"], ["Touchpoint 6", "Touchpoint 7"], ["Touchpoint 8"]],
      pains: [["Unclear where to start"], [], ["Too many steps"], ["Cannot find the right person"], ["Waiting for a reply"], []],
      opps: [["Clear first message"], ["Simple welcome"], ["Shortcut for common tasks"], ["Visible help route"], ["Faster answers"], ["Ask for feedback"]],
    },
  },
  {
    id: "p2", initials: "B", name: "Persona B (placeholder)", role: "Another role or segment", status: "Emerging",
    quote: "“Another placeholder quote about needs and worries.”",
    goals: ["Placeholder goal one", "Placeholder goal two"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two", "Placeholder frustration three"],
    channels: ["Channel one", "Channel four"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Manchester", country: "GB", lat: 53.48, lng: -2.24, site: "Regional office (placeholder)", department: "Department B", level: "Specialist", reportsTo: "Regional manager" },
    devices: [{ type: "kiosk", use: "Placeholder: shared terminal on site" }, { type: "mobile", use: "Placeholder: occasional lookups" }],
    journey: {
      emotion: [2, 3, 3, 2, 2, 3],
      actions: [["Hears from a colleague"], ["Needs someone to show them"], ["Uses it occasionally"], ["Hits a limit"], ["Works around it"], ["Decides whether to keep using it"]],
      touchpoints: [["Touchpoint 2"], ["Touchpoint 5"], ["Touchpoint 1", "Touchpoint 4"], ["Touchpoint 6"], ["Touchpoint 3"], ["Touchpoint 8"]],
      pains: [["Heard late"], ["Needs help to get started"], [], ["No clear owner"], ["Workaround takes time"], ["Unsure it is worth it"]],
      opps: [["Reach them where they are"], ["Buddy or guide"], ["Keep it simple"], ["Name an owner"], ["Fix the root cause"], ["Show what changed"]],
    },
  },
  {
    id: "p3", initials: "C", name: "Persona C (placeholder)", role: "A third role or segment", status: "Confirmed",
    quote: "“A third placeholder quote goes here.”",
    goals: ["Placeholder goal one", "Placeholder goal two", "Placeholder goal three"],
    frustrations: ["Placeholder frustration one"],
    channels: ["Channel two", "Channel three", "Channel five"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Shanghai", country: "CN", lat: 31.23, lng: 121.47, site: "Plant (placeholder)", department: "Department C", level: "Senior specialist", reportsTo: "Plant manager" },
    devices: [{ type: "desktop", use: "Placeholder: deep work and reporting" }, { type: "mobile", use: "Placeholder: notifications" }, { type: "kiosk", use: "Placeholder: showroom terminal" }],
    journey: {
      emotion: [4, 4, 5, 3, 4, 5],
      actions: [["Looks for it proactively"], ["Sets things up"], ["Uses it daily", "Helps others"], ["Spots a gap"], ["Suggests an improvement"], ["Champions it"]],
      touchpoints: [["Touchpoint 1", "Touchpoint 3"], ["Touchpoint 2"], ["Touchpoint 4"], ["Touchpoint 5"], ["Touchpoint 7"], ["Touchpoint 6"]],
      pains: [[], [], ["Few ways to share what works"], ["Suggestions go nowhere"], [], []],
      opps: [["Early access"], ["Templates"], ["Recognise their help"], ["Feedback loop"], ["Show what happened to ideas"], ["Invite as champion"]],
    },
  },
  {
    id: "p4", initials: "D", name: "Persona D (placeholder)", role: "A fourth role or segment", status: "Emerging",
    quote: "“A fourth placeholder quote about daily priorities.”",
    goals: ["Placeholder goal one", "Placeholder goal two"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel one", "Channel three"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Tampa", country: "US", lat: 27.95, lng: -82.46, site: "Regional office (placeholder)", department: "Department D", level: "Manager", reportsTo: "Regional director" },
    devices: [{ type: "desktop", use: "Placeholder: planning and approvals" }, { type: "mobile", use: "Placeholder: on-the-move updates" }],
    journey: {
      emotion: [3, 3, 4, 2, 3, 4],
      actions: [["Learns about it in a briefing"], ["Joins a pilot"], ["Uses it weekly"], ["Hits a process gap"], ["Escalates to a lead"], ["Shares results with the team"]],
      touchpoints: [["Touchpoint 3"], ["Touchpoint 1"], ["Touchpoint 4"], ["Touchpoint 6"], ["Touchpoint 5", "Touchpoint 7"], ["Touchpoint 8"]],
      pains: [[], ["Pilot rules are unclear"], [], ["Process gap"], ["Slow escalation"], []],
      opps: [["Briefing pack"], ["Clear pilot guide"], ["Weekly digest"], ["Gap tracker"], ["Fast-track route"], ["Share template"]],
    },
  },
  {
    id: "p5", initials: "E", name: "Persona E (placeholder)", role: "A fifth role or segment", status: "Assumption",
    quote: "“A fifth placeholder quote about what slows them down.”",
    goals: ["Placeholder goal one", "Placeholder goal two"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel one", "Channel three"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Mumbai", country: "IN", lat: 19.08, lng: 72.88, site: "Service centre (placeholder)", department: "Department E", level: "Specialist", reportsTo: "Service lead" },
    devices: [{ type: "kiosk", use: "Placeholder: self-service point" }, { type: "mobile", use: "Placeholder: status checks" }],
    journey: {
      emotion: [2, 3, 3, 2, 3, 3],
      actions: [["Sees a poster"], ["Tries the kiosk"], ["Returns when needed"], ["Cannot find an answer"], ["Asks staff"], ["Decides to come back"]],
      touchpoints: [["Touchpoint 2"], ["Touchpoint 5"], ["Touchpoint 5"], ["Touchpoint 6"], ["Touchpoint 3"], ["Touchpoint 8"]],
      pains: [["Easy to miss"], ["Too many screens"], [], ["Answer is buried"], ["Queue for help"], []],
      opps: [["Visible signage"], ["Shorter flow"], ["Remember my choices"], ["Better search"], ["Call button"], ["Follow-up message"]],
    },
  },
  {
    id: "p6", initials: "F", name: "Persona F (placeholder)", role: "A sixth role or segment", status: "Confirmed",
    quote: "“A sixth placeholder quote about wanting to do more with it.”",
    goals: ["Placeholder goal one", "Placeholder goal two"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel one", "Channel three"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Sydney", country: "AU", lat: -33.87, lng: 151.21, site: "Sales office (placeholder)", department: "Department F", level: "Senior manager", reportsTo: "Regional head" },
    devices: [{ type: "desktop", use: "Placeholder: analysis and reports" }, { type: "mobile", use: "Placeholder: client visits" }, { type: "kiosk", use: "Placeholder: showroom demos" }],
    journey: {
      emotion: [4, 4, 4, 3, 4, 5],
      actions: [["Hears from a peer"], ["Sets up for the team"], ["Uses it with clients"], ["Needs a custom view"], ["Requests a change"], ["Trains new colleagues"]],
      touchpoints: [["Touchpoint 1"], ["Touchpoint 2"], ["Touchpoint 4", "Touchpoint 7"], ["Touchpoint 5"], ["Touchpoint 6"], ["Touchpoint 3"]],
      pains: [[], [], ["Hard to show clients"], ["No custom view"], ["Change takes weeks"], []],
      opps: [["Peer stories"], ["Team setup kit"], ["Client-ready view"], ["Custom views"], ["Change tracker"], ["Training material"]],
    },
  },
];
/* ========================================================= */

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
];
/* ========================================================= */

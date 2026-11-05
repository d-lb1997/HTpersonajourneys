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
    id: "current-user", initials: "C", name: "Current user (placeholder)", role: "Uses the tool in daily work", status: "Confirmed",
    quote: "“Placeholder: it saves me time, but I still hit the same few snags.”",
    goals: ["Placeholder goal one", "Placeholder goal two", "Placeholder goal three"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel one", "Channel two"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Pinneberg", country: "DE", lat: 53.66, lng: 9.80, site: "Headquarters (placeholder)", department: "Department A", level: "Specialist", reportsTo: "Team lead" },
    devices: [{ type: "desktop", use: "Placeholder: main daily work" }, { type: "mobile", use: "Placeholder: quick checks" }],
    journey: {
      emotion: [4, 4, 5, 3, 4, 5],
      actions: [["Hears about it from a colleague"], ["Completes first task"], ["Uses it daily", "Shares tips"], ["Hits a snag"], ["Finds a fix or asks for help"], ["Recommends it"]],
      touchpoints: [["Touchpoint 1"], ["Touchpoint 2"], ["Touchpoint 4"], ["Touchpoint 5"], ["Touchpoint 6", "Touchpoint 7"], ["Touchpoint 8"]],
      pains: [[], [], ["Too many steps"], ["Unclear error message"], ["Waiting for a reply"], []],
      opps: [["Clear first message"], ["Guided first task"], ["Shortcuts for common tasks"], ["Visible help route"], ["Faster answers"], ["Recognise their advocacy"]],
    },
  },
  {
    id: "non-user", initials: "N", name: "Non-user (placeholder)", role: "Could use it but does not", status: "Assumption",
    quote: "“Placeholder: I do not see what is in it for me.”",
    goals: ["Placeholder goal one", "Placeholder goal two"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two", "Placeholder frustration three"],
    channels: ["Channel three", "Channel four"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Manchester", country: "GB", lat: 53.48, lng: -2.24, site: "Regional office (placeholder)", department: "Department B", level: "Specialist", reportsTo: "Regional manager" },
    devices: [{ type: "desktop", use: "Placeholder: works in other tools" }, { type: "kiosk", use: "Placeholder: passes by shared terminal" }],
    journey: {
      emotion: [2, 2, 3, 2, 2, 2],
      actions: [["Hears about it, ignores it"], ["Sees a colleague use it"], ["Keeps current workaround"], ["Workaround fails once"], ["Considers trying it"], ["Decides to stay or switch"]],
      touchpoints: [["Touchpoint 3"], ["Touchpoint 2"], ["Touchpoint 1"], ["Touchpoint 5"], ["Touchpoint 4"], ["Touchpoint 8"]],
      pains: [["Message not relevant"], ["Unsure what it does"], ["Prefers old tools"], ["Workaround takes time"], ["Fear of extra effort"], []],
      opps: [["Speak to their needs"], ["Peer demo"], ["Show a quick win"], ["Offer a trial"], ["Low-effort start"], ["Ask why they decided"]],
    },
  },
  {
    id: "dept-rep", initials: "D", name: "Department representative (placeholder)", role: "Speaks for a department", status: "Emerging",
    quote: "“Placeholder: my team needs this to fit how we already work.”",
    goals: ["Placeholder goal one", "Placeholder goal two", "Placeholder goal three"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel one", "Channel five"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Tampa", country: "US", lat: 27.95, lng: -82.46, site: "Regional office (placeholder)", department: "Department D", level: "Manager", reportsTo: "Regional director" },
    devices: [{ type: "desktop", use: "Placeholder: planning and reporting" }, { type: "mobile", use: "Placeholder: updates on the move" }],
    journey: {
      emotion: [3, 3, 4, 2, 3, 4],
      actions: [["Is briefed on the topic"], ["Gathers team input"], ["Represents the team in meetings"], ["Team raises a gap"], ["Escalates and follows up"], ["Reports back to the team"]],
      touchpoints: [["Touchpoint 3"], ["Touchpoint 1", "Touchpoint 2"], ["Touchpoint 4"], ["Touchpoint 6"], ["Touchpoint 5", "Touchpoint 7"], ["Touchpoint 8"]],
      pains: [[], ["Hard to collect input"], [], ["No clear owner"], ["Slow escalation"], []],
      opps: [["Briefing pack"], ["Input template"], ["Meeting summary"], ["Named owner"], ["Fast-track route"], ["Share-back template"]],
    },
  },
  {
    id: "new-employee", initials: "E", name: "New employee (placeholder)", role: "Recently joined the company", status: "Assumption",
    quote: "“Placeholder: I do not know where to start or who to ask.”",
    goals: ["Placeholder goal one", "Placeholder goal two"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel two", "Channel three"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Shanghai", country: "CN", lat: 31.23, lng: 121.47, site: "Plant (placeholder)", department: "Department C", level: "Junior specialist", reportsTo: "Plant manager" },
    devices: [{ type: "kiosk", use: "Placeholder: onboarding terminal" }, { type: "mobile", use: "Placeholder: checks schedules" }, { type: "desktop", use: "Placeholder: training modules" }],
    journey: {
      emotion: [3, 4, 3, 2, 3, 4],
      actions: [["Receives welcome pack"], ["Completes onboarding"], ["Learns the tool with a buddy"], ["Gets stuck on a task"], ["Asks a colleague"], ["Feels part of the team"]],
      touchpoints: [["Touchpoint 2"], ["Touchpoint 5"], ["Touchpoint 1", "Touchpoint 4"], ["Touchpoint 6"], ["Touchpoint 3"], ["Touchpoint 8"]],
      pains: [["Information overload"], ["Many systems to join"], [], ["Do not know who to ask"], ["Feels like a bother"], []],
      opps: [["Short welcome checklist"], ["Single sign-up"], ["Buddy or guide"], ["Visible help route"], ["Open-door message"], ["Check-in after 90 days"]],
    },
  },
  {
    id: "remote-worker", initials: "R", name: "Remote worker (placeholder)", role: "Works away from the office", status: "Emerging",
    quote: "“Placeholder: I only hear about things when someone remembers to tell me.”",
    goals: ["Placeholder goal one", "Placeholder goal two", "Placeholder goal three"],
    frustrations: ["Placeholder frustration one", "Placeholder frustration two"],
    channels: ["Channel one", "Channel four"],
    facts: ["Age or tenure: placeholder", "Location or site: placeholder", "Device: placeholder", "Language: placeholder"],
    org: { city: "Lisbon", country: "PT", lat: 38.72, lng: -9.14, site: "Home office (placeholder)", department: "Department F", level: "Senior specialist", reportsTo: "Team lead" },
    devices: [{ type: "desktop", use: "Placeholder: main work setup" }, { type: "mobile", use: "Placeholder: notifications and approvals" }],
    journey: {
      emotion: [3, 3, 4, 2, 3, 4],
      actions: [["Finds out later than office staff"], ["Sets up remote access"], ["Works independently"], ["Connection or access issue"], ["Contacts support remotely"], ["Adapts own routine"]],
      touchpoints: [["Touchpoint 2"], ["Touchpoint 5"], ["Touchpoint 1"], ["Touchpoint 6"], ["Touchpoint 3", "Touchpoint 7"], ["Touchpoint 8"]],
      pains: [["Heard late"], ["Access setup is slow"], [], ["Hard to reach a person"], ["Time zone gaps"], ["Feels out of the loop"]],
      opps: [["Reach them where they are"], ["Remote-first setup guide"], ["Async updates"], ["Chat support"], ["Follow-the-sun help"], ["Regular remote check-ins"]],
    },
  },
];
/* ========================================================= */

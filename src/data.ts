/* ============ DATA: replace with real content ============ */
export type Status = "Assumption" | "Emerging" | "Confirmed";

export interface Journey {
  emotion: number[];
  actions: string[][];
  touchpoints: string[][];
  pains: string[][];
  opps: string[][];
}

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

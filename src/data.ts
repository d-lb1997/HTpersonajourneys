/* Persona content, generated from "User Personas – Revised Global Intranet (HellermannTyton)".
   Statements carry source tags such as [S3, slide 8]; nothing here is added from outside those sources. */
export type Rating = "Strong" | "Moderate" | "Thin";
export type DeviceType = "mobile" | "desktop" | "kiosk";
export interface DeviceUse { type: DeviceType; use: string }

export interface Block { title: string; note: string; items: string[]; paras: string[] }
export interface Moscow { note: string; must: string[]; should: string[]; could: string[]; wont: string[] }

export interface Persona {
  id: string;
  initials: string;
  /** Short label for badges and navigation. */
  short: string;
  title: string;
  /** Participant group the persona maps to. */
  segment: string;
  intro: string[];
  rating: Rating;
  /** Full evidence statement. */
  evidence: string;
  blocks: Block[];
  quotes: string[];
  quoteNote: string;
  success: string;
  interpretation: string;
  moscow: Moscow | null;
  /** Only where a source names the device. */
  devices?: DeviceUse[];
}

export type DocBlock =
  | { t: "p"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] };
export interface DocSection { title: string; blocks: DocBlock[] }

export const PERSONAS: Persona[] = [
  {
    "id": "product-searcher",
    "initials": "P",
    "short": "Product searcher",
    "title": "Product & Technical Information Searcher",
    "segment": "Current user",
    "intro": [
      "This persona uses today's intranet mainly as a product database, and the product data is the one part they find valuable. The segment is the \"current user\": employees who regularly use the existing intranet for daily tasks [S2, slide 3]. The sources do not state a job title for this group. They mention product managers, sales content, marketing updates and back-office support teams in the same answers [S7]."
    ],
    "rating": "Strong",
    "evidence": "Strong on what they do and want; Moderate on who exactly they are, because [S7] is not tagged by participant group.",
    "blocks": [
      {
        "title": "What they do today",
        "note": "",
        "items": [
          "Search product details (specifications, country of origin, packaging), research technical data, find standard and alternative products, compare products and find substitutes [S7, \"most often\"].",
          "Access certificates and approvals, download images, drawings and documents, and use the image server and customer download portal [S7, \"most often\"].",
          "Start with the search bar, the most commonly mentioned first action, then product codes, names, specifications and new product launches [S7, \"first thing you look for\"].",
          "Search by article number, product name or UNS number [S7, \"how do you usually find information\"].",
          "Work across STEP, SAP, CRM and eQMS, and want Windchill (CAD and engineering data) integrated [S7, \"essential for your role\" and \"systems you wish were integrated\"].",
          "Fall back on asking colleagues, product managers or back-office teams when the intranet does not answer [S7, \"how do you usually find information\"]."
        ],
        "paras": []
      },
      {
        "title": "Goals",
        "note": "",
        "items": [
          "Find accurate, complete product data quickly. \"Time-consuming to find accurate information\" is a listed frustration [S7, \"frustrates you\"].",
          "Serve customers with quick access to inventory status and lead times [S6, slide 4].",
          "Have all product information in one place, reducing reliance on email [S6, slide 4]."
        ],
        "paras": []
      },
      {
        "title": "Pain points",
        "note": "",
        "items": [
          "The search engine is unintuitive and lacks wildcard, exclusion and filtering. Results include duplicates, irrelevant items and outdated or misleading entries [S7, \"frustrates you\"].",
          "Product information is missing or incomplete (technical sheets, packaging), and no CAD files or complete certificates are available [S7, \"frustrates you\"].",
          "Product comparison tools do not work, and long lists of alternatives need manual SAP checks [S7, \"frustrates you\"].",
          "Poor keyword tagging makes image and content searches unreliable [S7, \"How easy is it to find what you need?\"].",
          "One positive: product information is relatively easy to find via article numbers or UNS [S7, \"How easy is it to find what you need?\"]."
        ],
        "paras": []
      },
      {
        "title": "What they wish they could do",
        "note": "",
        "items": [
          "Use AI-powered search with smart suggestions, filter by uploader, attachments, article availability and warehouse location, and search several articles at once [S7, \"wish you could do\"].",
          "See key product attributes in search results, and find similar products, product groups and alternatives [S7, \"wish you could do\"].",
          "View stock by country or location, download 3D models and customer drawings, and see complete datasheets including logistics and packaging [S7, \"wish you could do\"].",
          "Compare several parts, see which parts are locked or not for general sale, and export solutions by market including approvals [S7, \"wish you could do\"].",
          "Reach commercial contacts, not just product managers [S7, \"wish you could do\"].",
          "Standardise parts to support logistics calculations and international communication, with a clearer category structure and attached certifications and material data sheets [S6, slide 4]."
        ],
        "paras": []
      }
    ],
    "quotes": [
      "\"To view technical product information and see what's new in contributions.\" [S3, slide 7, truncated in source]",
      "\"excep for the product database, i can't find other information very useful\" [S3, slide 8]",
      "\"View the following information for each HellermannTyton: product stock by location. Provide commercial contact information, not just product manager\" [S3, slide 9]"
    ],
    "quoteNote": "(verbatim workshop responses, not attributed to a participant group)",
    "success": "finding what they need within a few clicks, with fast and intelligent search [S7, \"What would success look like\"].",
    "interpretation": "the single most cited use of the current intranet is covered by a Should Have feature, while the search that supports it is a Must Have. Worth confirming whether product data stays in scope for the first release.",
    "moscow": {
      "note": "[S4]",
      "must": [
        "Advanced Search & Filtering, including filters by article availability and warehouse location."
      ],
      "should": [
        "Product & Inventory Information (stock by country or location, 3D models, customer drawings)."
      ],
      "could": [
        "Enhanced Search Capabilities for content, product data and assets."
      ],
      "wont": []
    }
  },
  {
    "id": "dept-rep",
    "initials": "D",
    "short": "Department rep",
    "title": "Department Representative",
    "segment": "Department representative",
    "intro": [
      "This persona needs one place to run their department's documents, news and collaboration, and today's intranet does not give them that. The segment is \"Department Representatives\": individuals from departments such as HR, IT, Marketing and Operations who can speak to their department's needs [S2, slide 3]. [S6, slide 4] adds Finance and Sales as groups that want dedicated spaces or chat."
    ],
    "rating": "Moderate",
    "evidence": "Moderate. The needs are well documented in [S7] and [S6], but [S7] is not tagged by group, so they are assigned by topic.",
    "blocks": [
      {
        "title": "What they do today",
        "note": "",
        "items": [
          "Work in Microsoft 365 (Outlook, Teams, SharePoint, OneDrive, OneNote, Copilot), Monday.com, Dayforce (HRIS, LMS, performance management), eQMS, SAP, STEP, CRM and ServiceNow [S7, \"tools or content are essential for your role\"].",
          "Rely on documents such as policies, procedures, template letters, SOPs, risk assessments and single point lessons [S7, same question].",
          "Share updates through Teams, email, Monday.com, SharePoint and OneDrive, plus team briefs, morning meetings and local newsletters [S7, \"share updates or collaborate\"].",
          "Use the intranet mainly for general information, not team-specific updates [S7, \"share updates or collaborate\"]."
        ],
        "paras": []
      },
      {
        "title": "Goals",
        "note": "",
        "items": [
          "Hold all department content (policies, resources, updates) in a dedicated department area [S6, slide 4].",
          "Find one clear landing page with a consistent structure across departments [S7, \"more useful for your department\"].",
          "Collaborate across functions, for example between sales, marketing and product teams, with centralised project tracking, handovers, shared decision logs and market-specific playbooks [S7, \"business processes that could be improved\"].",
          "Keep their own content current. Respondents most often named the owning department, subject-matter experts or functional owners, with a central intranet or communications team for governance [S7, \"who should be responsible\"]."
        ],
        "paras": []
      },
      {
        "title": "Pain points",
        "note": "",
        "items": [
          "Collaboration in Teams is inconsistent, varies by individual, and there is no standard approach across departments [S7, \"share updates or collaborate\"].",
          "Too many platforms (email, drives, Teams, intranet) create confusion, and information is scattered across them [S7, \"frustrates you\" and \"How easy is it to find what you need?\"].",
          "There is no department-specific news [S7, \"frustrates you\"].",
          "Outdated contributions remain visible and nobody maintains or deletes old content [S7, \"frustrates you\"].",
          "Important announcements go out by email, which reduces the intranet's relevance [S7, \"frustrates you\"]."
        ],
        "paras": []
      },
      {
        "title": "What they wish they could do",
        "note": "",
        "items": [
          "Centralise SOPs, risk assessments, single point lessons and department-specific documents, with file collaboration and version control [S7, \"more useful for your department\"].",
          "Offer a knowledge base with FAQs and video tutorials, and a best-practices page [S7, \"more useful for your department\"].",
          "Use chat similar to Salesforce Chatter, particularly across Sales and Marketing [S6, slide 4].",
          "Get a dedicated project area for visibility across business units, integrated with Teams [S7, \"support your team's productivity\"].",
          "Sign in once for all platforms, with integration to HRIS, LMS and other business tools [S7, \"more useful for your department\"]."
        ],
        "paras": []
      }
    ],
    "quotes": [
      "\"to have a unique space for dept collaboration (now split in hundreds of different ms team groups/chat)\" [S3, slide 9, truncated in source]",
      "\"Easy access for all employees and holding all the needed information for each department.\" [S3, slide 10]"
    ],
    "quoteNote": "(verbatim workshop responses, not attributed to a participant group)",
    "success": "all departments know where to find key information, and policies, procedures, templates, FAQs and HR documents sit in one central repository [S7, \"What would success look like\"].",
    "interpretation": "the unified department space is a Must Have, yet collaboration features that overlap with Teams are a Won't Have. The HR Lead raises the same doubt: \"maybe the Teams environment handles this better\" [S1, \"Teams/Project work\"]. The boundary between intranet and Teams needs a decision before this persona's needs can be scoped.",
    "moscow": {
      "note": "[S4]",
      "must": [
        "Navigation & Structure (unified space for department collaboration and project overview), Content Quality & Relevance, social intranet features (communities, chat, working out loud), Knowledge Sharing hub."
      ],
      "should": [
        "Tools & Resources (templates, branding materials, document management tools)."
      ],
      "could": [
        "Knowledge Management base with version control, Teams/Project Work, Advanced Collaboration Tools."
      ],
      "wont": [
        "features that duplicate existing tools, with project collaboration already handled by Teams as the example."
      ]
    }
  },
  {
    "id": "frontline",
    "initials": "F",
    "short": "Frontline employee",
    "title": "Frontline / Non-Desk Employee",
    "segment": "Non-user",
    "intro": [
      "This is the largest group the current intranet fails to reach: over 2,000 frontline employees who are non-email users [S2, slide 2]. The project defines \"Non-Users\" as employees without direct access to the intranet or a dedicated PC, naming production and manufacturing [S2, slide 3]. Almost everything the sources say about this group describes the access gap and what is missing. There are no direct quotes from them."
    ],
    "rating": "Thin",
    "evidence": "Thin on their own needs; Strong on the size and nature of the access gap.",
    "blocks": [
      {
        "title": "Why they do not use the intranet today",
        "note": "",
        "items": [
          "Many employees are not aware it exists, do not know how to access it, or lack the right permissions [S6, slide 4].",
          "Some users have no login credentials or accounts [S7, \"How easy is it to find what you need?\"].",
          "It is not mobile-friendly [S7, \"frustrates you\"].",
          "Important announcements are sent by email, which this group does not use [S7, \"frustrates you\"; S2, slide 2]."
        ],
        "paras": []
      },
      {
        "title": "How they are reached today",
        "note": "",
        "items": [
          "Internal display systems for production staff without email [S7, \"share updates or collaborate\"].",
          "Team briefs and morning meetings appear among the ways people stay informed. The source does not say which group uses them [S7, \"stay informed\"]."
        ],
        "paras": []
      },
      {
        "title": "What the research asks for",
        "note": "",
        "items": [
          "Mobile access and kiosks for employees without regular computer use [S6, slide 4].",
          "Access for all employees, including production and logistics staff who may not currently have it [S7, \"anything else\"].",
          "The ability to reach all employees, including blue-collar workers [S7, \"more useful for your department\"].",
          "An intranet available to all employees on their mobile phones, \"so that it is truly accessible to all\" [S1, \"Mobile friendly\"].",
          "Global messages in multiple languages [S1, \"Consistent Multi-lingual communication\"]."
        ],
        "paras": []
      },
      {
        "title": "Signals that may relate to this group (assignment is an inference)",
        "note": "",
        "items": [
          "Real-time company and shift performance data, and dashboards with metrics such as OEE and bonus trackers [S7, \"success\" and \"support your team's productivity\"].",
          "Alerts for site closures, IT issues and key updates, and one-click HR and IT services such as sick notes and vacation requests [S7, \"redesign the homepage\"].",
          "Local site information on benefits, events and wellbeing initiatives [S7, \"wish you could do\"]."
        ],
        "paras": [
          "The sources do not say who gave these answers, so treat them as candidates to test, not findings."
        ]
      },
      {
        "title": "What the concept designs show (not research findings)",
        "note": "",
        "items": [],
        "paras": [
          "The production-perspective mock-ups in [S4] show a desktop, a phone and a rugged tablet with tiles for downtime alerts, safety alerts, HSE info, report an incident, equipment status, work instructions, scan QR code, request leave and maintenance ticket. These are illustrative designs, not evidence that employees asked for these items."
        ]
      },
      {
        "title": "Where this lands in the options and MoSCoW",
        "note": "[S2, slides 4–5; S4]",
        "items": [
          "Option B, the recommended starting point, is Microsoft 365, AI and mobile-first. Option C (Physical & Digital Solutions) is described as the add-on for the non-desk workforce, and B enables phased growth toward C or D.",
          "Must have: Language & Accessibility (fully mobile-optimised) and Local & Global Communication [S4]."
        ],
        "paras": []
      }
    ],
    "quotes": [],
    "quoteNote": "",
    "success": "",
    "interpretation": "the persona with the largest identified access gap is served only by a mobile-first foundation in the first phase, with Option C as a later add-on. The sources do not say whether frontline employees have company devices or would use personal phones.",
    "moscow": null,
    "devices": [
      {
        "type": "mobile",
        "use": "Mobile access for employees without regular computer use [S6, slide 4]"
      },
      {
        "type": "kiosk",
        "use": "Kiosks for employees without regular computer use [S6, slide 4]"
      }
    ]
  },
  {
    "id": "new-joiner",
    "initials": "N",
    "short": "New joiner",
    "title": "New Joiner",
    "segment": "New employee",
    "intro": [
      "This persona needs the intranet to explain itself and the company from day one, and today it offers no onboarding path. The segment is \"New Employees\": recent hires who can highlight onboarding challenges [S2, slide 3]. Their needs are inferred from onboarding mentions across the questionnaire and the HR Lead's stories, because no source reports new joiners' own words."
    ],
    "rating": "Thin",
    "evidence": "Thin. The group was recruited into the workshops [S3, slide 2], but [S7] does not tag answers by group.",
    "blocks": [
      {
        "title": "What the sources say about onboarding",
        "note": "",
        "items": [
          "There is no onboarding or \"how-to\" guide for new users [S7, \"frustrates you\"].",
          "Respondents want how-to guides and onboarding support, short videos or tutorials on navigating the intranet, and guidance videos on the homepage [S7, \"wish you could do\", \"anything else\" and \"redesign the homepage\"].",
          "Onboarding resources and onboarding and compliance training appear among content to prioritise and processes to improve [S7, \"types of content\" and \"business processes\"].",
          "Success includes supporting onboarding and training for new hires [S7, \"What would success look like\"].",
          "Respondents want clear guidance on how to use the intranet and where to find things [S7, \"encourage you to visit the intranet more regularly\"]."
        ],
        "paras": []
      },
      {
        "title": "What the organisation plans for them",
        "note": "",
        "items": [
          "New employee announcements as part of the onboarding process, published on the intranet with a photo \"so that they can be welcomed by others when seen at site\" [S1, \"Global / Loc NEW employee announcements\"].",
          "HR and onboarding information \"to help colleagues feel confident from day one\" [S5, FAQ 7].",
          "Central HR policies they can search and see localised to them [S1, \"HR Policies\"], and a training repository showing what is available and how to request or book it [S1, \"Training repository\"]."
        ],
        "paras": []
      },
      {
        "title": "Needs likely to matter to them (assigned by topic, not by who said it)",
        "note": "",
        "items": [
          "A directory with photo, job title, location and line manager, so colleagues are identifiable and contactable [S1, \"Employee directory\"].",
          "Today's users check profile pictures before meetings and look up who does what and where they are located [S7, \"most often\"]. A new joiner would plausibly rely on the same feature, but the source does not say so.",
          "Awareness that the intranet exists and how to reach it, which many employees currently lack [S6, slide 4]."
        ],
        "paras": []
      }
    ],
    "quotes": [],
    "quoteNote": "",
    "success": "",
    "interpretation": "the welcome announcement the HR Lead describes depends on a photo, as does the directory, so photo capture at onboarding serves both. Respondents asked for a how-to guide for new users [S7], but no feature in the MoSCoW lists in [S4] covers it.",
    "moscow": {
      "note": "[S4]",
      "must": [
        "Employee Directory (photo, job title, location, line manager), HR Policies & Self Service, Knowledge Sharing & Training hub."
      ],
      "should": [
        "Employee Announcements (global and local onboarding announcements with photos)."
      ],
      "could": [
        "Online Training & Development."
      ],
      "wont": [
        "interactive org charts with contact details."
      ]
    }
  },
  {
    "id": "remote-hybrid",
    "initials": "R",
    "short": "Remote / hybrid",
    "title": "Remote / Hybrid Worker",
    "segment": "Remote worker",
    "intro": [
      "This persona depends on digital channels for communication and collaboration, so device access and Microsoft 365 integration matter most. The segment is \"Remote Workers\": staff who work remotely and rely heavily on means of communication and collaboration [S2, slide 3]. The sources give this group the least dedicated evidence of the six, so most of the profile is assigned by topic."
    ],
    "rating": "Thin",
    "evidence": "Thin. One success statement names remote and hybrid workers directly [S7]; the rest is inferred from mobile, collaboration and integration answers.",
    "blocks": [
      {
        "title": "What the sources say directly",
        "note": "",
        "items": [
          "Success means the intranet is accessible on all devices, \"especially for remote and hybrid workers\" [S7, \"What would success look like\"].",
          "Remote workers were deliberately included in the workshops [S3, slide 2; S6, slide 3]."
        ],
        "paras": []
      },
      {
        "title": "Needs likely to matter to them (assigned by topic, not by who said it)",
        "note": "",
        "items": [
          "A mobile-optimised experience or dedicated app, and push notifications for updates, birthdays and events [S7, \"wish you could do\"]. The HR Lead also wants the intranet on mobile phones for all employees [S1, \"Mobile friendly\"].",
          "Integration with Microsoft Teams and other daily tools [S7, \"encourage you to visit the intranet more regularly\"; S5, FAQ 5].",
          "Social intranet features such as communities, chat and working out loud [S7, \"wish you could do\"].",
          "Better cross-regional collaboration and information sharing [S7, \"support your team's productivity\"].",
          "Self-service for HR requests and IT tickets, and single sign-on to avoid multiple log-ins [S7, \"encourage you to visit the intranet more regularly\"; S6, slide 4].",
          "Knowing which colleagues are online, which some respondents look for first on opening the intranet [S7, \"first thing you look for\"]."
        ],
        "paras": []
      },
      {
        "title": "Pain points that apply to anyone working away from the office",
        "note": "",
        "items": [
          "The intranet is not mobile-friendly [S7, \"frustrates you\"].",
          "Information is scattered across Teams, SharePoint, drives and the intranet [S7, \"How easy is it to find what you need?\"].",
          "Today's collaboration in Teams is inconsistent and varies by individual [S7, \"share updates or collaborate\"]."
        ],
        "paras": []
      }
    ],
    "quotes": [],
    "quoteNote": "",
    "success": "",
    "interpretation": "respondents already name Teams for chat, calls and meetings [S7, \"share updates or collaborate\"], so the intranet's role for this persona is more likely to be a mobile entry point and a pointer into Teams than a replacement for it. Validate this with remote workers directly.",
    "moscow": {
      "note": "[S4]",
      "must": [
        "Language & Accessibility (fully mobile-optimised), social intranet features, Smart Notifications (users can opt in or out), HR Policies & Self Service (leave booking, holiday balances)."
      ],
      "should": [],
      "could": [
        "Advanced Collaboration Tools (chat, video conferencing and document sharing across time zones), Teams/Project Work."
      ],
      "wont": [
        "features that duplicate existing tools such as Teams."
      ]
    },
    "devices": [
      {
        "type": "mobile",
        "use": "Mobile-optimised experience or dedicated app, with push notifications [S7, \"wish you could do\"]"
      }
    ]
  },
  {
    "id": "site-communicator",
    "initials": "S",
    "short": "Site communicator",
    "title": "Local Site Communicator / HR Lead",
    "segment": "Publisher (HR Lead)",
    "intro": [
      "This persona publishes to the intranet and needs to reach exactly the right audience, locally and globally, without overloading anyone. The evidence is a single detailed source: 19 user stories written by one HR Lead [S1], reproduced as \"HR Insights\" in [S4]. Content ownership is a recurring theme elsewhere [S3, slides 4 and 11; S5, FAQ 3 and 10], but those sources do not describe the publisher's day-to-day work."
    ],
    "rating": "Moderate",
    "evidence": "Moderate. Detailed and consistent, but it is one stakeholder's view.",
    "blocks": [
      {
        "title": "Context: why communication matters to this role",
        "note": "",
        "items": [
          "Employees told HR they want better communication and more clarity. The reality today is a decentralised organisation that is strong locally and harder to connect globally [S4, \"Communication + The Intranet\"].",
          "In the 2025 Global Employee Survey, \"Communication / management communication\" drew 418 responses and \"Interdepartmental / Global Communication\" 257, within a top ten led by pay and benefits (753) [S4, 2025 survey slide].",
          "The business case lists communication silos, inconsistent messaging and a lack of analytics as problems [S2, slide 2]."
        ],
        "paras": []
      },
      {
        "title": "Goals: reach",
        "note": "",
        "items": [
          "Give everyone the same landing page each morning, so important information reaches all employees in the same way at the same time [S1, \"Global Communication\"].",
          "Push local leadership communication automatically to the relevant business units, and let a business unit push it out to global or regional sites [S1, \"Local Communication\"].",
          "Publish global messages in multiple languages [S1, \"Consistent Multi-lingual communication\"].",
          "Consider the audience whenever loading items, and let individuals switch notifications on or off [S1, \"Smart notifications\"]."
        ],
        "paras": []
      },
      {
        "title": "Goals: welcome and recognise",
        "note": "",
        "items": [
          "Announce new employees with a photo as part of onboarding [S1, \"Global / Loc NEW employee announcements\"].",
          "Communicate promotions, with an option to filter the audience, and recognise employees including long service [S1, \"Promotions & Employee Recognition\"].",
          "Let every site communicate wellbeing and focus-day activities such as International Women's Day, and promote corporate culture periodically [S1, \"Group focus activities (wellbeing)\" and \"Corporate culture\"]."
        ],
        "paras": []
      },
      {
        "title": "Goals: run HR processes",
        "note": "",
        "items": [
          "Run local and global employee surveys through the intranet and share the results [S1, \"Employee Surveys\"].",
          "Advertise open roles, filterable by business unit, country, region or global [S1, \"Recruitment\"].",
          "House HR policies centrally with local adaptations for local employment laws, and update them with everyone informed in a timely way [S1, \"HR Policies\"].",
          "Make the intranet the gateway to self-service such as annual leave booking and holiday balances [S1, \"Employee self service\"]."
        ],
        "paras": []
      },
      {
        "title": "Pain points",
        "note": "",
        "items": [
          "Announcements go out by email, there is no global digital newsletter, and nobody maintains or deletes old content [S7, \"frustrates you\"].",
          "HR and people-related content is lacking [S7, \"frustrates you\"].",
          "Ownership and content governance are unclear [S5, FAQ 3].",
          "Views on who should keep content current and how often to review it vary widely, from daily to quarterly or as needed [S7, \"Content & Governance\" questions]."
        ],
        "paras": []
      },
      {
        "title": "Needs for knowing it works",
        "note": "",
        "items": [
          "Respondents suggest measuring visits, active users, top search terms and failed searches, plus follow-up surveys and engagement on posts [S7, \"How should we measure\"]."
        ],
        "paras": []
      }
    ],
    "quotes": [
      "\"So that people are not bombarded with information that doesn't concern them which can lead to intranet fatigue.\" [S1, \"Smart notifications\"]"
    ],
    "quoteNote": "(HR Lead user story)",
    "success": "",
    "interpretation": "most of the HR Lead's stories for welcoming, recognising and surveying land at Should Have, so a first release would deliver reach and policies but not these engagement features. The need to see whether communication works (analytics) sits at Won't Have.",
    "moscow": {
      "note": "[S4]",
      "must": [
        "Local & Global Communication (automatic push with escalation, multi-language), Smart Notifications, HR Policies & Self Service, Employee Directory, Knowledge Sharing & Training."
      ],
      "should": [
        "Employee Announcements, Surveys, Promotions & Recognition, Recruitment, Wellbeing & Focus Activities, Leadership Forum."
      ],
      "could": [
        "Global digital newsletter, department news and culture campaigns."
      ],
      "wont": [
        "complex integrations such as advanced analytics, which \"are not immediately needed\"."
      ]
    }
  }
];

export const DOC: DocSection[] = [
  {
    "title": "About this document",
    "blocks": [
      {
        "t": "p",
        "text": "These six personas come only from the seven discovery documents you uploaded, and every statement carries a source tag such as [S3, slide 8]. Nothing was added from outside them: no names, ages, photos or invented quotes. The only quotes used are verbatim workshop responses from [S3]."
      },
      {
        "t": "h3",
        "text": "How the personas were built"
      },
      {
        "t": "ol",
        "items": [
          "The starting point is the five participant groups the project deliberately recruited: current users, non-users, department representatives, new employees and remote workers [S2, slide 3; S3, slide 2].",
          "A sixth persona, the Local Site Communicator / HR Lead, was added because [S1] is written entirely from the publisher's viewpoint.",
          "The current-user group was given its own persona around product information, because that is the most frequently reported use of today's intranet [S7, \"What do you use the current intranet for most often?\"; S3, slide 7]."
        ]
      },
      {
        "t": "p",
        "text": "**Main limitation.** The questionnaire output [S7] and the workshop word clouds [S3] are not tagged by participant group. Needs are therefore assigned to a persona by what the need is about, not by who said it. Each persona shows an evidence rating so you can see where this is a strong or a thin match. The workshops involved 48 employees across two sessions, and 39 survey responses were collected before and after them [S6, slide 3]."
      },
      {
        "t": "h3",
        "text": "Evidence rating used on each persona"
      },
      {
        "t": "table",
        "head": [
          "Rating",
          "Meaning"
        ],
        "rows": [
          [
            "Strong",
            "Many independent mentions across several sources, directly about this group's work"
          ],
          [
            "Moderate",
            "Clear mentions, but assigned to the persona by topic, or from one or two sources"
          ],
          [
            "Thin",
            "Group is defined in the sources, but little direct evidence about their needs exists"
          ]
        ]
      },
      {
        "t": "h3",
        "text": "Source key"
      },
      {
        "t": "table",
        "head": [
          "ID",
          "Document",
          "Date shown",
          "Content"
        ],
        "rows": [
          [
            "S1",
            "HR_Requirements_Revised_Intranet",
            "not dated",
            "19 user stories from the HR Lead (\"As HR Lead I want to … so that …\")"
          ],
          [
            "S2",
            "Intranet_Revision_-_Summary_Business_Case_MS_Version",
            "27 Nov 2025",
            "Business case deck: problem, approach, options A–D, recommendation, discovery phase"
          ],
          [
            "S3",
            "Revised_Intranet_-_Workshops",
            "21 Jul 2025",
            "Workshop deck: participant groups, vision, focus areas, word clouds with sample responses, pre-workshop questions"
          ],
          [
            "S4",
            "Tammy_Onboarding_Comms",
            "Nov 2026",
            "Survey results 2023 and 2025, intranet mock-ups, HR insights, MoSCoW feature lists"
          ],
          [
            "S5",
            "PR_FAQ_-_New_Global_Intranet",
            "4 Apr 2025 (per file name)",
            "Internal press release and FAQ for the new intranet"
          ],
          [
            "S6",
            "Revised_Intranet_-_Summary",
            "27 Aug 2025",
            "Summary of workshops and survey: what was heard, key insights, next steps"
          ],
          [
            "S7",
            "Intranet_Questionnaire_Output_-_Raw_Summarised",
            "not dated",
            "Summarised questionnaire answers, grouped by question"
          ]
        ]
      }
    ]
  },
  {
    "title": "Executive summary",
    "blocks": [
      {
        "t": "p",
        "text": "The discovery material supports six personas, but the evidence is strongest for the people who already use the intranet or publish to it and weakest for the groups the project most wants to reach. Search, mobile access and local-language content matter to every persona. Two decisions will shape how well the personas are served: where the intranet ends and Teams begins, and how the non-desk workforce is reached."
      },
      {
        "t": "ul",
        "items": [
          "**The most-cited current use is a Should Have.** Product information is the top reported use of today's intranet [S7; S3, slide 7], yet Product & Inventory Information is a Should Have [S4].",
          "**The largest access gap is served later.** Over 2,000 frontline employees are not reached [S2, slide 2], and the add-on for non-desk staff is Option C, with Option B as the starting point [S2, slides 4–5].",
          "**The Teams boundary is undecided.** A unified department space is a Must Have, but duplicating Teams is a Won't Have [S4].",
          "**The data cannot yet be cut by persona.** The questionnaire output is not tagged by participant group [S7], so Personas 2, 4 and 5 should be validated before they drive design decisions."
        ]
      }
    ]
  },
  {
    "title": "Personas at a glance",
    "blocks": [
      {
        "t": "p",
        "text": "Five personas map to the project's recruited participant groups and one covers the publisher role; evidence is strongest for Personas 1, 2 and 6 and thinnest for 3, 4 and 5."
      },
      {
        "t": "table",
        "head": [
          "#",
          "Persona",
          "Segment",
          "Main need",
          "Evidence",
          "Biggest open point"
        ],
        "rows": [
          [
            "1",
            "Product & Technical Information Searcher",
            "Current user [S2, slide 3]",
            "Fast, complete product data and search that works",
            "Strong (Moderate on group)",
            "Product & Inventory Information is only a Should Have [S4]"
          ],
          [
            "2",
            "Department Representative",
            "Department representative [S2, slide 3]",
            "One department space for documents, news and collaboration",
            "Moderate",
            "Overlap with Teams, a Won't Have [S4]"
          ],
          [
            "3",
            "Frontline / Non-Desk Employee",
            "Non-user [S2, slide 3]",
            "Being reached at all, without a PC or email",
            "Thin (Strong on gap size)",
            "Served by add-on Option C, not the starting scope [S2, slide 4]"
          ],
          [
            "4",
            "New Joiner",
            "New employee [S2, slide 3]",
            "An onboarding guide, a welcome and a findable directory",
            "Thin",
            "An onboarding or how-to guide is in no MoSCoW list [S4]"
          ],
          [
            "5",
            "Remote / Hybrid Worker",
            "Remote worker [S2, slide 3]",
            "Any-device access and Teams integration",
            "Thin",
            "Little group-specific evidence"
          ],
          [
            "6",
            "Local Site Communicator / HR Lead",
            "Publisher (HR Lead) [S1]",
            "Targeted reach, recognition and HR processes",
            "Moderate",
            "One stakeholder's view; analytics is a Won't Have [S4]"
          ]
        ]
      }
    ]
  },
  {
    "title": "Needs shared across personas",
    "blocks": [
      {
        "t": "p",
        "text": "Search, mobile access and language show up across all six personas, so they work better as platform-wide requirements than as features for any one persona. The personas column below is assigned by topic (P1 to P6 as numbered above)."
      },
      {
        "t": "table",
        "head": [
          "Need",
          "What the sources say",
          "Sources",
          "Personas it touches"
        ],
        "rows": [
          [
            "Search that works",
            "Search is the most common first action, and the most common frustration: no wildcard or filtering, duplicates, outdated results. Advanced Search & Filtering is a Must Have.",
            "[S7, \"first thing you look for\" and \"frustrates you\"]; [S3, slides 8–9]; [S6, slide 4]; [S4, Must Have]",
            "All"
          ],
          [
            "Mobile access",
            "The current intranet is not mobile-friendly; mobile access is requested by the HR Lead, the workshops and the questionnaire, and Option B is mobile-first.",
            "[S1, \"Mobile friendly\"]; [S2, slides 2 and 5]; [S7, \"frustrates you\"]; [S4, Must Have]",
            "P3, P5, P6"
          ],
          [
            "Local-language content",
            "Content is available only in English or German, there is no automatic translation, and smaller countries such as Belgium and the Netherlands have limited access. Respondents want automatic translation into local languages.",
            "[S7, \"frustrates you\" and \"wish you could do\"]; [S1, \"Consistent Multi-lingual communication\"]; [S4, Must Have]",
            "All, especially P3 and P6"
          ],
          [
            "Single sign-on and integration",
            "Respondents want one sign-on and integration with Teams, SharePoint, HRIS and LMS. The business case calls current access management outdated and insecure.",
            "[S6, slide 4]; [S7, \"systems you wish were integrated\"]; [S2, slide 2]; [S5, FAQ 5–6]",
            "P2, P5"
          ],
          [
            "Fresh, validated content",
            "Outdated content stays visible and nobody maintains it. Keeping content fresh, relevant and easy to find is a key insight.",
            "[S7, \"frustrates you\"]; [S6, slide 5]; [S4, Must Have]",
            "P1, P2, P6"
          ],
          [
            "Relevance without overload",
            "The HR Lead wants audience targeting and opt-in notifications to avoid intranet fatigue. Respondents want content tailored by location or role and a customisable landing page.",
            "[S1, \"Smart notifications\"]; [S7, \"wish you could do\" and \"redesign the homepage\"]; [S6, slide 4]",
            "All"
          ],
          [
            "Finding people",
            "A directory with photo, title, location and line manager is a Must Have. An interactive org chart is wished for but is a Won't Have.",
            "[S1, \"Employee directory\"]; [S7, \"wish you could do\"]; [S4, Must and Won't Have]",
            "P4, P5"
          ],
          [
            "Commenting and discussion",
            "Collaboration and communication tools are the most frequently requested improvement, but willingness to use commenting is conditional on the intranet having useful business features.",
            "[S6, slide 5]; [S7, \"Would you use features like commenting\"]",
            "P2, P5"
          ]
        ]
      }
    ]
  },
  {
    "title": "Tensions and conflicts in the source material",
    "blocks": [
      {
        "t": "p",
        "text": "The sources disagree with each other in six places that affect how personas are served, and each needs a decision, not more research."
      },
      {
        "t": "table",
        "head": [
          "Tension",
          "One side",
          "Other side",
          "Personas affected"
        ],
        "rows": [
          [
            "One landing page vs personal views",
            "Everyone should see the same landing page on every computer [S1, \"Global Communication\"; S4, Must Have]",
            "Respondents want tailored feeds and a customisable landing page [S6, slide 4; S7, \"redesign the homepage\"]; profile adaptability is a Should Have while highly customised dashboards are a Won't Have [S4]; the HR Lead also asks for personal dashboards [S1, \"Profile adaptability\"]",
            "P3, P5, P6"
          ],
          [
            "Push notifications vs intranet fatigue",
            "Push notifications for updates, birthdays and events are wished for [S7, \"wish you could do\"]",
            "The HR Lead warns about intranet fatigue [S1, \"Smart notifications\"]; opt-in or opt-out is a Must Have but notifications by topic or contributor are a Won't Have [S4]",
            "P5, P6"
          ],
          [
            "Department space vs Teams",
            "A unified department and project space is a Must Have [S4]",
            "Features duplicating Teams are a Won't Have [S4]; the HR Lead is unsure whether Teams handles project work better [S1, \"Teams/Project work\"]",
            "P2, P5"
          ],
          [
            "Interactive org chart",
            "Respondents wish for an interactive org chart and org charts with role visibility [S7, \"wish you could do\" and \"redesign the homepage\"]",
            "It is a Won't Have [S4]; the deck guesses at complexity or redundancy as the reason, not a documented decision [S4, \"Cross-Over & Overlaps\"]",
            "P4, P5"
          ],
          [
            "Leave booking priority",
            "Self-service leave booking and balances are a Must Have [S4, \"HR Policies & Self Service\"]",
            "Leave request functionality is a Could Have [S4, \"Company & HR Information\"]; the deck notes the overlap [S4, \"Communication & Engagement\"]",
            "P3, P5, P6"
          ],
          [
            "Which survey is the evidence",
            "The business case cites \"the 2024 survey\" [S2, slide 2]",
            "The survey results provided are for 2023 and 2025 [S4]",
            "All"
          ]
        ]
      },
      {
        "t": "p",
        "text": "**Gap in the landing-page story:** the HR Lead's story assumes a computer login each morning [S1, \"Global Communication\"], while the largest access gap is among employees without a PC [S2, slides 2–3]."
      }
    ]
  },
  {
    "title": "Evidence gaps and what to validate next",
    "blocks": [
      {
        "t": "p",
        "text": "The biggest weakness is that the questionnaire output is not tagged by participant group, so three of the six personas rest on thin or topic-assigned evidence. These are the gaps, each with a way to close it."
      },
      {
        "t": "ol",
        "items": [
          "**No group tags on the questionnaire answers [S7].** Ask for the raw responses with the participant group attached, then re-cut the needs by group. This would firm up Personas 2, 4 and 5 most.",
          "**No direct voice from non-desk employees (Persona 3).** The sources describe the group and its access gap but quote no one, and do not say whether frontline employees have company devices or would use personal phones [S2, slides 2–3; S6, slide 4]. Run sessions with production and logistics staff before Option C is scoped.",
          "**Group sizes are unknown.** The only count is over 2,000 frontline non-email users [S2, slide 2]. The workshops had 48 employees in total, with no split by group [S6, slide 3]. Headcount per persona is needed to prioritise.",
          "**Workshop word clouds show only snippets.** [S3] gives two \"latest responses\" per question, and several are cut off mid-word. Full responses were not provided.",
          "**Languages are not specified.** Dutch and French are given as examples, and Belgium and the Netherlands as smaller countries with limited access [S7, \"frustrates you\" and \"wish you could do\"]. The full language list and employee numbers per language are unknown.",
          "**Leadership is not a persona yet.** The sources mention a leadership forum [S1], leadership messages and Town Hall recordings [S7, \"types of content\"], and limited leadership insight [S2, slide 2], but no leader's own needs. Content owners and the intranet team have the same gap [S7, \"who should be responsible\"].",
          "**The HR Lead view is one person's [S1].** Persona 6 should be checked against other site communicators and content owners.",
          "**The mock-ups in [S4] are concepts.** They illustrate possible tiles and layouts and should not be read as user requests."
        ]
      },
      {
        "t": "p",
        "text": "**Left out on purpose.** Names, ages, photos, personality traits, technical skill ratings and fictional day-in-the-life stories are omitted because none of the sources support them. Added instead: an evidence rating per persona, source tags on every statement, MoSCoW placement from [S4], and a clearly labelled interpretation line."
      }
    ]
  }
];

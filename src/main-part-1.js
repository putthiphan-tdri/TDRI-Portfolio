const STORAGE_KEY = 'tdri-researcher-portfolio-canonical-v2';
const skillTypeSchema = {
  Platform: {
    description: 'Apps, services, and work environments you use to get work done',
    aliases: ['Software', 'Tool'],
  },
  Method: {
    description: 'Repeatable approaches, frameworks, and ways of working',
    aliases: ['Methods', 'Methodology'],
  },
  Technical: {
    description: 'Implementation know-how, technical artifacts, and build skills',
    aliases: ['Language', 'Data', 'Practice', 'Technical Skill'],
  },
  Domain: {
    description: 'Subject-matter expertise and policy knowledge areas',
    aliases: ['Research', 'Knowledge', 'Subject', 'Subject Matter'],
  },
};
const skillTypeOptions = Object.keys(skillTypeSchema);
const skillLevelOptions = ['Advanced', 'Working', 'Familiar'];
const skillLevelOrder = {
  Advanced: 0,
  Working: 1,
  Familiar: 2,
};

const monthLookup = new Map([
  ['jan', 0],
  ['january', 0],
  ['feb', 1],
  ['february', 1],
  ['mar', 2],
  ['march', 2],
  ['apr', 3],
  ['april', 3],
  ['may', 4],
  ['jun', 5],
  ['june', 5],
  ['jul', 6],
  ['july', 6],
  ['aug', 7],
  ['august', 7],
  ['sep', 8],
  ['sept', 8],
  ['september', 8],
  ['oct', 9],
  ['october', 9],
  ['nov', 10],
  ['november', 10],
  ['dec', 11],
  ['december', 11],
]);

const placeholderAchievementTitles = new Set([
  'Why Thailand Needs a Productivity Agenda',
  'PM2.5 Solution Requires Regional Cooperation',
  'Inclusive Growth Conference 2024',
  'AEA Annual Meeting 2023',
  'TDRI Annual Public Forum 2023',
  'Interview on Thai PBS - Economic Outlook 2024',
  'Quick Take: Inflation and Thai Households',
  "Thailand’s Aging Society - Challenges Ahead",
]);

const defaultData = {
  "profile": {
    "name": "Dr. Putthiphan Hirunyatrakul",
    "title": "Big Data Research Fellow",
    "bio": "Add a short bio about yourself, your research interests and expertise. This will appear on your TDRI portfolio.",
    "email": "putthiphan@tdri.or.th",
    "website": "https://www.tdri.or.th",
    "photo": ""
  },
  "organization": {
    "title": "About TDRI",
    "description": "Thailand Development Research Institute (TDRI) is an independent think tank focusing on evidence-based policy research to drive sustainable development and improve the quality of life for all."
  },
  "achievementsIntro": "",
  "quote": "TDRI envisions a prosperous Thailand driven by high-quality research and effective policy recommendations.",
  "categories": [
    {
      "id": "research-projects",
      "type": "projects",
      "title": "Research Project",
      "count": 4,
      "accent": "#1f65b5",
      "icon": "briefcase",
      "items": [
        {
          "id": "project-llm-phase-2",
          "title": "โครงการพัฒนาระบบวิเคราะห์ข้อมูลด้วย Large Language Models (LLMs) เพื่อการใช้ประโยชน์ในการพัฒนากำลังคนสมรรถนะสูงให้ตรงความต้องการของประเทศจากแพลตฟอร์มข้อมูลประกาศรับสมัครงานออนไลน์ ระยะที่ 2",
          "source": "หน่วยบริหารและจัดการทุนด้านการพัฒนากำลังคน และทุนด้านการพัฒนาสถาบันอุดมศึกษา การวิจัยและการสร้างนวัตกรรม (บพค.)",
          "startDate": "May 2026",
          "endDate": "May 2027",
          "status": "ongoing",
          "link": ""
        },
        {
          "id": "project-hospital-accreditation",
          "title": "โครงการข้อเสนอเชิงนโยบายเพื่อการพัฒนาระบบการรับรองคุณภาพสถานพยาบาลของประเทศไทย",
          "source": "สถาบันวิจัยระบบสาธารณสุข",
          "startDate": "Dec 2025",
          "endDate": "Dec 2026",
          "status": "ongoing",
          "link": ""
        },
        {
          "id": "project-llm-phase-1",
          "title": "โครงการพัฒนาระบบวิเคราะห์ข้อมูลด้วย Large Language Models (LLMs) เพื่อการใช้ประโยชน์ในการพัฒนากำลังคนสมรรถนะสูงให้ตรงความต้องการของประเทศจากแพลตฟอร์มข้อมูลประกาศรับสมัครงานออนไลน์ ระยะที่ 1",
          "source": "หน่วยบริหารและจัดการทุนด้านการพัฒนากำลังคน และทุนด้านการพัฒนาสถาบันอุดมศึกษา การวิจัยและการสร้างนวัตกรรม (บพค.)",
          "startDate": "Jun 2024",
          "endDate": "Aug 2025",
          "status": "done",
          "link": ""
        },
        {
          "id": "project-digital-labor-skills",
          "title": "โครงการศึกษาตลาดแรงงานและข้อเสนอเชิงนโยบายด้านทักษะสำหรับเศรษฐกิจดิจิทัล",
          "source": "Thailand Development Research Institute (TDRI)",
          "startDate": "Jan 2024",
          "endDate": "Dec 2024",
          "status": "done",
          "link": ""
        }
      ]
    },
    {
      "id": "reports",
      "title": "Report",
      "count": 0,
      "accent": "#4f7fb8",
      "icon": "report",
      "items": []
    },
    {
      "id": "publications",
      "title": "Academic Journal",
      "count": 2,
      "accent": "#2d75c7",
      "icon": "book",
      "items": [
        {
          "id": "pub-hybrid-intersection",
          "title": "Hybrid Intersection: Navigating Context and Constraint in AI for Social Good Among Thailand’s Smallholder Farmers.",
          "source": "Sustainability",
          "date": "Jun 2025",
          "link": ""
        },
        {
          "id": "pub-lockdown-costs",
          "title": "The costs of lockdown: Assessing the employment and livelihood impacts of lockdown in Thailand during the COVID-19 pandemic.",
          "source": "TDRI Quarterly Review",
          "date": "Mar 2020",
          "link": ""
        }
      ]
    },
    {
      "id": "articles",
      "title": "Article",
      "count": 3,
      "accent": "#16aa82",
      "icon": "article",
      "items": [
        {
          "id": "art-party-finance-policy",
          "title": "ข้อสังเกต “ต้นทุนทางการเงินและที่มาของเงินจากนโยบายหาเสียงของพรรคการเมือง”",
          "source": "TDRI",
          "date": "Feb 2026",
          "link": ""
        },
        {
          "id": "art-policy-needed-new-government",
          "title": "นโยบายที่ประเทศต้องการ และรัฐบาลใหม่ควรทำ",
          "source": "TDRI",
          "date": "Jan 2026",
          "link": ""
        },
        {
          "id": "art-ai-labor-market-growth",
          "title": "ตลาดแรงงานเอไอมาแรง ที่ดีอาร์ไอพบ 2 ตำแหน่งงานโตอย่างก้าวกระโดด",
          "source": "TDRI",
          "date": "Aug 2025",
          "link": ""
        }
      ]
    },
    {
      "id": "conferences",
      "title": "Conference",
      "count": 0,
      "accent": "#7157cf",
      "icon": "podium",
      "items": []
    },
    {
      "id": "media",
      "title": "Media",
      "count": 0,
      "accent": "#ef665f",
      "icon": "media",
      "items": []
    },
    {
      "id": "workshops",
      "title": "Workshop",
      "count": 0,
      "accent": "#d98b35",
      "icon": "workshop",
      "items": []
    }
  ],
  "achievementSort": "latest",
  "skillProfile": {
    "title": "Skill Profile",
    "description": "Skills, tools, and certifications that support my research and professional work.",
    "domainSort": "count-desc",
    "certificateSort": "latest",
    "domains": [
      {
        "id": "skill-domain-generative-ai",
        "title": "Generative AI",
        "items": [
          {
            "id": "skill-chatgpt",
            "name": "ChatGPT",
            "type": "Platform",
            "level": "Advanced"
          },
          {
            "id": "skill-gemini",
            "name": "Gemini",
            "type": "Platform",
            "level": "Advanced"
          },
          {
            "id": "skill-claude",
            "name": "Claude",
            "type": "Platform",
            "level": "Advanced"
          },
          {
            "id": "skill-notebooklm",
            "name": "NotebookLM",
            "type": "Platform",
            "level": "Advanced"
          },
          {
            "id": "skill-perplexity",
            "name": "Perplexity",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-skill-md",
            "name": "Creating SKILL.md",
            "type": "Technical",
            "level": "Working"
          },
          {
            "id": "skill-connectors",
            "name": "Installing Connectors",
            "type": "Technical",
            "level": "Working"
          }
        ]
      },
      {
        "id": "skill-domain-data-analysis",
        "title": "Data Analysis",
        "items": [
          {
            "id": "skill-excel",
            "name": "Excel",
            "type": "Platform",
            "level": "Advanced"
          },
          {
            "id": "skill-spss",
            "name": "SPSS",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-powerbi",
            "name": "PowerBI",
            "type": "Platform",
            "level": "Familiar"
          }
        ]
      },
      {
        "id": "skill-domain-ai-research",
        "title": "AI Research",
        "items": [
          {
            "id": "skill-deep-research",
            "name": "Deep Research",
            "type": "Method",
            "level": "Advanced"
          },
          {
            "id": "skill-ai-governance-domain",
            "name": "AI Governance",
            "type": "Domain",
            "level": "Working"
          },
          {
            "id": "skill-scispace",
            "name": "SciSpace",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-consensus",
            "name": "Consensus AI",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-connectedpapers",
            "name": "ConnectedPapers",
            "type": "Platform",
            "level": "Working"
          }
        ]
      },
      {
        "id": "skill-domain-vibe-coding",
        "title": "Vibe Coding",
        "items": [
          {
            "id": "skill-codex",
            "name": "Codex",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-replit",
            "name": "Replit",
            "type": "Platform",
            "level": "Working"
          }
        ]
      }
    ],
    "certifications": [
      {
        "id": "cert-good-clinical-practice",
        "title": "แนวทางการปฏิบัติการวิจัยทางคลินิกที่ดี (ICH-GCP:E6(R2))",
        "issuer": "คณะกรรมการจริยธรรมการวิจัยในคน มหาวิทยาลัยธรรมศาสตร์ สาขาแพทยศาสตร์",
        "date": "Aug 2025",
        "link": ""
      },
      {
        "id": "cert-future-proof-ai",
        "title": "Future Proof with AI",
        "issuer": "D^3 Harvard Business School",
        "date": "May 2025",
        "link": ""
      },
      {
        "id": "cert-ai-governance",
        "title": "AI Governance Training",
        "issuer": "AI, Tech & Privacy",
        "date": "Oct 2024",
        "link": ""
      }
    ]
  }
};

const fallbackSkillProfile = {
  title: 'Skill Profile',
  description: 'Skills, tools, and certifications that support my research and professional work.',
  domainSort: 'count-desc',
  certificateSort: 'latest',
  domains: [
    {
      id: 'skill-domain-generative-ai',
      title: 'Generative AI',
      items: [
        { id: 'skill-chatgpt', name: 'ChatGPT', type: 'Platform', level: 'Advanced' },
        { id: 'skill-gemini', name: 'Gemini', type: 'Platform', level: 'Advanced' },
        { id: 'skill-claude', name: 'Claude', type: 'Platform', level: 'Advanced' },
        { id: 'skill-notebooklm', name: 'NotebookLM', type: 'Platform', level: 'Advanced' },
        { id: 'skill-perplexity', name: 'Perplexity', type: 'Platform', level: 'Working' },
        { id: 'skill-skill-md', name: 'Creating SKILL.md', type: 'Technical', level: 'Working' },
        { id: 'skill-connectors', name: 'Installing Connectors', type: 'Technical', level: 'Working' },
      ],
    },
    {
      id: 'skill-domain-data-analysis',
      title: 'Data Analysis',
      items: [
        { id: 'skill-excel', name: 'Excel', type: 'Platform', level: 'Advanced' },
        { id: 'skill-spss', name: 'SPSS', type: 'Platform', level: 'Working' },
        { id: 'skill-powerbi', name: 'PowerBI', type: 'Platform', level: 'Familiar' },
      ],
    },
    {
      id: 'skill-domain-ai-research',
      title: 'AI Research',
      items: [
        { id: 'skill-deep-research', name: 'Deep Research', type: 'Method', level: 'Advanced' },
        { id: 'skill-ai-governance-domain', name: 'AI Governance', type: 'Domain', level: 'Working' },
        { id: 'skill-scispace', name: 'SciSpace', type: 'Platform', level: 'Working' },
        { id: 'skill-consensus', name: 'Consensus AI', type: 'Platform', level: 'Working' },
        { id: 'skill-connectedpapers', name: 'ConnectedPapers', type: 'Platform', level: 'Working' },
      ],
    },
    {
      id: 'skill-domain-vibe-coding',
      title: 'Vibe Coding',
      items: [
        { id: 'skill-codex', name: 'Codex', type: 'Platform', level: 'Working' },
        { id: 'skill-replit', name: 'Replit', type: 'Platform', level: 'Working' },
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-good-clinical-practice',
      title: 'แนวทางการปฏิบัติการวิจัยทางคลินิกที่ดี (ICH-GCP:E6(R2))',
      issuer: 'คณะกรรมการจริยธรรมการวิจัยในคน มหาวิทยาลัยธรรมศาสตร์ สาขาแพทยศาสตร์',
      date: 'Aug 2025',
      link: '',
    },
    {
      id: 'cert-future-proof-ai',
      title: 'Future Proof with AI',
      issuer: 'D^3 Harvard Business School',
      date: 'May 2025',
      link: '',
    },
    {
      id: 'cert-ai-governance',
      title: 'AI Governance Training',
      issuer: 'AI, Tech & Privacy',
      date: 'Oct 2024',
      link: '',
    },
  ],
};

if (!defaultData.skillProfile) {
  defaultData.skillProfile = structuredClone(fallbackSkillProfile);
}

let data = loadData();
if (!['latest', 'oldest'].includes(data.achievementSort)) data.achievementSort = 'latest';
let editMode = false;
let editorScope = 'full';
let activeFilter = 'all';
let selectedCategoryId = data.categories[0].id;
let modalCategoryId = null;
let draftData = null;
let hasUnsavedChanges = false;
let pendingFocusSelector = '';

const app = document.getElementById('app');

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? mergeData(defaultData, saved) : structuredClone(defaultData);
  } catch {
    return mergeData(defaultData, {});
  }
}

function mergeData(base, saved) {
  const categories = mergeCategories(base.categories, saved.categories);

  return {
    ...structuredClone(base),
    ...saved,
    profile: { ...base.profile, ...saved.profile },
    organization: { ...base.organization, ...saved.organization },
    skillProfile: mergeSkillProfile(base.skillProfile, saved.skillProfile),
    categories,
  };
}

function mergeSkillProfile(baseSkillProfile, savedSkillProfile) {
  const base = baseSkillProfile || fallbackSkillProfile;

  if (!savedSkillProfile || typeof savedSkillProfile !== 'object') {
    return structuredClone(base);
  }

  return {
    ...structuredClone(base),
    ...savedSkillProfile,
    domains: normalizeSkillDomains(
      Array.isArray(savedSkillProfile.domains)
        ? savedSkillProfile.domains
        : base.domains
    ),
    certifications: Array.isArray(savedSkillProfile.certifications)
      ? savedSkillProfile.certifications
      : base.certifications,
  };
}

function mergeCategories(baseCategories, savedCategories) {
  if (!Array.isArray(savedCategories)) return structuredClone(baseCategories);

  const baseById = new Map(baseCategories.map((category) => [category.id, category]));
  const savedById = new Map(savedCategories.map((category) => [category.id, category]));
  const merged = [];

  baseCategories.forEach((baseCategory) => {
    const savedCategory = savedById.get(baseCategory.id);
    if (savedCategory) {
      merged.push({
        ...structuredClone(baseCategory),
        ...savedCategory,
        items: normalizeCategoryItems(
          Array.isArray(savedCategory.items) ? savedCategory.items : baseCategory.items
        ),
      });
    } else {
      merged.push({
        ...structuredClone(baseCategory),
        items: normalizeCategoryItems(baseCategory.items),
      });
    }
  });

  savedCategories.forEach((savedCategory) => {
    if (!baseById.has(savedCategory.id)) {
      merged.push({
        ...savedCategory,
        items: normalizeCategoryItems(savedCategory.items),
      });
    }
  });

  return merged;
}

function normalizeCategoryItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => !placeholderAchievementTitles.has(item?.title));
}

function saveData() {
  syncCategoryCounts();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    window.alert('This change could not be saved in the browser. Try a smaller image or export a backup before continuing.');
    return false;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function icon(type) {
  const attrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  const paths = {
    book: '<path d="M4.7 5.4c0-1 0-1.5.3-1.8.3-.3.8-.3 1.8-.3h2.8c1.3 0 2.4.5 3.2 1.3v15c-.8-.8-1.9-1.3-3.2-1.3H6.8c-1 0-1.5 0-1.8-.3-.3-.3-.3-.8-.3-1.8V5.4Z"/><path d="M19.3 5.4c0-1 0-1.5-.3-1.8-.3-.3-.8-.3-1.8-.3h-2.8c-1.3 0-2.4.5-3.2 1.3v15c.8-.8 1.9-1.3 3.2-1.3h2.8c1 0 1.5 0 1.8-.3.3-.3.3-.8.3-1.8V5.4Z"/>',
    article: '<path d="M7 4.2h7.4L18 7.8V20H7V4.2Z"/><path d="M14 4.2v4h4"/><path d="M9.7 11.5h5.1"/><path d="M9.7 14.4h5.1"/><path d="M9.7 17.3h3.5"/>',
    report: '<path d="M6.3 3.8h9.1l2.3 2.4v14H6.3z"/><path d="M15.2 3.8v2.6h2.5"/><path d="M8.9 9.2h6.2"/><path d="M8.9 12.2h6.2"/><path d="M8.9 15.2h3.9"/>',
    podium: '<path d="M8.8 21h6.4"/><path d="M10 12.4h4v8.4h-4z"/><path d="M6.1 15.4h3.9v5.4H6.1z"/><path d="M14 15.4h3.9v5.4H14z"/><circle cx="12" cy="5.7" r="2.5"/><path d="M12 8.2v2.2"/>',
    workshop: '<path d="M4.8 5.6h14.4v9.5H4.8z"/><path d="M8.3 20h7.4"/><path d="M12 15.1V20"/><path d="M8 9.1h3.1"/><path d="M8 11.9h5.5"/><path d="M16.1 8.9l1.1 1.1-2.6 2.6-1.1-1.1z"/>',
    media: '<path d="M5 6.3h14v10.9H5z"/><path d="m10.2 9.4 4.5 2.3-4.5 2.4V9.4Z"/><path d="M8.3 20h7.4"/><path d="M12 17.2V20"/>',
    mail: '<path d="M4.5 6.8h15v10.4h-15z"/><path d="m5.3 7.6 6.7 5.1 6.7-5.1"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4"/><path d="M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5s-1.1 6.2-3.3 8.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5Z"/>',
    upload: '<path d="M5.3 18.7h13.4V5.3H5.3z"/><path d="m5.3 15.8 4.2-4.1 3.2 3.1 1.8-1.7 4.2 4.1"/><circle cx="15.4" cy="8.5" r="1.2"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    edit: '<path d="m4.7 15.8-.9 4.4 4.4-.9L18.9 8.6l-3.5-3.5L4.7 15.8Z"/><path d="m13.9 6.6 3.5 3.5"/>',
    download: '<path d="M12 4v10.2"/><path d="m8.2 10.7 3.8 3.8 3.8-3.8"/><path d="M5 19.5h14"/>',
    trash: '<path d="M5 7h14"/><path d="M9 7V4.8h6V7"/><path d="M7.2 7 8 20h8l.8-13"/><path d="M10.5 10.7v5.7"/><path d="M13.5 10.7v5.7"/>',
    user: '<circle cx="12" cy="8.2" r="3.2"/><path d="M5.8 19.2c.9-3.3 3-5 6.2-5s5.3 1.7 6.2 5"/>',
    building: '<path d="M5.5 20.5h13"/><path d="M7 20.5V9.8l5-5.8 5 5.8v10.7"/><path d="M10 20.5v-5h4v5"/><path d="M10.2 9.8v2.1"/><path d="M13.8 9.8v2.1"/>',
    briefcase: '<path d="M8.5 7.5V5.8c0-1 .5-1.5 1.5-1.5h4c1 0 1.5.5 1.5 1.5v1.7"/><path d="M4.3 8.2h15.4v10.5c0 .8-.4 1.2-1.2 1.2h-13c-.8 0-1.2-.4-1.2-1.2V8.2Z"/><path d="M4.3 12.5c2.4 1.2 4.9 1.8 7.7 1.8s5.3-.6 7.7-1.8"/><path d="M10.7 12.7h2.6"/>',
    award: '<circle cx="12" cy="8" r="4.3"/><path d="m8.7 12.1-1.2 7.4 4.5-2.4 4.5 2.4-1.2-7.4"/><path d="m10.2 8 1.2 1.2 2.4-2.6"/>',
    tool: '<path d="M14.7 5.2a4.2 4.2 0 0 0 4.1 5.1l-7.9 7.9a2.7 2.7 0 0 1-3.8-3.8l7.6-7.6Z"/><path d="m6.8 17.2 2 2"/>',
    skills: '<path d="M5.2 4.7h5.2v5.2H5.2z"/><path d="M13.6 4.7h5.2v5.2h-5.2z"/><path d="M5.2 14.1h5.2v5.2H5.2z"/><path d="M13.6 14.1h5.2v5.2h-5.2z"/><path d="M10.4 7.3h3.2"/><path d="M7.8 9.9v4.2"/><path d="M16.2 9.9v4.2"/><path d="M10.4 16.7h3.2"/>',
    arrow: '<path d="M5 12h13"/><path d="m13 6.8 5.2 5.2-5.2 5.2"/>',
  };

  return `<svg ${attrs}>${paths[type] || paths.article}</svg>`;
}

function tdriLogo() {
  return `
    <div class="tdri-logo" aria-label="TDRI Thailand Development Research Institute">
      <span>TDRI</span>
      <small>Thailand<br>Development<br>Research<br>Institute</small>
    </div>
  `;
}

function editable(value, field, tag = 'span', extraClass = '') {
  const isEditable = canEditField(field);
  const cls = ['editable-field', isEditable ? 'is-editable' : '', extraClass].filter(Boolean).join(' ');
  return `<${tag} class="${cls}" data-field="${field}" contenteditable="${isEditable}" spellcheck="false">${escapeHtml(value)}</${tag}>`;
}

function canEditField(field) {
  return false;
}


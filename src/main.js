const STORAGE_KEY = 'tdri-researcher-portfolio-canonical-v3';
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
    "bio": "",
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
          "title": "โครงการการออกแบบระบบการประกันสังคมที่รองรับการเปลี่ยนแปลงของรูปแบบการทำงานในอนาคต",
          "source": "กองยุทธศาสตร์การพัฒนาทรัพยากรมนุษย์และสังคม สำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ",
          "startDate": "Apr 2020",
          "endDate": "Apr 2021",
          "status": "done",
          "link": ""
        }
      ]
    },
    {
      "id": "reports",
      "title": "Report",
      "count": 2,
      "accent": "#4f7fb8",
      "icon": "report",
      "items": [
        {
          "id": "item-1777483831130",
          "title": "รายงานฉบับสมบูรณ์ (Final Report) โครงการการออกแบบ ระบบการประกันสังคมที่รองรับการเปลี่ยนแปลง ของรูปแบบการทำงานในอนาคต",
          "source": "กองยุทธศาสตร์การพัฒนาทรัพยากรมนุษย์และสังคมสำนักงานสภาพัฒนาการเศรษฐกิจและสังคมแห่งชาติ",
          "date": "July 2021",
          "link": "https://tdri.or.th/2024/03/331057/"
        },
        {
          "id": "item-1777483910849",
          "title": "รายงานข้อเสนอแนะเชิงนโยบาย  โครงการพัฒนาระบบวิเคราะห์ข้อมูลด้วย Large Language Models (LLMs) เพื่อการใช้ประโยชน์ในการพัฒนากำลังคนสมรรถนะสูงฯ",
          "source": "หน่วยบริหารและจัดการทุนด้านการพัฒนากำลังคน และทุนด้านการพัฒนาสถาบันอุดมศึกษา การวิจัยและการสร้างนวัตกรรม (บพค.)",
          "date": "Dec 2025",
          "link": ""
        }
      ]
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
      "count": 7,
      "accent": "#16aa82",
      "icon": "article",
      "items": [
        {
          "id": "item-1777482840473",
          "title": "ประสบการณ์ต่างประเทศของการระบาด และมาตรการคุมการระบาดไวรัสโควิด-19: 5 ข้อสังเกต 4 บทเรียน 3 ความสำเร็จ 2 จุดเปลี่ยน 1 เปิดเมือง",
          "source": "TDRI",
          "date": "Apr 2020",
          "link": "https://tdri.or.th/2020/04/how-countries-worldwide-are-fighting-covid-19/"
        },
        {
          "id": "item-1777482862138",
          "title": "จากปิดเมืองสู่ฟื้นฟู: วิกฤตการว่างงาน แผลเป็นทางเศรษฐกิจ สู่การสร้างงานและศักยภาพแรงงานในระยะยาว",
          "source": "TDRI",
          "date": "Sep 2020",
          "link": "https://tdri.or.th/2020/09/the-unemployment-impacts-of-covid-19/"
        },
        {
          "id": "item-1777482881036",
          "title": "ตั้งเข็มทิศใหม่กับแผน AI แห่งชาติฉบับสอง: 3 ความท้าทายใหญ่ที่ต้องก้าวเดิน",
          "source": "TDRI",
          "date": "Jun 2025",
          "link": "https://tdri.or.th/2025/06/national-ai-actionplan-3challenges-ahead-article/"
        },
        {
          "id": "item-1777482906502",
          "title": "ตลาดแรงงานเอไอมาแรง ทีดีอาร์ไอพบ 2 ตำแหน่งงานโตอย่างก้าวกระโดด",
          "source": "TDRI",
          "date": "Aug 2025",
          "link": "https://tdri.or.th/2025/08/ai-job-market-2tracked-growth/"
        },
        {
          "id": "item-1777482934567",
          "title": "นโยบายที่ประเทศต้องการ และรัฐบาลใหม่ควรทำ",
          "source": "TDRI",
          "date": "Jan 2026",
          "link": "https://tdri.or.th/2026/01/key-policies-for-the-new-gov-article/"
        },
        {
          "id": "item-1777482955718",
          "title": "เมื่อ AI เขย่าตลาดงาน ใครอยู่ ใครไป",
          "source": "TDRI",
          "date": "Feb 2026",
          "link": "https://tdri.or.th/2026/02/ai-job-market-disruption-and-impact/"
        },
        {
          "id": "item-1777482980368",
          "title": "ข้อสังเกต “ต้นทุนทางการเงินและที่มาของเงินจากนโยบายหาเสียงของพรรคการเมือง”",
          "source": "TDRI",
          "date": "Feb 2026",
          "link": "https://tdri.or.th/2026/02/analysis-election-campaign-policies-2026/"
        }
      ]
    },
    {
      "id": "conferences",
      "title": "Conference",
      "count": 3,
      "accent": "#7157cf",
      "icon": "podium",
      "items": [
        {
          "id": "item-1777483390907",
          "title": "นโยบายอุตสาหกรรมใหม่เพื่อสร้างการเติบโต",
          "source": "TDRI Annual Conference 2025",
          "date": "Nov 2025",
          "link": "https://tdri.or.th/2025/12/ac-2025-session2/"
        },
        {
          "id": "item-1777483433282",
          "title": "Digital Technology Update: Agentic AI Hype or Real Productivity Leap",
          "source": "TDRI EIS",
          "date": "Mar 2026",
          "link": ""
        },
        {
          "id": "item-1777483454257",
          "title": "Delta Special Briefing: Next-Generation Business Transformation with Generative AI",
          "source": "TDRI EIS",
          "date": "Apr 2026",
          "link": ""
        }
      ]
    },
    {
      "id": "media",
      "title": "Media",
      "count": 6,
      "accent": "#ef665f",
      "icon": "media",
      "items": [
        {
          "id": "item-1777483474324",
          "title": "พินิจเศรษฐกิจการเมือง : พลิกแผน AI ไทย วางหมากใหม่ให้ตรงเป้าอนาคต",
          "source": "CU Radio",
          "date": "Oct 2025",
          "link": "https://tdri.or.th/2025/10/cu-radio-141025/"
        },
        {
          "id": "item-1777483509814",
          "title": "ยุทธศาสตร์ผลักดัน AI โจทย์ใหญ่ประเทศไทย | The Resources วิจัยใกล้ตัว",
          "source": "ThaiPBS",
          "date": "Oct 2025",
          "link": "https://www.youtube.com/watch?v=z1XsOIMAt8U"
        },
        {
          "id": "item-1777483532745",
          "title": "ตลาดงาน AI ไทย จะเดินไปอย่างไรต่อ | The Resources วิจัยใกล้ตัว",
          "source": "ThaiPBS",
          "date": "Oct 2025",
          "link": "https://www.youtube.com/watch?v=H_nBG2sG-u4"
        },
        {
          "id": "item-1777483553270",
          "title": "พินิจเศรษฐกิจการเมือง : ลงทุน data center อาจได้ไม่คุ้มเสีย",
          "source": "CU Radio",
          "date": "Nov 2025",
          "link": "https://tdri.or.th/2025/11/cu-radio-251125/"
        },
        {
          "id": "item-1777483582247",
          "title": "\"อะไรจะการันตีว่า ฉันอัปสกิลไปแล้ว จะไม่ตกงาน\" ฟังเสียงแรงงานจูเนียร์ ในวันโดน AI แย่งงาน",
          "source": "BBC Thai",
          "date": "Jan 2026",
          "link": "https://www.bbc.com/thai/articles/ce8rrm8p7vvo?at_format=image&at_campaign=Social_Flow&at_ptr_name=facebook_page&at_link_origin=BBC_news_Thai&at_medium=social&at_link_type=web_link&at_bbc_team=editorial&utm_sf_cserv_ref=1526071940947174&at_campaign_type=owned&at_link_id=F4665996-FC0C-11F0-A368-BDBBC2DDA2D1&utm_sf_post_ref=660658614"
        },
        {
          "id": "item-1777483605857",
          "title": "พินิจเศรษฐกิจการเมือง : เมื่อ AI เขย่าตลาดแรงงาน ใครจะถูก Disrupt",
          "source": "CU Radio",
          "date": "Feb 2026",
          "link": "https://tdri.or.th/2026/02/cu-radio-240226/"
        }
      ]
    },
    {
      "id": "workshops",
      "title": "Workshop",
      "count": 2,
      "accent": "#d98b35",
      "icon": "workshop",
      "items": [
        {
          "id": "item-1777483668500",
          "title": "Generative AI for Research",
          "source": "TDRI",
          "date": "May 2025",
          "link": ""
        },
        {
          "id": "item-1777483716682",
          "title": "สาธิตการใช้งาน CoPilot Studio เพื่อพัฒนา AI Agent",
          "source": "TDRI",
          "date": "Oct 2025",
          "link": ""
        }
      ]
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
            "level": "Advanced"
          },
          {
            "id": "skill-1777484401841",
            "name": "Prompt Engineering",
            "type": "Method",
            "level": "Advanced"
          },
          {
            "id": "skill-1777484439047",
            "name": "Napkin.ai",
            "type": "Platform",
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
        "title": "Literature Review",
        "items": [
          {
            "id": "skill-deep-research",
            "name": "Deep Research",
            "type": "Method",
            "level": "Advanced"
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
        "id": "skill-domain-1777484235473",
        "title": "AI Agent",
        "items": [
          {
            "id": "skill-1777484235473",
            "name": "Copilot Studio",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-1777484247969",
            "name": "Codex",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-1777484256067",
            "name": "Connectors",
            "type": "Technical",
            "level": "Working"
          },
          {
            "id": "skill-1777484273439",
            "name": "SKILL.md",
            "type": "Technical",
            "level": "Working"
          },
          {
            "id": "skill-1777484305522",
            "name": "Claude Cowork",
            "type": "Platform",
            "level": "Advanced"
          },
          {
            "id": "skill-1777484690946",
            "name": "Replit",
            "type": "Platform",
            "level": "Working"
          },
          {
            "id": "skill-1777484694806",
            "name": "Perplexity Computer",
            "type": "Platform",
            "level": "Familiar"
          },
          {
            "id": "skill-1777484862802",
            "name": "Claude Design",
            "type": "Platform",
            "level": "Working"
          }
        ]
      }
    ],
    "certifications": [
      {
        "id": "cert-good-clinical-practice",
        "title": "แนวทางการปฏิบัติการวิจัยทางคลินิกที่ดี",
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

function render() {
  const categories = data.categories;

  app.innerHTML = `
    <div class="site-shell ${editMode ? 'is-editing' : ''}">
      ${renderHeader()}
      <main class="portfolio-stage" id="portfolio">
        ${renderHero()}
        ${renderAbout()}
        ${renderAchievements(categories)}
        ${renderSkillProfile()}
      </main>
      ${renderFooter()}
      ${editMode ? renderEditor() : ''}
      ${modalCategoryId ? renderModal(modalCategoryId) : ''}
    </div>
  `;

  bindEvents();
}

function renderStable() {
  const scrollY = window.scrollY;
  const editorScrollTop = document.querySelector('.editor-panel')?.scrollTop || 0;
  render();
  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, left: 0 });
    const editorPanel = document.querySelector('.editor-panel');
    if (editorPanel) editorPanel.scrollTop = editorScrollTop;
    if (pendingFocusSelector) {
      document.querySelector(pendingFocusSelector)?.focus();
      pendingFocusSelector = '';
    }
  });
}

function getEditorData() {
  return draftData || data;
}

function beginEditing(scope = 'full', categoryId = selectedCategoryId) {
  if (!editMode || !draftData) {
    draftData = structuredClone(data);
    hasUnsavedChanges = false;
  }

  editMode = true;
  editorScope = scope;
  if (categoryId) selectedCategoryId = categoryId;

  const editorCategories = getEditorData().categories;
  if (!editorCategories.some((category) => category.id === selectedCategoryId)) {
    selectedCategoryId = editorCategories[0]?.id || '';
  }

  render();
}

function markDraftDirty() {
  hasUnsavedChanges = true;
  const status = document.querySelector('[data-editor-status]');
  if (status) status.textContent = 'Unsaved changes';
}

function commitDraft() {
  if (!draftData) return;

  data = mergeData(defaultData, draftData);
  syncCategoryCounts();
  saveData();
  draftData = null;
  hasUnsavedChanges = false;
  editMode = false;
  render();
}

function discardDraft({ requireConfirm = false } = {}) {
  if (requireConfirm && hasUnsavedChanges && !window.confirm('Discard your unsaved edits?')) {
    return false;
  }

  draftData = null;
  hasUnsavedChanges = false;
  editMode = false;
  render();
  return true;
}

function renderHeader() {
  const nav = ['Home', 'My Portfolio'];

  return `
    <header class="topbar">
      ${tdriLogo()}
      <nav class="main-nav" aria-label="Main navigation">
        ${nav.map((item) => `<button class="${item === 'My Portfolio' ? 'active' : ''}" type="button">${item}</button>`).join('')}
      </nav>
      <div class="header-actions">
        <button class="icon-button" type="button" data-action="export" aria-label="Export portfolio JSON" title="Export JSON">
          ${icon('download')}
        </button>
        <button class="edit-toggle" type="button" data-action="toggle-edit">
          ${icon('edit')}
          <span>${editMode ? 'Preview' : 'Edit'}</span>
        </button>
        <button class="profile-button" type="button" aria-label="Profile">
          ${data.profile.photo ? `<img src="${data.profile.photo}" alt="">` : icon('user')}
        </button>
      </div>
    </header>
  `;
}

function renderHero() {
  return `
    <section class="hero-grid" aria-label="Researcher introduction">
      <label class="photo-uploader ${data.profile.photo ? 'has-photo' : ''}">
        <input type="file" accept="image/png, image/jpeg, image/webp" data-action="photo-upload">
        ${
          data.profile.photo
            ? `<img src="${data.profile.photo}" alt="Researcher portrait">`
            : `<span class="photo-icon">${icon('upload')}<i>${icon('plus')}</i></span>
              <strong>Upload Photo</strong>
              <small>JPG, PNG (Max. 5MB)</small>`
        }
      </label>

      <div class="hero-copy">
        ${editable(data.profile.name, 'profile.name', 'h1')}
        ${editable(data.profile.title, 'profile.title', 'p', 'role-text')}
        ${editable(data.profile.bio, 'profile.bio', 'p', 'bio-text')}
        <div class="contact-row" aria-label="Contact details">
          <span>${icon('mail')}${editable(data.profile.email, 'profile.email')}</span>
          <span class="divider"></span>
          <span>${icon('globe')}${editable(data.profile.website, 'profile.website')}</span>
        </div>
      </div>

      <div class="skyline" aria-hidden="true">
        ${Array.from({ length: 16 }, (_, index) => `<span style="--i:${index}"></span>`).join('')}
      </div>
    </section>
  `;
}

function renderAbout() {
  return `
    <section class="about-band" aria-label="About TDRI">
      <div class="about-icon">${icon('building')}</div>
      <div class="about-copy">
        ${editable(data.organization.title, 'organization.title', 'h2')}
        ${editable(data.organization.description, 'organization.description', 'p')}
      </div>
      ${tdriLogo()}
    </section>
  `;
}

function renderAchievements(categories) {
  return `
    <section class="achievements" aria-label="Achievements">
      <div class="section-heading">
        <div>
          <h2>Portfolio</h2>
          <span aria-hidden="true"></span>
        </div>
        <div class="filters" aria-label="Achievement filters">
          <div class="card-sort-control achievement-sort-control" role="group" aria-label="Sort achievements">
            <span>Sort</span>
            <div class="sort-pill-group">
              <button type="button" class="${data.achievementSort !== 'oldest' ? 'active' : ''}" data-action="sort-achievements" data-value="latest" aria-pressed="${data.achievementSort !== 'oldest'}">Latest</button>
              <button type="button" class="${data.achievementSort === 'oldest' ? 'active' : ''}" data-action="sort-achievements" data-value="oldest" aria-pressed="${data.achievementSort === 'oldest'}">Oldest</button>
            </div>
          </div>
        </div>
      </div>

      ${renderOverviewStats()}

      <div class="achievement-grid">
        ${categories.length ? categories.map((category, index) => renderCategoryCard(category, index)).join('') : renderEmptyState()}
      </div>
    </section>
  `;
}

function renderOverviewStats() {
  const stats = getOverviewStats();

  return `
    <section class="stats-overview" aria-label="Overview statistics">
      <article class="stat-tile">
        <span>Total work</span>
        <strong>${stats.total}</strong>
        <small>Across ${stats.categoryCount} sections</small>
      </article>
      <article class="stat-tile">
        <span>Research projects</span>
        <strong>${stats.projects}</strong>
        <small>${stats.projectYearRange}</small>
      </article>
      <article class="stat-tile">
        <span>Average per year</span>
        <strong>${stats.averagePerYear}</strong>
        <small>${stats.yearRange}</small>
      </article>
      <article class="stat-tile">
        <span>Latest activity</span>
        <strong>${stats.latestYear}</strong>
        <small>${stats.latestYearCount} entries</small>
      </article>
    </section>
  `;
}

function renderCategoryCard(category, index) {
  if (category.type === 'projects') return renderProjectCard(category, index);

  return `
    <article class="achievement-card" style="--accent:${category.accent}; --index:${index}">
      <header>
        <div class="category-icon">${icon(category.icon)}</div>
        <h3>${editable(category.title, `category.${category.id}.title`)}</h3>
        <div class="card-tools">
          <span class="count-input" aria-label="${escapeHtml(category.title)} count">${categoryCount(category)}</span>
          ${renderSectionEditButton(category)}
        </div>
      </header>
      <div class="item-list">
        ${sortedItems(category.items).map((item) => renderCardItem(category.id, item)).join('')}
      </div>
      <button class="view-all" type="button" data-action="open-modal" data-category="${category.id}">
        <span>View all</span>
        ${icon('arrow')}
      </button>
    </article>
  `;
}

function renderProjectCard(category, index) {
  const projectItems = sortedItems(category.items);

  return `
    <article class="achievement-card project-card" style="--accent:${category.accent}; --index:${index}">
      <header>
        <div class="category-icon">${icon(category.icon)}</div>
        <h3>${editable(category.title, `category.${category.id}.title`)}</h3>
        <div class="card-tools">
          <span class="count-input" aria-label="${escapeHtml(category.title)} count">${categoryCount(category)}</span>
          ${renderSectionEditButton(category)}
        </div>
      </header>
      <div class="project-sections">
        <div class="project-list">
          ${
            projectItems.length
              ? projectItems.map((item) => renderProjectItem(category.id, item)).join('')
              : '<p class="empty-projects">No projects yet</p>'
          }
        </div>
      </div>
      <button class="view-all" type="button" data-action="open-modal" data-category="${category.id}">
        <span>View all</span>
        ${icon('arrow')}
      </button>
    </article>
  `;
}

function renderSectionEditButton(category) {
  const isActive = editMode && editorScope === 'section' && selectedCategoryId === category.id;

  return `
    <button class="section-edit-button ${isActive ? 'active' : ''}" type="button" data-action="edit-section" data-category="${category.id}" aria-label="Edit ${escapeHtml(category.title)}">
      ${icon('edit')}
      <span>Edit</span>
    </button>
  `;
}

function renderProjectSection(categoryId, title, items) {
  return `
    <section class="project-status-group" aria-label="${title} research projects">
      <div class="project-status-head">
        <h4>${title}</h4>
        <span>${items.length}</span>
      </div>
      <div class="project-list">
        ${
          items.length
            ? items.map((item) => renderProjectItem(categoryId, item)).join('')
            : '<p class="empty-projects">No projects yet</p>'
        }
      </div>
    </section>
  `;
}

function renderProjectItem(categoryId, item) {
  const title = editMode
    ? editable(item.title, `item.${categoryId}.${item.id}.title`, 'strong')
    : renderLinkedTitle(item);
  const donor = editMode
    ? editable(item.source, `item.${categoryId}.${item.id}.source`, 'small', 'donor-text')
    : `<small>${escapeHtml(item.source || 'Not set')}</small>`;

  return `
    <div class="project-item">
      <div class="project-copy">
        ${title}
        ${donor}
      </div>
      <time>${escapeHtml(formatProjectPeriod(item))}</time>
    </div>
  `;
}

function renderCardItem(categoryId, item) {
  const title = editMode
    ? editable(item.title, `item.${categoryId}.${item.id}.title`, 'strong')
    : renderLinkedTitle(item);

  return `
    <div class="achievement-item">
      <div>
        ${title}
        ${editable(item.source, `item.${categoryId}.${item.id}.source`, 'small')}
      </div>
      ${editable(item.date, `item.${categoryId}.${item.id}.date`, 'time')}
    </div>
  `;
}

function renderLinkedTitle(item) {
  const title = escapeHtml(item.title);
  const href = normalizeUrl(item.link || '');

  if (!href) {
    return `<strong>${title}</strong>`;
  }

  return `<a class="work-link" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${title}</a>`;
}

function renderEmptyState() {
  return `
    <div class="empty-state">
      <div>${icon('article')}</div>
      <h3>No matching achievements</h3>
      <p>Choose another filter or add a new entry from the editor.</p>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="quote-band">
      <div class="quote-mark" aria-hidden="true">"</div>
      ${editable(data.quote, 'quote', 'p')}
      <div class="campus-line" aria-hidden="true">
        ${Array.from({ length: 8 }, (_, index) => `<span style="--i:${index}"></span>`).join('')}
      </div>
    </footer>
  `;
}

function renderSkillProfile() {
  const profile = data.skillProfile;
  const totalSkills = profile.domains.reduce((total, domain) => total + domain.items.length, 0);
  const sortedDomains = sortedSkillDomains(profile.domains, profile.domainSort);
  const sortedCertifications = sortedCertificates(profile.certifications, profile.certificateSort);

  return `
    <section class="skill-profile-section" aria-label="Skill profile">
      <div class="section-heading skill-heading">
        <div>
          ${editable(profile.title, 'skillProfile.title', 'h2')}
          <span aria-hidden="true"></span>
          ${editable(profile.description, 'skillProfile.description', 'p')}
        </div>
      </div>

      <div class="skill-profile-grid">
        <article class="skill-card core-skills-card">
          <header>
            <div>
              <h3>Skills</h3>
              <p>${totalSkills} skills across ${profile.domains.length} domains</p>
            </div>
            <div class="card-sort-control" role="group" aria-label="Sort skill domains">
              <span>Sort</span>
              <div class="sort-pill-group">
                <button type="button" class="${profile.domainSort !== 'count-asc' ? 'active' : ''}" data-action="sort-skill-domains" data-value="count-desc" aria-pressed="${profile.domainSort !== 'count-asc'}">Most</button>
                <button type="button" class="${profile.domainSort === 'count-asc' ? 'active' : ''}" data-action="sort-skill-domains" data-value="count-asc" aria-pressed="${profile.domainSort === 'count-asc'}">Fewest</button>
              </div>
            </div>
            <button class="section-edit-button skill-card-edit ${editMode && editorScope === 'skills-core' ? 'active' : ''}" type="button" data-action="edit-skills-core" aria-label="Edit Skills">
              ${icon('edit')}
              <span>Edit</span>
            </button>
          </header>
          <div class="skill-domain-list">
            ${sortedDomains.map((domain) => renderSkillDomain(domain)).join('')}
          </div>
        </article>

        <article class="skill-card certification-card">
          <header>
            <div>
              <h3>Certifications</h3>
              <p>${profile.certifications.length} credentials</p>
            </div>
            <div class="card-sort-control" role="group" aria-label="Sort certifications">
              <span>Sort</span>
              <div class="sort-pill-group">
                <button type="button" class="${profile.certificateSort !== 'oldest' ? 'active' : ''}" data-action="sort-certificates" data-value="latest" aria-pressed="${profile.certificateSort !== 'oldest'}">Latest</button>
                <button type="button" class="${profile.certificateSort === 'oldest' ? 'active' : ''}" data-action="sort-certificates" data-value="oldest" aria-pressed="${profile.certificateSort === 'oldest'}">Oldest</button>
              </div>
            </div>
            <button class="section-edit-button skill-card-edit ${editMode && editorScope === 'skills-certifications' ? 'active' : ''}" type="button" data-action="edit-skills-certifications" aria-label="Edit Certifications">
              ${icon('edit')}
              <span>Edit</span>
            </button>
          </header>
          <div class="certification-list">
            ${sortedCertifications.map((certificate) => renderCertification(certificate)).join('')}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderSkillDomain(domain) {
  const items = sortedSkillItems(domain.items);

  return `
    <section class="skill-domain">
      <div class="skill-domain-head">
        <div class="skill-domain-icon">${icon('skills')}</div>
        <h4>${escapeHtml(domain.title)}</h4>
        <span>${domain.items.length}</span>
      </div>
      <div class="skill-chip-list">
        ${items.map((item) => renderSkillItem(item)).join('')}
      </div>
    </section>
  `;
}

function renderSkillItem(item) {
  return `
    <div class="skill-chip">
      <strong>${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(normalizeSkillType(item.type))}</span>
      <small>${escapeHtml(item.level)}</small>
    </div>
  `;
}

function renderCertification(certificate) {
  const title = escapeHtml(certificate.title);
  const href = normalizeUrl(certificate.link || '');
  const titleMarkup = href
    ? `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${title}</a>`
    : `<strong>${title}</strong>`;

  return `
    <div class="certification-item">
      <div class="certification-badge">${icon('award')}</div>
      <div>
        ${titleMarkup}
        <small>${escapeHtml(certificate.issuer || 'Issuer not set')}</small>
      </div>
      <time>${escapeHtml(certificate.date || 'Date not set')}</time>
    </div>
  `;
}

function renderEditor() {
  const editorData = getEditorData();

  if (editorScope === 'skills-core' || editorScope === 'skills-certifications') {
    return renderSkillEditor(editorScope, editorData);
  }

  const selected = editorData.categories.find((category) => category.id === selectedCategoryId) || editorData.categories[0];
  const isFullEditor = editorScope === 'full';

  return `
    <aside class="editor-panel" aria-label="Portfolio editor">
      ${renderEditorHead(isFullEditor ? 'Portfolio content' : selected.title, isFullEditor ? 'Draft editor' : 'Section editor')}

      ${
        isFullEditor
          ? `<label class="panel-sort">
              <span>Achievement sort order</span>
              <select data-action="sort-achievements">
                <option value="latest" ${editorData.achievementSort === 'latest' ? 'selected' : ''}>Latest work at top</option>
                <option value="oldest" ${editorData.achievementSort === 'oldest' ? 'selected' : ''}>Oldest work at top</option>
              </select>
            </label>

            <form class="editor-form" data-form="profile">
              <label>
                <span>Name</span>
                <input value="${escapeHtml(editorData.profile.name)}" data-input="profile.name">
              </label>
              <label>
                <span>Position / Title</span>
                <input value="${escapeHtml(editorData.profile.title)}" data-input="profile.title">
              </label>
              <label>
                <span>Short Bio</span>
                <textarea rows="4" data-input="profile.bio">${escapeHtml(editorData.profile.bio)}</textarea>
              </label>
              <div class="split-fields">
                <label>
                  <span>Email</span>
                  <input value="${escapeHtml(editorData.profile.email)}" data-input="profile.email">
                </label>
                <label>
                  <span>Website</span>
                  <input value="${escapeHtml(editorData.profile.website)}" data-input="profile.website">
                </label>
              </div>
              <label>
                <span>About TDRI</span>
                <textarea rows="4" data-input="organization.description">${escapeHtml(editorData.organization.description)}</textarea>
              </label>
              <label>
                <span>Footer quote</span>
                <textarea rows="3" data-input="quote">${escapeHtml(editorData.quote)}</textarea>
              </label>
            </form>

            <div class="category-order-block">
              <div class="editor-row">
                <h3>Achievement sections</h3>
                <button type="button" class="secondary-button" data-action="add-category">Add Category</button>
              </div>
              ${renderCategoryOrderList(editorData.categories, selected.id)}
            </div>`
          : `<p class="section-editor-note">This panel edits only the selected achievement section. Save applies the draft to the page.</p>`
      }

      <div class="category-editor">
        ${
          isFullEditor
            ? `<div class="editor-row section-lock">
                <label>
                  <span>Section name</span>
                  <input value="${escapeHtml(selected.title)}" data-field-input="category.${selected.id}.title">
                </label>
              </div>
              <label>
                <span>Editing section</span>
                <select data-action="select-category">
                  ${editorData.categories.map((category) => `<option value="${category.id}" ${category.id === selected.id ? 'selected' : ''}>${escapeHtml(category.title)}</option>`).join('')}
                </select>
              </label>`
            : `<div class="editor-row section-lock">
                <label>
                  <span>Editing section</span>
                  <input value="${escapeHtml(selected.title)}" data-field-input="category.${selected.id}.title">
                </label>
              </div>`
        }

        ${renderSelectedEditorItems(selected)}

        <button type="button" class="primary-button" data-action="add-item" data-category="${selected.id}">
          ${icon('plus')}
          <span>${selected.type === 'projects' ? 'Add Project' : 'Add Achievement'}</span>
        </button>
      </div>

      <div class="editor-tools">
        ${
          isFullEditor
            ? `<button type="button" class="secondary-button" data-action="reset">Reset draft</button>
              <button type="button" class="primary-button" data-action="export">
                ${icon('download')}
                <span>Export saved JSON</span>
              </button>`
            : `<button type="button" class="secondary-button" data-action="open-full-editor">Open Full Editor</button>`
        }
      </div>
    </aside>
  `;
}

function renderEditorHead(title, eyebrow) {
  return `
    <div class="editor-head">
      <div>
        <span>${escapeHtml(eyebrow)}</span>
        <h2>${escapeHtml(title)}</h2>
        <small data-editor-status>${hasUnsavedChanges ? 'Unsaved changes' : 'Draft ready'}</small>
      </div>
      <div class="editor-head-actions">
        <button type="button" class="secondary-button" data-action="discard-draft">Discard</button>
        <button type="button" class="primary-button" data-action="commit-draft">Save changes</button>
        <button class="icon-button" type="button" data-action="close-editor" aria-label="Close editor">${icon('edit')}</button>
      </div>
    </div>
  `;
}

function renderCategoryOrderList(categories, selectedId) {
  return `
    <div class="editor-order-list">
      ${categories.map((category) => `
        <div class="editor-order-row ${category.id === selectedId ? 'active' : ''}">
          <button type="button" data-action="select-category-row" data-category="${category.id}">
            <strong>${escapeHtml(category.title)}</strong>
            <small>${categoryCount(category)} entries</small>
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSelectedEditorItems(category) {
  if (category.type === 'projects') return renderProjectEditorGroups(category);

  return `
    <div class="category-list">
      ${category.items.map((item) => renderEditorItem(category.id, item)).join('')}
    </div>
  `;
}

function renderProjectEditorGroups(category) {
  return `
    <div class="category-list">
      ${category.items.map((item) => renderProjectEditorItem(category.id, item)).join('')}
    </div>
  `;
}

function renderProjectEditorGroup(categoryId, title, status, items) {
  return `
    <section class="editor-subgroup">
      <div class="project-status-head">
        <h4>${title}</h4>
        <span>${items.length}</span>
      </div>
      <div class="category-list">
        ${items.map((item) => renderProjectEditorItem(categoryId, item)).join('')}
      </div>
    </section>
  `;
}

function renderSkillEditor(scope, editorData) {
  const profile = editorData.skillProfile;
  const isCoreScope = scope === 'skills-core';
  const title = isCoreScope ? 'Skills' : 'Certifications';
  const typeGuide = skillTypeOptions
    .map((type) => `${type}: ${skillTypeSchema[type].description}`)
    .join(' · ');

  return `
    <aside class="editor-panel" aria-label="Skill Profile editor">
      ${renderEditorHead(title, 'Section editor')}

      <p class="section-editor-note">${
        isCoreScope
          ? typeGuide
          : 'Credentials are sorted by certificate date.'
      }</p>

      <form class="editor-form" data-form="skills">
        <label>
          <span>Section title</span>
          <input value="${escapeHtml(profile.title)}" data-input="skillProfile.title">
        </label>
        <label>
          <span>Description</span>
          <textarea rows="3" data-input="skillProfile.description">${escapeHtml(profile.description)}</textarea>
        </label>
        ${
          isCoreScope
            ? `<label>
                <span>Domain sort</span>
                <select data-input="skillProfile.domainSort">
                  <option value="count-desc" ${profile.domainSort !== 'count-asc' ? 'selected' : ''}>Most skills first</option>
                  <option value="count-asc" ${profile.domainSort === 'count-asc' ? 'selected' : ''}>Fewest skills first</option>
                </select>
              </label>`
            : `<label>
                <span>Certificate sort</span>
                <select data-input="skillProfile.certificateSort">
                  <option value="latest" ${profile.certificateSort !== 'oldest' ? 'selected' : ''}>Latest date first</option>
                  <option value="oldest" ${profile.certificateSort === 'oldest' ? 'selected' : ''}>Oldest date first</option>
                </select>
              </label>`
        }
      </form>

      ${
        isCoreScope
          ? `<div class="skill-editor-block">
              <div class="editor-row">
                <h3>Domains</h3>
                <button type="button" class="secondary-button" data-action="add-skill-domain">Add Domain</button>
              </div>
              <div class="skill-editor-list">
                ${sortedSkillDomains(profile.domains, profile.domainSort).map((domain) => renderSkillDomainEditor(domain)).join('')}
              </div>
            </div>`
          : `<div class="skill-editor-block">
              <div class="editor-row">
                <h3>Certifications</h3>
                <button type="button" class="secondary-button" data-action="add-certificate">Add Certificate</button>
              </div>
              <div class="skill-editor-list">
                ${sortedCertificates(profile.certifications, profile.certificateSort).map((certificate) => renderCertificateEditor(certificate)).join('')}
              </div>
            </div>`
      }

      <div class="editor-tools">
        <button type="button" class="secondary-button" data-action="open-full-editor">Open Full Editor</button>
      </div>
    </aside>
  `;
}

function renderEditorSummary(title, meta) {
  return `
    <div class="editor-summary-copy">
      <strong>${escapeHtml(title || 'Untitled')}</strong>
      <small>${escapeHtml(meta || 'No details yet')}</small>
    </div>
  `;
}

function renderSkillDomainEditor(domain) {
  const items = sortedSkillItems(domain.items);

  return `
    <details class="editor-item skill-domain-editor" data-skill-domain="${domain.id}" open>
      <summary>
        ${renderEditorSummary(domain.title, `${domain.items.length} skills`)}
      </summary>
      <label>
        <span>Domain</span>
        <input value="${escapeHtml(domain.title)}" data-skill-domain-input="${domain.id}.title">
      </label>
      <div class="skill-editor-list compact">
        ${items.map((item) => renderSkillItemEditor(domain.id, item)).join('')}
      </div>
      <div class="editor-tools inline-tools">
        <button type="button" class="secondary-button" data-action="add-skill-item" data-domain="${domain.id}">Add Skill</button>
        <button type="button" class="delete-button" data-action="delete-skill-domain" data-domain="${domain.id}">
          ${icon('trash')}
          <span>Delete Domain</span>
        </button>
      </div>
    </details>
  `;
}

function renderSkillItemEditor(domainId, item) {
  const selectedType = normalizeSkillType(item.type);

  return `
    <details class="editor-item skill-item-editor" data-skill-item="${item.id}" open>
      <summary>
        ${renderEditorSummary(item.name, `${selectedType} / ${item.level}`)}
      </summary>
      <label>
        <span>Skill / Capability</span>
        <input value="${escapeHtml(item.name)}" data-skill-item-input="${domainId}.${item.id}.name">
      </label>
      <div class="split-fields">
        <label>
          <span>Type</span>
          <select data-skill-item-input="${domainId}.${item.id}.type">
            ${skillTypeOptions.map((type) => `<option value="${type}" ${selectedType === type ? 'selected' : ''}>${type}</option>`).join('')}
          </select>
        </label>
        <label>
          <span>Level</span>
          <select data-skill-item-input="${domainId}.${item.id}.level">
            ${skillLevelOptions.map((level) => `<option value="${level}" ${item.level === level ? 'selected' : ''}>${level}</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="editor-tools inline-tools">
        <button type="button" class="delete-button" data-action="delete-skill-item" data-domain="${domainId}" data-skill="${item.id}">
          ${icon('trash')}
          <span>Delete Skill</span>
        </button>
      </div>
    </details>
  `;
}

function renderCertificateEditor(certificate) {
  return `
    <details class="editor-item" data-certificate="${certificate.id}" open>
      <summary>
        ${renderEditorSummary(certificate.title, `${certificate.issuer || 'Issuer not set'} / ${certificate.date || 'Date not set'}`)}
      </summary>
      <label>
        <span>Certificate</span>
        <input value="${escapeHtml(certificate.title)}" data-certificate-input="${certificate.id}.title">
      </label>
      <label>
        <span>Issuer</span>
        <input value="${escapeHtml(certificate.issuer)}" data-certificate-input="${certificate.id}.issuer">
      </label>
      <div class="split-fields">
        <label>
          <span>Date</span>
          <input value="${escapeHtml(certificate.date)}" data-certificate-input="${certificate.id}.date">
        </label>
        <label>
          <span>Link</span>
          <input type="url" placeholder="https://..." value="${escapeHtml(certificate.link || '')}" data-certificate-input="${certificate.id}.link">
        </label>
      </div>
      <button type="button" class="delete-button" data-action="delete-certificate" data-certificate="${certificate.id}">
        ${icon('trash')}
        <span>Delete Certificate</span>
      </button>
    </details>
  `;
}

function renderEditorItem(categoryId, item) {
  const category = getEditorData().categories.find((entry) => entry.id === categoryId);
  if (category?.type === 'projects') return renderProjectEditorItem(categoryId, item);

  return `
    <details class="editor-item" data-editor-item="${item.id}" open>
      <summary>
        ${renderEditorSummary(item.title, `${item.source || 'Source not set'} / ${item.date || 'Date not set'}`)}
      </summary>
      <label>
        <span>Title</span>
        <input value="${escapeHtml(item.title)}" data-item-input="${categoryId}.${item.id}.title">
      </label>
      <div class="split-fields">
        <label>
          <span>Source</span>
          <input value="${escapeHtml(item.source)}" data-item-input="${categoryId}.${item.id}.source">
        </label>
        <label>
          <span>Date</span>
          <input value="${escapeHtml(item.date)}" data-item-input="${categoryId}.${item.id}.date">
        </label>
      </div>
      <label>
        <span>Link</span>
        <input type="url" placeholder="https://www.tdri.or.th/..." value="${escapeHtml(item.link || '')}" data-item-input="${categoryId}.${item.id}.link">
      </label>
      ${normalizeUrl(item.link || '') ? `<a class="editor-link-preview" href="${escapeHtml(normalizeUrl(item.link || ''))}" target="_blank" rel="noreferrer">Open hyperlink</a>` : ''}
      <button type="button" class="delete-button" data-action="delete-item" data-category="${categoryId}" data-item="${item.id}">
        ${icon('trash')}
        <span>Delete</span>
      </button>
    </details>
  `;
}

function renderProjectEditorItem(categoryId, item) {
  return `
    <details class="editor-item" data-editor-item="${item.id}" open>
      <summary>
        ${renderEditorSummary(item.title, `${item.source || 'Donor not set'} / ${formatProjectPeriod(item)}`)}
      </summary>
      <label>
        <span>Project Title</span>
        <input value="${escapeHtml(item.title)}" data-item-input="${categoryId}.${item.id}.title">
      </label>
      <label>
        <span>Donor</span>
        <input value="${escapeHtml(item.source)}" data-item-input="${categoryId}.${item.id}.source">
      </label>
      <div class="split-fields">
        <label>
          <span>Start Date</span>
          <input value="${escapeHtml(item.startDate || '')}" data-item-input="${categoryId}.${item.id}.startDate">
        </label>
        <label>
          <span>End Date</span>
          <input value="${escapeHtml(item.endDate || '')}" data-item-input="${categoryId}.${item.id}.endDate">
        </label>
      </div>
      <label>
        <span>Link</span>
        <input type="url" placeholder="https://www.tdri.or.th/..." value="${escapeHtml(item.link || '')}" data-item-input="${categoryId}.${item.id}.link">
      </label>
      ${normalizeUrl(item.link || '') ? `<a class="editor-link-preview" href="${escapeHtml(normalizeUrl(item.link || ''))}" target="_blank" rel="noreferrer">Open hyperlink</a>` : ''}
      <button type="button" class="delete-button" data-action="delete-item" data-category="${categoryId}" data-item="${item.id}">
        ${icon('trash')}
        <span>Delete</span>
      </button>
    </details>
  `;
}

function renderModal(categoryId) {
  const category = data.categories.find((item) => item.id === categoryId);
  if (!category) return '';

  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal-sheet" aria-modal="true" role="dialog" aria-label="${escapeHtml(category.title)} entries">
        <button class="icon-button modal-close" type="button" data-action="close-modal" aria-label="Close">${icon('plus')}</button>
        <header>
          <div class="category-icon" style="--accent:${category.accent}">${icon(category.icon)}</div>
          <div>
            <h2>${escapeHtml(category.title)}</h2>
            <p>${categoryCount(category)} portfolio entries</p>
          </div>
        </header>
        <div class="modal-list">
          ${renderModalItems(category)}
        </div>
      </section>
    </div>
  `;
}

function renderModalItems(category) {
  if (category.type !== 'projects') {
    return sortedItems(category.items).map((item) => renderCardItem(category.id, item)).join('');
  }

  const projectItems = sortedItems(category.items);
  return projectItems.length
    ? `<div class="project-list">${projectItems.map((item) => renderProjectItem(category.id, item)).join('')}</div>`
    : '<p class="empty-projects">No projects yet</p>';
}

function bindEvents() {
  document.querySelectorAll('[data-action="toggle-edit"]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!editMode) {
        beginEditing('full');
        return;
      }

      discardDraft({ requireConfirm: true });
    });
  });

  document.querySelectorAll('[data-action="close-editor"]').forEach((button) => {
    button.addEventListener('click', () => {
      discardDraft({ requireConfirm: true });
    });
  });

  document.querySelectorAll('[data-action="commit-draft"]').forEach((button) => {
    button.addEventListener('click', commitDraft);
  });

  document.querySelectorAll('[data-action="discard-draft"]').forEach((button) => {
    button.addEventListener('click', () => {
      discardDraft();
    });
  });

  document.querySelectorAll('[data-action="open-full-editor"]').forEach((button) => {
    button.addEventListener('click', () => {
      beginEditing('full');
    });
  });

  document.querySelectorAll('[data-action="edit-section"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      beginEditing('section', event.currentTarget.dataset.category);
    });
  });

  document.querySelectorAll('[data-action="edit-skills-core"]').forEach((button) => {
    button.addEventListener('click', () => {
      beginEditing('skills-core');
    });
  });

  document.querySelectorAll('[data-action="edit-skills-certifications"]').forEach((button) => {
    button.addEventListener('click', () => {
      beginEditing('skills-certifications');
    });
  });

  document.querySelectorAll('[data-action="export"]').forEach((button) => {
    button.addEventListener('click', exportData);
  });

  document.querySelectorAll('[data-action="photo-upload"]').forEach((input) => {
    input.addEventListener('change', handlePhotoUpload);
  });

  document.querySelectorAll('[data-input]').forEach((input) => {
    const handleDraftInput = (event) => {
      setByPath(event.currentTarget.dataset.input, event.currentTarget.value, getEditorData());
      markDraftDirty();
    };

    input.addEventListener('input', handleDraftInput);
    input.addEventListener('change', handleDraftInput);
  });

  document.querySelectorAll('[data-field-input]').forEach((input) => {
    input.addEventListener('input', (event) => {
      applyEditableField(event.currentTarget.dataset.fieldInput, event.currentTarget.value);
      markDraftDirty();
    });
  });

  document.querySelectorAll('[data-skill-domain-input]').forEach((input) => {
    input.addEventListener('input', (event) => {
      const [domainId, prop] = event.currentTarget.dataset.skillDomainInput.split('.');
      updateSkillDomain(domainId, prop, event.currentTarget.value);
      markDraftDirty();
    });
  });

  document.querySelectorAll('[data-skill-item-input]').forEach((input) => {
    const handleSkillInput = (event) => {
      const [domainId, itemId, prop] = event.currentTarget.dataset.skillItemInput.split('.');
      updateSkillItem(domainId, itemId, prop, event.currentTarget.value);
      markDraftDirty();
      if (event.type === 'change' && prop === 'level') renderStable();
    };

    input.addEventListener('input', handleSkillInput);
    input.addEventListener('change', handleSkillInput);
  });

  document.querySelectorAll('[data-certificate-input]').forEach((input) => {
    input.addEventListener('input', (event) => {
      const [certificateId, prop] = event.currentTarget.dataset.certificateInput.split('.');
      updateCertificate(certificateId, prop, event.currentTarget.value);
      markDraftDirty();
    });
  });

  document.querySelectorAll('[data-item-input]').forEach((input) => {
    const handleItemInput = (event) => {
      const [categoryId, itemId, prop] = event.currentTarget.dataset.itemInput.split('.');
      updateItem(categoryId, itemId, prop, event.currentTarget.value);
      markDraftDirty();
      if (event.type === 'change' && prop === 'status') renderStable();
    };

    input.addEventListener('input', handleItemInput);
    input.addEventListener('change', handleItemInput);

  });

  document.querySelectorAll('[data-field]').forEach((field) => {
    field.addEventListener('blur', (event) => {
      applyEditableField(event.currentTarget.dataset.field, event.currentTarget.textContent.trim());
    });
  });

  document.querySelectorAll('[data-action="sort-achievements"]').forEach((control) => {
    const handleAchievementSort = (event) => {
      const shouldUseDraft = Boolean(event.currentTarget.closest('.editor-panel')) || (editMode && draftData);
      const targetData = shouldUseDraft ? getEditorData() : data;
      targetData.achievementSort = event.currentTarget.dataset.value || event.currentTarget.value;

      if (shouldUseDraft) {
        markDraftDirty();
        return;
      }

      saveData();
      render();
    };

    control.addEventListener(control.tagName === 'SELECT' ? 'change' : 'click', handleAchievementSort);
  });

  document.querySelectorAll('[data-action="sort-skill-domains"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      data.skillProfile.domainSort = event.currentTarget.dataset.value;
      saveData();
      render();
    });
  });

  document.querySelectorAll('[data-action="sort-certificates"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      data.skillProfile.certificateSort = event.currentTarget.dataset.value;
      saveData();
      render();
    });
  });

  const categorySelect = document.querySelector('[data-action="select-category"]');
  if (categorySelect) {
    categorySelect.addEventListener('change', (event) => {
      selectedCategoryId = event.currentTarget.value;
      renderStable();
    });
  }

  document.querySelectorAll('[data-action="select-category-row"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      selectedCategoryId = event.currentTarget.dataset.category;
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = addItem(event.currentTarget.dataset.category);
      if (id) pendingFocusSelector = `[data-editor-item="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteItem(event.currentTarget.dataset.category, event.currentTarget.dataset.item);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-category"]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = `category-${Date.now()}`;
      getEditorData().categories.push({
        id,
        title: 'New Category',
        count: 1,
        accent: '#4078b8',
        icon: 'article',
        items: [
          {
            id: `item-${Date.now()}`,
            title: 'New portfolio entry',
            source: 'Research note',
            date: 'Apr 2026',
            link: '',
          },
        ],
      });
      selectedCategoryId = id;
      editorScope = 'full';
      activeFilter = 'all';
      pendingFocusSelector = `[data-field-input="category.${id}.title"]`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-skill-domain"]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = addSkillDomain();
      if (id) pendingFocusSelector = `[data-skill-domain="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-skill-domain"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteSkillDomain(event.currentTarget.dataset.domain);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-skill-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = addSkillItem(event.currentTarget.dataset.domain);
      if (id) pendingFocusSelector = `[data-skill-item="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-skill-item"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteSkillItem(event.currentTarget.dataset.domain, event.currentTarget.dataset.skill);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="add-certificate"]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = addCertificate();
      if (id) pendingFocusSelector = `[data-certificate="${id}"] input`;
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="delete-certificate"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      deleteCertificate(event.currentTarget.dataset.certificate);
      markDraftDirty();
      renderStable();
    });
  });

  document.querySelectorAll('[data-action="open-modal"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      modalCategoryId = event.currentTarget.dataset.category;
      render();
    });
  });

  document.querySelectorAll('[data-action="close-modal"]').forEach((element) => {
    element.addEventListener('click', (event) => {
      if (event.currentTarget === event.target || event.currentTarget.classList.contains('modal-close')) {
        modalCategoryId = null;
        render();
      }
    });
  });

  document.querySelectorAll('[data-action="reset"]').forEach((button) => {
    button.addEventListener('click', () => {
      draftData = structuredClone(defaultData);
      selectedCategoryId = draftData.categories[0].id;
      editorScope = 'full';
      activeFilter = 'all';
      modalCategoryId = null;
      markDraftDirty();
      renderStable();
    });
  });
}

function refreshPreviewOnly() {
  document.querySelectorAll('[data-field]').forEach((field) => {
    const value = getValueByField(field.dataset.field);
    if (document.activeElement !== field && value !== undefined) {
      field.textContent = value;
    }
  });
}

function getValueByField(field) {
  if (field.startsWith('category.')) {
    const [, categoryId, prop] = field.split('.');
    return data.categories.find((category) => category.id === categoryId)?.[prop];
  }

  if (field.startsWith('item.')) {
    const [, categoryId, itemId, prop] = field.split('.');
    return data.categories
      .find((category) => category.id === categoryId)
      ?.items.find((item) => item.id === itemId)?.[prop];
  }

  return field.split('.').reduce((target, prop) => target?.[prop], data);
}

function applyEditableField(field, value) {
  if (field.startsWith('category.')) {
    const [, categoryId, prop] = field.split('.');
    const category = getEditorData().categories.find((item) => item.id === categoryId);
    if (category) category[prop] = value;
    return;
  }

  if (field.startsWith('item.')) {
    const [, categoryId, itemId, prop] = field.split('.');
    updateItem(categoryId, itemId, prop, value);
    return;
  }

  setByPath(field, value, getEditorData());
}

function setByPath(path, value, target = data) {
  const parts = path.split('.');
  let cursor = target;

  while (parts.length > 1) {
    cursor = cursor[parts.shift()];
  }

  cursor[parts[0]] = value;
}

function updateItem(categoryId, itemId, prop, value) {
  const category = getEditorData().categories.find((item) => item.id === categoryId);
  const item = category?.items.find((entry) => entry.id === itemId);
  if (item) item[prop] = value;
}

function addItem(categoryId) {
  const category = getEditorData().categories.find((item) => item.id === categoryId);
  if (!category) return '';

  const id = category.type === 'projects' ? `project-${Date.now()}` : `item-${Date.now()}`;

  if (category.type === 'projects') {
    category.items.push({
      id,
      title: 'New research project',
      source: 'Project donor',
      startDate: 'Apr 2026',
      endDate: 'Mar 2027',
      status: 'ongoing',
      link: '',
    });
    return id;
  }

  category.items.push({
    id,
    title: 'New portfolio entry',
    source: 'Research note',
    date: 'Apr 2026',
    link: '',
  });
  return id;
}

function sortedItems(items) {
  if (data.achievementSort === 'manual') return [...items];

  if (data.achievementSort === 'year-desc' || data.achievementSort === 'year-asc') {
    const direction = data.achievementSort === 'year-asc' ? 1 : -1;
    return [...items].sort((a, b) => {
      const aYear = yearForItem(a);
      const bYear = yearForItem(b);

      if (aYear === bYear) {
        return (parseWorkDate(sortDateForItem(a)) - parseWorkDate(sortDateForItem(b))) * direction;
      }

      return (aYear - bYear) * direction;
    });
  }

  const direction = data.achievementSort === 'oldest' ? 1 : -1;
  return [...items].sort((a, b) => {
    const aTime = parseWorkDate(sortDateForItem(a));
    const bTime = parseWorkDate(sortDateForItem(b));

    if (aTime === bTime) return 0;
    return (aTime - bTime) * direction;
  });
}

function sortDateForItem(item) {
  return item.endDate || item.startDate || item.date;
}

function yearForItem(item) {
  const year = extractYear(sortDateForItem(item));
  return year || 0;
}

function extractYear(value) {
  const match = String(value || '').match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : 0;
}

function formatProjectPeriod(item) {
  const start = String(item.startDate || '').trim();
  const end = String(item.endDate || '').trim() || (item.status === 'done' ? '' : 'Present');

  if (start && end) return `${start} - ${end}`;
  return start || end || 'Date not set';
}

function parseWorkDate(value) {
  const text = String(value || '').trim();
  if (!text) return Number.NEGATIVE_INFINITY;

  const normalized = text
    .replace(/(\d+)(st|nd|rd|th)/gi, '$1')
    .replace(/[.,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const year = extractYear(normalized);

  if (year) {
    const lower = normalized.toLowerCase();
    const monthEntry = [...monthLookup.entries()].find(([name]) => {
      return new RegExp(`(^|\\s)${name}(\\s|$)`, 'i').test(lower);
    });

    if (monthEntry) {
      return Date.UTC(year, monthEntry[1], 1);
    }

    const isoMonth = normalized.match(/\b(19|20)\d{2}[-/](0?[1-9]|1[0-2])\b/);
    if (isoMonth) {
      return Date.UTC(year, Number(isoMonth[2]) - 1, 1);
    }

    const slashMonth = normalized.match(/\b(0?[1-9]|1[0-2])[-/](19|20)\d{2}\b/);
    if (slashMonth) {
      return Date.UTC(year, Number(slashMonth[1]) - 1, 1);
    }
  }

  const parsed = Date.parse(normalized);
  if (!Number.isNaN(parsed)) return parsed;

  if (year) return Date.UTC(year, 0, 1);

  return Number.NEGATIVE_INFINITY;
}

function normalizeUrl(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function normalizeSkillType(type) {
  const normalized = String(type || '').trim();
  if (skillTypeOptions.includes(normalized)) return normalized;

  const matchingType = skillTypeOptions.find((typeName) => (
    skillTypeSchema[typeName].aliases.includes(normalized)
  ));
  if (matchingType) return matchingType;

  return 'Platform';
}

function normalizeSkillItem(item) {
  const normalizedItem = { ...item, type: normalizeSkillType(item.type) };
  const name = String(normalizedItem.name || '').toLowerCase();

  if (
    normalizedItem.type === 'Method'
    && (name.includes('skill.md') || name.includes('connector'))
  ) {
    normalizedItem.type = 'Technical';
  }

  return normalizedItem;
}

function normalizeSkillDomains(domains) {
  return structuredClone(domains).map((domain) => ({
    ...domain,
    items: Array.isArray(domain.items)
      ? domain.items.map((item) => normalizeSkillItem(item))
      : [],
  }));
}

function skillLevelRank(level) {
  return skillLevelOrder[level] ?? skillLevelOptions.length;
}

function sortedSkillItems(items) {
  return [...items].sort((a, b) => skillLevelRank(a.level) - skillLevelRank(b.level));
}

function sortedSkillDomains(domains, sort = 'count-desc') {
  const direction = sort === 'count-asc' ? 1 : -1;
  return [...domains].sort((a, b) => {
    const countDiff = ((a.items?.length || 0) - (b.items?.length || 0)) * direction;
    if (countDiff !== 0) return countDiff;
    return String(a.title || '').localeCompare(String(b.title || ''));
  });
}

function sortedCertificates(certificates, sort = 'latest') {
  const direction = sort === 'oldest' ? 1 : -1;
  return [...certificates].sort((a, b) => {
    const dateDiff = (parseWorkDate(a.date) - parseWorkDate(b.date)) * direction;
    if (dateDiff !== 0) return dateDiff;
    return String(a.title || '').localeCompare(String(b.title || ''));
  });
}

function deleteItem(categoryId, itemId) {
  const category = getEditorData().categories.find((item) => item.id === categoryId);
  if (!category) return;

  category.items = category.items.filter((item) => item.id !== itemId);
}

function categoryCount(category) {
  return Array.isArray(category.items) ? category.items.length : 0;
}

function syncCategoryCounts() {
  data.categories.forEach((category) => {
    category.count = categoryCount(category);
  });
}

function getOverviewStats() {
  const allItems = data.categories.flatMap((category) =>
    category.items.map((item) => ({ category, item }))
  );
  const nonProjectCategories = data.categories.filter((category) => category.type !== 'projects');
  const nonProjectItems = allItems.filter(({ category }) => category.type !== 'projects');
  const projectCategory = data.categories.find((category) => category.type === 'projects');
  const projectItems = projectCategory?.items || [];
  const years = allItems.map(({ item }) => yearForItem(item)).filter(Boolean);
  const uniqueYears = [...new Set(years)].sort((a, b) => a - b);
  const averagePerYear = uniqueYears.length
    ? (allItems.length / uniqueYears.length).toFixed(1).replace(/\.0$/, '')
    : '0';
  const topSection = data.categories.reduce(
    (top, category) => (categoryCount(category) > categoryCount(top) ? category : top),
    data.categories[0] || { title: 'None', items: [] }
  );

  return {
    total: nonProjectItems.length,
    categoryCount: nonProjectCategories.length,
    projects: projectItems.length,
    yearCount: uniqueYears.length,
    yearRange: uniqueYears.length
      ? `${uniqueYears[0]} - ${uniqueYears.at(-1)}`
      : 'No dated entries',
    projectYearRange: projectItems.length
      ? projectItems
        .map((item) => yearForItem(item))
        .filter(Boolean)
        .sort((a, b) => a - b)
        .reduce((range, year, index, years) => index === years.length - 1 ? `${years[0]} - ${year}` : range, '')
      : 'No project entries',
    averagePerYear,
    topSectionTitle: topSection.title || 'None',
    topSectionCount: categoryCount(topSection),
    latestYear: uniqueYears.at(-1) || 'None',
    latestYearCount: uniqueYears.length
      ? allItems.filter(({ item }) => yearForItem(item) === uniqueYears.at(-1)).length
      : 0,
  };
}

function findSkillDomain(domainId, target = getEditorData()) {
  return target.skillProfile.domains.find((domain) => domain.id === domainId);
}

function findSkillItem(domainId, itemId, target = getEditorData()) {
  return findSkillDomain(domainId, target)?.items.find((item) => item.id === itemId);
}

function updateSkillDomain(domainId, prop, value) {
  const domain = findSkillDomain(domainId);
  if (domain) domain[prop] = value;
}

function updateSkillItem(domainId, itemId, prop, value) {
  const item = findSkillItem(domainId, itemId);
  if (!item) return;

  item[prop] = prop === 'type' ? normalizeSkillType(value) : value;
}

function updateCertificate(certificateId, prop, value) {
  const certificate = getEditorData().skillProfile.certifications.find((item) => item.id === certificateId);
  if (certificate) certificate[prop] = value;
}

function addSkillDomain() {
  const id = `skill-domain-${Date.now()}`;
  getEditorData().skillProfile.domains.push({
    id,
    title: 'New Skill Domain',
    items: [
      {
        id: `skill-${Date.now()}`,
        name: 'New skill',
        type: 'Platform',
        level: 'Working',
      },
    ],
  });
  return id;
}

function deleteSkillDomain(domainId) {
  const editorData = getEditorData();
  editorData.skillProfile.domains = editorData.skillProfile.domains.filter((domain) => domain.id !== domainId);
}

function addSkillItem(domainId) {
  const domain = findSkillDomain(domainId);
  if (!domain) return '';

  const id = `skill-${Date.now()}`;
  domain.items.push({
    id,
    name: 'New skill',
    type: 'Platform',
    level: 'Working',
  });
  return id;
}

function deleteSkillItem(domainId, itemId) {
  const domain = findSkillDomain(domainId);
  if (!domain) return;

  domain.items = domain.items.filter((item) => item.id !== itemId);
}

function addCertificate() {
  const id = `cert-${Date.now()}`;
  getEditorData().skillProfile.certifications.push({
    id,
    title: 'New certificate',
    issuer: 'Issuing organization',
    date: 'Apr 2026',
    link: '',
  });
  return id;
}

function deleteCertificate(certificateId) {
  const editorData = getEditorData();
  editorData.skillProfile.certifications = editorData.skillProfile.certifications.filter(
    (certificate) => certificate.id !== certificateId
  );
}

function handlePhotoUpload(event) {
  const [file] = event.currentTarget.files;
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    event.currentTarget.setCustomValidity('Please use an image under 5MB.');
    event.currentTarget.reportValidity();
    return;
  }

  event.currentTarget.setCustomValidity('');
  compressProfilePhoto(file).then((photoDataUrl) => {
    data.profile.photo = photoDataUrl;
    if (draftData) {
      draftData.profile.photo = photoDataUrl;
      markDraftDirty();
    }
    saveData();
    render();
  }).catch(() => {
    event.currentTarget.setCustomValidity('This image could not be loaded. Please try a JPG, PNG, or WEBP file.');
    event.currentTarget.reportValidity();
  });
}

function compressProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', reject);
    reader.addEventListener('load', () => {
      const image = new Image();
      image.addEventListener('error', reject);
      image.addEventListener('load', () => {
        const maxSize = 900;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.84));
      });
      image.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
}

function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'tdri-researcher-portfolio.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

render();

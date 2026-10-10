/**
 * data/portfolio-data.js — single source of truth for portfolio content.
 *
 * Every project card, certification card and detail page (case study,
 * prototype page, certification journey) is rendered from this file by
 * render.js. Edit content here; never duplicate it into the HTML pages.
 *
 * Empty strings ("") mean "not provided yet". The UI renders a placeholder
 * slot or an inactive button for them instead of a broken link.
 */
(function () {
  'use strict';

  /* ───────────────────────────── PROJECTS ─────────────────────────────
   * Rendered in this exact order on the home page.
   *
   * Fields
   *   slug               unique id, also used in detail-page URLs
   *   title, category    card heading + category label
   *   type               'engineering' | 'design' | 'research' (drives CTA style)
   *   caseId, status     forensic-badge strip ({ label, tone: done|active|progress|planned })
   *   featured           shows the "✦ Featured" pill
   *   tags               filter-tab keys: web | mobile | ai | uiux
   *   cats               category pills ({ label, tone } → .pcat--<tone>)
   *   shortDescription   card copy
   *   description        long-form overview (detail pages)
   *   image              screenshot { src, alt } or null → visual panel { icon, label }
   *   report             key/value lines in the card's forensic report block
   *   technologies       tech tags (case-study hero)
   *   githubUrl, liveUrl, externalUrl (+ externalLabel), caseStudyUrl
   *   caseStudySections  structured case-study content (see render.js block types)
   * ──────────────────────────────────────────────────────────────────── */
  const projects = [
    /* ── 1. TRUSTORA ─────────────────────────────────────────────────── */
    {
      slug: 'trustora',
      title: 'Trustora',
      subtitle: 'Digital Trust Infrastructure for Social Commerce',
      category: 'Full-Stack · Applied AI',
      type: 'engineering',
      caseId: '#TR-001',
      status: { label: '✓ DEPLOYED', tone: 'done' },
      featured: true,
      tags: ['web', 'ai'],
      cats: [
        { label: 'Full Stack', tone: 'web' },
        { label: 'AI', tone: 'ai' },
        { label: 'Social Commerce', tone: 'commerce' },
      ],
      positioning:
        'Trustora is a full-stack digital trust infrastructure for social commerce, combining deterministic trust scoring, evidence-based verification, secure commerce workflows and grounded Gemini AI to help customers make more informed purchasing decisions.',
      shortDescription:
        'An AI-assisted, evidence-based digital trust platform for social commerce. Trustora helps customers evaluate SMEs through Digital Trust Passports while providing businesses with storefronts, products, orders, reviews, complaints and trust-building workflows.',
      description:
        'An AI-assisted, evidence-based digital trust platform for social commerce. Trustora helps customers evaluate SMEs through Digital Trust Passports while providing businesses with storefronts, products, orders, reviews, complaints and trust-building workflows.',
      image: { src: '/assets/Trustora Trust Passport Showcase.png', alt: 'Trustora System screenshot' },
      visual: { icon: 'shield-check', label: 'Digital Trust Passport' },
      report: [
        { key: 'STACK', val: 'Next.js · FastAPI · Supabase' },
        { key: 'AI', val: 'Google Gemini · Function Calling' },
        { key: 'TRUST', val: 'Deterministic Rules Engine' },
      ],
      technologies: [
        'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI',
        'Pydantic', 'PostgreSQL', 'Supabase', 'Google Gemini', 'REST API', 'RBAC',
        'RLS', 'AI/LLM', 'Function Calling', 'Vercel', 'Railway', 'GitHub',
      ],
      githubUrl: 'https://github.com/methsani-yowinma/trustora',
      liveUrl: 'https://trustora-dusky.vercel.app/',
      externalUrl: '',
      caseStudyUrl: '/projects/trustora/',
      heroImage: { src: '/assets/Friendly Futuristic Robot Mascot.png', alt: 'Trustora storefront with a Digital Trust Passport' },
      caseStudySections: [
        {
          id: 'overview', title: 'Overview', icon: 'layout-dashboard',
          blocks: [
            { type: 'lead', text: 'Trustora is a full-stack digital trust infrastructure for social commerce, combining deterministic trust scoring, evidence-based verification, secure commerce workflows and grounded Gemini AI to help customers make more informed purchasing decisions.' },
            { type: 'text', paragraphs: [
              'It is an AI-assisted, evidence-based digital trust platform. Customers evaluate SMEs through Digital Trust Passports, while businesses get storefronts, products, orders, reviews, complaints and trust-building workflows.',
            ] },
            { type: 'facts', items: [
              { k: 'Type', v: 'Full-stack web platform' },
              { k: 'Domain', v: 'Social commerce · Digital trust' },
              { k: 'Users', v: 'Customers · SMEs · Admins' },
              { k: 'Languages', v: 'English · Sinhala' },
            ] },
          ],
        },
        {
          id: 'problem', title: 'Problem', icon: 'circle-help',
          blocks: [
            { type: 'text', paragraphs: [
              'When buying from a small business through social media, a customer has to answer one question with very little to go on: can I trust this business, this product and this transaction?',
              'Legitimate SMEs face the opposite problem. They have few ways to prove they are genuine or to build a verifiable reputation that customers can check.',
            ] },
            { type: 'questions', items: ['Can I trust this business?', 'Can I trust this product?', 'Can I trust this transaction?'] },
          ],
        },
        {
          id: 'solution', title: 'Solution', icon: 'lightbulb',
          blocks: [
            { type: 'text', paragraphs: [
              'Trustora answers those questions with evidence instead of claims. It brings four capabilities together in one platform.',
            ] },
            { type: 'pillars', items: [
              { icon: 'scale', title: 'Deterministic trust scoring', text: 'A rules-based Trust Engine turns evidence into a reproducible trust score.' },
              { icon: 'file-check-2', title: 'Evidence-based verification', text: 'Business verification, reviews, complaints and transactions are recorded as evidence.' },
              { icon: 'shopping-bag', title: 'Secure commerce workflows', text: 'Storefronts, products, cart, checkout and orders run inside the platform.' },
              { icon: 'sparkles', title: 'Grounded Gemini AI', text: 'Gemini analyses and explains information, grounded in backend data.' },
            ] },
          ],
        },
        {
          id: 'core-concept', title: 'Core Concept', icon: 'git-commit-vertical',
          blocks: [
            { type: 'callout', tone: 'warn', icon: 'triangle-alert', title: 'Not an "AI trust scoring system"',
              text: 'The Trust Score is generated by a deterministic, rules-based Trust Engine. Gemini helps analyse and structure information, but it never arbitrarily determines the score.' },
            { type: 'pipeline', label: 'How a trust score is produced', steps: [
              { label: 'AI Interpretation', sub: 'Gemini analyses & structures', icon: 'sparkles', tone: 'ai' },
              { label: 'Backend Data', sub: 'Validated, stored evidence', icon: 'database', tone: 'data' },
              { label: 'Deterministic Business Rules', sub: 'Trust Engine', icon: 'scale', tone: 'rules' },
              { label: 'Trust Score', sub: 'Computed, not generated', icon: 'gauge', tone: 'score' },
              { label: 'Digital Trust Passport', sub: 'What the customer sees', icon: 'shield-check', tone: 'passport' },
            ] },
            { type: 'properties', label: 'This makes the trust score', items: [
              { icon: 'repeat', title: 'Reproducible', text: 'The same evidence always produces the same score.' },
              { icon: 'message-square-text', title: 'Explainable', text: 'Every score traces back to rules and evidence.' },
              { icon: 'file-search', title: 'Auditable', text: 'Inputs and outcomes can be reviewed after the fact.' },
              { icon: 'equal', title: 'Consistent', text: 'Every business is evaluated by the same rules.' },
              { icon: 'shield', title: 'Resistant to AI hallucination', text: 'A model cannot invent or inflate a score.' },
            ] },
            { type: 'note', text: 'Trust levels are always evidence-based and never claim that a seller is "100% safe".' },
          ],
        },
        {
          id: 'architecture', title: 'System Architecture', icon: 'network',
          blocks: [
            { type: 'architecture',
              actors: ['Customer', 'SME'],
              frontend: { title: 'Next.js Frontend', sub: 'TypeScript + Tailwind CSS', icon: 'monitor',
                items: ['Storefronts', 'Trust Passport', 'Products', 'Cart & Checkout', 'Orders', 'Reviews / Complaints', 'AI Assistant', 'Customer dashboard', 'SME dashboard'] },
              link: 'REST API',
              backend: { title: 'FastAPI Backend', sub: 'Python + Pydantic', icon: 'server',
                items: ['Authentication / RBAC', 'SME Management', 'Product Management', 'Commerce', 'Reviews & Complaints', 'Trust Engine', 'AI Orchestration', 'Audit / Security', 'Evidence Management'] },
              services: [
                { title: 'Supabase', icon: 'database', tone: 'data', items: ['PostgreSQL', 'Auth', 'Storage', 'RLS'] },
                { title: 'Trust Engine', icon: 'scale', tone: 'rules', items: ['Deterministic', 'Trust Scoring', 'Rules', 'Evidence'] },
                { title: 'Gemini AI', icon: 'sparkles', tone: 'ai', items: ['Analysis', 'Classification', 'Summarization', 'Tool Calling'] },
              ],
              output: { title: 'Digital Trust Passport', icon: 'shield-check' },
            },
          ],
        },
        {
          id: 'tech-stack', title: 'Technology Stack', icon: 'layers',
          blocks: [
            { type: 'groups', items: [
              { icon: 'monitor', title: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
              { icon: 'server', title: 'Backend', items: ['Python', 'FastAPI', 'Pydantic', 'REST API'] },
              { icon: 'database', title: 'Data & Identity', items: ['PostgreSQL', 'Supabase', 'Supabase Auth', 'Supabase Storage'] },
              { icon: 'sparkles', title: 'AI', items: ['Google Gemini', 'AI/LLM', 'Function Calling'] },
              { icon: 'lock', title: 'Security', items: ['RBAC', 'RLS'] },
              { icon: 'cloud', title: 'Delivery', items: ['Vercel', 'Railway', 'GitHub'] },
            ] },
          ],
        },
        {
          id: 'trust-passport', title: 'Digital Trust Passport', icon: 'id-card',
          blocks: [
            { type: 'text', paragraphs: [
              'The Digital Trust Passport is how customers evaluate an SME. It is the customer-facing result of the Trust Engine: a trust score and trust level, backed by the evidence that produced them.',
              'Because every transaction can add new evidence, the passport is not a one-off badge. It reflects a trust history that grows as the business trades on the platform.',
            ] },
            { type: 'passport' },
          ],
        },
        {
          id: 'trust-engine', title: 'Trust Engine', icon: 'scale',
          blocks: [
            { type: 'text', paragraphs: [
              'The Trust Engine is a deterministic, rules-based component in the backend. It gathers trust signals as evidence, applies weighted rules, and produces a trust score and trust level.',
            ] },
            { type: 'fanin',
              label: 'Evidence',
              inputs: [
                { icon: 'badge-check', label: 'Business Verification' },
                { icon: 'star', label: 'Reviews' },
                { icon: 'message-square-warning', label: 'Complaints' },
                { icon: 'receipt', label: 'Transactions' },
                { icon: 'package', label: 'Products' },
                { icon: 'radar', label: 'Other Trust Signals' },
              ],
              steps: [
                { label: 'Trust Rules Engine', icon: 'scale', tone: 'rules' },
                { label: 'Weighted Evaluation', icon: 'sliders-horizontal', tone: 'rules' },
                { label: 'Trust Score', icon: 'gauge', tone: 'score' },
                { label: 'Trust Level / Passport', icon: 'shield-check', tone: 'passport' },
              ],
            },
          ],
        },
        {
          id: 'ai-layer', title: 'AI Layer — Trustora AI', icon: 'sparkles',
          blocks: [
            { type: 'text', paragraphs: [
              'Google Gemini powers Trustora’s AI layer. It reads and structures unstructured content such as reviews, complaints and documents, explains trust results in plain language, and assists both customers and SMEs through an assistant that can call backend functions.',
            ] },
            { type: 'groups', items: [
              { icon: 'scan-search', title: 'Analyse', items: ['Review analysis', 'Complaint classification', 'Information extraction', 'Document analysis'] },
              { icon: 'message-square-text', title: 'Explain', items: ['Trust summaries', 'Natural-language explanations'] },
              { icon: 'bot', title: 'Assist', items: ['Customer assistance', 'SME assistance', 'Function / tool calling', 'Sinhala and English interactions'] },
            ] },
          ],
        },
        {
          id: 'ai-safety', title: 'AI Safety & Reliability', icon: 'shield-check',
          blocks: [
            { type: 'list', items: [
              { icon: 'scale', title: 'AI never sets the score', text: 'Gemini interprets and structures information; the Trust Engine’s deterministic rules compute the trust score.' },
              { icon: 'anchor', title: 'Grounded answers', text: 'Trustora AI is grounded in backend data and role-aware, so it answers from what the platform actually holds.' },
              { icon: 'wrench', title: 'Function calling, not guessing', text: 'The assistant retrieves information through backend functions instead of generating facts.' },
              { icon: 'server', title: 'Server-side only', text: 'Gemini is called from the backend only; API keys never reach the browser.' },
              { icon: 'life-buoy', title: 'Graceful fallback', text: 'Without an AI key, the platform keeps working and trust summaries fall back to a rules-based template.' },
            ] },
          ],
        },
        {
          id: 'social-commerce', title: 'Social Commerce Architecture', icon: 'share-2',
          blocks: [
            { type: 'commerceflow',
              source: { label: 'Social Media Presence', icon: 'share-2' },
              hub: { label: 'Trustora', icon: 'shield-check' },
              branches: [
                { label: 'Trust Passport', icon: 'id-card' },
                { label: 'Store', icon: 'store' },
                { label: 'Products', icon: 'package' },
              ],
              chain: [
                { label: 'Cart', icon: 'shopping-cart' },
                { label: 'Order', icon: 'clipboard-list' },
                { label: 'Transaction', icon: 'receipt' },
                { label: 'Review / Evidence', icon: 'star' },
                { label: 'Trust History', icon: 'history' },
              ],
            },
            { type: 'loop', label: 'The trust feedback loop',
              items: ['Business', 'Product', 'Transaction', 'Customer Experience', 'Evidence', 'Trust'] },
            { type: 'text', paragraphs: [
              'Every completed purchase can feed new evidence back into the Trust Engine, so trust is earned through real trading activity rather than self-declared.',
            ] },
          ],
        },
        {
          id: 'customer-features', title: 'Customer Features', icon: 'user',
          blocks: [
            { type: 'features', items: [
              { icon: 'id-card', label: 'Trust Passport' },
              { icon: 'store', label: 'Storefronts' },
              { icon: 'package', label: 'Products' },
              { icon: 'shopping-cart', label: 'Cart & Checkout' },
              { icon: 'clipboard-list', label: 'Orders' },
              { icon: 'star', label: 'Reviews / Complaints' },
              { icon: 'bot', label: 'AI Assistant' },
              { icon: 'layout-dashboard', label: 'Customer dashboard' },
            ] },
          ],
        },
        {
          id: 'sme-features', title: 'SME Features', icon: 'store',
          blocks: [
            { type: 'features', items: [
              { icon: 'store', label: 'Storefront' },
              { icon: 'package', label: 'Product management' },
              { icon: 'clipboard-list', label: 'Orders' },
              { icon: 'star', label: 'Reviews' },
              { icon: 'message-square-warning', label: 'Complaints' },
              { icon: 'badge-check', label: 'Trust-building workflows' },
              { icon: 'bot', label: 'SME assistance' },
              { icon: 'layout-dashboard', label: 'SME dashboard' },
            ] },
          ],
        },
        {
          id: 'reviews-complaints', title: 'Reviews & Complaints', icon: 'message-square-warning',
          blocks: [
            { type: 'text', paragraphs: [
              'Reviews and complaints are not just comments on a page. They are evidence: Gemini analyses reviews and classifies complaints, the results are stored by the backend, and the Trust Engine evaluates them alongside the business’s other trust signals.',
            ] },
            { type: 'pipeline', compact: true, steps: [
              { label: 'Review / Complaint', icon: 'message-square-text', tone: 'data' },
              { label: 'AI analysis & classification', icon: 'sparkles', tone: 'ai' },
              { label: 'Evidence', icon: 'file-check-2', tone: 'data' },
              { label: 'Trust Engine', icon: 'scale', tone: 'rules' },
              { label: 'Trust History', icon: 'history', tone: 'passport' },
            ] },
          ],
        },
        {
          id: 'security', title: 'Security Architecture', icon: 'lock',
          blocks: [
            { type: 'layers', items: [
              { icon: 'key-round', title: 'Supabase Auth', text: 'Authentication for every user.' },
              { icon: 'users', title: 'Role-Based Access Control', text: 'Three roles with separate permissions.', chips: ['CUSTOMER', 'SME', 'ADMIN'] },
              { icon: 'table-2', title: 'Row-Level Security', text: 'PostgreSQL / Supabase policies restrict which rows each user can read or change.' },
              { icon: 'server-cog', title: 'Backend isolation', text: 'Privileged service-role credentials stay server-side and never reach the client.' },
              { icon: 'file-search', title: 'Auditability', text: 'Actions and trust outcomes can be reviewed.' },
              { icon: 'file-lock-2', title: 'Evidence integrity', text: 'Evidence behind a trust score is protected from tampering.' },
            ] },
          ],
        },
        {
          id: 'api', title: 'API Architecture', icon: 'plug',
          blocks: [
            { type: 'text', paragraphs: [
              'The Next.js frontend talks to the FastAPI backend over a versioned REST API. Pydantic models validate every request and response, and the backend is organised as a modular monolith where each domain module has its own router, schemas and service layer.',
            ] },
            { type: 'pipeline', compact: true, steps: [
              { label: 'Next.js', icon: 'monitor', tone: 'data' },
              { label: 'REST API · /api/v1', icon: 'plug', tone: 'rules' },
              { label: 'Pydantic validation', icon: 'check-check', tone: 'rules' },
              { label: 'Domain modules', icon: 'boxes', tone: 'data' },
              { label: 'Supabase · Gemini', icon: 'database', tone: 'passport' },
            ] },
            { type: 'chips', label: 'Backend modules', items: ['Authentication / RBAC', 'SME Management', 'Product Management', 'Commerce', 'Reviews & Complaints', 'Trust Engine', 'AI Orchestration', 'Audit / Security', 'Evidence Management'] },
          ],
        },
        {
          id: 'deployment', title: 'Deployment Architecture', icon: 'cloud',
          blocks: [
            { type: 'deploy',
              entry: { label: 'Internet', icon: 'globe' },
              tiers: [
                { host: 'Vercel', role: 'Next.js Frontend', icon: 'triangle' },
                { link: 'HTTPS / REST API' },
                { host: 'Railway', role: 'FastAPI Backend', icon: 'train-front' },
              ],
              services: [
                { host: 'Supabase', role: 'PostgreSQL · Auth · Storage', icon: 'database' },
                { host: 'Google Gemini', role: 'AI capabilities', icon: 'sparkles' },
              ],
            },
          ],
        },
        {
          id: 'devops', title: 'Development & DevOps', icon: 'git-branch',
          blocks: [
            { type: 'list', items: [
              { icon: 'github', title: 'Source control', text: 'GitHub hosts the code, with work merged through pull requests.' },
              { icon: 'database-zap', title: 'Database migrations', text: 'SQL migrations are the single source of truth for the schema, constraints and RLS policies.' },
              { icon: 'notebook-pen', title: 'Architecture decision records', text: 'Key decisions, such as the deterministic Trust Engine and API-only database access, are documented as ADRs.' },
              { icon: 'flask-conical', title: 'Automated testing', text: 'Backend API and RLS tests (pytest), frontend unit tests (Vitest) and end-to-end tests (Playwright).' },
              { icon: 'list-checks', title: 'Quality gates', text: 'Linting, formatting and type checks (Ruff, ESLint, TypeScript) plus an i18n completeness check.' },
            ] },
          ],
        },
        {
          id: 'i18n', title: 'Internationalization', icon: 'languages',
          blocks: [
            { type: 'languages', items: [
              { code: 'EN', name: 'English', route: '/en' },
              { code: 'SI', name: 'Sinhala', route: '/si' },
            ] },
            { type: 'text', paragraphs: [
              'The interface is fully localised with locale-based routes, and Trustora AI holds conversations in both Sinhala and English.',
            ] },
          ],
        },
        {
          id: 'highlights', title: 'Engineering Highlights', icon: 'award',
          blocks: [
            { type: 'highlights', items: [
              'Deterministic Trust Engine kept separate from AI, so scores are reproducible and auditable',
              'Defence in depth: Supabase Auth, RBAC and PostgreSQL Row-Level Security',
              'Grounded, role-aware Gemini assistant using function calling',
              'Evidence-based feedback loop linking commerce activity to trust',
              'Bilingual product and AI experience in English and Sinhala',
              'Full-stack delivery across Vercel, Railway and Supabase',
            ] },
          ],
        },
        {
          id: 'github', title: 'GitHub', icon: 'github',
          blocks: [{ type: 'linkcard', kind: 'github' }],
        },
        {
          id: 'live-demo', title: 'Live Demo', icon: 'external-link',
          blocks: [{ type: 'linkcard', kind: 'live' }],
        },
      ],
    },

    /* ── 2. RIDEPULSE (existing content, unchanged) ──────────────────── */
    {
      slug: 'ridepulse',
      title: 'RidePulse System',
      category: 'Mobile · AI',
      type: 'engineering',
      caseId: '#RP-2024',
      status: { label: '● ACTIVE', tone: 'active' },
      featured: false,
      tags: ['mobile', 'ai'],
      cats: [
        { label: 'Mobile', tone: 'mobile' },
        { label: 'AI', tone: 'ai' },
        { label: 'Transport', tone: 'transport' },
      ],
      shortDescription:
        'Smart transportation platform connecting passengers, drivers, and transport authorities — real-time tracking, digital ticketing, and ML-powered demand forecasting.',
      image: { src: 'assets/ridepulse.png', alt: 'RidePulse System screenshot' },
      report: [
        { key: 'STACK', val: 'Flutter · Spring Boot · PostgreSQL' },
        { key: 'ML TOOLS', val: 'Python · Jupyter Notebooks' },
        { key: 'PATTERN', val: 'OOP · MVC · REST API' },
      ],
      githubUrl: 'https://github.com/Department-of-IT-FMSC-USJ/oop-project-final-group01_ridepulse',
      liveUrl: '',
      externalUrl: '',
      caseStudyUrl: '',
    },

    /* ── 3. AgriConnect ───────────── */
    {
      slug: 'agriconnect',
      title: 'AgriConnect',
      category: 'Full Stack · ML',
      type: 'engineering',
      caseId: '#AC-2024',
      status: { label: '● ACTIVE', tone: 'active' },
      featured: true,
      tags: ['web', 'ai'],
      cats: [
        { label: 'Full Stack', tone: 'web' },
        { label: 'ML', tone: 'ai' },
        { label: 'Agriculture', tone: 'agri' },
      ],
      shortDescription:
        'Digital marketplace bridging farmers and buyers with a Laravel backend and machine learning APIs for demand & price prediction.',
      image: { src: 'assets/agriconnect.png', alt: 'Farmer2Market screenshot' },
      report: [
        { key: 'STACK', val: 'HTML/CSS · Laravel · MySQL' },
        { key: 'ML TOOLS', val: 'Python · XGBoost · Prophet' },
        { key: 'PATTERN', val: 'MVC · RESTful · API-driven' },
      ],
      githubUrl: 'https://github.com/dilutha/farm-to-market',
      liveUrl: '',
      externalUrl: '',
      caseStudyUrl: '',
    },

    /* ── 4. WORKPULSE — UI/UX DESIGN ─────────────────────────────────── */
    {
      slug: 'workpulse',
      title: 'WorkPulse',
      subtitle: 'High-Fidelity Prototype',
      category: 'UI/UX Design',
      type: 'design',
      caseId: '#WP-001',
      status: { label: '✓ PROTOTYPE', tone: 'done' },
      featured: false,
      tags: ['uiux'],
      cats: [
        { label: 'UI/UX Design', tone: 'design' },
        { label: 'Figma', tone: 'design' },
      ],
      shortDescription:
        'UI/UX design project presented as a high-fidelity, interactive Figma prototype.',
      description:
        'WorkPulse is a UI/UX design project, presented as a high-fidelity interactive prototype built in Figma.',
      image: { src: '/assets/WorkPulse Productivity App Showcase.png', alt: 'WorkPulse Prototype screenshot' },
      visual: { icon: 'figma', label: 'High-Fidelity Prototype' },
      report: [
        { key: 'DISCIPLINE', val: 'UI/UX Design' },
        { key: 'TOOL', val: 'Figma' },
        { key: 'OUTPUT', val: 'High-Fidelity Prototype' },
      ],
      technologies: ['Figma', 'UI Design', 'UX Design', 'Prototyping'],
      githubUrl: '',
      liveUrl: '',
      externalUrl:
        'https://www.figma.com/proto/1WxBWJsEooEuTbglSLQ6Pl/WorkPulse---High-Fidelity-Prototype?node-id=287-133&starting-point-node-id=287%3A133&t=WRPyZDyOTo09IEIV-1',
      externalLabel: 'View Prototype',
      caseStudyUrl: '/projects/workpulse/',
      caseStudySections: [
        { id: 'challenge', title: 'Problem / Design Challenge', icon: 'circle-help', content: 'Young working professionals often struggle to capture and manage small tasks across fragmented workplace tools. Our interviews revealed that users rely on personal workarounds such as Notepad, WhatsApp and physical notebooks because formal tools can be slow or inconvenient for quick task capture. WorkPulse aims to bridge this gap through a lightweight, centralized experience for capturing, organizing and synchronizing everyday work tasks.' },
        { id: 'ux', title: 'User Experience', icon: 'smile', content: 'The user experience focuses on reducing friction, cognitive load and unnecessary context switching. WorkPulse allows users to capture tasks quickly, review daily priorities, manage task details, separate actionable tasks from notes and learnings and synchronize tasks with workplace tools. User feedback informed further improvements, including Completed Tasks, Undo, Sync Successful feedback, Synced History and a dedicated Notes section.' },
        { id: 'ui', title: 'User Interface', icon: 'layout-template', content: 'WorkPulse uses a clean, mobile-first interface with clear visual hierarchy, consistent navigation and recognizable interaction patterns. Task cards, priority indicators, due dates and prominent action buttons help users scan information quickly. Dedicated screens for Quick Capture, Task Details, Notes and Sync Center organize functionality into focused interactions while minimizing visual clutter.' },
        { id: 'process', title: 'Design Process', icon: 'workflow', content: 'We followed an iterative, user-centered design process inspired by Design Thinking. We interviewed three young working professionals, identified recurring frustrations, defined a problem statement and How Might We question, explored multiple solution concepts and selected WorkPulse. We then developed a high-fidelity Figma prototype, evaluated it with users and refined the design based on feedback.' },
        { id: 'ia', title: 'Information Architecture', icon: 'folder-tree', content: 'WorkPulse organizes information into distinct sections according to user needs: Dashboard, Quick Capture, Task Details, Completed Tasks, Notes, Sync Center and Synced History. This structure separates active work from completed activities, general notes and synchronization records. The goal is to help users locate relevant information quickly without overloading the main dashboard.' },
        { id: 'flows', title: 'User Flows', icon: 'route', content: 'The primary user flow follows Capture → Organize → Act. Users create a task through Quick Capture, specify details such as priority and due date, review or update the task and synchronize it with a workplace tool when required. Supporting flows allow users to mark tasks as completed, recover deleted tasks through Undo, access notes separately and verify synchronization through confirmation feedback and Synced History.' },
        { id: 'wireframes', title: 'Wireframes / High-Fidelity Design', icon: 'frame', content: 'We developed a high-fidelity, clickable Figma prototype to demonstrate the core WorkPulse experience. The initial screens cover the Dashboard, Quick Capture, Task Details, Sync Center and Sync Success. Further iterations introduced Completed Tasks, Undo, Notes and Synced History to address user feedback. The prototype communicates the intended interactions and user journey without requiring a fully implemented application.' },
        { id: 'visual', title: 'Visual Design', icon: 'palette', content: 'The visual design prioritizes clarity, consistency and ease of scanning. A restrained colour palette distinguishes primary actions, task priorities and important system feedback. Consistent cards, spacing, typography and navigation patterns support recognition and reduce unnecessary cognitive effort. Confirmation and warning states help users understand the consequences and outcomes of important actions.' },
        { id: 'decisions', title: 'Design Decisions', icon: 'git-fork', content: 'Our design decisions were guided by interview findings and usability feedback. Quick Capture reduces the effort required to record small tasks, while the Dashboard provides a consolidated daily view. Completed Tasks and Undo improve user control and recovery. Sync Successful feedback and Synced History improve system visibility and traceability. A dedicated Notes section separates actionable tasks from general information and learning points. These iterations prioritize meaningful usability improvements over purely cosmetic changes.' },
        { id: 'outcome', title: 'Final Outcome', icon: 'flag', content: 'The final WorkPulse concept is a personal micro-task management experience designed to bridge the gap between informal task capture and formal workplace systems. It combines quick capture, daily task visibility, task organization, notes, recovery options and workplace synchronization in one interface. The project demonstrates how user research, ideation, prototyping, usability feedback and iterative refinement can shape a solution around real user needs. The Figma prototype represents the intended experience; production integrations and their technical performance remain to be validated.' },
      ],
    },

    /* ── 5. CAREERFORGE — still building ─────────────────────────────── */
    {
      slug: 'careerforge',
      title: 'CareerForge',
      category: 'In Development',
      type: 'engineering',
      caseId: '#CF-001',
      status: { label: '◐ BUILDING', tone: 'progress' },
      featured: false,
      tags: [],
      cats: [{ label: 'In Development', tone: 'progress' }],
      shortDescription: 'Currently being built. Project details will be published when it is ready.',
      image: null,
      visual: { icon: 'hammer', label: 'Still building' },
      report: [{ key: 'STATUS', val: 'Still building' }],
      githubUrl: '',
      liveUrl: '',
      externalUrl: '',
      caseStudyUrl: '',
    },

    /* ── 6. BLOCKCHAIN-IOT — research project, to build ──────────────── */
    {
      slug: 'blockchain-iot-scf',
      title: 'Blockchain-IoT Secure Supply Chain Finance Platform',
      category: 'Research Project',
      type: 'research',
      caseId: '#BC-001',
      status: { label: '○ PLANNED', tone: 'planned' },
      featured: false,
      tags: [],
      cats: [{ label: 'Research Project', tone: 'research' }],
      shortDescription: 'Research project, planned to be built. Details will be published as the research progresses.',
      image: null,
      visual: { icon: 'blocks', label: 'Research Project' },
      report: [
        { key: 'TYPE', val: 'Research Project' },
        { key: 'STATUS', val: 'To build' },
      ],
      githubUrl: '',
      liveUrl: '',
      externalUrl: '',
      caseStudyUrl: '',
    },
  ];

  /* ────────────────────────── CERTIFICATIONS ──────────────────────────
   * Rendered in this order on the home page.
   *   status: 'done' | 'progress' | 'planned'
   *   journeyUrl: when set, the card opens a dedicated journey page.
   *
   * CCNA stages
   *   status: 'completed' | 'in-progress' | 'upcoming'
   *   courseName: official course title — left "" until confirmed
   *   certificateUrl / certificateImage / credlyUrl / credlyBadgeImage / evidenceUrl:
   *     paste real values here once available. Empty → placeholder slot.
   * ──────────────────────────────────────────────────────────────────── */
  const certifications = [
    {
      slug: 'ccna',
      title: 'Cisco CCNA',
      org: 'Cisco',
      issuer: 'Cisco Systems',
      icon: 'wifi',
      status: 'progress',
      statusLabel: 'In Progress',
      description: 'Networking fundamentals, routing & switching, IP connectivity, and network security essentials.',
      journeyUrl: '/certifications/ccna/',
      netacadUrl: 'https://www.netacad.com/profile?tab=badges',
      credlyProfileUrl: 'https://www.credly.com/users/methsani-yowinma',
      stages: [
        {
          stage: 1,
          title: 'Networking Basics',
          courseName: 'Introduction to Networks',
          status: 'completed',
          description: 'First stage of the CCNA pathway, covering networking foundations.',
          certificateUrl: 'https://www.netacad.com/certificates/?issuanceId=ec478460-b6b6-4f80-9381-ab47a2ef34dd',
          certificateImage: '/assets/CCNA - Introduction to Networks.png',
          credlyUrl: 'https://www.credly.com/badges/0a7cadf5-db10-4782-8078-8617f516610c/public_url',
          credlyBadgeImage: '/assets/CCNA - Introduction to Networks Badge.png',
        },
        {
          stage: 2,
          title: 'Intermediate Networking',
          courseName: 'Switching, Routing, and Wireless Essentials',
          status: 'completed',
          description: 'Second stage of the CCNA pathway, building on the networking foundations.',
          certificateUrl: 'https://www.netacad.com/certificates/?issuanceId=ec478460-b6b6-4f80-9381-ab47a2ef34dd',
          certificateImage: '/assets/CCNA - Switching, Routing, and Wireless Essentials.png',
          credlyUrl: 'https://www.credly.com/badges/49a1cdc5-efe5-4794-b0e6-dd4fe92c8bef/public_url',
          credlyBadgeImage: '/assets/CCNA - Switching, Routing, and Wireless Essentials Badge.png',
        },
        {
          stage: 3,
          title: 'CCNA Final Stage',
          courseName: 'Enterprise Networking, Security, and Automation',
          status: 'in-progress',
          description: 'Final stage of the CCNA pathway, currently in progress.',
          certificateUrl: '',
          certificateImage: '',
          credlyUrl: '',
          credlyBadgeImage: '',
          evidenceUrl: '',
        },
      ],
    },
    {
      slug: 'intro-iot',
      title: 'Introduction to IoT',
      org: 'Cisco Networking Academy',
      issuer: 'Cisco / NetAcad',
      icon: 'award',
      status: 'done',
      statusLabel: 'Completed',
      description: 'Fundamentals of the Internet of Things — connectivity, data collection, and smart device integration.',
      credentialUrl: 'https://www.netacad.com/profile?tab=badges',
    },
    {
      slug: 'cybersecurity-fundamentals',
      title: 'Cybersecurity Fundamentals',
      org: 'APNIC',
      issuer: 'APNIC Academy',
      icon: 'shield-check',
      status: 'done',
      statusLabel: 'Completed',
      description: 'Threat identification, risk assessment, and security best practices across networks and systems.',
      credentialUrl: 'https://academy.apnic.net/en/certificates/cybersecurity-fundamentals?course_id=26836&cert-nonce=1aaf3cf900',
    },
    {
      slug: 'diploma-english',
      title: 'Diploma in English',
      org: 'Sabaragamuwa University of Sri Lanka',
      issuer: 'SUSL',
      icon: 'book-open',
      status: 'done',
      statusLabel: 'Completed',
      description: 'Literature, grammar, and professional English communication skills.',
      credentialUrl: 'https://www.linkedin.com/in/methsani-yowinma-502787311/details/certifications/',
    },
    {
      slug: 'packet-tracer',
      title: 'Getting Started with Cisco Packet Tracer',
      org: 'Cisco Networking Academy',
      issuer: 'Cisco Networking Academy',
      icon: 'shield-check',
      status: 'done',
      statusLabel: 'Completed',
      description: 'Get familiar with the simulation environment and download the latest version.',
      credentialUrl: 'https://www.netacad.com/profile?tab=badges',
    },
    {
      slug: 'iot-packet-tracer',
      title: 'Exploring Internet of Things with Cisco Packet Tracer',
      org: 'Cisco Networking Academy',
      issuer: 'Cisco Networking Academy',
      icon: 'shield-check',
      status: 'done',
      statusLabel: 'Completed',
      description: 'Learn to add and configure IoT devices in Cisco Packet Tracer to set up a smart home network.',
      credentialUrl: 'https://www.netacad.com/profile?tab=badges',
    },
    {
      slug: 'security-plus',
      title: 'CompTIA Security+',
      org: 'CompTIA',
      issuer: 'CompTIA',
      icon: 'lock',
      status: 'planned',
      statusLabel: 'Planned',
      description: 'Core cybersecurity: threats, cryptography, network security, and risk management frameworks.',
      credentialUrl: '',
    },
  ];

   /* ──────────────────────────── LEADERSHIP ────────────────────────────
   * Source: "Leadership & Volunteering" and "Certifications & Memberships"
   * in the résumé PDF. Roles are listed in the résumé's order.
   *   current: true  → shows the "Current" marker
   *   events         → event names shown as chips on the role
   *   description    → optional one-liner; leave "" until written
   * ──────────────────────────────────────────────────────────────────── */
  const leadership = {
    roles: [
      {
        title: 'Co-Chairperson',
        events: ['Sparsha’26', 'DHack’26'],
        org: 'Students’ Association of Information Technology (S@IT)',
        period: 'Jan 2026 – Sep 2026',
        current: false,
        icon: 'crown',
        description: '',
        experienceUrl: '/leadership/usj-it-association-co-chairperson/',
      },
      {
        title: 'Executive Board Member',
        events: [],
        org: 'Students’ Association of Information Technology (S@IT)',
        period: 'Mar 2025 – Jan 2026',
        current: false,
        icon: 'users',
        description: '',
      },
      {
        title: 'Organizing Committee Member',
        events: ['Sparsha’25', 'DHack’25'],
        org: 'Students’ Association of Information Technology (S@IT)',
        period: 'Jul 2025 – Nov 2025',
        current: false,
        icon: 'calendar-check',
        description: '',
      },
      {
        title: 'Secretary',
        events: [],
        org: 'Commerce Association, R/Sivali Central College',
        period: '2021 – Dec 2022',
        current: false,
        icon: 'notebook-pen',
        description: '',
      },
    ],
    memberships: [
      { role: 'Member · Media Crew', org: 'ISACA Student Group USJ', icon: 'shield-check' },
      { role: 'Member', org: 'Students’ Association of Information Technology (S@IT), University of Sri Jayewardenepura', icon: 'users' },
      { role: 'Volunteer', org: 'Sinasara', icon: 'heart-handshake' },
    ],
    highlight: { title: 'Event coordination', text: 'Successfully coordinated multiple events', events: ['Sparsha', 'DHack'] },
    competencies: ['Event coordination', 'Team building', 'Stakeholder coordination', 'Project coordination', 'Agile/Scrum collaboration', 'Communication'],
  };

  /* ─────────────────────── LEADERSHIP EXPERIENCE ───────────────────────
   * Detail page: /leadership/usj-it-association-co-chairperson/
   * Event facts (programme, tracks, mission, workshops, links, artwork) are
   * the events' own published details. Role-specific lines come from the
   * résumé. Leave a field "" / [] to hide it — never fill it with guesses.
   * ──────────────────────────────────────────────────────────────────── */
  const leadershipExperience = [
    {
      slug: 'usj-it-association-co-chairperson',
      role: 'Co-Chairperson',
      organization: 'Students’ Association of Information Technology',
      institution: 'University of Sri Jayewardenepura',
      period: 'Jan 2026 – Present',
      sections: [
        { id: 'sparsha-2026', label: 'Sparsha 2026' },
        { id: 'dhack-26', label: 'DHACK’26' },
        { id: 'workshop-series', label: 'Workshop Series' },
      ],

      sparsha: {
        id: 'sparsha-2026',
        title: 'Sparsha 2026 — Successfully Done!',
        image: {
          src: '/assets/leadership/sparsha-2026.webp', width: 1536, height: 1024,
          alt: 'Sparsha 2026 collage: performers singing and dancing on stage, a band in front of the illuminated Sparsha logo screen, fireworks, and the crowd at the live concert',
        },
        status: 'Completed',
        role: 'Co-Chairperson, Students’ Association of Information Technology, University of Sri Jayewardenepura',
        experienceTitle: 'A talent show and a live concert',
        summary: 'Sparsha 2026 brought together a talent show and a live concert, creating an unforgettable experience for everyone involved.',
        highlights: [
          { icon: 'sparkles', title: 'Talent show', body: 'One half of the Sparsha 2026 programme.' },
          { icon: 'mic', title: 'Live concert', body: 'Brought together with the talent show in one event.' },
          { icon: 'users', title: 'Organizing team', body: 'Co-chaired the organizing team behind the event.' },
        ],
        leadershipTitle: 'Leading the event, together',
        responsibilities: [
          'Planning and organizing the event as Co-Chairperson',
          'Event coordination',
          'Team building',
          'Stakeholder coordination',
        ],
        /* Methsani's own reflection, in her words. Empty → placeholder. */
        reflection: [],
        teamwork: 'Brought to life through teamwork with contributors, supporters, performers, coordinators, and people working behind the scenes.',
        outcome: 'Successfully completed.',
      },

      dhack: {
        id: 'dhack-26',
        title: 'DHACK’26',
        subtitle: 'The Ultimate Designathon Challenge',
        image: {
          src: '/assets/leadership/dhack-26.webp', width: 1000, height: 1000,
          alt: 'DHACK’26 participants, judges, and organizers gathered in front of the University of Sri Jayewardenepura board, under the banner ‘The Ultimate Designathon Challenge — Successfully Concluded’',
        },
        status: 'Successfully concluded',
        role: 'Co-Chairperson — Students’ Association of Information Technology',
        roleDetail: 'Co-chaired DHACK’26 for the Students’ Association of Information Technology, University of Sri Jayewardenepura.',
        organizer: ['Department of Information Technology', 'University of Sri Jayewardenepura', 'Nugegoda, Sri Lanka'],
        overviewTitle: 'A multi-category AI innovation challenge',
        overview: 'DHACK’26 was designed as a multi-category AI innovation challenge where participants created sustainable, human-centered digital solutions — open to university teams, school students, and ReBrand participants.',
        mission: 'To cultivate a culture of innovation among school students and university participants by empowering them to solve real-world challenges through creativity, collaboration, and human-centered design.',
        focus: ['AI-assisted digital solutions', 'Sustainability', 'Human-centered design', 'Creativity', 'Collaboration', 'Innovation'],
        tracks: [
          { name: 'Inter-University — Innovation', icon: 'graduation-cap',
            audience: 'Undergraduate teams from recognized universities',
            requirements: ['Exactly 3 members', 'University, faculty, degree program, and student ID'] },
          { name: 'InterSchool — Innovation', icon: 'school',
            audience: 'School-level innovation track',
            requirements: ['Exactly 5 members', 'School students', 'Teacher guidance', 'Parent / guardian contact details', 'One team per school'] },
          { name: 'ReBrand Hackathon', icon: 'palette',
            audience: 'Faculty-exclusive brand and UI/UX challenge for FMSC students at the University of Sri Jayewardenepura',
            requirements: ['Exactly 5 FMSC students', '3 Business Information Systems students', '2 members from other FMSC departments'] },
        ],
        contributionTitle: 'Co-chairing DHACK’26',
        leadershipThemes: ['Event coordination', 'Team building', 'Stakeholder coordination', 'Project coordination', 'Collaboration'],
        /* Methsani's own hands-on work for DHACK, if any. Empty → hidden. */
        contributions: [],
        links: [
          { label: 'DHACK on Facebook', href: 'https://www.facebook.com/share/1FGGHtX9Wv/?mibextid=wwXIfr', icon: 'facebook' },
          { label: 'dhack.lk', href: 'https://dhack.lk', icon: 'arrow-up-right' },
        ],
      },

      workshops: {
        id: 'workshop-series',
        kicker: 'DHACK’26',
        intro: 'Four workshops spanning the path from framing a real-world problem to validating a user-centered solution.',
        items: [
          { title: 'Design Thinking for Impact', body: 'Frame real-world problems with empathy, research, and SDGs.' },
          { title: 'AI-Enabled Product Strategy', body: 'Turn AI capabilities into usable, responsible digital products.' },
          { title: 'UI Systems and Prototyping', body: 'Create polished interfaces, design systems, and prototypes.' },
          { title: 'UX Validation', body: 'Test concepts, improve flows, and present user-centered evidence.' },
        ],
      },
    },
  ];

  window.PORTFOLIO_DATA = Object.freeze({ projects, certifications, leadership, leadershipExperience });
})();

/**
 * page.js — standalone Co-Chairperson leadership page.
 * Self-contained: content, renderer and the page behaviours it needs
 * (nav, mobile menu, cursor, scroll reveal). Needs only /style.css.
 * Edit the content in `leadershipExperience` below.
 */
(function () {
  'use strict';

  /* ── Content ────────────────────────────────────────────────── */
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
          src: '/leadership/usj-it-association-co-chairperson/sparsha-2026.webp', width: 1536, height: 1024,
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
        reflection: ['Proud to have successfully completed Sparsha 2026 as the Co-Chairperson of the Sparsha 2026 that organized Student Association of Information Technology, University of Sri Jayewardenepura (USJ). From planning and organizing to performing on stage, this journey challenged us to lead under pressure, make quick decisions, manage responsibilities, and work together as a team. Sparsha 2026 brought together a talent show and a live concert, creating an unforgettable experience for everyone involved. Being part of both the organizing team and the performance made this event even more meaningful. What started as an idea became a reality through countless hours of teamwork, dedication, and commitment. A huge thank you to everyone who contributed, supported, performed, coordinated, and worked behind the scenes to make Sparsha 2026 a success'],
        teamwork: 'Brought to life through teamwork with contributors, supporters, performers, coordinators, and people working behind the scenes.',
        outcome: 'Successfully completed.',
      },

      dhack: {
        id: 'dhack-26',
        title: 'DHACK’26',
        subtitle: 'The Ultimate Designathon Challenge',
        image: {
          src: '/leadership/usj-it-association-co-chairperson/dhack-26.webp', width: 1000, height: 1000,
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
        contributions: ['Leadership & Team Coordination: Cross-functional collaboration and committee coordination. Project & Event Management : Planning, milestones, competition stages and execution. Stakeholder Engagement : Coordination with participants, judges and external parties.'],
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


  /* ── Helpers ────────────────────────────────────────────────── */
  const esc = (v) => String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /** True only for absolute http(s) URLs or site-relative paths. */
  const isUrl = (v) => {
    if (typeof v !== 'string' || !v.trim()) return false;
    if (v.startsWith('/') || /^assets\//.test(v)) return true;
    try { const u = new URL(v); return u.protocol === 'https:' || u.protocol === 'http:'; }
    catch (_) { return false; }
  };

  /* Lucide 1.x no longer ships brand icons, so brands are inline SVG (Simple Icons, CC0). */
  const BRAND = {
    facebook: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    figma: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
  };

  const icon = (name, cls = '') => BRAND[name]
    ? `<svg class="brand-ico${cls ? ` ${cls}` : ''}" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${BRAND[name]}"/></svg>`
    : `<i data-lucide="${esc(name)}"${cls ? ` class="${cls}"` : ''} aria-hidden="true"></i>`;

  /** Secure external-link attributes with an accessible "opens in new tab" hint. */
  const ext = (label) => `target="_blank" rel="noopener noreferrer" aria-label="${esc(label)} (opens in a new tab)"`;

  const pad = (n) => String(n).padStart(2, '0');

  /* ══════════════════════════════════════════════════════════════
     PAGE: LEADERSHIP EXPERIENCE
  ══════════════════════════════════════════════════════════════ */
  const evImage = (im, cls = '') => `
    <div class="lx-img ${cls}" style="aspect-ratio:${im.width} / ${im.height}">
      ${isUrl(im.src)
        ? `<img src="${esc(im.src)}" alt="${esc(im.alt)}" width="${im.width}" height="${im.height}" loading="lazy" decoding="async"
             onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'lx-img__ph',textContent:'Event photo coming soon'}))">`
        : `<span class="lx-img__ph" role="img" aria-label="${esc(im.alt)}">Event photo coming soon</span>`}
    </div>`;

  const evSection = (kicker, title, body) => `
    <section class="lx-sub reveal">
      <p class="lx-kicker">${esc(kicker)}</p>
      <h3 class="lx-h3">${esc(title)}</h3>
      <div class="lx-sub__body">${body}</div>
    </section>`;

  const done = (label) => `<span class="lx-done">${icon('circle-check')} ${esc(label)}</span>`;

  function lxSparsha(e) {
    const reflection = (e.reflection || []).length
      ? `<blockquote class="lx-quote__body">${e.reflection.map((t) => `<p>${esc(t)}</p>`).join('')}</blockquote>`
      : `<p class="lx-quote__ph">${icon('pen-line')} Reflection will be added</p>`;
    return `
      <section class="lx-sec" id="${esc(e.id)}" aria-labelledby="${esc(e.id)}-title">
        <p class="lx-num">01 — Sparsha 2026</p>
        <h2 class="lx-h2" id="${esc(e.id)}-title"><span class="lx-h2__ico">${icon('drama')}</span>${esc(e.title)}</h2>
        ${evImage(e.image, 'lx-img--wide reveal')}
        <div class="lx-pills">${done(e.status)}<span class="lx-role-pill">Role · ${esc(e.role)}</span></div>

        ${evSection('Event experience', e.experienceTitle, `
          <p class="cs-p">${esc(e.summary)}</p>
          <ul class="lx-cards lx-cards--3">${e.highlights.map((h) => `
            <li class="lx-card">${icon(h.icon)}<h4>${esc(h.title)}</h4><p>${esc(h.body)}</p></li>`).join('')}</ul>`)}

        ${evSection('Leadership & teamwork', e.leadershipTitle, `
          <ul class="lx-resp">${e.responsibilities.map((r) => `<li><span class="lx-dot" aria-hidden="true"></span>${esc(r)}</li>`).join('')}</ul>
          <figure class="lx-quote">
            <span class="lx-quote__mark" aria-hidden="true">${icon('quote')}</span>
            <figcaption class="lx-kicker">Reflection</figcaption>
            ${reflection}
          </figure>
          <div class="lx-cards lx-cards--2">
            <div class="lx-card">${icon('heart-handshake')}<h4>Teamwork</h4><p>${esc(e.teamwork)}</p></div>
            <div class="lx-card lx-card--ok">${icon('circle-check')}<h4>Outcome</h4><p>${esc(e.outcome)}</p></div>
          </div>`)}
      </section>`;
  }

  function lxDhack(e) {
    const contributions = (e.contributions || []).length ? `
      <p class="lx-kicker lx-kicker--muted">Also built for DHACK</p>
      <ul class="lx-cards lx-cards--2">${e.contributions.map((c) => `
        <li class="lx-card"><h4>${esc(c.title)}</h4><p>${esc(c.body)}</p>
          ${isUrl(c.href) ? `<a href="${esc(c.href)}" class="lx-link" ${ext(c.title)}>${esc(c.label || 'View')} ${icon('arrow-up-right')}</a>` : ''}</li>`).join('')}</ul>` : '';
    return `
      <section class="lx-sec" id="${esc(e.id)}" aria-labelledby="${esc(e.id)}-title">
        <p class="lx-num">02 — ${esc(e.title)}</p>
        <h2 class="lx-h2" id="${esc(e.id)}-title">${esc(e.subtitle)} ${esc(e.title)}</h2>

        <div class="lx-split reveal">
          ${evImage(e.image, 'lx-img--square')}
          <div>
            ${done(e.status)}
            <dl class="lx-facts">
              <div class="lx-fact lx-fact--role"><dt>${icon('crown')} My role</dt><dd><strong>${esc(e.role)}</strong></dd><dd>${esc(e.roleDetail)}</dd></div>
              <div class="lx-fact"><dt>Organized by</dt><dd>${esc(e.organizer.join(', '))}</dd></div>
            </dl>
            <div class="lx-ext">${e.links.filter((l) => isUrl(l.href)).map((l) => `
              <a href="${esc(l.href)}" class="lx-ext__pill" ${ext(l.label)}>${l.icon === 'facebook' ? icon('facebook') : ''} ${esc(l.label)} ${l.icon !== 'facebook' ? icon('arrow-up-right') : ''}</a>`).join('')}</div>
          </div>
        </div>

        ${evSection('Overview', e.overviewTitle, `
          <p class="cs-p">${esc(e.overview)}</p>
          <figure class="lx-mission"><figcaption class="lx-kicker">${icon('target')} Mission</figcaption>
            <blockquote>“${esc(e.mission)}”</blockquote></figure>
          <p class="lx-kicker lx-kicker--muted">Core focus</p>
          <ul class="lx-chips">${e.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>`)}

        ${evSection('Competition tracks', 'Three tracks, three audiences', `
          <ul class="lx-cards lx-cards--3">${e.tracks.map((t) => `
            <li class="lx-card lx-track">
              <span class="lx-track__ico">${icon(t.icon)}</span>
              <h4>${esc(t.name)}</h4><p>${esc(t.audience)}</p>
              <ul class="lx-track__req">${t.requirements.map((r) => `<li><span class="lx-dot" aria-hidden="true"></span>${esc(r)}</li>`).join('')}</ul>
            </li>`).join('')}</ul>`)}

        ${evSection('My contribution', e.contributionTitle, `
          <div class="lx-contrib">
            <p class="lx-kicker">${icon('crown')} Co-Chairperson</p>
            <p class="lx-contrib__role">${esc(e.role)}</p>
            <p class="cs-p">${esc(e.roleDetail)}</p>
            <ul class="lx-chips lx-chips--accent" aria-label="Leadership areas">${e.leadershipThemes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>
          ${contributions}`)}
      </section>`;
  }

  function lxWorkshops(w) {
    return `
      <section class="lx-sec" id="${esc(w.id)}" aria-labelledby="${esc(w.id)}-title">
        <p class="lx-num">03 — ${esc(w.kicker)}</p>
        <h2 class="lx-h2" id="${esc(w.id)}-title">Workshop Series</h2>
        <p class="cs-p">${esc(w.intro)}</p>
        <div class="lx-tree">
          <span class="lx-tree__root">${icon('lightbulb')} Workshop Series</span>
          <ol class="lx-tree__list">${w.items.map((it, i) => `
            <li class="lx-tree__item reveal">
              <div class="lx-ws"><span class="lx-ws__n">${pad(i + 1)}</span>
                <div><p class="lx-ws__k">Workshop ${i + 1}</p><h3>${esc(it.title)}</h3><p>“${esc(it.body)}”</p></div></div>
            </li>`).join('')}</ol>
        </div>
      </section>`;
  }

  function renderLeadershipDetail(root, x) {
    const back = `<a href="/#leadership" class="cs-back">${icon('arrow-left')} Back to Leadership</a>`;
    root.innerHTML = `
      <article class="lx">
        <div class="container lx-wrap">
          ${back}
          <header class="lx-hero">
            <span class="lx-hero__ico">${icon('crown')}</span>
            <div>
              <p class="lx-kicker">Leadership Experience · ${esc(x.period)}</p>
              <h1 class="lx-title">${esc(x.role)}</h1>
              <p class="lx-hero__org">${esc(x.organization)}</p>
              <p class="lx-hero__inst">${esc(x.institution)}</p>
            </div>
          </header>
          <nav class="lx-nav" aria-label="Sections on this page">
            <p class="lx-kicker lx-kicker--muted">On this page</p>
            <ul>${x.sections.map((s) => `<li><a href="#${esc(s.id)}">${esc(s.label)}</a></li>`).join('')}</ul>
          </nav>
          <div class="lx-body">
            ${lxSparsha(x.sparsha)}
            ${lxDhack(x.dhack)}
            ${lxWorkshops(x.workshops)}
          </div>
          <div class="lx-foot">${back}</div>
        </div>
      </article>`;
  }


  /* ── Render ─────────────────────────────────────────────────── */
  const page = document.querySelector('[data-page="leadership-detail"]');
  const item = leadershipExperience.find((x) => x.slug === page.dataset.slug);
  if (item) renderLeadershipDetail(page, item);
  if (window.lucide) window.lucide.createIcons();

  /* ── Page behaviours ────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navLinks');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    const [a, b, c] = toggle.querySelectorAll('span');
    a.style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
    b.style.opacity = open ? '0' : '';
    c.style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

  document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - nav.offsetHeight - 16, behavior: 'smooth' });
  }));

  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('is-vis'); io.unobserve(en.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }) : null;
  document.querySelectorAll('.reveal').forEach((el) => io ? io.observe(el) : el.classList.add('is-vis'));

  /* style.css hides the system cursor on mouse devices, so draw the custom one */
  const dot = document.getElementById('cursor'), ring = document.getElementById('cursorRing');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
    (function loop() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop); })();
  }
})();

/**
 * render.js — builds portfolio UI from data/portfolio-data.js.
 *
 * Load order on every page:  data/portfolio-data.js → render.js → script.js
 * render.js runs synchronously, so the markup it creates exists before
 * script.js wires up scroll-reveal, filter tabs and cursor effects.
 *
 *   #projectsGrid                 → project cards (home)
 *   #certsGrid                    → certification cards (home)
 *   [data-page="case-study"]      → engineering case study  (data-slug)
 *   [data-page="design-study"]    → UI/UX project page       (data-slug)
 *   [data-page="cert-journey"]    → certification journey    (data-slug)
 */
(function () {
  'use strict';

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  /* ── Helpers ───────────────────────────────────────────────── */
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
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    figma: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
  };

  const icon = (name, cls = '') => BRAND[name]
    ? `<svg class="brand-ico${cls ? ` ${cls}` : ''}" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${BRAND[name]}"/></svg>`
    : `<i data-lucide="${esc(name)}"${cls ? ` class="${cls}"` : ''} aria-hidden="true"></i>`;

  /** Secure external-link attributes with an accessible "opens in new tab" hint. */
  const ext = (label) => `target="_blank" rel="noopener noreferrer" aria-label="${esc(label)} (opens in a new tab)"`;

  const pad = (n) => String(n).padStart(2, '0');
  const findBySlug = (list, slug) => list.find((x) => x.slug === slug);

  /* ══════════════════════════════════════════════════════════════
     HOME — PROJECT CARDS
  ══════════════════════════════════════════════════════════════ */
  function projectActions(p) {
    const out = [];
    if (p.type === 'design' && isUrl(p.externalUrl)) {
      out.push(`<a href="${esc(p.externalUrl)}" class="proj-link proj-link--design" ${ext(`${p.externalLabel || 'View Prototype'} — ${p.title}`)}>
        ${icon('figma')} ${esc(p.externalLabel || 'View Prototype')} ${icon('arrow-up-right')}</a>`);
    }
    if (isUrl(p.caseStudyUrl)) {
      out.push(`<a href="${esc(p.caseStudyUrl)}" class="proj-link${p.type === 'design' ? '' : ' proj-link--primary'}" aria-label="Read the ${esc(p.title)} case study">
        ${p.type === 'design' ? 'Case Study' : 'Read Case Study'} ${icon('arrow-right')}</a>`);
    } else if (isUrl(p.githubUrl)) {
      out.push(`<a href="${esc(p.githubUrl)}" class="proj-link" ${ext(`View ${p.title} on GitHub`)}>View Project ${icon('arrow-right')}</a>`);
    }
    if (isUrl(p.caseStudyUrl)) {
      const mini = [];
      if (isUrl(p.githubUrl)) mini.push(`<a href="${esc(p.githubUrl)}" class="proj-icon-link" ${ext(`${p.title} source code on GitHub`)}>${icon('github')}</a>`);
      if (isUrl(p.liveUrl)) mini.push(`<a href="${esc(p.liveUrl)}" class="proj-icon-link" ${ext(`${p.title} live demo`)}>${icon('external-link')}</a>`);
      if (mini.length) out.push(`<span class="proj-icon-links">${mini.join('')}</span>`);
    }
    return out.length ? `<div class="proj-actions">${out.join('')}</div>` : '';
  }

  function projectOverlay(p) {
    const links = [];
    if (p.type === 'design' && isUrl(p.externalUrl)) {
      links.push(`<a href="${esc(p.externalUrl)}" class="overlay-link" ${ext(`${p.externalLabel || 'View Prototype'} — ${p.title}`)} tabindex="-1">${icon('figma')} ${esc(p.externalLabel || 'View Prototype')}</a>`);
    }
    if (isUrl(p.caseStudyUrl) && p.type !== 'design') {
      links.push(`<a href="${esc(p.caseStudyUrl)}" class="overlay-link" tabindex="-1">${icon('book-open')} Case Study</a>`);
    }
    if (isUrl(p.githubUrl)) {
      links.push(`<a href="${esc(p.githubUrl)}" class="overlay-link" ${ext(`View ${p.title} on GitHub`)} tabindex="-1">${icon('github')} ${isUrl(p.caseStudyUrl) ? 'GitHub' : 'View on GitHub'}</a>`);
    }
    if (isUrl(p.liveUrl)) {
      links.push(`<a href="${esc(p.liveUrl)}" class="overlay-link" ${ext(`${p.title} live demo`)} tabindex="-1">${icon('external-link')} Live</a>`);
    }
    /* Overlay links duplicate the card actions, so they are hidden from
       keyboard/AT users (tabindex -1 + aria-hidden) to avoid double stops. */
    return links.length ? `<div class="proj-overlay" aria-hidden="true">${links.join('')}</div>` : '';
  }

  function projectMedia(p) {
    if (p.image && isUrl(p.image.src)) {
      return `<div class="proj-img"><img src="${esc(p.image.src)}" alt="${esc(p.image.alt || p.title)}" class="proj-photo" loading="lazy"></div>`;
    }
    const v = p.visual || { icon: 'folder', label: p.category };
    return `<div class="proj-img proj-visual proj-visual--${esc(p.type)}" aria-hidden="true">
        <div class="proj-visual__grid"></div>
        <div class="proj-visual__inner">
          <span class="proj-visual__ico">${icon(v.icon)}</span>
          <span class="proj-visual__label">${esc(v.label)}</span>
        </div>
      </div>`;
  }

  function projectCard(p, i) {
    const cls = ['proj-card', 'reveal'];
    if (p.featured) cls.push('proj-card--featured');
    if (p.type === 'design') cls.push('proj-card--design');
    if (p.type === 'research' || (p.status && /progress|planned/.test(p.status.tone))) cls.push('proj-card--pending');
    const tone = { done: 'done', active: 'active', progress: 'progress', planned: 'planned' }[p.status?.tone] || 'active';

    return `
      <article class="${cls.join(' ')}" data-tags="${esc((p.tags || []).join(' '))}" aria-labelledby="proj-${esc(p.slug)}">
        <div class="proj-card__img-wrap">
          ${projectMedia(p)}
          ${projectOverlay(p)}
          ${p.featured ? '<div class="featured-pill">✦ Featured</div>' : ''}
          <span class="proj-num" aria-hidden="true">${pad(i + 1)}</span>
        </div>
        <div class="forensic-badge">
          <div class="forensic-badge__row"><span class="fb-key">CASE ID</span><span class="fb-val">${esc(p.caseId)}</span></div>
          <div class="forensic-badge__row"><span class="fb-key">STATUS</span><span class="fb-val fb-val--${tone}">${esc(p.status?.label || '')}</span></div>
        </div>
        <div class="proj-body">
          <div class="proj-cats">${(p.cats || []).map((c) => `<span class="pcat pcat--${esc(c.tone)}">${esc(c.label)}</span>`).join('')}</div>
          <h3 class="proj-title" id="proj-${esc(p.slug)}">${esc(p.title)}</h3>
          ${p.subtitle ? `<p class="proj-subtitle">${esc(p.subtitle)}</p>` : ''}
          <p class="proj-desc">${esc(p.shortDescription)}</p>
          ${(p.report || []).length ? `<div class="forensic-report">${p.report.map((r) =>
            `<div class="fr-line"><span class="fr-key">${esc(r.key)}</span><span class="fr-sep">:</span><span class="fr-val">${esc(r.val)}</span></div>`).join('')}</div>` : ''}
          ${projectActions(p)}
        </div>
      </article>`;
  }

  /* ══════════════════════════════════════════════════════════════
     HOME — CERTIFICATION CARDS
  ══════════════════════════════════════════════════════════════ */
  function stageCounts(c) {
    const stages = c.stages || [];
    return { total: stages.length, done: stages.filter((s) => s.status === 'completed').length };
  }

  function certCard(c) {
    const done = c.status === 'done';
    const journey = isUrl(c.journeyUrl);
    const cls = ['cert-card', 'reveal', done ? 'cert-card--done' : 'cert-card--soon'];
    if (journey) cls.push('cert-card--journey');

    let progress = '';
    if (journey && c.stages) {
      const { total, done: d } = stageCounts(c);
      progress = `
        <div class="cert-stages" role="img" aria-label="${d} of ${total} stages completed">
          ${c.stages.map((s) => `<span class="cert-stage cert-stage--${esc(s.status)}"></span>`).join('')}
          <span class="cert-stages__txt">${d}/${total} stages</span>
        </div>`;
    }

    const statusRow = done
      ? `<span class="cl-row"><span class="cl-key">VERIFIED</span><span class="cl-val">✓ Credential Issued</span></span>`
      : `<span class="cl-row"><span class="cl-key">STATUS</span><span class="cl-val cl-pending">⟳ ${esc(c.statusLabel)}</span></span>`;

    let link;
    if (journey) {
      link = `<a href="${esc(c.journeyUrl)}" class="cert-link cert-link--journey cert-card__stretch">View Journey ${icon('arrow-right')}</a>`;
    } else if (isUrl(c.credentialUrl)) {
      link = `<a href="${esc(c.credentialUrl)}" class="cert-link" ${ext(`View ${c.title} credential`)}>View Credential ${icon('arrow-up-right')}</a>`;
    } else {
      link = '<span class="cert-link cert-link--dim">Coming Soon ···</span>';
    }

    return `
      <div class="${cls.join(' ')}">
        <div class="cert-top">
          <div class="cert-ico ${done ? 'cert-ico--done' : 'cert-ico--soon'}">${icon(c.icon || 'award')}</div>
          <span class="cert-badge ${done ? 'cert-badge--done' : 'cert-badge--soon'}${c.status === 'progress' ? ' cert-badge--progress' : ''}">${esc(c.statusLabel)}</span>
        </div>
        <h3 class="cert-title">${esc(c.title)}</h3>
        <p class="cert-org">${esc(c.org)}</p>
        <p class="cert-desc">${esc(c.description)}</p>
        ${progress}
        <div class="cert-log">
          <span class="cl-row"><span class="cl-key">ISSUER</span><span class="cl-val">${esc(c.issuer)}</span></span>
          ${statusRow}
        </div>
        ${link}
      </div>`;
  }

  /* ══════════════════════════════════════════════════════════════
     HOME — LEADERSHIP
  ══════════════════════════════════════════════════════════════ */
  function leadershipRole(r) {
    return `
      <li class="ld-role${r.current ? ' ld-role--current' : ''} reveal">
        <span class="ld-role__node" aria-hidden="true">${icon(r.icon || 'star')}</span>
        <article class="ld-card">
          <header class="ld-card__hd">
            <span class="ld-card__period">${esc(r.period)}</span>
            ${r.current ? '<span class="ld-card__now"><span class="badge__dot"></span>Current</span>' : ''}
          </header>
          <h3 class="ld-card__title">${esc(r.title)}</h3>
          <p class="ld-card__org">${esc(r.org)}</p>
          ${(r.events || []).length ? `<ul class="ld-card__events" aria-label="Events">${r.events.map((e) => `<li>${icon('calendar')} ${esc(e)}</li>`).join('')}</ul>` : ''}
          ${r.description ? `<p class="ld-card__desc">${esc(r.description)}</p>` : ''}
          ${isUrl(r.experienceUrl) ? `<a href="${esc(r.experienceUrl)}" class="proj-link proj-link--primary ld-card__more" aria-label="View the ${esc(r.title)} leadership experience">View experience ${icon('arrow-right')}</a>` : ''}
        </article>
      </li>`;
  }

  function leadershipAside(L) {
    const h = L.highlight;
    return `
      <div class="ld-panel reveal">
        ${h ? `
        <div class="ld-panel__block">
          <p class="ld-panel__k">${icon('award')} ${esc(h.title)}</p>
          <p class="ld-panel__txt">${esc(h.text)}</p>
          <ul class="ld-panel__events">${(h.events || []).map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
        </div>` : ''}
        ${(L.memberships || []).length ? `
        <div class="ld-panel__block">
          <p class="ld-panel__k">${icon('id-card')} Memberships &amp; Volunteering</p>
          <ul class="ld-mem">${L.memberships.map((m) => `
            <li><span class="ld-mem__ico">${icon(m.icon || 'users')}</span>
              <span><strong>${esc(m.role)}</strong><small>${esc(m.org)}</small></span></li>`).join('')}</ul>
        </div>` : ''}
        ${(L.competencies || []).length ? `
        <div class="ld-panel__block">
          <p class="ld-panel__k">${icon('sparkles')} Leadership skills</p>
          <ul class="skill-chips">${L.competencies.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        </div>` : ''}
      </div>`;
  }

  /* ══════════════════════════════════════════════════════════════
     CASE-STUDY BLOCKS
  ══════════════════════════════════════════════════════════════ */
  const flowNode = (s) => `
    <span class="cs-node cs-node--${esc(s.tone || 'data')}">
      ${s.icon ? `<span class="cs-node__ico">${icon(s.icon)}</span>` : ''}
      <span class="cs-node__txt"><strong>${esc(s.label)}</strong>${s.sub ? `<small>${esc(s.sub)}</small>` : ''}</span>
    </span>`;

  const arrowDown = '<span class="cs-arrow" aria-hidden="true"></span>';

  const BLOCKS = {
    lead: (b) => `<p class="cs-lead">${esc(b.text)}</p>`,

    text: (b) => b.paragraphs.map((t) => `<p class="cs-p">${esc(t)}</p>`).join(''),

    note: (b) => `<p class="cs-note">${icon('info')}<span>${esc(b.text)}</span></p>`,

    facts: (b) => `<dl class="cs-facts">${b.items.map((f) =>
      `<div class="cs-fact"><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}</dl>`,

    questions: (b) => `<ul class="cs-questions">${b.items.map((q) =>
      `<li>${icon('circle-help')}<span>${esc(q)}</span></li>`).join('')}</ul>`,

    pillars: (b) => `<div class="cs-grid cs-grid--4">${b.items.map((it) => `
      <div class="cs-card"><span class="cs-card__ico">${icon(it.icon)}</span>
        <h3 class="cs-card__title">${esc(it.title)}</h3><p class="cs-card__txt">${esc(it.text)}</p></div>`).join('')}</div>`,

    callout: (b) => `<div class="cs-callout cs-callout--${esc(b.tone || 'info')}" role="note">
        <span class="cs-callout__ico">${icon(b.icon || 'info')}</span>
        <div><strong>${esc(b.title)}</strong><p>${esc(b.text)}</p></div></div>`,

    pipeline: (b) => `
      ${b.label ? `<p class="cs-label">${esc(b.label)}</p>` : ''}
      <ol class="cs-flow${b.compact ? ' cs-flow--compact' : ' cs-flow--feature'}" style="--n:${b.steps.length}">
        ${b.steps.map((s) => `<li class="cs-flow__step">${flowNode(s)}</li>`).join('')}
      </ol>`,

    properties: (b) => `
      ${b.label ? `<p class="cs-label">${esc(b.label)}</p>` : ''}
      <ul class="cs-props">${b.items.map((it) => `
        <li class="cs-prop"><span class="cs-prop__ico">${icon(it.icon)}</span>
          <span><strong>${esc(it.title)}</strong><small>${esc(it.text)}</small></span></li>`).join('')}</ul>`,

    architecture: (b) => {
      const tier = (t, mod) => `
        <div class="arch__tier arch__tier--${mod}">
          <div class="arch__tier-hd"><span class="arch__tier-ico">${icon(t.icon)}</span>
            <span><strong>${esc(t.title)}</strong><small>${esc(t.sub)}</small></span></div>
          <ul class="arch__chips">${t.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>`;
      return `
        <figure class="arch" aria-label="Trustora system architecture">
          <div class="arch__actors">${b.actors.map((a) => `<span class="arch__actor">${icon('user')} ${esc(a)}</span>`).join('')}</div>
          ${arrowDown}
          ${tier(b.frontend, 'fe')}
          <div class="arch__link"><span class="cs-arrow" aria-hidden="true"></span><span class="arch__link-lbl">${icon('plug')} ${esc(b.link)}</span><span class="cs-arrow" aria-hidden="true"></span></div>
          ${tier(b.backend, 'be')}
          <div class="arch__fan" aria-hidden="true"></div>
          <div class="arch__services">${b.services.map((s) => `
            <div class="arch__svc arch__svc--${esc(s.tone)}">
              <div class="arch__svc-hd">${icon(s.icon)} <strong>${esc(s.title)}</strong></div>
              <ul>${s.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
            </div>`).join('')}</div>
          <div class="arch__fan arch__fan--in" aria-hidden="true"></div>
          <div class="arch__out">${icon(b.output.icon)} <strong>${esc(b.output.title)}</strong></div>
        </figure>`;
    },

    groups: (b) => `<div class="cs-grid cs-grid--${Math.min(b.items.length, 3)}">${b.items.map((g) => `
      <div class="cs-card cs-card--group">
        <div class="cs-card__hd"><span class="cs-card__ico">${icon(g.icon)}</span><h3 class="cs-card__title">${esc(g.title)}</h3></div>
        <ul class="cs-chips">${g.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>`).join('')}</div>`,

    chips: (b) => `${b.label ? `<p class="cs-label">${esc(b.label)}</p>` : ''}
      <ul class="cs-chips cs-chips--lg">${b.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`,

    passport: () => `
      <figure class="passport" aria-label="Concept diagram of a Digital Trust Passport">
        <div class="passport__card">
          <div class="passport__hd">${icon('shield-check')}<span>DIGITAL TRUST PASSPORT</span></div>
          <div class="passport__row">
            <div class="passport__part"><span class="passport__k">Business</span><span class="passport__skel"></span></div>
            <div class="passport__part"><span class="passport__k">Trust level</span><span class="passport__skel passport__skel--sm"></span></div>
          </div>
          <div class="passport__row">
            <div class="passport__part passport__part--wide"><span class="passport__k">Trust score</span>
              <span class="passport__meter"><span></span></span></div>
          </div>
          <div class="passport__row">
            <div class="passport__part"><span class="passport__k">Evidence</span>
              <ul class="passport__ev"><li>Verification</li><li>Reviews</li><li>Complaints</li><li>Transactions</li></ul></div>
            <div class="passport__part"><span class="passport__k">Trust history</span><span class="passport__spark"></span></div>
          </div>
        </div>
        <figcaption>Concept diagram of the passport’s building blocks, not a product screenshot.</figcaption>
      </figure>`,

    fanin: (b) => `
      <div class="fanin">
        <div class="fanin__inputs">
          <p class="cs-label">${esc(b.label)}</p>
          <ul>${b.inputs.map((x) => `<li>${icon(x.icon)}<span>${esc(x.label)}</span></li>`).join('')}</ul>
        </div>
        <div class="arch__fan arch__fan--in" aria-hidden="true"></div>
        <ol class="cs-flow cs-flow--vertical">
          ${b.steps.map((s) => `<li class="cs-flow__step">${flowNode(s)}</li>`).join('')}
        </ol>
      </div>`,

    list: (b) => `<ul class="cs-list">${b.items.map((it) => `
      <li class="cs-list__item"><span class="cs-list__ico">${icon(it.icon)}</span>
        <span><strong>${esc(it.title)}</strong><span>${esc(it.text)}</span></span></li>`).join('')}</ul>`,

    commerceflow: (b) => `
      <figure class="cflow" aria-label="Trustora social commerce flow">
        <div class="cflow__node cflow__node--src">${icon(b.source.icon)} ${esc(b.source.label)}</div>
        ${arrowDown}
        <div class="cflow__node cflow__node--hub">${icon(b.hub.icon)} ${esc(b.hub.label)}</div>
        <div class="arch__fan" aria-hidden="true"></div>
        <div class="cflow__branches">${b.branches.map((x, i) => `
          <div class="cflow__node${i === b.branches.length - 1 ? ' cflow__node--active' : ''}">${icon(x.icon)} ${esc(x.label)}</div>`).join('')}</div>
        <ol class="cflow__chain">${b.chain.map((x) => `
          <li><span class="cs-arrow" aria-hidden="true"></span><span class="cflow__node">${icon(x.icon)} ${esc(x.label)}</span></li>`).join('')}</ol>
      </figure>`,

    loop: (b) => `
      <div class="loop">
        <p class="cs-label">${esc(b.label)}</p>
        <ol class="loop__ring">${b.items.map((x, i) => `
          <li class="loop__item${i === b.items.length - 1 ? ' loop__item--end' : ''}"><span>${esc(x)}</span></li>`).join('')}</ol>
        <p class="loop__back">${icon('repeat')} The loop repeats with every transaction</p>
      </div>`,

    features: (b) => `<ul class="cs-features">${b.items.map((x) =>
      `<li>${icon(x.icon)}<span>${esc(x.label)}</span></li>`).join('')}</ul>`,

    layers: (b) => `<ol class="cs-layers">${b.items.map((x, i) => `
      <li class="cs-layer" style="--i:${i}">
        <span class="cs-layer__ico">${icon(x.icon)}</span>
        <span class="cs-layer__body"><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span>
          ${x.chips ? `<span class="cs-layer__chips">${x.chips.map((c) => `<code>${esc(c)}</code>`).join('')}</span>` : ''}</span>
      </li>`).join('')}</ol>`,

    deploy: (b) => `
      <figure class="deploy" aria-label="Trustora deployment architecture">
        <div class="deploy__entry">${icon(b.entry.icon)} ${esc(b.entry.label)}</div>
        ${arrowDown}
        ${b.tiers.map((t) => t.link
          ? `<div class="arch__link"><span class="cs-arrow" aria-hidden="true"></span><span class="arch__link-lbl">${icon('lock')} ${esc(t.link)}</span><span class="cs-arrow" aria-hidden="true"></span></div>`
          : `<div class="deploy__tier"><span class="deploy__host">${icon(t.icon)} ${esc(t.host)}</span><span class="deploy__role">${esc(t.role)}</span></div>`).join('')}
        <div class="arch__fan" aria-hidden="true"></div>
        <div class="deploy__services">${b.services.map((s) => `
          <div class="deploy__tier deploy__tier--svc"><span class="deploy__host">${icon(s.icon)} ${esc(s.host)}</span><span class="deploy__role">${esc(s.role)}</span></div>`).join('')}</div>
      </figure>`,

    languages: (b) => `<div class="cs-langs">${b.items.map((l) => `
      <div class="cs-lang"><span class="cs-lang__code">${esc(l.code)}</span>
        <span><strong>${esc(l.name)}</strong><code>${esc(l.route)}</code></span></div>`).join('')}</div>`,

    highlights: (b) => `<ol class="cs-highlights">${b.items.map((x, i) => `
      <li><span class="cs-highlights__n">${pad(i + 1)}</span><span>${esc(x)}</span></li>`).join('')}</ol>`,

    linkcard: (b, p) => {
      const isGh = b.kind === 'github';
      const url = isGh ? p.githubUrl : p.liveUrl;
      if (!isUrl(url)) return '';
      const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      return `<a href="${esc(url)}" class="cs-linkcard" ${ext(isGh ? `${p.title} repository on GitHub` : `${p.title} live demo`)}>
          <span class="cs-linkcard__ico">${icon(isGh ? 'github' : 'globe')}</span>
          <span class="cs-linkcard__body"><strong>${isGh ? 'View the source on GitHub' : 'Open the live demo'}</strong><code>${esc(host)}</code></span>
          ${icon('arrow-up-right', 'cs-linkcard__arrow')}
        </a>`;
    },
  };

  function renderBlock(b, p) {
    const fn = BLOCKS[b.type];
    if (!fn) { console.warn('[render] unknown block type:', b.type); return ''; }
    return `<div class="cs-block cs-block--${esc(b.type)} reveal">${fn(b, p)}</div>`;
  }

  /* ── Shared page pieces ─────────────────────────────────────── */
  function backLink(href, label) {
    return `<a href="${href}" class="cs-back">${icon('arrow-left')} ${esc(label)}</a>`;
  }

  function tocMarkup(sections) {
    const items = sections.map((s, i) =>
      `<li><a href="#${esc(s.id)}" class="cs-toc__link"><span>${pad(i + 1)}</span>${esc(s.title)}</a></li>`).join('');
    return `
      <nav class="cs-toc" aria-label="Case study sections">
        <details class="cs-toc__details" open>
          <summary class="cs-toc__summary">${icon('list')} Contents</summary>
          <ol class="cs-toc__list">${items}</ol>
        </details>
      </nav>`;
  }

  function wireToc(root) {
    const links = [...root.querySelectorAll('.cs-toc__link')];
    const details = root.querySelector('.cs-toc__details');
    const mq = window.matchMedia('(max-width: 1024px)');
    const sync = () => { if (details) details.open = !mq.matches; };
    sync();
    mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);

    links.forEach((a) => a.addEventListener('click', () => { if (mq.matches && details) details.open = false; }));

    if (!('IntersectionObserver' in window)) return;
    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
        const a = byId.get(e.target.id);
        if (a) { a.classList.add('is-active'); a.setAttribute('aria-current', 'location'); }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    root.querySelectorAll('.cs-sec').forEach((s) => io.observe(s));
  }

  /* ══════════════════════════════════════════════════════════════
     PAGE: ENGINEERING CASE STUDY
  ══════════════════════════════════════════════════════════════ */
  function renderCaseStudy(root, p) {
    const ctas = [];
    if (isUrl(p.liveUrl)) ctas.push(`<a href="${esc(p.liveUrl)}" class="btn btn--primary" ${ext(`${p.title} live demo`)}>${icon('external-link')} Live Demo</a>`);
    if (isUrl(p.githubUrl)) ctas.push(`<a href="${esc(p.githubUrl)}" class="btn btn--ghost" ${ext(`${p.title} source code on GitHub`)}>${icon('github')} GitHub</a>`);

    const sections = p.caseStudySections || [];
    root.innerHTML = `
      <header class="cs-hero">
        <div class="container${p.heroImage && isUrl(p.heroImage.src) ? ' cs-hero__grid' : ''}">
          <div class="cs-hero__text">
            ${backLink('/#projects', 'All projects')}
            <div class="eyebrow"><span class="eyebrow__line"></span><span class="eyebrow__num">Case Study</span><span class="eyebrow__txt">${esc(p.category)}</span></div>
            <h1 class="cs-title">${esc(p.title)}</h1>
            ${p.subtitle ? `<p class="cs-subtitle">${esc(p.subtitle)}</p>` : ''}
            <p class="cs-hero__lead">${esc(p.positioning || p.description)}</p>
            ${ctas.length ? `<div class="cs-hero__ctas">${ctas.join('')}</div>` : ''}
            <ul class="cs-tags" aria-label="Technologies">${(p.technologies || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>
          ${p.heroImage && isUrl(p.heroImage.src) ? `
          <figure class="cs-hero__media">
            <img src="${esc(p.heroImage.src)}" alt="${esc(p.heroImage.alt || p.title)}" loading="eager" decoding="async">
          </figure>` : ''}
        </div>
      </header>
      <div class="container cs-layout">
        <aside class="cs-aside">${tocMarkup(sections)}</aside>
        <div class="cs-content">
          ${sections.map((s, i) => `
            <section class="cs-sec" id="${esc(s.id)}" aria-labelledby="${esc(s.id)}-h">
              <h2 class="cs-h2" id="${esc(s.id)}-h"><span class="cs-h2__num">${pad(i + 1)}</span>
                <span class="cs-h2__ico">${icon(s.icon || 'circle')}</span>${esc(s.title)}</h2>
              ${s.blocks.map((b) => renderBlock(b, p)).join('')}
            </section>`).join('')}
        </div>
      </div>`;
    wireToc(root);
  }

  /* ══════════════════════════════════════════════════════════════
     PAGE: UI/UX DESIGN PROJECT
  ══════════════════════════════════════════════════════════════ */
  function figmaEmbedUrl(url) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  }

  function designSection(s) {
    if (!s.content) {
      return `<li class="wp-slot wp-slot--empty">
          <span class="wp-slot__ico">${icon(s.icon)}</span>
          <span><strong>${esc(s.title)}</strong><small>To be documented</small></span>
        </li>`;
    }
    const paras = (s.content.paragraphs || []).map((t) => `<p class="cs-p">${esc(t)}</p>`).join('');
    const imgs = (s.content.images || []).filter((im) => isUrl(im.src)).map((im) => `
      <figure class="wp-shot"><img src="${esc(im.src)}" alt="${esc(im.alt || '')}" loading="lazy">
        ${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ''}</figure>`).join('');
    return `<li class="wp-slot wp-slot--filled" id="${esc(s.id)}">
        <h3 class="cs-card__title"><span class="wp-slot__ico">${icon(s.icon)}</span>${esc(s.title)}</h3>${paras}${imgs}
      </li>`;
  }

  function renderDesignStudy(root, p) {
    const hasProto = isUrl(p.externalUrl);
    const cta = hasProto
      ? `<a href="${esc(p.externalUrl)}" class="btn btn--primary" ${ext(`${p.externalLabel || 'View Prototype'} — ${p.title} in Figma`)}>${icon('figma')} ${esc(p.externalLabel || 'View Prototype')} ${icon('arrow-up-right')}</a>`
      : '';
    const sections = p.caseStudySections || [];
    const pending = sections.filter((s) => !s.content).length;

    root.innerHTML = `
      <header class="cs-hero cs-hero--design">
        <div class="container">
          ${backLink('/#projects', 'All projects')}
          <div class="eyebrow"><span class="eyebrow__line"></span><span class="eyebrow__num">UI/UX Case Study</span><span class="eyebrow__txt">Design</span></div>
          <h1 class="cs-title">${esc(p.title)}</h1>
          <ul class="wp-meta" aria-label="Project type">
            <li class="pcat pcat--design">${esc(p.category)}</li>
            <li class="pcat pcat--design">${esc(p.subtitle || 'High-Fidelity Prototype')}</li>
          </ul>
          <p class="cs-hero__lead">${esc(p.description)}</p>
          ${cta ? `<div class="cs-hero__ctas">${cta}</div>` : ''}
          <ul class="cs-tags" aria-label="Tools and disciplines">${(p.technologies || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        </div>
      </header>

      <div class="container wp-body">
        ${hasProto ? `
        <section class="cs-sec" id="prototype" aria-labelledby="prototype-h">
          <h2 class="cs-h2" id="prototype-h"><span class="cs-h2__ico">${icon('mouse-pointer-click')}</span>Prototype</h2>
          <div class="wp-proto reveal">
            <div class="wp-proto__bar" aria-hidden="true"><span class="t-dot t-dot--r"></span><span class="t-dot t-dot--y"></span><span class="t-dot t-dot--g"></span>
              <span class="wp-proto__url">figma.com · ${esc(p.title)} — High-Fidelity Prototype</span></div>
            <div class="wp-proto__stage" id="wpStage">
              <div class="wp-proto__poster">
                <span class="wp-proto__ico">${icon('figma')}</span>
                <strong>Interactive Figma prototype</strong>
                <p>Load the prototype on this page, or open it full-screen in Figma.</p>
                <div class="wp-proto__actions">
                  <button type="button" class="btn btn--primary" id="wpLoad">${icon('play')} Load prototype here</button>
                  <a href="${esc(p.externalUrl)}" class="btn btn--ghost" ${ext(`Open the ${p.title} prototype in Figma`)}>${icon('arrow-up-right')} Open in Figma</a>
                </div>
              </div>
            </div>
          </div>
        </section>` : ''}

        <section class="cs-sec" id="case-study" aria-labelledby="case-study-h">
          <h2 class="cs-h2" id="case-study-h"><span class="cs-h2__ico">${icon('pen-tool')}</span>Design Case Study</h2>
          ${pending ? `<p class="cs-note reveal">${icon('info')}<span>The write-up for each design stage will be added here. Until then, the prototype above shows the final design.</span></p>` : ''}
          <ol class="wp-slots reveal">${sections.map(designSection).join('')}</ol>
        </section>
      </div>`;

    const btn = root.querySelector('#wpLoad');
    if (btn) {
      btn.addEventListener('click', () => {
        const stage = root.querySelector('#wpStage');
        stage.innerHTML = `<iframe class="wp-proto__frame" src="${esc(figmaEmbedUrl(p.externalUrl))}"
          title="${esc(p.title)} high-fidelity prototype (Figma)" allowfullscreen loading="lazy"></iframe>`;
        stage.classList.add('is-loaded');
        stage.querySelector('iframe').focus();
      });
    }
  }

  /* ══════════════════════════════════════════════════════════════
     PAGE: CERTIFICATION JOURNEY (CCNA)
  ══════════════════════════════════════════════════════════════ */
  const STAGE_STATUS = {
    'completed':   { mark: '✓', label: 'COMPLETED',   icon: 'check' },
    'in-progress': { mark: '◐', label: 'IN PROGRESS', icon: 'loader' },
    'upcoming':    { mark: '○', label: 'UPCOMING',    icon: 'circle' },
  };

  function evidenceSlot(kind, s) {
    const pendingWord = s.status === 'completed' ? 'will be added' : 'coming soon';
    if (kind === 'certificate') {
      const img = isUrl(s.certificateImage)
        ? `<img src="${esc(s.certificateImage)}" alt="Stage ${s.stage} certificate" loading="lazy" class="ev-slot__img">`
        : `<span class="ev-slot__ph">${icon('file-badge')}<span>Certificate ${pendingWord}</span></span>`;
      const body = `<span class="ev-slot__k">Certificate</span>${img}`;
      return isUrl(s.certificateUrl)
        ? `<a href="${esc(s.certificateUrl)}" class="ev-slot ev-slot--filled" ${ext(`Stage ${s.stage} certificate`)}>${body}</a>`
        : `<div class="ev-slot${isUrl(s.certificateImage) ? ' ev-slot--filled' : ''}">${body}</div>`;
    }
    if (kind === 'credly') {
      const img = isUrl(s.credlyBadgeImage)
        ? `<img src="${esc(s.credlyBadgeImage)}" alt="Stage ${s.stage} Credly badge" loading="lazy" class="ev-slot__img ev-slot__img--badge">`
        : `<span class="ev-slot__ph">${icon('hexagon')}<span>Credly badge ${pendingWord}</span></span>`;
      const body = `<span class="ev-slot__k">Credly Badge</span>${img}`;
      return isUrl(s.credlyUrl)
        ? `<a href="${esc(s.credlyUrl)}" class="ev-slot ev-slot--filled" ${ext(`Stage ${s.stage} Credly badge`)}>${body}</a>`
        : `<div class="ev-slot${isUrl(s.credlyBadgeImage) ? ' ev-slot--filled' : ''}">${body}</div>`;
    }
    /* evidence / credential link */
    return isUrl(s.evidenceUrl)
      ? `<a href="${esc(s.evidenceUrl)}" class="ev-link" ${ext(`Stage ${s.stage} credential`)}>${icon('link')} View credential ${icon('arrow-up-right')}</a>`
      : `<span class="ev-link ev-link--off">${icon('link')} Credential link ${pendingWord}</span>`;
  }

  function stageCard(s) {
    const st = STAGE_STATUS[s.status] || STAGE_STATUS.upcoming;
    return `
      <li class="jr-stage jr-stage--${esc(s.status)} reveal">
        <span class="jr-stage__node" aria-hidden="true">${s.status === 'in-progress' ? '<span class="half-dot"></span>' : st.mark}</span>
        <article class="jr-card" aria-labelledby="stage-${s.stage}-h">
          <header class="jr-card__hd">
            <span class="jr-card__num">Stage ${s.stage}</span>
            <span class="jr-status jr-status--${esc(s.status)}">${st.mark} ${st.label}</span>
          </header>
          <h3 class="jr-card__title" id="stage-${s.stage}-h">${esc(s.title)}</h3>
          ${s.courseName ? `<p class="jr-card__course">${esc(s.courseName)}</p>` : ''}
          <p class="jr-card__desc">${esc(s.description)}</p>
          <div class="ev-grid">
            ${evidenceSlot('certificate', s)}
            ${evidenceSlot('credly', s)}
          </div>
          ${evidenceSlot('link', s)}
        </article>
      </li>`;
  }

  function profileButton(url, label, iconName) {
    return isUrl(url)
      ? `<a href="${esc(url)}" class="btn btn--primary ev-btn" ${ext(label)}>${icon(iconName)} ${esc(label)} ${icon('arrow-up-right')}</a>`
      : `<span class="btn btn--ghost ev-btn ev-btn--off" aria-disabled="true"><span class="ev-btn__lbl">${icon(iconName)} ${esc(label)}</span><small>Link will be added</small></span>`;
  }

  function renderJourney(root, c) {
    const { total, done } = stageCounts(c);
    const current = (c.stages || []).find((s) => s.status === 'in-progress');
    const pct = total ? Math.round((done / total) * 100) : 0;

    root.innerHTML = `
      <header class="cs-hero jr-hero">
        <div class="container">
          ${backLink('/#certifications', 'All certifications')}
          <div class="eyebrow"><span class="eyebrow__line"></span><span class="eyebrow__num">Certification Journey</span><span class="eyebrow__txt">${esc(c.org)}</span></div>
          <h1 class="cs-title">CCNA</h1>
          <p class="cs-subtitle">Networking Journey</p>
          <p class="cs-hero__lead">${esc(c.description)}</p>

          <div class="jr-progress" aria-label="Journey progress">
            <div class="jr-progress__top">
              <span><strong>${done}</strong> of ${total} stages completed</span>
              ${current ? `<span class="jr-status jr-status--in-progress">◐ Stage ${current.stage} in progress</span>` : ''}
            </div>
            <div class="jr-progress__bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-valuetext="${done} of ${total} stages completed">
              ${(c.stages || []).map((s) => `<span class="jr-seg jr-seg--${esc(s.status)}"></span>`).join('')}
            </div>
            <ol class="jr-stepper">
              ${(c.stages || []).map((s) => {
                const st = STAGE_STATUS[s.status] || STAGE_STATUS.upcoming;
                return `<li class="jr-step jr-step--${esc(s.status)}"><span class="jr-step__dot" aria-hidden="true">${s.status === 'in-progress' ? '<span class="half-dot"></span>' : st.mark}</span>
                  <span class="jr-step__lbl">Stage ${s.stage}<small>${st.label}</small></span></li>`;
              }).join('')}
            </ol>
          </div>
          <span class="visually-hidden">${pct}% complete</span>
        </div>
      </header>

      <div class="container jr-body">
        <section class="cs-sec" id="stages" aria-labelledby="stages-h">
          <h2 class="cs-h2" id="stages-h"><span class="cs-h2__ico">${icon('route')}</span>Stages</h2>
          <ol class="jr-timeline">${(c.stages || []).map(stageCard).join('')}</ol>
        </section>

        <section class="cs-sec" id="evidence" aria-labelledby="evidence-h">
          <h2 class="cs-h2" id="evidence-h"><span class="cs-h2__ico">${icon('badge-check')}</span>Evidence &amp; Credentials</h2>
          <div class="ev-panel reveal">
            <p class="cs-p">Official records for this journey are kept on Cisco Networking Academy and Credly.</p>
            <div class="ev-panel__btns">
              ${profileButton(c.netacadUrl, 'View Cisco Networking Academy', 'graduation-cap')}
              ${profileButton(c.credlyProfileUrl, 'View Credly Profile', 'award')}
            </div>
          </div>
        </section>
      </div>`;
  }

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

  /* ══════════════════════════════════════════════════════════════
     DISPATCH
  ══════════════════════════════════════════════════════════════ */
  const grid = document.getElementById('projectsGrid');
  if (grid) grid.innerHTML = DATA.projects.map(projectCard).join('');

  const certs = document.getElementById('certsGrid');
  if (certs) certs.innerHTML = DATA.certifications.map(certCard).join('');

  const lRoles = document.getElementById('leadershipRoles');
  if (lRoles && DATA.leadership) lRoles.innerHTML = DATA.leadership.roles.map(leadershipRole).join('');
  const lAside = document.getElementById('leadershipAside');
  if (lAside && DATA.leadership) lAside.innerHTML = leadershipAside(DATA.leadership);

  const page = document.querySelector('[data-page]');
  if (page) {
    const slug = page.dataset.slug;
    const kind = page.dataset.page;
    const item = kind === 'cert-journey'
      ? findBySlug(DATA.certifications, slug)
      : findBySlug(DATA.projects, slug);
    if (!item) {
      page.innerHTML = `<div class="container cs-missing"><p>Content not found.</p>${backLink('/', 'Back to home')}</div>`;
    } else if (kind === 'case-study') renderCaseStudy(page, item);
    else if (kind === 'design-study') renderDesignStudy(page, item);
    else if (kind === 'cert-journey') renderJourney(page, item);
  }
})();

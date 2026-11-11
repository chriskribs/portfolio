(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const I = n => `/media/i/${n}.jpg`;
  const V = n => `/media/v/${n}.mp4`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============ PIXEL ART: mark + icons, drawn as crisp SVG ============ */
  const MARK = [
    '###########',
    '#.......##.',
    '#.....##...',
    '#...##.....',
    '#.##.......',
    '#######....',
    '#.##.......',
    '#...##.....',
    '#.....##...',
    '#.......##.',
    '###########'
  ];
  const ICONS = {
    arrow: ['...#...', '...##..', '#######', '...##..', '...#...'],
    sparkle: ['...#...', '...#...', '..###..', '#######', '..###..', '...#...', '...#...'],
    plus: ['..#..', '..#..', '#####', '..#..', '..#..'],
    check: ['......#', '.....##', '#...##.', '##.##..', '.###...', '..#....'],
    heart: ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'],
    horns: ['#.....#', '#.....#', '#.....#', '##...##', '#######', '#######', '.#####.', '.#####.', '..###..'],
    drum: ['#.......#', '.#.....#.', '..#...#..', '.#######.', '#.......#', '#########', '#.#.#.#.#', '#.#.#.#.#', '#########'],
    dumbbell: ['##.......##', '###.....###', '###########', '###.....###', '##.......##'],
    bulb: ['..###..', '.#####.', '#######', '#######', '.#####.', '..###..', '..###..', '...#...'],
    magnifier: ['.###....', '#...#...', '#...#...', '#...#...', '.###.#..', '.....##.', '......##'],
    chat: ['#######', '#.....#', '#.#.#.#', '#.....#', '#######', '.##....', '.#.....']
  };
  const svgFrom = (grid, cls = '') => {
    const w = grid[0].length, h = grid.length;
    let r = '';
    grid.forEach((row, y) => [...row].forEach((c, x) => { if (c === '#') r += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
    return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">${r}</svg>`;
  };
  $$('[data-mark]').forEach(el => { el.innerHTML = svgFrom(MARK); });
  const icon = n => svgFrom(ICONS[n] || ICONS.sparkle);
  const paintIcons = (root = document) => $$('[data-icon]', root).forEach(el => { if (!el.firstChild) el.innerHTML = icon(el.dataset.icon); });

  /* ticker */
  const tick = ['Goal first', 'Find the real gap', 'Pick the channel', 'Make it well', 'Measure what moved'];
  const tickHTML = tick.map(t => `<span>${t}</span><span class="pi" data-icon="sparkle"></span>`).join('');
  $('#ticker').innerHTML = tickHTML + tickHTML;

  /* ============ 01 ASK vs GOAL ============ */
  const asks = [
    { ask: '"Can we make a video about the new feature?"', who: 'Product',
      why: 'What should people do after they watch it?',
      goal: 'Feature adoption: communities actually turning it on and using it.',
      move: 'A step-by-step walkthrough of the feature, sent straight to each community so staff could roll it out without waiting on a meeting. The video became optional.',
      result: 'Success was measured in usage, not views.' },
    { ask: '"We need a new email sequence for more qualified leads."', who: 'Sales',
      why: 'Where are good leads actually stalling?',
      goal: 'Not the top of the funnel. Deals were stalling between demo 1 and demo 2.',
      move: 'Account-based marketing on that exact list: a physical mailer first, then calls and emails from sales while the box was still on their desk.',
      result: 'Last round: 25 mailers, about 10 replies, 3 demos sat and 2 deals moved forward.' },
    { ask: '"Let\'s get a booth at the conference."', who: 'Leadership',
      why: 'What has to happen at the show for it to be worth the trip?',
      goal: 'Demos and real opportunities, not a stack of badge scans.',
      move: 'A conference playbook for before, during and after the show, so every event runs the same proven way.',
      result: '15 net-new demos and 3 conference-sourced opportunities.' },
    { ask: '"We need more traffic to the website."', who: 'Leadership, PTG',
      why: 'Traffic from whom, to do what?',
      goal: 'The right local businesses finding PTG when they go looking for IT help.',
      move: 'Content and SEO built on customer research and competitive audits, plus one brand system so every page looked like the same company.',
      result: '+1,230% organic traffic in two years.' },
    { ask: '"We\'re launching a new product across all 11 brands."', who: 'Courser',
      why: 'What does a good launch look like 90 days later?',
      goal: 'Adoption, inside a single quarter.',
      move: 'Launch marketing run with product, sales and success in the same room, coordinated across every brand and channel.',
      result: 'Hit the 80% adoption target within one quarter.' }
  ];
  const asksEl = $('#asks'), card = $('#askCard');
  asks.forEach((a, i) => asksEl.insertAdjacentHTML('beforeend',
    `<button class="ask" role="tab" aria-selected="false" data-i="${i}"><span class="ask-q">${a.ask}</span><span class="ask-who mono">${a.who}</span></button>`));
  const showAsk = i => {
    const a = asks[i];
    $$('.ask', asksEl).forEach(b => b.setAttribute('aria-selected', b.dataset.i == i));
    $('#aAsk').textContent = a.ask; $('#aWhy').textContent = a.why; $('#aGoal').textContent = a.goal;
    $('#aMove').textContent = a.move; $('#aResult').textContent = a.result;
    card.classList.remove('in'); void card.offsetWidth; card.classList.add('in');
  };
  asksEl.addEventListener('click', e => { const b = e.target.closest('.ask'); if (b) showAsk(+b.dataset.i); });
  showAsk(1);

  /* ============ 02 WORK ============ */
  const G = (img, cap, vid) => ({ img, cap, vid });
  const galleries = {
    wellzesta: { title: 'Wellzesta', items: [
      G('wz-sunnyside-mockup', 'Case study: Sunnyside'), G('wz-cs-sunnyside', 'Sunnyside case study, page 1'), G('wz-cs-sunnyside-2', 'Sunnyside case study, page 2'), G('wz-cs-tandem', 'Case study: Tandem'),
      G('wz-ebook', 'Ebook: app rollout'), G('wz-ebook-3', 'Ebook, inside spread'), G('wz-report', 'Resident engagement report'), G('wz-report-2', 'Report, page 2'),
      G('wz-ai-menu', 'One-pager: AI menu reader'), G('wz-zesty', 'Feature launch: Zesty'), G('wz-zesty-2', 'Zesty, page 2'), G('wz-rollout-carousel', 'LinkedIn carousel'), G('wz-rollout-carousel-2', 'Carousel, slide 2'),
      G('wz-onboarding', 'Staff onboarding'), G('wz-newsletter-june', 'Customer newsletter, June'), G('wz-newsletter-oct', 'Customer newsletter, October'), G('wz-signup-flyer', 'Resident app sign-up flyer'),
      G('wz-kyle-leadingage-va', 'Conference promo: LeadingAge VA'), G('wz-vista-leadingage', 'Conference promo: LeadingAge NJ/DE'), G('wz-brookhaven-docs', 'Feature social: documents'), G('wz-linkedin-8', 'Feature social: Ask Zesty'),
      G('p-wz-expiration', 'Product motion: message expiration', 'wz-expiration'), G('p-wz-linkedin-anim', 'LinkedIn loop', 'wz-linkedin-anim'), G('p-wz-wellness-chart', 'Wellness chart', 'wz-wellness-chart')] },
    ptg: { title: 'PTG', items: [
      G('ptg-brand-01', 'Brand guidelines'), G('ptg-brand-12', 'Brand guidelines: color'), G('ptg-brand-13', 'Brand guidelines: type'), G('ptg-brand-14', 'Brand guidelines: photography'),
      G('ptg-welcome-cover', 'Customer welcome guide'), G('ptg-welcome-open', 'Welcome guide, inside'), G('ptg-quick-facts', 'Quick facts'), G('ptg-service-tickets', 'How service tickets work'),
      G('ptg-buyers-guide', "Buyer's guide"), G('ptg-edr', 'EDR explainer'), G('ptg-cyber-guide', 'Cyber insurance guide'), G('ptg-password-mockup', 'Password security one-pager'), G('ptg-cost-mockup', 'Cost of a breach'),
      G('ptg-offerings', 'Service offerings'), G('ptg-roadmap', 'Audit roadmap'), G('ptg-security-training', 'Security training'),
      G('ptg-sbr-tv', 'Quarterly business review deck'), G('ptg-updates', 'QBR: updates'), G('ptg-trends', 'QBR: trends'), G('ptg-sbr-deck', 'QBR deck mockup'), G('ptg-audit-deck', 'Audit deck'),
      G('ptg-webinar-ad', 'Webinar ad'), G('ptg-essentials-ad', 'Essentials ad'), G('p-ptg-clip', 'Social video', 'ptg-social')] },
    agency: { title: 'Agency years', items: [
      ...['spirits', 'latte', 'loyalty', 'smoothie', 'bar-bites', 'green-juice', 'cocktails', 'pastries', 'juices', 'bar-bites-2', 'boiler-up', 'whiskey', 'chow-now'].map(n => G('uc-' + n, 'Union Club Hotel social (Vast Creative)')),
      ...['discover-1', 'discover-2', 'discover-3', 'discover-4', 'discover-5', 'farmers', 'arts', 'stpats', 'guide-1', 'guide-2'].map(n => G('mc-' + n, 'Michigan City destination marketing (WeCreate Media)')),
      ...['12-days', '7-days', 'appropriate', 'eye-catching'].map(n => G('play-' + n, 'Community playground donation campaign'))] }
  };
  const cases = [
    { co: 'Wellzesta', when: '2026 – now', role: 'Marketing Manager', team: 'Team of one', kind: 'Senior living software', pair: 'p-lav', gal: 'wellzesta',
      lede: 'The whole marketing department for a software company that helps senior living communities engage residents. I set the plan with leadership and sales, then make most of what ships.',
      pts: ['120% of the annual MQL goal in five months (96 vs. a full-year target of 80).', '43 contacts advanced to SQL and about $873K in active pipeline influenced.', 'Conference playbook: 15 net-new demos and 3 opportunities.', 'HubSpot lead scoring and attribution live in my first two months, the first the company had.'],
      thumbs: ['wz-sunnyside-mockup', 'wz-ebook', 'wz-linkedin-8'] },
    { co: 'Courser', when: '2023 – 2025 · alongside PTG', role: 'Regional Marketing Manager', team: 'A real team', kind: 'Multi-brand B2B', pair: 'p-blue',
      lede: 'The first time I got to work with people who think the way I do. We shaped the strategy together, then ran it across 11 brands.',
      pts: ['Integrated campaigns across 11 brands, part of a 9% ARR lift in three months.', 'Launch marketing that hit its 80% adoption target within one quarter.', 'Customer research, segmentation and KPI work behind 201% of MQL goal.'] },
    { co: 'PTG', when: '2021 – 2025', role: 'Marketing Manager', team: 'Team of one', kind: 'Managed IT services', pair: 'p-navy', gal: 'ptg',
      lede: 'A one-person marketing department for a Greenville IT firm. Brand, research, content, SEO, events, and everything sales needs to win a client and keep them.',
      pts: ['Built enterprise brand guidelines in year one.', 'Grew organic traffic 1,230% in two years through content and SEO.', 'Sales enablement: buyer\'s guides, a welcome guide, QBR decks, webinars and short video.'],
      thumbs: ['ptg-brand-01', 'ptg-welcome-cover', 'ptg-sbr-deck'] },
    { co: 'Agency years', when: '2018 – 2021', role: 'Vast Creative Co. · WeCreate Media', team: 'Client side of the table', kind: 'Hotels, towns, small business', pair: 'p-pink', gal: 'agency',
      lede: 'Where I learned to make things. Social for Marriott hotel brands at Vast Creative, including the Union Club Hotel. Before that, account management, shooting and editing at WeCreate Media.',
      pts: ['Weekly social stories for a university hotel\'s restaurant, bar and coffee shop.', 'Destination marketing for Michigan City, Indiana.', 'Brand films and spots for a guest ranch, a wedding venue, a dentist, a nonprofit and a medical AI company.'],
      thumbs: ['uc-latte', 'mc-discover-1', 'p-brush-creek'] }
  ];
  const casesEl = $('#cases');
  cases.forEach((c, i) => {
    const n = c.gal ? galleries[c.gal].items.length : 0;
    casesEl.insertAdjacentHTML('beforeend', `<article class="case ${c.pair}">
      <div class="case-top">
        <div class="case-meta"><span class="mono">${c.when}</span><span class="pill">${c.team}</span></div>
        <h3 class="case-co">${c.co}</h3>
        <p class="case-role">${c.role} · ${c.kind}</p>
      </div>
      <p class="case-lede">${c.lede}</p>
      <ul class="case-pts">${c.pts.map(p => `<li><span class="pi" data-icon="plus"></span>${p}</li>`).join('')}</ul>
      ${c.thumbs ? `<button type="button" class="case-gal" data-gal="${c.gal}" aria-label="Open ${c.co} work, ${n} pieces">
        <span class="case-thumbs">${c.thumbs.map(t => `<img src="${I(t)}" alt="" loading="lazy">`).join('')}</span>
        <span class="case-gal-label">See the work · ${n} pieces <span class="pi" data-icon="arrow"></span></span>
      </button>` : `<p class="case-note mono">Work samples on request.</p>`}
    </article>`);
  });

  /* ============ 03 METRICS ============ */
  const metrics = [
    ['120%', 'of the annual MQL goal, hit in 5 months', 'Wellzesta'],
    ['$873K', 'active pipeline influenced', 'Wellzesta'],
    ['43', 'contacts advanced to SQL', 'Wellzesta'],
    ['15', 'net-new demos from one conference playbook', 'Wellzesta'],
    ['25 → 3 → 2', 'ABM mailers sent, demos sat, deals moved forward', 'Wellzesta'],
    ['201%', 'of MQL goal', 'Courser'],
    ['80%', 'adoption target, hit within one quarter', 'Courser'],
    ['+9%', 'ARR in three months across 11 brands', 'Courser'],
    ['+1,230%', 'organic traffic in two years', 'PTG']
  ];
  $('#metrics').innerHTML = metrics.map(([n, l, s], i) => `<div class="metric m${i % 4}${n.length > 7 ? ' long' : ''}"><span class="num">${n}</span><span class="m-label">${l}</span><span class="m-src mono">${s}</span></div>`).join('');

  /* ============ 04 VIDEO ============ */
  const videos = [
    { v: 'wz-explainer', t: 'Wellzesta in 45 seconds', s: 'Explainer', n: 'Job: give sales one link that explains the platform before the first call.' },
    { v: 'wz-immanuel', t: 'In their own words', s: 'Testimonial', n: 'Job: proof from real communities, for buyers who trust peers more than vendors.' },
    { v: 'wz-resident-intro', t: 'Meet the app', s: 'Resident onboarding', n: 'Job: adoption. Residents see it, try it and keep using it after launch week.' },
    { v: 'wz-marvella', t: 'A real resident', s: 'Social cut', n: 'Job: a 15-second proof point for LinkedIn.' },
    { v: 'ptg-cyber', t: 'Cyber insurance webinar', s: 'Promo', n: 'Job: registrations. A 54-minute panel cut into a 40-second reason to show up.' },
    { v: 'ptg-clip', t: 'Leadership soundbites', s: 'Vertical social', n: 'Job: put a trusted face on an IT firm, in the feed owners already scroll.' },
    { v: 'brush-creek', t: 'Summer at the Ranch', s: 'Brand film', n: 'Job: get families to book a summer at a Wyoming guest ranch.' },
    { v: 'venue-nd', t: 'Venue ND', s: ':30 spot', n: 'Job: wedding bookings, told as a love story.' },
    { v: 'weber', t: 'Leave Smiling', s: ':30 spot', n: 'Job: new patients for a local dentist, without showing a single drill.' },
    { v: 'santiago', t: 'The Santiago Partnership', s: 'Nonprofit intro', n: 'Job: help donors see the people behind the mission.' },
    { v: 'maxq', t: 'RSNA 2019 recap', s: 'Event recap', n: 'Job: turn one conference into a follow-up tool for sales.' },
    { v: 'delicious-journeys', t: 'Delicious Journeys', s: 'Travel film', n: 'Job: sell the feeling of the trip, slowly.' },
    { v: 'michigan-city', t: 'Michigan City summer', s: 'Destination', n: 'Job: pull weekend visitors across the state line.' }
  ];
  galleries.video = { title: 'Video', items: videos.map(x => ({ img: 'p-' + x.v, cap: `${x.t} · ${x.s}`, vid: x.v, note: x.n })) };
  $('#reel').innerHTML = videos.map((x, i) => `<button type="button" class="clip" data-gal="video" data-i="${i}">
    <span class="clip-media"><img src="${I('p-' + x.v)}" alt=""><span class="play"><span class="pi" data-icon="arrow"></span></span></span>
    <span class="clip-t">${x.t}</span><span class="clip-s mono">${x.s}</span><span class="clip-n">${x.n}</span></button>`).join('');

  /* ============ 05 ABOUT ============ */
  const traits = [
    ['chat', 'People person', 'The best ideas show up in conversations with sales, customers and the folks doing the work.'],
    ['horns', 'Grew up on metal', 'Still the soundtrack. Loud music, careful work.'],
    ['drum', 'Drummer', 'Timing, feel and keeping the whole band together. Also a decent metaphor for campaigns.'],
    ['dumbbell', 'Health first', 'Lifting, eating well and sleeping enough so I can show up sharp.'],
    ['heart', 'Family guy', 'My wife, our twins and two dogs. They keep me honest and busy.'],
    ['bulb', 'Big thinker', 'I like the whiteboard part: what is this really for?'],
    ['magnifier', 'Detail person', 'And I like the last 5%: the copy, the kerning, the tracking link.']
  ];
  $('#traits').innerHTML = traits.map(([ic, t, d]) => `<li><span class="trait-ico" data-icon="${ic}"></span><div><strong>${t}</strong><span>${d}</span></div></li>`).join('');
  const chips = {
    Strategy: ['Go-to-market', 'Positioning', 'Personas', 'Journey mapping', 'Competitive audits', 'Marketing plans'],
    Demand: ['ABM', 'Lead scoring', 'Attribution', 'Lifecycle + nurture', 'Conferences', 'SEO / SEM', 'Paid social + search'],
    Making: ['Copywriting', 'Design', 'Video', 'Photography', 'Brand systems', 'Sales decks'],
    Tools: ['HubSpot', 'Salesforce', 'GA4 + GTM', 'Webflow', 'WordPress', 'Adobe CC', 'Canva', 'CapCut']
  };
  $('#chips').innerHTML = Object.entries(chips).map(([k, v], i) => `<div class="chip-row"><span class="chip-k mono">${k}</span>${v.map(x => `<span class="chip c${i}">${x}</span>`).join('')}</div>`).join('');

  /* pixel → photo on tap (hover handled in CSS) */
  $$('.swap').forEach(f => {
    f.addEventListener('click', () => f.classList.toggle('on'));
    f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f.classList.toggle('on'); } });
  });

  /* ============ MODAL GALLERY ============ */
  const modal = $('#modal'), mImg = $('#mImg'), mVid = $('#mVid'), mThumbs = $('#mThumbs');
  let gal = null, gi = 0, lastFocus = null;
  const show = () => {
    const it = gal.items[gi];
    $('#mKicker').textContent = `${gal.title} · ${gi + 1} / ${gal.items.length}`;
    $('#mTitle').textContent = it.cap;
    $('#mNote').textContent = it.note || '';
    if (it.vid) { mImg.hidden = true; mVid.hidden = false; mVid.poster = I(it.img); mVid.src = V(it.vid); mVid.play().catch(() => {}); }
    else { mVid.pause(); mVid.removeAttribute('src'); mVid.hidden = true; mImg.hidden = false; mImg.src = I(it.img); mImg.alt = it.cap; }
    $$('button', mThumbs).forEach((b, k) => b.classList.toggle('on', k === gi));
    const cur = mThumbs.children[gi]; if (cur) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
  };
  const open = (key, i = 0) => {
    gal = galleries[key]; gi = i; lastFocus = document.activeElement;
    mThumbs.innerHTML = gal.items.map((it, k) => `<button type="button" data-k="${k}" aria-label="${it.cap}"><img src="${I(it.img)}" alt="" loading="lazy">${it.vid ? '<i></i>' : ''}</button>`).join('');
    modal.hidden = false; document.body.classList.add('lock'); show(); $('#mClose').focus({ preventScroll: true });
  };
  const close = () => { modal.hidden = true; mVid.pause(); document.body.classList.remove('lock'); if (lastFocus) lastFocus.focus({ preventScroll: true }); };
  const step = d => { gi = (gi + d + gal.items.length) % gal.items.length; show(); };
  document.addEventListener('click', e => { const b = e.target.closest('[data-gal]'); if (b) open(b.dataset.gal, +(b.dataset.i || 0)); });
  $('#mClose').addEventListener('click', close);
  $('#mPrev').addEventListener('click', () => step(-1));
  $('#mNext').addEventListener('click', () => step(1));
  mThumbs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { gi = +b.dataset.k; show(); } });
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  /* ============ MISC ============ */
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2000); };
  $('#copyEmail').addEventListener('click', () => {
    const email = 'chrisekribs@gmail.com';
    (navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject())
      .then(() => toast('Email copied'))
      .catch(() => { location.href = 'mailto:' + email; });
  });
  $('#year').textContent = new Date().getFullYear();

  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 10);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const links = $$('.nav-links a');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['approach', 'work', 'results', 'video', 'about', 'contact'].forEach(id => spy.observe(document.getElementById(id)));

  /* reveal on scroll */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = $$('.sec-head, .case, .metric, .steps li, .traits li, .clip');
    els.forEach(el => el.classList.add('rv'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    els.forEach(el => io.observe(el));
  }

  /* keep % and arrows in the clean face; pixel face for digits */
  $$('.num').forEach(el => { el.innerHTML = el.innerHTML.replace(/%|→/g, m => `<span class="u">${m}</span>`); });

  paintIcons();
})();

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const I = n => `/media/i/${n}.jpg`;
  const V = n => `/media/v/${n}.mp4`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============ PIXEL ART: mark + icons ============ */
  const MARK = [
    '###########',
    '#.......##.',
    '#.....##...',
    '#...##.....',
    '#.##.......',
    '###########',
    '#.##.......',
    '#...##.....',
    '#.....##...',
    '#.......##.',
    '###########'
  ];
  const ICONS = {
    arrow: ['...#...', '...##..', '#######', '...##..', '...#...'],
    plus: ['..#..', '..#..', '#####', '..#..', '..#..'],
    heart: ['.##.##.', '#######', '#######', '.#####.', '..###..', '...#...'],
    horns: ['#.....#', '#.....#', '#.....#', '##...##', '#######', '#######', '.#####.', '.#####.', '..###..'],
    drum: ['#.......#', '.#.....#.', '..#...#..', '.#######.', '#.......#', '#########', '#.#.#.#.#', '#.#.#.#.#', '#########'],
    dumbbell: ['##.......##', '###.....###', '###########', '###.....###', '##.......##'],
    bulb: ['..###..', '.#####.', '#######', '#######', '.#####.', '..###..', '..###..', '...#...'],
    magnifier: ['.###....', '#...#...', '#...#...', '#...#...', '.###.#..', '.....##.', '......##'],
    chat: ['#######', '#.....#', '#.#.#.#', '#.....#', '#######', '.##....', '.#.....'],
    play: ['#....', '###..', '#####', '###..', '#....']
  };
  const svgFrom = grid => {
    const w = grid[0].length, h = grid.length;
    let r = '';
    grid.forEach((row, y) => [...row].forEach((c, x) => { if (c === '#') r += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">${r}</svg>`;
  };
  $$('[data-mark]').forEach(el => { el.innerHTML = svgFrom(MARK); });

  /* ============ 01 RESULTS ============ */
  const metrics = [
    ['120%', 'of the annual MQL goal, hit in five months', 'Wellzesta'],
    ['$873K', 'in active pipeline influenced in five months', 'Wellzesta'],
    ['+1,230%', 'organic website traffic in two years', 'PTG'],
    ['201%', 'of MQL goal', 'Courser'],
    ['80%', 'adoption target for a product launch, hit within one quarter', 'Courser'],
    ['+9%', 'ARR in three months, with campaigns across 11 brands', 'Courser'],
    ['43', 'contacts advanced to sales-qualified', 'Wellzesta'],
    ['15', 'net-new demos and 3 opportunities from one conference playbook', 'Wellzesta'],
    ['12%', 'of a 25-account ABM mailer round sat a demo, and 2 deals moved forward', 'Wellzesta']
  ];
  $('#metrics').innerHTML = metrics.map(([n, l, s], i) =>
    `<div class="metric ${i < 3 ? 'lead' : ''}"><span class="num">${n}</span><span class="m-label">${l}</span><span class="m-src mono">${s}</span></div>`).join('');

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
    agency: { title: 'Agency', items: [
      ...['spirits', 'latte', 'loyalty', 'smoothie', 'bar-bites', 'green-juice', 'cocktails', 'pastries', 'juices', 'bar-bites-2', 'boiler-up', 'whiskey', 'chow-now'].map(n => G('uc-' + n, 'Union Club Hotel social · Vast Creative')),
      ...['discover-1', 'discover-2', 'discover-3', 'discover-4', 'discover-5', 'farmers', 'arts', 'stpats', 'guide-1', 'guide-2'].map(n => G('mc-' + n, 'Michigan City destination marketing · WeCreate Media')),
      ...['12-days', '7-days', 'appropriate', 'eye-catching'].map(n => G('play-' + n, 'Community playground donation campaign'))] }
  };
  const cases = [
    { co: 'Wellzesta', when: '2026 – now', role: 'Marketing Manager · senior living software', team: 'Team of one', gal: 'wellzesta',
      pts: ['120% of the annual MQL goal in five months', '$873K active pipeline, 43 SQLs', 'First lead scoring and attribution, live in two months'],
      thumbs: ['wz-sunnyside-mockup', 'wz-ebook', 'wz-linkedin-8'] },
    { co: 'Courser', when: '2023 – 2025', role: 'Regional Marketing Manager · alongside PTG', team: 'Team',
      pts: ['201% of MQL goal', '80% launch adoption target hit in one quarter', '+9% ARR in three months across 11 brands'] },
    { co: 'PTG', when: '2021 – 2025', role: 'Marketing Manager · managed IT services', team: 'Team of one', gal: 'ptg',
      pts: ['+1,230% organic traffic in two years', 'Brand guidelines in year one', 'Sales enablement: guides, QBR decks, webinars'],
      thumbs: ['ptg-brand-01', 'ptg-welcome-cover', 'ptg-sbr-deck'] },
    { co: 'Agency', when: '2018 – 2021', role: 'Vast Creative Co. · WeCreate Media', team: 'Clients', gal: 'agency',
      pts: ['Social for Marriott hotel brands, including the Union Club Hotel', 'Destination marketing for Michigan City, Indiana', 'Brand films and spots for a range of clients'],
      thumbs: ['uc-latte', 'mc-discover-1', 'p-brush-creek'] }
  ];
  $('#cases').innerHTML = cases.map((c, i) => {
    const n = c.gal ? galleries[c.gal].items.length : 0;
    return `<article class="case k${i}">
      <div class="case-meta"><span class="mono">${c.when}</span><span class="pill">${c.team}</span></div>
      <h3 class="case-co">${c.co}</h3>
      <p class="case-role">${c.role}</p>
      <ul class="case-pts">${c.pts.map(p => `<li><span class="pi" data-icon="plus"></span>${p}</li>`).join('')}</ul>
      ${c.thumbs ? `<button type="button" class="case-gal" data-gal="${c.gal}" aria-label="Open ${c.co} work, ${n} pieces">
        <span class="case-thumbs">${c.thumbs.map(t => `<img src="${I(t)}" alt="">`).join('')}</span>
        <span class="case-gal-label">See the work (${n}) <span class="pi" data-icon="arrow"></span></span>
      </button>` : ''}
    </article>`;
  }).join('');

  const videos = [
    ['wz-explainer', 'Wellzesta explainer'], ['wz-immanuel', 'Customer testimonial'], ['wz-resident-intro', 'Resident onboarding'], ['wz-marvella', 'Resident social cut'],
    ['ptg-cyber', 'Webinar promo'], ['ptg-clip', 'Leadership soundbites'], ['brush-creek', 'Brush Creek Ranch brand film'], ['venue-nd', 'Venue ND :30'],
    ['weber', 'Weber Family Dentistry :30'], ['santiago', 'Santiago Partnership'], ['maxq', 'MaxQ AI event recap'], ['delicious-journeys', 'Delicious Journeys'], ['michigan-city', 'Michigan City summer']
  ];
  galleries.video = { title: 'Video', items: videos.map(([v, t]) => G('p-' + v, t, v)) };
  $('#reel').innerHTML = videos.map(([v, t], i) => `<button type="button" class="clip" data-gal="video" data-i="${i}">
    <span class="clip-media"><img src="${I('p-' + v)}" alt=""><span class="play"><span class="pi" data-icon="play"></span></span></span>
    <span class="clip-t">${t}</span></button>`).join('');

  /* ============ 03 ABOUT ============ */
  const traits = [['chat', 'People person'], ['bulb', 'Big picture'], ['magnifier', 'Details'], ['drum', 'Drummer'], ['horns', 'Metal'], ['dumbbell', 'Health'], ['heart', 'Family']];
  $('#traits').innerHTML = traits.map(([ic, t]) => `<li><span class="pi" data-icon="${ic}"></span>${t}</li>`).join('');

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
  ['results', 'work', 'about', 'contact'].forEach(id => spy.observe(document.getElementById(id)));

  if (!reduce && 'IntersectionObserver' in window) {
    const els = $$('.metric, .case, .clip');
    els.forEach(el => el.classList.add('rv'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
    els.forEach(el => io.observe(el));
  }

  /* % and $ in the clean face; digits in the pixel face */
  $$('.num').forEach(el => { el.innerHTML = el.innerHTML.replace(/[%$+,]/g, m => `<span class="u">${m}</span>`); });
  $$('[data-icon]').forEach(el => { el.innerHTML = svgFrom(ICONS[el.dataset.icon] || ICONS.plus); });
})();

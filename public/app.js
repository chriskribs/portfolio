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
    play: ['#....', '###..', '#####', '###..', '#....'],
    target: ['#########', '#.......#', '#.#####.#', '#.#...#.#', '#.#.#.#.#', '#.#...#.#', '#.#####.#', '#.......#', '#########'],
    bars: ['.......##', '.......##', '....##.##', '....##.##', '.##.##.##', '.##.##.##', '.##.##.##', '.........', '#########'],
    up: ['....#....', '...###...', '..#####..', '.#######.', '###.#.###', '....#....', '....#....', '....#....', '....#....']
  };
  const svgFrom = grid => {
    const w = grid[0].length, h = grid.length;
    let r = '';
    grid.forEach((row, y) => [...row].forEach((c, x) => { if (c === '#') r += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">${r}</svg>`;
  };
  $$('[data-mark]').forEach(el => { el.innerHTML = svgFrom(MARK); });

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
  const videos = [
    ['wz-explainer', 'Wellzesta explainer'], ['wz-immanuel', 'Customer testimonial'], ['wz-resident-intro', 'Resident onboarding'], ['wz-marvella', 'Resident social cut'],
    ['ptg-cyber', 'Webinar promo'], ['ptg-clip', 'Leadership soundbites'], ['brush-creek', 'Brush Creek Ranch brand film'], ['venue-nd', 'Venue ND :30'],
    ['weber', 'Weber Family Dentistry :30'], ['santiago', 'Santiago Partnership'], ['maxq', 'MaxQ AI event recap'], ['delicious-journeys', 'Delicious Journeys'], ['michigan-city', 'Michigan City summer']
  ];
  galleries.video = { title: 'Video', items: videos.map(([v, t]) => G('p-' + v, t, v)) };
  /* ============ 01 WORK + RESULTS (bento) ============ */
  const groups = {
    all: { label: 'All' },
    wellzesta: { label: 'Wellzesta', note: 'Marketing Manager, 2026 – now · senior living software · team of one' },
    courser: { label: 'Courser', note: 'Regional Marketing Manager, 2023 – 2025, alongside PTG · campaigns across 11 brands' },
    ptg: { label: 'PTG', note: 'Marketing Manager, 2021 – 2025 · managed IT services · team of one' },
    agency: { label: 'Agency', note: 'Vast Creative Co. and WeCreate Media, 2018 – 2021 · hotels, towns and small businesses' },
    video: { label: 'Video', note: 'Brand films, testimonials, spots and social cuts. I write, shoot and edit.' }
  };
  /* w = work piece, r = result. size: s 1x1, w 2x1, t 1x2, b 2x2 */
  const W = (g, img, size, cap, vid, loop) => ({ k: 'w', g, img, size, cap, vid, loop });
  const R = (g, n, l, size = 's') => ({ k: 'r', g, n, l, size });
  const tiles = [
    W('wellzesta', 'wz-sunnyside-mockup', 'b', 'Customer case study'),
    R('wellzesta', '120%', 'of the annual MQL goal, hit in five months'),
    W('wellzesta', 'p-wz-linkedin-anim', 's', 'LinkedIn loop', 'wz-linkedin-anim', true),
    W('wellzesta', 'wz-ebook', 't', 'Ebook: app rollout'),
    R('wellzesta', '$873K', 'active pipeline influenced in five months'),
    W('ptg', 'ptg-brand-01', 'w', 'Brand guidelines, built in year one'),
    R('ptg', '+1,230%', 'organic web traffic in two years'),
    W('wellzesta', 'wz-kyle-leadingage-va', 's', 'Conference promo'),
    R('wellzesta', '15', 'net-new demos and 3 opportunities from one conference playbook'),
    W('video', 'p-brush-creek', 'w', 'Brush Creek Ranch brand film', 'brush-creek'),
    R('courser', '201%', 'of MQL goal'),
    W('agency', 'uc-latte', 's', 'Union Club Hotel social'),
    W('ptg', 'ptg-welcome-cover', 's', 'Customer welcome guide'),
    R('wellzesta', '3 + 2', 'demos sat and deals moved forward from 25 ABM mailers'),
    W('wellzesta', 'wz-report', 's', 'Resident engagement report'),
    W('agency', 'mc-discover-1', 'w', 'Michigan City destination campaign'),
    R('courser', '80%', 'adoption target for a launch, hit within one quarter'),
    W('ptg', 'ptg-sbr-deck', 't', 'Quarterly business review deck'),
    W('wellzesta', 'p-wz-wellness-chart', 's', 'Product motion', 'wz-wellness-chart', true),
    R('courser', '+9%', 'ARR in three months, campaigns across 11 brands'),
    W('video', 'p-wz-immanuel', 'w', 'Customer testimonial', 'wz-immanuel'),
    R('wellzesta', '43', 'contacts advanced to sales-qualified'),
    W('ptg', 'ptg-buyers-guide', 's', "Buyer's guide"),
    W('agency', 'uc-cocktails', 's', 'Union Club Hotel social'),
    W('video', 'p-venue-nd', 's', 'Venue ND :30', 'venue-nd'),
    W('wellzesta', 'wz-cs-tandem', 's', 'Case study: Tandem'),
    W('ptg', 'p-ptg-cyber', 's', 'Webinar promo', 'ptg-cyber'),
    W('video', 'p-wz-explainer', 'w', 'Wellzesta explainer', 'wz-explainer'),
    W('agency', 'mc-guide-1', 's', 'Pocket city guide'),
    W('video', 'p-weber', 's', 'Weber Family Dentistry :30', 'weber')
  ];
  const tag = g => groups[g].label;
  $('#filters').innerHTML = Object.entries(groups).map(([k, g]) => `<button type="button" role="tab" class="filter" data-f="${k}" aria-selected="${k === 'all'}">${g.label}</button>`).join('');
  const bento = $('#bento');
  bento.innerHTML = tiles.map((t, i) => t.k === 'r'
    ? `<div class="tile res ${t.size}" data-g="${t.g}"><span class="num">${t.n}</span><span class="res-l">${t.l}</span><span class="tile-tag mono">${tag(t.g)}</span></div>`
    : `<button type="button" class="tile work ${t.size}" data-g="${t.g}" data-t="${i}" aria-label="${t.cap}, ${tag(t.g)}">
        ${t.loop ? `<video src="${V(t.vid)}" poster="${I(t.img)}" muted loop playsinline preload="none"></video>` : `<img src="${I(t.img)}" alt="" loading="lazy">`}
        ${t.vid && !t.loop ? '<span class="play"><span class="pi" data-icon="play"></span></span>' : ''}
        <span class="tile-cap"><span class="tile-tag mono">${tag(t.g)}</span>${t.cap}</span>
      </button>`).join('');
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('.filter'); if (!b) return;
    const f = b.dataset.f;
    $$('.filter').forEach(x => x.setAttribute('aria-selected', x === b));
    $$('.tile', bento).forEach(t => { t.hidden = f !== 'all' && t.dataset.g !== f; });
    const note = $('#filterNote');
    note.textContent = groups[f].note || '';
    if (galleries[f]) note.insertAdjacentHTML('beforeend', ` <button type="button" class="link" data-gal="${f}">Open all ${galleries[f].items.length} pieces</button>`);
  });
  /* looping clips play only while on screen */
  const loopIO = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting && !reduce) v.play().catch(() => {}); else v.pause(); }), { threshold: .3 });
  $$('video', bento).forEach(v => loopIO.observe(v));
  /* tile click → that piece in its gallery */
  bento.addEventListener('click', e => {
    const b = e.target.closest('.tile.work'); if (!b) return;
    const t = tiles[+b.dataset.t];
    const key = t.vid && !t.loop ? 'video' : t.g;
    const i = galleries[key].items.findIndex(x => x.img === t.img);
    open(key, Math.max(0, i));
  });

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
  ['work', 'about', 'contact'].forEach(id => spy.observe(document.getElementById(id)));

  if (!reduce && 'IntersectionObserver' in window) {
    const els = $$('.tile');
    els.forEach(el => el.classList.add('rv'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
    els.forEach(el => io.observe(el));
  }

  /* % and $ in the clean face; digits in the pixel face */
  $$('.num').forEach(el => { el.innerHTML = el.innerHTML.replace(/[%$+,]/g, m => `<span class="u">${m}</span>`); });
  $$('[data-icon]').forEach(el => { el.innerHTML = svgFrom(ICONS[el.dataset.icon] || ICONS.plus); });
})();

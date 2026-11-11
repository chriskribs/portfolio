(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const I = n => `/media/i/${n}.jpg`;
  const V = n => `/media/v/${n}.mp4`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ================= PIXEL BITS ================= */
  const MARK = ['###########', '#.......##.', '#.....##...', '#...##.....', '#.##.......', '###########', '#.##.......', '#...##.....', '#.....##...', '#.......##.', '###########'];
  const ICONS = {
    play: ['#......', '###....', '#####..', '#######', '#####..', '###....', '#......'],
    pause: ['##.##', '##.##', '##.##', '##.##', '##.##'],
    target: ['#########', '#.......#', '#.#####.#', '#.#...#.#', '#.#.#.#.#', '#.#...#.#', '#.#####.#', '#.......#', '#########'],
    bars: ['.......##', '.......##', '....##.##', '....##.##', '.##.##.##', '.##.##.##', '.##.##.##', '.........', '#########'],
    up: ['....#....', '...###...', '..#####..', '.#######.', '###.#.###', '....#....', '....#....', '....#....', '....#....'],
    heart: ['.##.##.', '#..#..#', '#.....#', '.#...#.', '..#.#..', '...#...'],
    chat: ['#######', '#.....#', '#.....#', '#.....#', '#######', '.#.....', '#......'],
    send: ['......#', '....##.', '..##.#.', '##..#..', '..#.#..', '...##..', '....#..'],
    save: ['#####', '#...#', '#...#', '#...#', '#.#.#', '##.##', '#...#'],
    sound: ['...#....', '..##..#.', '####.#.#', '####.#.#', '####.#.#', '..##..#.', '...#....'],
    mute: ['...#....', '..##....', '####.#.#', '####..#.', '####.#.#', '..##....', '...#....'],
    full: ['###.###', '#.....#', '#.....#', '.......', '#.....#', '#.....#', '###.###'],
    star: ['...#...', '...#...', '..###..', '#######', '..###..', '...#...', '...#...']
  };
  const svg = g => {
    let r = '';
    g.forEach((row, y) => [...row].forEach((c, x) => { if (c === '#') r += `<rect x="${x}" y="${y}" width="1" height="1"/>`; }));
    return `<svg viewBox="0 0 ${g[0].length} ${g.length}" shape-rendering="crispEdges" fill="currentColor" aria-hidden="true">${r}</svg>`;
  };
  const ic = n => `<span class="pi">${svg(ICONS[n])}</span>`;
  const paint = (root = document) => {
    $$('[data-mark]', root).forEach(el => { el.innerHTML = svg(MARK); });
    $$('[data-icon]', root).forEach(el => { el.innerHTML = svg(ICONS[el.dataset.icon]); });
  };

  /* ================= MARQUEE ================= */
  const tapeA = ['Chris Kribs', 'B2B marketing', 'Greenville, SC', 'Strategy + making', 'Results on the board'];
  const tapeB = ['Wellzesta', 'PTG', 'Courser', 'Union Club Hotel', 'Brush Creek Ranch', 'Michigan City', 'MaxQ AI', 'Venue ND'];
  const tape = a => { const h = a.map(t => `<span>${t}</span>${ic('star')}`).join(''); return h + h + h; };
  $('#tapeA').innerHTML = tape(tapeA); $('#tapeB').innerHTML = tape(tapeB);

  const ME = { name: 'Chris Kribs', img: '/media/i/me-headshot.jpg' };

  /* ================= PROJECTS ================= */
  const P = [
    { id: 'wz-demand', co: 'Wellzesta', title: 'The pipeline engine', type: 'Case studies · ebooks · reports · email', year: '2026',
      result: '120% of MQL goal in 5 months', sum: 'A department of one for a senior living software company. I set the plan with leadership and sales, then wrote and designed the content that fed it.',
      results: ['120% of the annual MQL goal in five months', '$873K active pipeline influenced', '43 contacts advanced to SQL', 'Lead scoring + attribution live in two months'],
      peek: ['wz-sunnyside-mockup', 'wz-ebook', 'wz-report'],
      blocks: [
        { t: 'book', title: 'Case study: Sunnyside', pages: ['wz-cs-sunnyside', 'wz-cs-sunnyside-2'] },
        { t: 'book', title: 'Ebook: the rollout that almost failed', pages: ['wz-ebook', 'wz-ebook-3'] },
        { t: 'book', title: 'Resident engagement report', pages: ['wz-report', 'wz-report-2'] },
        { t: 'email', title: 'Customer newsletters', mails: [['wz-newsletter-oct', 'October: what\'s new in Wellzesta'], ['wz-newsletter-june', 'June: summer engagement ideas']] },
        { t: 'book', title: 'One-pagers + case study: Tandem', pages: ['wz-cs-tandem', 'wz-ai-menu', 'wz-signup-flyer', 'wz-onboarding'] }
      ] },
    { id: 'wz-social', co: 'Wellzesta', title: 'Launches, social + events', type: 'LinkedIn · product launches · conferences', year: '2026',
      result: '15 demos + 3 opps from one playbook', sum: 'Feature launches, product motion and a conference playbook that runs the same way before, during and after every show.',
      results: ['15 net-new demos and 3 opportunities from the conference playbook', '3 demos sat and 2 deals moved forward from 25 ABM mailers'],
      peek: ['wz-linkedin-8', 'wz-kyle-leadingage-va', 'wz-zesty'],
      blocks: [
        { t: 'feed', title: 'The feed', role: 'Marketing Manager at Wellzesta', stats: [['MQL goal', '120%'], ['Conference demos', '15'], ['Opportunities', '3']], posts: [
          { carousel: ['wz-zesty', 'wz-zesty-2'], cap: 'Launch day. Zesty is the AI concierge we built for senior living communities, and this carousel is how we introduced it: what it does first, how it helps staff second.', tags: '#productlaunch #seniorliving', when: '2w' },
          { img: 'wz-kyle-leadingage-va', cap: 'Headed to LeadingAge Virginia. Every show runs on the same before, during and after playbook now. So far it has produced 15 net-new demos and 3 opportunities.', tags: '#conferences #b2bmarketing', when: '1mo' },
          { vid: 'wz-linkedin-anim', img: 'p-wz-linkedin-anim', cap: 'Ten seconds of motion beats a paragraph of features. Made this loop to show everything residents can reach from one screen.', tags: '#motiondesign', when: '1mo' },
          { carousel: ['wz-rollout-carousel', 'wz-rollout-carousel-2'], cap: 'Most app rollouts don\'t fail at launch. They stall in week three. Three reasons why, and what to do about each one.', tags: '#customermarketing', when: '2mo' },
          { vid: 'wz-expiration', img: 'p-wz-expiration', cap: 'Small feature, real problem solved: messages that clean up after themselves. Feature posts like this one keep existing customers using more of the product.', tags: '#adoption', when: '2mo' },
          { img: 'wz-vista-leadingage', cap: 'LeadingAge NJ/DE next. Same playbook, new booth.', tags: '#conferences', when: '3mo' },
          { vid: 'wz-wellness-chart', img: 'p-wz-wellness-chart', cap: 'Wellness data, at a glance. A product motion piece for sales decks and social.', tags: '#productmarketing', when: '3mo' },
          { img: 'wz-brookhaven-docs', cap: 'Feature spotlight: documents, one tap away for residents.', tags: '#feature', when: '4mo' },
          { img: 'wz-linkedin-8', cap: 'Ask Zesty anything.', tags: '#ai', when: '4mo' }
        ] }
      ] },
    { id: 'wz-video', co: 'Wellzesta', title: 'Video with real residents', type: 'Explainer · testimonial · onboarding', year: '2026',
      result: 'One interview, three uses', sum: 'One afternoon with real residents became a sales testimonial, a resident onboarding video and a social cut. Plus a 45-second explainer sales sends before the first call.',
      results: ['1 shoot → 3 assets', 'Sales, adoption and social covered'], peek: ['wz-source', 'p-wz-immanuel', 'p-wz-explainer'],
      blocks: [
        { t: 'oneclip', title: 'One clip, three uses', src: 'wz-source', srcCap: 'One resident interview at a customer community.', uses: [
          ['wz-immanuel', 'For sales', 'Testimonial film', 'Peer proof for buyers who trust other communities more than vendors.', true],
          ['wz-resident-intro', 'For adoption', 'Resident onboarding', 'Residents hear it from a neighbor, then try the app.'],
          ['wz-marvella', 'For the feed', 'Captioned social cut', '15 seconds, square, captions on, made to stop the scroll.']
        ] },
        { t: 'player', title: 'Explainer', vids: [['wz-explainer', 'Wellzesta in 45 seconds']] }
      ] },
    { id: 'courser', co: 'Courser', title: 'Multi-brand launches', type: 'Launch marketing · research · 11 brands', year: '2023–25',
      result: '80% adoption in one quarter', sum: 'My first team of people who think the way I do, alongside PTG. We shaped the strategy together and ran it across 11 brands.',
      results: ['201% of MQL goal', '80% launch adoption target hit within one quarter', '+9% ARR in three months'], peek: [], card: '201%' },
    { id: 'ptg-brand', co: 'PTG', title: 'Brand + content system', type: 'Brand guidelines · SEO content', year: '2021–25',
      result: '+1,230% organic traffic in 2 yrs', sum: 'A one-person marketing department for a Greenville IT firm. First a brand system so every page looked like the same company, then the content and SEO built on it.',
      results: ['+1,230% organic web traffic in two years', 'Brand guidelines shipped in year one'],
      peek: ['ptg-brand-01', 'ptg-brand-12', 'ptg-brand-14'],
      blocks: [{ t: 'deck', title: 'Brand guidelines', slides: ['ptg-brand-01', 'ptg-brand-05', 'ptg-brand-12', 'ptg-brand-13', 'ptg-brand-14', 'ptg-brand-15', 'ptg-brand-17'] }] },
    { id: 'ptg-kit', co: 'PTG', title: 'The sales enablement kit', type: 'Guides · one-pagers · QBR decks', year: '2021–25',
      result: 'Built from scratch, solo', sum: 'Everything a sales team needs to win a client and keep them: buyer\'s guides, security one-pagers, a welcome guide and quarterly business review decks.',
      results: [], peek: ['ptg-welcome-cover', 'ptg-buyers-guide', 'ptg-sbr-deck'],
      blocks: [
        { t: 'book', title: 'Customer welcome guide', pages: ['ptg-welcome-cover', 'ptg-welcome-open', 'ptg-quick-facts', 'ptg-service-tickets'] },
        { t: 'book', title: 'Buyer\'s guides + security one-pagers', pages: ['ptg-buyers-guide', 'ptg-cyber-guide', 'ptg-edr', 'ptg-password-mockup', 'ptg-cost-mockup', 'ptg-sbr-tv', 'ptg-updates', 'ptg-trends'] },
        { t: 'deck', title: 'QBR + audit decks', slides: ['ptg-sbr-deck', 'ptg-audit-deck', 'ptg-offerings', 'ptg-roadmap', 'ptg-security-training'] }
      ] },
    { id: 'ptg-social', co: 'PTG', title: 'Webinars + social video', type: 'Ads · vertical video', year: '2021–25',
      result: '54-min panel → 40-sec promo', sum: 'Webinar promotion and short vertical video that put a trusted face on an IT firm, in the feed where business owners already scroll.',
      results: [], peek: ['p-ptg-cyber', 'ptg-webinar-ad', 'p-ptg-clip'],
      blocks: [
        { t: 'phone', title: 'Vertical video', vids: [['ptg-cyber', 'Cyber insurance webinar promo'], ['ptg-clip', 'Leadership soundbites']] },
        { t: 'feed', title: 'Paid + organic social', role: 'Marketing Manager at PTG', posts: [
          { img: 'ptg-webinar-ad', cap: 'Cyber insurance requirements changed fast. We ran a panel webinar on what it meant for local businesses and promoted it with ads like this one.', tags: '#webinar #cybersecurity', when: '2y' },
          { vid: 'ptg-social', img: 'p-ptg-clip', cap: 'Your IT team, in 10 seconds.', tags: '#managedIT', when: '2y' },
          { img: 'ptg-essentials-ad', cap: 'IT essentials for growing businesses. A paid social ad for business owners.', tags: '#smallbusiness', when: '2y' }
        ] }
      ] },
    { id: 'union', co: 'Union Club Hotel · Vast Creative', title: 'Walk-in stories', type: 'Instagram stories · weekly', year: '2021',
      result: 'Weekly, for 3 outlets', sum: 'Weekly stories for a university hotel\'s restaurant, bar and coffee shop, for Marriott brands at Vast Creative.',
      results: [], peek: ['uc-latte', 'uc-cocktails', 'uc-smoothie'],
      blocks: [{ t: 'stories', title: 'Stories', handle: 'Union Club Hotel', imgs: ['uc-latte', 'uc-spirits', 'uc-loyalty', 'uc-smoothie', 'uc-bar-bites', 'uc-green-juice', 'uc-cocktails', 'uc-pastries', 'uc-juices', 'uc-bar-bites-2', 'uc-boiler-up'] },
        { t: 'feed', title: 'Feed posts', role: 'Social Media Manager at Vast Creative', posts: [{ img: 'uc-whiskey', cap: 'Whiskey Wednesday at the hotel bar. One of the weekly posts I made for the Union Club Hotel.', tags: '#hospitality', when: '5y' }, { img: 'uc-chow-now', cap: 'Order ahead, skip the line. Built to get people ordering.', tags: '#socialmedia', when: '5y' }] }] },
    { id: 'mc', co: 'Michigan City · WeCreate Media', title: 'Destination campaign', type: 'Social · posters · city guide · video', year: '2019',
      result: 'Restaurants, events, guide, film', sum: 'A restaurant series, event posters, a pocket city guide and a summer film for a Lake Michigan town.',
      results: [], peek: ['mc-discover-1', 'mc-stpats', 'mc-guide-1'],
      blocks: [
        { t: 'feed', title: 'Discover series', role: 'Account Manager at WeCreate Media', posts: [{ carousel: ['mc-discover-1', 'mc-discover-2', 'mc-discover-3', 'mc-discover-4', 'mc-discover-5'], square: true, cap: 'The Discover series: one local restaurant at a time, so a weekend visit has a plan before anyone leaves home.', tags: '#destinationmarketing', when: '6y' }] },
        { t: 'board', title: 'Event posters', imgs: ['mc-stpats', 'mc-farmers', 'mc-arts'] },
        { t: 'deck', title: 'Pocket city guide', slides: ['mc-guide-1', 'mc-guide-2'] },
        { t: 'player', title: 'Summer film', vids: [['michigan-city', 'Michigan City summer']] }
      ] },
    { id: 'films', co: 'Agency + in-house', title: 'Brand films + spots', type: 'Directed · shot · edited', year: '2018–26',
      result: '7 films, written, shot + cut', sum: 'Brand films, :30 spots and event recaps. I write, shoot and cut them.',
      results: [], peek: ['p-brush-creek', 'p-venue-nd', 'p-santiago'],
      blocks: [{ t: 'player', title: 'Films', vids: [['brush-creek', 'Summer at the Ranch · Brush Creek Ranch'], ['venue-nd', 'Venue ND :30'], ['weber', 'Leave Smiling · Weber Family Dentistry'], ['santiago', 'The Santiago Partnership'], ['maxq', 'RSNA 2019 recap · MaxQ AI'], ['delicious-journeys', 'Delicious Journeys'], ['better-than-rich', 'Better Than Rich · logo animation']] }] }
  ];

  /* index rows */
  const idx = $('#index');
  idx.innerHTML = P.map((p, i) => `<li>
    <${p.blocks ? 'button type="button"' : 'div'} class="row${p.blocks ? '' : ' static'}" data-i="${i}">
      <span class="r-n px">${String(i + 1).padStart(2, '0')}</span>
      <span class="r-title"><b>${p.title}</b><small>${p.co}</small></span>
      <span class="r-type">${p.type}</span>
      <span class="r-res">${p.result}</span>
      <span class="r-year">${p.year}</span>
      ${p.peek[0] ? `<img class="r-thumb" src="${I(p.peek[0])}" alt="" loading="lazy">` : ''}
    </${p.blocks ? 'button' : 'div'}></li>`).join('');

  /* peek that follows the cursor and flips through a few pieces */
  const peek = $('#peek'), peekIn = $('#peekIn');
  let peekT = null, px = 0, py = 0, tx = 0, ty = 0, peekOn = false;
  const showPeek = p => {
    clearInterval(peekT);
    if (!p.peek.length) { peekIn.innerHTML = `<div class="peek-card"><b>${p.card}</b><span>${p.results[0]}</span></div>`; }
    else {
      peekIn.innerHTML = p.peek.map((n, k) => `<img src="${I(n)}" alt="" class="${k === 0 ? 'on' : ''}">`).join('');
      let k = 0; const imgs = $$('img', peekIn);
      peekT = setInterval(() => { imgs[k].classList.remove('on'); k = (k + 1) % imgs.length; imgs[k].classList.add('on'); }, 900);
    }
    peek.classList.add('on');
  };
  if (fine) {
    idx.addEventListener('mouseover', e => { const r = e.target.closest('.row'); if (r && r.dataset.cur !== '1') { $$('.row', idx).forEach(x => x.dataset.cur = ''); r.dataset.cur = '1'; showPeek(P[+r.dataset.i]); } });
    idx.addEventListener('mouseleave', () => { peek.classList.remove('on'); clearInterval(peekT); $$('.row', idx).forEach(x => x.dataset.cur = ''); });
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; if (!peekOn) { px = tx; py = ty; peekOn = true; } });
    const loop = () => { px += (tx - px) * .14; py += (ty - py) * .14; peek.style.transform = `translate(${px + 30}px, ${py - 130}px)`; requestAnimationFrame(loop); };
    loop();
  }

  /* ================= RESULTS LEDGER ================= */
  const L = [
    ['120%', 'of the annual MQL goal, hit in five months', 'Wellzesta'],
    ['$873K', 'active pipeline influenced in five months', 'Wellzesta'],
    ['43', 'contacts advanced to sales-qualified', 'Wellzesta'],
    ['15', 'net-new demos and 3 opportunities from one conference playbook', 'Wellzesta'],
    ['3 → 2', 'demos sat, then deals moved forward, from 25 ABM mailers', 'Wellzesta'],
    ['201%', 'of MQL goal', 'Courser'],
    ['80%', 'adoption target for a launch, hit within one quarter', 'Courser'],
    ['+9%', 'ARR in three months, campaigns across 11 brands', 'Courser'],
    ['+1,230%', 'organic web traffic in two years', 'PTG']
  ];
  $('#ledger').innerHTML = L.map(([n, l, s]) => `<div class="x"><div class="led cut"><b>${n}</b><span>${l}</span><small>${s}</small></div></div>`).join('');

  /* ================= VIEWER + MOCKUPS ================= */
  const viewer = $('#viewer'), vBlocks = $('#vBlocks');
  let cur = -1, cleanups = [];
  const openable = P.map((p, i) => p.blocks ? i : -1).filter(i => i >= 0);

  const time = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const mk = {
    player(b) {
      const el = document.createElement('div'); el.className = 'm-player';
      el.innerHTML = `<div class="pl-screen"><video playsinline preload="metadata"></video><button type="button" class="pl-big" aria-label="Play">${ic('play')}</button></div>
        <div class="pl-bar"><button type="button" class="pl-pp" aria-label="Play or pause">${ic('play')}</button><span class="pl-t">0:00</span>
          <div class="pl-track"><i class="pl-fill"></i></div><span class="pl-d">0:00</span>
          <button type="button" class="pl-mute" aria-label="Mute">${ic('sound')}</button><button type="button" class="pl-fs" aria-label="Full screen">${ic('full')}</button></div>
        ${b.vids.length > 1 ? `<div class="pl-list">${b.vids.map(([v, t], k) => `<button type="button" data-k="${k}" class="${k ? '' : 'on'}"><img src="${I('p-' + v)}" alt="" loading="lazy"><span>${t}</span></button>`).join('')}</div>` : `<p class="pl-title">${b.vids[0][1]}</p>`}`;
      const v = $('video', el), fill = $('.pl-fill', el), pp = $('.pl-pp', el), big = $('.pl-big', el);
      const load = k => { const [id] = b.vids[k]; v.src = V(id); v.poster = I('p-' + id); $$('.pl-list button', el).forEach((x, j) => x.classList.toggle('on', j === k)); };
      load(0);
      const sync = () => { const p = !v.paused; pp.innerHTML = ic(p ? 'pause' : 'play'); big.hidden = p; };
      v.addEventListener('play', sync); v.addEventListener('pause', sync);
      v.addEventListener('timeupdate', () => { fill.style.width = (v.currentTime / (v.duration || 1) * 100) + '%'; $('.pl-t', el).textContent = time(v.currentTime); });
      v.addEventListener('loadedmetadata', () => { $('.pl-d', el).textContent = time(v.duration); });
      const toggle = () => (v.paused ? v.play() : v.pause());
      [pp, big].forEach(x => x.addEventListener('click', toggle)); v.addEventListener('click', toggle);
      $('.pl-track', el).addEventListener('click', e => { const r = e.currentTarget.getBoundingClientRect(); v.currentTime = (e.clientX - r.left) / r.width * (v.duration || 0); });
      $('.pl-mute', el).addEventListener('click', e => { v.muted = !v.muted; e.currentTarget.innerHTML = ic(v.muted ? 'mute' : 'sound'); });
      $('.pl-fs', el).addEventListener('click', () => { (v.requestFullscreen || v.webkitEnterFullscreen || (() => {})).call(v); });
      $$('.pl-list button', el).forEach(x => x.addEventListener('click', () => { load(+x.dataset.k); v.play().catch(() => {}); }));
      cleanups.push(() => v.pause());
      return el;
    },
    phone(b) {
      const el = document.createElement('div'); el.className = 'm-phones';
      el.innerHTML = b.vids.map(([v, t]) => `<figure><div class="phone"><div class="phone-notch"></div><video src="${V(v)}" poster="${I('p-' + v)}" playsinline controls preload="metadata"></video></div><figcaption>${t}</figcaption></figure>`).join('');
      cleanups.push(() => $$('video', el).forEach(v => v.pause()));
      return el;
    },
    feed(b) {
      const el = document.createElement('div'); el.className = 'm-feed';
      const post = p => {
        const media = p.carousel
          ? `<div class="car"><div class="car-track">${p.carousel.map(n => `<img src="${I(n)}" alt="" loading="lazy"${p.square ? ' style="aspect-ratio:1"' : ''}>`).join('')}</div><span class="car-dots">${p.carousel.map((_, k) => `<i class="${k ? '' : 'on'}"></i>`).join('')}</span><button type="button" class="car-btn car-prev" aria-label="Previous slide">‹</button><button type="button" class="car-btn car-next" aria-label="Next slide">›</button></div>`
          : p.vid ? `<video src="${V(p.vid)}" poster="${I(p.img)}" muted loop playsinline preload="none"></video>` : `<img src="${I(p.img)}" alt="" loading="lazy">`;
        return `<article class="post"><header><img src="${ME.img}" alt=""><span><b>${ME.name}</b><small>${b.role}</small><small>${p.when || '1w'} · ${ic('star')}</small></span><span class="dots">···</span></header>
          <p class="post-text">${p.cap}${p.tags ? ` <span class="hash">${p.tags}</span>` : ''}</p>
          <div class="post-media">${media}</div>
          <div class="post-acts"><span>${ic('heart')} Like</span><span>${ic('chat')} Comment</span><span>${ic('send')} Share</span></div></article>`;
      };
      el.innerHTML = `<aside class="prof"><div class="prof-cover"></div><img src="${ME.img}" alt="Chris Kribs"><div><b>${ME.name}</b><span>${b.role}</span><span>Greenville, SC</span></div>
        ${b.stats ? `<ul>${b.stats.map(([k, v]) => `<li><span>${k}</span><b>${v}</b></li>`).join('')}</ul>` : ''}</aside>
        <div class="feed-col">${b.posts.map(post).join('')}</div>`;
      $$('.car', el).forEach(c => {
        let k = 0; const n = $$('img', c).length;
        const go = d => { k = (k + d + n) % n; $('.car-track', c).style.transform = `translateX(-${k * 100}%)`; $$('.car-dots i', c).forEach((x, j) => x.classList.toggle('on', j === k)); };
        $('.car-next', c).addEventListener('click', () => go(1)); $('.car-prev', c).addEventListener('click', () => go(-1));
      });
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause(); }), { threshold: .5 });
      $$('video', el).forEach(v => io.observe(v));
      cleanups.push(() => { io.disconnect(); $$('video', el).forEach(v => v.pause()); });
      return el;
    },
    oneclip(b) {
      const el = document.createElement('div'); el.className = 'oneclip';
      el.innerHTML = `<div class="oc-src"><figure class="x" style="--xc: var(--red)"><img class="cut" src="${I(b.src)}" alt=""></figure>
          <figcaption>${b.srcCap}</figcaption><span class="scrawl">one shoot → three jobs</span></div>
        <div class="oc-uses">${b.uses.map(([v, tag, t, note, wide], k) => `<div class="oc-use${wide ? ' wide' : ''}">
          <span class="tag ${['red', 'volt', ''][k]}">${k + 1} · ${tag}</span>
          <video src="${V(v)}" poster="${I('p-' + v)}" controls playsinline preload="metadata"></video>
          <b class="pl-title">${t}</b><p>${note}</p></div>`).join('')}</div>`;
      cleanups.push(() => $$('video', el).forEach(v => v.pause()));
      return el;
    },
    stories(b) {
      const el = document.createElement('div'); el.className = 'm-phones';
      el.innerHTML = `<div class="phone story"><div class="story-bars">${b.imgs.map(() => '<i><b></b></i>').join('')}</div>
        <div class="story-head"><b>${b.handle}</b><small>2h</small></div>
        ${b.imgs.map((n, k) => `<img src="${I(n)}" alt="" class="${k ? '' : 'on'}" loading="lazy">`).join('')}
        <button type="button" class="st-prev" aria-label="Previous story"></button><button type="button" class="st-next" aria-label="Next story"></button></div>
        <p class="m-hint">Tap the sides to skip. Stories advance on their own.</p>`;
      const imgs = $$('img', el), bars = $$('.story-bars i', el); let k = 0, t;
      const go = n => {
        k = (n + imgs.length) % imgs.length;
        imgs.forEach((x, j) => x.classList.toggle('on', j === k));
        bars.forEach((x, j) => { x.className = j < k ? 'done' : ''; });
        void bars[k].offsetWidth; bars[k].className = 'run';
        clearTimeout(t); t = setTimeout(() => go(k + 1), 4000);
      };
      $('.st-next', el).addEventListener('click', () => go(k + 1));
      $('.st-prev', el).addEventListener('click', () => go(k - 1));
      setTimeout(() => go(0), 50);
      cleanups.push(() => clearTimeout(t));
      return el;
    },
    book(b) {
      const el = document.createElement('div'); el.className = 'm-book';
      el.innerHTML = `<div class="book"><div class="pg left"></div><div class="pg right"></div></div>
        <div class="book-nav"><button type="button" class="bk-prev">← Prev</button><span class="bk-n"></span><button type="button" class="bk-next">Next →</button></div>`;
      const book = $('.book', el), left = $('.left', el), right = $('.right', el), pages = b.pages;
      let i = 0, busy = false;
      const img = n => n ? `<img src="${I(n)}" alt="" loading="lazy">` : '';
      const render = () => {
        left.innerHTML = img(pages[i - 1]); right.innerHTML = img(pages[i]);
        left.classList.toggle('empty', !pages[i - 1]); right.classList.toggle('empty', !pages[i]);
        book.classList.toggle('closed', i === 0);
        book.classList.toggle('ended', i >= pages.length);
        $('.bk-n', el).textContent = i === 0 ? 'Cover' : `${Math.min(i, pages.length)}–${Math.min(i + 1, pages.length)} / ${pages.length}`;
        $('.bk-prev', el).disabled = i === 0; $('.bk-next', el).disabled = i >= pages.length;
      };
      const flip = dir => {
        if (busy) return;
        if (dir > 0 && i >= pages.length) return;
        if (dir < 0 && i === 0) return;
        busy = true;
        const leaf = document.createElement('div');
        leaf.className = 'leaf ' + (dir > 0 ? 'fwd' : 'back');
        leaf.innerHTML = dir > 0
          ? `<div class="face front">${img(pages[i])}</div><div class="face backf">${img(pages[i + 1])}</div>`
          : `<div class="face front">${img(pages[i - 1])}</div><div class="face backf">${img(pages[i - 2])}</div>`;
        book.appendChild(leaf);
        if (dir > 0) { right.innerHTML = img(pages[i + 2]); right.classList.toggle('empty', !pages[i + 2]); }
        else { left.innerHTML = img(pages[i - 3]); left.classList.toggle('empty', !pages[i - 3]); }
        if (dir > 0 && i === 0) book.classList.remove('closed');
        requestAnimationFrame(() => requestAnimationFrame(() => leaf.classList.add('go')));
        setTimeout(() => { i += dir * 2; leaf.remove(); render(); busy = false; }, reduce ? 0 : 900);
      };
      $('.bk-next', el).addEventListener('click', () => flip(1));
      $('.bk-prev', el).addEventListener('click', () => flip(-1));
      right.addEventListener('click', () => flip(1)); left.addEventListener('click', () => flip(-1));
      render();
      return el;
    },
    deck(b) {
      const el = document.createElement('div'); el.className = 'm-deck';
      el.innerHTML = `<div class="deck-screen"><div class="deck-view"><div class="deck-track">${b.slides.map(n => `<div class="slide"><img src="${I(n)}" alt="" loading="lazy"></div>`).join('')}</div></div>
        <button type="button" class="dk-prev" aria-label="Previous slide">‹</button><button type="button" class="dk-next" aria-label="Next slide">›</button><span class="dk-n"></span></div>
        <div class="deck-thumbs">${b.slides.map((n, k) => `<button type="button" data-k="${k}"><img src="${I(n)}" alt="" loading="lazy"></button>`).join('')}</div>`;
      let k = 0;
      const go = n => { k = (n + b.slides.length) % b.slides.length; $('.deck-track', el).style.transform = `translateX(-${k * 100}%)`; $('.dk-n', el).textContent = `${k + 1} / ${b.slides.length}`; $$('.deck-thumbs button', el).forEach((x, j) => x.classList.toggle('on', j === k)); };
      $('.dk-prev', el).addEventListener('click', () => go(k - 1)); $('.dk-next', el).addEventListener('click', () => go(k + 1));
      $$('.deck-thumbs button', el).forEach(x => x.addEventListener('click', () => go(+x.dataset.k)));
      go(0);
      return el;
    },
    email(b) {
      const el = document.createElement('div'); el.className = 'm-mail';
      el.innerHTML = `<div class="mail"><div class="mail-top"><i></i><i></i><i></i><span>Inbox</span></div>
        <div class="mail-body"><ul class="mail-list">${b.mails.map(([n, s], k) => `<li><button type="button" data-k="${k}" class="${k ? '' : 'on'}"><b>Wellzesta</b><span>${s}</span></button></li>`).join('')}</ul>
        <div class="mail-pane"><div class="mail-hdr"><b class="mail-subj"></b><small>From Wellzesta · to you</small></div><div class="mail-scroll"><img alt=""></div></div></div></div>`;
      const show = k => { const [n, s] = b.mails[k]; $('.mail-pane img', el).src = I(n); $('.mail-subj', el).textContent = s; $('.mail-scroll', el).scrollTop = 0; $$('.mail-list button', el).forEach((x, j) => x.classList.toggle('on', j === k)); };
      $$('.mail-list button', el).forEach(x => x.addEventListener('click', () => show(+x.dataset.k)));
      show(0);
      return el;
    },
    board(b) {
      const el = document.createElement('div'); el.className = 'm-board';
      el.innerHTML = b.imgs.map((n, k) => `<figure style="--r:${[-3, 2, -1.5, 3][k % 4]}deg"><span class="tp"></span><img src="${I(n)}" alt="" loading="lazy"></figure>`).join('');
      return el;
    }
  };

  const openProject = i => {
    cleanups.forEach(f => f()); cleanups = [];
    cur = i; const p = P[i];
    $('#vKicker').innerHTML = `<span class="px">${String(i + 1).padStart(2, '0')}</span> ${p.co} · ${p.year}`;
    $('#vTitle').textContent = p.title;
    $('#vSum').textContent = p.sum;
    $('#vResults').innerHTML = p.results.map(r => `<li>${r}</li>`).join('');
    $('#vCount').textContent = `${openable.indexOf(i) + 1} / ${openable.length}`;
    vBlocks.innerHTML = '';
    p.blocks.forEach(b => {
      const sec = document.createElement('section'); sec.className = 'v-block';
      sec.innerHTML = `<h3 class="v-label"><span class="tag">${b.title}</span></h3>`;
      sec.appendChild(mk[b.t](b));
      vBlocks.appendChild(sec);
    });
    viewer.hidden = false; document.body.classList.add('lock');
    $('#vScroll').scrollTop = 0; $('#vClose').focus({ preventScroll: true });
  };
  const closeProject = () => { cleanups.forEach(f => f()); cleanups = []; viewer.hidden = true; document.body.classList.remove('lock'); };
  $('#vClose').addEventListener('click', closeProject);
  $('#vNext').addEventListener('click', () => openProject(openable[(openable.indexOf(cur) + 1) % openable.length]));
  addEventListener('keydown', e => { if (!viewer.hidden && e.key === 'Escape') closeProject(); });
  idx.addEventListener('click', e => { const r = e.target.closest('button.row'); if (r) openProject(+r.dataset.i); });
  document.addEventListener('click', e => { const b = e.target.closest('[data-project]'); if (b) openProject(P.findIndex(p => p.id === b.dataset.project)); });

  /* ================= MISC ================= */
  $$('.swap').forEach(f => {
    f.addEventListener('click', () => f.classList.toggle('on'));
    f.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f.classList.toggle('on'); } });
  });
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2000); };
  $('#copyEmail').addEventListener('click', () => {
    const email = 'chrisekribs@gmail.com';
    (navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject()).then(() => toast('Email copied')).catch(() => { location.href = 'mailto:' + email; });
  });
  $('#year').textContent = new Date().getFullYear();
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > innerHeight * .7);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  paint();
})();

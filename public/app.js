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
  const brands = ['Wellzesta', 'PTG', 'Courser', 'Union Club Hotel', 'Brush Creek Ranch', 'Michigan City', 'MaxQ AI', 'Venue ND', 'Weber Family Dentistry', 'The Santiago Partnership'];
  const mq = brands.map(b => `<span>${b}</span>${ic('star')}`).join('');
  $('#marquee').innerHTML = mq + mq;

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
        { t: 'feed', title: 'LinkedIn feed', handle: 'Wellzesta', posts: [
          { img: 'wz-kyle-leadingage-va', cap: 'Meet us at LeadingAge Virginia. Book a demo with Kyle.' },
          { carousel: ['wz-zesty', 'wz-zesty-2'], cap: 'Say hello to Zesty, your community\'s new assistant.', tall: true },
          { vid: 'wz-linkedin-anim', img: 'p-wz-linkedin-anim', cap: 'Everything residents need, in one place.' },
          { carousel: ['wz-rollout-carousel', 'wz-rollout-carousel-2'], cap: '3 reasons app rollouts stall, and how to fix them.', tall: true },
          { img: 'wz-brookhaven-docs', cap: 'Documents, now one tap away for residents.' },
          { vid: 'wz-expiration', img: 'p-wz-expiration', cap: 'New: messages that clean up after themselves.' },
          { img: 'wz-vista-leadingage', cap: 'See you at LeadingAge NJ/DE.' },
          { vid: 'wz-wellness-chart', img: 'p-wz-wellness-chart', cap: 'Wellness, at a glance.' },
          { img: 'wz-linkedin-8', cap: 'Ask Zesty anything.' }
        ] }
      ] },
    { id: 'wz-video', co: 'Wellzesta', title: 'Video with real residents', type: 'Explainer · testimonial · onboarding', year: '2026',
      result: 'Sent before first calls', sum: 'An explainer sales sends before the first call, a testimonial from a real community, and an onboarding video that helps residents actually start using the app.',
      results: [], peek: ['p-wz-immanuel', 'p-wz-resident-intro', 'p-wz-explainer'],
      blocks: [{ t: 'player', title: 'Video', vids: [['wz-explainer', 'Wellzesta in 45 seconds'], ['wz-immanuel', 'In their own words'], ['wz-resident-intro', 'Meet the app'], ['wz-marvella', 'A real resident']] }] },
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
        { t: 'feed', title: 'Paid + organic social', handle: 'PTG', posts: [
          { img: 'ptg-webinar-ad', cap: 'Cyber insurance is changing. Join our panel.' },
          { vid: 'ptg-social', img: 'p-ptg-clip', cap: 'Your IT team, in 10 seconds.' },
          { img: 'ptg-essentials-ad', cap: 'IT essentials for growing businesses.' }
        ] }
      ] },
    { id: 'union', co: 'Union Club Hotel · Vast Creative', title: 'Walk-in stories', type: 'Instagram stories · weekly', year: '2021',
      result: 'Weekly, for 3 outlets', sum: 'Weekly stories for a university hotel\'s restaurant, bar and coffee shop, for Marriott brands at Vast Creative.',
      results: [], peek: ['uc-latte', 'uc-cocktails', 'uc-smoothie'],
      blocks: [{ t: 'stories', title: 'Stories', handle: 'Union Club Hotel', imgs: ['uc-latte', 'uc-spirits', 'uc-loyalty', 'uc-smoothie', 'uc-bar-bites', 'uc-green-juice', 'uc-cocktails', 'uc-pastries', 'uc-juices', 'uc-bar-bites-2', 'uc-boiler-up'] },
        { t: 'feed', title: 'Feed posts', handle: 'Union Club Hotel', posts: [{ img: 'uc-whiskey', cap: 'Whiskey Wednesday.' }, { img: 'uc-chow-now', cap: 'Order ahead, skip the line.' }] }] },
    { id: 'mc', co: 'Michigan City · WeCreate Media', title: 'Destination campaign', type: 'Social · posters · city guide · video', year: '2019',
      result: 'Restaurants, events, guide, film', sum: 'A restaurant series, event posters, a pocket city guide and a summer film for a Lake Michigan town.',
      results: [], peek: ['mc-discover-1', 'mc-stpats', 'mc-guide-1'],
      blocks: [
        { t: 'feed', title: 'Discover series', handle: 'Michigan City', posts: ['mc-discover-1', 'mc-discover-2', 'mc-discover-3', 'mc-discover-4', 'mc-discover-5'].map(img => ({ img, cap: 'Discover Michigan City restaurants.' })) },
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
  const peek = $('#peek');
  let peekT = null, px = 0, py = 0, tx = 0, ty = 0, peekOn = false;
  const showPeek = p => {
    clearInterval(peekT);
    if (!p.peek.length) { peek.innerHTML = `<div class="peek-card"><b>${p.card}</b><span>${p.results[0]}</span></div>`; }
    else {
      peek.innerHTML = p.peek.map((n, k) => `<img src="${I(n)}" alt="" class="${k === 0 ? 'on' : ''}">`).join('');
      let k = 0; const imgs = $$('img', peek);
      peekT = setInterval(() => { imgs[k].classList.remove('on'); k = (k + 1) % imgs.length; imgs[k].classList.add('on'); }, 900);
    }
    peek.classList.add('on');
  };
  if (fine) {
    idx.addEventListener('mouseover', e => { const r = e.target.closest('.row'); if (r && r.dataset.cur !== '1') { $$('.row', idx).forEach(x => x.dataset.cur = ''); r.dataset.cur = '1'; showPeek(P[+r.dataset.i]); } });
    idx.addEventListener('mouseleave', () => { peek.classList.remove('on'); clearInterval(peekT); $$('.row', idx).forEach(x => x.dataset.cur = ''); });
    addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; if (!peekOn) { px = tx; py = ty; peekOn = true; } });
    const loop = () => { px += (tx - px) * .14; py += (ty - py) * .14; peek.style.transform = `translate(${px + 28}px, ${py - 120}px) rotate(-3deg)`; requestAnimationFrame(loop); };
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
  $('#ledger').innerHTML = L.map(([n, l, s]) => `<div class="led"><b>${n}</b><span>${l}</span><small>${s}</small></div>`).join('');

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
      const el = document.createElement('div'); el.className = 'm-phones';
      const ini = b.handle.split(' ').map(w => w[0]).join('').slice(0, 2);
      const post = p => {
        const media = p.carousel
          ? `<div class="car${p.tall ? ' tall' : ''}"><div class="car-track">${p.carousel.map(n => `<img src="${I(n)}" alt="" loading="lazy">`).join('')}</div><span class="car-dots">${p.carousel.map((_, k) => `<i class="${k ? '' : 'on'}"></i>`).join('')}</span><button type="button" class="car-next" aria-label="Next slide">›</button></div>`
          : p.vid ? `<video src="${V(p.vid)}" poster="${I(p.img)}" muted loop playsinline preload="none"></video>` : `<img src="${I(p.img)}" alt="" loading="lazy">`;
        return `<article class="post"><header><span class="av">${ini}</span><span><b>${b.handle}</b><small>Sponsored · 1d</small></span><span class="dots">···</span></header>
          <div class="post-media">${media}</div>
          <div class="post-acts">${ic('heart')}${ic('chat')}${ic('send')}<span></span>${ic('save')}</div>
          <p class="post-cap"><b>${b.handle}</b> ${p.cap}</p></article>`;
      };
      el.innerHTML = `<div class="phone feed"><div class="phone-notch"></div><div class="feed-top"><span class="mark-sm">${b.handle}</span><span>${ic('heart')}${ic('send')}</span></div><div class="feed-scroll">${b.posts.map(post).join('')}</div></div><p class="m-hint">Scroll the feed. Tap the arrow on a post to swipe through a carousel.</p>`;
      $$('.car', el).forEach(c => {
        let k = 0; const n = $$('img', c).length;
        $('.car-next', c).addEventListener('click', () => { k = (k + 1) % n; $('.car-track', c).style.transform = `translateX(-${k * 100}%)`; $$('.car-dots i', c).forEach((d, j) => d.classList.toggle('on', j === k)); });
      });
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause(); }), { root: $('.feed-scroll', el), threshold: .6 });
      $$('video', el).forEach(v => io.observe(v));
      cleanups.push(() => { io.disconnect(); $$('video', el).forEach(v => v.pause()); });
      return el;
    },
    stories(b) {
      const el = document.createElement('div'); el.className = 'm-phones';
      el.innerHTML = `<div class="phone story"><div class="story-bars">${b.imgs.map(() => '<i><b></b></i>').join('')}</div>
        <div class="story-head"><span class="av">UC</span><b>${b.handle}</b><small>2h</small></div>
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
      el.innerHTML = b.imgs.map((n, k) => `<figure style="--r:${[-3, 2, -1.5, 3][k % 4]}deg"><span class="tape"></span><img src="${I(n)}" alt="" loading="lazy"></figure>`).join('');
      return el;
    }
  };

  const openProject = i => {
    cleanups.forEach(f => f()); cleanups = [];
    cur = i; const p = P[i];
    $('#vKicker').textContent = `${p.co} · ${p.year}`;
    $('#vTitle').textContent = p.title;
    $('#vSum').textContent = p.sum;
    $('#vResults').innerHTML = p.results.map(r => `<li>${r}</li>`).join('');
    $('#vCount').textContent = `${openable.indexOf(i) + 1} / ${openable.length}`;
    vBlocks.innerHTML = '';
    p.blocks.forEach(b => {
      const sec = document.createElement('section'); sec.className = 'v-block';
      sec.innerHTML = `<h3 class="v-label">${b.title}</h3>`;
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

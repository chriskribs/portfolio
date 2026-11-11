(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const I = n => `/media/i/${n}.jpg`;
  const V = n => `/media/v/${n}.mp4`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ================= SOUND (tiny chiptune synth) ================= */
  let ac = null, soundOn = store.get('sound') !== 'off';
  const ctx = () => { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return ac; };
  const tone = (f, t = 0, d = .08, type = 'square', v = .06) => {
    if (!soundOn || !ctx()) return;
    const o = ac.createOscillator(), g = ac.createGain(), s = ac.currentTime + t;
    o.type = type; o.frequency.setValueAtTime(f, s);
    g.gain.setValueAtTime(v, s); g.gain.exponentialRampToValueAtTime(.0001, s + d);
    o.connect(g).connect(ac.destination); o.start(s); o.stop(s + d + .02);
  };
  const noise = (t = 0, d = .1, v = .12, hp = 1000) => {
    if (!soundOn || !ctx()) return;
    const len = Math.floor(ac.sampleRate * d), buf = ac.createBuffer(1, len, ac.sampleRate), data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter(), s = ac.currentTime + t;
    f.type = 'highpass'; f.frequency.value = hp; src.buffer = buf;
    g.gain.setValueAtTime(v, s); g.gain.exponentialRampToValueAtTime(.0001, s + d);
    src.connect(f).connect(g).connect(ac.destination); src.start(s);
  };
  const kick = t => { if (!soundOn || !ctx()) return; const o = ac.createOscillator(), g = ac.createGain(), s = ac.currentTime + t; o.frequency.setValueAtTime(150, s); o.frequency.exponentialRampToValueAtTime(40, s + .12); g.gain.setValueAtTime(.35, s); g.gain.exponentialRampToValueAtTime(.001, s + .18); o.connect(g).connect(ac.destination); o.start(s); o.stop(s + .2); };
  const snare = t => { noise(t, .14, .18, 1200); tone(190, t, .07, 'triangle', .08); };
  const hat = t => noise(t, .04, .06, 7000);
  const sfx = {
    blip: () => tone(880, 0, .05, 'square', .04),
    text: () => tone(520 + Math.random() * 120, 0, .03, 'square', .02),
    select: () => { tone(660, 0, .06); tone(990, .06, .08); },
    coin: () => { tone(988, 0, .07); tone(1319, .07, .22); },
    open: () => { tone(392, 0, .06); tone(523, .06, .06); tone(784, .12, .1); },
    fill: () => { // a drum fill, obviously
      const b = .11; [0, 2, 4, 6].forEach(i => hat(i * b)); kick(0); snare(b * 2); kick(b * 3); kick(b * 4);
      snare(b * 5); snare(b * 5.5); snare(b * 6); snare(b * 6.5); kick(b * 7); noise(b * 7, .5, .12, 4000);
    },
    up: () => { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * .07, .1)); }
  };
  const setSound = on => {
    soundOn = on; store.set('sound', on ? 'on' : 'off');
    $('#soundBtn').innerHTML = on ? '&#9835; ON' : '&#9835; OFF';
    $('#soundBtn').classList.toggle('off', !on);
    $('#soundTitle').textContent = on ? 'ON' : 'OFF';
    if (on) sfx.blip();
  };
  setSound(soundOn);
  $('#soundBtn').addEventListener('click', () => setSound(!soundOn));
  $('#soundTitle').addEventListener('click', e => { e.stopPropagation(); setSound(!soundOn); });
  document.addEventListener('click', e => { if (e.target.closest('a.choice, .bar-nav a, .btn')) sfx.select(); });

  /* ================= TITLE SCREEN ================= */
  const title = $('#title');
  let started = false;
  const start = () => {
    if (started) return; started = true;
    ctx(); if (ac && ac.state === 'suspended') ac.resume();
    sfx.fill();
    title.classList.add('gone'); document.body.classList.remove('locked');
    setTimeout(() => { title.hidden = true; runDialog(); }, reduce ? 0 : 750);
  };
  let skipTitle = false;
  try { skipTitle = sessionStorage.getItem('started') === '1'; sessionStorage.setItem('started', '1'); } catch (e) {}
  if (skipTitle || location.hash.length > 1) { title.hidden = true; started = true; setTimeout(runDialog, 200); }
  else {
    document.body.classList.add('locked');
    $('#pressStart').addEventListener('click', start);
    title.addEventListener('click', e => { if (!e.target.closest('#soundTitle')) start(); });
    addEventListener('keydown', function k(e) { if (!started && !['Tab', 'Shift'].includes(e.key)) { start(); removeEventListener('keydown', k); } });
  }

  /* visit counter (this browser only, honest) */
  const visits = (+store.get('visits') || 0) + 1; store.set('visits', visits);
  $('#visits').textContent = visits === 1 ? 'FIRST VISIT? HI.' : `WELCOME BACK. VISIT #${String(visits).padStart(4, '0')} FROM THIS BROWSER.`;

  /* ================= DIALOGUE ================= */
  const lines = [
    'Oh hey. You found my homepage.',
    "I'm Chris. I do marketing: the strategy part and the making part.",
    "Here's my thing. When someone asks me for a video, I ask what the video is for.",
    "Usually the real answer isn't \"a video.\" It's adoption. Or pipeline. Or a gap nobody has looked at yet.",
    'So... what do you want to know?'
  ];
  const dText = $('#dialogText'), dNext = $('#dialogNext'), choices = $('#choices');
  let li = 0, typing = false, full = '', timer = null, dialogRan = false;
  const type = s => {
    full = s; typing = true; dText.textContent = ''; let i = 0;
    clearInterval(timer);
    if (reduce) { dText.textContent = s; typing = false; return; }
    timer = setInterval(() => {
      dText.textContent = s.slice(0, ++i);
      if (i % 2 === 0 && s[i] !== ' ') sfx.text();
      if (i >= s.length) { clearInterval(timer); typing = false; dText.insertAdjacentHTML('beforeend', '<span class="caret"></span>'); }
    }, 26);
  };
  const advance = () => {
    if (typing) { clearInterval(timer); typing = false; dText.textContent = full; return; }
    if (li < lines.length - 1) { li++; type(lines[li]); if (li === lines.length - 1) { dNext.hidden = true; choices.hidden = false; } }
  };
  function runDialog() { if (dialogRan) return; dialogRan = true; type(lines[0]); }
  dNext.addEventListener('click', advance);
  $('#dialog').addEventListener('click', e => { if (!e.target.closest('.choices')) advance(); });

  /* ================= GOAL-O-MATIC ================= */
  const asks = [
    { ask: '"Can we make a video about the new feature?"', who: 'PRODUCT', why: 'What should people do after they watch it?',
      goal: 'Feature adoption: communities actually turning it on and using it.',
      move: 'A step-by-step walkthrough of the feature, sent straight to each community so staff could roll it out without waiting on a meeting. The video became optional.',
      loot: 'SUCCESS = USAGE, NOT VIEWS.' },
    { ask: '"We need a new email sequence to get more qualified leads."', who: 'SALES', why: 'Where are good leads actually stalling?',
      goal: 'Not the top of the funnel. Deals were stalling between demo 1 and demo 2.',
      move: 'Account-based marketing on that list: a physical mailer first, then calls and emails from sales while the box was still on their desk.',
      loot: 'PART OF THE 5-MONTH RUN: 43 SQLS + ~$873K ACTIVE PIPELINE.' },
    { ask: '"Let\'s get a booth at the conference."', who: 'LEADERSHIP', why: 'What has to happen at the show for it to be worth the trip?',
      goal: 'Demos and real opportunities, not a stack of badge scans.',
      move: 'A conference marketing playbook covering before, during and after the show, so every event runs the same proven way.',
      loot: '15 NET-NEW DEMOS + 3 CONFERENCE-SOURCED OPPORTUNITIES.' },
    { ask: '"We need more traffic to the website."', who: 'LEADERSHIP, PTG', why: 'Traffic from whom, to do what?',
      goal: 'The right local businesses finding PTG when they go looking for IT help.',
      move: 'A content and SEO program built on customer research and competitive audits, plus one brand system so every page looked like the same company.',
      loot: '+1,230% ORGANIC TRAFFIC IN 2 YEARS.' },
    { ask: '"We\'re launching a new product across all 11 brands."', who: 'COURSER', why: 'What does a good launch look like 90 days later?',
      goal: 'Adoption, inside a single quarter.',
      move: 'Launch marketing run with product, sales and success in the same room, coordinated across every brand and channel.',
      loot: '80% ADOPTION TARGET HIT IN ONE QUARTER.' }
  ];
  const asksEl = $('#asks');
  asks.forEach((a, i) => asksEl.insertAdjacentHTML('beforeend', `<button class="ask" role="tab" aria-selected="false" data-i="${i}">${a.ask}<small>FROM: ${a.who}</small></button>`));
  const rows = $$('.ro-row');
  const showAsk = (i, silent) => {
    const a = asks[i];
    $$('.ask', asksEl).forEach(b => b.setAttribute('aria-selected', b.dataset.i == i));
    $('#roAsk').textContent = a.ask; $('#roWhy').textContent = a.why; $('#roGoal').textContent = a.goal; $('#roMove').textContent = a.move; $('#roLoot').textContent = a.loot;
    rows.forEach(r => r.classList.remove('on'));
    rows.forEach((r, k) => setTimeout(() => { r.classList.add('on'); if (!silent) tone(440 + k * 110, 0, .05); }, reduce ? 0 : 140 * k));
  };
  asksEl.addEventListener('click', e => { const b = e.target.closest('.ask'); if (b) showAsk(+b.dataset.i); });
  showAsk(0, true);

  /* ================= QUESTS ================= */
  const quests = [
    { name: 'WELLZESTA', when: '2026 - NOW', live: true, party: 'PARTY OF 1', role: 'Marketing Manager · senior living software',
      story: 'A department of one for a Greenville software company that helps senior living communities engage residents. I set the strategy and make most of what ships: case studies, ebooks, reports, newsletters, conference campaigns, social, and video with real residents.',
      obj: ['Hit 120% of the annual MQL goal in five months (96 vs. a full-year target of 80).', 'Advanced 43 contacts to SQL and influenced about $873K in active pipeline.', 'Built a conference playbook: 15 net-new demos and 3 conference-sourced opportunities.', 'Stood up HubSpot lead scoring and attribution in my first two months, the company\'s first marketing-to-pipeline measurement.'],
      folder: 'wellzesta', ch: 0 },
    { name: 'COURSER', when: '2025', party: 'PARTY: A REAL TEAM', role: 'Regional Marketing Manager',
      story: 'The first time I got to work with a team of people who think the way I do. Integrated campaigns across 11 brands, launch marketing, and the research to aim it.',
      obj: ['Integrated campaigns across 11 brands, contributing to a 9% ARR increase in three months.', 'Product launch marketing that hit its 80% adoption target within a single quarter.', 'Customer research, segmentation and KPI analysis behind 201% of MQL goal.'] },
    { name: 'PTG', when: '2021 - 2025', party: 'PARTY OF 1', role: 'Marketing Manager · managed IT services',
      story: 'A one-person marketing department for a Greenville IT firm. Brand, research, content, SEO, events, and the whole kit a sales team needs to win and keep a client.',
      obj: ['Built enterprise brand guidelines in year one.', 'Grew organic website traffic 1,230% in two years through content and SEO.', 'Market research, customer analysis and competitive audits to find growth.', 'Sales enablement: buyer\'s guides, onboarding guide, QBR decks, webinars and short-form video.'],
      folder: 'ptg', ch: 6 },
    { name: 'VAST CREATIVE CO.', when: '2021', party: 'AGENCY SIDE', role: 'Social Media Manager',
      story: 'Campaign execution, content and social strategy for Marriott hotel brands, including weekly story campaigns for a university hotel\'s restaurant, bar and coffee shop.',
      obj: ['Ran social content programs for multiple hotel properties.'], folder: 'union' },
    { name: 'WECREATE MEDIA', when: '2018 - 2020', party: 'THE CAMERA YEARS', role: 'Account Manager / Videographer',
      story: 'Where I learned to make things: client accounts by day, shoots and edits the rest of the time. Brand films, commercials, event recaps and destination campaigns.',
      obj: ['Managed multiple client accounts end to end.', 'Shot and cut brand films for a Wyoming guest ranch, a wedding venue, a dentist, a nonprofit and a medical AI company.'],
      folder: 'michigan', ch: 8 }
  ];
  const ql = $('#questList');
  quests.forEach(q => {
    ql.insertAdjacentHTML('beforeend', `<article class="quest win">
      <div class="quest-side">
        <span class="px">QUEST</span>
        <span class="q-when">${q.when}</span>
        <span class="q-party">${q.party}</span>
        <span class="q-stamp ${q.live ? 'live' : ''}">${q.live ? 'IN PROGRESS' : 'COMPLETE'}</span>
      </div>
      <div class="quest-main">
        <h3>${q.name}</h3>
        <p class="q-role">${q.role}</p>
        <p class="q-story">${q.story}</p>
        <ul class="obj">${q.obj.map(o => `<li>${o}</li>`).join('')}</ul>
        <div class="q-actions">
          ${q.folder ? `<button class="btn" type="button" data-folder="${q.folder}">OPEN FILES</button>` : ''}
          ${q.ch != null ? `<button class="btn btn-alt" type="button" data-ch="${q.ch}">WATCH TAPES</button>` : ''}
        </div>
      </div></article>`);
  });

  /* ================= ACHIEVEMENTS ================= */
  const ach = [
    ['120%', 'of the annual MQL goal, hit in 5 months', 'WELLZESTA'],
    ['$873K', 'active pipeline influenced in 5 months', 'WELLZESTA'],
    ['43', 'contacts advanced to SQL', 'WELLZESTA'],
    ['15', 'net-new demos from the conference playbook, plus 3 opportunities', 'WELLZESTA'],
    ['2 MO', 'to launch lead scoring and attribution, the first the company had', 'WELLZESTA'],
    ['201%', 'of MQL goal', 'COURSER'],
    ['80%', 'adoption target, hit within one quarter', 'COURSER'],
    ['+9%', 'ARR in three months across 11 brands', 'COURSER'],
    ['+1,230%', 'organic website traffic in two years', 'PTG'],
    ['YR 1', 'enterprise brand guidelines, shipped', 'PTG']
  ];
  const achEl = $('#achList');
  ach.forEach(([b, l, s], i) => achEl.insertAdjacentHTML('beforeend', `<div class="badge locked"><span class="trophy">UNLOCKED</span><span class="big">${b}</span><span class="lbl">${l}</span><span class="src">// ${s}</span></div>`));
  const achIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const idx = $$('.badge', achEl).indexOf(e.target);
    setTimeout(() => { e.target.classList.remove('locked'); sfx.coin(); }, (idx % 4) * 160);
    achIO.unobserve(e.target);
  }), { threshold: .6 });
  $$('.badge', achEl).forEach(b => achIO.observe(b));

  /* ================= ATTRIBUTES ================= */
  const attrs = [
    ['BIG PICTURE', 10, 'var(--blue)'], ['DETAILS', 10, 'var(--blue)'], ['STRATEGY', 10, 'var(--pink)'], ['MAKING', 9, 'var(--pink)'],
    ['PEOPLE', 9, 'var(--green)'], ['METAL \\m/', 10, 'var(--navy)'], ['DRUMS', 9, 'var(--navy)'], ['HEALTH', 9, 'var(--green)'], ['COFFEE', 10, '#7a4a2a']
  ];
  const attrsEl = $('#attrs');
  attrs.forEach(([n, v, c]) => attrsEl.insertAdjacentHTML('beforeend', `<li><span class="name">${n}</span><span class="meter" style="--c:${c}">${Array.from({ length: 10 }, (_, i) => `<i class="${i < v ? 'f' : ''}"></i>`).join('')}</span><span class="val">${v}/10</span></li>`));

  /* tap-to-toggle real photos on touch */
  $$('.swap-photo').forEach(f => f.addEventListener('click', () => { f.classList.toggle('on'); sfx.blip(); }));

  /* ================= INVENTORY ================= */
  const inv = [
    ['strategy', 'GO-TO-MARKET', 'Positioning, audience and channel plan for a launch or a market.'],
    ['strategy', 'POSITIONING', 'Say the one thing only you can say, to the person who cares.'],
    ['strategy', 'PERSONAS', 'Built from real customer conversations, not guesses.'],
    ['strategy', 'JOURNEY MAPS', 'Where people get stuck between first touch and signed contract.'],
    ['strategy', 'COMPETITIVE AUDITS', 'What the other guys say, so we can say something else.'],
    ['strategy', 'MARKETING PLANS', 'Goals, strategies and measures on one page everyone can read.'],
    ['demand', 'ABM', 'Pick the accounts. Mail them something real. Then call.'],
    ['demand', 'LEAD SCORING', 'So sales spends time on people who are ready.'],
    ['demand', 'ATTRIBUTION', 'Which work actually moved pipeline.'],
    ['demand', 'LIFECYCLE + NURTURE', 'Email that shows up at the right moment, not on a schedule.'],
    ['demand', 'CONFERENCES', 'Before, during and after playbooks that turn booths into demos.'],
    ['demand', 'SEO / SEM', 'Be there when the right person searches.'],
    ['demand', 'PAID SOCIAL + SEARCH', 'LinkedIn, Google and Meta ads, aimed narrowly.'],
    ['make', 'COPYWRITING', 'Short sentences. Real words. One idea at a time.'],
    ['make', 'DESIGN', 'Case studies, ebooks, reports, one-pagers, social, print.'],
    ['make', 'VIDEO', 'Write it, light it, shoot it, cut it.'],
    ['make', 'PHOTOGRAPHY', 'People, products, food, places.'],
    ['make', 'BRAND SYSTEMS', 'Guidelines people actually follow.'],
    ['make', 'DECKS', 'QBRs, sales decks and pitches that tell one story.'],
    ['tool', 'HUBSPOT', 'Home base: CRM, automation, scoring, reporting.'],
    ['tool', 'SALESFORCE', 'Speaks fluent sales ops.'],
    ['tool', 'GOOGLE ANALYTICS + GTM', 'Tracking set up right the first time.'],
    ['tool', 'WEBFLOW / WORDPRESS', 'Builds and runs the website without a ticket queue.'],
    ['tool', 'ADOBE CC', 'Illustrator, Photoshop, Premiere, Lightroom.'],
    ['tool', 'CANVA + CAPCUT', 'For when fast beats fancy.'],
    ['tool', 'SPROUT / HOOTSUITE', 'Social scheduling and listening.']
  ];
  const invEl = $('#inventory'), invDesc = $('#invDesc');
  const catName = { strategy: 'STRATEGY', demand: 'DEMAND GEN', make: 'MAKING', tool: 'TOOL' };
  inv.forEach(([c, n, d]) => invEl.insertAdjacentHTML('beforeend', `<button type="button" class="item" data-c="${c}" data-d="${d}"><span class="cat">${catName[c]}</span>${n}</button>`));
  let lastItem = null;
  const showItem = b => { if (!b || b === lastItem) return; lastItem = b; invDesc.textContent = `> ${b.lastChild.textContent}: ${b.dataset.d}`; tone(700, 0, .03, 'square', .025); };
  invEl.addEventListener('mouseover', e => showItem(e.target.closest('.item')));
  invEl.addEventListener('focusin', e => showItem(e.target.closest('.item')));
  invEl.addEventListener('click', e => showItem(e.target.closest('.item')));

  /* ================= TAPES ================= */
  const chs = [
    { sep: 'WELLZESTA' },
    { v: 'wz-explainer', t: 'Wellzesta in 45 seconds', s: 'Explainer · motion', n: 'Goal: give sales one link that explains the whole platform before the first call.' },
    { v: 'wz-immanuel', t: 'Residents & staff, in their words', s: 'Testimonial film', n: 'Goal: proof from real communities, for buyers who trust peers more than vendors.' },
    { v: 'wz-resident-intro', t: 'Meet the app', s: 'Resident onboarding video', n: 'Goal: adoption. Residents see it, try it, and keep using it after launch week.' },
    { v: 'wz-marvella', t: 'A real resident clip', s: 'Social cut', n: 'Goal: a scroll-stopping, 15-second proof point for LinkedIn.' },
    { v: 'wz-wellness-chart', t: 'Wellness chart loop', s: 'Product motion', n: 'Goal: show the wellness data story in one glance.' },
    { sep: 'PTG' },
    { v: 'ptg-clip', t: 'Leadership soundbites', s: 'Vertical social', n: 'Goal: put a trusted face on an IT firm, in the feed where owners already are.' },
    { v: 'ptg-cyber', t: 'Cyber insurance webinar promo', s: 'Vertical social', n: 'Goal: registrations. A 54-minute panel cut into a 40-second reason to show up.' },
    { sep: 'THE CAMERA YEARS' },
    { v: 'brush-creek', t: 'Summer at the Ranch', s: 'Brush Creek Ranch · brand film', n: 'Goal: get families to book a summer at a Wyoming guest ranch.' },
    { v: 'delicious-journeys', t: 'Delicious Journeys', s: 'Fly-fishing film', n: 'Goal: sell the feeling of the trip, slowly.' },
    { v: 'venue-nd', t: 'Venue ND', s: 'Wedding venue :30', n: 'Goal: bookings, told as a love story from basilica to fifty-yard line.' },
    { v: 'weber', t: 'Leave Smiling', s: 'Weber Family Dentistry :30', n: 'Goal: new patients for a local dentist, without showing a single drill.' },
    { v: 'santiago', t: 'The Santiago Partnership', s: 'Nonprofit intro', n: 'Goal: help donors see the people behind the mission.' },
    { v: 'maxq', t: 'RSNA 2019 recap', s: 'MaxQ AI · event recap', n: 'Goal: turn one conference into a follow-up tool for sales.' },
    { v: 'michigan-city', t: 'Michigan City summer', s: 'Destination highlight', n: 'Goal: pull weekend visitors across the state line.' },
    { v: 'better-than-rich', t: 'Better Than Rich', s: 'Logo animation', n: 'Goal: an 11-second opener that sets the tone.' }
  ];
  const chEl = $('#channels'), tv = $('#tv'), osd = $('#tvOsd'), tvNote = $('#tvNote'), stat = $('#tvStatic');
  const playable = [];
  chs.forEach(c => {
    if (c.sep) { chEl.insertAdjacentHTML('beforeend', `<li class="sep">${c.sep}</li>`); return; }
    const n = playable.push(c);
    chEl.insertAdjacentHTML('beforeend', `<li><button type="button" data-ch="${n - 1}"><span class="px">${String(n).padStart(2, '0')}</span><span>${c.t}<small>${c.s}</small></span></button></li>`);
  });
  const sctx = stat.getContext('2d');
  const staticBurst = ms => {
    if (reduce) return;
    stat.classList.add('on'); noise(0, ms / 1000, .05, 500);
    const img = sctx.createImageData(160, 90), end = performance.now() + ms;
    const f = () => {
      for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
      sctx.putImageData(img, 0, 0);
      if (performance.now() < end) requestAnimationFrame(f); else stat.classList.remove('on');
    };
    f();
  };
  let osdT;
  const tune = (i, play = true) => {
    const c = playable[i]; if (!c) return;
    staticBurst(320);
    $$('button', chEl).forEach(b => b.classList.toggle('on', b.dataset.ch == i));
    tv.poster = I('p-' + c.v);
    tv.src = V(c.v);
    tvNote.textContent = c.n;
    osd.textContent = 'CH ' + String(i + 1).padStart(2, '0'); osd.classList.add('on'); clearTimeout(osdT); osdT = setTimeout(() => osd.classList.remove('on'), 1800);
    if (play) setTimeout(() => tv.play().catch(() => {}), 330);
  };
  chEl.addEventListener('click', e => { const b = e.target.closest('button[data-ch]'); if (b) tune(+b.dataset.ch); });
  tune(0, false);

  /* ================= ALBUM / EXPLORER ================= */
  const F = (name, file, vid) => ({ name, file, vid });
  const folders = {
    wellzesta: { label: 'WELLZESTA', c: 'var(--green)', desc: 'Senior living software, 2026. Case studies, an ebook, a data report, newsletters, a one-pager for an AI feature, staff onboarding, LinkedIn carousels, event promos and product social.',
      files: [F('CASE_STUDY_SUNNYSIDE.PDF', 'wz-sunnyside-mockup'), F('SUNNYSIDE_P1.PDF', 'wz-cs-sunnyside'), F('SUNNYSIDE_P2.PDF', 'wz-cs-sunnyside-2'), F('CASE_STUDY_TANDEM.PDF', 'wz-cs-tandem'),
        F('EBOOK_ROLLOUT.PDF', 'wz-ebook'), F('EBOOK_P3.PDF', 'wz-ebook-3'), F('ENGAGEMENT_REPORT.PDF', 'wz-report'), F('REPORT_P2.PDF', 'wz-report-2'),
        F('AI_MENU_READER.PDF', 'wz-ai-menu'), F('ZESTY_LAUNCH.PDF', 'wz-zesty'), F('ZESTY_P2.PDF', 'wz-zesty-2'), F('3_REASONS.PDF', 'wz-rollout-carousel'), F('3_REASONS_P2.PDF', 'wz-rollout-carousel-2'),
        F('STAFF_ONBOARDING.PDF', 'wz-onboarding'), F('NEWSLETTER_JUNE.HTM', 'wz-newsletter-june'), F('NEWSLETTER_OCT.HTM', 'wz-newsletter-oct'), F('APP_SIGNUP_FLYER.PDF', 'wz-signup-flyer'),
        F('LEADINGAGE_VA.PNG', 'wz-kyle-leadingage-va'), F('LEADINGAGE_NJDE.PNG', 'wz-vista-leadingage'), F('DOCUMENTS_FEATURE.PNG', 'wz-brookhaven-docs'), F('ASK_ZESTY.PNG', 'wz-linkedin-8'),
        F('MSG_EXPIRATION.MP4', 'p-wz-expiration', 'wz-expiration'), F('LINKEDIN_LOOP.MP4', 'p-wz-linkedin-anim', 'wz-linkedin-anim'), F('WELLNESS_CHART.MP4', 'p-wz-wellness-chart', 'wz-wellness-chart')] },
    ptg: { label: 'PTG', c: 'var(--blue)', desc: 'Managed IT, 2021 to 2025. Brand guidelines, buyer\'s guides, security one-pagers, a customer welcome guide, QBR decks, infographics, webinar ads and social video.',
      files: [F('BRAND_GUIDE.PDF', 'ptg-brand-01'), F('BRAND_COLOR.PDF', 'ptg-brand-12'), F('BRAND_TYPE.PDF', 'ptg-brand-13'), F('BRAND_PHOTO.PDF', 'ptg-brand-14'),
        F('WELCOME_GUIDE.PDF', 'ptg-welcome-cover'), F('WELCOME_OPEN.PDF', 'ptg-welcome-open'), F('QUICK_FACTS.PDF', 'ptg-quick-facts'), F('SERVICE_TICKETS.PDF', 'ptg-service-tickets'),
        F('BUYERS_GUIDE.PDF', 'ptg-buyers-guide'), F('EDR_RESOURCE.PDF', 'ptg-edr'), F('CYBER_INSURANCE.PDF', 'ptg-cyber-guide'), F('PASSWORDS.PDF', 'ptg-password-mockup'), F('BREACH_COST.PDF', 'ptg-cost-mockup'),
        F('OFFERINGS.JPG', 'ptg-offerings'), F('AUDIT_ROADMAP.JPG', 'ptg-roadmap'), F('SECURITY_TRAINING.PDF', 'ptg-security-training'),
        F('QBR_DECK.PPT', 'ptg-sbr-tv'), F('UPDATES_SLIDE.PPT', 'ptg-updates'), F('TRENDS_SLIDE.PPT', 'ptg-trends'), F('QBR_MOCKUP.PNG', 'ptg-sbr-deck'), F('AUDIT_DECK.PNG', 'ptg-audit-deck'),
        F('WEBINAR_AD.PNG', 'ptg-webinar-ad'), F('ESSENTIALS_AD.PNG', 'ptg-essentials-ad'), F('SOCIAL.MP4', 'p-ptg-clip', 'ptg-social')] },
    union: { label: 'UNION CLUB', c: 'var(--pink)', desc: 'Weekly social stories for a university hotel\'s restaurant, bar and coffee shop. One job per post: get someone to walk in today.',
      files: ['uc-spirits', 'uc-latte', 'uc-loyalty', 'uc-smoothie', 'uc-bar-bites', 'uc-green-juice', 'uc-cocktails', 'uc-pastries', 'uc-juices', 'uc-bar-bites-2', 'uc-boiler-up', 'uc-whiskey', 'uc-chow-now'].map(n => F(n.replace('uc-', '').toUpperCase().replace(/-/g, '_') + '.PNG', n)) },
    michigan: { label: 'MICHIGAN CITY', c: 'var(--yellow)', desc: 'Destination marketing for a Lake Michigan town: a restaurant series, event posters and a pocket city guide.',
      files: ['mc-discover-1', 'mc-discover-2', 'mc-discover-3', 'mc-discover-4', 'mc-discover-5', 'mc-farmers', 'mc-arts', 'mc-stpats', 'mc-guide-1', 'mc-guide-2'].map(n => F(n.replace('mc-', '').toUpperCase().replace(/-/g, '_') + '.JPG', n)) },
    playground: { label: 'PLAYGROUND', c: '#ff9d3a', desc: 'A countdown donation campaign for a community playground.',
      files: ['play-12-days', 'play-7-days', 'play-appropriate', 'play-eye-catching'].map(n => F(n.replace('play-', '').toUpperCase().replace(/-/g, '_') + '.PNG', n)) }
  };
  const foldersEl = $('#folders'), filesEl = $('#files'), pathEl = $('#explorerPath'), statusEl = $('#explorerStatus');
  Object.entries(folders).forEach(([k, f]) => foldersEl.insertAdjacentHTML('beforeend', `<button type="button" class="folder" data-folder="${k}"><span class="f-ico" style="--c:${f.c}"><b>${f.files.length}</b></span>${f.label}</button>`));
  statusEl.textContent = `${Object.keys(folders).length} folder(s) · ${Object.values(folders).reduce((a, f) => a + f.files.length, 0)} file(s)`;
  let curFolder = null;
  const openFolder = (k, scroll) => {
    const f = folders[k]; if (!f) return; curFolder = k; sfx.open();
    pathEl.textContent = `C:\\CHRIS\\WORK\\${f.label.replace(/ /g, '_')}`;
    foldersEl.hidden = true; filesEl.hidden = false;
    filesEl.innerHTML = `<button type="button" class="file up" data-up="1"><span class="th">..</span>UP ONE LEVEL</button><p class="folder-desc">${f.desc}</p>` +
      f.files.map((x, i) => `<button type="button" class="file" data-i="${i}"><span class="th"><img src="${I(x.file)}" alt="" loading="lazy">${x.vid ? '<span class="play">PLAY</span>' : ''}</span>${x.name}</button>`).join('');
    statusEl.textContent = `${f.files.length} object(s) · click to open`;
    if (scroll) document.getElementById('album').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };
  const closeFolder = () => { curFolder = null; foldersEl.hidden = false; filesEl.hidden = true; pathEl.textContent = 'C:\\CHRIS\\WORK'; statusEl.textContent = `${Object.keys(folders).length} folder(s)`; sfx.blip(); };
  foldersEl.addEventListener('click', e => { const b = e.target.closest('.folder'); if (b) openFolder(b.dataset.folder); });
  filesEl.addEventListener('click', e => {
    const b = e.target.closest('.file'); if (!b) return;
    if (b.dataset.up) return closeFolder();
    openLb(+b.dataset.i);
  });

  /* lightbox */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbVid = $('#lbVid'); let lbI = 0;
  const showLb = () => {
    const f = folders[curFolder].files[lbI];
    $('#lbTitle').textContent = f.name;
    if (f.vid) { lbImg.hidden = true; lbVid.hidden = false; lbVid.src = V(f.vid); lbVid.play().catch(() => {}); }
    else { lbVid.pause(); lbVid.hidden = true; lbImg.hidden = false; lbImg.src = I(f.file); lbImg.alt = f.name; }
  };
  const openLb = i => { lbI = i; showLb(); lb.hidden = false; sfx.select(); $('#lbClose').focus({ preventScroll: true }); };
  const closeLb = () => { lb.hidden = true; lbVid.pause(); };
  const step = d => { const n = folders[curFolder].files.length; lbI = (lbI + d + n) % n; showLb(); sfx.blip(); };
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  /* quest buttons → folders / channels */
  document.addEventListener('click', e => {
    const fb = e.target.closest('[data-folder]:not(.folder)');
    if (fb) { openFolder(fb.dataset.folder, true); return; }
    const cb = e.target.closest('.q-actions [data-ch]');
    if (cb) { document.getElementById('tapes').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); setTimeout(() => tune(+cb.dataset.ch), 500); }
  });

  /* ================= GUESTBOOK ================= */
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 2000); };
  $('#gbForm').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    const sub = encodeURIComponent(`Hi Chris, from ${d.get('name')}`);
    const body = encodeURIComponent(`${d.get('msg')}\n\n- ${d.get('name')}`);
    sfx.up(); toast('GUESTBOOK SIGNED! OPENING EMAIL...');
    setTimeout(() => { location.href = `mailto:chrisekribs@gmail.com?subject=${sub}&body=${body}`; }, 500);
  });
  $('#copyEmail').addEventListener('click', () => {
    const email = 'chrisekribs@gmail.com';
    (navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject()).then(() => { sfx.coin(); toast('EMAIL COPIED. +1 FRIEND'); }).catch(() => { location.href = 'mailto:' + email; });
  });

  /* ================= MISC ================= */
  const navLinks = $$('.bar-nav a');
  const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-40% 0px -55% 0px' });
  ['think', 'quests', 'loot', 'me', 'tapes', 'album', 'guestbook'].forEach(id => spy.observe(document.getElementById(id)));

  const clock = $('#clock');
  const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }); };
  tick(); setInterval(tick, 30000);
  $('#year').textContent = new Date().getFullYear();

  addEventListener('keydown', e => {
    if (!lb.hidden) { if (e.key === 'Escape') closeLb(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }
  });

  /* konami → party mode */
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']; let ki = 0;
  addEventListener('keydown', e => {
    ki = (e.key.toLowerCase() === code[ki].toLowerCase()) ? ki + 1 : (e.key === code[0] ? 1 : 0);
    if (ki === code.length) {
      ki = 0; sfx.fill(); setTimeout(sfx.up, 900); toast('+30 LIVES. PARTY MODE.');
      const p = $('#party'), cols = ['#1830b8', '#e24aa1', '#4b8c28', '#fff200', '#0d1c43'];
      for (let i = 0; i < 90; i++) { const d = document.createElement('i'); d.style.left = Math.random() * 100 + 'vw'; d.style.top = -20 - Math.random() * 200 + 'px'; d.style.background = cols[i % 5]; d.style.animationDelay = Math.random() * .6 + 's'; p.appendChild(d); }
      setTimeout(() => { p.innerHTML = ''; }, 3000);
    }
  });
})();

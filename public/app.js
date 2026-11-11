(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const I = n => `/media/i/${n}.jpg`;
  const V = n => `/media/v/${n}.mp4`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- content ---------- */
  const P = [
    { id:'brush-creek', kind:'Film', title:'Summer at the Ranch', client:'Brush Creek Ranch', year:'', video:'brush-creek', poster:'p-brush-creek', r:'16/9',
      blurb:'A family-summer film for a luxury Wyoming guest ranch. Pony carts, potato-sack races, campfires and alpine lakes, cut so parents start planning next July before the credits roll.',
      facts:{Role:'Direction, cinematography, edit', Deliverable:'90-second brand film', Audience:'Families planning a destination summer'} },
    { id:'delicious-journeys', kind:'Film', title:'Delicious Journeys', client:'Relais & Châteaux', year:'', video:'delicious-journeys', poster:'p-delicious-journeys', r:'2.5/1',
      blurb:'A widescreen, slow-paced story about fly fishing, river light and the people who guide it. Made to feel like the trip itself: unhurried, tactile, and worth the drive.',
      facts:{Role:'Cinematography, edit, color', Format:'Anamorphic widescreen, 60 seconds', Tone:'Quiet luxury'} },
    { id:'venue-nd', kind:'Film', title:'Venue ND', client:'Venue ND', year:'', video:'venue-nd', poster:'p-venue-nd', r:'16/9',
      blurb:'A wedding-venue commercial that walks a couple from the basilica to the fifty-yard line. Thirty seconds of campus tradition told as a love story.',
      facts:{Role:'Direction, cinematography, edit', Deliverable:':30 commercial', Use:'Broadcast and social'} },
    { id:'santiago', kind:'Film', title:'The Santiago Partnership', client:'The Santiago Partnership', year:'', video:'santiago', poster:'p-santiago', r:'16/9',
      blurb:'An intro film for a nonprofit working in Ecuador. Mountain dawns, market streets and kitchen tables, built to help supporters see the people behind the mission.',
      facts:{Role:'Edit, motion, sound design', Deliverable:'Intro sequence', Goal:'Donor storytelling'} },
    { id:'weber', kind:'Film', title:'Leave Smiling', client:'Weber Family Dentistry', year:'', video:'weber', poster:'p-weber', r:'16/9',
      blurb:'Old home movies of first smiles cut against a modern practice. A local dentist ad that skips the drill and goes straight for the heart.',
      facts:{Role:'Concept, direction, edit', Deliverable:':30 commercial', Idea:'A lifetime of smiles'} },
    { id:'maxq', kind:'Film', title:'RSNA Symposium Recap', client:'MaxQ AI', year:'2019', video:'maxq', poster:'p-maxq', r:'16/9',
      blurb:'An event recap for a medical-imaging AI company at the world\'s largest radiology conference. Keynote energy, product close-ups and clinician interviews, cut into a sales tool.',
      facts:{Role:'Event coverage, interviews, edit', Deliverable:'2-minute recap', Use:'Sales follow-up and social'} },
    { id:'michigan-city', kind:'Film', title:'Michigan City Summer', client:'Michigan City, Indiana', year:'2018', video:'michigan-city', poster:'p-michigan-city', r:'16/9',
      blurb:'A season-highlight film for a Lake Michigan beach town. Sunsets at the lighthouse, live music, local shops and full tables, made to pull Chicago weekenders across the state line.',
      facts:{Role:'Cinematography, edit', Deliverable:'Season highlight film', Audience:'Regional visitors'} },
    { id:'better-than-rich', kind:'Motion', title:'Better Than Rich', client:'Better Than Rich', year:'', video:'better-than-rich', poster:'p-better-than-rich', r:'16/9',
      blurb:'A logo reveal built from a single climber on a ridgeline. Eleven seconds that set the tone for everything the brand publishes.',
      facts:{Role:'Motion design', Deliverable:'Logo animation'} },
    { id:'ptg-video', kind:'Film', title:'Short-form for B2B', client:'PTG IT Support', year:'2023', video:'ptg-clip', poster:'p-ptg-clip', r:'9/16',
      blurb:'Vertical video for an IT services firm: leadership soundbites with on-brand captions, and webinar promos that turn a 54-minute panel into scroll-stopping clips.',
      facts:{Role:'Production, edit, captions, motion', Deliverable:'Vertical social series', Channel:'LinkedIn, Instagram, email'},
      gallery:[{v:'ptg-cyber', p:'p-ptg-cyber'}, {v:'ptg-social'}] },

    { id:'union-club', kind:'Design', title:'Stories that sell dinner', client:'Union Club Hotel at Purdue', year:'2021', poster:'uc-spirits', r:'9/16',
      blurb:'A weekly social-story program for a university hotel\'s restaurant, bar and coffee shop. Every post had one job: get someone to walk in today. Photography, type and offers designed as one family.',
      facts:{Role:'Photography, design, copy', Deliverable:'Weekly Instagram and Facebook stories', Outlets:'Restaurant, bar, Leaps Coffee'},
      images:['uc-spirits','uc-latte','uc-loyalty','uc-smoothie','uc-bar-bites','uc-green-juice','uc-cocktails','uc-pastries','uc-juices','uc-bar-bites-2','uc-boiler-up','uc-whiskey','uc-chow-now'] },
    { id:'michigan-city-design', kind:'Design', title:'Discover Michigan City', client:'Michigan City, Indiana', year:'2018–2020', poster:'mc-discover-1', r:'1/1',
      blurb:'Destination marketing for a lakefront city: a restaurant series, event posters for the farmers market, arts festival and St. Patrick\'s parade, and a pocket city guide visitors actually keep.',
      facts:{Role:'Design, photography, art direction', Deliverables:'Social series, posters, printed city guide', Audience:'Visitors and locals'},
      images:['mc-discover-1','mc-discover-2','mc-discover-3','mc-discover-4','mc-discover-5','mc-farmers','mc-arts','mc-stpats','mc-guide-1','mc-guide-2'] },
    { id:'playground', kind:'Design', title:'Build the Playground', client:'Community fundraiser', year:'', poster:'play-12-days', r:'9/16',
      blurb:'A countdown donation campaign for a community playground. Bold color blocking and real kids at play, with an urgent number at the top of every post.',
      facts:{Role:'Campaign design, copy', Deliverable:'Countdown social campaign'},
      images:['play-12-days','play-7-days','play-appropriate','play-eye-catching'] },
    { id:'ptg', kind:'Enablement', title:'The PTG sales kit', client:'PTG IT Support', year:'2021–2023', poster:'ptg-welcome-cover', r:'3/4',
      blurb:'A full brand and sales-enablement system for a Greenville managed-IT firm. Brand guidelines, buyer\'s guides, security one-pagers, a customer welcome guide, quarterly business-review decks, infographics and webinar campaigns, all speaking with one voice.',
      facts:{Role:'Marketing lead: strategy, design, copy', Deliverables:'Brand system, print and digital collateral, decks', Result:'One consistent story from first ad to renewal meeting'},
      images:['ptg-brand-01','ptg-brand-12','ptg-brand-13','ptg-brand-14','ptg-welcome-cover','ptg-welcome-open','ptg-quick-facts','ptg-service-tickets','ptg-buyers-guide','ptg-edr','ptg-cyber-guide','ptg-password-mockup','ptg-cost-mockup','ptg-offerings','ptg-roadmap','ptg-security-training','ptg-sbr-tv','ptg-updates','ptg-trends','ptg-sbr-deck','ptg-audit-deck','ptg-webinar-ad','ptg-essentials-ad'] },
  ];
  const byId = Object.fromEntries(P.map(p => [p.id, p]));
  const films = P.filter(p => p.video);
  const indexOrder = ['brush-creek','union-club','delicious-journeys','ptg','venue-nd','michigan-city-design','weber','maxq','santiago','playground'];

  /* ---------- film leader ---------- */
  const leader = $('#leader');
  const start = () => {
    leader.classList.add('done');
    document.body.classList.remove('is-loading');
    requestAnimationFrame(() => document.body.classList.add('ready'));
  };
  let seen = false;
  try { seen = sessionStorage.getItem('leader') === '1'; sessionStorage.setItem('leader', '1'); } catch (e) {}
  if (seen || reduce) { leader.style.display = 'none'; start(); }
  else {
    const num = $('#leaderNum'), sweep = $('.leader-sweep');
    let n = 3, t0 = performance.now(), stopped = false;
    const tick = now => {
      if (stopped) return;
      const el = (now - t0) / 700;
      const cur = 3 - Math.floor(el);
      if (cur < 1) { stopped = true; start(); return; }
      if (cur !== n) { n = cur; num.textContent = n; }
      sweep.style.setProperty('--a', ((el % 1) * 360) + 'deg');
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const skip = () => { if (!stopped) { stopped = true; start(); } };
    leader.addEventListener('click', skip);
    addEventListener('keydown', skip, { once: true });
  }

  /* ---------- hero ---------- */
  const words = ['human.', 'cinematic.', 'clear.', 'worth sharing.', 'like home.'];
  const swap = $('#swap'); let wi = 0;
  if (!reduce) setInterval(() => {
    swap.classList.add('out');
    setTimeout(() => { wi = (wi + 1) % words.length; swap.textContent = words[wi]; swap.classList.remove('out'); }, 350);
  }, 2600);

  const reel = $('#reel'), tc = $('#timecode');
  const pad = n => String(n).padStart(2, '0');
  const tcLoop = () => {
    const t = reel.currentTime || 0;
    tc.textContent = `00:${pad(Math.floor(t / 60))}:${pad(Math.floor(t % 60))}:${pad(Math.floor((t % 1) * 24))}`;
    requestAnimationFrame(tcLoop);
  };
  requestAnimationFrame(tcLoop);
  if (reduce) reel.pause();

  // marquee duplicate for seamless loop
  const mq = $('#marquee'); mq.innerHTML += mq.innerHTML;

  /* ---------- nav ---------- */
  const nav = $('#nav'); let lastY = 0;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('solid', y > 60);
    nav.classList.toggle('hide', y > lastY && y > 400 && !document.body.classList.contains('modal'));
    lastY = y;
  }, { passive: true });
  const navLinks = $$('.nav-links a');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['work','film','design','enablement','about'].forEach(id => spy.observe(document.getElementById(id)));

  /* ---------- work index ---------- */
  const list = $('#indexList'), peek = $('#peek'), peekImg = $('#peekImg');
  indexOrder.forEach((id, i) => {
    const p = byId[id];
    const li = document.createElement('li');
    li.innerHTML = `<button class="index-row" type="button" data-open="${p.id}" data-cursor="${p.video ? 'Play' : 'View'}" data-peek="${I(p.poster)}">
      <span class="ix-n mono">${pad(i + 1)}</span>
      <span class="ix-title">${p.title}</span>
      <span class="ix-client">${p.client}${p.year ? ' · ' + p.year : ''}</span>
      <span class="ix-type mono">${p.kind}</span></button>`;
    li.firstElementChild.style.width = '100%';
    list.appendChild(li);
  });
  if (finePointer) {
    let px = 0, py = 0, tx = 0, ty = 0;
    list.addEventListener('mouseover', e => {
      const row = e.target.closest('.index-row'); if (!row) return;
      peekImg.src = row.dataset.peek; peek.classList.add('on');
    });
    list.addEventListener('mouseleave', () => peek.classList.remove('on'));
    addEventListener('mousemove', e => { tx = e.clientX + 190; ty = e.clientY; });
    const loop = () => { px += (tx - px) * .12; py += (ty - py) * .12; peek.style.left = px + 'px'; peek.style.top = py + 'px'; requestAnimationFrame(loop); };
    loop();
  }

  /* ---------- film strip ---------- */
  const strip = $('#strip');
  films.forEach((p, i) => {
    const f = document.createElement('div');
    f.className = 'frame'; f.dataset.open = p.id; f.dataset.cursor = 'Play';
    f.innerHTML = `<span class="frame-num mono">${pad(i + 1)}</span>
      <div class="frame-inner" style="--r:${p.r === '2.5/1' ? '2.5/1' : p.r}">
        <img src="${I(p.poster)}" alt="${p.title} still" loading="lazy">
        <video muted loop playsinline preload="none" data-src="${V(p.video)}"></video>
      </div>
      <div class="frame-cap mono"><strong>${p.title}</strong><span>${p.client}</span></div>`;
    strip.appendChild(f);
    if (finePointer) {
      const v = $('video', f);
      f.addEventListener('mouseenter', () => { if (!v.src) v.src = v.dataset.src; v.currentTime = 0; v.play().then(() => f.classList.add('playing')).catch(() => {}); });
      f.addEventListener('mouseleave', () => { v.pause(); f.classList.remove('playing'); });
    }
  });
  // add two stills as non-clickable frames for texture
  [['p-crimson-trace','Complete Focus','Crimson Trace'],['p-sour-punch','We Embrace','Rough cut']].forEach(([img,t,c]) => {
    const f = document.createElement('div'); f.className = 'frame';
    f.innerHTML = `<span class="frame-num mono">still</span><div class="frame-inner"><img src="${I(img)}" alt="${t} still" loading="lazy"></div><div class="frame-cap mono"><strong>${t}</strong><span>${c}</span></div>`;
    f.style.cursor = 'default'; strip.appendChild(f);
  });

  const filmSec = $('#film'), bar = $('#filmBar');
  const pinned = () => matchMedia('(min-width: 901px) and (hover: hover)').matches;
  const sizeFilm = () => {
    if (!pinned()) { filmSec.style.height = ''; strip.style.transform = ''; return; }
    const dist = strip.scrollWidth - innerWidth;
    filmSec.style.height = (innerHeight + Math.max(0, dist)) + 'px';
  };
  const onFilm = () => {
    if (!pinned()) return;
    const r = filmSec.getBoundingClientRect();
    const dist = strip.scrollWidth - innerWidth;
    const p = Math.min(1, Math.max(0, -r.top / (filmSec.offsetHeight - innerHeight)));
    strip.style.transform = `translate3d(${-p * dist}px,0,0)`;
    bar.style.width = (p * 100) + '%';
  };
  addEventListener('scroll', onFilm, { passive: true });
  addEventListener('resize', () => { sizeFilm(); onFilm(); });
  addEventListener('load', () => { sizeFilm(); onFilm(); });
  sizeFilm();

  /* ---------- design groups ---------- */
  const dg = $('#designGroups');
  const rot = () => ((Math.random() * 2.4) - 1.2).toFixed(2) + 'deg';
  const group = (p, body) => {
    const s = document.createElement('div'); s.className = 'dgroup reveal';
    s.innerHTML = `<div class="dgroup-head"><div><p class="mono kicker">${p.client}${p.year ? ' · ' + p.year : ''}</p><h3>${p.title}</h3></div>
      <p>${p.blurb}</p><button class="btn btn-ghost" type="button" data-open="${p.id}" data-cursor="Open">Case study</button></div>`;
    s.appendChild(body); dg.appendChild(s);
  };
  // Union Club: story rail
  { const p = byId['union-club']; const rail = document.createElement('div'); rail.className = 'stories'; rail.dataset.cursor = 'Drag';
    p.images.filter(n => !['uc-whiskey','uc-chow-now'].includes(n)).forEach(n => rail.insertAdjacentHTML('beforeend', `<figure style="--rot:${rot()}" data-lb="union-club" data-src="${I(n)}" data-cursor="Zoom"><img src="${I(n)}" alt="" loading="lazy"></figure>`));
    group(p, rail); }
  // Michigan City: board
  { const p = byId['michigan-city-design']; const b = document.createElement('div'); b.className = 'board';
    const layout = [['mc-discover-1','s4'],['mc-farmers','s8 wide-sm'],['mc-discover-3','s4'],['mc-guide-1','s4'],['mc-discover-5','s4'],['mc-arts','s7 wide-sm'],['mc-stpats','s5']];
    layout.forEach(([n, c]) => b.insertAdjacentHTML('beforeend', `<figure class="${c}" style="--rot:${rot()}" data-lb="michigan-city-design" data-src="${I(n)}" data-cursor="Zoom"><img src="${I(n)}" alt="" loading="lazy"></figure>`));
    group(p, b); }
  // Playground
  { const p = byId['playground']; const b = document.createElement('div'); b.className = 'board';
    [['play-12-days','s3'],['play-appropriate','s3'],['play-7-days','s3'],['play-eye-catching','s3']].forEach(([n, c]) => b.insertAdjacentHTML('beforeend', `<figure class="${c}" style="--rot:${rot()}" data-lb="playground" data-src="${I(n)}" data-cursor="Zoom"><img src="${I(n)}" alt="" loading="lazy"></figure>`));
    group(p, b); }

  /* ---------- enablement fan ---------- */
  const fan = $('#fan');
  const spots = [[-150,-70,-14],[-60,40,-6],[40,-60,5],[140,30,13],[0,110,1]];
  const k = Math.min(1, fan.clientWidth / 620);
  $$('img', fan).forEach((im, i) => {
    im.style.setProperty('--i', (i - 2) * 2);
    let [x, y, r] = spots[i]; x *= k; y *= k;
    im.style.setProperty('--x', x + 'px'); im.style.setProperty('--y', y + 'px'); im.style.setProperty('--r', r + 'deg');
  });
  new IntersectionObserver(es => es.forEach(e => fan.classList.toggle('open', e.isIntersecting)), { threshold: .45 }).observe(fan);

  /* ---------- reveal ---------- */
  $$('.section-head, .steps li, .about-photo, .about-copy, .enable-copy').forEach(el => el.classList.add('reveal'));
  const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => ro.observe(el));

  /* ---------- theater ---------- */
  const th = $('#theater'), thMedia = $('#thMedia'), thGallery = $('#thGallery');
  let lastFocus = null;
  const openCase = id => {
    const p = byId[id]; if (!p) return;
    lastFocus = document.activeElement;
    $('#thMeta').innerHTML = `<span>${p.kind}</span><span>${p.client}</span>${p.year ? `<span>${p.year}</span>` : ''}`;
    $('#thTitle').textContent = p.title;
    $('#thBlurb').textContent = p.blurb;
    $('#thFacts').innerHTML = Object.entries(p.facts || {}).map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    thMedia.innerHTML = p.video
      ? `<video src="${V(p.video)}" poster="${I(p.poster)}" controls autoplay playsinline ${p.r === '2.5/1' ? 'class="wide"' : ''}></video>`
      : `<img src="${I(p.poster)}" alt="${p.title}">`;
    let g = '';
    (p.gallery || []).forEach(x => g += `<figure><video src="${V(x.v)}" ${x.p ? `poster="${I(x.p)}"` : 'autoplay muted loop'} controls playsinline preload="metadata"></video></figure>`);
    (p.images || []).forEach(n => g += `<figure data-lb="${p.id}" data-src="${I(n)}" data-cursor="Zoom"><img src="${I(n)}" alt="" loading="lazy"></figure>`);
    thGallery.innerHTML = g;
    const order = indexOrder.concat(P.map(x => x.id).filter(x => !indexOrder.includes(x)));
    const next = byId[order[(order.indexOf(id) + 1) % order.length]];
    $('#thNext').innerHTML = `<button type="button" data-open="${next.id}" data-cursor="Next"><span class="mono">Next project</span><strong>${next.title} &rarr;</strong></button>`;
    th.hidden = false; document.body.classList.add('modal'); document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => th.classList.add('open'));
    $('#thScroll').scrollTop = 0; $('#thClose').focus({ preventScroll: true });
    history.replaceState(null, '', '#/' + id);
  };
  const closeCase = () => {
    th.classList.remove('open'); $$('video', th).forEach(v => v.pause());
    setTimeout(() => { th.hidden = true; thMedia.innerHTML = ''; thGallery.innerHTML = ''; }, 400);
    document.body.classList.remove('modal'); document.documentElement.style.overflow = '';
    history.replaceState(null, '', location.pathname);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };
  $('#thClose').addEventListener('click', closeCase);

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'); let lbSet = [], lbI = 0;
  const lbShow = () => { lbImg.src = lbSet[lbI]; };
  const openLb = (setId, src, scope) => {
    lbSet = $$(`[data-lb="${setId}"]`, scope).map(f => f.dataset.src).filter((v, i, a) => a.indexOf(v) === i);
    lbI = Math.max(0, lbSet.indexOf(src)); lbShow(); lb.hidden = false;
  };
  const closeLb = () => { lb.hidden = true; };
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', e => { e.stopPropagation(); lbI = (lbI - 1 + lbSet.length) % lbSet.length; lbShow(); });
  $('#lbNext').addEventListener('click', e => { e.stopPropagation(); lbI = (lbI + 1) % lbSet.length; lbShow(); });
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  /* ---------- delegated clicks ---------- */
  document.addEventListener('click', e => {
    const lbEl = e.target.closest('[data-lb]');
    if (lbEl) { openLb(lbEl.dataset.lb, lbEl.dataset.src, th.hidden ? document : th); return; }
    const o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openCase(o.dataset.open); }
  });
  addEventListener('keydown', e => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') $('#lbNext').click();
      if (e.key === 'ArrowLeft') $('#lbPrev').click();
      return;
    }
    if (!th.hidden && e.key === 'Escape') closeCase();
  });
  if (location.hash.startsWith('#/')) { const id = location.hash.slice(2); if (byId[id]) setTimeout(() => openCase(id), 50); }

  /* ---------- drag-to-scroll story rail ---------- */
  $$('.stories').forEach(r => {
    let down = false, sx = 0, sl = 0, moved = false;
    r.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = r.scrollLeft; });
    addEventListener('pointerup', () => { down = false; });
    r.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; r.scrollLeft = sl - dx; });
    r.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
  });

  /* ---------- cursor ---------- */
  if (finePointer && !reduce) {
    document.body.classList.add('has-cursor');
    const c = $('#cursor'), lab = $('#cursorLabel');
    let x = -100, y = -100, cx = -100, cy = -100;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; c.classList.add('on'); });
    document.addEventListener('mouseleave', () => c.classList.remove('on'));
    const loop = () => { cx += (x - cx) * .25; cy += (y - cy) * .25; c.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor]');
      if (t) { lab.textContent = t.dataset.cursor; c.classList.add('big'); }
      else { c.classList.remove('big'); }
    });
  }

  /* ---------- contact ---------- */
  const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 1800); };
  $('#copyEmail').addEventListener('click', () => {
    const email = 'chrisekribs@gmail.com';
    (navigator.clipboard ? navigator.clipboard.writeText(email) : Promise.reject()).then(() => toast('Email copied. Talk soon.')).catch(() => { location.href = 'mailto:' + email; });
  });
  const clock = $('#clock');
  const tickClock = () => { clock.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }); };
  tickClock(); setInterval(tickClock, 30000);
  $('#year').textContent = new Date().getFullYear();
})();

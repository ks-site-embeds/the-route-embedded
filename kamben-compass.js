/* Kamben Signal — "How we guide you" (compass) section as a Wix Custom Element.
 * Install: Velo → Public → custom-elements/kamben-compass.js. Element source: Velo file · Tag name: kamben-compass
 * Attributes: lang="en"|"no" (default: the page <html lang>, else en) · fonts="google"|"none" (default google — loads Space Grotesk + DM Sans)
 * Layout: desktop composition from 1100px up (746px tall), stacked mobile layout below (height follows content; "kc-height" event).
 * Motion: plays once when 20% of the section is in view; honours prefers-reduced-motion. Arrow follows the cursor on pointer devices. */
(function () {
  if (!window.customElements || customElements.get('kamben-compass')) return;
  var DICT = {"en":{"s2a":"Analytics and","s2b":"performance","s2c":"marketing that","s2d":"you can navigate","h3a1":"See the whole","h3a2":"customer journey","h3b1":"Know which marketing","h3b2":"actually pays","h3c":"Own your numbers","p1":"Shop and web in one picture,\na complete view of your customers, so you know where they come from and where they stop.","p2":"Which channels bring customers, measured in kroner rather than clicks. Spend where it works, stop where it doesn't.","p3":"A measurement setup you understand, keep, and can explain to the next person who asks — with or without us.","bar1":"Web analytics","bar2":"Performance marketing","bar3":"Tracking","bar4":"Handover","bar5":"Customer data platform","bar6":"Google Ads","bar7":"Dashboard"},"no":{"s2a":"Analyse og","s2b":"performance","s2c":"marketing du","s2d":"kan navigere","h3a1":"Se hele","h3a2":"kundereisen","h3b1":"Vit hvilken markedsføring","h3b2":"som faktisk lønner seg","h3c":"Eie dine egne tall","p1":"Butikk og nett i ett bilde, helhetlig kundeforståelse, så du vet hvor kundene kommer fra og hvor de stopper.","p2":"Hvilke kanaler som gir kunder, målt i kroner, ikke klikk. Bruk pengene der det virker, stopp der det ikke gjør det.","p3":"Et måleoppsett du forstår, beholder og kan forklare til neste person som spør — med eller uten oss.","bar1":"Webanalyse","bar2":"Performance marketing","bar3":"Sporing","bar4":"Overlevering","bar5":"Kundedataplattform","bar6":"Google Ads","bar7":"Dashbord"}};
  var TICKS = "M272.3 7.0L270.9 14.9M291.8 11.3L287.6 26.8M310.8 17.3L308.1 24.8M329.3 25.0L325.9 32.2M347.0 34.2L339.0 48.0M363.8 44.9L359.3 51.5M379.7 57.1L374.6 63.2M394.4 70.6L383.1 81.9M407.9 85.3L401.8 90.4M420.1 101.2L413.5 105.7M430.8 118.0L417.0 126.0M440.0 135.7L432.8 139.1M447.7 154.2L440.2 156.9M453.7 173.2L438.2 177.4M458.0 192.7L450.1 194.1M458.0 272.3L450.1 270.9M453.7 291.8L438.2 287.6M447.7 310.8L440.2 308.1M440.0 329.3L432.8 325.9M430.8 347.0L417.0 339.0M420.1 363.8L413.5 359.3M407.9 379.7L401.8 374.6M394.4 394.4L383.1 383.1M379.7 407.9L374.6 401.8M363.8 420.1L359.3 413.5M347.0 430.8L339.0 417.0M329.3 440.0L325.9 432.8M310.8 447.7L308.1 440.2M291.8 453.7L287.6 438.2M272.3 458.0L270.9 450.1M192.7 458.0L194.1 450.1M173.2 453.7L177.4 438.2M154.2 447.7L156.9 440.2M135.7 440.0L139.1 432.8M118.0 430.8L126.0 417.0M101.2 420.1L105.7 413.5M85.3 407.9L90.4 401.8M70.6 394.4L81.9 383.1M57.1 379.7L63.2 374.6M44.9 363.8L51.5 359.3M34.2 347.0L48.0 339.0M25.0 329.3L32.2 325.9M17.3 310.8L24.8 308.1M11.3 291.8L26.8 287.6M7.0 272.3L14.9 270.9M7.0 192.7L14.9 194.1M11.3 173.2L26.8 177.4M17.3 154.2L24.8 156.9M25.0 135.7L32.2 139.1M34.2 118.0L48.0 126.0M44.9 101.2L51.5 105.7M57.1 85.3L63.2 90.4M70.6 70.6L81.9 81.9M85.3 57.1L90.4 63.2M101.2 44.9L105.7 51.5M118.0 34.2L126.0 48.0M135.7 25.0L139.1 32.2M154.2 17.3L156.9 24.8M173.2 11.3L177.4 26.8M192.7 7.0L194.1 14.9";
  var ARROW = {"tip":-38.2,"vb":"0 0 45.18 37.65","tf":"translate(-29.49 0.00)","d":"M67.66,14.77l7.01-13.73-.22-1.04-25.42,5.66-19.54,3.21.23,1.11,14.57,12.35,9.51,15.32,13.86-22.88Z"};
  var ROWS = [["bar1","bar2","bar3","bar4"],["bar5","bar6","bar7"]];
  var F = "'Space Grotesk','Helvetica Neue',Arial,sans-serif", D = "'DM Sans','Helvetica Neue',Arial,sans-serif";
  var LINE = 'rgba(255,255,255,0.43)', CREAM = '#FEFBF4', ORANGE = '#FF6932', BREAK = 1100;
  var REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var CSS = [
    'kamben-compass{display:block;position:relative;width:100%;background:#000;color:#fff;overflow:hidden;font-family:' + F + '}',
    'kamben-compass *{box-sizing:border-box}',
    '.kc{position:relative;width:100%;height:100%}',
    '.kc-head,.kc-cols{position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none}',
    '.kc-head>*,.kc-cols>*{pointer-events:auto}',
    '.kc-ring{position:absolute;overflow:visible}',
    '.kc-letter{position:absolute;margin:0;font:400 37px/1 ' + F + ';color:rgba(255,255,255,0.44);white-space:nowrap;transform:translate(-50%,-50%)}',
    '.kc-aw{position:absolute;will-change:transform}',
    '.kc-arrow{display:block;width:100%;height:100%;overflow:visible;transform-origin:50% 100%}',
    '.kc-title{position:absolute;margin:0;font:500 35px/40px ' + F + ';color:#fff;white-space:nowrap}',
    '.kc-grid{position:absolute;left:0;top:0;overflow:visible;pointer-events:none}',
    '.kc-col{position:absolute}',
    '.kc-h3{margin:0;min-height:118px;font:400 24px/22px ' + F + ';letter-spacing:-1.6px;color:#fff;white-space:nowrap}',
    '.kc-h3.kc-one{padding-top:11px}',
    '.kc-h3 strong{font-weight:700}',
    '.kc-p{margin:0;max-width:208px;font:400 14px/21px ' + D + ';color:#fff;text-wrap:pretty}',
    '.kc-bars{position:absolute;height:54px;display:flex;overflow:hidden}',
    '.kc-bar{flex:none;height:54px;display:flex;align-items:center;padding-left:35px;background:' + CREAM + ';font:400 15px/18px ' + F + ';letter-spacing:0.8px;text-transform:uppercase;color:#1B1B1B;white-space:nowrap}',
    '.kc-bar+.kc-bar{border-left:1px solid #000}',
    '.kc-hr{display:none}',
    '.kc[data-mode=mobile] .kc-head{position:relative;height:376px;right:auto;bottom:auto}',
    '.kc[data-mode=mobile] .kc-letter{font-size:24px}',
    '.kc[data-mode=mobile] .kc-w{display:none}',
    '.kc[data-mode=mobile] .kc-title{font:500 28px/32px ' + F + '}',
    '.kc[data-mode=mobile] .kc-grid{display:none}',
    '.kc[data-mode=mobile] .kc-cols{position:relative;right:auto;bottom:auto}',
    '.kc[data-mode=mobile] .kc-hr{display:block;height:1px;background:' + LINE + ';transform-origin:0 50%}',
    '.kc[data-mode=mobile] .kc-col{position:static;padding:28px 20px 30px}',
    '.kc[data-mode=mobile] .kc-h3{min-height:0;white-space:normal;font:400 24px/26px ' + F + ';letter-spacing:-1.2px}',
    '.kc[data-mode=mobile] .kc-h3.kc-one{padding-top:0}',
    '.kc[data-mode=mobile] .kc-p{max-width:none;margin-top:14px;font:400 15px/22px ' + D + '}',
    '.kc[data-mode=mobile] .kc-bars{position:relative;height:auto;overflow:visible;flex-wrap:wrap;gap:6px;padding:4px 20px 0}',
    '.kc[data-mode=mobile] .kc-bars.kc-row2{padding-top:6px;padding-bottom:44px}',
    '.kc[data-mode=mobile] .kc-bar{height:40px;padding:0 16px;font-size:12px;letter-spacing:1.3px}',
    '.kc[data-mode=mobile] .kc-bar+.kc-bar{border-left:0}'
  ].join('\n');
  function ensureHead() { if (document.getElementById('kc-style')) return; var st = document.createElement('style'); st.id = 'kc-style'; st.textContent = CSS; document.head.appendChild(st); }
  function ensureFonts() { if (document.getElementById('kc-fonts')) return; var l = document.createElement('link'); l.id = 'kc-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=DM+Sans:wght@400;700&display=swap'; document.head.appendChild(l); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function svg(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function pos(e, l, t, w, h) { e.style.left = l + 'px'; e.style.top = t + 'px'; if (w != null) e.style.width = w + 'px'; if (h != null) e.style.height = h + 'px'; }
  function clearPos(e) { e.style.left = e.style.top = e.style.width = e.style.height = ''; }
  function setLine(ln, x1, y1, x2, y2) { ln.setAttribute('x1', x1); ln.setAttribute('y1', y1); ln.setAttribute('x2', x2); ln.setAttribute('y2', y2); }
  var ANIM_PROPS = ['opacity', 'transform', 'clipPath', 'strokeDashoffset', 'strokeDasharray'];
  function anim(e, kf, dur, delay, easing) {
    if (REDUCED) { commit(e, kf[kf.length - 1]); return; }
    var a = e.animate(kf, { duration: dur, delay: delay || 0, easing: easing || 'cubic-bezier(.22,.61,.36,1)', fill: 'both' });
    a.onfinish = function () { commit(e, kf[kf.length - 1]); a.cancel(); };
  }
  function commit(e, last) { for (var k in last) if (k !== 'offset' && k !== 'easing') e.style[k] = last[k]; }
  var RISE = [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'translateY(0px)' }];
  var FADE = [{ opacity: 0 }, { opacity: 1 }];
  var WIPE = [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }];
  function stackKf(drop) { return [
    { opacity: 0, transform: 'translateY(-' + drop + 'px) rotate(-5deg)', easing: 'cubic-bezier(.45,0,.9,.5)' },
    { opacity: 1, transform: 'translateY(0px) rotate(3.2deg)', offset: 0.4, easing: 'ease-out' },
    { opacity: 1, transform: 'translateY(0px) rotate(-1.8deg)', offset: 0.64, easing: 'ease-in-out' },
    { opacity: 1, transform: 'translateY(0px) rotate(0.8deg)', offset: 0.84, easing: 'ease-in-out' },
    { opacity: 1, transform: 'translateY(0px) rotate(0deg)' }]; }

  class KambenCompass extends HTMLElement {
    static get observedAttributes() { return ['lang']; }
    connectedCallback() {
      if (this._built) return; this._built = true;
      if (this.querySelector('.kc')) this._played = true; // pre-rendered / cloned markup: show the finished state
      ensureHead(); if (this.getAttribute('fonts') !== 'none') ensureFonts();
      this.build();
      var self = this;
      this._ro = new ResizeObserver(function () { self.layout(); }); this._ro.observe(this);
      this._io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !self._played) { self._played = true; self.play(); } }); }, { threshold: 0.2 });
      this._io.observe(this);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { self.layout(); });
      setTimeout(function () { self.layout(); }, 800);
    }
    disconnectedCallback() { if (this._ro) this._ro.disconnect(); if (this._io) this._io.disconnect(); this.stopFollow(); }
    attributeChangedCallback(n, o, v) { if (n === 'lang' && o !== v && this._built) this.build(); }
    get t() { var l = (this.getAttribute('lang') || document.documentElement.lang || 'en').slice(0, 2).toLowerCase(); return DICT[l] || DICT.en; }
    build() {
      var t = this.t, n = this._n = {};
      this.innerHTML = '';
      var root = n.root = el('div', 'kc');
      var head = el('div', 'kc-head');
      n.ring = svg('svg', { viewBox: '0 0 465 465', 'class': 'kc-ring', 'aria-hidden': 'true' });
      n.ring.appendChild(svg('circle', { cx: 232.5, cy: 232.5, r: 232, fill: 'none', stroke: LINE, 'stroke-width': 1 }));
      n.ring.appendChild(svg('path', { d: TICKS, fill: 'none', stroke: LINE, 'stroke-width': 1.5 }));
      head.appendChild(n.ring);
      n.letters = {};
      ['n', 'e', 's', 'w'].forEach(function (k) { var p = el('span', 'kc-letter kc-' + k, k.toUpperCase()); p.setAttribute('aria-hidden', 'true'); n.letters[k] = p; head.appendChild(p); });
      n.aw = el('div', 'kc-aw');
      n.arrow = svg('svg', { viewBox: ARROW.vb, 'class': 'kc-arrow', 'aria-hidden': 'true' });
      n.arrow.appendChild(svg('path', { transform: ARROW.tf, d: ARROW.d, fill: ORANGE }));
      n.aw.appendChild(n.arrow); head.appendChild(n.aw);
      n.title = el('h2', 'kc-title', [t.s2a, t.s2b, t.s2c, t.s2d].map(esc).join('<br>'));
      head.appendChild(n.title);
      root.appendChild(head);
      n.grid = svg('svg', { 'class': 'kc-grid', 'aria-hidden': 'true' });
      n.lines = ['l1', 'l1b', 'l2', 'v1', 'v2'].map(function (k) { var ln = svg('line', { stroke: LINE, 'stroke-width': 1 }); n[k] = ln; n.grid.appendChild(ln); return ln; });
      root.appendChild(n.grid);
      var cols = el('div', 'kc-cols');
      var titles = [esc(t.h3a1) + '<br><strong>' + esc(t.h3a2) + '</strong>', esc(t.h3b1) + '<br><strong>' + esc(t.h3b2) + '</strong>', '<strong>' + esc(t.h3c) + '</strong>'];
      var paras = [t.p1, t.p2, t.p3];
      n.cols = []; n.h3s = []; n.paras = []; n.hrs = [];
      for (var i = 0; i < 3; i++) {
        var hr = el('div', 'kc-hr'); n.hrs.push(hr); cols.appendChild(hr);
        var c = el('div', 'kc-col'), h = el('h3', 'kc-h3' + (i === 2 ? ' kc-one' : ''), titles[i]), p = el('p', 'kc-p', esc(paras[i]));
        c.appendChild(h); c.appendChild(p); cols.appendChild(c); n.cols.push(c); n.h3s.push(h); n.paras.push(p);
      }
      root.appendChild(cols);
      n.row1 = []; n.row2 = [];
      n.r1 = el('div', 'kc-bars kc-row1'); n.r2 = el('div', 'kc-bars kc-row2');
      ROWS[0].forEach(function (k) { var b = el('div', 'kc-bar', esc(t[k])); n.r1.appendChild(b); n.row1.push(b); });
      ROWS[1].forEach(function (k) { var b = el('div', 'kc-bar', esc(t[k])); n.r2.appendChild(b); n.row2.push(b); });
      root.appendChild(n.r1); root.appendChild(n.r2);
      this.appendChild(root);
      this.layout();
    }
    layout() {
      if (!this._n) return;
      var W = this.clientWidth || 1440, mobile = W < BREAK;
      this._mobile = mobile; this._n.root.setAttribute('data-mode', mobile ? 'mobile' : 'desktop');
      if (mobile) this.layoutMobile(W); else this.layoutDesktop(W);
      if (this._played) this.showFinal(); else this.prepare();
    }
    layoutDesktop(W) {
      var n = this._n, L = W >= 1440 ? 498 + (W - 1440) * 0.35 : Math.max(430, 498 * W / 1440), s = Math.min(1, L / 498), R = W - L;
      var x1 = L + R * 300 / 942, x2 = L + R * 601 / 942;
      var ring = 465 * s, rx = 22 * s, ry = 147, cx = rx + ring / 2, cy = ry + ring / 2;
      pos(n.ring, rx, ry, ring, ring);
      var lp = { n: [0, -192], e: [208, 8], s: [0, 206.5], w: [-209.5, 8] };
      for (var k in lp) { var L2 = n.letters[k]; L2.style.left = (cx + lp[k][0] * s) + 'px'; L2.style.top = (cy + lp[k][1] * s) + 'px'; L2.style.fontSize = (37 * s) + 'px'; }
      pos(n.aw, rx + 81 * s, ry + 154 * s, 266 * s, 222 * s);
      var ts = Math.max(0.86, s);
      n.title.style.left = (rx + 103 * s) + 'px'; n.title.style.top = (ry + 141 * s) + 'px'; n.title.style.fontSize = (35 * ts) + 'px'; n.title.style.lineHeight = (40 * ts) + 'px';
      var lefts = [L, x1, x2], widths = [x1 - L, x2 - x1, W - x2], inset = [44, 30, 38], maxB = 321, i;
      for (i = 0; i < 3; i++) {
        var avail = Math.max(120, widths[i] - inset[i] - 24), f = Math.max(0.8, Math.min(1, avail / 215));
        n.cols[i].style.left = (lefts[i] + inset[i]) + 'px'; n.cols[i].style.top = '203px'; n.cols[i].style.width = avail + 'px';
        n.h3s[i].style.fontSize = (24 * f) + 'px'; n.h3s[i].style.lineHeight = (22 * f) + 'px'; n.h3s[i].style.letterSpacing = (-1.6 * f) + 'px';
      }
      for (i = 0; i < 3; i++) { var b = 321 + n.paras[i].offsetHeight; if (b > maxB) maxB = b; }
      var r1 = Math.max(451, maxB + 25), r2 = r1 + 82, yB = r2 + 54, c3 = W - x2, bx = L + 11;
      pos(n.r1, bx, r1, W - bx, 54); pos(n.r2, bx, r2, W - bx, 54);
      var w1 = [x1 - bx, x2 - x1, c3 * 156 / 341, c3 * 185 / 341], w2 = [x1 - bx, x2 - x1, c3];
      for (i = 0; i < 4; i++) n.row1[i].style.width = w1[i] + 'px';
      for (i = 0; i < 3; i++) n.row2[i].style.width = w2[i] + 'px';
      var ry2 = 170.5 - cy, rr = ring / 2 + 10, dxr = Math.abs(ry2) < rr ? Math.sqrt(rr * rr - ry2 * ry2) : 0;
      if (dxr) { setLine(n.l1, 0, 170.5, Math.max(0, cx - dxr), 170.5); setLine(n.l1b, Math.min(W, cx + dxr), 170.5, W, 170.5); } else { setLine(n.l1, 0, 170.5, W, 170.5); setLine(n.l1b, W, 170.5, W, 170.5); } setLine(n.l2, L, 284.5, W, 284.5); setLine(n.v1, x1, 170, x1, yB); setLine(n.v2, x2, 170, x2, yB);
      n.grid.setAttribute('viewBox', '0 0 ' + W + ' ' + yB); n.grid.style.width = W + 'px'; n.grid.style.height = yB + 'px';
      var H = Math.max(746, yB + 159);
      n.root.style.height = H + 'px'; this.style.height = H + 'px';
      this.emitHeight(H);
    }
    layoutMobile(W) {
      var n = this._n, i;
      pos(n.ring, -70, 40, 300, 300);
      var lp = { n: [80, 60], e: [210, 190], s: [80, 320], w: [0, 0] };
      for (var k in lp) { var L2 = n.letters[k]; L2.style.left = lp[k][0] + 'px'; L2.style.top = lp[k][1] + 'px'; L2.style.fontSize = ''; }
      pos(n.aw, 34, 176, 120, 100);
      n.title.style.left = '20px'; n.title.style.top = '124px'; n.title.style.fontSize = ''; n.title.style.lineHeight = '';
      for (i = 0; i < 3; i++) { clearPos(n.cols[i]); n.h3s[i].style.fontSize = n.h3s[i].style.lineHeight = n.h3s[i].style.letterSpacing = ''; }
      clearPos(n.r1); clearPos(n.r2);
      n.row1.concat(n.row2).forEach(function (b) { b.style.width = ''; });
      n.root.style.height = ''; this.style.height = '';
      this.emitHeight(n.root.offsetHeight);
    }
    emitHeight(h) { if (h !== this._lastH) { this._lastH = h; this.dispatchEvent(new CustomEvent('kc-height', { detail: { height: h } })); } }
    prepare() {
      var n = this._n, m = this._mobile, i;
      [n.ring, n.title, n.arrow].forEach(function (e) { e.style.opacity = '0'; });
      for (var k in n.letters) n.letters[k].style.opacity = '0';
      for (i = 0; i < 3; i++) { n.h3s[i].style.opacity = '0'; n.paras[i].style.opacity = '0'; n.hrs[i].style.transform = 'scaleX(0)'; }
      [n.r1, n.r2].forEach(function (r) { r.style.clipPath = m ? '' : 'inset(0 100% 0 0)'; });
      n.row1.concat(n.row2).forEach(function (b) { b.style.opacity = m ? '0' : ''; b.style.transform = ''; });
      n.lines.forEach(function (ln) { var len = 0; try { len = ln.getTotalLength(); } catch (e) {} ln.style.strokeDasharray = len + 'px'; ln.style.strokeDashoffset = len + 'px'; });
    }
    showFinal() {
      var n = this._n, all = [n.ring, n.title, n.arrow, n.r1, n.r2].concat(n.h3s, n.paras, n.hrs, n.row1, n.row2, n.lines);
      for (var k in n.letters) all.push(n.letters[k]);
      all.forEach(function (e) { ANIM_PROPS.forEach(function (p) { e.style[p] = ''; }); });
    }
    play() {
      var n = this._n, m = this._mobile, i, EZ = 'cubic-bezier(.4,0,.3,1)';
      if (REDUCED) { this.showFinal(); return; }
      anim(n.ring, FADE, 1200, 0);
      ['n', 'e', 's', 'w'].forEach(function (k, j) { anim(n.letters[k], FADE, 900, 200 + 100 * j); });
      anim(n.arrow, stackKf(m ? 22 : 40), 1500, 200, 'linear');
      anim(n.title, RISE, 900, 150);
      if (!m) { anim(n.l1, this.drawKf(n.l1), 500, 300, EZ); anim(n.l1b, this.drawKf(n.l1b), 1500, 450, EZ); anim(n.l2, this.drawKf(n.l2), 1400, 500, EZ); anim(n.v1, this.drawKf(n.v1), 800, 900, EZ); anim(n.v2, this.drawKf(n.v2), 800, 1050, EZ); }
      else for (i = 0; i < 3; i++) anim(n.hrs[i], [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], 900, 300 + 150 * i, EZ);
      for (i = 0; i < 3; i++) { anim(n.h3s[i], RISE, 900, 700 + 120 * i); anim(n.paras[i], RISE, 900, 900 + 120 * i); }
      if (!m) { anim(n.r1, WIPE, 1200, 1300); anim(n.r2, WIPE, 1200, 1500); }
      else n.row1.concat(n.row2).forEach(function (b, j) { anim(b, RISE, 600, 1200 + 50 * j); });
      var self = this; if (!m) setTimeout(function () { self.startFollow(); }, 1700);
    }
    drawKf(ln) { var len = parseFloat(ln.style.strokeDasharray) || 0; return [{ strokeDashoffset: len + 'px' }, { strokeDashoffset: '0px' }]; }
    startFollow() {
      if (this._following || !(window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches)) return;
      this._following = true; this._cur = 0; this._target = 0;
      var self = this;
      this._onMove = function (e) {
        if (self._mobile) { self._target = 0; return; }
        var r = self._n.aw.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        self._target = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI - ARROW.tip;
      };
      this._onLeave = function () { self._target = 0; };
      window.addEventListener('pointermove', this._onMove); document.documentElement.addEventListener('mouseleave', this._onLeave);
      var tick = function () { var d = ((self._target - self._cur + 540) % 360) - 180; self._cur += d * 0.06; self._n.aw.style.transform = 'rotate(' + self._cur.toFixed(2) + 'deg)'; self._raf = requestAnimationFrame(tick); };
      tick();
    }
    stopFollow() { if (!this._following) return; this._following = false; window.removeEventListener('pointermove', this._onMove); document.documentElement.removeEventListener('mouseleave', this._onLeave); cancelAnimationFrame(this._raf); }
  }
  customElements.define('kamben-compass', KambenCompass);
})();

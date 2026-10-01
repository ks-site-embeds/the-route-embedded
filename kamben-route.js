/* Kamben Signal — "Our method" route diagram + counting stats as a Wix Custom Element.
 * Install: Velo → Public → custom-elements/kamben-route.js. Element source: Velo file · Tag name: kamben-route
 * Transparent — place it over the photo section. Desktop: 760 px wide → 572 tall (scales with width). Below 560 px wide it switches to the stacked mobile layout.
 * Attributes: lang="en"|"no" (default: page <html lang>) · color (default #ffffff) · fonts="google"|"none"
 *             stats='[{"label":"Conversion rate","value":"3.5%"},{"label":"Customer lifetime value","value":"NOK 24 500"},{"label":"New users","value":"24%"}]'  (optional override; numbers count up from 0)
 * Motion: plays once when 30% in view; honours prefers-reduced-motion. */
(function () {
  if (!window.customElements || customElements.get('kamben-route')) return;
  var DICT = {
    en: [{ label: 'Conversion rate', value: '3.5%' }, { label: 'Customer lifetime value', value: '24 500' }, { label: 'New users', value: '24%' }],
    no: [{ label: 'Konverteringsrate', value: '3.5%' }, { label: 'Kundens livstidsverdi', value: '24 500' }, { label: 'Nye brukere', value: '24%' }]
  };
  var ROUTE = "M 0 259.5 C 2.59 260.63 7.59 264.83 15.555 266.268 C 23.52 267.70 35.09 267.53 47.813 268.109 C 60.54 268.69 81.08 267.55 91.89 269.76 C 102.70 271.97 105.31 279.27 112.663 281.35 C 120.02 283.43 130.62 286.07 136.033 282.262 C 141.44 278.45 143.73 266.67 145.115 258.506 C 146.50 250.35 143.88 238.21 144.344 233.299 C 144.81 228.39 143.19 231.46 147.894 229.033 C 152.60 226.60 165.61 224.03 172.584 218.716 C 179.56 213.40 185.07 201.60 189.748 197.135 C 194.42 192.67 192.96 193.88 200.645 191.943 C 208.33 190.01 225.43 188.05 235.881 185.532 C 246.33 183.01 254.22 179.30 263.328 176.82 C 272.44 174.34 283.08 171.07 290.552 170.65 C 298.03 170.23 302.39 170.59 308.176 174.278 C 313.96 177.96 317.78 188.42 325.252 192.758 C 332.73 197.10 342.32 198.02 353.018 200.321 C 363.72 202.62 371.64 203.62 389.464 206.581 C 407.29 209.54 440.31 216.67 459.988 218.102 C 479.67 219.54 494.09 219.20 507.542 215.187 C 520.99 211.18 531.18 200.69 540.7 194.042 C 550.22 187.40 551.01 186.17 564.666 175.31 C 578.32 164.45 608.63 140.47 622.65 128.863 C 636.67 117.26 638.89 111.25 648.799 105.679 C 658.71 100.11 674.42 98.18 682.105 95.433 C 689.79 92.69 688.08 89.58 694.9 89.225 C 701.72 88.87 716.48 96.02 723.034 93.288 C 729.59 90.56 727.97 79.84 734.216 72.84 C 740.46 65.84 750.85 58.54 760.502 51.273 C 770.15 44.01 782.57 36.16 792.102 29.248 C 801.63 22.33 809.53 14.65 817.676 9.779 C 825.83 4.90 837.11 1.63 841 0";
  var ROCKS = [{"origin":"50.0% 100.0%","d":"M18.49,83.97l-11.22,20.12L0,123.8h96.39l-2.63-18.2-10.78-23.22-64.5,1.59Z"},{"origin":"51.6% 67.2%","d":"M76.06,68.68l-7.18-13.87-15.09-17.56-30.44,31.16,30.42,14.78,22.29-14.51Z"},{"origin":"54.0% 30.4%","d":"M67.66,14.77l7.01-13.73-.22-1.04-25.42,5.66-19.54,3.21.23,1.11,14.57,12.35,9.51,15.32,13.86-22.88Z"}];
  var MARK = "\n<path d=\"M69.64,40.82c2.83-2.14,3.32-3,4.52-5.06.22-.38.47-.8.75-1.28.89-1.48,1.71-3.38,2.57-5.39.38-.89.77-1.8,1.18-2.7l-1.06-1.91-2.69-3.33c-1.04,1.72-1.99,3.23-2.68,4.23-1.77,2.54-2.5,3-3.21,3.45-.2.13-.39.25-.61.42-1.05.83-1.63.92-2.44,1.05h-.07c-.16.04-.3.07-.43.1-.56.14-1.04.26-2.31-.32-.79-.36-2.1-1.2-3.35-2.01-1.12-.72-2.28-1.47-2.99-1.81l-.25-.12c-.5-.24-.87-.42-1.21-.56l-9.47,5.51,2.05,2.73c1.47-.49,2.77-.43,3.88-.3,1.48.18,3.03,1.01,3.9,1.66.94.7,1.39,1.73,1.69,2.55.29.8.29,1.34,0,2.2-.05.16-.08.29-.11.43-.12.56-.23,1.09-1.54,2.49-.32.34-.72.73-1.18,1.15l2.98,3.62c2.07-1.34,4.33-2.5,6.4-3.57,2.19-1.13,4.27-2.19,5.66-3.25h0Z\"></path>\n<path d=\"M70.45,46.43c.83-.55,1.41-.87,1.88-1.12,1.11-.59,1.52-.82,3.19-3.22,1.07-1.54,2.39-4.08,3.78-6.77.67-1.3,1.38-2.66,2.1-4l-2.37-4.28c-.34.77-.67,1.54-1,2.29-.88,2.04-1.7,3.96-2.61,5.47-.28.47-.53.89-.75,1.27-1.2,2.08-1.75,3.02-4.67,5.24-1.43,1.09-3.53,2.16-5.75,3.3-2.04,1.05-4.26,2.19-6.29,3.5l2.9,3.52c1.94-1.33,3.99-2.32,5.86-3.21,1.4-.67,2.73-1.31,3.73-1.98h0Z\"></path>\n<path d=\"M91.5,47.05l-.68-.69-1.5-2.34c-.19.58-.38,1.18-.58,1.79-.85,2.63-1.73,5.36-2.42,7.01-1.06,2.55-1.81,3.75-2.69,4.94h4.14c.64-1.5,1.4-3.8,2.13-6.04.56-1.72,1.1-3.37,1.59-4.67h0Z\"></path>\n<path d=\"M55.35,42.46c1.19-1.28,1.28-1.71,1.39-2.21.03-.15.07-.31.13-.49.24-.74.24-1.14,0-1.81-.26-.74-.67-1.66-1.48-2.27-.82-.61-2.25-1.39-3.62-1.55-.41-.05-.86-.09-1.32-.09-.65,0-1.36.08-2.11.3l2.15,2.86,3.6,6.18.14.18c.44-.4.82-.77,1.13-1.1h0Z\"></path>\n<path d=\"M57.08,25.73c.74.36,1.86,1.08,3.05,1.85,1.24.8,2.52,1.62,3.28,1.96,1.09.49,1.42.41,1.93.28.14-.03.3-.07.48-.1h.07c.77-.14,1.24-.21,2.17-.95.24-.19.45-.33.66-.46.69-.44,1.34-.85,3.04-3.29.71-1.02,1.69-2.59,2.77-4.37l-4.4-5.44-1.02-.62-.6.49-12.29,10.02-.2.11c.24.11.51.24.82.39l.25.12Z\"></path>\n<path d=\"M76.97,47.65l.36-.28c1.15-.89,1.91-1.71,2.29-2.46.19-.37.44-.88.83-1.58.69-1.26,1.54-3.23,2.44-5.31.34-.79.69-1.6,1.04-2.41l-1.19-1.86-1-1.81c-.66,1.23-1.31,2.48-1.92,3.67-1.4,2.71-2.73,5.27-3.82,6.84-1.75,2.52-2.23,2.78-3.4,3.41-.46.24-1.02.55-1.83,1.09-1.04.69-2.38,1.34-3.81,2.02-1.83.88-3.84,1.84-5.73,3.13l3.02,3.67c2.72-2.37,5.9-4.13,8.48-5.55,1.71-.94,3.18-1.76,4.23-2.56h0Z\"></path>\n<path d=\"M95.71,51.32l-3.75-3.8c-.47,1.27-.99,2.85-1.49,4.39-.69,2.13-1.41,4.33-2.04,5.85h8.51c.53-.74,1.06-1.48,1.6-2.19l-2.83-4.25h0Z\"></path>\n<path d=\"M97.67,57.76h2.32l-1.11-1.67c-.41.55-.81,1.11-1.21,1.67h0Z\"></path>\n<path d=\"M70.97,57.76c1.69-1.19,3.38-2.15,4.94-3.04,1.77-1.01,3.31-1.88,4.41-2.84,1.98-1.74,2.25-2.37,2.89-3.91.2-.48.45-1.08.8-1.82.6-1.27,1.22-3.09,1.88-5.01.18-.54.37-1.08.56-1.61l-2.13-3.33c-.3.69-.6,1.38-.89,2.05-.9,2.1-1.75,4.09-2.46,5.37-.38.69-.63,1.2-.82,1.56-.63,1.26-.67,1.29-2.46,2.67l-.36.28c-1.08.83-2.57,1.66-4.3,2.61-2.69,1.48-5.72,3.16-8.38,5.48l1.27,1.54h5.06Z\"></path>\n<path d=\"M88.18,45.63c.25-.77.49-1.53.73-2.25l-2.06-3.21c-.14.4-.27.79-.4,1.17-.67,1.94-1.3,3.77-1.91,5.07-.34.73-.58,1.29-.79,1.79-.66,1.58-.96,2.29-3.05,4.13-1.15,1-2.7,1.89-4.51,2.91-1.33.75-2.75,1.56-4.18,2.52h10.88c1-1.32,1.74-2.42,2.88-5.17.68-1.63,1.55-4.34,2.4-6.96Z\"></path>\n<path d=\"M23.71,21.94l-12.43,10.4-1.35,2.5c.3-.21.61-.42.92-.64,3.5-2.5,8.37-6.57,13.08-10.5,4.27-3.56,8.29-6.93,10.88-8.77,4-2.85,4.95-3.03,6.53-3.35.56-.11,1.18-.23,2.07-.51,1.71-.53,3.85-.93,5.97-1.3l1.22-5.1c-2.17.62-4.41,1.17-6.52,1.69-1.25.31-2.47.61-3.59.91l-8.93,7.56-7.84,7.11h0Z\"></path>\n<path d=\"M16.69,50.97c-5.07,2.51-6.37,2.85-8.01,3.28-.56.15-1.14.3-1.93.55-1.6.51-3.27.86-4.88,1.2-.43.09-.85.18-1.25.27l-.62,1.49h6.69c3.06-.8,6.25-1.7,8.97-2.72,3.71-1.41,8.3-3.68,12.35-5.68,2.74-1.36,5.1-2.52,6.65-3.15,2.2-.89,3.62-.61,4.43-.22.88.43,1.36,1.14,1.51,1.61.38,1.26-.13,4.63-4.42,9.33-.23.25-.49.53-.77.83h5.51l4.1-21.89c-3.62,1.83-9.06,4.79-14.36,7.67-5.6,3.04-10.89,5.92-13.96,7.43h0Z\"></path>\n<path d=\"M20.46,44.54c-5.95,3.3-13.31,6.29-18.44,8.34l-1.13,2.71c.28-.06.57-.12.85-.18,1.59-.34,3.24-.68,4.82-1.19.8-.26,1.39-.41,1.96-.56,1.61-.42,2.88-.76,7.9-3.24,3.06-1.51,8.34-4.38,13.94-7.42,5.5-2.99,11.16-6.06,14.78-7.88l.75-4.02.68-3.65c-2.52,1.51-6.11,3.98-9.89,6.57-5.41,3.71-11.54,7.92-16.23,10.51h0Z\"></path>\n<path d=\"M40.03,47.77c-.09-.29-.44-.88-1.2-1.25-.43-.21-.93-.32-1.49-.32-.73,0-1.57.18-2.46.55-1.53.62-3.88,1.79-6.61,3.13-4.06,2.01-8.66,4.28-12.4,5.7-2.1.8-4.48,1.51-6.86,2.16h25.59c.43-.46.82-.88,1.15-1.24,4.12-4.5,4.61-7.69,4.29-8.74h0Z\"></path>\n<path d=\"M45.67,21.37c-.52.04-1.82.78-3.9,2.2l-.1.07c-1.82,1.25-4.41,3.32-7.42,5.72-4.65,3.71-9.92,7.92-14.37,10.74-4.16,2.64-9.08,4.96-13.42,7.01-.87.41-1.72.81-2.55,1.21l-1.57,3.78c5.08-2.04,12.12-4.93,17.83-8.1,4.66-2.58,10.78-6.78,16.18-10.49,4.01-2.75,7.82-5.36,10.37-6.85l1.06-5.66c-.09.02-.19.04-.27.06-.96.22-1.47.26-1.84.29h0Z\"></path>\n<path d=\"M41.9,6.28c.65-.16,1.33-.33,2.03-.51,2.21-.55,4.55-1.13,6.82-1.78l.86-3.61-.31-.38-9.41,6.28h0Z\"></path>\n<path d=\"M46.08,16.01c-1.41.13-2.42.22-6,2.61-2.35,1.58-5.82,4.44-9.49,7.46-4.29,3.54-9.15,7.55-13.09,10.2-3.64,2.45-7.61,4.6-11.34,6.54l-.94,2.34-.96,2.32c.64-.3,1.29-.61,1.95-.92,4.32-2.04,9.23-4.35,13.35-6.97,4.42-2.81,9.68-7,14.32-10.71,3.02-2.41,5.62-4.49,7.45-5.75l.1-.07c2.16-1.49,3.55-2.26,4.18-2.31.35-.03.84-.07,1.76-.28.15-.03.31-.07.48-.1l.55-4.76s-.07.02-.1.02c-.95.24-1.63.3-2.23.36h0Z\"></path>\n<path d=\"M41.44,12.16c-1.5.3-2.4.47-6.3,3.25-2.57,1.83-6.59,5.19-10.85,8.74-4.72,3.94-9.6,8.02-13.11,10.53-.64.46-1.26.88-1.87,1.29l-1.52,2.81-1.29,3.2c3.54-1.85,7.26-3.89,10.67-6.19,3.91-2.63,8.76-6.63,13.04-10.17,3.68-3.04,7.15-5.91,9.53-7.5,3.7-2.48,4.83-2.58,6.27-2.71.58-.05,1.23-.11,2.14-.34.1-.03.21-.05.32-.07l.34-2.96.39-1.64c-2.02.36-4.04.74-5.64,1.24-.91.28-1.56.41-2.13.53h0Z\"></path>\n";
  var F = "'Space Grotesk','Helvetica Neue',Arial,sans-serif";
  var REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  var CSS = [
    'kamben-route{display:block;position:relative;width:100%;font-family:' + F + ';color:#fff}',
    'kamben-route *{box-sizing:border-box}',
    '.kr{position:relative;width:100%}',
    '.kr-stage{position:relative;transform-origin:0 0}',
    '.kr-mark,.kr-route,.kr-cairn{position:absolute}',
    '.kr-mark{display:block;overflow:visible}',
    '.kr-route{display:block;overflow:visible}',
    '.kr-rock{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}',
    '.kr-stats{position:absolute;left:0;top:428px;width:760px;display:flex;justify-content:space-between;align-items:stretch}',
    '.kr-stat{display:grid;grid-template-rows:64px auto;align-items:start;justify-items:start}',
    '.kr-stat{position:relative}',
    '.kr-div{position:absolute;top:-6px;bottom:-4px;width:1px;background:rgba(255,255,255,0.35)}',
    '.kr-label{margin:0;font:700 14px/18px ' + F + ';letter-spacing:2.1px;text-transform:uppercase;white-space:nowrap}',
    '.kr-num{margin:0;font:400 80px/80px ' + F + ';font-variant-numeric:tabular-nums;white-space:nowrap;display:inline-grid;grid-template-areas:"n"}',
    '.kr-num>span{grid-area:n;display:block;text-align:left}',
    '.kr-num>.kr-ghost{visibility:hidden;pointer-events:none}',
    '.kr-rows{display:none}',
    '.kr[data-mode=mobile] .kr-stats{display:none}',
    '.kr[data-mode=mobile] .kr-rows{display:block;margin-top:12px}',
    '.kr[data-mode=mobile] .kr-row{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:14px 0;border-top:1px solid rgba(255,255,255,0.4)}',
    '.kr[data-mode=mobile] .kr-label{font:700 11px/14px ' + F + ';letter-spacing:1.6px;white-space:normal}',
    '.kr[data-mode=mobile] .kr-num{margin:0;font:400 30px/32px ' + F + '}'
  ].join('\n');
  function ensureHead() { if (document.getElementById('kr-style')) return; var st = document.createElement('style'); st.id = 'kr-style'; st.textContent = CSS; document.head.appendChild(st); }
  function ensureFonts() { if (document.getElementById('kc-fonts')) return; var l = document.createElement('link'); l.id = 'kc-fonts'; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=DM+Sans:wght@400;700&display=swap'; document.head.appendChild(l); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function svg(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function esc(v) { return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function pos(e, l, t, w, h) { e.style.left = l + 'px'; e.style.top = t + 'px'; e.style.width = w + 'px'; e.style.height = h + 'px'; }
  function anim(e, kf, dur, delay, easing) {
    if (REDUCED) { commit(e, kf[kf.length - 1]); return; }
    var a = e.animate(kf, { duration: dur, delay: delay || 0, easing: easing || 'cubic-bezier(.22,.61,.36,1)', fill: 'both' });
    a.onfinish = function () { commit(e, kf[kf.length - 1]); a.cancel(); };
  }
  function commit(e, last) { for (var k in last) if (k !== 'offset' && k !== 'easing') e.style[k] = last[k]; }
  var RISE = [{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'translateY(0px)' }];
  var FADE = [{ opacity: 0 }, { opacity: 1 }];
  function stackKf(drop) { return [
    { opacity: 0, transform: 'translateY(-' + drop + 'px) rotate(-5deg)', easing: 'cubic-bezier(.45,0,.9,.5)' },
    { opacity: 1, transform: 'translateY(0px) rotate(3.2deg)', offset: 0.4, easing: 'ease-out' },
    { opacity: 1, transform: 'translateY(0px) rotate(-1.8deg)', offset: 0.64, easing: 'ease-in-out' },
    { opacity: 1, transform: 'translateY(0px) rotate(0.8deg)', offset: 0.84, easing: 'ease-in-out' },
    { opacity: 1, transform: 'translateY(0px) rotate(0deg)' }]; }
  // "NOK 24 500" → prefix "NOK ", number 24500, grouping " ", 0 decimals, suffix ""
  function parseValue(str) {
    var m = String(str).match(/^([^0-9]*)([0-9][0-9\s\u00a0\u2009\u202f.,]*[0-9]|[0-9])(.*)$/);
    if (!m) return null;
    var raw = m[2], group = (raw.match(/[\s\u00a0\u2009\u202f]/) || [''])[0], dec = '';
    var lastSep = Math.max(raw.lastIndexOf('.'), raw.lastIndexOf(','));
    if (lastSep > -1 && raw.length - lastSep - 1 <= 2) dec = raw[lastSep];
    var digits = raw.replace(/[\s\u00a0\u2009\u202f]/g, '');
    if (dec) digits = digits.slice(0, lastSep - (raw.slice(0, lastSep).length - raw.slice(0, lastSep).replace(/[\s\u00a0\u2009\u202f]/g, '').length)).replace(/[.,]/g, '') + '.' + digits.slice(digits.lastIndexOf(dec) + 1);
    else digits = digits.replace(/[.,]/g, '');
    var n = parseFloat(digits), decimals = dec ? (raw.length - lastSep - 1) : 0;
    return { prefix: m[1], suffix: m[3], target: isNaN(n) ? 0 : n, decimals: decimals, dec: dec || '.', group: group };
  }
  function fmt(p, v) {
    var str = v.toFixed(p.decimals), parts = str.split('.'), i = parts[0];
    if (p.group) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, p.group);
    return p.prefix + i + (parts[1] ? p.dec + parts[1] : '') + p.suffix;
  }

  class KambenRoute extends HTMLElement {
    static get observedAttributes() { return ['lang', 'stats', 'color']; }
    connectedCallback() {
      if (this._built) return; this._built = true;
      if (this.querySelector('.kr')) this._played = true;
      ensureHead(); if (this.getAttribute('fonts') !== 'none') ensureFonts();
      this.build();
      var self = this;
      this._ro = new ResizeObserver(function () { self.layout(); }); this._ro.observe(this);
      this._io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !self._played) { self._played = true; self.play(); } }); }, { threshold: 0.3 });
      this._io.observe(this);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { self.layout(); });
      setTimeout(function () { self.layout(); }, 800);
    }
    disconnectedCallback() { if (this._ro) this._ro.disconnect(); if (this._io) this._io.disconnect(); }
    attributeChangedCallback(n, o, v) { if (o !== v && this._built) this.build(); }
    get stats() {
      var raw = this.getAttribute('stats');
      if (raw) { try { var arr = JSON.parse(raw); if (Array.isArray(arr) && arr.length) return arr.slice(0, 3); } catch (e) {} }
      var l = (this.getAttribute('lang') || document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
      return DICT[l] || DICT.en;
    }
    build() {
      var n = this._n = {}, color = this.getAttribute('color') || '#ffffff';
      this.style.color = color; this.innerHTML = '';
      var root = n.root = el('div', 'kr'), stage = n.stage = el('div', 'kr-stage');
      n.mark = svg('svg', { viewBox: '0 0 100 57.76', 'class': 'kr-mark', 'aria-hidden': 'true', fill: color }); n.mark.innerHTML = MARK;
      n.route = svg('svg', { viewBox: '0 0 841 283', 'class': 'kr-route', 'aria-hidden': 'true' });
      n.path = svg('path', { d: ROUTE, fill: 'none', stroke: color, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }); n.route.appendChild(n.path);
      n.cairn = el('div', 'kr-cairn'); n.cairn.setAttribute('aria-hidden', 'true');
      n.rocks = ROCKS.map(function (r) { var sv = svg('svg', { viewBox: '0 0 96.39 123.8', 'class': 'kr-rock' }); sv.style.transformOrigin = r.origin; sv.appendChild(svg('path', { d: r.d, fill: color })); n.cairn.appendChild(sv); return sv; });
      stage.appendChild(n.mark); stage.appendChild(n.route); stage.appendChild(n.cairn);
      n.statsBox = el('div', 'kr-stats'); n.rows = el('div', 'kr-rows');
      n.items = this.stats.map(function (st) { var w = el('div', 'kr-stat'), l = el('p', 'kr-label', esc(st.label)), v = el('p', 'kr-num'), g = el('span', 'kr-ghost', esc(st.value)), live = el('span', '', esc(st.value)); g.setAttribute('aria-hidden', 'true'); v.appendChild(g); v.appendChild(live); v.__live = live; v.__parsed = parseValue(st.value); v.__final = String(st.value); w.appendChild(l); w.appendChild(v); return { wrap: w, label: l, num: v }; });
      n.items.forEach(function (it, i) { if (i) { it.div = el('div', 'kr-div'); it.div.setAttribute('aria-hidden', 'true'); } });
      root.appendChild(stage); root.appendChild(n.rows); this.appendChild(root);
      stage.appendChild(n.statsBox);
      this.layout();
    }
    layout() {
      var n = this._n; if (!n) return;
      var W = this.clientWidth || 700, mobile = W < 560;
      this._mobile = mobile; n.root.setAttribute('data-mode', mobile ? 'mobile' : 'desktop');
      n.items.forEach(function (it) { (mobile ? n.rows : n.statsBox).appendChild(it.wrap); it.wrap.className = mobile ? 'kr-row' : 'kr-stat'; if (it.div) { if (mobile) { if (it.div.parentNode) it.div.parentNode.removeChild(it.div); } else it.wrap.appendChild(it.div); } });
      var DW = 760, DH = mobile ? 328 : 572, k = W / DW;
      n.stage.style.width = DW + 'px'; n.stage.style.height = DH + 'px'; n.stage.style.transform = 'scale(' + k + ')';
      n.stage.style.marginBottom = (DH * k - DH) + 'px';
      pos(n.mark, 0, 266, 96, 55); pos(n.route, 122, 150, 536, 180); pos(n.cairn, 672, 48, 62, 79.6);
      if (!mobile) { for (var i = 1; i < n.items.length; i++) { var prev = n.items[i - 1].wrap, cur = n.items[i].wrap, gap = cur.offsetLeft - (prev.offsetLeft + prev.offsetWidth); n.items[i].div.style.left = (-gap / 2) + 'px'; } }
      if (this._played) this.showFinal(); else this.prepare();
      var H = n.root.offsetHeight; this.style.height = H + 'px';
      if (H !== this._lastH) { this._lastH = H; this.dispatchEvent(new CustomEvent('kr-height', { detail: { height: H } })); }
    }
    prepare() {
      var n = this._n, len = 0; try { len = n.path.getTotalLength(); } catch (e) {}
      n.path.style.strokeDasharray = len + 'px'; n.path.style.strokeDashoffset = len + 'px';
      n.mark.style.opacity = '0'; n.rocks.forEach(function (r) { r.style.opacity = '0'; });
      n.items.forEach(function (it) { if (it.div) { it.div.style.transformOrigin = '50% 0'; it.div.style.transform = 'scaleY(0)'; } it.label.style.opacity = '0'; it.num.style.opacity = '0'; if (it.num.__parsed) it.num.__live.textContent = fmt(it.num.__parsed, 0); });
    }
    showFinal() {
      var n = this._n;
      [n.path, n.mark].concat(n.rocks).forEach(function (e) { e.style.opacity = ''; e.style.transform = ''; e.style.strokeDasharray = ''; e.style.strokeDashoffset = ''; });
      n.items.forEach(function (it) { if (it.div) it.div.style.transform = ''; it.label.style.opacity = it.label.style.transform = ''; it.num.style.opacity = it.num.style.transform = ''; it.num.__live.textContent = it.num.__final; });
    }
    play() {
      var n = this._n, m = this._mobile, self = this;
      if (REDUCED) { this.showFinal(); return; }
      anim(n.mark, FADE, 900, 300);
      var len = parseFloat(n.path.style.strokeDasharray) || 0;
      anim(n.path, [{ strokeDashoffset: len + 'px' }, { strokeDashoffset: '0px' }], 1500, 300, 'cubic-bezier(.4,0,.3,1)');
      n.rocks.forEach(function (r, i) { anim(r, stackKf(m ? 16 : 20), 600, 900 + 220 * i, 'linear'); });
      n.items.forEach(function (it, i) {
        anim(it.label, RISE, 900, 800 + 150 * i); if (it.div) anim(it.div, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], 900, 800 + 150 * i);
        anim(it.num, RISE, 900, 900 + 150 * i);
        var p = it.num.__parsed; if (!p) return;
        var t0 = performance.now() + 900 + 150 * i, dur = 1400;
        var tick = function () {
          var q = Math.min(1, Math.max(0, (performance.now() - t0) / dur)), e = 1 - Math.pow(1 - q, 3);
          it.num.__live.textContent = q >= 1 ? it.num.__final : fmt(p, p.target * e);
          if (q < 1) setTimeout(tick, 30);
        };
        tick();
      });
    }
  }
  customElements.define('kamben-route', KambenRoute);
})();

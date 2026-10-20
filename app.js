const INSTRUMENTS = {
  R: { name: 'Thanh phách', note: 'Nốt đen',            hint: '1 phách' },
  B: { name: 'Trống nhỏ',   note: 'Hai nốt móc đơn',    hint: '2 tiếng / phách' },
  Y: { name: 'Triangle',    note: 'Nốt trắng',          hint: 'ngân 2 phách' },
  W: { name: 'Dấu lặng',    note: 'Dấu lặng đen',       hint: 'nghỉ 1 phách' },
};

const STEPS_BY_METER = { 2: 8, 3: 9 };

const PRESETS = {
  '2/4': {
    meter: 2,

    cells: ['R','B', 'Y','W', 'R','B', 'R','R'],
    pattern: '♩ ♫ | 𝅗𝅥 | ♩ ♫ | ♩ ♪𝄾',
    source: 'Bài đọc nhạc số 3 “Inh lả ơi” (Dân ca Thái), SGK trang 34',
    bpm: 80,
  },
  '3/4': {
    meter: 3,

    cells: ['R','R','R', 'Y','W','R', 'Y','W','W'],
    pattern: '♩ ♩ ♩ | 𝅗𝅥 ♩ | 𝅗𝅥.',
    source: 'Bài đọc nhạc số 4 “Mùa xuân trong rừng” (Nhạc Ba Lan), SGK trang 43',
    bpm: 96,
  },
};

const state = {
  meter: 2,
  cells: [],
  brush: 'R',
  bpm: 80,
  playing: false,
  preset: '2/4',
};

const SHAPES = {

  R: '<circle cx="50" cy="68" r="34" fill="currentColor"/>',
  B: '<rect x="18" y="36" width="64" height="64" rx="6" transform="rotate(45 50 68)" fill="currentColor"/>',
  Y: '<polygon points="50,28 88,100 12,100" fill="currentColor"/>',
  W: '',
};
const GLYPHS = {

  R: `<ellipse cx="25" cy="46" rx="9.5" ry="7" transform="rotate(-22 25 46)" fill="currentColor"/>
      <rect x="31.5" y="8" width="3.4" height="38" rx="1.5" fill="currentColor"/>`,

  B: `<ellipse cx="15" cy="48" rx="8" ry="6" transform="rotate(-22 15 48)" fill="currentColor"/>
      <ellipse cx="41" cy="48" rx="8" ry="6" transform="rotate(-22 41 48)" fill="currentColor"/>
      <rect x="20.3" y="10" width="3" height="38" fill="currentColor"/>
      <rect x="46.3" y="10" width="3" height="38" fill="currentColor"/>
      <rect x="20.3" y="9" width="29" height="6.5" fill="currentColor"/>`,

  Y: `<polygon points="10,4 19,19 1,19" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>
      <ellipse cx="27" cy="47" rx="9" ry="6.5" transform="rotate(-22 27 47)" fill="none" stroke="currentColor" stroke-width="3.6"/>
      <rect x="33.6" y="10" width="3.2" height="37" rx="1.5" fill="currentColor"/>`,

  W: `<path d="M26 8 L37 21 L28 31 L38 43 C31 40 24 43 31 54" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,

  TIE: `<rect x="2" y="27" width="56" height="6" rx="3" fill="currentColor"/>`,
};

const $ = (id) => document.getElementById(id);
const scoreEl = $('score');
let cellEls = [];

function steps() { return STEPS_BY_METER[state.meter]; }

function analyse(cells = state.cells, meter = state.meter) {
  const n = cells.length, ties = Array(n).fill(false), lengths = Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    if (cells[i] !== 'Y') continue;
    let j = i + 1;
    while (j < n && cells[j] === 'W' && j % meter !== 0) { ties[j] = true; j++; }
    lengths[i] = j - i;
  }
  return { ties, lengths };
}

function buildGrid() {
  scoreEl.innerHTML = '';
  const ts = document.createElement('div');
  ts.className = 'timesig';
  ts.innerHTML = `<span>${state.meter}</span><span>4</span>`;
  scoreEl.appendChild(ts);

  cellEls = [];
  const n = steps();
  let measure;
  for (let i = 0; i < n; i++) {
    if (i % state.meter === 0) {
      measure = document.createElement('div');
      measure.className = 'measure';
      measure.innerHTML = '<div class="beats"></div><div class="counts"></div>';
      scoreEl.appendChild(measure);
    }
    const b = document.createElement('button');
    b.className = 'cell';
    b.dataset.i = i;
    b.addEventListener('click', () => paint(i));
    measure.querySelector('.beats').appendChild(b);
    cellEls.push(b);

    const c = document.createElement('div');
    const beatNo = (i % state.meter) + 1;
    c.className = 'count' + (beatNo === 1 ? ' strong' : '');
    c.textContent = beatNo;
    measure.querySelector('.counts').appendChild(c);
  }
  renderCells();
}

function renderCells() {
  const { ties, lengths } = analyse();
  cellEls.forEach((el, i) => {
    const v = state.cells[i];
    const isTie = ties[i];
    el.dataset.v = v;
    el.classList.toggle('tie', isTie);
    const glyph = isTie ? GLYPHS.TIE : GLYPHS[v];
    const shape = isTie ? '' : SHAPES[v];
    el.innerHTML =
      `<svg class="shape" viewBox="0 0 100 135" preserveAspectRatio="xMidYMid meet">${shape}</svg>` +
      `<svg class="glyph" viewBox="0 0 60 60">${glyph}</svg>`;
    const info = INSTRUMENTS[v];
    const label = isTie ? 'Ngân tiếp nốt trắng'
      : `${info.name} – ${info.note}` + (v === 'Y' ? ` (ngân ${lengths[i]} phách)` : '');
    el.title = label;
    el.setAttribute('aria-label', `Phách ${i + 1}: ${label}`);
  });
}

function paint(i) {
  state.cells[i] = state.cells[i] === state.brush ? 'W' : state.brush;
  renderCells();
  markCustom();

  if (state.cells[i] !== 'W') audition(state.cells[i]);
}

function markCustom() {
  document.querySelectorAll('[data-preset]').forEach((b) =>
    b.setAttribute('aria-pressed', b.dataset.preset === state.preset ? 'true' : 'false'));
}

function buildPalette() {
  const pal = $('palette');
  pal.innerHTML = '';
  ['R', 'B', 'Y', 'W'].forEach((k) => {
    const s = document.createElement('button');
    s.className = 'swatch';
    s.setAttribute('aria-pressed', state.brush === k);
    s.title = `${INSTRUMENTS[k].name} – ${INSTRUMENTS[k].note}`;
    s.innerHTML = `<span class="tile" data-v="${k}"><svg viewBox="0 0 60 60">${GLYPHS[k]}</svg></span>
      <span class="lbl">${INSTRUMENTS[k].name}</span>`;
    s.addEventListener('click', () => {
      state.brush = k;
      pal.querySelectorAll('.swatch').forEach((x) => x.setAttribute('aria-pressed', 'false'));
      s.setAttribute('aria-pressed', 'true');
    });
    pal.appendChild(s);
  });
}

function loadPreset(key) {
  const p = PRESETS[key];
  const wasPlaying = state.playing;
  if (wasPlaying) stop();
  state.preset = key;
  state.meter = p.meter;
  state.cells = p.cells.slice();
  setBpm(p.bpm);
  $('gridTitle').textContent = `Thực hành nhịp ${key}`;
  $('lessonTag').textContent = `Tiết tấu mẫu · nhịp ${key}`;

  const { ties } = analyse(p.cells, p.meter);
  $('lessonMini').innerHTML = p.cells.map((v, i) => {
    const isTie = ties[i];
    const bar = i > 0 && i % p.meter === 0 ? '<span class="bar"></span>' : '';
    return bar + `<svg viewBox="0 0 60 60" data-v="${isTie ? 'Y' : v}">${isTie ? GLYPHS.TIE : GLYPHS[v]}</svg>`;
  }).join('');
  $('lessonText').textContent = p.source + '. Số in đậm là phách mạnh.';
  buildGrid();
  buildDetChips();
  markCustom();
  if (wasPlaying) start();
}

let audio = null;
function initAudio() {
  if (audio) return audio;
  const out = new Tone.Gain(0.8).toDestination();

  const claves = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.001, decay: 0.07, sustain: 0, release: 0.03 },
  }).connect(out);
  const clavesBody = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.001, decay: 0.03, sustain: 0, release: 0.02 },
    volume: -10,
  }).connect(out);

  const hp = new Tone.Filter(6500, 'highpass').connect(out);
  const tambNoise = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.001, decay: 0.14, sustain: 0, release: 0.05 },
    volume: -6,
  }).connect(hp);
  const tambJingle = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 0.12, release: 0.05 },
    harmonicity: 5.1, modulationIndex: 16, resonance: 5000, octaves: 1.2,
    volume: -22,
  }).connect(out);

  const triangle = new Tone.FMSynth({
    harmonicity: 3.73, modulationIndex: 1.4,
    oscillator: { type: 'sine' }, modulation: { type: 'sine' },
    envelope: { attack: 0.001, decay: 1.2, sustain: 0.35, release: 0.9 },
    modulationEnvelope: { attack: 0.001, decay: 0.4, sustain: 0.2, release: 0.6 },
    volume: -8,
  }).connect(out);

  const click = new Tone.Synth({
    oscillator: { type: 'square' },
    envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.01 },
    volume: -30,
  }).connect(out);

  audio = { claves, clavesBody, tambNoise, tambJingle, triangle, click };
  return audio;
}

function playCell(v, time, beatSec, holdBeats, strong) {
  const a = audio;
  const vel = strong ? 1 : 0.75;
  if (v === 'R') {
    a.claves.triggerAttackRelease(2500, 0.05, time, vel);
    a.clavesBody.triggerAttackRelease(1250, 0.03, time, vel);
  } else if (v === 'B') {

    [0, beatSec / 2].forEach((off, k) => {
      const v2 = k === 0 ? vel : vel * 0.8;
      a.tambNoise.triggerAttackRelease(0.08, time + off, v2);
      a.tambJingle.triggerAttackRelease(380, 0.08, time + off, v2);
    });
  } else if (v === 'Y') {
    a.triangle.triggerAttackRelease(1720, beatSec * holdBeats * 0.9, time, vel);
  }
}

async function audition(v) {
  await Tone.start();
  initAudio();
  playCell(v, Tone.now() + 0.01, 60 / state.bpm, 1, true);
}

let seq = null;
let rafId = 0;

function setBpm(v) {
  state.bpm = v;
  $('bpm').value = v;
  $('bpmOut').textContent = `${v} BPM`;
  Tone.Transport.bpm.value = v;
}

function buildSequence() {
  if (seq) seq.dispose();
  const idx = [...Array(steps()).keys()];

  seq = new Tone.Sequence((time, i) => {
    const { ties, lengths } = analyse();
    const beatSec = 60 / Tone.Transport.bpm.value;
    const strong = i % state.meter === 0;
    audio.click.triggerAttackRelease(strong ? 1760 : 1320, 0.01, time);
    if (!ties[i]) playCell(state.cells[i], time, beatSec, lengths[i], strong);
  }, idx, '4n');
  seq.loop = true;
  seq.start(0);
}

async function start() {
  await Tone.start();
  initAudio();
  Tone.context.lookAhead = 0.05;
  Tone.Transport.stop();
  Tone.Transport.position = 0;
  Tone.Transport.bpm.value = state.bpm;
  buildSequence();
  Tone.Transport.start('+0.05');
  state.playing = true;
  $('playhead').classList.add('on');
  setPlayUI(true);
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
}

function stop() {
  Tone.Transport.stop();
  if (seq) { seq.dispose(); seq = null; }
  state.playing = false;
  cancelAnimationFrame(rafId);
  $('playhead').classList.remove('on');
  $('playhead').style.transform = 'none';
  lastActive = -1;
  cellEls.forEach((c) => c.classList.remove('active'));
  setPlayUI(false);
}

const ICON_PLAY = '<path d="M7 4.5v15l13-7.5z" fill="currentColor"/>';
const ICON_STOP = '<rect x="6" y="5" width="4.5" height="14" rx="1" fill="currentColor"/><rect x="13.5" y="5" width="4.5" height="14" rx="1" fill="currentColor"/>';
function setPlayUI(playing) {
  $('playIcon').innerHTML = playing ? ICON_STOP : ICON_PLAY;
  $('playBtn').setAttribute('aria-label', playing ? 'Dừng' : 'Phát');
  $('topPlay').innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24">${playing ? ICON_STOP : ICON_PLAY}</svg>${playing ? 'Dừng' : 'Phát'}`;
}

let lastActive = -1;
function tick() {
  rafId = requestAnimationFrame(tick);
  const n = steps();
  const ticks = Tone.Transport.getTicksAtTime(Tone.context.currentTime);
  if (ticks < 0) return;
  const beatFloat = (ticks / Tone.Transport.PPQ) % n;
  const i = Math.floor(beatFloat);
  const frac = beatFloat - i;

  const wrap = $('gridWrap').getBoundingClientRect();
  const r = cellEls[i].getBoundingClientRect();
  const ph = $('playhead');
  ph.style.height = `${r.height + 12}px`;
  ph.style.transform = `translate(${r.left - wrap.left + frac * r.width - 1}px, ${r.top - wrap.top - 6}px)`;

  if (i !== lastActive) {
    cellEls.forEach((c, k) => c.classList.toggle('active', k === i));
    lastActive = i;
  }
}

const video = $('video');
const overlay = $('overlay');
const work = $('work');
const wctx = work.getContext('2d', { willReadFrequently: true });
const octx = overlay.getContext('2d');

const WORK_W = 320, WORK_H = 240;

const COLOR_RULES = {
  minSat: 0.30,
  minVal: 0.28,

  red:    [[0, 18], [330, 360]],
  yellow: [[35, 70]],
  blue:   [[180, 255]],
};
const MIN_COVER = 0.22;
const STABLE_FRAMES = 4;
const SCAN_MS = 70;

let camStream = null;
let camTimer = 0;
const camHist = [];
let detected = [];

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r)      h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else                h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

const inRanges = (h, ranges) => ranges.some(([a, b]) => h >= a && h < b);

function classifyPixel(r, g, b) {
  const { h, s, v } = rgbToHsv(r, g, b);
  if (s < COLOR_RULES.minSat || v < COLOR_RULES.minVal) return null;
  if (inRanges(h, COLOR_RULES.red))    return 'R';
  if (inRanges(h, COLOR_RULES.yellow)) return 'Y';
  if (inRanges(h, COLOR_RULES.blue))   return 'B';
  return null;
}

function zones() {
  const n = steps();
  const marginX = WORK_W * 0.05;
  const zw = (WORK_W - marginX * 2) / n;
  const size = Math.floor(Math.min(zw * 0.8, WORK_H * 0.22));
  const cy = WORK_H * ($('stripY').value / 100);
  return [...Array(n).keys()].map((i) => ({
    x: Math.round(marginX + zw * i + (zw - size) / 2),
    y: Math.round(cy - size / 2),
    w: size, h: size,
  }));
}

function classifyZone(data, imgW, z) {
  const votes = { R: 0, B: 0, Y: 0 };
  let total = 0;
  for (let y = z.y; y < z.y + z.h; y += 2) {
    for (let x = z.x; x < z.x + z.w; x += 2) {
      const p = (y * imgW + x) * 4;
      const c = classifyPixel(data[p], data[p + 1], data[p + 2]);
      if (c) votes[c]++;
      total++;
    }
  }
  let best = 'W', bestN = 0;
  for (const k in votes) if (votes[k] > bestN) { best = k; bestN = votes[k]; }
  return bestN / total >= MIN_COVER ? best : 'W';
}

function scanFrame() {
  if (!camStream || video.readyState < 2) return;

  wctx.drawImage(video, 0, 0, WORK_W, WORK_H);

  const { data } = wctx.getImageData(0, 0, WORK_W, WORK_H);
  const zs = zones();
  let changed = false;

  zs.forEach((z, i) => {

    const raw = classifyZone(data, WORK_W, z);

    const hist = (camHist[i] = camHist[i] || []);
    hist.push(raw);
    if (hist.length > STABLE_FRAMES) hist.shift();
    const stable = hist.length === STABLE_FRAMES && hist.every((c) => c === raw);
    if (stable && detected[i] !== raw) {
      detected[i] = raw;

      if ($('camApply').checked && state.cells[i] !== raw) {
        state.cells[i] = raw;
        changed = true;
        cellEls[i].classList.remove('cam-flash');
        void cellEls[i].offsetWidth;
        cellEls[i].classList.add('cam-flash');
      }
    }
  });
  if (changed) { state.preset = null; renderCells(); markCustom(); }
  drawOverlay(zs);
  updateDetChips();
}

function drawOverlay(zs) {
  overlay.width = WORK_W; overlay.height = WORK_H;
  const css = getComputedStyle(document.documentElement);
  const col = {
    R: css.getPropertyValue('--red'), B: css.getPropertyValue('--blue'),
    Y: css.getPropertyValue('--yellow'), W: 'rgba(255,255,255,.85)',
  };
  octx.clearRect(0, 0, WORK_W, WORK_H);
  zs.forEach((z, i) => {
    const v = detected[i] || 'W';
    octx.lineWidth = v === 'W' ? 1.5 : 3;
    octx.strokeStyle = col[v];
    octx.setLineDash(v === 'W' ? [4, 3] : []);
    octx.strokeRect(z.x + .5, z.y + .5, z.w, z.h);
    octx.fillStyle = 'rgba(255,255,255,.9)';
    octx.font = '600 10px system-ui';
    octx.fillText(String(i + 1), z.x + 2, z.y - 4);
  });
}

function buildDetChips() {
  const box = $('detChips');
  box.innerHTML = '';
  for (let i = 0; i < steps(); i++) box.appendChild(document.createElement('span'));
  detected = [];
  camHist.length = 0;
  updateDetChips();
}
function updateDetChips() {
  [...$('detChips').children].forEach((s, i) => (s.dataset.v = detected[i] || 'W'));
}

function setCamUI(on) {
  $('camBtn').textContent = on ? 'Tắt camera' : 'Bật camera';
  $('topCam').textContent = on ? 'Tắt camera' : 'Camera';
}

async function toggleCamera() {
  if (camStream) {
    camStream.getTracks().forEach((t) => t.stop());
    camStream = null;
    clearInterval(camTimer);
    video.srcObject = null;
    octx.clearRect(0, 0, overlay.width, overlay.height);
    $('camEmpty').hidden = false;
    setCamUI(false);
    $('camStatus').textContent = 'Đang tắt';
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    $('camStatus').textContent = 'Trình duyệt không hỗ trợ camera';
    return;
  }
  try {
    $('camStatus').textContent = 'Đang mở…';
    camStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'environment' },
      audio: false,
    });
    video.srcObject = camStream;
    await video.play();
    work.width = WORK_W; work.height = WORK_H;
    $('camEmpty').hidden = true;
    setCamUI(true);
    $('camStatus').textContent = 'Đang quét';
    camTimer = setInterval(scanFrame, SCAN_MS);
  } catch (e) {
    camStream = null;
    $('camStatus').textContent = 'Không mở được camera';
    $('camEmpty').textContent = 'Không truy cập được camera. Hãy cho phép quyền camera và mở trang qua https hoặc localhost.';
  }
}

$('playBtn').addEventListener('click', () => (state.playing ? stop() : start()));
$('bpm').addEventListener('input', (e) => setBpm(+e.target.value));
$('clearBtn').addEventListener('click', () => {
  state.cells = Array(steps()).fill('W');
  state.preset = null;
  renderCells(); markCustom();
});
document.querySelectorAll('[data-preset]').forEach((b) =>
  b.addEventListener('click', () => loadPreset(b.dataset.preset)));
$('camBtn').addEventListener('click', toggleCamera);
$('topCam').addEventListener('click', toggleCamera);
$('topPlay').addEventListener('click', () => (state.playing ? stop() : start()));

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
    e.preventDefault();
    if (!e.repeat) state.playing ? stop() : start();
  }
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT') e.preventDefault();
});

$('themeBtn').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('beatpaper-theme', root.dataset.theme); } catch (e) {}
});
try {
  const saved = localStorage.getItem('beatpaper-theme');
  if (saved) document.documentElement.dataset.theme = saved;
} catch (e) {}

buildPalette();
loadPreset('2/4');

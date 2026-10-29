const $ = (id) => document.getElementById(id);

const TEMPO_TERMS = [
  [0,   'Lento',      'Rất chậm'],
  [66,  'Adagio',     'Chậm'],
  [76,  'Andante',    'Hơi chậm'],
  [88,  'Andantino',  'Thong thả'],
  [100, 'Moderato',   'Vừa phải'],
  [112, 'Allegretto', 'Hơi nhanh'],
  [120, 'Allegro',    'Nhanh'],
  [156, 'Vivace',     'Nhanh, nhộn nhịp'],
  [168, 'Presto',     'Rất nhanh, hối hả'],
];
function tempoTerm(bpm) {
  const [, it, vi] = TEMPO_TERMS.filter(([min]) => bpm >= min).pop();
  return `${it} (${vi.toLowerCase()})`;
}

const BOOKS = [
  { grade: 6, url: 'https://hanhtrangso.nxbgd.vn/ebook/read/am-nhac-6-10772', pageSuffix: (p) => `?page=${p}` },
  { grade: 7, url: 'https://taphuan.nxbgd.vn/tap-huan/doc-sach/sgk-am-nhac-7.4700049640', pageSuffix: (p) => `#page=${p}` },
  { grade: 8, url: 'https://taphuan.nxbgd.vn/tap-huan/doc-sach/sgk-am-nhac-8.4700139323', pageSuffix: (p) => `#page=${p}` },
  { grade: 9, url: 'https://taphuan.nxbgd.vn/tap-huan/doc-sach/sgk-am-nhac-9.4700486486', pageSuffix: (p) => `#page=${p}` },
];
const bookPageUrl = (book, page) => book.url + book.pageSuffix(page);

const READINGS = [
  { grade: 7, no: 1, name: '', origin: 'Nhạc Đức', tempo: 'Vừa phải – Nhịp nhàng', bpm: 92, meter: '4/4', key: 'Đô trưởng',
    topic: 'Chủ đề 1: Ngày khai trường', page: 9,
    notes: 'C4:1 E4:1 | G4:2 G4:2 E4:2 C4:2 | D4:1 C4:1 D4:1 E4:1 D4:2 C4:1 E4:1 | G4:2 G4:2 E4:2 C4:2 | D4:4 R:2 G4:1 B4:1 | D5:2 D5:2 B4:2 G4:2 | G4:3 C5:1 C5:2 G4:1 B4:1 | D5:2 D5:2 B4:2 G4:2 | C5:4 R:2 |' },
  { grade: 7, no: 2, name: '', origin: 'Hoàng Long', tempo: 'Vừa phải', bpm: 92, meter: '2/4', key: 'Đô trưởng',
    topic: 'Chủ đề 3: Thầy cô và mái trường', page: 25,
    notes: 'C4:1 D4:1 |: E4:1 E4:1 E4:1 D4:1 | C4:4~ | C4:2 E4:1 F4:1 | G4:1 G4:1 G4:1 F4:1 | E4:4~ | E4:2 F4:1 E4:1 | D4:3 C4:1 | D4:2 E4:1 E4:1 | D4:3 G4:1 | E4:1 R:1 F4:1 E4:1 | D4:3 C4:1 | D4:2 E4:1 E4:1 | D4:3 G3:1 | [1 C4:4~ | C4:2 C4:1 D4:1 :| [2 C4:4~ | C4:2 R:2 |' },
  { grade: 7, no: 3, name: 'Inh lả ơi', origin: 'Dân ca Thái', tempo: 'Vừa phải', bpm: 88, meter: '2/4', key: 'Ngũ cung, không dấu hoá',
    topic: 'Chủ đề 4: Giai điệu quê hương', page: 34,
    notes: 'A4:2 E4:1 G4:1 | A4:4 | G4:2 G4:1 E4:1 | D4:4 | A4:2 E4:2 | D4:2 E4:2 | A4:2 A4:1 G4:1 | E4:2 G4:1 R:1 | D4:2 E4:2 | A4:2 E4:2 | G4:2 G4:1 E4:1 | D4:4 | A4:2 E4:1 G4:1 | A4:4 | G4:2 G4:1 E4:1 | G4:4 |' },
  { grade: 7, no: 4, name: 'Mùa xuân trong rừng', origin: 'Nhạc Ba Lan', tempo: 'Vừa phải – Nhịp nhàng', bpm: 104, meter: '3/4', key: 'Đô trưởng',
    topic: 'Chủ đề 5: Nhịp điệu mùa xuân', page: 43,
    notes: 'C4:2 C4:2 C4:2 | D4:4 A3:2 | C4:6 | G3:6 | E4:2 E4:2 E4:2 | F4:4 A4:2 | D4:6 |: F4:2 A4:2 A4:1 R:1 | E4:2 G4:2 G4:1 R:1 | D4:2 F4:2 F4:1 R:1 | C4:2 E4:2 E4:1 R:1 | D4:2 E4:2 D4:2 | [1 C4:4 D4:2 | E4:6 | G4:6 :| [2 A3:4 G3:2 | C4:6 |' },
  { grade: 7, no: 5, name: '', origin: 'Dân ca Ukraina', tempo: 'Moderato (Vừa phải)', bpm: 96, meter: '2/4', key: 'Đô trưởng',
    topic: 'Chủ đề 7: Cuộc sống tươi đẹp', page: 58,
    notes: 'C4:2 E4:1 F4:1 | G4:3 E4:1 | A4:1 A4:1 A4:1 C5:1 | G4:4 | C4:1 C4:1 E4:1 F4:1 | G4:3 E4:1 | A4:1 A4:1 A4:1 C5:1 | G4:4 | G4:1 G4:1 F4:1 F4:1 | E4:1 E4:1 D4:2 | G4:1 G4:1 F4:1 F4:1 | E4:1 E4:1 D4:2 | E4:1 E4:1 F4:1 D4:1 | C4:4 |' },
  { grade: 6, no: 1, name: '', origin: 'Mai Lan', tempo: 'Vừa phải – Nhịp nhàng', bpm: 88, meter: '2/4', key: 'Đô trưởng',
    topic: 'Chủ đề 1: Tuổi học trò', page: 11,
    notes: 'C4:1 D4:1 E4:1 F4:1 | G4:3 G4:1 | A4:1 C5:1 B4:1 A4:1 | G4:2 R:2 | A4:1 C5:1 B4:1 A4:1 | G4:3 E4:1 | D4:1 F4:1 E4:1 D4:1 | C4:4 |' },
  { grade: 6, no: 2, name: 'Suliko', origin: 'Dân ca Gruzia', tempo: 'Vừa phải', bpm: 80, meter: '4/4', key: 'Đô trưởng',
    topic: 'Chủ đề 3: Nhớ ơn thầy cô', page: 25,
    notes: 'G4:1 G4:1 E4:1 F4:1 G4:2 A4:1 F4:1 | G4:8 | B4:1 B4:1 B4:1 B4:1 B4:2 D5:1 B4:1 | C5:8 |: C5:1 C5:1 B4:1 C5:1 D5:1 C5:1 B4:1 A4:1 | B4:2 A4:2 G4:4 | A4:1 A4:1 G4:1 G4:1 F4:2 G4:1 F4:1 | E4:8 :|' },
  { grade: 6, no: 3, name: '', origin: 'Hoàng Long', tempo: 'Vừa phải – Nhịp nhàng', bpm: 88, meter: '2/4', key: 'Đô trưởng',
    topic: 'Chủ đề 5: Giai điệu quê hương', page: 41,
    notes: 'C4:2 G4:2 | E4:3 D4:1 | C4:1 D4:1 E4:1 G4:1 | A4:4 | G4:2 C5:2 | A4:3 G4:1 | E4:1 G4:1 E4:1 D4:1 | G4:4 | C4:2 G4:2 | E4:3 D4:1 | C4:1 D4:1 E4:1 G4:1 | A4:4 | G4:2 C5:2 | A4:3 G4:1 | E4:1 G4:1 E4:1 D4:1 | C4:4 |' },
  { grade: 6, no: 4, name: 'Pê-chi-a', origin: 'Kabalevsky', tempo: 'Vừa phải – Nhịp nhàng', bpm: 92, meter: '4/4', key: 'Đô trưởng',
    topic: 'Chủ đề 6: Mẹ trong trái tim em', page: 50,
    notes: 'C5:1 C5:1 C5:1 B4:1 C5:2 A4:2 | G4:1 G4:1 G4:1 A4:1 G4:2 E4:2 | F4:1 F4:1 F4:1 E4:1 D4:2 G4:2 | E4:1 E4:1 E4:1 D4:1 C4:2 C4:2 | C5:2 A4:2 C5:2 G4:2 | A4:1 G4:1 F4:1 E4:1 G4:4 | G4:2 G4:2 D4:2 G4:2 | C4:4 C4:4 |' },
  { grade: 6, no: 5, name: '', origin: 'Mai Lan - Thanh Vân', tempo: 'Vừa phải – Nhịp nhàng', bpm: 96, meter: '3/4', key: 'Đô trưởng',
    topic: 'Chủ đề 7: Âm nhạc nước ngoài', page: 57,
    notes: 'G4:2 E4:2 A4:2 | G4:4 C5:2 | B4:2 A4:1 B4:1 C5:1 A4:1 | G4:4 R:2 | F4:2 D4:2 F4:2 | E4:4 G4:2 | F#4:2 G4:2 D4:2 | C4:6 |' },
  { grade: 8, no: 1, name: '', origin: 'Nhạc: Dân ca Nga', tempo: 'Vừa phải', bpm: 88, meter: '2/4', key: 'Đô trưởng',
    topic: 'Chủ đề 1: Chào năm học mới', page: 9,
    notes: 'C4:2 G4:2 | A4:1 G4:1 F4:1 E4:1 | G4:2 C4:1 E4:1 | G4:2 G4:1 F4:1 | A4:1 G4:1 F4:1 A4:1 | G4:2 C4:2 | C4:3 C4:1 | F4:1 E4:1 D4:1 F4:1 | E4:2 C4:2 | C4:3 C4:1 | F4:1 E4:1 D4:1 F4:1 | E4:2 C4:2 |' },
  { grade: 8, no: 2, name: '', origin: 'Nhạc: Hoàng Long', tempo: 'Vừa phải – Nhịp nhàng', bpm: 144, meter: '3/8', key: 'Đô trưởng',
    topic: 'Chủ đề 3: Hoà ca', page: 25,
    notes: 'G4:2 G4:1 | A4:2 C5:1 | A4:1.5 G4:0.5 E4:1 | G4:3 | E4:1 C4:1 E4:1 | D4:2 E4:1 | G4:1.5 A4:0.5 G4:1 | E4:3 | G4:2 G4:1 | A4:2 C5:1 | A4:1.5 G4:0.5 E4:1 | D4:3 | E4:1 C4:1 E4:1 | G4:2 A4:1 | B4:1.5 A4:0.5 G4:1 | C5:3 |' },
  { grade: 8, no: 3, name: '', origin: 'Nhạc: Dân ca Gruzia', tempo: 'Nhịp nhàng – Uyển chuyển', bpm: 53, meter: '6/8', key: 'Đô trưởng',
    topic: 'Chủ đề 5: Chào xuân', page: 41,
    notes: 'G4:2 G4:1 | C5:2 G4:1 C5:1 B4:1 A4:1 | B4:3 D5:2 C5:1 | B4:2 A4:1 C5:1 B4:1 A4:1 | G4:3 G4:2 A4:1 | A4:2 G4:1 G4:1 F4:1 E4:1 | F4:3 F4:2 A4:1 | G4:2 F4:1 F4:1 E4:1 D4:1 | E4:3 G4:2 A4:1 | A4:2 G4:1 G4:1 F4:1 E4:1 | F4:3 F4:2 A4:1 | G4:2 F4:1 F4:1 E4:1 D4:1 | C4:3 |' },
  { grade: 8, no: 4, name: 'Trở về Surriento', origin: 'Nhạc: Ernesto de Curtis', tempo: 'Andantino', bpm: 84, meter: '3/4', key: 'La thứ',
    topic: 'Chủ đề 6: Âm nhạc nước ngoài', page: 49,
    notes: 'A3:1 B3:1 C4:1 D4:1 E4:1 C4:1 | E4:2 E4:2 R:2 | D4:1 E4:1 F4:1 D4:1 F4:1 D4:1 | A4:2 A4:2 R:2 | A4:1 B4:1 C5:1 B4:1 A4:1 B4:1 | E4:2 E4:2 R:2 | D4:1 E4:1 D4:1 C4:1 B3:1 C4:1 | A3:4 R:2 |' },
  { grade: 8, no: 5, name: 'Bản làng em', origin: 'Nhạc và lời: Hoàng Long', tempo: 'Vui – Nhịp nhàng', bpm: 100, meter: '2/4', key: 'La thứ',
    topic: 'Chủ đề 7: Giai điệu quê hương', page: 57,
    notes: '|: A3:2 C4:1 D4:1 | E4:3 G4:1 | A4:1 A4:0.5 G4:0.5 E4:1 D4:1 | E4:4 | E4:1 G4:1 C4:1 E4:1 | D4:1 D4:2 E4:1 | [1 G4:1 A4:0.5 G4:0.5 E4:1 D4:1 | C4:4 :| [2 G4:1 A4:0.5 G4:0.5 E4:1 G4:1 | A4:2 A4:2 | A4:4 |' },
  { grade: 9, no: 1, name: '', origin: 'Nhạc: Nhóm tác giả', tempo: 'Vừa phải', bpm: 92, meter: '2/4', key: 'Đô trưởng',
    topic: 'Chủ đề 1: Nối vòng tay lớn', page: 8,
    notes: 'C4:2 C4:2 | G4:2 G4:1 A4:1 | E4:2 F4:2 | G4:3 A4:1 | C4:2 C4:2 | C4:2 A4:1 G4:1 | F4:2 G4:2 | A4:4 | G4:2 C5:2 | G4:2 G4:1 A4:1 | A4:2 A4:2 | E4:3 D4:1 | A4:2 F4:2 | G4:3 B4:1 | A4:1 A4:1 G4:1 A4:1 | C5:4 |' },
  { grade: 9, no: 2, name: '', origin: 'Nhạc: Hoàng Long', tempo: 'Vui – Nhịp nhàng', bpm: 112, meter: '4/4', key: 'La thứ',
    topic: 'Chủ đề 3: Kỉ niệm dưới mái trường', page: 27,
    notes: 'A3:2 E4:2 A3:2 E4:2 | D4:1 E4:1 D4:1 E4:1 C4:1 A3:1 E4:1 R:1 | E4:2 A4:2 E4:2 A4:2 | A4:1 B4:1 G4:1 G4:0.5 A4:0.5 G4:1 E4:1 A4:1 R:1 | A3:2 E4:2 A3:2 E4:2 | D4:1 E4:1 D4:1 C4:1 D4:1 E4:1 G4:1 R:1 | E4:2 B4:2 A4:2 G4:2 | G4:1 A4:1 E4:1 G4:1 A4:1.5 G4:0.5 A4:1 R:1 |' },
  { grade: 9, no: 3, name: '', origin: 'Nhạc: Z. Kodály (Hungary)', tempo: 'Hành khúc', bpm: 108, meter: '2/4', key: 'Đô trưởng',
    topic: 'Chủ đề 5: Trái đất xanh', page: 41, remark: 'Canon 2 bè, ứng dụng phát bè trên',
    notes: 'C4:2 D4:2 | E4:2 R:2 | G4:1 G4:1 E4:1 E4:1 | D4:2 R:2 | C4:2 D4:2 | E4:2 R:2 | C4:1 C4:1 A3:1 A3:1 | C4:2 R:2 |: E4:1 E4:1 E4:1 E4:1 | A4:1 G4:1 D4:2 | E4:1 G4:1 E4:1 D4:1 | C4:1 A3:1 G3:2 | C4:2 D4:2 | E4:2 R:2 | C4:1 C4:1 A3:1 A3:1 | [1 C4:2 R:2 :| [2 C4:2 R:2 |' },
  { grade: 9, no: 4, name: 'Bài hát cổ nước Pháp (trích)', origin: 'Nhạc: P. I. Tchaikovsky', tempo: 'Hơi chậm', bpm: 66, meter: '2/4', key: 'La thứ',
    topic: 'Chủ đề 7: Âm nhạc nước ngoài', page: 57,
    notes: 'E4:1 | A4:1 B4:1 C5:1 D5:1 | E5:3 E5:1 | D5:1 E5:1 F5:1 D5:1 | E5:3 E5:1 | D5:1 E5:1 F5:1 D5:1 | E5:1 F5:0.5 E5:0.5 D5:1 C5:1 | B4:3 A4:1 | A4:3 E4:1 | A4:1 B4:1 C5:1 D5:1 | E5:3 E5:1 | D5:1 E5:1 F5:1 D5:1 | E5:3 E5:1 | D5:1 E5:1 F5:1 D5:1 | E5:1 F5:0.5 E5:0.5 D5:1 C5:1 | B4:3 A4:1 | A4:4 |' },
];

let ctx = null;
let master = null;
let fx = null;
let verbSend = null;
let noiseBuf = null;
const curves = new Map();

function impulse(sec, decay) {
  const len = Math.floor(ctx.sampleRate * sec);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function initAudio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -8;
    comp.knee.value = 4;
    comp.ratio.value = 6;
    comp.attack.value = 0.002;
    comp.release.value = 0.12;
    const makeup = ctx.createGain();
    makeup.gain.value = 0.75;
    master = ctx.createGain();
    master.connect(comp).connect(makeup).connect(drive(2, ctx.destination));
    const room = ctx.createConvolver();
    room.buffer = impulse(1.8, 3.2);
    verbSend = ctx.createGain();
    verbSend.connect(room).connect(master);
    fx = ctx.createGain();
    fx.connect(master);
    fx.connect(verbSend);

    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    applyMix();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function openBus() {
  const b = ctx.createGain();
  b.connect(fx);
  return b;
}
function closeBus(b) {
  if (!b) return;
  b.gain.setTargetAtTime(0, ctx.currentTime, 0.01);
  setTimeout(() => b.disconnect(), 200);
}

function noise(t, dur, out) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  src.connect(out);
  src.start(t, Math.random() * 0.5);
  src.stop(t + dur);
}

function envelope(g, t, peak, decay) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
}

function vca(t, peak, decay, out, attack = 0.002) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  g.connect(out);
  return g;
}

function osc(type, freq, t, dur, out, to = 0, glide = 0) {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + glide);
  o.connect(out);
  o.start(t);
  o.stop(t + dur);
}

function filtered(type, freq, q, out) {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = Math.min(freq, ctx.sampleRate * 0.45);
  f.Q.value = q;
  f.connect(out);
  return f;
}

function drive(amount, out) {
  if (!curves.has(amount)) {
    const c = new Float32Array(1024);
    for (let i = 0; i < c.length; i++) c[i] = Math.tanh((i / 511.5 - 1) * amount) / Math.tanh(amount);
    curves.set(amount, c);
  }
  const s = ctx.createWaveShaper();
  s.curve = curves.get(amount);
  s.connect(out);
  return s;
}

function kick808(t, v, out, p) {
  osc('sine', 165 * p, t, 0.9, vca(t, v, 0.75, drive(2.2, out)), 46 * p, 0.09);
  noise(t, 0.012, filtered('highpass', 2500, 0.7, vca(t, v * 0.35, 0.012, out)));
}

function hat808(t, v, out, p) {
  const bp = filtered('bandpass', 10000 * p, 0.8, filtered('highpass', 7000 * p, 0.7, vca(t, v * 1.7, 0.075, out)));
  [2, 3, 4.16, 5.43, 6.79, 8.21].forEach((r) => osc('square', 40 * r * p, t, 0.1, bp));
}

function clap808(t, v, out, p) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  [0, 0.01, 0.021].forEach((off) => {
    g.gain.setValueAtTime(v * 2.7, t + off);
    g.gain.exponentialRampToValueAtTime(v * 0.3, t + off + 0.009);
  });
  g.gain.setValueAtTime(v * 2.2, t + 0.031);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
  g.connect(out);
  noise(t, 0.3, filtered('bandpass', 1150 * p, 1.1, g));
}

function kickAco(t, v, out, p) {
  osc('sine', 120 * p, t, 0.5, vca(t, v, 0.42, drive(1.6, out)), 50 * p, 0.06);
  osc('triangle', 180 * p, t, 0.1, vca(t, v * 0.3, 0.06, out), 80 * p, 0.05);
  noise(t, 0.012, filtered('bandpass', 3800, 1.2, vca(t, v * 0.55, 0.01, out)));
}

function hatAco(t, v, out, p) {
  noise(t, 0.08, filtered('highpass', 7000 * p, 0.8, filtered('bandpass', 10500 * p, 0.6, vca(t, v * 1, 0.055, out))));
}

function snare(t, v, out, p) {
  osc('triangle', 200 * p, t, 0.15, vca(t, v * 0.7, 0.11, out), 160 * p, 0.08);
  osc('sine', 330 * p, t, 0.1, vca(t, v * 0.3, 0.06, out));
  noise(t, 0.25, filtered('highpass', 1200, 0.7, filtered('bandpass', 3200 * p, 0.6, vca(t, v * 0.85, 0.2, out))));
}

function trongCai(t, v, out, p) {
  osc('sine', 98 * p, t, 1.1, vca(t, v, 0.95, drive(1.4, out), 0.004), 64 * p, 0.3);
  osc('sine', 157 * p, t, 0.4, vca(t, v * 0.35, 0.3, out), 105 * p, 0.25);
  noise(t, 0.05, filtered('lowpass', 900, 0.8, vca(t, v * 0.5, 0.04, out)));
}

function mo(t, v, out, p) {
  osc('sine', 760 * p, t, 0.2, vca(t, v * 0.8, 0.13, out), 700 * p, 0.12);
  osc('sine', 1830 * p, t, 0.08, vca(t, v * 0.25, 0.05, out));
  noise(t, 0.01, filtered('bandpass', 2500, 2, vca(t, v * 0.4, 0.008, out)));
}

function phach(t, v, out, p) {
  osc('triangle', 2200 * p, t, 0.05, vca(t, v * 0.75, 0.03, out));
  noise(t, 0.04, filtered('bandpass', 3400 * p, 3, vca(t, v * 1.8, 0.03, out)));
  noise(t + 0.012, 0.03, filtered('bandpass', 2900 * p, 3, vca(t + 0.012, v * 0.9, 0.02, out)));
}

function trongTay(t, v, out, p) {
  osc('sine', 190 * p, t, 0.4, vca(t, v, 0.32, drive(1.3, out)), 135 * p, 0.07);
  osc('sine', 410 * p, t, 0.1, vca(t, v * 0.2, 0.06, out));
  noise(t, 0.03, filtered('bandpass', 1500, 1, vca(t, v * 0.5, 0.025, out)));
}

function lucLac(t, v, out, p) {
  noise(t, 0.16, filtered('bandpass', 6500 * p, 1.2, vca(t, v * 1.3, 0.11, out, 0.015)));
  [5300, 7100, 8900].forEach((f, n) => osc('sine', f * p, t + n * 0.006, 0.2, vca(t + n * 0.006, v * 0.1, 0.16, out)));
}

function tamGiac(t, v, out, p) {
  [[1250, 1], [3460, 0.5], [6280, 0.3], [8900, 0.15]].forEach(([f, a]) =>
    osc('sine', f * p, t, 1.5, vca(t, v * 0.32 * a, 1.3 - a * 0.3, out)));
}

const KITS = {
  phong: { name: 'Dàn trống', lanes: { R: ['Trống cái', kickAco], B: ['Chũm chọe', hatAco], Y: ['Trống lẫy', snare] } },
  so: { name: 'Trống điện tử', lanes: { R: ['Trống cái', kick808], B: ['Chũm chọe', hat808], Y: ['Vỗ tay', clap808] } },
  dan: { name: 'Nhạc cụ dân tộc', lanes: { R: ['Trống cái', trongCai], B: ['Mõ', mo], Y: ['Thanh phách', phach] } },
  lop: { name: 'Bộ gõ học đường', lanes: { R: ['Trống nhỏ', trongTay], B: ['Tambourine', lucLac], Y: ['Triangle', tamGiac] } },
};
const KIT_ORDER = ['phong', 'so', 'dan', 'lop'];

function tone(midi, t, dur, vel, out) {
  const f = 440 * Math.pow(2, (midi - 69) / 12);
  const end = t + Math.max(dur * 0.9, 0.06);
  const o = ctx.createOscillator();
  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  const g = ctx.createGain();
  o.type = 'triangle';
  o.frequency.value = f;
  o2.type = 'sine';
  o2.frequency.value = f * 2;
  g2.gain.value = 0.12;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.34 * vel, t + 0.015);
  g.gain.setTargetAtTime(0.2 * vel, t + 0.015, 0.18);
  g.gain.setTargetAtTime(0.0001, end, 0.03);
  o.connect(g);
  o2.connect(g2).connect(g);
  g.connect(out);
  o.start(t); o2.start(t);
  o.stop(end + 0.25); o2.stop(end + 0.25);
}

function woodblock(t, vel, out) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(1100, t);
  o.frequency.exponentialRampToValueAtTime(750, t + 0.04);
  envelope(g, t, vel * 0.7, 0.08);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 0.1);
}

function tick(t, strong, out) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = strong ? 1760 : 1320;
  envelope(g, t, strong ? 0.3 : 0.18, 0.04);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 0.06);
}

const TICK_MS = 25;
const SCHEDULE_AHEAD = 0.12;

function makeTicker(fn) {
  try {
    const src = `let id=0;onmessage=e=>{clearInterval(id);if(e.data>0)id=setInterval(()=>postMessage(0),e.data)}`;
    const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    w.onmessage = fn;
    return { start: () => w.postMessage(TICK_MS), stop: () => w.postMessage(0) };
  } catch (e) {
    let id = 0;
    return { start: () => { clearInterval(id); id = setInterval(fn, TICK_MS); }, stop: () => clearInterval(id) };
  }
}

const ICON_PLAY = '<path d="M7 4.5v15l13-7.5z" fill="currentColor"/>';
const ICON_STOP = '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>';

let view = 'nhip';
let toastTimer = 0;

let toastOutTimer = 0;

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function transitionView(update) {
  if (!document.startViewTransition || reduceMotion() || document.hidden) { update(); return; }
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    update();
  };
  const vt = document.startViewTransition(run);
  const ignore = () => {};
  if (vt.ready) vt.ready.catch(ignore);
  if (vt.finished) vt.finished.catch(ignore);
  if (vt.updateCallbackDone) vt.updateCallbackDone.catch(ignore);
  setTimeout(() => {
    if (done) return;
    if (vt.skipTransition) vt.skipTransition();
    run();
  }, 250);
}

function showToast(msg, actLabel = '', act = null) {
  const toast = $('toast');
  $('toastMsg').textContent = msg;
  $('toastAct').textContent = actLabel;
  $('toastAct').onclick = act ? () => { hideToast(); act(); } : null;
  clearTimeout(toastOutTimer);
  toast.hidden = false;
  void toast.offsetWidth;
  toast.classList.add('is-in');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 6000);
}
function hideToast() {
  const toast = $('toast');
  if (toast.hidden) return;
  toast.classList.remove('is-in');
  clearTimeout(toastOutTimer);
  toastOutTimer = setTimeout(() => { if (!toast.classList.contains('is-in')) toast.hidden = true; }, reduceMotion() ? 0 : 200);
}

function attachThumb(box) {
  const thumb = document.createElement('span');
  thumb.className = 'seg-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  box.prepend(thumb);
  box.classList.add('has-thumb');
  const sync = () => moveThumb(box, thumb);
  thumbSyncs.push(sync);
  new MutationObserver(sync).observe(box, { subtree: true, attributes: true, attributeFilter: ['aria-pressed', 'aria-selected', 'aria-checked'] });
  if ('ResizeObserver' in window) new ResizeObserver(sync).observe(box);
  sync();
}

const thumbSyncs = [];
function refreshThumbs() {
  thumbSyncs.forEach((sync) => sync());
}
window.addEventListener('resize', refreshThumbs);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshThumbs);

function moveThumb(box, thumb) {
  const sel = box.querySelector(':scope > [aria-pressed="true"], :scope > [aria-selected="true"], :scope > [aria-checked="true"]');
  if (!sel || !box.offsetWidth || !sel.offsetWidth) { thumb.style.opacity = '0'; return; }
  const jump = thumb.style.opacity !== '1';
  if (jump) thumb.classList.remove('ready');
  thumb.style.width = `${sel.offsetWidth}px`;
  thumb.style.height = `${sel.offsetHeight}px`;
  thumb.style.transform = `translate(${sel.offsetLeft}px, ${sel.offsetTop}px)`;
  thumb.style.opacity = '1';
  if (jump) setTimeout(() => thumb.classList.add('ready'), 60);
}

function setupThumbs() {
  document.querySelectorAll('.seg, .nav').forEach(attachThumb);
}

function announce(msg) {
  const a = $('announcer');
  a.textContent = '';
  setTimeout(() => (a.textContent = msg), 40);
}

function ensureAudio() {
  try {
    initAudio();
  } catch (e) {
    showToast('Không phát được âm thanh trên trình duyệt này.');
    return false;
  }
  setTimeout(() => {
    if (ctx.state !== 'running') showToast('Trình duyệt đang chặn âm thanh.', 'Bật âm thanh', () => ctx.resume());
  }, 400);
  return true;
}

function replay(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

const BARS = 4;

const METERS = {
  '2/4': { unit: 'nốt đen', accent: [], presets: [
    { name: 'Mạnh – nhẹ', bpm: 96, R: 'x. x. x. x.', B: '.x .x .x .x' },
    { name: 'Hành khúc', bpm: 112, R: 'x. x. x. x.', B: 'xx xx xx xx', Y: '.x .x .x .x' },
    { name: 'Hỏi – đáp', bpm: 100, Y: 'xx x. .. ..', B: '.. .. xx x.' },
  ] },
  '3/4': { unit: 'nốt đen', accent: [], presets: [
    { name: 'Mạnh – nhẹ – nhẹ', bpm: 104, R: 'x.. x.. x.. x..', B: '.xx .xx .xx .xx' },
    { name: 'Valse', bpm: 132, R: 'x.. x.. x.. x..', Y: '.xx .xx .xx .x.' },
    { name: 'Hỏi – đáp', bpm: 100, R: 'x.. x.. ... ...', B: '... ... xxx x..' },
  ] },
  '4/4': { unit: 'nốt đen', accent: [2], presets: [
    { name: 'Mạnh – nhẹ', bpm: 96, R: 'x... x... x... x...', B: '.x.x .x.x .x.x .x.x', Y: '..x. ..x. ..x. ..x.' },
    { name: 'Rock', bpm: 110, R: 'x.x. x.x. x.x. x.xx', B: 'xxxx xxxx xxxx xxxx', Y: '.x.x .x.x .x.x .x.x' },
    { name: 'Trống đội', bpm: 120, R: 'x... xx.. x... xx..', B: '.x.x .... .x.x ....', Y: '..x. ..x. ..x. ..xx' },
    { name: 'Hỏi – đáp', bpm: 108, Y: 'xxx. .... xxx. ....', B: '.... xxx. .... ....', R: '.... .... .... xxx.' },
  ] },
  '2/2': { unit: 'nốt trắng', accent: [], presets: [
    { name: 'Mạnh – nhẹ', bpm: 72, R: 'x. x. x. x.', Y: '.x .x .x .x' },
    { name: 'Hành khúc', bpm: 84, R: 'x. x. x. x.', B: 'xx xx xx xx', Y: '.x .x .x .x' },
  ] },
  '3/8': { unit: 'nốt móc đơn', accent: [], presets: [
    { name: 'Mạnh – nhẹ – nhẹ', bpm: 144, R: 'x.. x.. x.. x..', B: '.xx .xx .xx .xx' },
    { name: 'Đung đưa', bpm: 132, R: 'x.. x.. x.. x..', B: '.x. .x. .x. .x.', Y: '..x ..x ..x ...' },
  ] },
  '6/8': { unit: 'nốt móc đơn', accent: [3], group: 3, presets: [
    { name: 'Mạnh – nhẹ', bpm: 160, R: 'x..... x..... x..... x.....', Y: '...x.. ...x.. ...x.. ...x..', B: '.xx.xx .xx.xx .xx.xx .xx.xx' },
    { name: 'Chèo thuyền', bpm: 144, R: 'x..x.. x..x.. x..x.. x..x..', B: '.x..x. .x..x. .x..x. .x..x.', Y: '..x..x ..x..x ..x..x ......' },
  ] },
};
const METER_ORDER = ['2/4', '3/4', '4/4', '2/2', '3/8', '6/8'];
let METER = '4/4';
let BEATS_PER_BAR = 4;
let STEPS = 16;
let PRESETS = METERS[METER].presets;

const LANES = ['R', 'B', 'Y'];
const INSTRUMENTS = Object.fromEntries(LANES.map((lane) => [lane, { name: KITS.phong.lanes[lane][0] }]));

const mix = { kit: 'phong', vol: { R: 100, B: 100, Y: 100 }, tune: { R: 0, B: 0, Y: 0 }, master: 100, verb: 25 };
try {
  const saved = JSON.parse(localStorage.getItem('beatpaper-mix') || 'null');
  if (saved) {
    if (KITS[saved.kit]) mix.kit = saved.kit;
    ['vol', 'tune'].forEach((k) => LANES.forEach((lane) => {
      if (Number.isFinite(saved[k]?.[lane])) mix[k][lane] = saved[k][lane];
    }));
    ['master', 'verb'].forEach((k) => { if (Number.isFinite(saved[k])) mix[k] = saved[k]; });
  }
} catch (e) {}
LANES.forEach((lane) => (INSTRUMENTS[lane].name = KITS[mix.kit].lanes[lane][0]));

const ICONS = {
  R: '<circle cx="12" cy="12" r="9.5" fill="currentColor"/>',
  B: '<rect x="5" y="5" width="14" height="14" rx="1.5" transform="rotate(45 12 12)" fill="currentColor"/>',
  Y: '<path d="M12 2.8 21.5 20H2.5z" fill="currentColor" style="stroke:var(--yellow-edge)" stroke-width="1.6" stroke-linejoin="round"/>',
};

const emptyTracks = () => Object.fromEntries(LANES.map((lane) => [lane, Array(STEPS).fill(false)]));
const copyTracks = (tracks) => Object.fromEntries(LANES.map((lane) => [lane, tracks[lane].slice()]));
const hasAnyNote = () => LANES.some((lane) => state.tracks[lane].some(Boolean));

const state = {
  tracks: emptyTracks(),
  muted: { R: false, B: false, Y: false },
  bpm: 100,
  playing: false,
  preset: -1,
};

const scoreEl = $('score');
let cellEls = { R: [], B: [], Y: [] };
let gridBpr = 0;
let lastStep = -1;
let focus = { lane: 'R', i: 0 };

const cellPlace = (i) => `ô nhịp ${Math.floor(i / BEATS_PER_BAR) + 1}, phách ${(i % BEATS_PER_BAR) + 1}`;

function laneHead(lane, interactive) {
  const name = INSTRUMENTS[lane].name;
  const inner = `<svg class="lane-shape" viewBox="0 0 24 24" aria-hidden="true">${ICONS[lane]}</svg>
    <span class="lane-name">${name}</span>`;
  if (!interactive) return `<div class="lane-head" data-lane="${lane}" aria-hidden="true">${inner}</div>`;
  return `<div class="lane-head" data-lane="${lane}">
    <button class="lane-btn" data-lane="${lane}" aria-pressed="${state.muted[lane]}" title="Tắt/bật ${name} (phím ${LANES.indexOf(lane) + 1})">
      ${inner}
      <svg class="ico lane-on" aria-hidden="true"><use href="#i-sound"/></svg>
      <svg class="ico lane-off" aria-hidden="true"><use href="#i-mute"/></svg>
      <span class="sr-only">Tắt tiếng ${name}</span>
    </button>
  </div>`;
}

function buildGrid(bpr) {
  gridBpr = bpr;
  scoreEl.innerHTML = '';
  cellEls = { R: [], B: [], Y: [] };
  const group = METERS[METER].group || BEATS_PER_BAR;
  const accent = METERS[METER].accent;
  const [mn, md] = METER.split('/');
  const systems = Math.ceil(BARS / bpr);
  const col = (bar) => String((bar % bpr) + 3);
  const html = [];
  for (let s = 0; s < systems; s++) {
    const bars = [];
    for (let bar = s * bpr; bar < Math.min(BARS, (s + 1) * bpr); bar++) bars.push(bar);
    LANES.forEach((lane, li) => {
      html.push(laneHead(lane, s === 0).replace('class="lane-head"', 'class="lane-head" style="grid-column:1"'));
      if (li === 0) {
        html.push(`<div class="timesig" aria-hidden="true" style="grid-column:2;grid-row:span ${LANES.length}">${s === 0 ? `<span>${mn}</span><span>${md}</span>` : ''}</div>`);
      }
      bars.forEach((bar) => {
        let cells = '';
        for (let k = 0; k < BEATS_PER_BAR; k++) {
          if (k % group === 0) cells += `${k ? '</div>' : ''}<div class="grp" style="--n:${group}">`;
          const i = bar * BEATS_PER_BAR + k;
          cells += `<button class="cell" data-lane="${lane}" data-i="${i}" tabindex="-1"></button>`;
        }
        cells += '</div>';
        const cls = 'lane-bar' + (bar === BARS - 1 ? ' final' : '') + (li === LANES.length - 1 ? ' last-lane' : '');
        html.push(`<div class="${cls}" style="grid-column:${col(bar)}">${cells}</div>`);
      });
    });
    const gap = s < systems - 1 ? ' sys-gap' : '';
    html.push(`<div class="counts-head${gap}" style="grid-column:1" aria-hidden="true"></div>`);
    bars.forEach((bar) => {
      let counts = '';
      for (let k = 0; k < BEATS_PER_BAR; k++) {
        if (k % group === 0) counts += `${k ? '</div>' : ''}<div class="grp" style="--n:${group}">`;
        counts += `<div class="count${k === 0 ? ' strong' : accent.includes(k) ? ' mid' : ''}">${k + 1}</div>`;
      }
      counts += '</div>';
      html.push(`<div class="counts-bar${gap}${bar === BARS - 1 ? ' final' : ''}" style="grid-column:${col(bar)}" aria-hidden="true">${counts}</div>`);
    });
  }
  scoreEl.innerHTML = html.join('');
  scoreEl.querySelectorAll('.cell').forEach((b) => cellEls[b.dataset.lane][+b.dataset.i] = b);
  const f = cellEls[focus.lane][focus.i] || cellEls.R[0];
  f.tabIndex = 0;
}

function updateHint() {
  $('gridHint').classList.toggle('is-hidden', dict.on || hasAnyNote());
}

function renderCells() {
  LANES.forEach((lane) => cellEls[lane].forEach((el, i) => {
    const on = state.tracks[lane][i];
    const v = on ? '1' : '0';
    el.classList.toggle('muted', state.muted[lane]);
    el.classList.toggle('locked', laneLocked(lane));
    if (el.dataset.on === v) return;
    const first = el.dataset.on === undefined;
    el.dataset.on = v;
    el.innerHTML = on ? `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[lane]}</svg>` : '';
    el.setAttribute('aria-pressed', on ? 'true' : 'false');
    el.setAttribute('aria-label', `${INSTRUMENTS[lane].name}, ${cellPlace(i)}`);
    if (!first) replay(el, 'pop');
  }));
  scoreEl.querySelectorAll('.lane-head').forEach((h) => {
    h.classList.toggle('muted', state.muted[h.dataset.lane]);
    h.classList.toggle('locked', laneLocked(h.dataset.lane));
  });
  scoreEl.querySelectorAll('.lane-btn').forEach((b) => b.setAttribute('aria-pressed', state.muted[b.dataset.lane] ? 'true' : 'false'));
  renderMarks();
  if (!stroke) updateHint();
  if (dict.on) updateDictUI();
}

function toggleMute(lane) {
  state.muted[lane] = !state.muted[lane];
  renderCells();
  announce(`${state.muted[lane] ? 'Đã tắt' : 'Đã bật'} tiếng ${INSTRUMENTS[lane].name}`);
}

function buildPresets() {
  const box = $('presets');
  box.innerHTML = '';
  PRESETS.forEach((p, n) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = p.name;
    b.addEventListener('click', () => loadPreset(n));
    box.appendChild(b);
  });
  markPreset();
}

function markPreset() {
  [...$('presets').children].forEach((b, n) =>
    b.setAttribute('aria-pressed', n === state.preset ? 'true' : 'false'));
}

function buildMeters() {
  document.querySelectorAll('.meters').forEach((box) => {
    box.innerHTML = METER_ORDER.map((m) =>
      `<button data-meter="${m}" aria-pressed="${m === METER}">${m}</button>`).join('');
    box.addEventListener('click', (e) => {
      const b = e.target.closest('[data-meter]');
      if (b && b.dataset.meter !== METER) setMeter(b.dataset.meter);
    });
  });
}

function applyMeter(m) {
  if (state.playing) stop();
  METER = m;
  BEATS_PER_BAR = +m.split('/')[0];
  STEPS = BEATS_PER_BAR * BARS;
  PRESETS = METERS[m].presets;
  focus = { lane: focus.lane, i: 0 };
  lastStep = -1;
  gridBpr = 0;
  buildPresets();
  document.querySelectorAll('[data-meter]').forEach((b) =>
    b.setAttribute('aria-pressed', b.dataset.meter === m ? 'true' : 'false'));
  $('meterInfo').textContent = `Nhịp ${m} · ${BARS} ô nhịp · mỗi phách là một ${METERS[m].unit}`;
  $('camMsg').textContent = `Tô ${STEPS} ô trên dải giấy bằng màu đỏ, xanh hoặc vàng; ô để trắng là dấu lặng. Bật camera hoặc tải ảnh lên (có thể kéo thả ảnh vào khung).`;
  detected = [];
  camHist.length = 0;
  buildDetChips();
  if (photo) scanPhoto();
  buildStripDownload();
  setBpm(state.bpm);
  setStepStatus(0);
}

function setMeter(m) {
  if (dict.on) {
    applyMeter(m);
    newChallenge();
    announce(`Nhịp ${m}, đã tạo bài mới`);
    return;
  }
  pushUndo();
  applyMeter(m);
  state.tracks = emptyTracks();
  state.preset = -1;
  layoutGrid();
  renderCells();
  markPreset();
  showToast(`Đã đổi sang nhịp ${m}`, 'Hoàn tác', undo);
  announce(`Nhịp ${m}`);
}

const SIG_W = 32;
const MIN_CELL = 44;
function layoutGrid() {
  const narrow = matchMedia('(max-width: 760px)').matches;
  const headW = narrow ? 36 : 172;
  scoreEl.style.setProperty('--head-w', `${headW}px`);
  const w = $('gridWrap').clientWidth;
  let bpr = gridBpr || 4;
  let height = 48;
  if (w) {
    const present = document.body.classList.contains('present');
    const groups = BEATS_PER_BAR / (METERS[METER].group || BEATS_PER_BAR);
    const barChrome = 18 + 6 * (BEATS_PER_BAR - groups) + 12 * (groups - 1);
    const cellFor = (n) => (w - headW - SIG_W - n * barChrome) / (n * BEATS_PER_BAR);
    bpr = [4, 2].find((n) => cellFor(n) >= MIN_CELL) || 1;
    const maxH = present ? Math.min(innerHeight * 0.11, 110) : 56;
    height = Math.round(Math.max(MIN_CELL, Math.min(maxH, cellFor(bpr))));
  }
  scoreEl.style.setProperty('--bpr', bpr);
  scoreEl.style.setProperty('--cell-h', `${height}px`);
  if (bpr !== gridBpr || !scoreEl.childElementCount) {
    buildGrid(bpr);
    renderCells();
    if (state.playing && lastStep >= 0) { const s = lastStep; lastStep = -1; setActive(s); }
  }
}
if ('ResizeObserver' in window) new ResizeObserver(() => layoutGrid()).observe($('gridWrap'));

const undoStack = [];
const snapshot = () => ({ tracks: copyTracks(state.tracks), bpm: state.bpm, preset: state.preset, meter: METER });

function pushUndo(snap = snapshot()) {
  undoStack.push(snap);
  if (undoStack.length > 20) undoStack.shift();
  $('undoBtn').disabled = false;
}

function undo() {
  const s = undoStack.pop();
  if (!s) return;
  if (s.meter !== METER) applyMeter(s.meter);
  state.tracks = copyTracks(s.tracks);
  state.preset = s.preset;
  dict.checked = false;
  setBpm(s.bpm);
  layoutGrid();
  renderCells();
  markPreset();
  $('undoBtn').disabled = !undoStack.length;
  hideToast();
  announce('Đã hoàn tác');
}

const parseLane = (pattern) => {
  const marks = (pattern || '').replace(/\s/g, '');
  return Array.from({ length: STEPS }, (_, i) => marks[i] === 'x');
};

function loadPreset(n) {
  const p = PRESETS[n];
  pushUndo();
  state.tracks = Object.fromEntries(LANES.map((lane) => [lane, parseLane(p[lane])]));
  state.preset = n;
  setBpm(p.bpm);
  renderCells();
  markPreset();
  showToast(`Đã chọn tiết tấu mẫu “${p.name}”`, 'Hoàn tác', undo);
}

function clearAll() {
  if (!hasAnyNote()) return;
  pushUndo();
  state.tracks = emptyTracks();
  state.preset = -1;
  dict.checked = false;
  renderCells();
  markPreset();
  showToast(dict.on ? 'Đã xoá bài ghi' : 'Đã xoá toàn bộ lưới', 'Hoàn tác', undo);
}

let stroke = null;
let strokeSnap = null;

function setCell(lane, i, value) {
  if (laneLocked(lane) || state.tracks[lane][i] === value) return;
  if (strokeSnap) { pushUndo(strokeSnap); strokeSnap = null; }
  state.tracks[lane][i] = value;
  state.preset = -1;
  dict.checked = false;
  renderCells();
  markPreset();
  if (value && !state.playing && !state.muted[lane]) audition(lane);
}

function beginStroke(lane, i) {
  if (laneLocked(lane)) return;
  strokeSnap = snapshot();
  stroke = { lane, value: !state.tracks[lane][i] };
  setCell(lane, i, stroke.value);
  setFocusCell(lane, i, false);
}

function endStroke() {
  if (!stroke) return;
  stroke = null;
  strokeSnap = null;
  updateHint();
}

scoreEl.addEventListener('pointerdown', (e) => {
  const c = e.target.closest('.cell');
  if (!c || e.button > 0) return;
  e.preventDefault();
  beginStroke(c.dataset.lane, +c.dataset.i);
});
window.addEventListener('pointermove', (e) => {
  if (!stroke) return;
  const c = document.elementFromPoint(e.clientX, e.clientY)?.closest?.('.cell');
  if (c && c.dataset.lane === stroke.lane) setCell(stroke.lane, +c.dataset.i, stroke.value);
});
['pointerup', 'pointercancel'].forEach((t) => window.addEventListener(t, endStroke));
scoreEl.addEventListener('click', (e) => {
  const mute = e.target.closest('.lane-btn');
  if (mute) { toggleMute(mute.dataset.lane); return; }
  const c = e.target.closest('.cell');
  if (c && e.detail === 0) { beginStroke(c.dataset.lane, +c.dataset.i); endStroke(); }
});

function setFocusCell(lane, i, move = true) {
  const prev = cellEls[focus.lane][focus.i];
  if (prev) prev.tabIndex = -1;
  focus = { lane, i };
  const el = cellEls[lane][i];
  el.tabIndex = 0;
  if (move) el.focus();
}
scoreEl.addEventListener('keydown', (e) => {
  const c = e.target.closest('.cell');
  if (!c) return;
  const i = +c.dataset.i;
  const li = LANES.indexOf(c.dataset.lane);
  const moves = {
    ArrowRight: [li, i + 1], ArrowLeft: [li, i - 1],
    ArrowDown: [li + 1, i], ArrowUp: [li - 1, i],
    Home: [li, 0], End: [li, STEPS - 1],
  };
  if (!(e.key in moves)) return;
  e.preventDefault();
  const [nl, ni] = moves[e.key];
  setFocusCell(LANES[Math.max(0, Math.min(LANES.length - 1, nl))], Math.max(0, Math.min(STEPS - 1, ni)));
});

function playVoice(v, t, vel, out) {
  const level = vel * mix.vol[v] / 100;
  if (level < 0.002) return;
  KITS[mix.kit].lanes[v][1](t, level, out, Math.pow(2, mix.tune[v] / 12));
}

function audition(v) {
  if (!ensureAudio()) return;
  playVoice(v, ctx.currentTime + 0.01, 0.9, fx);
}

let nextStep = 0;
let nextTime = 0;
let queue = [];
let ticker = null;
let bus = null;
let rafId = 0;
let shownCount = -1;
const play = { target: false, pre: 0, endAt: 0, pulse: null };

function scheduler() {
  while (nextTime < ctx.currentTime + SCHEDULE_AHEAD && !play.endAt) {
    const dur = 60 / state.bpm;
    const every = METERS[METER].group || 1;
    if (play.pre > 0) {
      const k = BEATS_PER_BAR - play.pre;
      if (k % every === 0) tick(nextTime, k === 0, bus);
      queue.push({ step: -1, count: k, time: nextTime, dur });
      play.pre--;
      nextTime += dur;
      continue;
    }
    const tracks = play.target ? dict.target : state.tracks;
    const beat = nextStep % BEATS_PER_BAR;
    const vel = beat === 0 ? 1 : METERS[METER].accent.includes(beat) ? 0.82 : 0.68;
    LANES.forEach((lane) => {
      if (tracks[lane][nextStep] && !state.muted[lane]) playVoice(lane, nextTime, vel, bus);
    });
    if (play.target && beat % every === 0) tick(nextTime, beat === 0, play.pulse);
    queue.push({ step: nextStep, time: nextTime, dur });
    nextTime += dur;
    nextStep = (nextStep + 1) % STEPS;
    if (play.target && nextStep === 0) play.endAt = nextTime;
  }
}

function start(target = false) {
  if (!ensureAudio()) return;
  if (state.playing) stop(true);
  bus = openBus();
  play.target = target;
  play.pre = target ? BEATS_PER_BAR : 0;
  play.endAt = 0;
  play.pulse = null;
  if (target) {
    play.pulse = ctx.createGain();
    play.pulse.gain.value = 0.45;
    play.pulse.connect(bus);
  }
  shownCount = -1;
  nextStep = 0;
  nextTime = ctx.currentTime + 0.06;
  queue = [];
  ticker = ticker || makeTicker(scheduler);
  scheduler();
  ticker.start();
  state.playing = true;
  setPlayUI();
  announce(target ? 'Đang phát mẫu' : 'Đang phát');
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(draw);
}

function stop(quiet = false) {
  if (ticker) ticker.stop();
  closeBus(bus);
  bus = null;
  const wasTarget = play.target;
  state.playing = false;
  play.target = false;
  play.pre = 0;
  play.endAt = 0;
  queue = [];
  cancelAnimationFrame(rafId);
  setActive(-1);
  $('playhead').classList.remove('on');
  setStepStatus(0);
  setPlayUI();
  if (!quiet) announce(wasTarget ? 'Hết mẫu' : 'Đã dừng');
}

function setBpm(v) {
  state.bpm = v;
  $('bpm').value = v;
  const eighths = METER.endsWith('/8');
  $('bpmOut').innerHTML = `<b>${v}</b> <small>phách/phút</small>`;
  $('tempoTerm').textContent = eighths ? 'Phách là nốt móc đơn' : tempoTerm(v);
}

function setStepStatus(i) {
  $('stepStatus').textContent = `${play.target ? 'Mẫu · ' : ''}Ô nhịp ${Math.floor(i / BEATS_PER_BAR) + 1}/${BARS} · phách ${(i % BEATS_PER_BAR) + 1}`;
}

let playheadX = -1;
let playheadY = -1;
function placePlayhead(i) {
  const bottom = cellEls[LANES[LANES.length - 1]][i];
  if (!bottom) return;
  const wrap = $('gridWrap').getBoundingClientRect();
  const r = bottom.getBoundingClientRect();
  const ph = $('playhead');
  const x = r.left - wrap.left;
  const y = r.bottom - wrap.top + 5;
  ph.style.transition = x < playheadX || y !== playheadY ? 'none' : '';
  ph.style.width = `${r.width}px`;
  ph.style.transform = `translate(${x}px, ${y}px)`;
  playheadX = x;
  playheadY = y;
}

function setActive(i) {
  if (lastStep >= 0) LANES.forEach((lane) => cellEls[lane][lastStep]?.classList.remove('active', 'hit'));
  lastStep = i;
  if (i < 0) return;
  LANES.forEach((lane) => {
    const el = cellEls[lane][i];
    if (!el) return;
    el.classList.add('active');
    if (!play.target && state.tracks[lane][i] && !state.muted[lane]) replay(el, 'hit');
  });
  placePlayhead(i);
  $('playhead').classList.add('on');
  setStepStatus(i);
}

function draw() {
  rafId = requestAnimationFrame(draw);
  const now = ctx.currentTime;
  if (play.endAt && now >= play.endAt) { stop(); return; }
  while (queue.length > 1 && queue[1].time <= now) queue.shift();
  const cur = queue[0];
  if (!cur || cur.time > now) return;
  if (cur.step >= 0) {
    if (cur.step !== lastStep) setActive(cur.step);
  } else if (cur.count !== shownCount) {
    shownCount = cur.count;
    $('stepStatus').textContent = `Đếm vào · ${cur.count + 1}`;
  }
}

$('playBtn').addEventListener('click', () => (state.playing && !play.target ? stop() : start()));
$('bpm').addEventListener('input', (e) => setBpm(+e.target.value));
$('clearBtn').addEventListener('click', clearAll);
$('undoBtn').addEventListener('click', undo);
window.addEventListener('resize', () => { if (state.playing && lastStep >= 0) placePlayhead(lastStep); });

const LEVELS = [
  { name: 'Cơ bản', lanes: 1, bars: 1, bpm: 84 },
  { name: 'Trung bình', lanes: 2, bars: 2, bpm: 96 },
  { name: 'Nâng cao', lanes: 3, bars: 4, bpm: 104 },
];
const LANE_FEEL = {
  R: { strong: 0.9, mid: 0.5, weak: 0.15 },
  B: { strong: 0.35, mid: 0.45, weak: 0.6 },
  Y: { strong: 0.2, mid: 0.65, weak: 0.35 },
};
const MARK_TEXT = { ok: ', đúng', bad: ', ghi thừa', miss: ', còn thiếu' };

const dict = { on: false, level: 0, target: null, lanes: [], checks: 0, checked: false, revealed: false, solved: false, saved: null };
const dictScore = { solved: 0, stars: 0 };
try {
  const s = JSON.parse(localStorage.getItem('beatpaper-dict') || 'null');
  if (s) { dictScore.solved = +s.solved || 0; dictScore.stars = +s.stars || 0; }
} catch (e) {}

const laneLocked = (lane) => dict.on && !dict.lanes.includes(lane);
const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];
const listNames = (lanes) => lanes.map((lane) => INSTRUMENTS[lane].name).join(lanes.length > 2 ? ', ' : ' và ');

function beatWeight(k) {
  const m = METERS[METER];
  if (k === 0) return 'strong';
  return m.accent.includes(k) || (m.group && k % m.group === 0) ? 'mid' : 'weak';
}

function makeCycle(lane, len) {
  const feel = LANE_FEEL[lane];
  for (let tries = 0; tries < 60; tries++) {
    const cycle = Array.from({ length: len }, (_, i) => Math.random() < feel[beatWeight(i % BEATS_PER_BAR)]);
    const n = cycle.filter(Boolean).length;
    if (n >= Math.max(1, Math.round(len * 0.25)) && n < len) return cycle;
  }
  return Array.from({ length: len }, (_, i) => i % BEATS_PER_BAR === 0);
}

function makeTarget() {
  const lv = LEVELS[dict.level];
  const bars = lv.bars === 1 && BEATS_PER_BAR < 4 ? 2 : lv.bars;
  const lanes = lv.lanes >= LANES.length ? LANES.slice() : lv.lanes === 1 ? [pickOne(LANES)] : ['R', pickOne(['B', 'Y'])];
  const sig = (t) => LANES.map((lane) => t[lane].map(Number).join('')).join('|');
  let target = null;
  for (let tries = 0; tries < 20; tries++) {
    target = emptyTracks();
    lanes.forEach((lane) => {
      const cycle = makeCycle(lane, bars * BEATS_PER_BAR);
      target[lane] = Array.from({ length: STEPS }, (_, i) => cycle[i % cycle.length]);
    });
    if (!dict.target || sig(target) !== sig(dict.target)) break;
  }
  return { target, lanes };
}

function dictIntro() {
  return `Nghe tiết tấu mẫu rồi ghi lại vào lưới. Nhạc cụ: ${listNames(dict.lanes)}.`;
}

function setDictMsg(text, tone = '') {
  const el = $('dictMsg');
  el.textContent = text;
  el.dataset.tone = tone;
}

function saveDictScore() {
  try { localStorage.setItem('beatpaper-dict', JSON.stringify(dictScore)); } catch (e) {}
}

function updateDictUI() {
  const over = dict.revealed || dict.solved;
  $('checkBtn').disabled = over || !hasAnyNote();
  $('answerBtn').disabled = over;
  $('listenBtn').classList.toggle('btn--primary', !over);
  $('newBtn').classList.toggle('btn--primary', over);
  $('dictScore').innerHTML = `Hoàn thành <b>${dictScore.solved}</b> bài · <b>${dictScore.stars}</b> điểm`;
  document.querySelectorAll('[data-level]').forEach((b) =>
    b.setAttribute('aria-pressed', +b.dataset.level === dict.level ? 'true' : 'false'));
}

function renderMarks() {
  LANES.forEach((lane) => cellEls[lane].forEach((el, i) => {
    const on = state.tracks[lane][i];
    let mark = '';
    if (dict.on && dict.target) {
      const want = dict.target[lane][i];
      if (on && dict.checked) mark = want ? 'ok' : 'bad';
      else if (!on && want && dict.revealed) mark = 'miss';
    }
    if (mark) el.dataset.mark = mark;
    else delete el.dataset.mark;
    if (mark !== 'ok') el.classList.remove('win');
    if (!on) {
      const ghost = mark === 'miss';
      if (ghost !== !!el.firstChild) el.innerHTML = ghost ? `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[lane]}</svg>` : '';
    }
    el.setAttribute('aria-label', `${INSTRUMENTS[lane].name}, ${cellPlace(i)}${MARK_TEXT[mark] || ''}`);
  }));
}

function newChallenge() {
  if (state.playing) stop(true);
  const { target, lanes } = makeTarget();
  Object.assign(dict, { target, lanes, checks: 0, checked: false, revealed: false, solved: false });
  state.tracks = emptyTracks();
  state.preset = -1;
  undoStack.length = 0;
  $('undoBtn').disabled = true;
  const lv = LEVELS[dict.level];
  setBpm(Math.round(lv.bpm * (METER.endsWith('/8') ? 1.5 : METER === '2/2' ? 0.75 : 1)));
  layoutGrid();
  renderCells();
  setDictMsg(dictIntro());
  replay($('dictMsg'), 'fade-in');
}

function dictResult() {
  const r = { right: 0, wrong: 0, miss: 0 };
  LANES.forEach((lane) => state.tracks[lane].forEach((on, i) => {
    const want = dict.target[lane][i];
    if (on && want) r.right++;
    else if (on) r.wrong++;
    else if (want) r.miss++;
  }));
  return r;
}

function celebrate() {
  if (ensureAudio()) {
    const t = ctx.currentTime + 0.05;
    [72, 76, 79, 84].forEach((m, n) => tone(m, t + n * 0.08, 0.25, 0.7, fx));
  }
  LANES.forEach((lane) => cellEls[lane].forEach((el, i) => {
    if (!state.tracks[lane][i]) return;
    el.style.setProperty('--k', i);
    replay(el, 'win');
  }));
}

function checkDict() {
  if (!dict.on || dict.revealed || dict.solved) return;
  if (!hasAnyNote()) { setDictMsg('Lưới chưa có nốt nào.', 'warn'); return; }
  if (state.playing) stop(true);
  const r = dictResult();
  dict.checks++;
  dict.checked = true;
  let msg;
  if (!r.wrong && !r.miss) {
    const stars = Math.max(1, 4 - dict.checks);
    dict.solved = true;
    dictScore.solved++;
    dictScore.stars += stars;
    saveDictScore();
    msg = `Chính xác: đúng ${r.right}/${r.right} nốt, được ${stars} điểm.`;
    setDictMsg(msg, 'good');
    renderCells();
    celebrate();
  } else {
    const parts = [`Đúng ${r.right}/${r.right + r.miss} nốt`];
    if (r.wrong) parts.push(`thừa ${r.wrong}`);
    if (r.miss) parts.push(`thiếu ${r.miss}`);
    msg = `${parts.join(' · ')}.${r.wrong ? ' Ô đánh dấu ✕ là nốt ghi thừa.' : ''}`;
    setDictMsg(msg, 'warn');
    renderCells();
  }
  replay($('dictMsg'), 'fade-in');
  announce(msg);
}

function revealDict() {
  if (!dict.on || dict.revealed || dict.solved) return;
  dict.revealed = true;
  dict.checked = true;
  renderCells();
  setDictMsg('Đáp án: ô viền nét đứt là nốt còn thiếu, ô đánh dấu ✕ là nốt ghi thừa.');
  replay($('dictMsg'), 'fade-in');
  announce('Đã hiện đáp án');
}

function listenTarget() {
  if (!dict.on) return;
  if (state.playing && play.target) { stop(); return; }
  start(true);
}

function setSeqMode(on) {
  document.querySelectorAll('[data-seq]').forEach((b) =>
    b.setAttribute('aria-pressed', (b.dataset.seq === 'dict') === on ? 'true' : 'false'));
  if (on === dict.on) return;
  if (state.playing) stop(true);
  if (on) {
    dict.saved = snapshot();
    stopCamera();
  }
  dict.on = on;
  document.body.classList.toggle('dict-mode', on);
  $('presetsWrap').hidden = on;
  $('dict').hidden = !on;
  $('dictMsg').hidden = !on;
  if (on) {
    newChallenge();
  } else {
    const s = dict.saved;
    dict.target = null;
    dict.checked = false;
    dict.revealed = false;
    undoStack.length = 0;
    $('undoBtn').disabled = true;
    if (s && s.meter !== METER) applyMeter(s.meter);
    state.tracks = s ? copyTracks(s.tracks) : emptyTracks();
    state.preset = s ? s.preset : -1;
    if (s) setBpm(s.bpm);
    layoutGrid();
    renderCells();
    markPreset();
  }
  refreshThumbs();
}

document.querySelectorAll('[data-seq]').forEach((b) => b.addEventListener('click', () => {
  if ((b.dataset.seq === 'dict') !== dict.on) go(b.dataset.seq === 'dict' ? 'nhip/nghe' : 'nhip');
}));
$('levels').addEventListener('click', (e) => {
  const b = e.target.closest('[data-level]');
  if (!b || +b.dataset.level === dict.level) return;
  dict.level = +b.dataset.level;
  newChallenge();
  announce(`Mức ${LEVELS[dict.level].name}, đã tạo bài mới`);
});
$('listenBtn').addEventListener('click', listenTarget);
$('checkBtn').addEventListener('click', checkDict);
$('answerBtn').addEventListener('click', revealDict);
$('newBtn').addEventListener('click', () => { newChallenge(); announce('Đã tạo bài mới'); });

const KNOB_SPEC = {
  vol: { label: 'Âm lượng', min: 0, max: 150, step: 5, def: 100, fmt: (v) => `${v}%` },
  tune: { label: 'Cao độ', min: -12, max: 12, step: 1, def: 0, fmt: (v) => (v > 0 ? `+${v}` : `${v}`) },
  master: { label: 'Âm lượng', min: 0, max: 150, step: 5, def: 100, fmt: (v) => `${v}%` },
  verb: { label: 'Độ vang', min: 0, max: 100, step: 5, def: 25, fmt: (v) => `${v}%` },
};
const knobValue = (kind, lane) => (lane ? mix[kind][lane] : mix[kind]);
const knobName = (kind, lane) => `${KNOB_SPEC[kind].label} ${lane ? INSTRUMENTS[lane].name : 'tổng'}`;

function applyMix() {
  if (!ctx) return;
  master.gain.setTargetAtTime(mix.master / 100, ctx.currentTime, 0.02);
  verbSend.gain.setTargetAtTime(mix.verb / 200, ctx.currentTime, 0.02);
}

function saveMix() {
  try { localStorage.setItem('beatpaper-mix', JSON.stringify(mix)); } catch (e) {}
}

function knobHtml(kind, lane = '') {
  const s = KNOB_SPEC[kind];
  return `<div class="knob-wrap">
    <div class="knob" role="slider" tabindex="0" data-kind="${kind}" data-lane="${lane}" aria-label="${knobName(kind, lane)}" aria-valuemin="${s.min}" aria-valuemax="${s.max}">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle class="knob-track" cx="24" cy="24" r="21" pathLength="360" stroke-dasharray="270 360" transform="rotate(135 24 24)"/>
        <circle class="knob-arc" cx="24" cy="24" r="21" pathLength="360"/>
        <circle class="knob-cap" cx="24" cy="24" r="15"/>
        <line class="knob-ptr" x1="24" y1="12" x2="24" y2="18"/>
      </svg>
    </div>
    <span class="knob-label">${s.label}</span>
    <output class="knob-val"></output>
  </div>`;
}

function drawKnob(el) {
  const kind = el.dataset.kind;
  const s = KNOB_SPEC[kind];
  const v = knobValue(kind, el.dataset.lane);
  const f = (v - s.min) / (s.max - s.min);
  const bipolar = s.min < 0;
  const from = bipolar ? Math.min(f, 0.5) : 0;
  const len = bipolar ? Math.abs(f - 0.5) : f;
  const arc = el.querySelector('.knob-arc');
  arc.setAttribute('stroke-dasharray', `${(len * 270).toFixed(1)} 360`);
  arc.setAttribute('transform', `rotate(${135 + from * 270} 24 24)`);
  el.querySelector('.knob-ptr').setAttribute('transform', `rotate(${-135 + f * 270} 24 24)`);
  el.setAttribute('aria-valuenow', v);
  el.setAttribute('aria-valuetext', s.fmt(v));
  el.parentElement.querySelector('.knob-val').textContent = s.fmt(v);
}

let knobSoundAt = 0;
function setKnob(el, raw) {
  const kind = el.dataset.kind;
  const lane = el.dataset.lane;
  const s = KNOB_SPEC[kind];
  const v = Math.max(s.min, Math.min(s.max, Math.round(raw / s.step) * s.step)) || 0;
  if (v === knobValue(kind, lane)) return;
  if (lane) mix[kind][lane] = v;
  else mix[kind] = v;
  drawKnob(el);
  applyMix();
  saveMix();
  if (lane && !state.playing && performance.now() - knobSoundAt > 140) {
    knobSoundAt = performance.now();
    audition(lane);
  }
}

function buildKits() {
  $('kits').innerHTML = KIT_ORDER.map((k) =>
    `<button data-kit="${k}" aria-pressed="${k === mix.kit}">${KITS[k].name}</button>`).join('');
  $('kits').addEventListener('click', (e) => {
    const b = e.target.closest('[data-kit]');
    if (b) setKit(b.dataset.kit);
  });
}

function buildMixer() {
  const strip = (lane) => `<div class="strip" data-lane="${lane}">
      <div class="strip-head"><svg class="lane-shape" viewBox="0 0 24 24" aria-hidden="true">${ICONS[lane]}</svg><span class="strip-name">${INSTRUMENTS[lane].name}</span></div>
      <div class="strip-knobs">${knobHtml('vol', lane)}${knobHtml('tune', lane)}</div>
    </div>`;
  $('mixer').innerHTML = LANES.map(strip).join('') + `<div class="strip strip--master">
      <div class="strip-head"><svg class="ico" aria-hidden="true"><use href="#i-sound"/></svg><span class="strip-name">Tổng</span></div>
      <div class="strip-knobs">${knobHtml('master')}${knobHtml('verb')}</div>
    </div>`;
  $('mixer').querySelectorAll('.knob').forEach(drawKnob);
  $('kitDesc').textContent = LANES.map((lane) => INSTRUMENTS[lane].name).join(' · ');
}

function demoKit() {
  if (state.playing || !ensureAudio()) return;
  const t = ctx.currentTime + 0.03;
  LANES.forEach((lane, n) => playVoice(lane, t + n * 0.24, 0.9, fx));
}

function setKit(k) {
  if (k === mix.kit) { demoKit(); return; }
  mix.kit = k;
  saveMix();
  LANES.forEach((lane) => (INSTRUMENTS[lane].name = KITS[k].lanes[lane][0]));
  document.querySelectorAll('[data-kit]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.kit === k ? 'true' : 'false'));
  buildMixer();
  gridBpr = 0;
  layoutGrid();
  if (dict.on && !dict.checked && !dict.revealed && !dict.solved) setDictMsg(dictIntro());
  demoKit();
  buildStripDownload();
  announce(`${KITS[k].name}: ${LANES.map((lane) => INSTRUMENTS[lane].name).join(', ')}`);
}

const mixerEl = $('mixer');
let knobDrag = null;
mixerEl.addEventListener('pointerdown', (e) => {
  const el = e.target.closest('.knob');
  if (!el || e.button > 0) return;
  e.preventDefault();
  el.focus();
  el.setPointerCapture(e.pointerId);
  el.classList.add('turning');
  knobDrag = { el, x: e.clientX, y: e.clientY, v: knobValue(el.dataset.kind, el.dataset.lane) };
});
mixerEl.addEventListener('pointermove', (e) => {
  if (!knobDrag) return;
  const s = KNOB_SPEC[knobDrag.el.dataset.kind];
  const d = knobDrag.y - e.clientY + (e.clientX - knobDrag.x);
  setKnob(knobDrag.el, knobDrag.v + (d / 160) * (s.max - s.min));
});
['pointerup', 'pointercancel'].forEach((t) => mixerEl.addEventListener(t, () => {
  if (knobDrag) knobDrag.el.classList.remove('turning');
  knobDrag = null;
}));
mixerEl.addEventListener('wheel', (e) => {
  const el = e.target.closest('.knob');
  if (!el) return;
  e.preventDefault();
  const s = KNOB_SPEC[el.dataset.kind];
  setKnob(el, knobValue(el.dataset.kind, el.dataset.lane) + (e.deltaY < 0 ? s.step : -s.step));
}, { passive: false });
mixerEl.addEventListener('keydown', (e) => {
  const el = e.target.closest('.knob');
  if (!el) return;
  const s = KNOB_SPEC[el.dataset.kind];
  const v = knobValue(el.dataset.kind, el.dataset.lane);
  const next = {
    ArrowUp: v + s.step, ArrowRight: v + s.step, ArrowDown: v - s.step, ArrowLeft: v - s.step,
    PageUp: v + s.step * 4, PageDown: v - s.step * 4, Home: s.min, End: s.max,
  }[e.key];
  if (next === undefined) return;
  e.preventDefault();
  setKnob(el, next);
});
mixerEl.addEventListener('dblclick', (e) => {
  const el = e.target.closest('.knob');
  if (el) setKnob(el, KNOB_SPEC[el.dataset.kind].def);
});

const video = $('video');
const overlay = $('overlay');
const work = $('work');
const wctx = work.getContext('2d', { willReadFrequently: true });
const octx = overlay.getContext('2d');

const WORK_W = 480, WORK_H = 360;
const COLOR_RULES = {
  minSat: 0.30,
  minVal: 0.28,
  red:    [[0, 18], [330, 360]],
  yellow: [[35, 70]],
  blue:   [[180, 255]],
};
const MIN_COVER = 0.22;
const STABLE_FRAMES = 4;
const MIN_DOTS = 3;
const SCAN_MS = 70;

let camStream = null;
let camTimer = 0;
const camHist = [];
let detected = [];
let stripReady = false;
let workW = WORK_W, workH = WORK_H;
let photo = null;

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
  return { h, s: max === 0 ? 0 : d / max, v: max };
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
  const marginX = workW * 0.04;
  const zw = (workW - marginX * 2) / STEPS;
  const size = Math.floor(Math.min(zw * 0.8, workH * 0.2));
  const cy = workH * ($('stripY').value / 100);
  return [...Array(STEPS).keys()].map((i) => ({
    x: Math.round(marginX + zw * i + (zw - size) / 2),
    y: Math.round(cy - size / 2),
    w: size, h: size,
  }));
}

function classifyZone(data, z) {
  const votes = { R: 0, B: 0, Y: 0 };
  let total = 0;
  for (let y = z.y; y < z.y + z.h; y += 2) {
    for (let x = z.x; x < z.x + z.w; x += 2) {
      const p = (y * workW + x) * 4;
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
  wctx.drawImage(video, 0, 0, workW, workH);
  const { data } = wctx.getImageData(0, 0, workW, workH);
  const zs = zones();
  let stableAll = true;
  zs.forEach((z, i) => {
    const raw = classifyZone(data, z);
    const hist = (camHist[i] = camHist[i] || []);
    hist.push(raw);
    if (hist.length > STABLE_FRAMES) hist.shift();
    const stable = hist.length === STABLE_FRAMES && hist.every((c) => c === raw);
    if (stable) detected[i] = raw;
    else stableAll = false;
  });
  const dots = detected.filter((v) => v && v !== 'W').length;
  setStripReady(stableAll && dots >= MIN_DOTS, dots);
  drawOverlay(zs);
  updateDetChips();
}

let lastDots = -1;
function setStripReady(ready, dots) {
  if (ready === stripReady && (!ready || dots === lastDots)) return;
  stripReady = ready;
  lastDots = dots;
  $('camWrite').disabled = !ready;
  $('camWrite').classList.toggle('primary', ready);
  $('camHint').textContent = ready
    ? `Nhận được ${dots} ô có màu. Bấm “Chép vào lưới” để ghi.`
    : 'Đưa dải giấy vào khung và giữ yên…';
}

function writeFromCamera() {
  if (!stripReady) return;
  const strip = detected.slice(0, STEPS).map((v) => v || 'W');
  const next = Object.fromEntries(LANES.map((lane) => [lane, strip.map((v) => v === lane && !laneLocked(lane))]));
  const changed = strip.map((_, i) => LANES.some((lane) => next[lane][i] !== state.tracks[lane][i]));
  if (!changed.some(Boolean)) { showToast('Lưới đã giống dải giấy.'); return; }
  pushUndo();
  state.tracks = next;
  state.preset = -1;
  dict.checked = false;
  renderCells();
  markPreset();
  changed.forEach((c, i) => c && LANES.forEach((lane) => replay(cellEls[lane][i], 'cam-flash')));
  const n = strip.filter((v) => v !== 'W').length;
  showToast(`Đã chép ${n} nốt từ dải giấy`, 'Hoàn tác', undo);
  announce(`Đã chép ${n} nốt từ dải giấy`);
}

function drawOverlay(zs) {
  overlay.width = workW; overlay.height = workH;
  const css = getComputedStyle(document.documentElement);
  const col = {
    R: css.getPropertyValue('--red'), B: css.getPropertyValue('--blue'),
    Y: css.getPropertyValue('--yellow'), W: photo ? 'rgba(20,20,20,.7)' : 'rgba(255,255,255,.85)',
  };
  octx.clearRect(0, 0, workW, workH);
  if (photo) octx.drawImage(photo, 0, 0, workW, workH);
  zs.forEach((z, i) => {
    const v = detected[i] || 'W';
    octx.lineWidth = v === 'W' ? 1.5 : 3;
    octx.strokeStyle = col[v];
    octx.setLineDash(v === 'W' ? [4, 3] : []);
    octx.strokeRect(z.x + .5, z.y + .5, z.w, z.h);
    octx.font = '600 11px system-ui';
    octx.lineWidth = 3;
    octx.strokeStyle = 'rgba(0,0,0,.7)';
    octx.setLineDash([]);
    octx.strokeText(String(i + 1), z.x + 1, z.y - 4);
    octx.fillStyle = 'rgba(255,255,255,.95)';
    octx.fillText(String(i + 1), z.x + 1, z.y - 4);
  });
}

function buildDetChips() {
  const box = $('detChips');
  box.innerHTML = '';
  for (let i = 0; i < STEPS; i++) {
    const s = document.createElement('span');
    if (i % BEATS_PER_BAR === BEATS_PER_BAR - 1 && i < STEPS - 1) s.className = 'bar-end';
    box.appendChild(s);
  }
  updateDetChips();
}
function updateDetChips() {
  [...$('detChips').children].forEach((s, i) => (s.dataset.v = detected[i] || 'W'));
}

function stopCamera() {
  if (!camStream) return;
  camStream.getTracks().forEach((t) => t.stop());
  camStream = null;
  clearInterval(camTimer);
  video.srcObject = null;
  octx.clearRect(0, 0, overlay.width, overlay.height);
  detected = [];
  camHist.length = 0;
  updateDetChips();
  setStripReady(false, 0);
  $('camHint').textContent = 'Bật camera hoặc tải ảnh lên để bắt đầu.';
  $('camEmpty').hidden = false;
  $('camBtnLabel').textContent = 'Bật camera';
  $('camStatus').textContent = 'Camera đang tắt';
}

const CAM_ERRORS = {
  NotAllowedError: 'Camera đang bị chặn. Bấm biểu tượng ổ khoá cạnh địa chỉ trang → Cho phép camera, rồi thử lại.',
  SecurityError: 'Camera đang bị chặn. Bấm biểu tượng ổ khoá cạnh địa chỉ trang → Cho phép camera, rồi thử lại.',
  NotFoundError: 'Máy này không có camera.',
  OverconstrainedError: 'Máy này không có camera phù hợp.',
  NotReadableError: 'Camera đang được ứng dụng khác dùng. Tắt Zoom/Meet rồi thử lại.',
};

async function toggleCamera() {
  if (camStream) { stopCamera(); return; }
  clearPhoto();
  $('camErr').textContent = '';
  if (!navigator.mediaDevices?.getUserMedia) {
    $('camStatus').textContent = 'Không mở được camera';
    $('camErr').textContent = 'Trình duyệt này không dùng được camera. Thử Chrome hoặc Edge bản mới.';
    return;
  }
  try {
    $('camStatus').textContent = 'Đang mở camera…';
    $('camBtn').disabled = true;
    camStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'environment' },
      audio: false,
    });
    video.srcObject = camStream;
    await video.play();
    workW = WORK_W; workH = WORK_H;
    work.width = workW; work.height = workH;
    $('camEmpty').hidden = true;
    $('camBtnLabel').textContent = 'Tắt camera';
    $('camStatus').textContent = 'Đang quét';
    setStripReady(false, 0);
    camTimer = setInterval(scanFrame, SCAN_MS);
  } catch (e) {
    if (camStream) camStream.getTracks().forEach((t) => t.stop());
    camStream = null;
    $('camStatus').textContent = 'Không mở được camera';
    $('camErr').textContent = CAM_ERRORS[e.name] || 'Chưa mở được camera. Thử tải lại trang.';
  } finally {
    $('camBtn').disabled = false;
  }
}

const MAX_PHOTO_RATIO = 2;
let photoUrl = '';

function scanPhoto() {
  if (!photo) return;
  wctx.drawImage(photo, 0, 0, workW, workH);
  const { data } = wctx.getImageData(0, 0, workW, workH);
  const zs = zones();
  detected = zs.map((z) => classifyZone(data, z));
  const dots = detected.filter((v) => v !== 'W').length;
  setStripReady(dots >= MIN_DOTS, dots);
  if (dots < MIN_DOTS) {
    $('camHint').textContent = dots
      ? `Mới nhận được ${dots} ô có màu. Dời khung quét cho trùng với dải giấy.`
      : 'Chưa nhận được ô màu nào. Dời khung quét cho trùng với dải giấy.';
  }
  drawOverlay(zs);
  updateDetChips();
}

function clearPhoto() {
  if (!photo) return;
  URL.revokeObjectURL(photoUrl);
  photo = null;
  photoUrl = '';
  workW = WORK_W; workH = WORK_H;
  $('camBox').style.aspectRatio = '';
  octx.clearRect(0, 0, overlay.width, overlay.height);
  detected = [];
  updateDetChips();
  setStripReady(false, 0);
  $('camHint').textContent = 'Bật camera hoặc tải ảnh lên để bắt đầu.';
  $('camEmpty').hidden = false;
  $('camStatus').textContent = 'Camera đang tắt';
  $('photoClear').hidden = true;
}

async function loadPhoto(file) {
  $('camErr').textContent = '';
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    $('camErr').textContent = 'Tệp này không phải ảnh. Hãy chọn ảnh JPG hoặc PNG.';
    $('camEmpty').hidden = false;
    return;
  }
  const url = URL.createObjectURL(file);
  const img = new Image();
  try {
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  } catch (e) {
    URL.revokeObjectURL(url);
    $('camErr').textContent = 'Không mở được ảnh này. Thử một ảnh JPG hoặc PNG khác.';
    $('camEmpty').hidden = false;
    return;
  }
  stopCamera();
  clearPhoto();
  photo = img;
  photoUrl = url;
  workW = WORK_W;
  workH = Math.round(WORK_W * Math.min(img.naturalHeight / img.naturalWidth, MAX_PHOTO_RATIO));
  work.width = workW; work.height = workH;
  $('camBox').style.aspectRatio = `${workW} / ${workH}`;
  $('camEmpty').hidden = true;
  $('camStatus').textContent = 'Đang xem ảnh';
  $('photoClear').hidden = false;
  scanPhoto();
  announce(stripReady ? `Đã đọc ảnh, nhận được ${lastDots} ô có màu` : 'Đã mở ảnh, chưa nhận đủ ô màu');
}

$('photoBtn').addEventListener('click', () => $('photoInput').click());
$('photoInput').addEventListener('change', (e) => {
  loadPhoto(e.target.files[0]);
  e.target.value = '';
});
$('photoClear').addEventListener('click', clearPhoto);
$('stripY').addEventListener('input', scanPhoto);
$('camBox').addEventListener('dragover', (e) => {
  e.preventDefault();
  $('camBox').classList.add('drop');
});
$('camBox').addEventListener('dragleave', () => $('camBox').classList.remove('drop'));
$('camBox').addEventListener('drop', (e) => {
  e.preventDefault();
  $('camBox').classList.remove('drop');
  loadPhoto(e.dataTransfer.files[0]);
});

function buildStripDownload() {
  const w = 297, x0 = 10, gap = 2.5, groupGap = 7;
  const cell = Math.min(14, (w - 2 * x0 - (BARS - 1) * groupGap - (STEPS - BARS) * gap) / STEPS);
  let x = x0, rects = '', nums = '';
  for (let i = 0; i < STEPS; i++) {
    const k = i % BEATS_PER_BAR;
    rects += `<rect x="${x.toFixed(2)}" y="14" width="${cell.toFixed(2)}" height="${cell.toFixed(2)}" rx="1.5" fill="#fff" stroke="#555" stroke-width="0.4"/>`;
    nums += `<text x="${(x + cell / 2).toFixed(2)}" y="${(18 + cell).toFixed(2)}" font-size="3.6" text-anchor="middle" fill="#555"${k === 0 ? ' font-weight="700"' : ''}>${k + 1}</text>`;
    x += cell + (k === BEATS_PER_BAR - 1 ? groupGap : gap);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}mm" height="44mm" viewBox="0 0 ${w} 44" font-family="Arial, sans-serif">
<text x="${x0}" y="9" font-size="4" fill="#333">BeatPaper · ${STEPS} ô, ${BARS} ô nhịp ${METER} · đỏ: ${INSTRUMENTS.R.name}, xanh: ${INSTRUMENTS.B.name}, vàng: ${INSTRUMENTS.Y.name}, để trắng: dấu lặng</text>
${rects}${nums}</svg>`;
  const a = $('stripDl');
  if (a.href.startsWith('blob:')) URL.revokeObjectURL(a.href);
  a.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  a.download = `dai-giay-beatpaper-${METER.replace('/', '-')}.svg`;
  a.textContent = `Tải mẫu dải giấy ${METER} để in`;
}

$('camBtn').addEventListener('click', toggleCamera);
$('camWrite').addEventListener('click', writeFromCamera);

const SOLFA = { C: 'Đô', D: 'Rê', E: 'Mi', F: 'Fa', G: 'Son', A: 'La', B: 'Si' };
const LETTERS = 'CDEFGAB';
const SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

const rOpt = { mode: 'melody', countIn: true, click: true, loop: false, look: 'blocks' };
const rd = {
  grade: 7, reading: null, bars: [], mi: null, events: [], total: 0, firstIdx: 0,
  bpm: 92, playing: false, idx: 0, pos: 0, time: 0, endTime: 0, drawQ: [], bus: null, cur: null,
};
let rTicker = null;
let rRaf = 0;

function parsePitch(p) {
  const m = /^([A-G])(#|b)?(\d)$/.exec(p);
  const oct = +m[3];
  const acc = m[2] || '';
  return {
    letter: m[1], acc, oct,
    midi: 12 * (oct + 1) + SEMI[m[1]] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0),
    step: LETTERS.indexOf(m[1]) + 7 * oct,
  };
}

function meterInfo(meter) {
  const [n, d] = meter.split('/').map(Number);
  const compound = d === 8 && n % 3 === 0 && n > 3;
  return { n, d, barLen: n * 8 / d, beatLen: compound ? 3 : 8 / d };
}

function parseScore(str) {
  const bars = [];
  let cur = { items: [] };
  const close = () => {
    if (!cur.items.length) return;
    cur.len = cur.items.reduce((s, it) => s + it.dur, 0);
    bars.push(cur);
    cur = { items: [] };
  };
  str.trim().split(/\s+/).forEach((tok) => {
    if (tok === '|') close();
    else if (tok === '|:') { close(); cur.repeatStart = true; }
    else if (tok === ':|') { cur.repeatEnd = true; close(); }
    else if (tok === '[1' || tok === '[2') cur.volta = +tok[1];
    else {
      const [p, d] = tok.split(':');
      const tie = d.endsWith('~');
      const dur = parseFloat(d);
      cur.items.push(p === 'R' ? { rest: true, dur } : { ...parsePitch(p), dur, tie });
    }
  });
  close();
  return bars;
}

function expand(bars) {
  const out = [];
  let i = 0, repStart = 0, second = false, inVolta1 = false;
  while (i < bars.length) {
    const b = bars[i];
    if (b.volta === 1) inVolta1 = true;
    if (b.volta === 2) { inVolta1 = false; second = false; }
    if (second && inVolta1) { i++; continue; }
    if (b.repeatStart && !second) repStart = i;
    out.push(i);
    if (b.repeatEnd) {
      if (!second) { second = true; inVolta1 = false; i = repStart; continue; }
      second = false;
    }
    i++;
  }
  return out;
}

function buildTimeline() {
  const { bars, mi } = rd;
  const events = [];
  const beatsPerBar = Math.round(mi.barLen / mi.beatLen);
  for (let k = 0; k < beatsPerBar; k++) {
    events.push({ start: -mi.barLen + k * mi.beatLen, type: 'count', strong: k === 0, n: k + 1 });
  }
  let pos = 0;
  let held = null;
  expand(bars).forEach((bi) => {
    const bar = bars[bi];
    const off = bi === 0 && bar.len < mi.barLen ? mi.barLen - bar.len : 0;
    for (let b = 0; b < mi.barLen - 1e-6; b += mi.beatLen) {
      const p = b - off;
      if (p > -1e-6 && p < bar.len - 1e-6) events.push({ start: pos + p, type: 'beat', strong: b === 0 });
    }
    events.push({ start: pos, type: 'bar', bar: bi });
    let x = pos;
    bar.items.forEach((it) => {
      events.push({ start: x, type: 'vis', it });
      if (it.rest) held = null;
      else if (held && held.tie && held.midi === it.midi) { held.dur += it.dur; held.tie = it.tie; }
      else { held = { start: x, type: 'note', midi: it.midi, dur: it.dur, tie: it.tie }; events.push(held); }
      x += it.dur;
    });
    pos += bar.len;
  });
  events.sort((a, b) => a.start - b.start);
  rd.events = events;
  rd.total = pos;
  rd.firstIdx = events.findIndex((e) => e.start >= 0);
}

function cssPx(el, name, fallback) {
  const probe = document.createElement('div');
  probe.style.cssText = `position:absolute;visibility:hidden;width:0;height:var(${name})`;
  el.appendChild(probe);
  const h = probe.getBoundingClientRect().height;
  probe.remove();
  return h || fallback;
}

function renderScore() {
  const { bars, mi } = rd;
  const box = $('rScore');
  box.innerHTML = '';
  const ts = document.createElement('div');
  ts.className = 'timesig';
  ts.innerHTML = `<span>${mi.n}</span><span>${mi.d}</span>`;
  box.appendChild(ts);

  const steps = bars.flatMap((b) => b.items.filter((i) => !i.rest).map((i) => i.step));
  const hi = Math.max(...steps), lo = Math.min(...steps);
  const span = Math.max(hi - lo, 6);
  const pad = (span - (hi - lo)) / 2;
  const laneH = cssPx(box, '--lane', 112);
  const noteH = cssPx(box, '--nh', 26);
  const yOf = (step) => ((hi + pad - step) / span) * (laneH - noteH);

  bars.forEach((bar, bi) => {
    const el = document.createElement('div');
    el.className = 'rbar' + (bar.repeatStart ? ' rs' : '') + (bar.repeatEnd ? ' re' : '');
    if (bar.volta) el.innerHTML = `<div class="volta">${bar.volta}.</div>`;
    const lane = document.createElement('div');
    lane.className = 'lane';
    const off = bi === 0 && bar.len < mi.barLen ? mi.barLen - bar.len : 0;
    lane.style.width = `calc(${bar.len} * var(--u))`;
    lane.style.setProperty('--beat', mi.beatLen);
    lane.style.setProperty('--off', (mi.beatLen - (off % mi.beatLen)) % mi.beatLen);
    let x = 0;
    let prev = null;
    bar.items.forEach((it) => {
      const n = document.createElement('div');
      n.style.left = `calc(${x} * var(--u) + 1px)`;
      n.style.width = `calc(${it.dur} * var(--u) - 2px)`;
      if (it.rest) {
        n.className = 'nt rest';
        n.style.top = `${(laneH - noteH) / 2}px`;
        n.innerHTML = '<span>–</span>';
        n.title = 'Dấu lặng';
      } else {
        const name = SOLFA[it.letter] + (it.acc === '#' ? '♯' : it.acc === 'b' ? '♭' : '');
        n.className = 'nt';
        n.dataset.n = it.letter;
        if (it.oct >= 5) n.dataset.oct = 'hi';
        if (it.oct <= 3) n.dataset.oct = 'lo';
        n.style.top = `${yOf(it.step)}px`;
        n.innerHTML = `<span>${name}</span>`;
        n.title = name + (it.oct >= 5 ? ' (quãng tám cao)' : it.oct <= 3 ? ' (quãng tám thấp)' : '') + ' · bấm để nghe';
        n.addEventListener('click', () => playNote(it));
      }
      const before = x === 0 ? lastItemOf(bars[bi - 1]) : prev;
      if (!it.rest && before && before.tie && before.midi === it.midi) n.classList.add('cont');
      lane.appendChild(n);
      it.el = n;
      prev = it;
      x += it.dur;
    });
    el.appendChild(lane);
    box.appendChild(el);
  });
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', scoreText());
}
const lastItemOf = (bar) => bar && bar.items[bar.items.length - 1];

function scoreText() {
  return `Nhịp ${rd.reading.meter}. ` + rd.bars.map((b, i) =>
    `Ô nhịp ${i + 1}: ` + b.items.map((it) => (it.rest ? 'lặng' : SOLFA[it.letter] + (it.acc === '#' ? ' thăng' : it.acc === 'b' ? ' giáng' : ''))).join(', ')
  ).join('. ');
}

function readingsOf(grade) {
  return READINGS.filter((r) => r.grade === grade).sort((a, b) => a.no - b.no);
}
function bookOf(grade) { return BOOKS.find((b) => b.grade === grade); }
function readingTitle(r) { return `Bài đọc nhạc số ${r.no}`; }
const topicName = (r) => r.topic.replace(/^Chủ đề \d+:\s*/, '');
const originText = (r) => (r.origin.includes(':') ? r.origin : `Nhạc: ${r.origin.replace(/^Nhạc\s+/, '')}`);

function buildGrades() {
  const box = $('grades');
  box.innerHTML = BOOKS.map((b) =>
    `<button role="tab" data-grade="${b.grade}" aria-selected="false" tabindex="-1">Lớp ${b.grade}</button>`).join('');
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-grade]');
    if (b) selectGrade(+b.dataset.grade);
  });
  box.addEventListener('keydown', (e) => {
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const i = BOOKS.findIndex((b) => b.grade === rd.grade);
    const next = BOOKS[(i + d + BOOKS.length) % BOOKS.length].grade;
    selectGrade(next);
    box.querySelector(`[data-grade="${next}"]`).focus();
  });
}

function selectGrade(grade, no) {
  rd.grade = grade;
  [...$('grades').children].forEach((b) => {
    const on = +b.dataset.grade === grade;
    b.setAttribute('aria-selected', on ? 'true' : 'false');
    b.tabIndex = on ? 0 : -1;
  });
  const list = readingsOf(grade);
  const box = $('rlist');
  if (!list.length) {
    box.innerHTML = `<li class="empty">Lớp ${grade} chưa có bài đọc nhạc trong ứng dụng.
      <a class="link" href="${bookOf(grade).url}" target="_blank" rel="noopener">Mở SGK Âm nhạc ${grade} ↗</a></li>`;
    return;
  }
  box.innerHTML = list.map((r) => {
    const dots = parseScore(r.notes).flatMap((b) => b.items).filter((i) => !i.rest).slice(0, 6)
      .map((i) => `<i style="background:var(--n-${i.letter})"></i>`).join('');
    return `<li><button class="ritem" data-no="${r.no}">
      <span class="no">Số ${r.no}</span>
      <span class="dots" aria-hidden="true">${dots}</span>
      <span class="t">${r.name || topicName(r)}</span>
      <span class="meta">Nhịp ${r.meter} · trang ${r.page}</span>
    </button></li>`;
  }).join('');
  const pick = list.find((r) => r.no === no) || list[0];
  selectReading(pick);
}

$('rlist').addEventListener('click', (e) => {
  const b = e.target.closest('.ritem');
  if (b) {
    selectReading(readingsOf(rd.grade).find((r) => r.no === +b.dataset.no));
    announce(`${readingTitle(rd.reading)}, lớp ${rd.grade}`);
  }
});

function selectReading(r) {
  if (rd.playing) rStop();
  rd.reading = r;
  rd.mi = meterInfo(r.meter);
  rd.bars = parseScore(r.notes);
  const list = $('rlist');
  [...list.querySelectorAll('.ritem')].forEach((b) => {
    const on = +b.dataset.no === r.no;
    b.setAttribute('aria-current', on ? 'true' : 'false');
    if (on && list.scrollWidth > list.clientWidth) list.scrollLeft = b.parentElement.offsetLeft - list.offsetLeft - 4;
  });
  $('rTitle').textContent = readingTitle(r) + (r.name ? ` · ${r.name}` : '');
  const book = bookOf(r.grade);
  $('rMeta').innerHTML = [originText(r), r.key, `Nhịp ${r.meter}`, r.remark].filter(Boolean).join(' · ') +
    ` · <a href="${bookPageUrl(book, r.page)}" target="_blank" rel="noopener" title="Mở đúng trang ${r.page} trong sách điện tử">SGK Âm nhạc ${r.grade}, tr. ${r.page} ↗</a>`;
  setRBpm(r.bpm);
  refreshScore();
  rStatusIdle();
  if (view === 'doc') {
    try { history.replaceState(null, '', `#doc/${r.grade}/${r.no}`); } catch (e) {}
    setTitle();
  }
}

function refreshScore() {
  if (!rd.reading) return;
  if (rd.playing) rStop();
  const blocks = rOpt.look === 'blocks';
  $('rScore').hidden = !blocks;
  $('rStaff').hidden = blocks;
  $('legend').hidden = rOpt.look === 'staff';
  if (blocks) { $('staffMsg').hidden = true; renderScore(); }
  else renderStaff();
  buildTimeline();
  replay($('rWrap'), 'fade-in');
}

let tapTimer = 0;
function playNote(it) {
  if (it.rest || !ensureAudio()) return;
  const items = rd.bars.flatMap((b) => b.items);
  let k = items.indexOf(it);
  let dur = it.dur;
  let cur = it;
  while (cur.tie && items[k + 1] && !items[k + 1].rest && items[k + 1].midi === cur.midi) {
    cur = items[++k];
    dur += cur.dur;
  }
  const sec = Math.min(Math.max(dur * spe(), 0.3), 2.5);
  tone(it.midi, ctx.currentTime + 0.01, sec, 1, fx);
  if (!rd.playing) {
    setCurrent(it);
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { if (!rd.playing && rd.cur === it) setCurrent(null); }, sec * 1000 + 120);
  }
}

function setCurrent(it) {
  if (rd.cur && rd.cur.el) rd.cur.el.classList.remove('now');
  rd.cur = it;
  const cursor = $('staffCursor');
  if (!it) { cursor.hidden = true; return; }
  if (rOpt.look === 'blocks') { if (it.el) it.el.classList.add('now'); return; }
  const els = (it.staffEls || []).filter((e) => e.tagName !== 'text');
  if (!els.length) { cursor.hidden = true; return; }
  const wrap = $('rWrap').getBoundingClientRect();
  const r = els.map((e) => e.getBoundingClientRect())
    .reduce((a, b) => ({ left: Math.min(a.left, b.left), top: Math.min(a.top, b.top), right: Math.max(a.right, b.right), bottom: Math.max(a.bottom, b.bottom) }));
  const x = r.left - wrap.left - 5;
  const y = r.top - wrap.top - 5;
  cursor.style.transition = cursor.hidden || Math.abs(y - cursorY) > 4 || x < cursorX ? 'none' : '';
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  cursor.style.width = `${r.right - r.left + 10}px`;
  cursor.style.height = `${r.bottom - r.top + 10}px`;
  cursor.hidden = false;
  cursorX = x;
  cursorY = y;
}
let cursorX = -1;
let cursorY = -1;

const ABCJS_URL = 'https://cdn.jsdelivr.net/npm/abcjs@6.5.2/dist/abcjs-basic-min.js';
let abcLoading = null;
let staffToken = 0;

function loadAbc() {
  if (window.ABCJS) return Promise.resolve();
  if (!abcLoading) {
    abcLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = ABCJS_URL;
      s.onload = resolve;
      s.onerror = () => { abcLoading = null; s.remove(); reject(new Error('abcjs')); };
      document.head.appendChild(s);
    });
  }
  return abcLoading;
}

function abcPitch(it) {
  const base = it.oct >= 5 ? it.letter.toLowerCase() : it.letter;
  return base + (it.oct >= 6 ? "'".repeat(it.oct - 5) : it.oct <= 3 ? ','.repeat(4 - it.oct) : '');
}
function abcDur(d) {
  if (d === 1) return '';
  if (Number.isInteger(d)) return String(d);
  if (Number.isInteger(d * 2)) return `${d * 2}/2`;
  return `${Math.round(d * 4)}/4`;
}
const ABC_ACC = { '#': '^', b: '_', '': '=' };

function buildAbc() {
  const { bars, mi } = rd;
  let music = '';
  const words = [];
  let prevItem = null;
  bars.forEach((bar, bi) => {
    const accs = {};
    if (bi === 0 && bar.repeatStart) music += '|: ';
    if (bar.volta) music += `[${bar.volta} `;
    const off = bi === 0 && bar.len < mi.barLen ? mi.barLen - bar.len : 0;
    let p = off;
    let prev = null;
    bar.items.forEach((it) => {
      const sameBeat = prev && Math.floor((p + 1e-6) / mi.beatLen) === Math.floor((p - prev.dur + 1e-6) / mi.beatLen);
      const beam = prev && sameBeat && prev.dur < 2 && it.dur < 2 && !prev.rest && !it.rest;
      if (prev && !beam) music += ' ';
      if (it.rest) {
        music += 'z' + abcDur(it.dur);
      } else {
        const key = it.letter + it.oct;
        let acc = '';
        if ((accs[key] || '') !== it.acc) { acc = ABC_ACC[it.acc]; accs[key] = it.acc; }
        music += acc + abcPitch(it) + abcDur(it.dur) + (it.tie ? '-' : '');
        const cont = prevItem && !prevItem.rest && prevItem.tie && prevItem.midi === it.midi;
        words.push(cont ? '*' : (SOLFA[it.letter] + (it.acc === '#' ? '♯' : it.acc === 'b' ? '♭' : '')).toLowerCase());
      }
      p += it.dur;
      prev = it;
      prevItem = it;
    });
    const last = bi === bars.length - 1;
    if (bar.repeatEnd) music += ' :|';
    else if (last) music += ' |]';
    else if (bars[bi + 1].repeatStart) music += ' |:';
    else music += ' |';
    music += ' ';
  });
  return `X:1\nM:${rd.reading.meter}\nL:1/8\nK:C\n${music.trim()}\nw:${words.join(' ')}\n`;
}

async function renderStaff() {
  const box = $('rStaff');
  const msg = $('staffMsg');
  const token = ++staffToken;
  rd.bars.forEach((b) => b.items.forEach((it) => { it.staffEls = []; }));
  if (!window.ABCJS) {
    box.innerHTML = '';
    msg.textContent = 'Đang tải khuông nhạc…';
    msg.hidden = false;
    try {
      await loadAbc();
    } catch (e) {
      if (token !== staffToken) return;
      msg.innerHTML = 'Không tải được khuông nhạc. Kiểm tra mạng rồi <button class="link" id="staffRetry">thử lại</button>, hoặc xem dạng Khối màu.';
      $('staffRetry').addEventListener('click', refreshScore);
      return;
    }
    if (token !== staffToken) return;
  }
  msg.hidden = true;
  const present = document.body.classList.contains('present');
  const width = $('rWrap').clientWidth;
  const scale = present ? Math.max(1.4, Math.min(2.2, innerHeight / 480)) : width < 520 ? 0.95 : 1.2;
  const tune = window.ABCJS.renderAbc(box, buildAbc(), {
    scale,
    staffwidth: Math.max(220, width / scale - 20),
    wrap: { minSpacing: 1.6, maxSpacing: 2.7, preferredMeasuresPerLine: 4 },
    paddingtop: 4, paddingbottom: 4, paddingleft: 2, paddingright: 2,
    format: { vocalfont: '"Plus Jakarta Sans" 13', annotationfont: '"Plus Jakarta Sans" 12' },
    selectTypes: false,
  })[0];
  const notes = [];
  tune.lines.forEach((line) => (line.staff || []).forEach((st) => st.voices.forEach((v) => v.forEach((el) => {
    if (el.el_type === 'note') notes.push(el);
  }))));
  const items = rd.bars.flatMap((b) => b.items);
  items.forEach((it, k) => {
    it.staffEls = (notes[k] && notes[k].abselem && notes[k].abselem.elemset) || [];
    if (rOpt.look === 'color' && !it.rest) {
      it.staffEls.forEach((e) => e.querySelectorAll('.abcjs-notehead').forEach((h) => h.classList.add(`abc-c-${it.letter}`)));
    }
    if (!it.rest) {
      it.staffEls.forEach((e) => {
        e.classList.add('note-hit');
        e.addEventListener('click', () => playNote(it));
      });
    }
  });
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', scoreText());
}

let staffW = 0;
if ('ResizeObserver' in window) {
  new ResizeObserver(() => {
    const w = $('rWrap').clientWidth;
    if (rOpt.look !== 'blocks' && rd.reading && Math.abs(w - staffW) > 24) {
      staffW = w;
      if (!rd.playing) refreshScore();
    }
  }).observe($('rWrap'));
}

function setLook(look) {
  rOpt.look = look;
  document.querySelectorAll('[data-look]').forEach((b) =>
    b.setAttribute('aria-pressed', b.dataset.look === look ? 'true' : 'false'));
  try { localStorage.setItem('beatpaper-look', look); } catch (e) {}
  refreshScore();
}
document.querySelectorAll('[data-look]').forEach((b) => b.addEventListener('click', () => setLook(b.dataset.look)));

function rStatusIdle() {
  $('rStatus').textContent = `${rd.bars.length} ô nhịp`;
}

function setRBpm(v) {
  rd.bpm = v;
  $('rBpm').value = v;
  $('rBpmOut').innerHTML = `<b>${v}</b> <small>phách/phút</small>`;
  $('rTempoTerm').textContent = rd.mi.d === 8
    ? `1 phách = ${rd.mi.beatLen === 3 ? 'nốt đen chấm dôi' : 'nốt móc đơn'}`
    : `Sách ghi: ${rd.reading ? rd.reading.tempo : tempoTerm(v)}`;
}

const spe = () => 60 / (rd.bpm * rd.mi.beatLen);

function rSchedule() {
  const horizon = ctx.currentTime + SCHEDULE_AHEAD;
  for (;;) {
    if (rd.idx >= rd.events.length) {
      const tEnd = rd.time + (rd.total - rd.pos) * spe();
      if (rOpt.loop) {
        if (tEnd > horizon) break;
        rd.time = tEnd; rd.pos = 0; rd.idx = rd.firstIdx;
        continue;
      }
      rd.endTime = tEnd;
      break;
    }
    const e = rd.events[rd.idx];
    const t = rd.time + (e.start - rd.pos) * spe();
    if (t > horizon) break;
    rd.time = t; rd.pos = e.start; rd.idx++;
    fire(e, t);
  }
  if (rd.endTime && ctx.currentTime > rd.endTime + 0.15) rStop();
}

function fire(e, t) {
  if (e.type === 'count') { tick(t, e.strong, rd.bus); rd.drawQ.push({ t, count: e.n }); }
  else if (e.type === 'beat') { if (rOpt.click) tick(t, e.strong, rd.bus); }
  else if (e.type === 'note') {
    if (rOpt.mode === 'melody') tone(e.midi, t, e.dur * spe(), 1, rd.bus);
    else woodblock(t, 1, rd.bus);
  }
  else if (e.type === 'vis') rd.drawQ.push({ t, it: e.it });
  else if (e.type === 'bar') rd.drawQ.push({ t, bar: e.bar });
}

function rStart() {
  if (!ensureAudio()) return;
  rd.bus = openBus();
  rd.idx = rOpt.countIn ? 0 : rd.firstIdx;
  rd.pos = rOpt.countIn ? -rd.mi.barLen : 0;
  rd.time = ctx.currentTime + 0.08;
  rd.endTime = 0;
  rd.drawQ = [];
  rTicker = rTicker || makeTicker(rSchedule);
  rSchedule();
  rTicker.start();
  rd.playing = true;
  setPlayUI();
  announce(rOpt.countIn ? 'Bắt đầu đếm vào' : `Đang phát ${readingTitle(rd.reading)}`);
  cancelAnimationFrame(rRaf);
  rRaf = requestAnimationFrame(rDraw);
}

function rStop() {
  if (rTicker) rTicker.stop();
  closeBus(rd.bus);
  rd.bus = null;
  const wasPlaying = rd.playing;
  rd.playing = false;
  rd.drawQ = [];
  cancelAnimationFrame(rRaf);
  setCurrent(null);
  $('countBig').innerHTML = '';
  rStatusIdle();
  setPlayUI();
  if (wasPlaying) announce('Đã dừng');
}

function rDraw() {
  rRaf = requestAnimationFrame(rDraw);
  const now = ctx.currentTime;
  while (rd.drawQ.length && rd.drawQ[0].t <= now) {
    const d = rd.drawQ.shift();
    if (d.count) {
      $('rStatus').textContent = `Đếm vào: ${d.count}`;
      $('countBig').innerHTML = `<span>${d.count}</span>`;
      replay($('countBig'), 'beat');
    } else if (d.bar !== undefined) {
      if ($('countBig').innerHTML) {
        $('countBig').innerHTML = '';
        if (rOpt.countIn) announce(`Đang phát ${readingTitle(rd.reading)}`);
      }
      $('rStatus').textContent = `Ô nhịp ${d.bar + 1} / ${rd.bars.length}`;
    } else if (d.it) {
      setCurrent(d.it);
    }
  }
}

$('rPlayBtn').addEventListener('click', () => (rd.playing ? rStop() : rStart()));
$('rBpm').addEventListener('input', (e) => setRBpm(+e.target.value));
document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
  rOpt.mode = b.dataset.mode;
  document.querySelectorAll('[data-mode]').forEach((x) =>
    x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
}));
document.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => {
  const k = b.dataset.opt;
  rOpt[k] = !rOpt[k];
  b.setAttribute('aria-pressed', rOpt[k] ? 'true' : 'false');
}));

function buildLegend() {
  $('legend').innerHTML = LETTERS.split('').map((l) =>
    `<span><i style="background:var(--n-${l})"></i>${SOLFA[l]}</span>`).join('') +
    '<span><i class="rest"></i>Lặng</span>' +
    '<span class="sep x">·</span><span class="x">• trên nốt: quãng tám cao</span>' +
    '<span class="x">• dưới nốt: quãng tám thấp</span>' +
    '<span class="x">nốt mờ: ngân tiếp (dấu nối)</span>';
}

function buildBooks() {
  $('books').innerHTML = BOOKS.map((b) => {
    const n = readingsOf(b.grade).length;
    return `<li class="book">
      <span class="big" aria-hidden="true">${b.grade}</span>
      <div>
        <div class="name">Âm nhạc ${b.grade}</div>
        <div class="cnt">${n ? `${n} bài đọc nhạc trong ứng dụng` : 'Chưa có bài đọc nhạc trong ứng dụng'}</div>
      </div>
      <div class="acts">
        ${n ? `<a class="btn btn--secondary" href="#doc/${b.grade}"><svg class="ico" aria-hidden="true"><use href="#i-note"/></svg>Luyện đọc nhạc</a>` : ''}
        <a class="btn btn--ghost" href="${b.url}" target="_blank" rel="noopener">Mở sách điện tử<svg class="ico" aria-hidden="true"><use href="#i-out"/></svg></a>
      </div>
    </li>`;
  }).join('');
}

const VIEWS = ['nhip', 'doc', 'sgk'];
const VIEW_TITLES = { nhip: 'Soạn tiết tấu', doc: 'Bài đọc nhạc', sgk: 'Sách giáo khoa' };

function setTitle() {
  const r = rd.reading;
  document.title = (view === 'doc' && r
    ? `${readingTitle(r)} – Lớp ${r.grade}`
    : view === 'nhip' && dict.on ? 'Nghe – ghi tiết tấu' : VIEW_TITLES[view]) + ' · BeatPaper';
}

function setPlayUI() {
  [['playIcon', 'playLabel', state.playing && !play.target], ['rPlayIcon', 'rPlayLabel', rd.playing]].forEach(([icon, label, on]) => {
    $(icon).innerHTML = on ? ICON_STOP : ICON_PLAY;
    $(label).textContent = on ? 'Dừng' : 'Phát';
  });
  const listening = state.playing && play.target;
  $('listenLabel').textContent = listening ? 'Dừng mẫu' : 'Nghe mẫu';
  $('listenBtn').setAttribute('aria-pressed', listening ? 'true' : 'false');
}

function toggle() {
  if (view === 'nhip') state.playing && !play.target ? stop() : start();
  else if (view === 'doc') rd.playing ? rStop() : rStart();
}

function go(path) {
  try { history.pushState(null, '', `#${path}`); } catch (e) {}
  const nextView = VIEWS.includes(path.split('/')[0]) ? path.split('/')[0] : 'nhip';
  if (nextView === view) route(path);
  else transitionView(() => route(path));
}

function route(path = location.hash.replace('#', '')) {
  const [v, g, n] = path.split('/');
  const next = VIEWS.includes(v) ? v : 'nhip';
  if (state.playing) stop();
  if (rd.playing) rStop();
  if (next !== 'nhip') stopCamera();
  const changed = view !== next;
  view = next;
  document.querySelectorAll('.view').forEach((s) => (s.hidden = s.id !== `view-${next}`));
  document.querySelectorAll('.tab').forEach((t) => {
    const on = t.dataset.view === next;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.tabIndex = on ? 0 : -1;
  });
  if (changed) {
    window.scrollTo(0, 0);
    if (!document.startViewTransition) replay($(`view-${next}`), 'enter');
  }
  if (next === 'nhip') setSeqMode(g === 'nghe');
  if (next === 'doc') {
    const grade = BOOKS.some((b) => b.grade === +g) ? +g : rd.grade;
    selectGrade(grade, +n);
  }
  setTitle();
  setPlayUI();
  refreshThumbs();
}

const viewPath = (v) => {
  if (v === 'doc' && rd.reading) return `doc/${rd.reading.grade}/${rd.reading.no}`;
  if (v === 'nhip' && dict.on) return 'nhip/nghe';
  return v;
};
document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => go(viewPath(t.dataset.view))));
$('tab-nhip').parentElement.addEventListener('keydown', (e) => {
  const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (!d) return;
  e.preventDefault();
  const next = VIEWS[(VIEWS.indexOf(view) + d + VIEWS.length) % VIEWS.length];
  go(viewPath(next));
  $(`tab-${next}`).focus();
});
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  go(a.getAttribute('href').slice(1));
});
window.addEventListener('popstate', () => route());

function setPresent(on) {
  document.body.classList.toggle('present', on);
  $('presentBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
  $('presentLabel').textContent = on ? 'Thoát trình chiếu' : 'Trình chiếu';
  if (on && document.documentElement.requestFullscreen && !document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  if (view === 'nhip' && state.playing && lastStep >= 0) requestAnimationFrame(() => placePlayhead(lastStep));
  requestAnimationFrame(() => { layoutGrid(); refreshScore(); });
}
$('presentBtn').addEventListener('click', () => setPresent(!document.body.classList.contains('present')));
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && document.body.classList.contains('present')) setPresent(false);
});

const isTyping = (el) => el instanceof Element && el.closest('input, textarea, select, [contenteditable="true"]');
const isInteractive = (el) => el instanceof Element && el.closest('button, a, input, select, textarea, summary, [role="tab"], [contenteditable="true"]');

document.addEventListener('keydown', (e) => {
  if (isTyping(e.target)) return;
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
    if (view === 'nhip' && undoStack.length) { e.preventDefault(); undo(); }
    return;
  }
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.code === 'Space') {
    if (isInteractive(e.target)) return;
    e.preventDefault();
    if (!e.repeat) toggle();
  } else if (view === 'nhip' && /^[1-3]$/.test(e.key)) {
    toggleMute(LANES[+e.key - 1]);
  } else if (view === 'nhip' && dict.on && (e.key === 'n' || e.key === 'N')) {
    listenTarget();
  } else if (e.key === 'f' || e.key === 'F') {
    setPresent(!document.body.classList.contains('present'));
  }
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'Space' && !isInteractive(e.target)) e.preventDefault();
});

const ICON_MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
const ICON_SUN = '<circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';

function isDark() {
  const t = document.documentElement.dataset.theme;
  return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
}
function setThemeUI() {
  const dark = isDark();
  $('themeIcon').innerHTML = dark ? ICON_SUN : ICON_MOON;
  $('themeBtn').setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
  $('themeBtn').title = $('themeBtn').getAttribute('aria-label');
}
$('themeBtn').addEventListener('click', () => transitionView(() => {
  document.documentElement.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('beatpaper-theme', document.documentElement.dataset.theme); } catch (e) {}
  setThemeUI();
}));
try {
  const saved = localStorage.getItem('beatpaper-theme');
  if (saved) document.documentElement.dataset.theme = saved;
} catch (e) {}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', setThemeUI);

buildMeters();
applyMeter(METER);
layoutGrid();
renderCells();
buildGrades();
buildLegend();
buildBooks();
buildKits();
buildMixer();
setThemeUI();
try {
  const look = localStorage.getItem('beatpaper-look');
  if (['blocks', 'color', 'staff'].includes(look)) {
    rOpt.look = look;
    document.querySelectorAll('[data-look]').forEach((b) =>
      b.setAttribute('aria-pressed', b.dataset.look === look ? 'true' : 'false'));
  }
} catch (e) {}
setupThumbs();
route();

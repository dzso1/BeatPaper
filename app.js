/* =========================================================
   Dữ liệu chung
   ========================================================= */
const $ = (id) => document.getElementById(id);

// Thuật ngữ chỉ nhịp độ (SGK Âm nhạc 7, tr.48), xếp theo BPM tối thiểu
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
  return `${it} · ${vi}`;
}

const BOOKS = [
  { grade: 6, url: 'https://hanhtrangso.nxbgd.vn/ebook/read/am-nhac-6-10772' },
  { grade: 7, url: 'https://taphuan.nxbgd.vn/tap-huan/doc-sach/sgk-am-nhac-7.4700049640#page=0' },
  { grade: 8, url: 'https://taphuan.nxbgd.vn/tap-huan/doc-sach/sgk-am-nhac-8.4700139323' },
  { grade: 9, url: 'https://taphuan.nxbgd.vn/tap-huan/doc-sach/sgk-am-nhac-9.4700486486' },
];

/* Bài đọc nhạc. Cách ghi nốt: Cao độ + quãng tám (C4 = Đô giữa), dấu ":" rồi trường độ
   tính bằng số móc đơn (0.5 = móc kép, 1 = móc đơn, 2 = nốt đen, 3 = đen chấm dôi, 4 = trắng, 6 = trắng chấm dôi).
   bpm tính theo phách của nhịp (3/8: móc đơn, 6/8: đen chấm dôi).
   R = dấu lặng, "~" = dấu nối, "|" = vạch nhịp, "|:" ":|" = dấu nhắc lại, "[1" "[2" = khung thay đổi. */
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

/* =========================================================
   Âm thanh dùng chung: tổng hợp bằng Web Audio API (không cần file mẫu)
   ========================================================= */
let ctx = null;        // AudioContext dùng chung cho cả hai tab
let master = null;     // gain tổng -> compressor -> loa
let noiseBuf = null;   // 1 giây tiếng ồn trắng, dùng lại cho hi-hat và clap

// Khởi tạo AudioContext. Trình duyệt chỉ cho phát tiếng sau một thao tác của người dùng,
// nên hàm này được gọi khi bấm Phát hoặc tô ô, không gọi lúc tải trang.
function initAudio() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.ratio.value = 4;
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(comp).connect(ctx.destination);

    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Mỗi lần phát có một "bus" riêng; khi Dừng thì hạ bus về 0 để tắt ngay các nốt đã hẹn
function openBus() {
  const b = ctx.createGain();
  b.connect(master);
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

// Đường bao âm lượng: tăng rất nhanh rồi tắt dần theo hàm mũ
function envelope(g, t, peak, decay) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
}

// Trống cái (Đỏ): sóng sin trượt từ 150 Hz xuống 45 Hz -> tiếng "bùm" trầm
function kick(t, vel, out) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(150, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.13);
  envelope(g, t, vel, 0.45);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + 0.5);

  // tiếng "cách" rất ngắn ở đầu cho rõ nhát dùi
  const c = ctx.createOscillator();
  const cg = ctx.createGain();
  c.type = 'triangle';
  c.frequency.setValueAtTime(900, t);
  c.frequency.exponentialRampToValueAtTime(200, t + 0.02);
  envelope(cg, t, vel * 0.35, 0.03);
  c.connect(cg).connect(out);
  c.start(t);
  c.stop(t + 0.05);
}

// Hi-hat (Xanh): tiếng ồn trắng qua lọc thông cao -> tiếng "xì" cao, rất ngắn
function hihat(t, vel, out) {
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 7000;
  const pk = ctx.createBiquadFilter();
  pk.type = 'peaking';
  pk.frequency.value = 10000;
  pk.gain.value = 6;
  const g = ctx.createGain();
  envelope(g, t, vel * 0.45, 0.07);
  hp.connect(pk).connect(g).connect(out);
  noise(t, 0.09, hp);
}

// Vỗ tay (Vàng): tiếng ồn qua lọc dải quanh 1.2 kHz, ba nhát dồn rất sát rồi một đuôi ngắn
function clap(t, vel, out) {
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1200;
  bp.Q.value = 0.9;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  [0, 0.011, 0.022].forEach((off) => {
    g.gain.setValueAtTime(vel * 0.9, t + off);
    g.gain.exponentialRampToValueAtTime(vel * 0.15, t + off + 0.009);
  });
  g.gain.setValueAtTime(vel * 0.7, t + 0.033);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  bp.connect(g).connect(out);
  noise(t, 0.25, bp);
}

// Giai điệu: sóng tam giác pha thêm bồi âm quãng 8, tiếng tròn như sáo/kèn phím
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

// Mõ gỗ: dùng khi chỉ luyện tiết tấu
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

// Tiếng gõ phách (máy đếm nhịp): phách mạnh cao hơn
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

/* =========================================================
   Bộ hẹn giờ theo dòng thời gian của AudioContext
   ---------------------------------------------------------
   setInterval/requestAnimationFrame không đủ chính xác để gõ nhịp.
   Thay vào đó, cứ ~25 ms bộ hẹn giờ "thức dậy" một lần và hẹn trước
   mọi âm rơi vào 120 ms sắp tới, với thời điểm tính theo
   ctx.currentTime (đồng hồ của card âm thanh). Âm thanh vì thế
   luôn đúng nhịp, còn phần hình chỉ việc đuổi theo đồng hồ đó.
   ========================================================= */
const TICK_MS = 25;
const SCHEDULE_AHEAD = 0.12;

// Bộ hẹn giờ chạy trong Web Worker để không bị trình duyệt làm chậm khi chuyển tab
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

/* =========================================================
   TAB 1 · Lập trình nhịp (16 ô)
   ========================================================= */
const STEPS = 16;          // 16 phách
const BEATS_PER_BAR = 4;   // nhịp 4/4

// R = Đỏ, B = Xanh dương, Y = Vàng, W = Trắng (phách lặng)
const INSTRUMENTS = {
  R: { name: 'Kick Drum', vi: 'Trống cái', say: 'Bùm' },
  B: { name: 'Hi-Hat',    vi: 'Âm xập xình', say: 'Xì' },
  Y: { name: 'Clap',      vi: 'Vỗ tay',    say: 'Bốp' },
  W: { name: 'Eraser',    vi: 'Phách lặng', say: '·' },
};
const ORDER = ['R', 'B', 'Y', 'W'];

// Mỗi màu còn có một hình riêng, để học sinh khó phân biệt màu vẫn đọc được
const ICONS = {
  R: '<circle cx="12" cy="12" r="9" fill="currentColor"/>',
  B: '<rect x="5.5" y="5.5" width="13" height="13" rx="2" transform="rotate(45 12 12)" fill="currentColor"/>',
  Y: '<path d="M12 3.5 21 19.5H3z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  W: '<path d="M5 19h14M7.5 15.5 15 5l4 3.5-7 9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
};

const PRESETS = [
  { name: 'Mạnh – nhẹ', bpm: 96,  cells: 'RBYB RBYB RBYB RBYB' },
  { name: 'Trống đội',  bpm: 120, cells: 'RWYW RRYW RWYW RRYY' },
  { name: 'Hỏi – đáp',  bpm: 108, cells: 'YYYW BBBW YYYW RRRW' },
];

const state = {
  cells: Array(STEPS).fill('W'),   // mặc định: tất cả là phách lặng
  brush: 'R',
  bpm: 100,
  playing: false,
  preset: -1,
};

const scoreEl = $('score');
let cellEls = [];
let tokEls = [];
let lastStep = -1;

function buildGrid() {
  scoreEl.innerHTML = '';
  const ts = document.createElement('div');
  ts.className = 'timesig';
  ts.innerHTML = `<span>${BEATS_PER_BAR}</span><span>4</span>`;
  scoreEl.appendChild(ts);

  cellEls = [];
  let measure;
  for (let i = 0; i < STEPS; i++) {
    if (i % BEATS_PER_BAR === 0) {
      measure = document.createElement('div');
      measure.className = 'measure';
      measure.innerHTML = '<div class="beats"></div><div class="counts"></div>';
      scoreEl.appendChild(measure);
    }
    const b = document.createElement('button');
    b.className = 'cell';
    b.dataset.i = i;
    measure.querySelector('.beats').appendChild(b);
    cellEls.push(b);

    const c = document.createElement('div');
    const beatNo = (i % BEATS_PER_BAR) + 1;
    c.className = 'count' + (beatNo === 1 ? ' strong' : '');
    c.textContent = beatNo;
    measure.querySelector('.counts').appendChild(c);
  }
}

function renderCells() {
  cellEls.forEach((el, i) => {
    const v = state.cells[i];
    if (el.dataset.v === v) return;
    el.dataset.v = v;
    el.innerHTML = `<span class="num">${i + 1}</span>` +
      (v === 'W' ? '' : `<svg viewBox="0 0 24 24">${ICONS[v]}</svg>`);
    const info = INSTRUMENTS[v];
    el.setAttribute('aria-label', `Ô ${i + 1}: ${v === 'W' ? 'phách lặng' : `${info.name} (${info.vi})`}`);
  });
  renderCode();
}

function buildPalette() {
  const pal = $('palette');
  pal.innerHTML = '';
  ORDER.forEach((k, n) => {
    const info = INSTRUMENTS[k];
    const s = document.createElement('button');
    s.className = 'swatch';
    s.dataset.v = k;
    s.title = `${info.name} – ${info.vi} (phím ${n + 1})`;
    s.innerHTML = `<span class="tile" data-v="${k}"><svg viewBox="0 0 24 24">${ICONS[k]}</svg></span>
      <span class="lbl">${info.name}<span class="sub">${info.vi}</span></span>`;
    s.addEventListener('click', () => setBrush(k));
    pal.appendChild(s);
  });
  setBrush(state.brush);
}

function setBrush(k) {
  state.brush = k;
  document.querySelectorAll('.swatch').forEach((x) =>
    x.setAttribute('aria-pressed', x.dataset.v === k ? 'true' : 'false'));
}

function buildPresets() {
  const box = $('presets');
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

function loadPreset(n) {
  const p = PRESETS[n];
  state.cells = p.cells.replace(/\s/g, '').split('');
  state.preset = n;
  setBpm(p.bpm);
  renderCells();
  markPreset();
}

// Mã lệnh dạng chữ: mỗi ô nhịp một dòng, bọc trong vòng lặp
function renderCode() {
  const lines = [];
  for (let m = 0; m < STEPS / BEATS_PER_BAR; m++) {
    const toks = state.cells.slice(m * BEATS_PER_BAR, (m + 1) * BEATS_PER_BAR)
      .map((v) => `<span class="tok" data-v="${v}">${INSTRUMENTS[v].say}</span>`).join('');
    lines.push(`<div class="line"><span class="cm">ô nhịp ${m + 1}:</span> ${toks}</div>`);
  }
  $('code').innerHTML = `<div><span class="kw">lặp lại mãi</span> {</div>${lines.join('')}<div>}</div>`;
  tokEls = [...$('code').querySelectorAll('.tok')];
  if (lastStep >= 0) tokEls[lastStep].classList.add('now');

  const n = { R: 0, B: 0, Y: 0, W: 0 };
  state.cells.forEach((v) => n[v]++);
  $('tally').innerHTML = ORDER.map((k) =>
    `<span>${k === 'W' ? 'Nghỉ' : INSTRUMENTS[k].say} <b>×${n[k]}</b></span>`).join('');
}

/* ----- Tô màu: chạm một ô hoặc kéo qua nhiều ô ----- */
let painting = false;

function paint(i) {
  const v = state.brush;
  if (state.cells[i] === v) return;
  state.cells[i] = v;
  state.preset = -1;
  renderCells();
  markPreset();
  if (v !== 'W' && !state.playing) audition(v);
}

scoreEl.addEventListener('pointerdown', (e) => {
  const c = e.target.closest('.cell');
  if (!c) return;
  e.preventDefault();
  painting = true;
  paint(+c.dataset.i);
});
// Trên màn hình cảm ứng, pointer bị "giữ" bởi ô đầu tiên, nên tìm ô dưới ngón tay bằng toạ độ
window.addEventListener('pointermove', (e) => {
  if (!painting) return;
  const c = document.elementFromPoint(e.clientX, e.clientY)?.closest?.('.cell');
  if (c) paint(+c.dataset.i);
});
['pointerup', 'pointercancel'].forEach((t) => window.addEventListener(t, () => (painting = false)));
// Bàn phím (Tab + Enter) không sinh pointerdown
scoreEl.addEventListener('click', (e) => {
  const c = e.target.closest('.cell');
  if (c && e.detail === 0) paint(+c.dataset.i);
});

const VOICES = { R: kick, B: hihat, Y: clap };

function playVoice(v, t, vel, out) {
  if (VOICES[v]) VOICES[v](t, vel, out);
}

// Nghe thử khi tô ô (lúc đang dừng)
function audition(v) {
  initAudio();
  playVoice(v, ctx.currentTime + 0.01, 0.9, master);
}

/* ----- Bộ đếm nhịp của bảng 16 ô ----- */
let nextStep = 0;      // phách sẽ được hẹn tiếp theo
let nextTime = 0;      // thời điểm (giây, theo ctx) của phách đó
let queue = [];        // các phách đã hẹn, để phần hình biết thanh quét đang ở đâu
let ticker = null;
let bus = null;
let rafId = 0;

function scheduler() {
  while (nextTime < ctx.currentTime + SCHEDULE_AHEAD) {
    const dur = 60 / state.bpm;
    const beat = nextStep % BEATS_PER_BAR;
    // phách 1 mạnh, phách 3 mạnh vừa, phách 2 và 4 nhẹ
    const vel = beat === 0 ? 1 : beat === 2 ? 0.82 : 0.68;
    playVoice(state.cells[nextStep], nextTime, vel, bus);
    queue.push({ step: nextStep, time: nextTime, dur });
    nextTime += dur;
    nextStep = (nextStep + 1) % STEPS;
  }
}

function start() {
  initAudio();
  bus = openBus();
  nextStep = 0;
  nextTime = ctx.currentTime + 0.06;
  queue = [];
  ticker = ticker || makeTicker(scheduler);
  scheduler();
  ticker.start();
  state.playing = true;
  $('playhead').classList.add('on');
  setPlayUI();
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(draw);
}

function stop() {
  if (ticker) ticker.stop();
  closeBus(bus);
  bus = null;
  state.playing = false;
  queue = [];
  cancelAnimationFrame(rafId);
  setActive(-1);
  $('playhead').classList.remove('on');
  placePlayhead(0, 0);
  $('stepStatus').textContent = `Ô 1 / ${STEPS}`;
  setPlayUI();
}

function setBpm(v) {
  state.bpm = v;
  $('bpm').value = v;
  $('bpmOut').textContent = `${v} BPM`;
  $('tempoTerm').textContent = tempoTerm(v);
}

/* ----- Thanh quét: vẽ lại mỗi khung hình, theo đúng đồng hồ âm thanh ----- */
function placePlayhead(i, frac) {
  const wrap = $('gridWrap').getBoundingClientRect();
  const r = cellEls[i].getBoundingClientRect();
  const ph = $('playhead');
  ph.style.height = `${r.height + 12}px`;
  ph.style.transform = `translate(${r.left - wrap.left + frac * r.width - 1}px, ${r.top - wrap.top - 6}px)`;
}

function setActive(i) {
  if (lastStep >= 0) {
    cellEls[lastStep].classList.remove('active', 'hit');
    tokEls[lastStep]?.classList.remove('now');
  }
  lastStep = i;
  if (i < 0) return;
  const el = cellEls[i];
  el.classList.add('active');
  if (state.cells[i] !== 'W') {
    void el.offsetWidth; // khởi động lại hiệu ứng "nảy"
    el.classList.add('hit');
  }
  tokEls[i]?.classList.add('now');
  $('stepStatus').textContent = `Ô ${i + 1} / ${STEPS}`;
}

function draw() {
  rafId = requestAnimationFrame(draw);
  const now = ctx.currentTime;
  // bỏ các phách đã qua, giữ lại phách đang vang
  while (queue.length > 1 && queue[1].time <= now) queue.shift();
  const cur = queue[0];
  if (!cur || cur.time > now) return;
  const frac = Math.min((now - cur.time) / cur.dur, 1);
  placePlayhead(cur.step, frac);
  if (cur.step !== lastStep) setActive(cur.step);
}

$('playBtn').addEventListener('click', () => (state.playing ? stop() : start()));
$('bpm').addEventListener('input', (e) => setBpm(+e.target.value));
$('clearBtn').addEventListener('click', () => {
  state.cells = Array(STEPS).fill('W');
  state.preset = -1;
  renderCells();
  markPreset();
});
window.addEventListener('resize', () => { if (!state.playing && view === 'nhip') placePlayhead(0, 0); });

/* ----- Camera quét dải giấy 16 chấm màu ----- */
const video = $('video');
const overlay = $('overlay');
const work = $('work');
const wctx = work.getContext('2d', { willReadFrequently: true });
const octx = overlay.getContext('2d');

const WORK_W = 480, WORK_H = 360;   // ảnh thu nhỏ để phân tích, đủ chi tiết cho 16 ô
const COLOR_RULES = {
  minSat: 0.30,                       // dưới mức này coi là giấy trắng / xám
  minVal: 0.28,                       // tối quá thì bỏ qua (bóng đổ)
  red:    [[0, 18], [330, 360]],      // khoảng màu (độ) theo HSV
  yellow: [[35, 70]],
  blue:   [[180, 255]],
};
const MIN_COVER = 0.22;   // tỉ lệ điểm ảnh cùng màu tối thiểu để nhận là có chấm
const STABLE_FRAMES = 4;  // một màu phải giữ nguyên vài khung hình mới đưa vào bảng
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

// 16 ô khung xếp ngang trên ảnh, cao độ theo thanh "Vị trí dải"
function zones() {
  const marginX = WORK_W * 0.04;
  const zw = (WORK_W - marginX * 2) / STEPS;
  const size = Math.floor(Math.min(zw * 0.8, WORK_H * 0.2));
  const cy = WORK_H * ($('stripY').value / 100);
  return [...Array(STEPS).keys()].map((i) => ({
    x: Math.round(marginX + zw * i + (zw - size) / 2),
    y: Math.round(cy - size / 2),
    w: size, h: size,
  }));
}

// Mỗi ô: đếm phiếu màu của các điểm ảnh, màu thắng phải phủ đủ diện tích
function classifyZone(data, z) {
  const votes = { R: 0, B: 0, Y: 0 };
  let total = 0;
  for (let y = z.y; y < z.y + z.h; y += 2) {
    for (let x = z.x; x < z.x + z.w; x += 2) {
      const p = (y * WORK_W + x) * 4;
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
    const raw = classifyZone(data, z);
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
  if (changed) { state.preset = -1; renderCells(); markPreset(); }
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
    octx.fillText(String(i + 1), z.x + 1, z.y - 4);
  });
}

function buildDetChips() {
  const box = $('detChips');
  box.innerHTML = '';
  for (let i = 0; i < STEPS; i++) box.appendChild(document.createElement('span'));
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
  $('camEmpty').hidden = false;
  $('camBtn').textContent = 'Bật camera';
  $('camStatus').textContent = 'Đang tắt';
}

async function toggleCamera() {
  if (camStream) { stopCamera(); return; }
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
    $('camBtn').textContent = 'Tắt camera';
    $('camStatus').textContent = 'Đang quét';
    camTimer = setInterval(scanFrame, SCAN_MS);
  } catch (e) {
    camStream = null;
    $('camStatus').textContent = 'Không mở được camera';
    $('camEmpty').textContent = 'Không truy cập được camera. Hãy cho phép quyền camera và mở trang qua https, localhost hoặc mở trực tiếp tệp trên máy.';
  }
}

$('camBtn').addEventListener('click', toggleCamera);

/* =========================================================
   TAB 2 · Bài đọc nhạc
   ========================================================= */
const SOLFA = { C: 'Đô', D: 'Rê', E: 'Mi', F: 'Fa', G: 'Son', A: 'La', B: 'Si' };
const LETTERS = 'CDEFGAB';
const SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

const rOpt = { mode: 'melody', countIn: true, click: true, loop: false };
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

// 2/4, 3/4, 4/4 -> phách là nốt đen (2 móc đơn); 3/8 -> móc đơn; 6/8 -> đen chấm dôi (3 móc đơn)
function meterInfo(meter) {
  const [n, d] = meter.split('/').map(Number);
  const compound = d === 8 && n % 3 === 0 && n > 3;
  return { n, d, barLen: n * 8 / d, beatLen: compound ? 3 : 8 / d };
}

// Chuỗi nốt -> danh sách ô nhịp (kèm dấu nhắc lại và khung thay đổi)
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

// Trải phẳng dấu nhắc lại: thứ tự các ô nhịp thực sự được phát
function expand(bars) {
  const out = [];
  let i = 0, repStart = 0, second = false, inVolta1 = false;
  while (i < bars.length) {
    const b = bars[i];
    if (b.volta === 1) inVolta1 = true;
    if (b.volta === 2) { inVolta1 = false; second = false; }
    if (second && inVolta1) { i++; continue; }      // lần 2 bỏ qua khung 1
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

// Dựng dòng thời gian: nốt (đã gộp dấu nối), phách gõ, ô sáng
function buildTimeline() {
  const { bars, mi } = rd;
  const events = [];
  // đếm vào một ô nhịp trước khi bắt đầu
  const beatsPerBar = Math.round(mi.barLen / mi.beatLen);
  for (let k = 0; k < beatsPerBar; k++) {
    events.push({ start: -mi.barLen + k * mi.beatLen, type: 'count', strong: k === 0, n: k + 1 });
  }
  let pos = 0;
  let held = null;
  expand(bars).forEach((bi) => {
    const bar = bars[bi];
    const off = bi === 0 && bar.len < mi.barLen ? mi.barLen - bar.len : 0;   // ô nhịp lấy đà
    for (let b = 0; b < mi.barLen - 1e-6; b += mi.beatLen) {
      const p = b - off;
      if (p > -1e-6 && p < bar.len - 1e-6) events.push({ start: pos + p, type: 'beat', strong: b === 0 });
    }
    events.push({ start: pos, type: 'bar', bar: bi });
    let x = pos;
    bar.items.forEach((it) => {
      events.push({ start: x, type: 'vis', el: it.el });
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

// Vẽ bản nhạc: mỗi ô nhịp là một khung, nốt là ô màu dài theo trường độ, cao theo cao độ
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
  const laneH = parseFloat(getComputedStyle(box).getPropertyValue('--lane')) || 104;
  const yOf = (step) => ((hi + pad - step) / span) * (laneH - 24);

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
        n.style.top = `${(laneH - 24) / 2}px`;
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
        n.title = name + (it.oct >= 5 ? ' (cao)' : it.oct <= 3 ? ' (thấp)' : '');
      }
      // nốt được nối từ ô nhịp trước sang
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
}
const lastItemOf = (bar) => bar && bar.items[bar.items.length - 1];

function readingsOf(grade) {
  return READINGS.filter((r) => r.grade === grade).sort((a, b) => a.no - b.no);
}
function bookOf(grade) { return BOOKS.find((b) => b.grade === grade); }
function readingTitle(r) { return `Bài đọc nhạc số ${r.no}`; }

function buildGrades() {
  const box = $('grades');
  box.innerHTML = BOOKS.map((b) =>
    `<button role="tab" data-grade="${b.grade}" aria-selected="false">Lớp ${b.grade}</button>`).join('');
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-grade]');
    if (b) selectGrade(+b.dataset.grade);
  });
}

function selectGrade(grade, no) {
  rd.grade = grade;
  [...$('grades').children].forEach((b) =>
    b.setAttribute('aria-selected', +b.dataset.grade === grade ? 'true' : 'false'));
  const list = readingsOf(grade);
  const box = $('rlist');
  if (!list.length) {
    box.innerHTML = `<div class="empty">Lớp ${grade} chưa có bài đọc nhạc trong ứng dụng.
      <a href="${bookOf(grade).url}" target="_blank" rel="noopener">Mở SGK Âm nhạc ${grade} ↗</a></div>`;
    return;
  }
  box.innerHTML = list.map((r) => `
    <button class="ritem" data-no="${r.no}">
      <span class="no">${r.no}</span>
      <span class="t">${r.name || readingTitle(r)}</span>
      <span class="m">${r.name ? readingTitle(r) + ' · ' : ''}${r.meter} · tr. ${r.page}</span>
    </button>`).join('');
  const pick = list.find((r) => r.no === no) || list[0];
  selectReading(pick);
}

$('rlist').addEventListener('click', (e) => {
  const b = e.target.closest('.ritem');
  if (b) selectReading(readingsOf(rd.grade).find((r) => r.no === +b.dataset.no));
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
    // trên màn hình hẹp danh sách cuộn ngang: đưa bài đang chọn vào tầm nhìn
    if (on && list.scrollWidth > list.clientWidth) list.scrollLeft = b.offsetLeft - list.offsetLeft - 4;
  });
  $('rTitle').innerHTML = readingTitle(r) + (r.name ? ` · <em>${r.name}</em>` : '');
  const book = bookOf(r.grade);
  $('rTags').innerHTML = [
    `Nhịp ${r.meter}`, r.key, r.tempo, r.origin, r.topic, r.remark,
  ].filter(Boolean).map((t) => `<span class="tag">${t}</span>`).join('') +
    `<a class="tag" href="${book.url}" target="_blank" rel="noopener">SGK Âm nhạc ${r.grade} · tr. ${r.page} ↗</a>`;
  setRBpm(r.bpm);
  renderScore();
  buildTimeline();
  rStatusIdle();
  if (view === 'doc') try { history.replaceState(null, '', `#doc/${r.grade}/${r.no}`); } catch (e) {}
}

function rStatusIdle() {
  const n = rd.bars.length;
  $('rStatus').textContent = `${n} ô nhịp`;
}

function setRBpm(v) {
  rd.bpm = v;
  $('rBpm').value = v;
  $('rBpmOut').textContent = `${v} BPM`;
  // thuật ngữ nhịp độ tính theo nốt đen; nhịp x/8 thì ghi rõ phách là nốt gì
  $('rTempoTerm').textContent = rd.mi.d === 8
    ? `1 phách = ${rd.mi.beatLen === 3 ? 'đen chấm dôi' : 'móc đơn'}`
    : tempoTerm(v);
}

// giây cho một móc đơn ở tempo hiện tại (tempo tính theo phách)
const spe = () => 60 / (rd.bpm * rd.mi.beatLen);

// Hẹn trước các sự kiện trong 120 ms tới (giống bảng 16 ô, nhưng chạy theo danh sách sự kiện)
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
  else if (e.type === 'vis') rd.drawQ.push({ t, el: e.el });
  else if (e.type === 'bar') rd.drawQ.push({ t, bar: e.bar });
}

function rStart() {
  initAudio();
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
  cancelAnimationFrame(rRaf);
  rRaf = requestAnimationFrame(rDraw);
}

function rStop() {
  if (rTicker) rTicker.stop();
  closeBus(rd.bus);
  rd.bus = null;
  rd.playing = false;
  rd.drawQ = [];
  cancelAnimationFrame(rRaf);
  if (rd.cur) rd.cur.classList.remove('now');
  rd.cur = null;
  rStatusIdle();
  setPlayUI();
}

function rDraw() {
  rRaf = requestAnimationFrame(rDraw);
  const now = ctx.currentTime;
  while (rd.drawQ.length && rd.drawQ[0].t <= now) {
    const d = rd.drawQ.shift();
    if (d.count) $('rStatus').textContent = `Đếm vào: ${d.count}`;
    else if (d.bar !== undefined) $('rStatus').textContent = `Ô nhịp ${d.bar + 1} / ${rd.bars.length}`;
    else if (d.el) {
      if (rd.cur) rd.cur.classList.remove('now');
      rd.cur = d.el;
      d.el.classList.add('now');
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
    '<span class="note">Chấm trên ô: nốt ở quãng tám cao · chấm dưới ô: quãng tám thấp · ô mờ: ngân tiếp (dấu nối) · vạch mờ trong ô nhịp: các phách.</span>';
}

/* =========================================================
   TAB 3 · Sách giáo khoa
   ========================================================= */
function buildBooks() {
  $('books').innerHTML = BOOKS.map((b) => {
    const n = readingsOf(b.grade).length;
    return `<div class="book g${b.grade}">
      <div class="cover">
        <div class="big">${b.grade}</div>
        <div class="name">Âm nhạc ${b.grade}</div>
        <div class="series">Kết nối tri thức với cuộc sống</div>
        <div class="cnt">${n ? `${n} bài đọc nhạc trong ứng dụng` : 'Bài đọc nhạc: đang cập nhật'}</div>
        <div class="acts">
          ${n ? `<a class="pill dark" href="#doc/${b.grade}">Luyện bài đọc nhạc</a>` : ''}
          <a class="pill" href="${b.url}" target="_blank" rel="noopener">Mở sách điện tử ↗</a>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* =========================================================
   Chuyển tab, nút Phát trên cùng, phím tắt, giao diện sáng / tối
   ========================================================= */
let view = 'nhip';

function isPlaying() { return view === 'nhip' ? state.playing : view === 'doc' ? rd.playing : false; }
function toggle() {
  if (view === 'nhip') state.playing ? stop() : start();
  else if (view === 'doc') rd.playing ? rStop() : rStart();
}

function setPlayUI() {
  $('playIcon').innerHTML = state.playing ? ICON_STOP : ICON_PLAY;
  $('playBtn').setAttribute('aria-label', state.playing ? 'Dừng' : 'Phát');
  $('rPlayIcon').innerHTML = rd.playing ? ICON_STOP : ICON_PLAY;
  $('rPlayBtn').setAttribute('aria-label', rd.playing ? 'Dừng' : 'Phát');
  const p = isPlaying();
  $('topPlay').hidden = view === 'sgk';
  $('topPlay').innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24">${p ? ICON_STOP : ICON_PLAY}</svg>${p ? 'Dừng' : 'Phát'}`;
}

// Đường dẫn: #nhip, #doc, #doc/7, #doc/7/3, #sgk
function go(path) {
  try { history.pushState(null, '', `#${path}`); } catch (e) {}
  route(path);
}

function route(path = location.hash.replace('#', '')) {
  const [v, g, n] = path.split('/');
  const next = ['nhip', 'doc', 'sgk'].includes(v) ? v : 'nhip';
  if (state.playing) stop();
  if (rd.playing) rStop();
  if (next !== 'nhip') stopCamera();
  view = next;
  document.querySelectorAll('.view').forEach((s) => (s.hidden = s.id !== `view-${next}`));
  document.querySelectorAll('.tab').forEach((t) =>
    t.setAttribute('aria-selected', t.dataset.view === next ? 'true' : 'false'));
  if (next === 'doc') {
    const grade = BOOKS.some((b) => b.grade === +g) ? +g : rd.grade;
    selectGrade(grade, +n);
  }
  if (next === 'nhip') placePlayhead(0, 0);
  setPlayUI();
}

document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
  go(t.dataset.view === 'doc' && rd.reading ? `doc/${rd.reading.grade}/${rd.reading.no}` : t.dataset.view);
}));
// Liên kết nội bộ (#doc/6, logo…) đi qua go() để chạy được cả khi trang mở dạng tệp
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  go(a.getAttribute('href').slice(1));
});
window.addEventListener('popstate', () => route());
$('topPlay').addEventListener('click', toggle);

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.code === 'Space') {
    e.preventDefault();
    if (!e.repeat) toggle();
  } else if (view === 'nhip' && /^[1-4]$/.test(e.key)) {
    setBrush(ORDER[+e.key - 1]);
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

buildGrid();
buildPalette();
buildPresets();
renderCells();
setBpm(state.bpm);
buildDetChips();
buildGrades();
buildLegend();
buildBooks();
route();

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
  return `${it} (${vi.toLowerCase()})`;
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
   Giao diện dùng chung: thông báo ngắn, thông báo cho trình đọc màn hình
   ========================================================= */
let view = 'nhip';
let toastTimer = 0;

// Thông báo ngắn ở cuối màn hình, có thể kèm một nút (ví dụ "Hoàn tác")
function showToast(msg, actLabel = '', act = null) {
  $('toastMsg').textContent = msg;
  $('toastAct').textContent = actLabel;
  $('toastAct').onclick = act ? () => { hideToast(); act(); } : null;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 6000);
}
function hideToast() { $('toast').hidden = true; }

// Đọc cho trình đọc màn hình những sự kiện quan trọng (không đọc từng phách)
function announce(msg) {
  const a = $('announcer');
  a.textContent = '';
  setTimeout(() => (a.textContent = msg), 40);
}

// Mở âm thanh. Trình duyệt có thể chặn tới khi người dùng chạm vào trang.
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

// Chạy lại một hiệu ứng CSS ngắn trên phần tử
function replay(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

/* =========================================================
   TAB 1 · Lập trình nhịp (16 phách)
   ========================================================= */
const STEPS = 16;          // 16 phách
const BEATS_PER_BAR = 4;   // nhịp 4/4

// R = đỏ, B = xanh dương, Y = vàng, W = để trắng (phách lặng)
const INSTRUMENTS = {
  R: { name: 'Trống cái', say: 'bùm' },
  B: { name: 'Chũm chọe', say: 'xì' },
  Y: { name: 'Vỗ tay',    say: 'bốp' },
  W: { name: 'Lặng',      say: 'tẩy về phách lặng' },
};
const ORDER = ['R', 'B', 'Y', 'W'];

// Mỗi nhạc cụ một hình, để học sinh khó phân biệt màu vẫn đọc được
const ICONS = {
  R: '<circle cx="12" cy="12" r="9.5" fill="currentColor"/>',
  B: '<rect x="5" y="5" width="14" height="14" rx="1.5" transform="rotate(45 12 12)" fill="currentColor"/>',
  Y: '<path d="M12 2.8 21.5 20H2.5z" fill="currentColor" style="stroke:var(--yellow-edge)" stroke-width="1.6" stroke-linejoin="round"/>',
  W: '<rect x="4.5" y="4.5" width="15" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 2.5"/>',
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
let lastStep = -1;
let focusIdx = 0;          // ô đang giữ tabindex=0 (di chuyển bằng phím mũi tên)

function buildGrid() {
  scoreEl.innerHTML = '';
  const ts = document.createElement('div');
  ts.className = 'timesig';
  ts.setAttribute('aria-hidden', 'true');
  ts.innerHTML = `<span>${BEATS_PER_BAR}</span><span>4</span>`;
  scoreEl.appendChild(ts);

  cellEls = [];
  let measure;
  for (let i = 0; i < STEPS; i++) {
    if (i % BEATS_PER_BAR === 0) {
      measure = document.createElement('div');
      measure.className = 'measure';
      measure.innerHTML = '<div class="beats"></div><div class="counts" aria-hidden="true"></div>';
      scoreEl.appendChild(measure);
    }
    const b = document.createElement('button');
    b.className = 'cell';
    b.dataset.i = i;
    b.tabIndex = i === focusIdx ? 0 : -1;
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
    const first = !el.dataset.v;
    el.dataset.v = v;
    el.innerHTML = v === 'W' ? '' : `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[v]}</svg>`;
    el.setAttribute('aria-label', `Phách ${i + 1}: ${v === 'W' ? 'lặng' : INSTRUMENTS[v].name}`);
    if (!first) replay(el, 'pop');
  });
  // Gợi ý chỉ cần khi lưới còn trống; giữ chỗ để lưới không nhảy dưới ngón tay
  $('gridHint').classList.toggle('is-hidden', state.cells.some((v) => v !== 'W'));
}

function buildPalette() {
  const pal = $('palette');
  pal.innerHTML = ORDER.map((k, n) => {
    const info = INSTRUMENTS[k];
    return `<button class="inst" role="radio" data-v="${k}" aria-checked="false" title="${k === 'W' ? 'Tẩy về phách lặng' : info.name}">
      <svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>
      <span><b>${info.name}</b><small>${info.say}</small></span>
      <kbd aria-hidden="true">${n + 1}</kbd>
    </button>`;
  }).join('');
  pal.addEventListener('click', (e) => {
    const b = e.target.closest('.inst');
    if (b) setBrush(b.dataset.v);
  });
  // Nhóm radio: mũi tên trái/phải đổi nhạc cụ
  pal.addEventListener('keydown', (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const k = ORDER[(ORDER.indexOf(state.brush) + d + ORDER.length) % ORDER.length];
    setBrush(k);
    pal.querySelector(`[data-v="${k}"]`).focus();
  });
  setBrush(state.brush);
}

function setBrush(k) {
  state.brush = k;
  $('palette').querySelectorAll('.inst').forEach((x) => {
    const on = x.dataset.v === k;
    x.setAttribute('aria-checked', on ? 'true' : 'false');
    x.tabIndex = on ? 0 : -1;
  });
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

/* ----- Hoàn tác: lưu trạng thái trước mỗi thao tác thay đổi lưới ----- */
const undoStack = [];
const snapshot = () => ({ cells: state.cells.slice(), bpm: state.bpm, preset: state.preset });

function pushUndo(snap = snapshot()) {
  undoStack.push(snap);
  if (undoStack.length > 20) undoStack.shift();
  $('undoBtn').disabled = false;
}

function undo() {
  const s = undoStack.pop();
  if (!s) return;
  state.cells = s.cells;
  state.preset = s.preset;
  setBpm(s.bpm);
  renderCells();
  markPreset();
  $('undoBtn').disabled = !undoStack.length;
  hideToast();
  announce('Đã hoàn tác');
}

function loadPreset(n) {
  const p = PRESETS[n];
  pushUndo();
  state.cells = p.cells.replace(/\s/g, '').split('');
  state.preset = n;
  setBpm(p.bpm);
  renderCells();
  markPreset();
  showToast(`Đã nạp mẫu ${p.name}`, 'Hoàn tác', undo);
}

function clearAll() {
  if (state.cells.every((v) => v === 'W')) return;
  pushUndo();
  state.cells = Array(STEPS).fill('W');
  state.preset = -1;
  renderCells();
  markPreset();
  showToast('Đã xoá hết 16 phách', 'Hoàn tác', undo);
}

/* ----- Tô màu: chạm một ô, hoặc kéo ngang qua nhiều ô ----- */
let stroke = null;       // nhạc cụ đang tô trong một nét kéo
let strokeSnap = null;   // trạng thái trước nét kéo, chỉ lưu vào hoàn tác khi có ô thật sự đổi

function paintCell(i, v) {
  if (state.cells[i] === v) return;
  if (strokeSnap) { pushUndo(strokeSnap); strokeSnap = null; }
  state.cells[i] = v;
  state.preset = -1;
  renderCells();
  markPreset();
  if (v !== 'W' && !state.playing) audition(v);
}

// Chạm vào ô đã có đúng nhạc cụ đang chọn thì ô đó trở về phách lặng
function beginStroke(i) {
  strokeSnap = snapshot();
  stroke = state.cells[i] === state.brush && state.brush !== 'W' ? 'W' : state.brush;
  paintCell(i, stroke);
  setFocusCell(i, false);
}

scoreEl.addEventListener('pointerdown', (e) => {
  const c = e.target.closest('.cell');
  if (!c || e.button > 0) return;
  e.preventDefault();
  beginStroke(+c.dataset.i);
});
// Trên màn hình cảm ứng, pointer bị "giữ" bởi ô đầu tiên, nên tìm ô dưới ngón tay bằng toạ độ
window.addEventListener('pointermove', (e) => {
  if (!stroke) return;
  const c = document.elementFromPoint(e.clientX, e.clientY)?.closest?.('.cell');
  if (c) paintCell(+c.dataset.i, stroke);
});
['pointerup', 'pointercancel'].forEach((t) => window.addEventListener(t, () => { stroke = null; strokeSnap = null; }));
// Bàn phím: Enter/Space trên ô tạo "click" không có pointerdown
scoreEl.addEventListener('click', (e) => {
  const c = e.target.closest('.cell');
  if (c && e.detail === 0) { beginStroke(+c.dataset.i); stroke = null; strokeSnap = null; }
});

// Lưới chỉ có một điểm dừng Tab; mũi tên, Home, End di chuyển giữa các phách
function setFocusCell(i, move = true) {
  cellEls[focusIdx].tabIndex = -1;
  focusIdx = i;
  cellEls[i].tabIndex = 0;
  if (move) cellEls[i].focus();
}
scoreEl.addEventListener('keydown', (e) => {
  const c = e.target.closest('.cell');
  if (!c) return;
  const i = +c.dataset.i;
  const map = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + BEATS_PER_BAR, ArrowUp: i - BEATS_PER_BAR, Home: 0, End: STEPS - 1 };
  if (!(e.key in map)) return;
  e.preventDefault();
  setFocusCell(Math.max(0, Math.min(STEPS - 1, map[e.key])));
});

const VOICES = { R: kick, B: hihat, Y: clap };

function playVoice(v, t, vel, out) {
  if (VOICES[v]) VOICES[v](t, vel, out);
}

// Nghe thử khi tô ô (lúc đang dừng)
function audition(v) {
  if (!ensureAudio()) return;
  playVoice(v, ctx.currentTime + 0.01, 0.9, master);
}

/* ----- Bộ đếm nhịp của dải 16 phách ----- */
let nextStep = 0;      // phách sẽ được hẹn tiếp theo
let nextTime = 0;      // thời điểm (giây, theo ctx) của phách đó
let queue = [];        // các phách đã hẹn, để phần hình biết con trỏ đang ở đâu
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
  if (!ensureAudio()) return;
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
  announce('Đang phát');
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
  setStepStatus(0);
  setPlayUI();
  announce('Đã dừng');
}

function setBpm(v) {
  state.bpm = v;
  $('bpm').value = v;
  $('bpmOut').textContent = `${v} phách/phút`;
  $('tempoTerm').textContent = tempoTerm(v);
}

function setStepStatus(i) {
  $('stepStatus').textContent = `Phách ${i + 1} / ${STEPS} · Ô nhịp ${Math.floor(i / BEATS_PER_BAR) + 1}`;
}

/* ----- Con trỏ phách: vạch mực dưới ô đang vang, theo đúng đồng hồ âm thanh ----- */
function placePlayhead(i) {
  const wrap = $('gridWrap').getBoundingClientRect();
  const r = cellEls[i].getBoundingClientRect();
  const ph = $('playhead');
  ph.style.width = `${r.width}px`;
  ph.style.transform = `translate(${r.left - wrap.left}px, ${r.bottom - wrap.top + 4}px)`;
}

function setActive(i) {
  if (lastStep >= 0) cellEls[lastStep].classList.remove('active', 'hit');
  lastStep = i;
  if (i < 0) return;
  const el = cellEls[i];
  el.classList.add('active');
  if (state.cells[i] !== 'W') replay(el, 'hit');
  placePlayhead(i);
  setStepStatus(i);
}

function draw() {
  rafId = requestAnimationFrame(draw);
  const now = ctx.currentTime;
  // bỏ các phách đã qua, giữ lại phách đang vang
  while (queue.length > 1 && queue[1].time <= now) queue.shift();
  const cur = queue[0];
  if (cur && cur.time <= now && cur.step !== lastStep) setActive(cur.step);
}

$('playBtn').addEventListener('click', () => (state.playing ? stop() : start()));
$('bpm').addEventListener('input', (e) => setBpm(+e.target.value));
$('clearBtn').addEventListener('click', clearAll);
$('undoBtn').addEventListener('click', undo);
window.addEventListener('resize', () => { if (state.playing && lastStep >= 0) placePlayhead(lastStep); });

/* ----- Quét dải giấy: camera chỉ xem trước, ghi vào lưới khi người dùng bấm ----- */
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
const STABLE_FRAMES = 4;  // một màu phải giữ nguyên vài khung hình mới tính
const MIN_DOTS = 3;       // ít nhất bấy nhiêu chấm màu mới coi là đang thấy dải giấy
const SCAN_MS = 70;

let camStream = null;
let camTimer = 0;
const camHist = [];
let detected = [];
let stripReady = false;

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

// 16 ô khung xếp ngang trên ảnh, cao độ theo thanh "Dời khung quét"
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
    ? `Thấy ${dots} phách có màu. Bấm “Ghi vào bảng nhịp” để chép vào lưới.`
    : 'Đưa dải giấy vào khung và giữ yên…';
}

function writeFromCamera() {
  if (!stripReady) return;
  const next = detected.slice(0, STEPS).map((v) => v || 'W');
  const changed = next.map((v, i) => v !== state.cells[i]);
  if (!changed.some(Boolean)) { showToast('Lưới đã giống dải giấy.'); return; }
  pushUndo();
  state.cells = next;
  state.preset = -1;
  renderCells();
  markPreset();
  changed.forEach((c, i) => c && replay(cellEls[i], 'cam-flash'));
  const n = next.filter((v) => v !== 'W').length;
  showToast(`Đã ghi ${n} phách từ dải giấy`, 'Hoàn tác', undo);
  announce(`Đã ghi ${n} phách từ dải giấy`);
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
    octx.fillStyle = 'rgba(255,255,255,.95)';
    octx.font = '600 11px system-ui';
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
  setStripReady(false, 0);
  $('camHint').textContent = 'Bật camera để bắt đầu.';
  $('camEmpty').hidden = false;
  $('camBtn').textContent = 'Bật camera';
  $('camStatus').textContent = 'Camera đang tắt';
}

// Câu lỗi theo đúng nguyên nhân, kèm cách khắc phục
const CAM_ERRORS = {
  NotAllowedError: 'Camera đang bị chặn. Bấm biểu tượng ổ khoá cạnh địa chỉ trang → Cho phép camera, rồi thử lại.',
  SecurityError: 'Camera đang bị chặn. Bấm biểu tượng ổ khoá cạnh địa chỉ trang → Cho phép camera, rồi thử lại.',
  NotFoundError: 'Máy này không có camera.',
  OverconstrainedError: 'Máy này không có camera phù hợp.',
  NotReadableError: 'Camera đang được ứng dụng khác dùng. Tắt Zoom/Meet rồi thử lại.',
};

async function toggleCamera() {
  if (camStream) { stopCamera(); return; }
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
    work.width = WORK_W; work.height = WORK_H;
    $('camEmpty').hidden = true;
    $('camBtn').textContent = 'Tắt camera';
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

// Mẫu dải giấy 16 ô để in (khổ A4 ngang), tạo ngay trên máy
function buildStripDownload() {
  const cell = 14, gap = 3, groupGap = 7, x0 = 10;
  let x = x0, rects = '', nums = '';
  for (let i = 0; i < STEPS; i++) {
    rects += `<rect x="${x}" y="14" width="${cell}" height="${cell}" rx="1.5" fill="#fff" stroke="#555" stroke-width="0.4"/>`;
    nums += `<text x="${x + cell / 2}" y="34" font-size="3.6" text-anchor="middle" fill="#555"${i % 4 === 0 ? ' font-weight="700"' : ''}>${(i % 4) + 1}</text>`;
    x += cell + (i % 4 === 3 ? groupGap : gap);
  }
  const w = 297;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}mm" height="44mm" viewBox="0 0 ${w} 44" font-family="Arial, sans-serif">
<text x="${x0}" y="9" font-size="4" fill="#333">BeatPaper · dải 16 phách (4 ô nhịp 4/4) · tô chấm đỏ = trống cái, xanh = chũm chọe, vàng = vỗ tay, để trắng = lặng</text>
${rects}${nums}</svg>`;
  $('stripDl').href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
}

$('camBtn').addEventListener('click', toggleCamera);
$('camWrite').addEventListener('click', writeFromCamera);

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

// Dựng dòng thời gian: nốt (đã gộp dấu nối), phách gõ, nốt sáng
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

// Đổi một biến CSS độ dài (có thể là clamp(), vh…) ra số px bằng một phần tử đo tạm
function cssPx(el, name, fallback) {
  const probe = document.createElement('div');
  probe.style.cssText = `position:absolute;visibility:hidden;width:0;height:var(${name})`;
  el.appendChild(probe);
  const h = probe.getBoundingClientRect().height;
  probe.remove();
  return h || fallback;
}

// Vẽ bản nhạc: mỗi ô nhịp một khung, nốt là khối màu dài theo trường độ, cao theo cao độ
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
        n.title = name + (it.oct >= 5 ? ' (quãng tám cao)' : it.oct <= 3 ? ' (quãng tám thấp)' : '');
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
  // Bản nhạc dạng chữ cho trình đọc màn hình
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
// Chuẩn hoá dòng tác giả về dạng "Nhạc: …"
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
      <span class="t">${r.name || topicName(r)}</span>
      <span class="m">${r.meter} · tr. ${r.page}<span class="dots" aria-hidden="true">${dots}</span></span>
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
    // trên màn hình hẹp danh sách cuộn ngang: đưa bài đang chọn vào tầm nhìn
    if (on && list.scrollWidth > list.clientWidth) list.scrollLeft = b.parentElement.offsetLeft - list.offsetLeft - 4;
  });
  $('rTitle').textContent = readingTitle(r) + (r.name ? ` · ${r.name}` : '');
  const book = bookOf(r.grade);
  $('rMeta').innerHTML = [originText(r), r.key, `Nhịp ${r.meter}`, r.remark].filter(Boolean).join(' · ') +
    ` · <a href="${book.url}" target="_blank" rel="noopener">SGK Âm nhạc ${r.grade}, tr. ${r.page} ↗</a>`;
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
  renderScore();
  buildTimeline();
}

function rStatusIdle() {
  $('rStatus').textContent = `${rd.bars.length} ô nhịp`;
}

function setRBpm(v) {
  rd.bpm = v;
  $('rBpm').value = v;
  $('rBpmOut').textContent = `${v} phách/phút`;
  // Nhịp x/8: ghi rõ phách là nốt gì. Còn lại: ghi chỉ dẫn nhịp độ in trong sách.
  $('rTempoTerm').textContent = rd.mi.d === 8
    ? `1 phách = ${rd.mi.beatLen === 3 ? 'nốt đen chấm dôi' : 'nốt móc đơn'}`
    : `Sách ghi: ${rd.reading ? rd.reading.tempo : tempoTerm(v)}`;
}

// giây cho một móc đơn ở nhịp độ hiện tại (nhịp độ tính theo phách)
const spe = () => 60 / (rd.bpm * rd.mi.beatLen);

// Hẹn trước các sự kiện trong 120 ms tới (giống dải 16 phách, nhưng chạy theo danh sách sự kiện)
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
  if (rd.cur) rd.cur.classList.remove('now');
  rd.cur = null;
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
    } else if (d.el) {
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
    '<span class="sep x">·</span><span class="x">• trên nốt: quãng tám cao</span>' +
    '<span class="x">• dưới nốt: quãng tám thấp</span>' +
    '<span class="x">nốt mờ: ngân tiếp (dấu nối)</span>';
}

/* =========================================================
   TAB 3 · Sách giáo khoa
   ========================================================= */
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
        ${n ? `<a class="btn primary" href="#doc/${b.grade}">Luyện đọc nhạc</a>` : ''}
        <a class="btn" href="${b.url}" target="_blank" rel="noopener">Mở sách điện tử ↗</a>
      </div>
    </li>`;
  }).join('');
}

/* =========================================================
   Chuyển tab, trình chiếu, phím tắt, giao diện sáng / tối
   ========================================================= */
const VIEWS = ['nhip', 'doc', 'sgk'];
const VIEW_TITLES = { nhip: 'Lập trình nhịp', doc: 'Bài đọc nhạc', sgk: 'Sách giáo khoa' };

function setTitle() {
  const r = rd.reading;
  document.title = (view === 'doc' && r
    ? `${readingTitle(r)} – Lớp ${r.grade}`
    : VIEW_TITLES[view]) + ' · BeatPaper';
}

function setPlayUI() {
  [['playIcon', 'playLabel', state.playing], ['rPlayIcon', 'rPlayLabel', rd.playing]].forEach(([icon, label, on]) => {
    $(icon).innerHTML = on ? ICON_STOP : ICON_PLAY;
    $(label).textContent = on ? 'Dừng' : 'Phát';
  });
}

function toggle() {
  if (view === 'nhip') state.playing ? stop() : start();
  else if (view === 'doc') rd.playing ? rStop() : rStart();
}

// Đường dẫn: #nhip, #doc, #doc/7, #doc/7/3, #sgk
function go(path) {
  try { history.pushState(null, '', `#${path}`); } catch (e) {}
  route(path);
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
  if (changed) window.scrollTo(0, 0);
  if (next === 'doc') {
    const grade = BOOKS.some((b) => b.grade === +g) ? +g : rd.grade;
    selectGrade(grade, +n);
  }
  setTitle();
  setPlayUI();
}

document.querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => {
  go(t.dataset.view === 'doc' && rd.reading ? `doc/${rd.reading.grade}/${rd.reading.no}` : t.dataset.view);
}));
// Tab chính: mũi tên trái/phải chuyển phần học
$('tab-nhip').parentElement.addEventListener('keydown', (e) => {
  const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (!d) return;
  e.preventDefault();
  const next = VIEWS[(VIEWS.indexOf(view) + d + VIEWS.length) % VIEWS.length];
  go(next);
  $(`tab-${next}`).focus();
});
// Liên kết nội bộ (#doc/6, logo…) đi qua go() để chạy được cả khi trang mở dạng tệp
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault();
  go(a.getAttribute('href').slice(1));
});
window.addEventListener('popstate', () => route());

/* ----- Trình chiếu: chữ và ô to theo chiều cao màn hình, ẩn phần phụ ----- */
function setPresent(on) {
  document.body.classList.toggle('present', on);
  $('presentBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
  $('presentBtn').textContent = on ? 'Thoát trình chiếu' : 'Trình chiếu';
  if (on && document.documentElement.requestFullscreen && !document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
  if (view === 'nhip' && state.playing && lastStep >= 0) requestAnimationFrame(() => placePlayhead(lastStep));
  requestAnimationFrame(refreshScore);
}
$('presentBtn').addEventListener('click', () => setPresent(!document.body.classList.contains('present')));
// Bấm Esc thoát toàn màn hình thì cũng thoát trình chiếu
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && document.body.classList.contains('present')) setPresent(false);
});

/* ----- Phím tắt ----- */
const isTyping = (el) => el instanceof Element && el.closest('input, textarea, select, [contenteditable="true"]');
// Space trên nút, liên kết, ô chọn… là "bấm" phần tử đó, không phải phát/dừng
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
  } else if (view === 'nhip' && /^[1-4]$/.test(e.key)) {
    setBrush(ORDER[+e.key - 1]);
  } else if (e.key === 'f' || e.key === 'F') {
    setPresent(!document.body.classList.contains('present'));
  }
});
document.addEventListener('keyup', (e) => {
  if (e.code === 'Space' && !isInteractive(e.target)) e.preventDefault();
});

/* ----- Giao diện sáng / tối: biểu tượng cho biết sẽ chuyển sang đâu ----- */
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
$('themeBtn').addEventListener('click', () => {
  document.documentElement.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('beatpaper-theme', document.documentElement.dataset.theme); } catch (e) {}
  setThemeUI();
});
try {
  const saved = localStorage.getItem('beatpaper-theme');
  if (saved) document.documentElement.dataset.theme = saved;
} catch (e) {}
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', setThemeUI);

buildGrid();
buildPalette();
buildPresets();
renderCells();
setBpm(state.bpm);
setStepStatus(0);
buildDetChips();
buildStripDownload();
buildGrades();
buildLegend();
buildBooks();
setThemeUI();
route();

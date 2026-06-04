/* ================================================================
   HAPPY BIRTHDAY SURPRISE — script.js
   All 9 screens: Landing, Letter, Gallery, Counter, Cake,
   Reasons, Quiz, Gift, Ending
================================================================ */

'use strict';

/* ── CONFIG (edit ini sesuai kebutuhan) ── */
const CONFIG = {
  partnerName:    'Sayang',
  startDate:      new Date('2008-06-04'), // Tanggal mulai bersama
  birthdayDate:   new Date('2008-06-04'),           // Tanggal lahir
};

/* ── Screen Manager ── */
const SCREENS = ['s-landing','s-letter','s-gallery','s-counter','s-cake','s-reasons','s-quiz','s-gift','s-ending'];
let currentScreen = 0;

function goTo(id) {
  const idx = SCREENS.indexOf(id);
  if (idx < 0) return;
  const prev = document.getElementById(SCREENS[currentScreen]);
  const next = document.getElementById(id);
  prev.classList.remove('active');
  prev.classList.add('exit');
  setTimeout(() => prev.classList.remove('exit'), 700);
  next.classList.add('active');
  currentScreen = idx;
  updateNavDots();
  onScreenEnter(id);
}

function updateNavDots() {
  document.querySelectorAll('.nav-dots').forEach(container => {
    container.innerHTML = '';
    SCREENS.slice(1).forEach((sid, i) => {
      const dot = document.createElement('div');
      dot.className = 'nav-dot' + (i + 1 === currentScreen ? ' active' : '');
      dot.addEventListener('click', () => goTo(sid));
      container.appendChild(dot);
    });
  });
}

document.querySelectorAll('.btn-next').forEach(btn => {
  btn.addEventListener('click', () => goTo(btn.dataset.next));
});

/* ── Background Canvas ── */
(function bgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  const CHARS = ['✦','·','∘','◦','⋆','❋'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * 1, y: Math.random(),
      size: Math.random() * 2.5 + 0.5,
      speed: Math.random() * 0.0003 + 0.0001,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.5 + 0.1,
      hue: 280 + Math.random() * 80,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.phase += 0.008;
      const a = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));
      const x = (p.x + Math.sin(p.phase * 0.4) * 0.02) * W;
      const y = (p.y - p.speed * t * 0.05) % 1 * H;
      ctx.globalAlpha = a;
      ctx.font = `${p.size * 6}px serif`;
      ctx.fillStyle = `hsl(${p.hue}, 70%, 75%)`;
      ctx.fillText(p.char, x, y);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

/* ── Confetti Helper ── */
function launchConfetti(parent = document.body, count = 60) {
  const colors = ['#f472b6','#a855f7','#fbbf24','#34d399','#60a5fa','#f9a8d4'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.style.cssText = `
      position:fixed; top:0; left:${Math.random()*100}vw;
      width:${6+Math.random()*8}px; height:${6+Math.random()*8}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>0.5?'50%':'2px'};
      pointer-events:none; z-index:9999;
      animation: confetti-fall ${1.5+Math.random()*2}s ${Math.random()*0.8}s ease-out forwards;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

/* ================================================================
   SCREEN 1 — LANDING
================================================================ */
(function initLanding() {
  const container = document.getElementById('floatingHearts');
  const EMOJIS = ['💖','💗','💕','✨','🌸','💫','⭐','🌺'];

  function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'fheart';
    const dur = 7 + Math.random() * 6;
    const delay = Math.random() * 4;
    h.style.cssText = `
      left:${Math.random()*100}%;
      bottom:-40px;
      --dur:${dur}s;
      --delay:${delay}s;
      font-size:${14+Math.random()*18}px;
    `;
    h.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    container.appendChild(h);
    setTimeout(() => h.remove(), (dur + delay) * 1000);
  }

  for (let i = 0; i < 12; i++) spawnHeart();
  setInterval(spawnHeart, 700);

  document.getElementById('btnOpen').addEventListener('click', () => goTo('s-letter'));
})();

/* ================================================================
   SCREEN 2 — LOVE LETTER
================================================================ */
const LETTER_TEXT = `Di hari ulang tahunmu yang istimewa ini, aku ingin kamu tahu — kamu bukan hanya seseorang yang spesial bagiku. Kamu adalah alasan aku percaya bahwa keindahan yang sesungguhnya ada di dunia ini.

Setiap tawa kecilmu, setiap momen sederhana bersama kamu — semuanya menjadi kenangan yang sangat berharga bagiku.

Semoga hari ini dan setiap hari sesudahnya dipenuhi dengan kebahagiaan yang kamu layak dapatkan. Aku bersyukur setiap hari karena kamu ada di hidupku. 💖`;

(function initLetter() {
  const envelope = document.getElementById('envelope');
  const paper    = document.getElementById('letterPaper');
  const textEl   = document.getElementById('letterText');
  const dateEl   = document.getElementById('letterDate');

 dateEl.textContent = '4 Juni 2026';

  let opened = false;

  function typeText(el, text, speed = 22) {
    let i = 0;
    el.textContent = '';
    const interval = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  envelope.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    envelope.classList.add('open');
    setTimeout(() => {
      paper.classList.add('visible');
      setTimeout(() => typeText(textEl, LETTER_TEXT, 18), 400);
    }, 600);
  });

  // Trigger on screen enter
  window._letterInit = () => {
    if (!opened) {
      setTimeout(() => envelope.click(), 1000);
    }
  };
})();


/* ================================================================
   SCREEN 5 — BIRTHDAY CAKE
================================================================ */
(function initCake() {
  const row   = document.getElementById('candlesRow');
  const hint  = document.getElementById('cakeHint');
  const msg   = document.getElementById('cakeMessage');
  const NUM_CANDLES = 7;
  let blown = 0;

  for (let i = 0; i < NUM_CANDLES; i++) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    const colors = ['#f472b6','#c084fc','#818cf8','#fb923c','#4ade80','#f472b6','#a855f7'];
    candle.innerHTML = `
      <div class="candle-flame">🔥</div>
      <div class="candle-body" style="background:linear-gradient(180deg,${colors[i]},${colors[(i+2)%colors.length]})"></div>
    `;
    candle.addEventListener('click', () => {
      if (candle.classList.contains('blown')) return;
      candle.classList.add('blown');
      blown++;
      hint.textContent = `${blown}/${NUM_CANDLES} lilin padam 🌬️`;
      if (blown === NUM_CANDLES) {
        hint.textContent = '🎉 Semua lilin sudah padam!';
        msg.style.display = 'block';
        launchConfetti(document.body, 80);
      }
    });
    row.appendChild(candle);
  }
})();

/* ================================================================
   SCREEN 6 — REASONS I LOVE YOU
================================================================ */
const REASONS = [
  { emoji:'😊', text:'Senyummu yang menghangatkan hari' },
  { emoji:'🧠', text:'Kecerdasanmu yang menginspirasi' },
  { emoji:'💪', text:'Kekuatanmu di saat sulit' },
  { emoji:'🎭', text:'Tawamu yang menular' },
  { emoji:'🌻', text:'Kebaikanmu kepada semua orang' },
  { emoji:'🎨', text:'Kreativitasmu yang luar biasa' },
  { emoji:'🤗', text:'Kasih Sayangmu Buatku' },
  { emoji:'💬', text:'Cara kamu mendengarkanku' },
  { emoji:'⭐', text:'Semangatmu yang tak pernah padam' },
  { emoji:'🌈', text:'Caramu melihat sisi baik segala hal' },
  { emoji:'🎵', text:'Selera musikmu yang unik' },
  { emoji:'🍳', text:'Masakanmu yang aku tunggu-tunggu' },
  { emoji:'📚', text:'Caramu bercerita yang memukau' },
  { emoji:'🌙', text:'Ketenangan yang kamu bawa' },
  { emoji:'💡', text:'Ide-idemu yang brilian' },
  { emoji:'🦋', text:'Caramu tumbuh dan berkembang' },
  { emoji:'🌺', text:'Keindahan yang ada dalam dirimu' },
  { emoji:'🎯', text:'Tekadmu yang tak tergoyahkan' },
  { emoji:'💖', text:'Cinta tulusmu yang membuatku bahagia' },
  { emoji:'✨', text:'Kamu menjadi dirimu sendiri' },
];

(function initReasons() {
  const grid = document.getElementById('flipcardGrid');
  REASONS.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'flipcard';
    card.innerHTML = `
      <div class="flipcard-inner">
        <div class="flipcard-front">${r.emoji}</div>
        <div class="flipcard-back">${r.text}</div>
      </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    grid.appendChild(card);
  });
})();

/* ================================================================
   SCREEN 7 — LOVE QUIZ
================================================================ */
const QUIZ = [
  {
    q: 'Seberapa Sayang Kamu Buatku?',
    opts: ['10%', '50%', '10000000000%', '-0000000%'],
    ans: [2]
  },
  {
    q: 'Kesan Pertama Kamu Melihat Aku?',
    opts: ['Alim ', 'Ganteng Banget 💕', 'Horror 👻', 'Jamet 😂'],
    ans: [1]
  },
  {
    q: 'Panggilan Sayang yang Aku Sukai?',
    opts: ['Sayang', 'Sayang Sayang', 'Sayang Sayang Sayang', 'Sayang Sayang Sayang Sayang'],
    ans: [3]
    
  },
  {
    q: 'Aku Kalo Bangun Tidur Ngapain?',
    opts: ['Call you 💕', 'Mandi', 'Ngerapihin Tempat Tidur', 'Tidur Lagi'],
    ans: [0]
  },
  {
    q: 'Hal Apa Yang Aku Suakai ?',
    opts: ['Dapat Pap ', 'Di Sayang-Sayang ', 'Diajak jalan-jalan', 'Diceritai hal lucu'],
    ans: [0, 1, 2, 3]
   
  },
];

(function initQuiz() {
  let qIdx = 0, score = 0;
  const qNum  = document.getElementById('quizQNum');
  const qEl   = document.getElementById('quizQ');
  const optsEl= document.getElementById('quizOptions');
  const card  = document.getElementById('quizCard');
  const result= document.getElementById('quizResult');
  const fill  = document.getElementById('quizProgressFill');
  const btnAfter = document.getElementById('btnAfterQuiz');

  function render() {
    const q = QUIZ[qIdx];
    qNum.textContent = `Pertanyaan ${qIdx+1}/${QUIZ.length}`;
    qEl.textContent  = q.q;
    optsEl.innerHTML = '';
    fill.style.width = `${(qIdx / QUIZ.length) * 100}%`;

    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        // Disable all
        optsEl.querySelectorAll('.quiz-opt').forEach(b => b.classList.add('disabled'));
        if (q.ans.includes(i)) { btn.classList.add('correct'); score++; }
        else {
          btn.classList.add('wrong');
          optsEl.querySelectorAll('.quiz-opt')[q.ans].classList.add('correct');
        }
        setTimeout(() => {
          qIdx++;
          if (qIdx < QUIZ.length) render();
          else showResult();
        }, 900);
      });
      optsEl.appendChild(btn);
    });
  }

  function showResult() {
    fill.style.width = '100%';
    card.style.display = 'none';
    result.style.display = 'block';

    const titles = ['DAMNNN BRO','JAUH JAUH SANA ','HUS HUS','REMIDI ','Ini Baru My Love 💖'];
    const msgs   = [
      'GAK CINTA BANGET',
      'UNTUNG CANTIK',
      'UNTUNG SAYANG',
      'KALO GAK CANTIK+SAYANG UDAH TAK BUANG KAMU',
      'AH JADI MALU BUBBBB 🥰🥰🥰',
    ];

    const lvl = score === 5 ? 4 : score === 4 ? 3 : score === 3 ? 2 : score === 2 ? 1 : 0;
    document.getElementById('quizResultTitle').textContent = `${score}/5 — ${titles[lvl]}`;
    document.getElementById('quizResultMsg').textContent   = msgs[lvl];

    if (score >= 3) launchConfetti(document.body, 50);
    btnAfter.style.display = 'block';
  }

  window._quizInit = render;
})();

/* ================================================================
   SCREEN 8 — SURPRISE GIFT
================================================================ */
(function initGift() {
  const container = document.getElementById('giftHeartsFloat');
  const countEl   = document.getElementById('giftHeartsCount');
  const totalEl   = document.getElementById('giftHeartsTotal');
  const giftBox   = document.getElementById('giftBox');
  const hint      = document.getElementById('giftHint');
  const reveal    = document.getElementById('giftReveal');
  const btnToEnding = document.getElementById('btnToEnding');
  const TOTAL = 8;
  let collected = 0;

  totalEl.textContent = TOTAL;

  function spawnHearts() {
    container.innerHTML = '';
    for (let i = 0; i < TOTAL; i++) {
      const h = document.createElement('div');
      h.className = 'gheart';
      const dur   = 2 + Math.random() * 2;
      const delay = Math.random() * 1.5;
      h.style.cssText = `
        left: ${5 + (i / (TOTAL-1)) * 90}%;
        top: ${Math.random() * 60}%;
        --dur: ${dur}s;
        --delay: ${delay}s;
      `;
      h.textContent = '💖';
      h.addEventListener('click', () => {
        if (h.classList.contains('collected')) return;
        h.classList.add('collected');
        collected++;
        countEl.textContent = collected;
        if (collected >= TOTAL) onUnlock();
      });
      container.appendChild(h);
    }
  }

  function onUnlock() {
    giftBox.classList.add('open', 'unlocked');
    hint.textContent = '🎁 Kamu berhasil membukanya!';
    setTimeout(() => {
      reveal.style.display = 'block';
      launchConfetti(document.body, 70);
      setTimeout(() => btnToEnding.style.display = 'block', 800);
    }, 700);
  }

  window._giftInit = spawnHearts;
})();

/* ================================================================
   SCREEN 9 — ENDING + FIREWORKS
================================================================ */
(function initEnding() {
  const fw = document.getElementById('fireworksCanvas');
  const fwCtx = fw.getContext('2d');
  let W, H, rockets = [];
  let fwRunning = false;

  function resizeFw() { W = fw.width = window.innerWidth; H = fw.height = window.innerHeight; }
  window.addEventListener('resize', resizeFw); resizeFw();

  class Particle {
    constructor(x, y, color) {
      this.x = x; this.y = y;
      this.vx = (Math.random()-0.5)*8;
      this.vy = (Math.random()-0.5)*8;
      this.alpha = 1;
      this.color = color;
      this.size = Math.random()*3+1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vy += 0.05;
      this.alpha -= 0.018;
    }
    draw() {
      fwCtx.globalAlpha = Math.max(this.alpha,0);
      fwCtx.beginPath();
      fwCtx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      fwCtx.fillStyle = this.color;
      fwCtx.fill();
    }
  }

  class Rocket {
    constructor() {
      this.x = Math.random() * W;
      this.y = H;
      this.tx = 100 + Math.random() * (W-200);
      this.ty = 80 + Math.random() * (H*0.5);
      this.speed = 12 + Math.random() * 8;
      const dx = this.tx - this.x;
      const dy = this.ty - this.y;
      const dist = Math.hypot(dx, dy);
      this.vx = (dx/dist)*this.speed;
      this.vy = (dy/dist)*this.speed;
      this.exploded = false;
      this.particles = [];
      this.COLORS = ['#f472b6','#a855f7','#fbbf24','#4ade80','#60a5fa','#fb923c','#fff','#e879f9'];
    }
    update() {
      if (!this.exploded) {
        this.x += this.vx; this.y += this.vy;
        if (Math.hypot(this.x-this.tx, this.y-this.ty) < 12) {
          this.exploded = true;
          const color = this.COLORS[Math.floor(Math.random()*this.COLORS.length)];
          for (let i = 0; i < 60; i++) this.particles.push(new Particle(this.x, this.y, color));
        }
      } else {
        this.particles.forEach(p => p.update());
        this.particles = this.particles.filter(p => p.alpha > 0);
      }
    }
    draw() {
      if (!this.exploded) {
        fwCtx.globalAlpha = 1;
        fwCtx.beginPath();
        fwCtx.arc(this.x, this.y, 3, 0, Math.PI*2);
        fwCtx.fillStyle = '#fff';
        fwCtx.fill();
      } else {
        this.particles.forEach(p => p.draw());
      }
    }
    done() { return this.exploded && this.particles.length === 0; }
  }

  function fwLoop() {
    if (!fwRunning) return;
    fwCtx.fillStyle = 'rgba(26,5,51,0.25)';
    fwCtx.fillRect(0,0,W,H);
    rockets = rockets.filter(r => !r.done());
    rockets.forEach(r => { r.update(); r.draw(); });
    fwCtx.globalAlpha = 1;
    requestAnimationFrame(fwLoop);
  }

  function startFireworks() {
    fwRunning = true;
    fwLoop();
    const interval = setInterval(() => {
      if (!fwRunning) { clearInterval(interval); return; }
      rockets.push(new Rocket());
    }, 400);
  }

  // Ending animation
  window._endingStart = function() {
    fwRunning = false;
    fwCtx.clearRect(0,0,W,H);

    const lines = document.querySelectorAll('.eline');
    const decl  = document.getElementById('endingDeclaration');
    const btnY  = document.getElementById('btnYes');
    const final = document.getElementById('endingFinal');

    lines.forEach(el => { el.classList.remove('lit'); el.style.opacity = '1'; });
    decl.style.opacity = '0';
    btnY.style.opacity = '0';
    final.style.display = 'none';

    // Light up lines one by one
    lines.forEach(line => {
      const delay = parseInt(line.dataset.delay) || 0;
      setTimeout(() => line.classList.add('lit'), delay);
    });

    const lastDelay = parseInt([...lines].slice(-1)[0].dataset.delay) + 1400;

    setTimeout(() => {
      decl.style.opacity = '1';
      decl.style.transition = 'opacity 1.5s ease';
    }, lastDelay);

    setTimeout(() => {
      btnY.style.opacity = '1';
      btnY.style.transition = 'opacity 1.5s ease';
    }, lastDelay + 800);

    btnY.addEventListener('click', () => {
      btnY.style.display = 'none';
      launchConfetti(document.body, 100);
      startFireworks();
      setTimeout(() => { final.style.display = 'block'; }, 600);
    }, { once: true });
  };
})();

/* ================================================================
   Screen Enter Hooks
================================================================ */
function onScreenEnter(id) {
  if (id === 's-letter')  window._letterInit?.();
  if (id === 's-quiz')    window._quizInit?.();
  if (id === 's-gift')    window._giftInit?.();
  if (id === 's-ending')  window._endingStart?.();
}

/* ── Init ── */
updateNavDots();
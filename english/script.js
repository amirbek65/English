/* ═══════════════════════════════════════════
   THE STAR WHISPERERS — script.js
   ═══════════════════════════════════════════ */

// ─── STARFIELD ───────────────────────────────
(function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, stars = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createStars(count) {
        stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.5 + 0.2,
                speed: Math.random() * 0.15 + 0.02,
                opacity: Math.random(),
                phase: Math.random() * Math.PI * 2,
                color: Math.random() > 0.9 ? '#00eaff' : Math.random() > 0.85 ? '#a78bfa' : '#ffffff'
            });
        }
    }

    let t = 0;

    function draw() {
        ctx.clearRect(0, 0, W, H);
        t += 0.005;

        stars.forEach(s => {
            const tw = 0.5 + 0.5 * Math.sin(t + s.phase);
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = s.opacity * tw * 0.8 + 0.1;
            ctx.fill();

            // shooting star occasionally
            if (s.r > 1.3 && tw > 0.98) {
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - 15, s.y - 5);
                ctx.strokeStyle = s.color;
                ctx.globalAlpha = 0.3;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            s.y += s.speed;
            if (s.y > H) { s.y = 0;
                s.x = Math.random() * W; }
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize();
        createStars(200); });
    resize();
    createStars(200);
    draw();
})();

// ─── PROGRESS BAR ───────────────────────────
(function initProgressBar() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;

    function update() {
        const scrollTop = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
        bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
})();

// ─── HAMBURGER MENU ──────────────────────────
(function initHamburger() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        menu.classList.toggle('open');
    });

    // close on link click
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('open');
        });
    });
})();

// ─── ACTIVE NAV LINK ─────────────────────────
(function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
})();

// ─── TRAILER MODAL ───────────────────────────
(function initModal() {
    const overlay = document.getElementById('trailer-modal');
    if (!overlay) return;

    const openBtns = document.querySelectorAll('[data-open-trailer]');
    const closeBtn = document.getElementById('modal-close');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();

// ─── MY LINE GLOW ON CLICK ───────────────────
(function initLineGlow() {
    document.querySelectorAll('.dialogue-line.my-line').forEach(line => {
        line.addEventListener('click', () => {
            line.classList.remove('glowing');
            void line.offsetWidth; // reflow
            line.classList.add('glowing');
            setTimeout(() => line.classList.remove('glowing'), 1500);
        });
    });
})();

// ─── SCROLL FADE-IN ──────────────────────────
(function initScrollReveal() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
})();

// ─── PAGE TRANSITIONS ────────────────────────
(function initPageTransitions() {
    const curtain = document.getElementById('page-transition');
    if (!curtain) return;

    // exit animation
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            curtain.classList.add('entering');
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // entry animation
    window.addEventListener('load', () => {
        curtain.classList.remove('entering');
        curtain.classList.add('exiting');
        setTimeout(() => curtain.classList.remove('exiting'), 600);
    });
})();

// ─── BACK BTN HOVER SPARK ────────────────────
(function initBackBtn() {
    const btn = document.querySelector('.back-btn');
    if (!btn) return;
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateX(-4px)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
})();
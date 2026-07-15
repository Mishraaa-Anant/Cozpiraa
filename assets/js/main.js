/**
 * CozPiraa Clinic — Premium Healthcare Website
 * assets/js/main.js
 *
 * Modules:
 *  1.  Loader
 *  2.  Custom Cursor
 *  3.  Scroll Progress Bar
 *  4.  Navbar (scroll shrink + active link + hamburger)
 *  5.  Dark Mode Toggle
 *  6.  AOS Init
 *  7.  Particle Canvas
 *  8.  Animated Counters
 *  9.  Typing Effect
 * 10.  Swiper (Testimonials)
 * 11.  Card Tilt Effect
 * 12.  FAQ Accordion
 * 13.  [REMOVED] Appointment Form — phone-only booking
 * 13b. YouTube Facade (skeleton → thumbnail → sandboxed iframe on click)
 * 14.  Newsletter Form
 * 15.  Back-to-Top
 * 16.  Floating Buttons Entrance
 * 17.  Smooth Scroll
 * 18.  Footer Copyright Year
 * 19.  Lazy Image Loading
 * 20.  Ripple on Buttons
 */

'use strict';

/* =====================================================
   1. LOADER
===================================================== */
(function initLoader() {
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    loaderBar.style.width = progress + '%';
    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger AOS after loader
        if (typeof AOS !== 'undefined') AOS.refresh();
      }, 400);
    }
  }, 80);

  document.body.style.overflow = 'hidden';
})();


/* =====================================================
   2. CUSTOM CURSOR
===================================================== */
(function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let curX   = 0, curY   = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows immediately
    cursorDot.style.left = mouseX - 4  + 'px';
    cursorDot.style.top  = mouseY - 4  + 'px';
  });

  // Ring follows with lag
  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX - 18 + 'px';
    cursor.style.top  = curY - 18 + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Enlarge on interactive elements
  const interactives = 'a, button, .btn, .why-card, .service-card, .treatment-card, .faq-question, input, select, textarea';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      cursor.style.transform    = 'scale(1.8)';
      cursor.style.borderColor  = 'var(--secondary)';
      cursor.style.background   = 'rgba(20,184,166,0.1)';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      cursor.style.transform   = 'scale(1)';
      cursor.style.borderColor = 'var(--primary)';
      cursor.style.background  = 'transparent';
    }
  });

  // Hide on touch
  document.addEventListener('touchstart', () => {
    cursor.style.display    = 'none';
    cursorDot.style.display = 'none';
  });
})();


/* =====================================================
   3. SCROLL PROGRESS BAR
===================================================== */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop  = document.documentElement.scrollTop;
    const totalH     = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct        = totalH > 0 ? (scrollTop / totalH) * 100 : 0;
    bar.style.width  = pct + '%';
  }, { passive: true });
})();


/* =====================================================
   4. NAVBAR
===================================================== */
(function initNavbar() {
  const navbar        = document.getElementById('navbar');
  const hamburger     = document.getElementById('hamburger');
  const navLinks      = document.getElementById('navLinks');
  const mobileOverlay = document.getElementById('mobileOverlay');
  if (!navbar) return;

  /* --- Scroll Shrink --- */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* --- Hamburger Toggle --- */
  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    navLinks.classList.toggle('open', open);
    mobileOverlay.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileOverlay.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    toggleMenu(!isOpen);
  });

  mobileOverlay.addEventListener('click', () => toggleMenu(false));

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  /* --- Active Section Highlighting --- */
  const sections = document.querySelectorAll('section[id], div[id="top"]');
  const allLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        allLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id || (id === 'top' && link.dataset.section === 'home'));
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();


/* =====================================================
   5. DARK MODE TOGGLE (Intentionally disabled — light mode only)
===================================================== */
(function initDarkMode() {
  const body = document.body;
  body.classList.remove('dark-mode');
  body.classList.add('light-mode');
  localStorage.removeItem('cozpiraa-theme');
})();


/* =====================================================
   6. AOS INIT
===================================================== */
(function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 700,
    easing:   'ease-out-cubic',
    once:     true,
    offset:   80,
    delay:    0,
  });
})();


/* =====================================================
   7. PARTICLE CANVAS
===================================================== */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Only on desktop to save mobile battery
  if (window.innerWidth < 768) return;

  let W, H, particles = [], raf;
  const COUNT = 55;
  const COLORS = ['rgba(15,118,110,', 'rgba(20,184,166,', 'rgba(34,197,94,'];

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }

  function randomParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 3 + 1,
      dx:    (Math.random() - 0.5) * 0.4,
      dy:    (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.4 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      // Wrap around
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(15,118,110,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    init();
    draw();
  });

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      draw();
    }
  });
})();


/* =====================================================
   8. ANIMATED COUNTERS
===================================================== */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


/* =====================================================
   9. TYPING EFFECT
===================================================== */
(function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Virar West',
    'Global City',
    'Your Neighbourhood',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const current = phrases[phraseIdx];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 100;
      if (charIdx === current.length) {
        isDeleting = true;
        delay = 2200; // pause at full word
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 60;
      if (charIdx === 0) {
        isDeleting  = false;
        phraseIdx   = (phraseIdx + 1) % phrases.length;
        delay = 400;
      }
    }

    setTimeout(type, delay);
  }

  // Start after loader
  setTimeout(type, 1500);
})();


/* =====================================================
   10. SWIPER — TESTIMONIALS
===================================================== */
(function initSwiper() {
  if (typeof Swiper === 'undefined') return;

  new Swiper('.testimonials-swiper', {
    loop:           true,
    autoplay:       { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
    speed:          700,
    grabCursor:     true,
    centeredSlides: true,
    slidesPerView:  1,
    spaceBetween:   24,
    pagination:     { el: '#testiPagination', clickable: true },
    navigation:     { nextEl: '#testiNext', prevEl: '#testiPrev' },
    breakpoints: {
      640:  { slidesPerView: 1.3 },
      900:  { slidesPerView: 2 },
      1100: { slidesPerView: 2.5 },
    },
    effect: 'slide',
  });
})();


/* =====================================================
   11. CARD TILT EFFECT (3D)
===================================================== */
(function initTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length || window.innerWidth < 768) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect     = card.getBoundingClientRect();
      const cx       = rect.left + rect.width  / 2;
      const cy       = rect.top  + rect.height / 2;
      const dx       = (e.clientX - cx) / (rect.width  / 2);
      const dy       = (e.clientY - cy) / (rect.height / 2);
      const rotateX  = -dy * 8;
      const rotateY  =  dx * 8;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* =====================================================
   12. FAQ ACCORDION
===================================================== */
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-answer').classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
})();


/* =====================================================
   13. APPOINTMENT FORM — REMOVED
   Appointments are accepted by phone only.
===================================================== */
// No form exists — this module intentionally left empty.


/* =====================================================
   13b. YOUTUBE FACADE
   Security + Performance:
   - No iframe / no YouTube JS until user clicks
   - Prevents tracking cookies pre-interaction
   - Skeleton shimmer → lazy thumbnail → play overlay
   - On click: injects sandboxed autoplay iframe
   - Keyboard accessible (Enter / Space)
===================================================== */
(function initYTFacades() {
  const facades = document.querySelectorAll('.yt-facade');
  if (!facades.length) return;

  /* ---- Step 1: Lazy-load thumbnails as cards enter viewport ---- */
  const thumbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const facade = entry.target;
      const img    = facade.querySelector('.yt-thumbnail');
      if (!img || !img.dataset.src) return;

      img.src = img.dataset.src;

      img.addEventListener('load', () => {
        img.classList.add('loaded');
        facade.querySelector('.yt-skeleton')?.classList.add('hidden');
      }, { once: true });

      // If the thumbnail 404s (e.g. unlisted video), just hide skeleton
      img.addEventListener('error', () => {
        facade.querySelector('.yt-skeleton')?.classList.add('hidden');
      }, { once: true });

      thumbObserver.unobserve(facade);
    });
  }, { rootMargin: '250px 0px' }); // start loading 250px before visible

  /* ---- Step 2: On click/key → inject sandboxed autoplay iframe ---- */
  function loadIframe(facade) {
    if (facade.dataset.loaded) return; // guard against double-click
    facade.dataset.loaded = '1';

    const vid = facade.dataset.vid;
    if (!vid) return;

    const iframe = document.createElement('iframe');

    // Security: minimal sandbox permissions for YouTube playback
    // allow-scripts        – YouTube player JS
    // allow-same-origin    – session storage / cookies for playback
    // allow-presentation   – Fullscreen API
    // allow-popups         – YouTube internal navigation
    // allow-popups-to-escape-sandbox – let YouTube links open normally
    iframe.setAttribute('sandbox',
      'allow-scripts allow-same-origin allow-presentation allow-popups allow-popups-to-escape-sandbox'
    );

    // Privacy: nocookie domain reduces cross-site tracking
    iframe.src    = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1`;
    iframe.title  = facade.getAttribute('aria-label') || 'YouTube video player';
    iframe.allow  = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'eager');
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';

    // Clear facade content, insert iframe
    facade.innerHTML = '';
    facade.appendChild(iframe);
    facade.style.cursor = 'default';
    facade.removeAttribute('role');
    facade.removeAttribute('tabindex');
  }

  facades.forEach(facade => {
    // Start observing for thumbnail lazy-load
    thumbObserver.observe(facade);

    // Mouse click
    facade.addEventListener('click', () => loadIframe(facade));

    // Keyboard: Enter or Space
    facade.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadIframe(facade);
      }
    });
  });
})();


/* =====================================================
   14. NEWSLETTER FORM
===================================================== */
(function initNewsletter() {
  const form  = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = '#EF4444';
      setTimeout(() => input.style.borderColor = '', 1500);
      return;
    }
    input.value = '';
    input.placeholder = '✓ Subscribed! Thank you.';
    setTimeout(() => {
      input.placeholder = 'your@email.com';
    }, 3000);
  });
})();


/* =====================================================
   15. BACK-TO-TOP
===================================================== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* =====================================================
   16. FLOATING BUTTONS ENTRANCE ANIMATION
===================================================== */
(function initFloatBtns() {
  const wa   = document.getElementById('floatWA');
  const call = document.getElementById('floatCall');
  if (!wa || !call) return;

  // Stagger in after page load
  setTimeout(() => {
    wa.style.animation   = 'fadeSlideUp .6s ease forwards, floatPulse 2s ease-in-out infinite .6s';
    call.style.animation = 'fadeSlideUp .6s ease .15s forwards, floatPulse 2s ease-in-out infinite .9s';
  }, 2000);
})();


/* =====================================================
   17. SMOOTH SCROLL (for all anchor links)
===================================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h-sm'), 10) || 60;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* =====================================================
   18. FOOTER COPYRIGHT YEAR
===================================================== */
(function initYear() {
  const el = document.getElementById('copyrightYear');
  if (el) el.textContent = new Date().getFullYear();
})();


/* =====================================================
   19. LAZY IMAGE LOADING (Intersection Observer fallback)
===================================================== */
(function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return; // native lazy load supported

  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
  imgs.forEach(img => observer.observe(img));
})();


/* =====================================================
   20. RIPPLE EFFECT ON BUTTONS
===================================================== */
(function initRipple() {
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple    = document.createElement('span');
      const rect      = btn.getBoundingClientRect();
      const size      = Math.max(rect.width, rect.height) * 1.5;
      const x         = e.clientX - rect.left - size / 2;
      const y         = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${x}px; top: ${y}px;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        transform: scale(0);
        animation: rippleAnim .6s linear;
        pointer-events: none;
        z-index: 10;
      `;

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Inject ripple keyframe
  if (!document.getElementById('rippleStyle')) {
    const style = document.createElement('style');
    style.id    = 'rippleStyle';
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(1); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();


/* =====================================================
   MISC: Prevent FOUC on dark mode
===================================================== */
(function preventFOUC() {
  localStorage.removeItem('cozpiraa-theme');
  document.documentElement.style.colorScheme = 'light';
})();

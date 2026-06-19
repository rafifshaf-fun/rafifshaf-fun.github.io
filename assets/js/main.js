// === Rafif Shafwan — Personal Website JS ===
// Features: Typing animation · Counter animation · Stagger reveals · Scroll effects

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initScrollEffects();
  initActiveNavLink();
  initMermaid();
  initTypingAnimation();
  initCounterAnimation();
  initStaggerAnimations();
  if (typeof i18n !== 'undefined') i18n.init();
});

/* ============================================================
   MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  function open() {
    toggle.classList.add('open');
    links.classList.add('open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    toggle.classList.remove('open');
    links.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    links.classList.contains('open') ? close() : open();
  });

  links.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => close());
  });
}

/* ============================================================
   SCROLL EFFECTS — navbar + fade-in observer
   ============================================================ */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Fade-in on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
}

/* ============================================================
   ACTIVE NAV LINK
   ============================================================ */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (
      currentPath === href ||
      (href !== '/' && currentPath.startsWith(href)) ||
      (href === '/' && (currentPath === '/' || currentPath.endsWith('index.html')))
    ) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   MERMAID
   ============================================================ */
function initMermaid() {
  if (typeof mermaid === 'undefined') return;
  mermaid.initialize({
    startOnLoad: true,
    theme: 'neutral',
    themeVariables: {
      primaryColor:        '#f0eeea',
      primaryTextColor:    '#1c1c28',
      primaryBorderColor:  '#cccac3',
      lineColor:           '#9898a6',
      secondaryColor:      '#f7f6f2',
      tertiaryColor:       '#ffffff',
      background:          '#f7f6f2',
      mainBkg:             '#ffffff',
      nodeBorder:          '#e4e2dc',
      clusterBkg:          '#f0eeea',
      titleColor:          '#1c1c28',
      edgeLabelBackground: '#f7f6f2',
    },
  });
}

/* ============================================================
   TYPING ANIMATION — hero headline
   ============================================================ */
function initTypingAnimation() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'that actually ship.',
    'for real users.',
    'that stay running.',
    'beyond notebooks.',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pauseTick = 0;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (deleting) {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 480);
        return;
      }
      setTimeout(tick, 42);
    } else {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        pauseTick++;
        if (pauseTick < 28) {
          setTimeout(tick, 100);
        } else {
          pauseTick = 0;
          deleting = true;
          setTimeout(tick, 500);
        }
        return;
      }
      setTimeout(tick, 68);
    }
  }

  // Start after a short delay
  setTimeout(tick, 800);
}

/* ============================================================
   PARTICLE CANVAS — disabled in papery mode
   ============================================================ */
function initParticleCanvas() {
  return; // Disabled for clean editorial aesthetic
}

/* ============================================================
   COUNTER ANIMATION — stats bar
   ============================================================ */
function initCounterAnimation() {
  const statEls = document.querySelectorAll('.stat-number[data-target]');
  if (!statEls.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);

      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '+';
      const dur    = 1400;
      const start  = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / dur, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(eased * target);
        el.textContent = val + (progress === 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }, { threshold: 0.5 });

  statEls.forEach(el => io.observe(el));
}

/* ============================================================
   STAGGER ANIMATIONS — card children
   ============================================================ */
function initStaggerAnimations() {
  const grids = document.querySelectorAll('.card-grid, .philosophy-principles, .stack-pills');

  grids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach(child => child.classList.add('stagger-child'));

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        const kids = Array.from(entry.target.children);
        kids.forEach((child, i) => {
          setTimeout(() => child.classList.add('visible'), i * 90);
        });
      });
    }, { threshold: 0.1 });

    io.observe(grid);
  });
}

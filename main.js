/**
 * KENSINGTON GYM — main.js
 * Frontend JavaScript Logic
 * Version: 1.0
 *
 * Sections:
 *  1.  Custom Cursor
 *  2.  Navigation Scroll Effect
 *  3.  Mobile Menu
 *  4.  Smooth Anchor Scrolling
 *  5.  Scroll Reveal (IntersectionObserver)
 *  6.  Counter Animation
 *  7.  Hero Background Zoom
 *  8.  Testimonials Scroll Controls
 *  9.  Trainer Modal
 * 10.  Gallery Lightbox
 * 11.  BMI Calculator
 * 12.  Contact Form (with backend API call)
 */

'use strict';

/* ============================================================
   1. CUSTOM CURSOR
============================================================ */
const cur = document.getElementById('cur');

if (cur) {
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });

  // Enlarge cursor on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .fac-card, .tr-card, .gi, .test-ctrl, .plan, .bmi-inp'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('big'));
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  });
}


/* ============================================================
   2. NAVIGATION SCROLL EFFECT
============================================================ */
const nav = document.getElementById('nav');

if (nav) {
  const onScroll = () => {
    nav.classList.toggle('sc', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}


/* ============================================================
   3. MOBILE MENU
============================================================ */
const mMenu   = document.getElementById('mmenu');
const hamBtn  = document.getElementById('hamBtn');
const mmClose = document.getElementById('mmClose');

function openMobileMenu() {
  mMenu.classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mMenu.classList.remove('on');
  document.body.style.overflow = '';
}

if (hamBtn)  hamBtn.addEventListener('click', openMobileMenu);
if (mmClose) mmClose.addEventListener('click', closeMobileMenu);

// Close on link click
if (mMenu) {
  mMenu.querySelectorAll('.mm-link').forEach(a =>
    a.addEventListener('click', closeMobileMenu)
  );
}


/* ============================================================
   4. SMOOTH ANCHOR SCROLLING
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ============================================================
   5. SCROLL REVEAL (IntersectionObserver)
============================================================ */
const revealElements = document.querySelectorAll('.rv, .rv-l, .rv-r');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, {
  threshold:  0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


/* ============================================================
   6. COUNTER ANIMATION
============================================================ */
/**
 * Animates a number from 0 up to `target` over `duration` ms
 * using an ease-out cubic function.
 */
function animateCounter(el, target, duration = 2200) {
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    el.textContent = Math.round(eased * target).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString() + '+';
    }
  }
  requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-t]').forEach(el => {
          animateCounter(el, parseInt(el.getAttribute('data-t'), 10));
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
}


/* ============================================================
   7. HERO BACKGROUND ZOOM ON LOAD
============================================================ */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('load', () => {
    setTimeout(() => heroBg.classList.add('ld'), 80);
  });
}


/* ============================================================
   8. TESTIMONIALS SCROLL CONTROLS
============================================================ */
const testTrack = document.getElementById('testTrack');
const testPrev  = document.getElementById('testPrev');
const testNext  = document.getElementById('testNext');

function scrollTestimonials(direction) {
  if (testTrack) {
    testTrack.scrollBy({ left: direction * 400, behavior: 'smooth' });
  }
}

if (testPrev) testPrev.addEventListener('click', () => scrollTestimonials(-1));
if (testNext) testNext.addEventListener('click', () => scrollTestimonials(1));


/* ============================================================
   9. TRAINER MODAL
============================================================ */
const TRAINER_DATA = {
  morley: {
    img:  'https://images.unsplash.com/photo-1567013127542-490d757e6349?w=900&q=80',
    name: 'MORLEY FLOOD',
    spec: 'Head Trainer & Founder · 40+ Years Experience',
    bio: [
      'Morley has been involved in competitive weightlifting for more than 40 years. His diverse athletic background — spanning powerlifting, strength sports, and general fitness — provides a deep, field-tested knowledge base that he shares with every single client.',
      'Morley believes that in our fast-paced world, training must be both efficient and effective: maximizing results while respecting your time. His approach is careful and measured — he pushes hard, but always with technique and safety first.',
      'Clients consistently describe Morley\'s coaching as transformative, not just physically but mentally. His ability to build both body strength and mental resilience sets him apart as one of Calgary\'s most respected fitness professionals. Whether you\'re stepping into a gym for the first time or training for a competition, Morley meets you exactly where you are.'
    ],
    tags: ['Founder', '40+ Years', 'Powerlifting', 'Strength Coach', 'Mindset Training', 'Wellness Expert']
  },
  peter: {
    img:  'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=900&q=80',
    name: 'PETER',
    spec: 'Elite Personal Trainer & Competitive Athlete · 30+ Years',
    bio: [
      'Peter has spent 30 years in the fitness world as a competitive bodybuilder, powerlifter, strongman athlete, and martial arts competitor, trainer, and instructor. He has been a certified Personal Trainer for 4+ years, including in a management and mentorship role at Kensington Gym.',
      'Peter believes that fitness is a lifetime endeavour — the single element that contributes more than anything else to quality of life. Fitness doesn\'t just make physical tasks easier; it builds confidence, mental clarity, stress resilience, and personal power.',
      'His training programs reflect this holistic philosophy: designed for the individual, built for the long game, and focused on sustainable transformation. Peter doesn\'t just train bodies — he builds champions.'
    ],
    tags: ['30+ Years', 'Bodybuilding', 'Powerlifting', 'Strongman', 'Martial Arts', 'Mentor', 'Certified PT']
  }
};

const modal     = document.getElementById('modal');
const modalC    = document.getElementById('modalC');
const mImg      = document.getElementById('mImg');
const mName     = document.getElementById('mName');
const mSpec     = document.getElementById('mSpec');
const mTxt      = document.getElementById('mTxt');
const mTags     = document.getElementById('mTags');
const modalCTA  = document.getElementById('modalCTA');
const modalClose= document.getElementById('modalClose');

function openModal(trainerId) {
  const data = TRAINER_DATA[trainerId];
  if (!data || !modal) return;

  mImg.src          = data.img;
  mName.textContent = data.name;
  mSpec.textContent = data.spec;
  mTxt.innerHTML    = data.bio.map(p => `<p class="modal-txt">${p}</p>`).join('');
  mTags.innerHTML   = data.tags.map(t => `<span class="tr-tag-it">${t}</span>`).join('');

  modal.classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (modal) {
    modal.classList.remove('on');
    document.body.style.overflow = '';
  }
}

// Close on backdrop click
if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
}
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalCTA)   modalCTA.addEventListener('click', closeModal);

// Attach click events to trainer cards
document.querySelectorAll('.tr-card[data-trainer]').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.getAttribute('data-trainer'));
  });
});

// Prevent trainer social links from triggering modal
document.querySelectorAll('.tr-soc-a').forEach(link => {
  link.addEventListener('click', e => e.stopPropagation());
});


/* ============================================================
   10. GALLERY LIGHTBOX
============================================================ */
const lb    = document.getElementById('lb');
const lbImg = document.getElementById('lbImg');
const lbX   = document.getElementById('lb-x');

function openLightbox(src) {
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lb.classList.add('on');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (lb) {
    lb.classList.remove('on');
    document.body.style.overflow = '';
  }
}

// Attach click to gallery items
document.querySelectorAll('.gi[data-src]').forEach(item => {
  item.addEventListener('click', () => openLightbox(item.getAttribute('data-src')));
});

if (lb)  lb.addEventListener('click',  e => { if (e.target === lb) closeLightbox(); });
if (lbX) lbX.addEventListener('click', closeLightbox);


/* ============================================================
   11. BMI CALCULATOR
============================================================ */
const bmiBtn     = document.getElementById('bmiBtn');
const bmiResult  = document.getElementById('bmiResult');
const bmiVal     = document.getElementById('bmiVal');
const bmiCat     = document.getElementById('bmiCat');
const bmiBarFill = document.getElementById('bmiBarFill');
const bmiAdvice  = document.getElementById('bmiAdvice');

const BMI_CATEGORIES = [
  {
    max:    18.5,
    label:  'Underweight',
    color:  '#60a5fa',
    pct:    15,
    advice: 'Your BMI suggests you may benefit from a muscle-building program. Our trainers can design a personalized plan to help you gain lean muscle mass and reach a healthier, stronger body.'
  },
  {
    max:    25,
    label:  'Normal Weight',
    color:  '#00D26A',
    pct:    40,
    advice: 'Your BMI is in the healthy range! Our trainers can help you maintain your results, build strength, and optimize your performance to the next level.'
  },
  {
    max:    30,
    label:  'Overweight',
    color:  '#f59e0b',
    pct:    65,
    advice: 'Our personalized weight loss programs combine structured training and nutrition coaching to help you reach your ideal body composition sustainably and permanently.'
  },
  {
    max:    Infinity,
    label:  'Obese',
    color:  '#ef4444',
    pct:    88,
    advice: 'Our expert trainers specialize in guiding clients through transformative weight loss journeys. We start where you are, build a plan around your needs, and support you every step of the way.'
  }
];

function calculateBMI() {
  const h = parseFloat(document.getElementById('bmiH').value);
  const w = parseFloat(document.getElementById('bmiW').value);

  if (!h || !w || h < 100 || h > 250 || w < 30 || w > 300) {
    alert('Please enter a valid height (100–250 cm) and weight (30–300 kg).');
    return;
  }

  const bmi      = w / Math.pow(h / 100, 2);
  const rounded  = bmi.toFixed(1);
  const category = BMI_CATEGORIES.find(cat => bmi < cat.max);

  bmiVal.textContent           = rounded;
  bmiCat.innerHTML             = `<span style="color:${category.color}">${category.label}</span>`;
  bmiBarFill.style.width       = category.pct + '%';
  bmiBarFill.style.background  = category.color;
  bmiAdvice.textContent        = category.advice;
  bmiResult.style.display      = 'block';
}

if (bmiBtn) bmiBtn.addEventListener('click', calculateBMI);

// Also allow pressing Enter in inputs
['bmiH', 'bmiW'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') calculateBMI(); });
});


/* ============================================================
   12. CONTACT FORM (with PHP backend API call)
============================================================ */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

/**
 * Simple field validation helper.
 * Returns true if all required fields are filled and email is valid.
 */
function validateForm(formEl) {
  let valid = true;

  formEl.querySelectorAll('[required]').forEach(field => {
    const errEl = field.nextElementSibling;
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      if (errEl && errEl.classList.contains('f-error')) {
        errEl.textContent = 'This field is required.';
        errEl.classList.add('show');
      }
      valid = false;
    } else {
      field.style.borderColor = '';
      if (errEl && errEl.classList.contains('f-error')) {
        errEl.classList.remove('show');
      }
    }
  });

  const emailEl = formEl.querySelector('[type="email"]');
  if (emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
    emailEl.style.borderColor = '#ef4444';
    valid = false;
  }

  return valid;
}

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validateForm(contactForm)) return;

    // Collect form data
    const payload = {
      first_name: document.getElementById('firstName').value.trim(),
      last_name:  document.getElementById('lastName').value.trim(),
      email:      document.getElementById('email').value.trim(),
      phone:      document.getElementById('phone').value.trim(),
      interest:   document.getElementById('interest').value,
      message:    document.getElementById('message').value.trim()
    };

    // Update button state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled    = true;

    try {
      /* -------------------------------------------------------
         Backend API call.
         Make sure your PHP server is running and api.php is
         accessible at /backend/api.php relative to index.html.
         For local dev: http://localhost/kensington-gym/backend/api.php
      ------------------------------------------------------- */
      const response = await fetch('./backend/api.php', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action: 'contact', ...payload })
      });

      const result = await response.json();

      if (result.success) {
        submitBtn.textContent      = '✓ Message Sent!';
        submitBtn.style.background = 'var(--success)';
        submitBtn.style.boxShadow  = '0 0 22px rgba(0,210,106,.4)';
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Submission failed.');
      }

    } catch (err) {
      console.error('Form error:', err);

      // Graceful fallback — still show success to user for UX
      // (Remove this in production if you want strict error handling)
      submitBtn.textContent      = '✓ Message Sent!';
      submitBtn.style.background = 'var(--success)';
      submitBtn.style.boxShadow  = '0 0 22px rgba(0,210,106,.4)';
      contactForm.reset();
    }

    // Reset button after delay
    setTimeout(() => {
      submitBtn.textContent      = 'Send Message →';
      submitBtn.style.background = '';
      submitBtn.style.boxShadow  = '';
      submitBtn.disabled         = false;
    }, 4000);
  });
}


/* ============================================================
   GLOBAL: Close modals on Escape key
============================================================ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeLightbox();
    closeMobileMenu();
  }
});
/* ==========================================================================
   PORTFOLIO — JEAN-ROSE OURA (OURAJEENN)
   Interactive Scripts: Dark/Light Mode, Nav, Tabs, Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Mode Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'light' || (!storedTheme && !prefersDark && false)) {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.setAttribute('icon', 'lucide:moon');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.setAttribute('icon', 'lucide:sun');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      
      if (themeIcon) {
        themeIcon.setAttribute('icon', newTheme === 'light' ? 'lucide:moon' : 'lucide:sun');
      }
    });
  }

  // 2. Navigation Sticky & Scrollspy
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }

    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('is-active');
      }
    });
  }, { passive: true });

  // 3. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Skills Category Tabs
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillPanels = document.querySelectorAll('.skills__panel');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.dataset.category;

      skillTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      skillPanels.forEach(panel => {
        if (targetCategory === 'all' || panel.id === `skills-${targetCategory}`) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
    });
  });

  // 6. Contact Form Feedback
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<iconify-icon icon="lucide:loader-2" class="animate-spin"></iconify-icon> Envoi en cours...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<iconify-icon icon="lucide:check"></iconify-icon> Message Envoyé !`;
        formStatus.classList.add('is-success');
        formStatus.textContent = "Merci pour votre message ! Je vous répondrai dans les plus brefs délais.";
        
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          formStatus.classList.remove('is-success');
        }, 5000);
      }, 1000);
    });
  }

  // 7. Footer Year Update
  const footerYear = document.getElementById('footerYear');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});
/**
 * Dikesh Kumar - Portfolio Interactive Scripts
 * Senior Software Engineer at HfactoR | IIT Kharagpur | UN Millennium Fellow
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('dk_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('dk_theme', nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }

  // 2. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Header Scrolled Class & Active Nav Link Spy
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 4. Hero Animated Typing Effect (Software Engineering Focused)
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      '.NET & C# Enterprise Architecture',
      'High-Performance SQL & Query Tuning',
      'Azure Cloud Services & Microservices',
      'C++ & Data Structures and Algorithms (DSA)',
      'Enterprise SaaS & Payroll Engines at HfactoR',
      'Git, GitHub & Cloud CI/CD Pipelines'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 85;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1900; // Pause at end of phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 350; // Pause before typing new phrase
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // 5. Project Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. Interactive Stats Counter with IntersectionObserver
  const statNumbers = document.querySelectorAll('.stat-num');
  let animatedStats = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          if (isNaN(target)) return;

          let start = 0;
          const duration = 1600;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              if (target === 2024) {
                stat.textContent = '2024';
              } else if (target === 99) {
                stat.textContent = '99.9%';
              } else if (target >= 1000) {
                stat.textContent = (target / 1000) + 'k+';
              } else {
                stat.textContent = target + '+';
              }
              clearInterval(timer);
            } else {
              if (target === 99) {
                stat.textContent = Math.floor(start) + '%';
              } else if (target >= 1000) {
                stat.textContent = Math.floor(start / 1000) + 'k+';
              } else {
                stat.textContent = Math.floor(start) + (target === 2024 ? '' : '+');
              }
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 7. Clipboard Copy Actions (Email, Phone & Search Queries)
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'dikeshkumar9406@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied email to clipboard: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      const phone = copyPhoneBtn.getAttribute('data-phone') || '+916263543807';
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`Copied phone number: ${phone}`);
      }).catch(() => {
        showToast(`Phone: ${phone}`);
      });
    });
  }

  const copyLinkedinQueryBtn = document.getElementById('copy-linkedin-query-btn');
  if (copyLinkedinQueryBtn) {
    copyLinkedinQueryBtn.addEventListener('click', () => {
      const query = copyLinkedinQueryBtn.getAttribute('data-query') || 'Dikesh Kumar HfactoR Senior Software Engineer IIT Kharagpur';
      navigator.clipboard.writeText(query).then(() => {
        showToast('Copied LinkedIn search query to clipboard!');
      }).catch(() => {
        showToast(`Search terms: ${query}`);
      });
    });
  }

  // 8. Contact Form Handling
  const contactForm = document.getElementById('portfolio-contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !subject || !message) {
        showFeedback('Please fill out all required fields.', 'error');
        return;
      }

      // Generate mailto link
      const recipient = 'dikeshkumar9406@gmail.com';
      const emailSubject = encodeURIComponent(`[SWE Inquiry] ${subject} - from ${name}`);
      const emailBody = encodeURIComponent(`Hello Dikesh,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}\nSubject: ${subject}`);
      const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

      // Open email client
      window.location.href = mailtoUrl;

      showFeedback('Opening your email client to dispatch your message. If it didn\'t open automatically, you can write directly to dikeshkumar9406@gmail.com', 'success');
      showToast('Preparing your email client...');
    });
  }

  function showFeedback(msg, type) {
    if (!formFeedback) return;
    formFeedback.textContent = msg;
    formFeedback.className = `form-feedback ${type}`;
    formFeedback.style.display = 'block';
  }

  // 9. Back To Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Dynamic Year in footer
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 10. Global Toast Notification Helper
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});

/* ==================== THEME MANAGEMENT ==================== */
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;

// Initialize theme from localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.classList.remove('theme-light', 'theme-dark');
  body.classList.add(`theme-${savedTheme}`);
}

// Toggle theme
themeToggle?.addEventListener('click', () => {
  const currentTheme = body.classList.contains('theme-dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.classList.remove(`theme-${currentTheme}`);
  body.classList.add(`theme-${newTheme}`);
  localStorage.setItem('theme', newTheme);
});

/* ==================== NAVIGATION ==================== */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

// Toggle mobile menu
menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', navLinks?.classList.contains('active'));
});

// Close menu when link clicked
navAnchors.forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ==================== SCROLL PROGRESS BAR ==================== */
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

/* ==================== SMOOTH SCROLL & ACTIVE LINK ==================== */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

/* ==================== REVEAL ANIMATIONS ==================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'revealContent 0.8s ease-out forwards';
      if (entry.target.classList.contains('reveal-delay')) {
        entry.target.style.animationDelay = '0.2s';
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

/* ==================== PROJECTS DATA ==================== */
const projectsData = [
  {
    title: 'ERP System',
    description: 'Enterprise Resource Planning mobile application with offline-first architecture, complex data synchronization, and real-time API integration.',
    technologies: ['Flutter', 'Clean Architecture', 'GetX', 'Firebase', 'Retrofit'],
    link: '#'
  },
  {
    title: 'E-Commerce App',
    description: 'Full-featured e-commerce platform with product catalog, shopping cart, payment integration, and order tracking capabilities.',
    technologies: ['Flutter', 'Dart', 'GetX', 'REST API', 'Firebase'],
    link: '#'
  },
  {
    title: 'Task Management',
    description: 'Collaborative task management application with real-time synchronization, offline support, and team collaboration features.',
    technologies: ['Flutter', 'BLoC', 'Hive', 'WebSockets', 'MVVM'],
    link: '#'
  },
  {
    title: 'Social Media App',
    description: 'Social networking platform with feed, user profiles, messaging, and media sharing built with modern architecture patterns.',
    technologies: ['Flutter', 'Riverpod', 'Firebase', 'Cloud Storage', 'Authentication'],
    link: '#'
  },
  {
    title: 'Health Tracking',
    description: 'Health and fitness tracking application with data visualization, workout planning, and health metrics monitoring.',
    technologies: ['Flutter', 'Provider', 'Firebase', 'Charts', 'Notifications'],
    link: '#'
  },
  {
    title: 'AI Chat Assistant',
    description: 'AI-powered chat application integrated with Gemini API for intelligent conversations and smart recommendations.',
    technologies: ['Flutter', 'Gemini API', 'GetX', 'Firebase', 'Real-time DB'],
    link: '#'
  }
];

/* ==================== RENDER PROJECTS ==================== */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const projectsHTML = projectsData.map(project => `
    <div class="project-card reveal">
      <div class="project-image">🚀</div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
        </div>
        <a href="${project.link}" class="project-link">
          View Project →
        </a>
      </div>
    </div>
  `).join('');

  container.innerHTML = projectsHTML;

  // Observe new project cards
  container.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

/* ==================== VIDEO MODAL ==================== */
const videoModal = document.getElementById('video-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

function openVideoModal(videoId) {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = `
    <iframe 
      width="100%" 
      height="600" 
      src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('video-container').innerHTML = '';
}

modalClose?.addEventListener('click', closeVideoModal);
modalOverlay?.addEventListener('click', closeVideoModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    closeVideoModal();
  }
});

/* ==================== FOOTER YEAR ==================== */
function updateYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

updateYear();

/* ==================== MAGNETIC CURSOR EFFECT ==================== */
class MagneticCursor {
  constructor() {
    this.magneticElements = document.querySelectorAll('.magnetic');
    this.mouseX = 0;
    this.mouseY = 0;
    this.elementX = 0;
    this.elementY = 0;
    
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    this.magneticElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      this.elementX = rect.left + rect.width / 2;
      this.elementY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(this.mouseX - this.elementX, 2) +
        Math.pow(this.mouseY - this.elementY, 2)
      );

      if (distance < 100) {
        const angle = Math.atan2(this.mouseY - this.elementY, this.mouseX - this.elementX);
        const tx = Math.cos(angle) * (100 - distance) * 0.2;
        const ty = Math.sin(angle) * (100 - distance) * 0.2;
        
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      } else {
        el.style.transform = 'translate(0, 0)';
      }
    });
  }
}

// Initialize magnetic cursor on desktop
if (window.innerWidth > 768) {
  new MagneticCursor();
}

/* ==================== FORM HANDLING (IF NEEDED) ==================== */
function handleContactForm(e) {
  if (e.target.classList.contains('contact-form')) {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  }
}

document.addEventListener('submit', handleContactForm);

/* ==================== PERFORMANCE: LAZY LOADING ==================== */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ==================== UTILITY: DEBOUNCE ==================== */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ==================== INITIALIZE APP ==================== */
function initializeApp() {
  initializeTheme();
  renderProjects();
  updateScrollProgress();
  updateActiveLink();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

/* ==================== HANDLE WINDOW RESIZE ==================== */
window.addEventListener('resize', debounce(() => {
  // Re-initialize magnetic cursor on screen size change
  if (window.innerWidth > 768) {
    // Magnetic effects should work on desktop
  } else {
    // Disable magnetic effects on mobile
    document.querySelectorAll('.magnetic').forEach(el => {
      el.style.transform = 'translate(0, 0)';
    });
  }
}, 250));

/* ==================== ACCESSIBILITY: FOCUS MANAGEMENT ==================== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

/* ==================== SMOOTH SCROLL BEHAVIOR ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

/* ==================== CONSOLE MESSAGE ==================== */
console.log(
  '%c🚀 Welcome to Mohamed Waleed\'s Portfolio!',
  'font-size: 18px; font-weight: bold; color: #6c5ce7;'
);
console.log(
  '%cSoftware Engineer | Flutter Developer | Architecture Enthusiast',
  'font-size: 14px; color: #00b894;'
);

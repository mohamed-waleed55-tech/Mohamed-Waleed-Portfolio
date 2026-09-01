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
    title: 'Eventra',
    emoji: '🎉',
    description: 'Event management platform for creating, discovering, and attending events. Features real-time notifications, event search, ticket booking, and social integration with offline-first capabilities.',
    technologies: ['Flutter', 'Clean Architecture', 'GetX', 'Firebase', 'Hive', 'Retrofit'],
    highlights: ['Real-time Event Updates', 'Offline Support', 'Payment Integration', 'Social Features'],
    link: '#'
  },
  {
    title: 'ClickCart',
    emoji: '🛒',
    description: 'Full-featured e-commerce platform with product catalog, advanced filtering, shopping cart management, secure payment integration, order tracking, and seller dashboard with intuitive UI/UX.',
    technologies: ['Flutter', 'MVVM', 'GetX', 'REST API', 'Firebase', 'Stripe', 'Dio'],
    highlights: ['Product Management', 'Secure Payments', 'Order Tracking', 'Seller Dashboard'],
    link: '#'
  },
  {
    title: 'AI Chat Assistant',
    emoji: '🤖',
    description: 'Intelligent chat application powered by Google Gemini API. Features natural language processing, context-aware conversations, smart recommendations, and multi-turn dialog support.',
    technologies: ['Flutter', 'Gemini API', 'GetX', 'Firebase', 'BLoC', 'Dart'],
    highlights: ['AI Conversations', 'Context Aware', 'Real-time Response', 'Chat History'],
    link: '#'
  },
  {
    title: 'Task Management System',
    emoji: '✅',
    description: 'Collaborative task management application with real-time synchronization, team workspaces, task dependencies, progress tracking, and comprehensive notifications system.',
    technologies: ['Flutter', 'BLoC/Cubit', 'Hive', 'WebSockets', 'MVVM', 'Riverpod'],
    highlights: ['Team Collaboration', 'Real-time Sync', 'Task Dependencies', 'Progress Tracking'],
    link: '#'
  },
  {
    title: 'Health & Fitness Tracker',
    emoji: '💪',
    description: 'Comprehensive health tracking application with workout planning, nutrition monitoring, progress visualization, achievements system, and health metrics analysis.',
    technologies: ['Flutter', 'Provider', 'Firebase', 'Charts', 'Notifications', 'Local Database'],
    highlights: ['Workout Plans', 'Progress Charts', 'Health Metrics', 'Social Sharing'],
    link: '#'
  },
  {
    title: 'Social Media Platform',
    emoji: '👥',
    description: 'Social networking platform with user profiles, feed system, messaging, media sharing, follow/unfollow, notifications, and community features built with scalable architecture.',
    technologies: ['Flutter', 'Riverpod', 'Firebase', 'Cloud Storage', 'Authentication', 'Firestore'],
    highlights: ['User Profiles', 'Real-time Feed', 'Direct Messaging', 'Media Sharing'],
    link: '#'
  }
];

/* ==================== RENDER PROJECTS ==================== */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const projectsHTML = projectsData.map(project => `
    <div class="project-card reveal">
      <div class="project-image">${project.emoji}</div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-highlights">
          ${project.highlights.map(highlight => `<span class="highlight-badge">✨ ${highlight}</span>`).join('')}
        </div>
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

/* ==================== SCROLL ANIMATIONS FOR ELEMENTS ==================== */
const scrollElements = document.querySelectorAll('.reveal');
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const displayScrollElements = () => {
  scrollElements.forEach((element) => {
    if (elementInView(element, 1.25)) {
      element.classList.add('scrolled');
    }
  });
};

window.addEventListener('scroll', () => {
  displayScrollElements();
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
console.log(
  '%cFeatures: Eventra | ClickCart | AI Chat Assistant | Clean Architecture',
  'font-size: 12px; color: #a29bfe;'
);

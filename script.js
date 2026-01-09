/* ===================================
   SET CURRENT YEAR IN FOOTER
   Automatically updates copyright year
   =================================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===================================
   CV DOWNLOAD HANDLER
   Downloads CV as PDF when button is clicked
   =================================== */
document.getElementById('downloadCV').addEventListener('click', function(e) {
  e.preventDefault();  // Prevent default link behavior
  
  // CV content with all information
  const cvContent = `CHEHATA IMENE
Curriculum Vitae

Master's Student in Big Data & Data Science
Horizon School of Digital Technologies, Tunisia

==================================
CONTACT INFORMATION
==================================
Email: chehataimene9@gmail.com
Phone: +216 55 497 105
Location: Monastir, Tunisia

==================================
EDUCATION
==================================

2025 - Present
Master's in Big Data & Data Science
Horizon School of Digital Technologies, Tunisia

2022 - 2025
Bachelor's in Computer Systems Engineering
ISITCOM Hammam Sousse
Specialization: Embedded Systems & IoT

2022
Baccalaureate in Computer Science
Teboulba High School, Monastir

==================================
PROFESSIONAL EXPERIENCE
==================================

2025
Final Year Project Intern
Nouvelair, Tunis
• Designed and developed AI-based tool for flight schedule optimization
• Optimized timetables based on cost, technical, and commercial constraints
• Developed web interface for schedule simulation and validation

2024
Technical Intern
Socoste TAV Information Services Co.
Habib Bourguiba International Airport, Monastir
• Introduction to airport IT infrastructure
• Participated in IoT project using outdoor sensors for parking management
• Switch configuration and integration into server system

==================================
TECHNICAL SKILLS
==================================

Programming Languages:
Python, Java, C, C++, JavaScript, PHP, R, SQL

Web Technologies:
HTML5, CSS3, React, Node.js, Bootstrap, WordPress

Database & Data Management:
MySQL, MongoDB, PostgreSQL, phpMyAdmin, Data Analysis, Big Data

Python Libraries & Frameworks:
NumPy, Pandas, Scikit-learn, TensorFlow, Keras, Matplotlib

AI & Machine Learning:
Machine Learning, Deep Learning, Neural Networks, NLP, Computer Vision, Data Mining

DevOps & Tools:
Git, GitHub, Docker, Linux, VS Code, Jupyter

IoT & Embedded Systems:
Arduino, Raspberry Pi, IoT Systems, Embedded Systems, Sensors, MQTT

Mobile & Other Technologies:
Android, Mobile Development, REST API, Networking, Cloud Computing, Agile

==================================
LANGUAGES
==================================
• Arabic: Native
• French: Fluent
• English: B2 (Upper-Intermediate, IELTS 5.5)

==================================
CERTIFICATIONS
==================================
• Certificate of English Language – CEFR B2
  Imperial English UK, University of Sousse (2025)
• Training of Public Speaking & Self-Confidence (2022)

==================================
INTERESTS
==================================
• Reading
• Technology & Innovation
• Data Science Research
• AI Development
`;

  // Create blob with PDF mime type
  const blob = new Blob([cvContent], { type: 'application/pdf' });
  
  // Create temporary download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Chehata_Imene_CV.pdf';  // Filename
  
  // Trigger download
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  
  // Show success feedback
  const btn = this;
  const originalContent = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
  
  // Reset button after 2 seconds
  setTimeout(() => {
    btn.innerHTML = originalContent;
  }, 2000);
});

/* ===================================
   SMOOTH SCROLLING
   Smooth scroll to sections when nav links clicked
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();  // Stop default jump
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Calculate position accounting for fixed navbar
      const offsetTop = target.offsetTop - 75;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'  // Smooth scroll animation
      });
    }
  });
});

/* ===================================
   NAVBAR SCROLL EFFECT
   Changes navbar shadow when scrolling
   =================================== */
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add more shadow when scrolled
  if (currentScroll > 100) {
    nav.style.boxShadow = '0 4px 30px rgba(139, 111, 92, 0.2)';
  } else {
    nav.style.boxShadow = '0 4px 30px rgba(139, 111, 92, 0.15)';
  }
  
  lastScroll = currentScroll;
});

/* ===================================
   MODAL FUNCTIONS
   Open and close project detail popups
   =================================== */
// Open modal by ID
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');  // Show modal
    document.body.style.overflow = 'hidden';  // Prevent background scroll
  }
}

// Close modal by ID
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');  // Hide modal
    document.body.style.overflow = 'auto';  // Restore scrolling
  }
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target.id);
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(modal => {
      closeModal(modal.id);
    });
  }
});

/* ===================================
   CONTACT FORM HANDLER
   Process form submission
   =================================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent actual form submission
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validate inputs
    if (name && email && message) {
      // Show success message
      const btn = this.querySelector('.btn-submit');
      const originalContent = btn.innerHTML;
      
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #6BCF7F, #4FACFE)';
      
      // Reset after 3 seconds
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.background = '';
        contactForm.reset();  // Clear form fields
      }, 3000);
    } else {
      alert('Please fill in all fields.');
    }
  });
}

/* ===================================
   INTERSECTION OBSERVER
   Animates sections when they come into view
   =================================== */
const observerOptions = {
  threshold: 0.15,  // Trigger when 15% visible
  rootMargin: '0px 0px -80px 0px'  // Trigger slightly early
};

// Create observer
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation with delay
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});

/* ===================================
   ACTIVE NAVIGATION LINK
   Highlights current section in navbar
   =================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    // Check if current scroll position is within this section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.style.color = '';  // Reset all links
        // Highlight link for current section
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.style.color = 'var(--secondary)';
        }
      });
    }
  });
}

// Update on scroll
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();  // Run once on load

/* ===================================
   PARALLAX EFFECT
   Subtle movement on hero elements
   =================================== */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.illustration-container');
  
  // Only apply if hero is visible
  if (hero && heroImage && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

/* ===================================
   SKILL CARD HOVER
   Smooth hover animations
   =================================== */
document.querySelectorAll('.skill-item').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';  // Reset
  });
});

/* ===================================
   BUTTON RIPPLE EFFECT
   Creates ripple animation on click
   =================================== */
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: rippleEffect 0.6s ease-out;
      left: ${x}px;
      top: ${y}px;
    `;
    
    this.appendChild(ripple);
    
    // Remove after animation
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ===================================
   RIPPLE ANIMATION CSS
   Dynamically add animation keyframes
   =================================== */
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    from {
      width: 20px;
      height: 20px;
      opacity: 1;
    }
    to {
      width: 200px;
      height: 200px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

/* ===================================
   FORM INPUT ANIMATIONS
   Smooth transitions on focus
   =================================== */
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'translateY(-2px)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = '';
  });
});

/* ===================================
   PAGE LOAD ANIMATION
   Fade in entire page on load
   =================================== */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
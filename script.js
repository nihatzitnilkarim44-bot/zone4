// ========================================
// WARTA BLORA - INTERACTIVE JAVASCRIPT
// ========================================

// Indonesian month and day names
const hariIndonesia = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const bulanIndonesia = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Display current date in Indonesian format
 */
function displayIndonesianDate() {
  const now = new Date();
  const hari = hariIndonesia[now.getDay()];
  const tanggal = now.getDate();
  const bulan = bulanIndonesia[now.getMonth()];
  const tahun = now.getFullYear();
  
  const dateString = `${hari}, ${tanggal} ${bulan} ${tahun}`;
  
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    dateElement.textContent = dateString;
  }
}

/**
 * Newsletter Subscription Handler
 */
function handleNewsletterSubmit(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput ? emailInput.value : '';
  
  if (email && validateEmail(email)) {
    // Success alert
    alert(`Terima kasih! Email ${email} telah berhasil didaftarkan untuk menerima newsletter Warta Blora.\n\nAnda akan mendapatkan berita terbaru setiap hari.`);
    
    // Clear input
    if (emailInput) {
      emailInput.value = '';
    }
  } else {
    // Error alert
    alert('Mohon masukkan alamat email yang valid.');
  }
}

/**
 * Email validation
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Search functionality
 */
function handleSearch(event) {
  event.preventDefault();
  
  const searchInput = document.getElementById('search-input');
  const query = searchInput ? searchInput.value : '';
  
  if (query.trim() !== '') {
    alert(`Mencari berita tentang: "${query}"\n\nFitur pencarian akan segera tersedia!`);
  } else {
    alert('Mohon masukkan kata kunci pencarian.');
  }
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Active navigation link highlighter
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
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
  
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Fade in animation on scroll
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.news-card, .category-item, .sidebar-widget');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(el => observer.observe(el));
}

/**
 * Mobile menu close on link click
 */
function initMobileMenuClose() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        });
      }
    });
  });
}

/**
 * Read time calculator for articles
 */
function calculateReadTime() {
  const articleContent = document.querySelector('.article-content');
  if (articleContent) {
    const text = articleContent.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute
    
    const readTimeElement = document.getElementById('read-time');
    if (readTimeElement) {
      readTimeElement.textContent = `${readTime} menit`;
    }
  }
}

/**
 * Share button functionality
 */
function initShareButtons() {
  const shareButtons = document.querySelectorAll('[data-share]');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = button.dataset.share;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl = '';
      
      switch(platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${title}%20${url}`;
          break;
        case 'telegram':
          shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}

/**
 * Back to top button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Initialize all functions on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  // Display current date
  displayIndonesianDate();
  
  // Set active navigation link
  setActiveNavLink();
  
  // Newsletter form handler
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  // Search form handler
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize mobile menu auto-close
  initMobileMenuClose();
  
  // Calculate read time for articles
  calculateReadTime();
  
  // Initialize share buttons
  initShareButtons();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize lazy loading (if implemented)
  // initLazyLoading();
  
  console.log('Warta Blora initialized successfully!');
});

/**
 * Update date every minute
 */
setInterval(displayIndonesianDate, 60000);

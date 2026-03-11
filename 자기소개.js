/**
 * 자기소개 페이지 - Brittany Chiang 스타일 인터랙션
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initScrollAnimations();
  initActiveNav();
  initSmoothScroll();
});

/**
 * 모바일 네비게이션 토글
 */
function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a');

  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 스크롤 시 요소 등장 애니메이션
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.section-heading, .section-content, .strength-block, .quote, .experience-item, .vision-item'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

/**
 * 스크롤 위치에 따른 네비게이션 활성화
 */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav a');

  const updateActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateActiveLink(entry.target.getAttribute('id'));
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 히어로 섹션일 때 첫 번째 링크 활성화
  if (window.scrollY < 100) {
    const firstSection = document.querySelector('section[id]');
    if (firstSection) updateActiveLink(firstSection.getAttribute('id'));
  }
}

/**
 * 앵커 링크 부드러운 스크롤
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

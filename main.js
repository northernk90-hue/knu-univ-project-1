(function () {
  'use strict';

  const hamburger = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');
  const overlay = document.getElementById('mobile-overlay');

  function openMenu() {
    mainNav.classList.add('open');
    overlay.classList.add('show');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mainNav.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      mainNav.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  const header = document.getElementById('site-header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.project-card, .skill-group, .about-photo-wrap, .about-text, .contact-info, .contact-form'
  ).forEach(function (el) {
    observer.observe(el);
  });

  document.addEventListener('routechange', function (e) {
    const sectionId = e.detail.sectionId;
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.querySelectorAll(
      '.project-card, .skill-group, .about-photo-wrap, .about-text, .contact-info, .contact-form'
    ).forEach(function (el) {
      el.classList.remove('in-view');
      observer.observe(el);
    });
  });

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameField = document.getElementById('form-name');
      const emailField = document.getElementById('form-email');
      const messageField = document.getElementById('form-message');
      const errName = document.getElementById('err-name');
      const errEmail = document.getElementById('err-email');
      const errMessage = document.getElementById('err-message');
      const successBox = document.getElementById('form-success');
      const submitBtn = document.getElementById('form-submit');

      let valid = true;

      [errName, errEmail, errMessage].forEach(function (el) { el.textContent = ''; });
      [nameField, emailField, messageField].forEach(function (el) {
        el.classList.remove('error');
      });

      if (nameField.value.trim().length < 2) {
        errName.textContent = '이름을 2글자 이상 입력해 주세요.';
        nameField.classList.add('error');
        valid = false;
      }

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(emailField.value.trim())) {
        errEmail.textContent = '올바른 이메일 주소를 입력해 주세요.';
        emailField.classList.add('error');
        valid = false;
      }

      if (messageField.value.trim().length < 10) {
        errMessage.textContent = '메시지를 10글자 이상 입력해 주세요.';
        messageField.classList.add('error');
        valid = false;
      }

      if (!valid) return;

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = '전송 중...';

      setTimeout(function () {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = '메시지 보내기';
        successBox.textContent = '✅ 메시지가 성공적으로 전송되었습니다! 빠른 시일 내 답변 드리겠습니다.';
        successBox.classList.add('show');

        setTimeout(function () {
          successBox.classList.remove('show');
          successBox.textContent = '';
        }, 5000);
      }, 1200);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });

})();

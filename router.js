(function () {
  'use strict';

  const ROUTES = {
    '#home': 'home',
    '#about': 'about',
    '#projects': 'projects',
    '#skills': 'skills',
    '#contact': 'contact',
  };

  const DEFAULT_ROUTE = '#home';

  function navigate(hash) {
    if (!ROUTES[hash]) {
      window.location.replace(DEFAULT_ROUTE);
      return;
    }

    const targetId = ROUTES[hash];

    document.querySelectorAll('.page-section').forEach(function (sec) {
      sec.classList.remove('active');
      sec.setAttribute('aria-hidden', 'true');
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.removeAttribute('aria-hidden');

      window.scrollTo({ top: 0, behavior: 'smooth' });

      targetSection.setAttribute('tabindex', '-1');
      targetSection.focus({ preventScroll: true });
    }

    syncNavLinks(hash);

    if (targetId === 'skills') {
      triggerSkillBars();
    }

    document.dispatchEvent(
      new CustomEvent('routechange', { detail: { hash, sectionId: targetId } })
    );
  }

  function syncNavLinks(activeHash) {
    document.querySelectorAll('.nav-link').forEach(function (link) {
      const linkHash = link.getAttribute('href');
      if (linkHash === activeHash) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  function triggerSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(function (bar) {
      bar.classList.remove('animate');
      void bar.offsetWidth;
      bar.classList.add('animate');
    });
  }

  function getCurrentHash() {
    return window.location.hash || DEFAULT_ROUTE;
  }

  window.addEventListener('hashchange', function () {
    navigate(getCurrentHash());
  });

  window.addEventListener('DOMContentLoaded', function () {
    navigate(getCurrentHash());
  });

  window.Router = {
    go: function (hash) {
      if (window.location.hash === hash) {
        navigate(hash);
      } else {
        window.location.hash = hash;
      }
    },

    current: function () {
      return getCurrentHash();
    },

    routes: function () {
      return Object.keys(ROUTES);
    },
  };

})();

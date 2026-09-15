document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  const menuButton = document.querySelector('.menu-button');
  const menuDropdown = document.querySelector('.menu-dropdown');

  const closeMenu = () => {
    if (menuButton) {
      menuButton.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
    }

    if (menuDropdown) {
      menuDropdown.classList.remove('is-open');
    }
  };

  const openMenu = () => {
    if (menuButton) {
      menuButton.classList.add('active');
      menuButton.setAttribute('aria-expanded', 'true');
    }

    if (menuDropdown) {
      menuDropdown.classList.add('is-open');
    }
  };

  if (menuButton && menuDropdown) {
    menuButton.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = menuButton.classList.contains('active') || menuDropdown.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    document.addEventListener('click', (event) => {
      const clickedInsideMenu = event.target.closest('.menu-button, .menu-dropdown');
      if (!clickedInsideMenu) {
        closeMenu();
      }
    });
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');

    if (!link) {
      return;
    }

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return;
    }

    if (link.target === '_blank' || link.hasAttribute('download')) {
      return;
    }

    const targetUrl = new URL(href, window.location.href);
    if (targetUrl.origin !== window.location.origin) {
      return;
    }

    document.body.classList.remove('page-transition-active');
  });

  window.addEventListener('load', () => {
    document.body.classList.remove('page-transition-active');
  }, { once: true });
});

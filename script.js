const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const servicePanels = document.querySelectorAll('.service-accordion details');
servicePanels.forEach((panel) => {
  panel.addEventListener('toggle', () => {
    if (!panel.open) return;
    servicePanels.forEach((other) => {
      if (other !== panel) other.open = false;
    });
  });
});

const serviceTabs = document.querySelectorAll('.service-tab-nav [data-service]');
const serviceContent = document.querySelectorAll('.service-panel[data-panel]');

serviceTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.service;
    serviceTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    serviceContent.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.panel === selected);
    });
  });
});

const buktaFonts = document.getElementById('bukta-fonts'); if (buktaFonts) buktaFonts.rel = 'stylesheet';

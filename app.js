const navigation = document.querySelector('#navigation');
const menuToggle = document.querySelector('.menu-toggle');
const dialogs = [...document.querySelectorAll('dialog')];
let lastTrigger = null;

function openDialog(dialog, trigger) {
  dialogs.forEach(item => { if (item.open) item.close(); });
  lastTrigger = trigger;
  dialog.showModal();
  document.body.classList.add('modal-open');
  menuToggle.setAttribute('aria-expanded', String(dialog === navigation));
}

menuToggle.addEventListener('click', () => openDialog(navigation, menuToggle));

document.querySelectorAll('[data-modal]').forEach(button => {
  button.addEventListener('click', () => {
    const trigger = navigation.contains(button) ? menuToggle : button;
    openDialog(document.getElementById(`${button.dataset.modal}-dialog`), trigger);
  });
});

dialogs.forEach(dialog => {
  dialog.querySelector('.close-button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!dialogs.some(item => item.open)) {
      document.body.classList.remove('modal-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      lastTrigger?.focus({ preventScroll: true });
    }
  });
  dialog.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const destination = document.querySelector(link.getAttribute('href'));
      if (!destination) return;
      event.preventDefault();
      dialog.close();
      requestAnimationFrame(() => {
        destination.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
        history.replaceState(null, '', link.getAttribute('href'));
      });
    });
  });
});

// Progressive enhancement: every menu category remains visible without JavaScript.
const tabList = document.querySelector('.menu-tabs');
const tabs = [...tabList.querySelectorAll('a')];
const panels = tabs.map(tab => document.querySelector(tab.getAttribute('href')));
tabList.setAttribute('role', 'tablist');
function selectMenuTab(index, focus = false) {
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panels[i].hidden = !selected;
  });
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, i) => {
  tab.id = `menu-tab-${i}`;
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panels[i].id);
  panels[i].setAttribute('role', 'tabpanel');
  panels[i].setAttribute('aria-labelledby', tab.id);
  panels[i].tabIndex = 0;
  tab.addEventListener('click', event => { event.preventDefault(); selectMenuTab(i); });
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectMenuTab(next, true); }
  });
});
const initialPanel = panels.findIndex(panel => `#${panel.id}` === location.hash);
selectMenuTab(initialPanel < 0 ? 0 : initialPanel);
window.addEventListener('hashchange', () => {
  const index = panels.findIndex(panel => `#${panel.id}` === location.hash);
  if (index >= 0) selectMenuTab(index);
});

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

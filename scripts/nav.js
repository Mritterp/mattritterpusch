// Site nav — burger button opens a slide-out drawer with the full link list.
(function () {
  var burger = document.querySelector('.burger-btn');
  var overlay = document.querySelector('.nav-overlay');
  var drawer = document.querySelector('.nav-drawer');
  if (!burger || !overlay || !drawer) return;

  function open() {
    burger.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    burger.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    drawer.classList.contains('is-open') ? close() : open();
  });
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  drawer.querySelectorAll('.nav-drawer__link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!link.getAttribute('target')) close();
    });
  });
})();

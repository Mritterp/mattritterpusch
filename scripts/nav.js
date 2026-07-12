// Site nav — burger button opens a full-screen drawer with the full link list.
(function () {
  var nav = document.querySelector('.site-nav');
  var burger = document.querySelector('.burger-btn');
  var drawer = document.querySelector('.nav-drawer');
  if (!nav || !burger || !drawer) return;

  function open() {
    nav.classList.add('is-open');
    burger.classList.add('is-open');
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    nav.classList.remove('is-open');
    burger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    drawer.classList.contains('is-open') ? close() : open();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  drawer.querySelectorAll('.nav-drawer__link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!link.getAttribute('target')) close();
    });
  });
})();

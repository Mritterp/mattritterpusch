// Store page — card preview play button + scrub overlay.
// Reads the audio URL from each play button's data-audio attribute.
(function () {
  var au = null, activeBtn = null, transport = null, rafId = null;

  function fmt(s) {
    var m = Math.floor(s / 60);
    return m + ':' + ('0' + Math.floor(s % 60)).slice(-2);
  }

  function removeTransport() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (transport && transport.parentNode) transport.parentNode.removeChild(transport);
    transport = null;
  }

  function createTransport(wrap) {
    removeTransport();
    transport = document.createElement('div');
    transport.className = 'card-transport';
    transport.innerHTML = '<div class="ct-track"><div class="ct-fill"></div></div><span class="ct-time">0:00</span>';
    transport.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!au || !au.duration) return;
      var track = transport.querySelector('.ct-track');
      var rect = track.getBoundingClientRect();
      au.currentTime = (e.clientX - rect.left) / rect.width * au.duration;
    });
    wrap.appendChild(transport);
  }

  function tick() {
    if (!au || !transport) return;
    var pct = au.duration ? au.currentTime / au.duration * 100 : 0;
    transport.querySelector('.ct-fill').style.width = pct + '%';
    transport.querySelector('.ct-time').textContent = fmt(au.currentTime);
    rafId = requestAnimationFrame(tick);
  }

  function stopAll() {
    if (activeBtn) {
      activeBtn.classList.remove('play-btn--pause');
      activeBtn.classList.add('play-btn--play');
    }
    if (au) { au.pause(); au.currentTime = 0; }
    removeTransport();
    au = null; activeBtn = null;
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.card-transport')) return;
    var btn = e.target.closest('.store-card__play');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var src = btn.getAttribute('data-audio');
    if (!src) return;

    if (btn === activeBtn) { stopAll(); return; }
    stopAll();

    au = new Audio(src);
    au.play();
    activeBtn = btn;
    btn.classList.remove('play-btn--play');
    btn.classList.add('play-btn--pause');
    createTransport(btn.closest('.store-card__img-wrap'));
    rafId = requestAnimationFrame(tick);
    au.onended = stopAll;
  });
})();

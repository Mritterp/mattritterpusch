// Store page — card preview play button + grow-from-button transport bar.
// Reads the audio URL from each play button's data-audio attribute.
// Each card's .card-transport is static markup (see store/index.html) --
// this only toggles the "open" class and updates its fill/time, so the
// width transition has a persistent element to animate.
(function () {
  var au = null, activeBtn = null, activeTransport = null, rafId = null;

  function fmt(s) {
    var m = Math.floor(s / 60);
    return m + ':' + ('0' + Math.floor(s % 60)).slice(-2);
  }

  function tick() {
    if (!au || !activeTransport) return;
    var pct = au.duration ? au.currentTime / au.duration * 100 : 0;
    activeTransport.querySelector('.ct-fill').style.width = pct + '%';
    activeTransport.querySelector('.ct-time').textContent = fmt(au.currentTime);
    rafId = requestAnimationFrame(tick);
  }

  function stopAll() {
    if (activeBtn) {
      activeBtn.classList.remove('play-btn--stop');
      activeBtn.classList.add('play-btn--play');
    }
    if (activeTransport) {
      activeTransport.classList.remove('open');
      activeTransport.querySelector('.ct-fill').style.width = '0%';
      activeTransport.querySelector('.ct-time').textContent = '0:00';
    }
    if (au) { au.pause(); au.currentTime = 0; }
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    au = null; activeBtn = null; activeTransport = null;
  }

  document.addEventListener('click', function (e) {
    var track = e.target.closest('.ct-track');
    if (track) {
      e.preventDefault();
      e.stopPropagation();
      if (au && au.duration) {
        var rect = track.getBoundingClientRect();
        au.currentTime = (e.clientX - rect.left) / rect.width * au.duration;
      }
      return;
    }

    // Anywhere else in the translucent transport bar (its padding/border,
    // not the track or the play/stop button) should just absorb the click
    // -- must preventDefault too, or the card's <a> still navigates.
    if (e.target.closest('.card-transport')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    var btn = e.target.closest('.store-card__play');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var src = btn.getAttribute('data-audio');
    if (!src) return;

    if (btn === activeBtn) { stopAll(); return; }
    stopAll();

    var row = btn.closest('.card-transport-row');
    var transport = row ? row.querySelector('.card-transport') : null;
    if (!transport) return;

    au = new Audio(src);
    au.play();
    activeBtn = btn;
    activeTransport = transport;
    btn.classList.remove('play-btn--play');
    btn.classList.add('play-btn--stop');
    transport.classList.add('open');
    rafId = requestAnimationFrame(tick);
    au.onended = stopAll;
  });
})();

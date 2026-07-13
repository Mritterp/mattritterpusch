// Mixing page — track list audio player with scrub bar + volume slider.
// Reads data-audio/data-title/data-artist/data-duration from each .track-row.
(function () {
  var sharedVolume = 70;
  var current = null; // { audio, row, btn, player, fill, time, rafId }

  function fmt(s) {
    if (!isFinite(s)) return '0:00';
    var m = Math.floor(s / 60);
    return m + ':' + ('0' + Math.floor(s % 60)).slice(-2);
  }

  function tick() {
    if (!current) return;
    var audio = current.audio;
    var pct = audio.duration ? audio.currentTime / audio.duration * 100 : 0;
    current.fill.style.width = pct + '%';
    current.timeEl.textContent = fmt(audio.currentTime);
    current.rafId = requestAnimationFrame(tick);
  }

  // Pause in place: keeps the transport bar open and playhead position intact.
  function pauseCurrent() {
    if (!current) return;
    current.audio.pause();
    if (current.rafId) cancelAnimationFrame(current.rafId);
    current.rafId = null;
    current.btn.classList.remove('play-btn--pause');
    current.btn.classList.add('play-btn--play');
  }

  function resumeCurrent() {
    if (!current) return;
    current.audio.play();
    current.btn.classList.remove('play-btn--play');
    current.btn.classList.add('play-btn--pause');
    current.rafId = requestAnimationFrame(tick);
  }

  // Full stop: resets the playhead and collapses the transport bar.
  // Used when switching to a different track or when a track finishes.
  function stop() {
    if (!current) return;
    current.audio.pause();
    current.audio.currentTime = 0;
    current.btn.classList.remove('play-btn--pause');
    current.btn.classList.add('play-btn--play');
    current.player.classList.remove('open');
    current.row.classList.remove('is-playing');
    if (current.rafId) cancelAnimationFrame(current.rafId);
    current = null;
  }

  document.querySelectorAll('.track-row').forEach(function (row) {
    var src = row.getAttribute('data-audio');
    if (!src) return;

    var player = document.createElement('div');
    player.className = 'track-player';
    player.innerHTML =
      '<div class="tp-bar">' +
        '<span class="tp-current">0:00</span>' +
        '<div class="tp-wrap"><div class="tp-fill"></div></div>' +
        '<div class="volume-slider">' +
          '<div class="volume-slider__track"><div class="volume-slider__fill"></div><div class="volume-slider__thumb"></div></div>' +
          '<span class="volume-slider__value">' + sharedVolume + '%</span>' +
        '</div>' +
      '</div>';
    row.appendChild(player);

    var btn = row.querySelector('.play-btn');
    var fill = player.querySelector('.tp-fill');
    var timeEl = player.querySelector('.tp-current');
    var scrub = player.querySelector('.tp-wrap');
    var volTrack = player.querySelector('.volume-slider__track');
    var volFill = player.querySelector('.volume-slider__fill');
    var volThumb = player.querySelector('.volume-slider__thumb');
    var volValue = player.querySelector('.volume-slider__value');

    function setVolumeUI(pct) {
      volFill.style.width = pct + '%';
      volThumb.style.left = pct + '%';
      volValue.textContent = Math.round(pct) + '%';
    }
    setVolumeUI(sharedVolume);

    function volumeFromEvent(e) {
      var rect = volTrack.getBoundingClientRect();
      var pct = Math.min(100, Math.max(0, (e.clientX - rect.left) / rect.width * 100));
      sharedVolume = pct;
      setVolumeUI(pct);
      if (current) current.audio.volume = pct / 100;
    }
    volTrack.addEventListener('click', volumeFromEvent);
    volTrack.addEventListener('mousedown', function (e) {
      function onMove(ev) { volumeFromEvent(ev); }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      volumeFromEvent(e);
    });

    scrub.addEventListener('click', function (e) {
      if (!current || current.row !== row || !current.audio.duration) return;
      var rect = scrub.getBoundingClientRect();
      current.audio.currentTime = (e.clientX - rect.left) / rect.width * current.audio.duration;
    });

    btn.addEventListener('click', function () {
      if (current && current.row === row) {
        if (current.audio.paused) {
          resumeCurrent();
        } else {
          pauseCurrent();
        }
        return;
      }
      stop();

      var audio = new Audio(src);
      audio.volume = sharedVolume / 100;
      current = { audio: audio, row: row, btn: btn, player: player, fill: fill, timeEl: timeEl, rafId: null };
      btn.classList.remove('play-btn--play');
      btn.classList.add('play-btn--pause');
      player.classList.add('open');
      row.classList.add('is-playing');
      audio.play();
      current.rafId = requestAnimationFrame(tick);
      audio.onended = stop;
    });
  });
})();

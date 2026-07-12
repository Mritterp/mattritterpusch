// Product page — YouTube embed + audio preview player with volume slider.
// Reads product data from window.PRODUCT (set inline per product page).
(function () {
  var product = window.PRODUCT;
  if (!product) return;

  // ── YouTube embed ──
  var videoMount = document.querySelector('.pdp-video');
  if (videoMount && product.youtubeId) {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + product.youtubeId + '?rel=0&modestbranding=1';
    iframe.title = product.title + ' — preview video';
    iframe.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    videoMount.appendChild(iframe);
  }

  // ── Audio preview player ──
  var mount = document.querySelector('.prod-player-mount');
  if (!mount || !product.audioPreview) return;
  var src = product.audioPreview;
  var au = null, playing = false, rafId = null, volume = 70;

  function fmt(s) {
    if (!isFinite(s)) return '0:00';
    var m = Math.floor(s / 60);
    return m + ':' + ('0' + Math.floor(s % 60)).slice(-2);
  }

  var wrap = document.createElement('div');
  wrap.className = 'prod-player';
  wrap.innerHTML = [
    '<button class="prod-play-btn" type="button">Preview</button>',
    '<div class="prod-transport">',
    '  <span class="prod-time">0:00</span>',
    '  <div class="prod-track"><div class="prod-fill"></div></div>',
    '</div>',
    '<div class="volume-slider">',
    '  <div class="volume-slider__track"><div class="volume-slider__fill"></div><div class="volume-slider__thumb"></div></div>',
    '  <span class="volume-slider__value">' + volume + '%</span>',
    '</div>'
  ].join('');
  mount.appendChild(wrap);

  var btn = wrap.querySelector('.prod-play-btn');
  var fill = wrap.querySelector('.prod-fill');
  var timeEl = wrap.querySelector('.prod-time');
  var track = wrap.querySelector('.prod-track');
  var volTrack = wrap.querySelector('.volume-slider__track');
  var volFill = wrap.querySelector('.volume-slider__fill');
  var volThumb = wrap.querySelector('.volume-slider__thumb');
  var volValue = wrap.querySelector('.volume-slider__value');

  function setVolumeUI(pct) {
    volFill.style.width = pct + '%';
    volThumb.style.left = pct + '%';
    volValue.textContent = Math.round(pct) + '%';
  }
  setVolumeUI(volume);

  function volumeFromEvent(e) {
    var rect = volTrack.getBoundingClientRect();
    var pct = Math.min(100, Math.max(0, (e.clientX - rect.left) / rect.width * 100));
    volume = pct;
    setVolumeUI(pct);
    if (au) au.volume = pct / 100;
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

  track.addEventListener('click', function (e) {
    if (!au || !au.duration) return;
    var rect = track.getBoundingClientRect();
    au.currentTime = (e.clientX - rect.left) / rect.width * au.duration;
  });

  function stop() {
    if (au) { au.pause(); au.currentTime = 0; }
    playing = false;
    btn.classList.remove('is-playing');
    btn.textContent = 'Preview';
    fill.style.width = '0%';
    timeEl.textContent = '0:00';
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  btn.addEventListener('click', function () {
    if (playing) { stop(); return; }
    if (!au) {
      au = new Audio(src);
      au.volume = volume / 100;
      au.onended = stop;
    }
    au.play();
    playing = true;
    btn.classList.add('is-playing');
    btn.textContent = 'Pause';
    (function tick() {
      if (!au || !playing) return;
      var pct = au.duration ? au.currentTime / au.duration * 100 : 0;
      fill.style.width = pct + '%';
      timeEl.textContent = fmt(au.currentTime);
      rafId = requestAnimationFrame(tick);
    })();
  });
})();

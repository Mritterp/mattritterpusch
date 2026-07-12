// Home page — hover-video panels (TYO Sound / Mixing / Films)
(function () {
  document.querySelectorAll('.home-panel').forEach(function (panel) {
    var video = panel.querySelector('.home-panel__video');
    if (!video) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';

    panel.addEventListener('mouseenter', function () {
      video.play();
      video.style.opacity = '1';
    });
    panel.addEventListener('mouseleave', function () {
      video.style.opacity = '0';
      setTimeout(function () { video.pause(); video.currentTime = 0; }, 400);
    });
  });
})();

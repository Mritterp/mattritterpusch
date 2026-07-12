// Home page — hover-video panels (TYO Sound / Mixing / Films)
// Visual grayscale/overlay transitions are handled by CSS :hover;
// this just drives video playback since autoplaying muted video still
// needs an explicit play() call triggered by interaction on some browsers.
(function () {
  document.querySelectorAll('.home-panel').forEach(function (panel) {
    var video = panel.querySelector('.home-panel__video');
    if (!video) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'auto';

    panel.addEventListener('mouseenter', function () {
      video.play();
    });
    panel.addEventListener('mouseleave', function () {
      video.pause();
      video.currentTime = 0;
    });
  });
})();

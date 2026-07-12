// Home page — hover-video panels (TYO Sound / Mixing / Films)
// Color wash is scoped to the hovered panel (CSS :hover), but the
// title+arrow reveal is a single element centered on the whole row —
// toggle its "is-active" state here based on which panel is hovered.
(function () {
  document.querySelectorAll('.home-panel').forEach(function (panel) {
    var video = panel.querySelector('.home-panel__video');
    var key = panel.getAttribute('data-panel');
    var titleGroup = document.querySelector('.home-panels__title-group[data-for="' + key + '"]');
    if (video) {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
    }

    panel.addEventListener('mouseenter', function () {
      if (video) video.play();
      if (titleGroup) titleGroup.classList.add('is-active');
    });
    panel.addEventListener('mouseleave', function () {
      if (video) { video.pause(); video.currentTime = 0; }
      if (titleGroup) titleGroup.classList.remove('is-active');
    });
  });
})();

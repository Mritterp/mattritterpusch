// Product page -- Phone/Desktop screenshot carousel. Reads slide data from
// window.CAROUSEL (set inline per product page) and mounts into
// .screenshot-carousel-mount. Each mode (phone/desktop) tracks its own
// slide index independently, so switching tabs doesn't reset the other.
(function () {
  var data = window.CAROUSEL;
  var mount = document.querySelector('.screenshot-carousel-mount');
  if (!mount || !data) return;

  var mode = 'phone';
  var index = { phone: 0, desktop: 0 };

  var root = document.createElement('div');
  root.className = 'screenshot-carousel';
  root.innerHTML = [
    '<div class="screenshot-carousel__label">Preview</div>',
    '<div class="screenshot-carousel__tabs">',
    '  <button class="screenshot-carousel__tab" type="button" data-mode="phone">Phone</button>',
    '  <button class="screenshot-carousel__tab" type="button" data-mode="desktop">Desktop</button>',
    '</div>',
    '<div class="screenshot-carousel__stage">',
    '  <button class="screenshot-carousel__arrow" type="button" data-dir="-1" aria-label="Previous screenshot">‹</button>',
    '  <div class="screenshot-carousel__frame"></div>',
    '  <button class="screenshot-carousel__arrow" type="button" data-dir="1" aria-label="Next screenshot">›</button>',
    '</div>',
    '<div class="screenshot-carousel__dots"></div>',
  ].join('');
  mount.appendChild(root);

  var tabs = root.querySelectorAll('.screenshot-carousel__tab');
  var frame = root.querySelector('.screenshot-carousel__frame');
  var dotsWrap = root.querySelector('.screenshot-carousel__dots');
  var arrows = root.querySelectorAll('.screenshot-carousel__arrow');

  function slides() {
    return mode === 'phone' ? data.phone : data.desktop;
  }

  function goTo(i) {
    var n = slides().length;
    index[mode] = (i + n) % n;
    render();
  }

  function render() {
    tabs.forEach(function (t) {
      t.classList.toggle('is-active', t.getAttribute('data-mode') === mode);
    });

    var active = slides()[index[mode]];
    var screenClass = mode === 'phone' ? 'screenshot-carousel__phone' : 'screenshot-carousel__desktop';
    var innerClass = mode === 'phone' ? 'screenshot-carousel__phone-screen' : 'screenshot-carousel__desktop-screen';
    frame.innerHTML = '<div class="' + screenClass + '"><div class="' + innerClass + '">' +
      '<img src="' + active.src + '" alt="' + active.caption + '" />' +
      '</div></div>';

    dotsWrap.innerHTML = '';
    slides().forEach(function (s, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'screenshot-carousel__dot' + (i === index[mode] ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Go to screenshot ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      mode = t.getAttribute('data-mode');
      render();
    });
  });

  arrows.forEach(function (a) {
    a.addEventListener('click', function () {
      goTo(index[mode] + parseInt(a.getAttribute('data-dir'), 10));
    });
  });

  render();
})();

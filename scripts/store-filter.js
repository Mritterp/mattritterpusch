// Store page — client-side category chip filter.
(function () {
  var chips = document.querySelectorAll('.chip.is-filter');
  var cards = document.querySelectorAll('.store-card');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var cat = chip.getAttribute('data-category');
      cards.forEach(function (card) {
        var match = cat === 'All' || card.getAttribute('data-category') === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  });
})();

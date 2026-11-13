/* Patient resources: live search (hero form) + category chips filter the resource cards. */
(function () {
  var dir = document.querySelector('[data-res-dir]');
  if (!dir) return;
  var form = document.querySelector('[data-res-search]');
  var input = form && form.querySelector('input[name="q"]');
  var chips = [].slice.call(dir.querySelectorAll('.res-chip'));
  var groups = [].slice.call(dir.querySelectorAll('.res-group'));
  var empty = dir.querySelector('.res-empty');
  var cat = 'all';

  function apply() {
    var q = input ? input.value.trim().toLowerCase() : '';
    var total = 0;
    groups.forEach(function (g) {
      var inCat = cat === 'all' || g.getAttribute('data-cat') === cat;
      var n = 0;
      [].forEach.call(g.querySelectorAll('.res-card'), function (c) {
        var hit = !q || c.getAttribute('data-search').indexOf(q) > -1;
        c.hidden = !hit;
        if (hit) n++;
      });
      g.querySelector('[data-count]').textContent = n;
      g.hidden = !inCat || n === 0;
      if (!g.hidden) total += n;
    });
    if (empty) empty.hidden = total > 0;
  }

  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      cat = b.getAttribute('data-cat');
      chips.forEach(function (x) { x.classList.toggle('is-active', x === b); });
      apply();
    });
  });
  if (input) input.addEventListener('input', function () {
    if (cat !== 'all') { cat = 'all'; chips.forEach(function (x) { x.classList.toggle('is-active', x.getAttribute('data-cat') === 'all'); }); }
    apply();
  });
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    apply();
    dir.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

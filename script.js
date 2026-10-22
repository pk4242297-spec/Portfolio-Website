(function () {
  var root = document.documentElement;

  /* Theme toggle */
  var themeBtn = document.getElementById('themeBtn');
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) {}
  themeBtn.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    if (!current) current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* Hero code cell */
  var out = document.getElementById('out');
  var runBtn = document.getElementById('runBtn');
  var lines = [
    ['name', 'Praveen Kumar P'],
    ['studying', 'BCA, Artificial Intelligence'],
    ['university', 'Rathinam Global Deemed to be University'],
    ['focus', "['Generative AI', 'AI agents', 'Data analytics']"],
    ['open_to', 'Entry-level roles']
  ];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timers = [];

  function addLine(pair) {
    var row = document.createElement('span');
    row.className = 'ln';
    var key = document.createElement('span');
    key.className = 'key';
    key.textContent = pair[0] + ': ';
    row.appendChild(key);
    row.appendChild(document.createTextNode(pair[1]));
    out.appendChild(row);
  }

  function run() {
    timers.forEach(clearTimeout);
    timers = [];
    out.textContent = '';
    if (reduceMotion) {
      lines.forEach(addLine);
      runBtn.textContent = 'Run again';
      return;
    }
    runBtn.disabled = true;
    runBtn.textContent = 'Running...';
    lines.forEach(function (pair, i) {
      timers.push(setTimeout(function () { addLine(pair); }, 450 + i * 220));
    });
    timers.push(setTimeout(function () {
      runBtn.disabled = false;
      runBtn.textContent = 'Run again';
    }, 450 + lines.length * 220));
  }

  runBtn.addEventListener('click', run);
  runBtn.textContent = 'Run';
  setTimeout(run, 500);

  /* Copy email */
  var copyBtn = document.getElementById('copyBtn');
  var status = document.getElementById('copyStatus');
  copyBtn.addEventListener('click', function () {
    var email = 'pk4242297@gmail.com';
    function done(ok) {
      status.textContent = ok ? 'Email copied' : 'Press and hold the address to copy';
      setTimeout(function () { status.textContent = ''; }, 2500);
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    } catch (e) { done(false); }
  });
})();

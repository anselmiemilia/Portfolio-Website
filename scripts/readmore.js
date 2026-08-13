document.addEventListener('DOMContentLoaded', function () {
  const beschreibung = document.querySelector('.beschreibung');
  if (!beschreibung) return;
  if (window.innerWidth > 768) return;

  // Outer wrapper
  const outer = document.createElement('div');
  outer.className = 'mehr-lesen-wrapper';

  // Inner text wrapper — exakt wie Über mich
  const inner = document.createElement('div');
  inner.className = 'mehr-lesen-text collapsed';

  // Button
  const btn = document.createElement('button');
  btn.className = 'mehr-lesen-btn';
  btn.style.display = 'block';
  btn.textContent = window.i18n ? window.i18n.t('ui.mehrLesen') : 'Mehr lesen';

  // Struktur aufbauen
  beschreibung.parentNode.insertBefore(outer, beschreibung);
  outer.appendChild(inner);
  inner.appendChild(beschreibung);
  outer.appendChild(btn);

  btn.addEventListener('click', function () {
    const isCollapsed = inner.classList.contains('collapsed');
    inner.classList.toggle('collapsed');
    btn.textContent = window.i18n
      ? window.i18n.t(isCollapsed ? 'ui.wenigerLesen' : 'ui.mehrLesen')
      : (isCollapsed ? 'Weniger lesen' : 'Mehr lesen');
  });

  document.addEventListener('langchange', function () {
    const isCollapsed = inner.classList.contains('collapsed');
    btn.textContent = window.i18n.t(isCollapsed ? 'ui.mehrLesen' : 'ui.wenigerLesen');
  });
});

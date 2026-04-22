document.addEventListener('DOMContentLoaded', function () {
  const beschreibung = document.querySelector('.beschreibung');
  if (!beschreibung) return;

  // Nur auf Mobile
  if (window.innerWidth > 768) return;

  // Wrapper bauen
  const wrapper = document.createElement('div');
  wrapper.className = 'readmore-wrapper';
  beschreibung.parentNode.insertBefore(wrapper, beschreibung);
  wrapper.appendChild(beschreibung);

  // Button
  const btn = document.createElement('button');
  btn.className = 'readmore-btn';
  btn.innerHTML = '... mehr lesen';
  wrapper.appendChild(btn);

  // Collapsed state setzen
  beschreibung.classList.add('readmore-collapsed');

  btn.addEventListener('click', function () {
    const isCollapsed = beschreibung.classList.contains('readmore-collapsed');
    beschreibung.classList.toggle('readmore-collapsed');
    btn.innerHTML = isCollapsed ? 'weniger lesen' : '... mehr lesen';
  });
});

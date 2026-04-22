document.addEventListener('DOMContentLoaded', function () {
  const beschreibung = document.querySelector('.beschreibung');
  if (!beschreibung) return;

  // Nur auf Mobile
  if (window.innerWidth > 768) return;

  // Wrapper bauen — selbe Klassen wie Über mich
  const wrapper = document.createElement('div');
  wrapper.className = 'mehr-lesen-wrapper';
  beschreibung.parentNode.insertBefore(wrapper, beschreibung);
  wrapper.appendChild(beschreibung);

  // Text in inner div
  beschreibung.classList.add('mehr-lesen-text', 'collapsed');

  // Button
  const btn = document.createElement('button');
  btn.className = 'mehr-lesen-btn';
  btn.style.display = 'block';
  btn.innerHTML = 'Mehr lesen';
  wrapper.appendChild(btn);

  btn.addEventListener('click', function () {
    const isCollapsed = beschreibung.classList.contains('collapsed');
    beschreibung.classList.toggle('collapsed');
    btn.innerHTML = isCollapsed ? 'Weniger lesen' : 'Mehr lesen';
  });
});

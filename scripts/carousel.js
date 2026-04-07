// Per-Card Image Slideshow (staggered auto-advance, no simultaneous changes)
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.projekt-card');
  if (!cards.length) return;

  cards.forEach((card, cardIndex) => {
    const container = card.querySelector('.slideshow-images');
    if (!container) return;

    const images = container.querySelectorAll('img');
    if (images.length <= 1) return;

    let current = 0;
    let timer = null;

    // Create nav arrows
    const prevBtn = document.createElement('button');
    prevBtn.className = 'slide-prev';
    prevBtn.innerHTML = '‹';
    prevBtn.setAttribute('aria-label', 'Vorheriges Bild');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'slide-next';
    nextBtn.innerHTML = '›';
    nextBtn.setAttribute('aria-label', 'Nächstes Bild');

    card.appendChild(prevBtn);
    card.appendChild(nextBtn);

    // Create dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slide-dots';
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goTo(i, true);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    });
    card.appendChild(dotsContainer);

    function goTo(index, fast) {
      if (fast) {
        // Sofortiger Wechsel ohne Fade bei manuellem Klick
        images.forEach(img => {
          img.style.transition = 'none';
        });
        // Force reflow dann transition zurücksetzen
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            images.forEach(img => {
              img.style.transition = '';
            });
          });
        });
      }
      images[current].classList.remove('active');
      current = ((index % images.length) + images.length) % images.length;
      images[current].classList.add('active');

      dotsContainer.querySelectorAll('.slide-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function next(fast) { goTo(current + 1, fast); }
    function prev(fast) { goTo(current - 1, fast); }

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      prev(true);
      resetTimer();
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      next(true);
      resetTimer();
    });

    // Staggered autoplay: each card starts offset by 300ms * cardIndex
    function startTimer() {
      timer = setInterval(next, 4000);
    }

    function stopTimer() {
      clearInterval(timer);
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    // Pause on hover
    card.addEventListener('mouseenter', stopTimer);
    card.addEventListener('mouseleave', startTimer);

    // Staggered start so cards don't all switch at the same time
    setTimeout(startTimer, cardIndex * 300);
  });
});

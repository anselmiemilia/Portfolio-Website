// Lightbox Gallery Functionality
document.addEventListener('DOMContentLoaded', function () {
  const projektImages = Array.from(document.querySelectorAll('.projekt-galerie img'));
  const produktMain = document.querySelector('.produkt-gallery-main img');
  const produktThumbs = Array.from(document.querySelectorAll('.produkt-thumb'));

  // Slides to page through, plus the elements that open the lightbox.
  // On a product page the main image is a single <img> whose src gets swapped,
  // so the slides come from the thumbnails instead — otherwise there would only
  // ever be one slide and the arrows would be hidden.
  let slides = [];
  let triggers = [];

  if (produktMain) {
    slides = produktThumbs.length
      ? produktThumbs.map(thumb => ({
          src: thumb.dataset.full,
          alt: thumb.dataset.alt || ''
        }))
      : [{ src: produktMain.src, alt: produktMain.alt }];
    triggers = [produktMain];
  } else if (projektImages.length) {
    slides = projektImages.map(img => ({ src: img.src, alt: img.alt }));
    triggers = projektImages;
  }

  if (!slides.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Bildansicht');

  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Schließen">✕</button>
    <button class="lightbox-prev" type="button" aria-label="Vorheriges Bild">&lt;</button>
    <button class="lightbox-next" type="button" aria-label="Nächstes Bild">&gt;</button>
    <div class="lightbox-content">
      <img src="" alt="">
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let lastFocused = null;

  if (slides.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  // Which slide is on screen right now — on a product page the visible photo is
  // whichever thumbnail is active, so the lightbox opens on that one.
  function activeIndex() {
    if (!produktMain) return 0;
    const active = produktThumbs.findIndex(t => t.classList.contains('active'));
    if (active !== -1) return active;
    const bySrc = slides.findIndex(s => s.src && produktMain.src.endsWith(s.src.split('/').pop()));
    return bySrc === -1 ? 0 : bySrc;
  }

  function showSlide(index) {
    currentIndex = ((index % slides.length) + slides.length) % slides.length;
    lightboxImg.src = slides[currentIndex].src;
    lightboxImg.alt = slides[currentIndex].alt;
    // Keep the page behind the lightbox in sync, so closing leaves the visitor
    // on the photo they were last looking at.
    if (produktMain && produktThumbs.length) {
      const thumb = produktThumbs[currentIndex];
      if (thumb) {
        produktThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        produktMain.src = thumb.dataset.full;
        produktMain.alt = thumb.dataset.alt || produktMain.alt;
      }
    }
  }

  function openLightbox(index) {
    lastFocused = document.activeElement;
    lightboxImg.style.opacity = '1';
    showSlide(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function prevImage() { showSlide(currentIndex - 1); }
  function nextImage() { showSlide(currentIndex + 1); }

  triggers.forEach((el, index) => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => openLightbox(produktMain ? activeIndex() : index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // Swipe between photos on touch devices.
  let touchStartX = null;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    if (touchStartX === null || slides.length <= 1) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? nextImage() : prevImage(); }
    touchStartX = null;
  }, { passive: true });
});

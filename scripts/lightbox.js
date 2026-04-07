// Lightbox Gallery Functionality
document.addEventListener('DOMContentLoaded', function () {
  const galleryImages = document.querySelectorAll('.projekt-galerie img');

  if (galleryImages.length === 0) return;

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';

  lightbox.innerHTML = `
    <button class="lightbox-close">✕</button>
    <button class="lightbox-prev">&lt;</button>
    <button class="lightbox-next">&gt;</button>
    <div class="lightbox-content">
      <img src="" alt="Lightbox Image">
    </div>
  `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const images = Array.from(galleryImages);

  // Open lightbox
  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.style.opacity = '1';
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Fast image switch without flash
  function switchImage(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
  }

  // Navigate to previous image
  function prevImage() {
    switchImage((currentIndex - 1 + images.length) % images.length);
  }

  // Navigate to next image
  function nextImage() {
    switchImage((currentIndex + 1) % images.length);
  }

  // Event listeners
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
});

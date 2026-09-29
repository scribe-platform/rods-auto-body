document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Gallery lightbox — click a photo to view it large; arrows/Esc to navigate
  var lightbox = document.querySelector('.lightbox');
  var galleryImgs = document.querySelectorAll('.gallery-grid-full .gallery-item img');

  if (lightbox && galleryImgs.length) {
    var lbImg = lightbox.querySelector('img');
    var current = 0;

    function show(i) {
      current = (i + galleryImgs.length) % galleryImgs.length;
      lbImg.src = galleryImgs[current].src;
      lbImg.alt = galleryImgs[current].alt;
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryImgs.forEach(function (img, i) {
      img.parentElement.addEventListener('click', function () {
        show(i);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.querySelector('.lb-close').addEventListener('click', close);
    lightbox.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lightbox.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
});

const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

// MOBILE WORKS PANEL
const navToggle = document.querySelector('.nav-toggle');
const mobileWorksPanel = document.getElementById('mobile-works-panel');

if (navToggle && mobileWorksPanel) {
  const closePanel = () => {
    mobileWorksPanel.classList.remove('open');
    mobileWorksPanel.setAttribute('aria-hidden', 'true');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  const openPanel = () => {
    mobileWorksPanel.classList.add('open');
    mobileWorksPanel.setAttribute('aria-hidden', 'false');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };

  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (mobileWorksPanel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  mobileWorksPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closePanel();
    });
  });

  document.addEventListener('click', (e) => {
    if (
      !mobileWorksPanel.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closePanel();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePanel();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
      closePanel();
    }
  });
}

// HERO CAROUSEL
const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));
const heroDots = Array.from(document.querySelectorAll('.hero-dot'));
const progressBar = document.getElementById('heroProgress');
const heroCarousel = document.querySelector('.hero-carousel');

let heroIndex = 0;
let heroInterval = null;
const heroDuration = 6000;

function resetProgress() {
  if (!progressBar) return;

  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  void progressBar.offsetWidth;
  progressBar.style.transition = `width ${heroDuration}ms linear`;
  progressBar.style.width = '100%';
}

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  heroIndex = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === heroIndex);

    const img = slide.querySelector('img');
    if (img) {
      img.style.animation = 'none';
      void img.offsetWidth;
      img.style.animation =
        i === heroIndex ? `heroKenBurns ${heroDuration}ms ease forwards` : 'none';
    }
  });

  heroDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === heroIndex);
  });

  resetProgress();
}

function nextHeroSlide() {
  showHeroSlide(heroIndex + 1);
}

function startHeroCarousel() {
  if (!heroSlides.length) return;
  stopHeroCarousel();
  resetProgress();
  heroInterval = setInterval(nextHeroSlide, heroDuration);
}

function stopHeroCarousel() {
  if (heroInterval) {
    clearInterval(heroInterval);
    heroInterval = null;
  }
}

if (heroSlides.length) {
  showHeroSlide(0);
  startHeroCarousel();

  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showHeroSlide(Number(dot.dataset.slide));
      startHeroCarousel();
    });
  });

  if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', stopHeroCarousel);
    heroCarousel.addEventListener('mouseleave', startHeroCarousel);

    let touchStartX = 0;
    let touchEndX = 0;

    heroCarousel.addEventListener(
      'touchstart',
      (event) => {
        touchStartX = event.changedTouches[0].clientX;
      },
      { passive: true }
    );

    heroCarousel.addEventListener(
      'touchend',
      (event) => {
        touchEndX = event.changedTouches[0].clientX;

        if (touchStartX - touchEndX > 40) {
          nextHeroSlide();
          startHeroCarousel();
        } else if (touchEndX - touchStartX > 40) {
          showHeroSlide(heroIndex - 1);
          startHeroCarousel();
        }
      },
      { passive: true }
    );
  }
}

// GALLERY DATA
const galleryData = {
  paintings: [
    { src: 'images/gallery/platno/ratko-soc-akordi-gallery.jpg', title: 'Akordi', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-autoportret-gallery.jpg', title: 'Autoportret', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-baba-ljubica-gallery.jpg', title: 'Baba Ljubica', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-bik-gallery.jpg', title: 'Bik', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-inator-gallery.jpg', title: 'Inator', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-izgubljena-ptica-gallery.jpg', title: 'Izgubljena ptica', year: '1998', technique: 'Ulje na platnu' }
  ],

  drawings: [
    { src: 'images/gallery/crtezi/ratko-soc-crtezi1-gallery.jpg', title: 'Crtež I', year: '2021', technique: 'Tuš na papiru' },
    { src: 'images/gallery/crtezi/ratko-soc-crtezi10-gallery.jpg', title: 'Crtež II', year: '2021', technique: 'Tuš na papiru' },
    { src: 'images/gallery/crtezi/ratko-soc-crtezi11-gallery.jpg', title: 'Crtež III', year: '2021', technique: 'Tuš na papiru' },
    { src: 'images/gallery/crtezi/ratko-soc-crtezi12-gallery.jpg', title: 'Crtež IV', year: '2021', technique: 'Tuš na papiru' },
    { src: 'images/gallery/crtezi/ratko-soc-crtezi13-gallery.jpg', title: 'Crtež V', year: '2021', technique: 'Tuš na papiru' },
    { src: 'images/gallery/crtezi/ratko-soc-crtezi14-gallery.jpg', title: 'Crtež VI', year: '2021', technique: 'Tuš na papiru' }
  ],

  fotografije: [
    {
      thumb: 'images/thumbs/fotografije/ratko-soc-atelje-1967-thumbs.jpg',
      full: 'images/gallery/fotografije/ratko-soc-atelje-1967-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/fotografije/ratko-soc-atelje-thumbs.jpg',
      full: 'images/gallery/fotografije/ratko-soc-atelje-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/fotografije/ratko-soc-mlad-1-thumbs.jpg',
      full: 'images/gallery/fotografije/ratko-soc-mlad-1-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/fotografije/ratko-soc-mlad-10-thumbs.jpg',
      full: 'images/gallery/fotografije/ratko-soc-mlad-10-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/fotografije/ratko-soc-mlad-2-thumbs.jpg',
      full: 'images/gallery/fotografije/ratko-soc-mlad-2-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/fotografije/ratko-soc-mlad-3-thumbs.jpg',
      full: 'images/gallery/fotografije/ratko-soc-mlad-3-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    }
  ],

  karikature: [
    {
      thumb: 'images/thumbs/karikature/ratko-soc-robijasi-thumbs.jpg',
      full: 'images/gallery/karikature/ratko-soc-karikatura-robijasi-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/karikatura/ratko-soc-karikatura-2-thumbs.jpg',
      full: 'images/gallery/karikature/ratko-soc-karikatura-2-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/karikatura/ratko-soc-karikatura-3-thumbs.jpg',
      full: 'images/gallery/karikature/ratko-soc-karikatura-3-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/karikatura/ratko-soc-karikatura-7-thumbs.jpg',
      full: 'images/gallery/karikature/ratko-soc-karikatura-7-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/karikatura/ratko-soc-karikatura-9-thumbs.jpg',
      full: 'images/gallery/karikature/ratko-soc-karikatura-9-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    },
    {
      thumb: 'images/thumbs/karikatura/ratko-soc-karikatura12-thumbs.jpg',
      full: 'images/gallery/karikature/ratko-soc-karikatura12-gallery.jpg',
      title: '',
      year: '',
      technique: ''
    }
  ]
};

// GALLERY LIGHTBOX
const pageGalleryKey = document.body.dataset.galleryPage;
const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
const galleryLightbox = document.getElementById('galleryLightbox');
const galleryLightboxImage = document.getElementById('galleryLightboxImage');
const galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
const galleryLightboxYear = document.getElementById('galleryLightboxYear');
const galleryLightboxTechnique = document.getElementById('galleryLightboxTechnique');
const closeGalleryLightbox = document.getElementById('closeGalleryLightbox');
const galleryPrevBtn = document.getElementById('galleryPrevBtn');
const galleryNextBtn = document.getElementById('galleryNextBtn');
const galleryTapPrev = document.getElementById('galleryTapPrev');
const galleryTapNext = document.getElementById('galleryTapNext');
const galleryMeta = document.getElementById('galleryLightboxMeta');

let galleryIndex = 0;
let galleryIsAnimating = false;

function getGalleryItems() {
  if (!pageGalleryKey || !galleryData[pageGalleryKey]) return null;
  return galleryData[pageGalleryKey];
}

function preloadGalleryNeighbors(index) {
  const items = getGalleryItems();
  if (!items || !items.length) return;

  const nextIndex = (index + 1) % items.length;
  const prevIndex = (index - 1 + items.length) % items.length;

  [nextIndex, prevIndex].forEach((i) => {
    const neighbor = items[i];
    const src = neighbor?.full || neighbor?.src;
    if (src) {
      const img = new Image();
      img.src = src;
    }
  });
}

function updateGalleryMeta(item, safeIndex) {
  if (galleryLightboxTitle) galleryLightboxTitle.textContent = item.title || '';
  if (galleryLightboxYear) galleryLightboxYear.textContent = item.year || '';
  if (galleryLightboxTechnique) galleryLightboxTechnique.textContent = item.technique || '';

  if (galleryMeta) {
    const hasMeta = Boolean(item.title || item.year || item.technique);
    galleryMeta.style.display = hasMeta ? 'flex' : 'none';
  }

  if (galleryLightboxImage) {
    galleryLightboxImage.alt = item.title || `Gallery image ${safeIndex + 1}`;
  }
}

function renderGalleryItem(index, options = {}) {
  const items = getGalleryItems();
  if (!items || !items.length || !galleryLightboxImage) return;

  const safeIndex = (index + items.length) % items.length;
  const item = items[safeIndex];
  if (!item) return;

  const imageSrc = item.full || item.src || '';
  const useFade = options.fade !== false;

  galleryIndex = safeIndex;

  if (!useFade) {
    galleryLightboxImage.src = imageSrc;
    updateGalleryMeta(item, safeIndex);
    preloadGalleryNeighbors(safeIndex);
    return;
  }

  if (galleryIsAnimating) return;
  galleryIsAnimating = true;

  galleryLightboxImage.style.opacity = '0.35';

  window.setTimeout(() => {
    galleryLightboxImage.src = imageSrc;
    updateGalleryMeta(item, safeIndex);

    const revealImage = () => {
      galleryLightboxImage.style.opacity = '1';
      preloadGalleryNeighbors(safeIndex);
      galleryIsAnimating = false;
      galleryLightboxImage.removeEventListener('load', revealImage);
      galleryLightboxImage.removeEventListener('error', revealImage);
    };

    galleryLightboxImage.addEventListener('load', revealImage);
    galleryLightboxImage.addEventListener('error', revealImage);

    if (galleryLightboxImage.complete) {
      revealImage();
    }
  }, 60);
}

function openGalleryLightbox(index) {
  if (!galleryLightbox) return;
  renderGalleryItem(index, { fade: false });
  galleryLightbox.classList.add('active');
  galleryLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGalleryViewer() {
  if (!galleryLightbox) return;
  galleryLightbox.classList.remove('active');
  galleryLightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showNextGalleryItem() {
  const items = getGalleryItems();
  if (!items || !items.length) return;
  renderGalleryItem(galleryIndex + 1);
}

function showPrevGalleryItem() {
  const items = getGalleryItems();
  if (!items || !items.length) return;
  renderGalleryItem(galleryIndex - 1);
}

galleryCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const cardIndex = Number(card.dataset.index);
    openGalleryLightbox(Number.isNaN(cardIndex) ? index : cardIndex);
  });
});

if (closeGalleryLightbox) {
  closeGalleryLightbox.addEventListener('click', closeGalleryViewer);
}

if (galleryNextBtn) {
  galleryNextBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    showNextGalleryItem();
  });
}

if (galleryPrevBtn) {
  galleryPrevBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    showPrevGalleryItem();
  });
}

if (galleryTapNext) {
  galleryTapNext.addEventListener('click', (event) => {
    event.stopPropagation();
    showNextGalleryItem();
  });
}

if (galleryTapPrev) {
  galleryTapPrev.addEventListener('click', (event) => {
    event.stopPropagation();
    showPrevGalleryItem();
  });
}

if (galleryLightbox) {
  galleryLightbox.addEventListener('click', (event) => {
    if (event.target === galleryLightbox) {
      closeGalleryViewer();
    }
  });
}
// GALLERY LIGHTBOX SWIPE (MOBILE)
if (galleryLightbox) {
  let lightboxTouchStartX = 0;
  let lightboxTouchEndX = 0;
  let lightboxTouchStartY = 0;
  let lightboxTouchEndY = 0;

  galleryLightbox.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0];
      lightboxTouchStartX = touch.clientX;
      lightboxTouchStartY = touch.clientY;
    },
    { passive: true }
  );

  galleryLightbox.addEventListener(
    'touchend',
    (event) => {
      const touch = event.changedTouches[0];
      lightboxTouchEndX = touch.clientX;
      lightboxTouchEndY = touch.clientY;

      const diffX = lightboxTouchStartX - lightboxTouchEndX;
      const diffY = lightboxTouchStartY - lightboxTouchEndY;

      // reaguje samo na pravi horizontalni swipe
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          showNextGalleryItem(); // swipe left
        } else {
          showPrevGalleryItem(); // swipe right
        }
      }
    },
    { passive: true }
  );
}

document.addEventListener('keydown', (event) => {
  if (!galleryLightbox || !galleryLightbox.classList.contains('active')) return;

  if (event.key === 'Escape') closeGalleryViewer();
  if (event.key === 'ArrowRight') showNextGalleryItem();
  if (event.key === 'ArrowLeft') showPrevGalleryItem();
});

// AFORIZMI PAGE EFFECTS
const aforizmiFadeItems = document.querySelectorAll('.aforizmi-paper-wrap');
const aforizmiBgTexture = document.getElementById('aforizmiBgTexture');

if (aforizmiFadeItems.length) {
  const aforizmiObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.16 }
  );

  aforizmiFadeItems.forEach((item) => aforizmiObserver.observe(item));
}

if (aforizmiBgTexture) {
  let aforizmiTicking = false;

  function updateAforizmiParallax() {
    const y = window.scrollY || window.pageYOffset;
    aforizmiBgTexture.style.transform = `translate3d(0, ${y * 0.08}px, 0) scale(1.08)`;
    aforizmiTicking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!aforizmiTicking) {
        window.requestAnimationFrame(updateAforizmiParallax);
        aforizmiTicking = true;
      }
    },
    { passive: true }
  );
}

// AFORIZMI HEADER SCROLL
function handleScrollHeader() {
  if (!document.body.classList.contains('aforizmi-page')) return;

  if (window.scrollY > 10) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScrollHeader);
handleScrollHeader();

// LIKOVNA KRITIKA POPUP
const openKritika = document.getElementById('openKritika');
const closeKritika = document.getElementById('closeKritika');
const kritikaOverlay = document.getElementById('kritikaOverlay');

if (openKritika && closeKritika && kritikaOverlay) {
  openKritika.addEventListener('click', (e) => {
    e.preventDefault();
    kritikaOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  closeKritika.addEventListener('click', () => {
    kritikaOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  kritikaOverlay.addEventListener('click', (e) => {
    if (e.target === kritikaOverlay) {
      kritikaOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && kritikaOverlay.classList.contains('active')) {
      kritikaOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}


// ==========================
// helpers
// ==========================
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ==========================
// year
// ==========================
(() => {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// ==========================
// mobile nav / works panel
// ==========================
(() => {
  const worksToggle = $(".works-toggle");
  const worksPanel = $("#mobile-works-panel");

  if (worksToggle && worksPanel) {
    worksToggle.addEventListener("click", () => {
      const isOpen = worksPanel.classList.toggle("open");
      worksToggle.setAttribute("aria-expanded", String(isOpen));
      worksPanel.setAttribute("aria-hidden", String(!isOpen));
    });

    document.addEventListener("click", (e) => {
      if (!worksPanel.contains(e.target) && !worksToggle.contains(e.target)) {
        worksPanel.classList.remove("open");
        worksToggle.setAttribute("aria-expanded", "false");
        worksPanel.setAttribute("aria-hidden", "true");
      }
    });
  }

  const navToggle = $(".nav-toggle:not(.works-toggle):not(.gallery-home-link)");
  const nav = $("#site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
})();

// ==========================
// hero carousel
// ==========================
(() => {
  const slides = $$(".hero-slide");
  const dots = $$(".hero-dot");
  const progressBar = $("#heroProgress");

  if (!slides.length || !dots.length || !progressBar) return;

  let current = 0;
  let autoTimer = null;
  let progressTimer = null;
  const slideDuration = 5000;

  function render(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    current = index;
    resetProgress();
  }

  function next() {
    render((current + 1) % slides.length);
  }

  function stop() {
    clearInterval(autoTimer);
    clearInterval(progressTimer);
  }

  function startProgress() {
    let elapsed = 0;
    progressBar.style.width = "0%";
    progressTimer = setInterval(() => {
      elapsed += 50;
      const percent = Math.min((elapsed / slideDuration) * 100, 100);
      progressBar.style.width = percent + "%";
      if (percent >= 100) clearInterval(progressTimer);
    }, 50);
  }

  function resetProgress() {
    clearInterval(progressTimer);
    startProgress();
  }

  function start() {
    stop();
    startProgress();
    autoTimer = setInterval(next, slideDuration);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      render(i);
      start();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  start();
})();

// ==========================
// popup kritika
// ==========================
(() => {
  const openBtn = $("#openKritika");
  const overlay = $("#kritikaOverlay");
  const closeBtn = $("#closeKritika");

  if (!openBtn || !overlay || !closeBtn) return;

  function openPopup() {
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openPopup);
  closeBtn.addEventListener("click", closePopup);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closePopup();
    }
  });
})();

// ==========================
// aforizmi reveal
// ==========================
(() => {
  const papers = $$(".aforizmi-paper-wrap");
  if (!papers.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  papers.forEach((paper) => observer.observe(paper));
})();

// ==========================
// gallery data
// ==========================
const galleryData = {
  paintings: [
    { src: 'images/gallery/platno/ratko-soc-akordi-gallery.jpg', title: 'Akordi', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-autoportret-gallery.jpg', title: 'Autoportret', year: '1972', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-baba-ljubica-gallery.jpg', title: 'Baba Ljubica', year: '1961', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-bik-gallery.jpg', title: 'Bik', year: '2008', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-inator-gallery.jpg', title: 'Inator', year: '2000', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-izgubljena-ptica-gallery.jpg', title: 'Izgubljena ptica', year: '1994', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-juris-gallery.jpg', title: 'Juriš', year: '1970', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-konte-gallery.jpg', title: 'Konte', year: '', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-krik-gallery.jpg', title: 'Krik', year: '1996', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-laku-noc-jutra-moja-gallery.jpg', title: 'Laku noć jutra moja', year: '2005', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-milosrdni-andjeo-gallery.jpg', title: 'Milosrdni anđeo', year: '1999', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-mislilac-gallery.jpg', title: 'Mislilac', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-Mnogo-nas-na-kugli-gallery.jpg', title: 'Mnogo nas na kugli, pređimo na kocku', year: '2014', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-napustena-gallery.jpg', title: 'Napuštena', year: '1999', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-neznam-naziv-2-gallery.jpg', title: 'Nepoznat naziv 2', year: '', technique: '' },
    { src: 'images/gallery/platno/ratko-soc-neznam-naziv-3-gallery.jpg', title: 'Nepoznat naziv 3', year: '', technique: '' },
    { src: 'images/gallery/platno/ratko-soc-neznam-naziv-4-gallery.jpg', title: 'Nepoznat naziv 4', year: '', technique: '' },
    { src: 'images/gallery/platno/ratko-soc-neznam-naziv-5-gallery.jpg', title: 'Nepoznat naziv 5', year: '', technique: '' },
    { src: 'images/gallery/platno/ratko-soc-neznam-naziv-6-gallery.jpg', title: 'Nepoznat naziv 6', year: '', technique: '' },
    { src: 'images/gallery/platno/ratko-soc-neznam-naziv-gallery.jpg', title: 'Nepoznat naziv', year: '', technique: '' },
    { src: 'images/gallery/platno/ratko-soc-njegos-triptih-gallery.jpg', title: 'Njegoš triptih', year: '', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-nostalgija-gallery.jpg', title: 'Nostalgija', year: '', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-osam-tamburasa-triptih-gallery.jpg', title: 'Osam tamburaša', year: '2008', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-predvecerje-gallery.jpg', title: 'Predvečerje', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-prijatelji-gallery.jpg', title: 'Prijatelji', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-profil-gallery.jpg', title: 'Profil', year: '2009', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-prometej-gallery.jpg', title: 'Prometej', year: '1999', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-radost-gallery.jpg', title: 'Radost', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-sarm-gallery.jpg', title: 'Šarm', year: '2000', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-secanje-gallery.jpg', title: 'Sećanje', year: '2001', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-skazaljke-stare-gallery.jpg', title: 'Skazaljke stare', year: '2003', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-skok-gallery.jpg', title: 'Skok', year: '1995', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-smrt-autora-gallery.jpg', title: 'Smrt autora', year: '1974', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-trece-jutro-gallery.jpg', title: 'Treće jutro', year: '1995', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-tren-gallery.jpg', title: 'Tren', year: '1994', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-treptaj-gallery.jpg', title: 'Treptaj', year: '2010', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-turisti-gallery.jpg', title: 'Turisti', year: '1962', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-ujak-iz-arizone-gallery.jpg', title: 'Ujak iz Arizone', year: '1962', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-u-mislima-gallery.jpg', title: 'U mislima', year: '1998', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-u-nebo-gallery.jpg', title: 'U nebo', year: '2002', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-zabrinuta-gallery.jpg', title: 'Zabrinuta', year: '1996', technique: 'Ulje na platnu' },
    { src: 'images/gallery/platno/ratko-soc-zalet-gallery.jpg', title: 'Zalet', year: '1984', technique: 'Tempera na papiru' },
    { src: 'images/gallery/platno/ratko-soc-zena-iz-firence-gallery.jpg', title: 'Žena iz Firence', year: '1977', technique: 'Ulje na platnu' },

    { src: 'images/gallery/akril/ratko-soc-akril-akordi-gallery.jpg', title: 'Akordi', year: '2021', technique: 'Akril' },
    { src: 'images/gallery/akril/ratko-soc-akril-bik-gallery.jpg', title: 'Bik', year: '2021', technique: 'Akril na lesonitu' },
    { src: 'images/gallery/akril/ratko-soc-akril-cudjenje-gallery.jpg', title: 'Čuđenje', year: '2020', technique: 'Akril na lesonitu' },
    { src: 'images/gallery/akril/ratko-soc-akril-kokot-gallery.jpg', title: 'Kokot', year: '2020', technique: 'Akril na lesonitu' },
    { src: 'images/gallery/akril/ratko-soc-akril-lanacjelanac-gallery.jpg', title: 'Lanac je lanac i kada je zlatan', year: '2015', technique: 'Akril na platnu' },
    { src: 'images/gallery/akril/ratko-soc-akril-na-strazi-gallery.jpg', title: 'Na straži', year: '', technique: 'Akril' },
    { src: 'images/gallery/akril/ratko-soc-akril-ne-trazite-vreme-gallery.jpg', title: 'Ne tražite vreme prošlo', year: '2022', technique: 'Akril na platnu' },
    { src: 'images/gallery/akril/ratko-soc-akril-noj-gallery.jpg', title: 'Noj', year: '2016', technique: 'Akril' },
    { src: 'images/gallery/akril/ratko-soc-akril-nostalgija-gallery.jpg', title: 'Nostalgija', year: '2015', technique: 'Akril-ulje na platnu' },
    { src: 'images/gallery/akril/ratko-soc-akril-osmatrac-gallery.jpg', title: 'Osmatrač', year: '2018', technique: 'Akril na platnu' },
    { src: 'images/gallery/akril/ratko-soc-akril-petao-gallery.jpg', title: 'Petao', year: '2019', technique: 'Akril na platnu' },
    { src: 'images/gallery/akril/ratko-soc-akril-pogled-gallery.jpg', title: 'Pogled', year: '2021', technique: 'Akril na platnu' },
    { src: 'images/gallery/akril/ratko-soc-akril-prijatelji-gallery.jpg', title: 'Prijatelji', year: '2022', technique: 'Akril na platnu' },
     ],

  drawings: [],
  fotografije: [],
  karikature: []
};

// ==========================
// auto-build DOM galleries
// ==========================
function thumbToFull(thumbSrc) {
  return thumbSrc
    .replace('images/thumbs/', 'images/gallery/')
    .replace('/thumbs/', '/gallery/')
    .replace('-thumbs.', '-gallery.');
}

function ensureDomGalleryData() {
  $$(".gallery-card").forEach((card) => {
    const galleryName = card.dataset.gallery;
    const index = Number(card.dataset.index);
    const img = $("img", card);

    if (!galleryName || Number.isNaN(index) || !img) return;
    if (!galleryData[galleryName]) galleryData[galleryName] = [];

    if (!galleryData[galleryName][index]) {
      const thumbSrc = img.getAttribute("src") || "";
      const alt = img.getAttribute("alt") || "";

      galleryData[galleryName][index] = {
        src: thumbToFull(thumbSrc),
        title: galleryName === "drawings" ? `Crtež ${index + 1}` : "",
        year: "",
        technique: galleryName === "drawings" ? "" : ""
      };
    }
  });
}

ensureDomGalleryData();

// ==========================
// lightbox gallery
// ==========================
(() => {
  const lightbox = $("#galleryLightbox");
  const lightboxImg = $("#galleryLightboxImage");
  const lightboxFigure = $(".gallery-minimal-figure");
  const titleEl = $("#galleryLightboxTitle");
  const yearEl = $("#galleryLightboxYear");
  const techniqueEl = $("#galleryLightboxTechnique");
  const metaWrap = $(".gallery-minimal-meta");

  const closeBtn = $("#closeGalleryLightbox");
  const prevBtn = $("#galleryPrevBtn");
  const nextBtn = $("#galleryNextBtn");
  const tapPrev = $("#galleryTapPrev");
  const tapNext = $("#galleryTapNext");

  if (!lightbox || !lightboxImg) return;

  let currentGallery = null;
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let isAnimating = false;

  function validItems(galleryName) {
    return (galleryData[galleryName] || []).filter(Boolean);
  }

  function applyFadeAndSwap(item) {
    if (!item || isAnimating) return;
    isAnimating = true;

    lightboxImg.classList.remove("is-visible");
    lightboxImg.classList.add("is-fading");

    window.setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title || "";

      if (titleEl) titleEl.textContent = item.title || "";
      if (yearEl) yearEl.textContent = item.year || "";
      if (techniqueEl) techniqueEl.textContent = item.technique || "";

      if (metaWrap) {
        const hasMeta = Boolean(item.title || item.year || item.technique);
        metaWrap.style.display = hasMeta ? "" : "none";
      }

      const reveal = () => {
        lightboxImg.classList.remove("is-fading");
        lightboxImg.classList.add("is-visible");
        isAnimating = false;
        lightboxImg.removeEventListener("load", reveal);
      };

      lightboxImg.addEventListener("load", reveal);

      // fallback ako je slika već iz cache-a
      if (lightboxImg.complete) {
        reveal();
      }
    }, 120);
  }

  function updateLightbox() {
    const item = galleryData[currentGallery]?.[currentIndex];
    if (!item) return;
    applyFadeAndSwap(item);
  }

  function openLightbox(galleryName, index) {
    currentGallery = galleryName;
    currentIndex = index;

    // bez fade-a na prvom otvaranju
    const item = galleryData[currentGallery]?.[currentIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title || "";
    lightboxImg.classList.add("is-visible");

    if (titleEl) titleEl.textContent = item.title || "";
    if (yearEl) yearEl.textContent = item.year || "";
    if (techniqueEl) techniqueEl.textContent = item.technique || "";

    if (metaWrap) {
      const hasMeta = Boolean(item.title || item.year || item.technique);
      metaWrap.style.display = hasMeta ? "" : "none";
    }

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function nextImage() {
    const items = validItems(currentGallery);
    if (!items.length || isAnimating) return;
    currentIndex = (currentIndex + 1) % items.length;
    updateLightbox();
  }

  function prevImage() {
    const items = validItems(currentGallery);
    if (!items.length || isAnimating) return;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateLightbox();
  }

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const minSwipeDistance = 45;

    if (Math.abs(deltaX) < minSwipeDistance) return;

    if (deltaX < 0) {
      nextImage();
    } else {
      prevImage();
    }
  }

  $$(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const galleryName = card.dataset.gallery;
      const index = Number(card.dataset.index);
      openLightbox(galleryName, index);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", nextImage);
  if (prevBtn) prevBtn.addEventListener("click", prevImage);
  if (tapNext) tapNext.addEventListener("click", nextImage);
  if (tapPrev) tapPrev.addEventListener("click", prevImage);

  if (lightboxFigure) {
    lightboxFigure.addEventListener(
      "touchstart",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchStartX = e.changedTouches[0].clientX;
        touchEndX = touchStartX;
      },
      { passive: true }
    );

    lightboxFigure.addEventListener(
      "touchmove",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchEndX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );

    lightboxFigure.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
      },
      { passive: true }
    );
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
})();

// ==========================
// header scroll class
// ==========================
(() => {
  window.addEventListener("scroll", () => {
    document.body.classList.toggle("scrolled", window.scrollY > 20);
  });
})();
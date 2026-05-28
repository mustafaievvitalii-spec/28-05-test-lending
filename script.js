const heroVideo = document.querySelector('.hero__video');
const heroContent = document.getElementById('hero-content');

const showHeroContent = () => {
  heroContent.classList.add('is-visible');
};

if (heroVideo) {
  heroVideo.addEventListener('loadeddata', () => {
    requestAnimationFrame(() => setTimeout(showHeroContent, 180));
  }, { once: true });

  heroVideo.addEventListener('error', showHeroContent, { once: true });

  heroVideo.play().catch(() => {
    showHeroContent();
  });
} else {
  showHeroContent();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.section .card, .review, .faq details, .before-after .panel, .lead-form').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

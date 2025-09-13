document.addEventListener('DOMContentLoaded', function() {
  initHeroCarousel();
  initAllScrollCarousel();
});

function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero__item');
  let index = 0;

  if (slides.length > 0) {
    showSlide(slides, index);

    setInterval(function() {
      index = (index + 1) % slides.length;
      showSlide(slides, index);
    }, 8000);
  }
}

function showSlide(slides, i) {
  for (let j = 0; j < slides.length; j++) {
    slides[j].classList.remove('hero__item--is-active');
  }

  slides[i].classList.add('hero__item--is-active');
}

class ScrollCarousel {
  constructor(container) {
    this.track = container.querySelector('.carousel__track');
    this.prevBtn = container.querySelector('.carousel__btn--prev');
    this.nextBtn = container.querySelector('.carousel__btn--next');
    this.slides = container.querySelectorAll('.carousel__slide');

    if (!this.track || !this.prevBtn || !this.nextBtn || !this.slides.length === 0) {
      console.log('Elementos do carousel não foram encontrados no container:', container);
      return;
    }

    this.currentIndex = 0;

    this.nextBtn.addEventListener('click', () => this.goToSlide(this.currentIndex + 1));
    this.prevBtn.addEventListener('click', () => this.goToSlide(this.currentIndex - 1));
  }

  goToSlide(index) {
    const newIndex = Math.max(0, Math.min(index, this.slides.length - 1));
    this.currentIndex = newIndex;
    this.slides[this.currentIndex].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
}

function initAllScrollCarousel() {
  const carouselContainers = document.querySelectorAll('.carousel');

  carouselContainers.forEach(container => {
    new ScrollCarousel(container);
  });
}
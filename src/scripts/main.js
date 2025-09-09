document.addEventListener('DOMContentLoaded', function() {
  initHeroCarousel();
  initScrollCarousel();
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

function initScrollCarousel() {
  const track = document.querySelector('.carousel__track');
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');
  const slideWidth = 498 + 30;

  prevBtn.addEventListener('click', function() {
    track.scrollBy({ left: -slideWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function() {
    track.scrollBy({ left: slideWidth, behavior: 'smooth' });
  });
};
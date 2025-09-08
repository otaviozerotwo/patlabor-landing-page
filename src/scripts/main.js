document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero__item');
  let index = 0;

  if (slides.length > 0) {
    showSlide(slides, index);

    setInterval(function() {
      index = (index + 1) % slides.length;
      showSlide(slides, index);
    }, 8000);
  }
});

function showSlide(slides, i) {
  for (let j = 0; j < slides.length; j++) {
    slides[j].classList.remove('hero__item--is-active');
  }

  slides[i].classList.add('hero__item--is-active');
}
document.addEventListener('DOMContentLoaded', function() {
  handlerHeroCarousel();
  handlerScrollCarousel();
  handlerMenuToggle();
});

function handlerHeroCarousel() {
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
      console.error('Elementos do carousel não foram encontrados no container:', container);
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

function handlerScrollCarousel() {
  const carouselContainers = document.querySelectorAll('.carousel');

  carouselContainers.forEach(container => {
    new ScrollCarousel(container);
  });
}

function handlerMenuToggle() {
  const menuToggle = document.querySelector('.header__menu-toggle');
  const headerLinks = document.querySelector('.header__links');
  const headerLinksItems = document.querySelectorAll('.header__link');

  if (!menuToggle || !headerLinks) {
    console.error('Elementos do menu mobile não encontrados. Verifique os seletores.');
    return;
  }

  const closeMobileMenu = () => {
    headerLinks.classList.remove('header__links--is-active');
    menuToggle.classList.remove('header__menu-toggle--is-active');
  };

  menuToggle.addEventListener('click', function(event) {
    event.stopPropagation();
    headerLinks.classList.toggle('header__links--is-active');
    this.classList.toggle('header__menu-toggle--is-active');
  });

  headerLinksItems.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', function(event) {
    const isMenuOpen = headerLinks.classList.contains('header__links--is-active');
    const isClickInsideMenu = headerLinks.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickOnToggle) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });
}
'use strict';
// ! *********** FOR LESSONS NAMES *********** //
// ? *********** FOR REGULAR COMMENTS *********** //

// ? **** NOTES **** //
///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelector('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const footer = document.querySelector('.footer');
const btnScrollTo = document.querySelector('.scroll-to-brands');
const sectionBrands = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

// ! *********** MODAL *********** //
//FUNCION PARA ACTIVAR MODAL
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//FUNCION PARA CERRAR MODAL
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);

//OPCION DE CERRAR MODAL PULSANDO LA TECLA ESCAPE
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    // SI la clase modal no contiene hidden, entonces cerrar
    closeModal();
  }
});

// ! *********** COOKIES MESSAGE *********** //
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `Usamos cookies para mejorar tu experiencia de navegación
//  <button class="btn-cookies btn-general">Entendido</button>`;
// footer.append(message);

// const btnCloseCookies = document.querySelector('.btn-cookies');

// btnCloseCookies.addEventListener('click', function () {
//   message.remove();
// });

// ! *********** infanti.cl en el nav *********** //
const infantiItem = document.querySelector('.infanti');
const infantiWeb = `<a class="infantiWeb" href="https://infanti.cl/"> Infanti.cl</a>`;

infantiItem.insertAdjacentHTML('afterbegin', infantiWeb);

// ! *********** SMOOTH SCROLLING PARA LA SECCION DE MARCAS *********** //
btnScrollTo.addEventListener('click', function (e) {
  const coordenadasMarcas = sectionBrands.getBoundingClientRect();

  sectionBrands.scrollIntoView({
    behavior: 'smooth',
  });
});

// ! *********** OPERATIONS SECTION *********** //
const tabs = document.querySelectorAll('.operations__tab'); // los botones
const tabsContainers = document.querySelector('.operations__tab-container'); // el padre de los botones
const tabsContent = document.querySelectorAll('.operations__content'); // el contenido que vamos a desplegar

//Usaremos el event delegation otra vez
//Vamos a usar el closest event para que el padre con la clase operations tab se active
//Sin importar cual elemento seleccionamos dentro del boton

tabsContainers.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  //si haces click en el container padre de los botones, tira error
  //con este if, hacemos que si no encuentra el click, detenga la funcion

  //botones
  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });

  //Contenido desplegable
  tabsContent.forEach(function (c) {
    c.classList.remove('operations__content--active');
  });
  //con este for each, sacamos el operations active de los elementos

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate the content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// ! *********** STICKY NAVIGATION API THE BEST WAY *********** //

//Primero calculamos el height de nuestro nav

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //Nos referimos a que cuando el header llegue a 0, entonces algo pasa
  rootMargin: `-${navHeight}px`, //en esta seccion ponemos el margin que queremos aplicar para que el nav funcione de manera dinamica
});

headerObserver.observe(header);

// ! *********** MENU FADE ANIMATION *********** //
nav.addEventListener('mouseover', function (e) {
  //Si la clase contiene nav__link
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = 0.5;
    });
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) el.style.opacity = 1;
    });
  }
});

// ! *********** LAZY LOAD IMAGES *********** //
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin: '5px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// ! *********** SLIDER TESTIMONIALS COMPONENT *********** //

const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length - 1;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`));
};

//Next slide
const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const init = function () {
  goToSlide(0);
  createDots();

  activateDot(0);
};

init();

//Event handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

//0%, 100%,200%,300%

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

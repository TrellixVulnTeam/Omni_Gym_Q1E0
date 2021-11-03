'use strict'
// If the object is not specified, functions in strict mode will
// return undefined and functions in normal mode will return the global object (window):
//// * GENERAL ////
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
//// * NAV ////
const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav_container');
const mobileMenu = document.querySelector('#mobile_menu');
const navMenu = document.querySelector('.nav_menu');
const navLinks = document.querySelectorAll('.nav_links');
//// * SCROLL ////
const headerScrollBtn = document.querySelector('.main_btn');
const footerScrollBtn = document.querySelector('.footer_btn');
//// * MODAL ////
const modal = document.getElementById('email_modal');
const openModalBtn = document.querySelector('.nav_links_btn');
const closeModalBtn = document.querySelector('.close_btn');
//// * FORM ////
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

//// * REFRESH LANDING PAGE TO ////
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

//// * Mobile Menu Toggle ////
mobileMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('is-active');
  navMenu.classList.toggle('active');
})

//// * Nav & Mobile Menu Blur ////
const handleHover = function (e) {
  if (e.target.classList.contains('nav_links')) {
    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav_links');
    const logo = link.closest('.navbar').querySelector('#navbar_logo');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  };
}
navbar.addEventListener('mouseover', handleHover.bind(0.5));
navbar.addEventListener('mouseout', handleHover.bind(1));


//// * STICKY NAV ////
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// ? REVIEW Intersection Observer API **
const stickyNav = (entries) => {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    navContainer.classList.add('sticky');
  } else {
    navContainer.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // Entire view port
  threshold: 0.1, // 10% of the header reveal nav
  // Inspect - intersectionRatio & isIntersecting
});
headerObserver.observe(header);

//// * SECTION REVEAL ////
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//// * SCROLL VIEW ////
headerScrollBtn.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

footerScrollBtn.addEventListener('click', () => {
  header.scrollIntoView({ behavior: 'smooth' });
});


//// * NAV SCROLL LINKS ////
//// ? fix error on last ele in node list ( sign up) ///
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()

    // Close mobile nav after section clicked
    navMenu.classList.toggle('active');
    // return burger bars from cross
    mobileMenu.classList.toggle('is-active');
    const linkID = document.getElementById(link.getAttribute('data-link'));
    linkID.scrollIntoView({ behavior: 'smooth', block: 'start' });
  })
});


//// * LAZY IMAGES ////
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//// * MODAL ////
openModalBtn.addEventListener('click', (e) => {
  e.preventDefault()
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  e.target === modal ? modal.style.display = 'none' : null
});


//// * FORM ERROR ////
const showError = (input, msg) => {
  const formVal = input.parentElement;
  formVal.className = 'form_validation error';

  const errorMsg = formVal.querySelector('p');
  errorMsg.innerText = msg;
}

//// * FORM VALID ////
const showValid = input => {
  const formVal = input.parentElement;
  formVal.className = 'form_validation valid';
}

//// * FORM REQUIRED FIELDS ////
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showValid(input)
    }
  })
}

//// * FORM FIELD NAME ////
const getFieldName = input => {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([name, email, message]);
})





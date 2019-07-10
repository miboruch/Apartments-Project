console.log('hello');
let button = document.querySelector('.hamburger');
let slider = document.querySelector('.slider');
let nav = document.querySelector('.main-nav');
let inner = document.querySelector('.inner-hamburger');


button.addEventListener('click', function(){
  slider.classList.toggle('slider--active');
  nav.classList.toggle('main-nav--open');
  inner.classList.toggle('inner-hamburger--open');
});  
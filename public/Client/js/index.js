let userInterfaceModule = (function() {
  let button = document.querySelector('.hamburger');
  (slider = document.querySelector('.slider')),
    (nav = document.querySelector('.main-nav')),
    (list = document.querySelector('.main-list')),
    (inner = document.querySelector('.inner-hamburger')),
    (paragraph = document.querySelector('.menu-paragraph')),
    (social = document.querySelector('.social')),
    (item = document.querySelectorAll('.item')),
    (loader = document.querySelector('.loader'));

  let documentObjectsArray = [
    button,
    slider,
    nav,
    list,
    inner,
    paragraph,
    social,
    item,
    loader
  ];

  button.addEventListener('click', function() {
    slider.classList.toggle('slider--active');
    nav.classList.toggle('main-nav--open');
    list.classList.toggle('main-list--open');
    paragraph.classList.toggle('p-slider');
    inner.classList.toggle('inner-hamburger--open');
    social.classList.toggle('social-open');
  });

  for (let i of item) {
    i.addEventListener('mouseenter', function() {
      paragraph.classList.toggle('menu-paragraph--hover');
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    window.setTimeout(function() {
      loader.classList.add('loader-disappear');
    }, 1000); //Zsuniecie loadera
    window.setTimeout(function() {
      loader.style.display = 'none';
    }, 3000); //display: none dla loadera
  });

  return {
    array: documentObjectsArray
  };
})();

let dataModule = (function(UImodule) {
  let module = UImodule;
  let [button, slider] = module.array; //Destructuring array with DOM elements
})(userInterfaceModule);

let controllerModule = (function() {})();

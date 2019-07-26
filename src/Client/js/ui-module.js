let userInterfaceModule = (function(){
  let button = document.querySelector('.hamburger'),
      slider = document.querySelector('.slider'),
      nav = document.querySelector('.main-nav'),
      list = document.querySelector('.main-list'),
      inner = document.querySelector('.inner-hamburger'),
      paragraph = document.querySelector('.menu-paragraph'),
      social = document.querySelector('.social'),
      item = document.querySelectorAll('.item'),
      loader = document.querySelector('.loader'),
      firstOption = document.querySelector('.first'),
      secondOption = document.querySelector('.second'),
      thirdOption = document.querySelector('.third'),
      fourthOption = document.querySelector('.fourth'),
      userForm = document.getElementById('user-form'),
      /* FORM INPUTS */
      inputNodeList = document.querySelectorAll('.in'),
      selectNodeList = document.querySelectorAll('.sel'),
      hotelName = document.querySelector('.hotel-name'),
      hotelAddress = document.querySelector('.hotel-address'),
      hotelDescription = document.querySelector('.hotel-description'),
      hotelPrice = document.querySelector('.price');

  let selectArr = Array.from(selectNodeList);
  let inputArr = Array.from(inputNodeList);

  const finalButton = document.querySelector('.submit-button');
  const daysArray = ([...Array(31).keys()].map(x=>++x));
  const monthsArray = ['January', 'February','March','April','May','June','July', 'August',
                     'September', 'October', 'November', 'December'];
  const yearsArray = [2019, 2020, 2021];
  const hotelDOM = [hotelName, hotelAddress, hotelDescription, hotelPrice];
  const options = [firstOption, secondOption, thirdOption, fourthOption];

  /* All events listener for DOM manipulation*/
  (function(){
    button.addEventListener('click', function(){
      slider.classList.toggle('slider--active');
      nav.classList.toggle('main-nav--open');
      list.classList.toggle('main-list--open');
      paragraph.classList.toggle('p-slider');
      inner.classList.toggle('inner-hamburger--open');
      social.classList.toggle('social-open');
    });  

    for(let i of item){
      i.addEventListener('mouseenter', function(){
        paragraph.classList.toggle('menu-paragraph--hover');
      }),
      i.addEventListener('click', function(){
        slider.classList.remove('slider--active');
        nav.classList.remove('main-nav--open');
        list.classList.remove('main-list--open');
        paragraph.classList.remove('p-slider');
        inner.classList.remove('inner-hamburger--open');
        social.classList.remove('social-open');
      })
    };

    document.addEventListener('DOMContentLoaded', function(){
      window.setTimeout(function(){
        loader.classList.add('loader-disappear');
      },1000); //Zsuniecie loadera
      window.setTimeout(function(){
        loader.style.display = 'none';
      },3000); //display: none dla loadera
    });
  })();

  //Function which allows us to set options in select menu
  function fillSelectMenu(arrayName, selectMenu){
    let counter = 0;
    arrayName.map(item =>{
      let option = document.createElement('option');
      counter++;
      option.value = counter;
      option.innerHTML = item;
      selectMenu.appendChild(option);
    })   
  }
  let [dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo] = selectArr;

  fillSelectMenu(daysArray, dayFrom);
  fillSelectMenu(daysArray, dayTo);
  fillSelectMenu(monthsArray, monthFrom);
  fillSelectMenu(monthsArray, monthTo);
  fillSelectMenu(yearsArray, yearFrom);
  fillSelectMenu(yearsArray, yearTo);

  return {
    hotelDOM: hotelDOM,
    options: options,
    monthsArray: monthsArray,
    yearsArray: yearsArray,
    inputArray: inputArr,
    selectArray: selectArr,
    submitButton: finalButton,
  }
})();

export {userInterfaceModule};
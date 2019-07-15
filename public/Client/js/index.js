let userInterfaceModule = (function() {
  let button = document.querySelector('.hamburger');
  (slider = document.querySelector('.slider')),
    (nav = document.querySelector('.main-nav')),
    (list = document.querySelector('.main-list')),
    (inner = document.querySelector('.inner-hamburger')),
    (paragraph = document.querySelector('.menu-paragraph')),
    (social = document.querySelector('.social')),
    (item = document.querySelectorAll('.item')),
    (loader = document.querySelector('.loader')),
    (firstOption = document.querySelector('.first')),
    (secondOption = document.querySelector('.second')),
    (thirdOption = document.querySelector('.third')),
    (fourthOption = document.querySelector('.fourth')),
    (userForm = document.getElementById('user-form')),
    /* FORM INPUTS */
    (firstName = document.querySelector('.user-firstname')),
    (lastName = document.querySelector('.user-lastname')),
    (id = document.querySelector('.user-id')),
    (card = document.querySelector('.user-card')),
    (daysFrom = document.querySelector('.days-from')),
    (monthsFrom = document.querySelector('.months-from')),
    (yearFrom = document.querySelector('.year-from')),
    (daysTo = document.querySelector('.days-to')),
    (monthsTo = document.querySelector('.months-to')),
    (yearTo = document.querySelector('.year-to'));

  const finalButton = document.querySelector('.submit-button');

  const daysArray = [...Array(31).keys()].map(x => ++x);

  const monthsArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const yearsArray = [2019, 2020, 2021];

  // const formInputs = [firstName, lastName, id, card, daysFrom, monthsFrom, yearFrom, daysTo, monthsTo, yearTo];
  const inputsArray = [firstName, lastName, id, card];
  const selectArray = [
    daysFrom,
    monthsFrom,
    yearFrom,
    daysTo,
    monthsTo,
    yearTo
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
    }),
      i.addEventListener('click', function() {
        slider.classList.remove('slider--active');
        nav.classList.remove('main-nav--open');
        list.classList.remove('main-list--open');
        paragraph.classList.remove('p-slider');
        inner.classList.remove('inner-hamburger--open');
        social.classList.remove('social-open');
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

  //Function which allows us to set options in select menu
  function fillSelectMenu(arrayName, selectMenu) {
    arrayName.map(item => {
      let option = document.createElement('option');
      option.value = item;
      option.innerHTML = item;
      selectMenu.appendChild(option);
    });
  }

  fillSelectMenu(daysArray, daysFrom);
  fillSelectMenu(daysArray, daysTo);
  fillSelectMenu(monthsArray, monthsFrom);
  fillSelectMenu(monthsArray, monthsTo);
  fillSelectMenu(yearsArray, yearFrom);
  fillSelectMenu(yearsArray, yearTo);

  // -- Functions to get values from form (inputs and select menu)
  function getSelectedText(selectMenuArray) {
    let result = [];
    selectMenuArray.map(item => {
      result = [...result, item.options[item.selectedIndex].text];
    });
    return result;
  }

  function getInputText(inputArray) {
    let result = [];
    inputArray.map(item => {
      result = [...result, item.value];
    });
    return result;
  }

  function getAllValues(inputArray, selectArray) {
    return [...getInputText(inputArray), ...getSelectedText(selectArray)];
  }

  function checkValidation(inputArray, selectArray, counter = 4) {
    let correct = 0;
    inputArray.map(item => {
      item.value === '' ? item.classList.add('input-error') : correct++;
    });
    if (counter - correct === 0) {
      inputArray.map(item => {
        item.classList.remove('input-error');
      });
      return getAllValues(inputArray, selectArray);
    } else {
      console.log(counter - correct);
      correct = 0;
    }
  }

  return {
    // fullFormArray: formInputs,
    inputArray: inputsArray,
    selectArray: selectArray,
    getSelectedText: getSelectedText,
    getInputText: getInputText,
    getAllValues: getAllValues,
    checkValidation: checkValidation,
    submitButton: finalButton
  };
})();

let dataModule = (function(UImodule) {
  let module = UImodule;
  const inputArray = module.inputArray;
  const selectArray = module.selectArray;

  let Person = function(firstName, lastName, id, card) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.card = card;
  };

  let Peroid = function(date1, date2) {
    this.date1 = date1;
    this.date2 = date2;
  };

  let Apartment = function(name, address, photo, description, price) {
    this.name = name;
    this.address = address;
    this.photo = photo;
    this.description = description;
    this.price = price;
  };

  /* UI module jest prawie skonczony, podstawowe zadania dzialaja. Dodac element ustawienia wyboru hotelu -> metoda setValue(); Data module -> funkcja do pobierania danych z hotel.json,
  metoda do obliczania ilosc dni z dwoch dat, prototyp do apartamentu obliczajacy cala kwote (mozna to zrobic bez prototypu i zwrocic jako argument
  w obiekcie). Stworzyc obiekt (ReadyObject) ktory bedzie destrukturyzowal wszystkie obiekty w tablicy i bedzie pozwalal na wysylanie tego obiektu do serwera.
  Zmiana nazwy pliku z index.js na inna nazwe, dopisac server.js*/
})(userInterfaceModule);

let controllerModule = (function(UImodule, userDataModule) {
  let userInterfaceModule = UImodule;
  let dataModule = userDataModule;

  userInterfaceModule.submitButton.addEventListener('click', function() {
    let array = userInterfaceModule.checkValidation(
      userInterfaceModule.inputArray,
      userInterfaceModule.selectArray
    );
    console.log(array);
  });
})(userInterfaceModule, dataModule);

controllerModule;
dataModule;

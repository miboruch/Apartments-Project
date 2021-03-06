'use strict';

import {userInterfaceModule} from './ui-module';

let dataModule = (function(UImodule) {
  //--VARIABLES----

  let module = UImodule;
  let cachedResults = {};
  let hotelData;
  let selectedHotel = -1;
  let submitButton = module.submitButton;
  const hotelDOM = module.hotelDOM;
  const options = module.options;
  const inputArray = module.inputArray;
  const userIdInput = module.userIdInput;
  const selectArray = module.selectArray;
  const hotelAPI = 'http://www.mocky.io/v2/5d38314d9f00000f009b3cb0';

  //--OBJECTS----

  let Person = function(firstName, lastName, id, card, date = new Date()) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.card = card;
    this.date = date;
  };

  let Peroid = function(date1, date2) {
    this.date1 = date1;
    this.date2 = date2;
  };

  let Apartment = function(name, address, description, dayPrice) {
    this.name = name;
    this.address = address;
    this.description = description;
    this.dayPrice = dayPrice;
  };

  Apartment.prototype.setFullPrice = function(fullPrice) {
    this.fullPrice = fullPrice;
  };

  //--INPUTS----

  function getAllValues(userIdInput, inputArray, selectMenuArray) {
    let result = [];
    result = [...result, userIdInput.value];

    inputArray.map(item => {
      result = [...result, item.value];
    });

    selectMenuArray.map(item => {
      result = [...result, item.options[item.selectedIndex].value];
    });

    return [...result];
  }

  function checkValidation(id, inputArray, selectArray, counter = 4) {
    /* Checks if all inputs are filled, if so, all values from input
    and select menu are returned */

    let correct = 0;
    let loginReg = /[0-9]{4}[0-3]{1}[0-9]{1}[0-9]{5}$/;

    id.value === '' || loginReg.test(id.value) === false
      ? id.classList.add('input-error')
      : correct++;

    inputArray.map(item => {
      item.value === '' ? item.classList.add('input-error') : correct++;
    });

    if (counter - correct === 0) {
      id.classList.remove('input-error');
      inputArray.map(item => {
        item.classList.remove('input-error');
      });
      return getAllValues(id, inputArray, selectArray);
    } else {
      correct = 0;
      throw new Error('Not every inputs were filled');
    }
  }

  //--APARTMENT----

  function setHotelIndex(index) {
    /* Set selected hotel index and update
    DOM elements with hotel informations */
    selectedHotel = index;

    let [name, address, decription, price] = hotelDOM;
    let currentHotel = getHotel(index);
    name.innerHTML = currentHotel.name;
    address.innerHTML = currentHotel.address;
    decription.innerHTML = currentHotel.description;
    price.innerHTML = `${currentHotel.dayPrice} USD`;
  }

  (async function getHotelData() {
    /* Async function to get data from API */
    try {
      let response = await fetch(hotelAPI);
      let data = await response.json();
      hotelData = data;
    } catch (error) {
      console.log(error);
    }
  })();

  function getHotel(index) {
    /* Returns hotel object -> needed when we return 
        one big object (Person, Peroid, Apartment) */
    let currentHotel = hotelData[index];
    let {name, address, description, dayPrice} = currentHotel;
    return new Apartment(name, address, description, dayPrice);
  }

  /* Click events to set the index of current Apartment */

  options.map((item, index) => {
    item.addEventListener('click', function() {
      setHotelIndex(index);
      submitButton.disabled = false;
    });
  });

  //--DATE----

  function daysAndPriceCounter(peroidObject, apartmentObject) {
    let time = Math.abs(
      peroidObject.date1.getTime() - peroidObject.date2.getTime()
    );
    let days = Math.ceil(time / (1000 * 3600 * 24));
    days === 0 ? (days = 1) : null;

    return Math.round(apartmentObject.dayPrice * days);
  }

  function getYear(yearArray, yearIndex) {
    /* Returns a year based on year array(2019,2020,2021) 
    and a chosen index*/
    return yearArray[parseInt(yearIndex) - 1];
  }

  function getDate(yearsArray, yearIndex, monthIndex, dayIndex) {
    /* Returns full date */
    try {
      let date = new Date(
        getYear(yearsArray, yearIndex),
        parseInt(monthIndex) - 1,
        dayIndex
      );
      date.setHours(date.getHours() + 2);
      return date;
    } catch (e) {
      console.log(e);
    }
  }

  function checkDate(firstDate, secondDate) {
    /* Check if firstDate is not greater than secondDate
    Returns Peroid object(Date from, Date to) */
    let dayFrom = selectArray[0];

    if (firstDate > secondDate) {
      dayFrom.classList.add('select-error');
      throw 'Peroid could not be created!';
    } else {
      dayFrom.classList.remove('select-error');
      return new Peroid(firstDate, secondDate);
    }
  }

  //--PERSON----

  /* MEMOIZED - this function allows us to save person objects, 
     and read values from cache instead of getting
     values from inputs over and over again */
  function memoizedPersonObject() {
    return function(firstName, lastName, id, card) {
      if (cachedResults[id]) {
        console.log('Fetching from cache');
        cachedResults[id].date = new Date();
        return cachedResults[id];
      } else {
        console.log('Adding new person to cache');
        cachedResults[id] = new Person(firstName, lastName, id, card);
        return cachedResults[id];
      }
    };
  }

  function sendToAPI(obj) {
    let objJSON = JSON.stringify(obj);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/add');

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(objJSON);

    xhr.addEventListener('load', function() {
      console.log('Loaded');
    });

    xhr.addEventListener('error', function() {
      console.log('Something went wrong');
    });
  }

  function getData() {
    try {
      let array = checkValidation(userIdInput, inputArray, selectArray);
      let [
        id,
        firstName,
        lastName,
        card,
        dayFrom,
        monthFrom,
        yearFrom,
        dayTo,
        monthTo,
        yearTo
      ] = array;
      let [firstDate, secondDate] = [
        getDate(module.yearsArray, yearFrom, monthFrom, dayFrom),
        getDate(module.yearsArray, yearTo, monthTo, dayTo)
      ];
      let currentPerson = memoizedPersonObject()(firstName, lastName, id, card);
      let currentApartment = getHotel(selectedHotel);
      let currentPeroid = checkDate(firstDate, secondDate);
      console.log(currentPeroid);

      return {
        ...currentPerson,
        ...currentPeroid,
        ...currentApartment,
        price: daysAndPriceCounter(currentPeroid, currentApartment)
      };
    } catch (e) {
      console.log(e);
    }
  }

  return {
    getData: getData,
    sendToAPI: sendToAPI
  };
})(userInterfaceModule);

export {dataModule};

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Client/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Client/js/app.js":
/*!******************************!*\
  !*** ./src/Client/js/app.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-module */ \"./src/Client/js/data-module.js\");\n/* harmony import */ var _ui_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui-module */ \"./src/Client/js/ui-module.js\");\n//--CONTROLLER MODULE----\r\n\r\n\r\n\r\n\r\n(function(UImodule, userDataModule) {\r\n  UImodule.submitButton.addEventListener('click', function() {\r\n    try {\r\n      let object = userDataModule.getData();\r\n      if (object === undefined) {\r\n        throw new Error('Cannot create PDF');\r\n      } else {\r\n        userDataModule.sendToAPI(object);\r\n        UImodule.setElementAsVisible(UImodule.confirmation);\r\n      }\r\n    } catch (e) {\r\n      console.log(e);\r\n    }\r\n  });\r\n})(_ui_module__WEBPACK_IMPORTED_MODULE_1__[\"userInterfaceModule\"], _data_module__WEBPACK_IMPORTED_MODULE_0__[\"dataModule\"]);\r\n\n\n//# sourceURL=webpack:///./src/Client/js/app.js?");

/***/ }),

/***/ "./src/Client/js/data-module.js":
/*!**************************************!*\
  !*** ./src/Client/js/data-module.js ***!
  \**************************************/
/*! exports provided: dataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dataModule\", function() { return dataModule; });\n/* harmony import */ var _ui_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui-module */ \"./src/Client/js/ui-module.js\");\n\r\n\r\n\r\n\r\nlet dataModule = (function(UImodule) {\r\n  //--VARIABLES----\r\n\r\n  let module = UImodule;\r\n  let cachedResults = {};\r\n  let hotelData;\r\n  let selectedHotel = -1;\r\n  let submitButton = module.submitButton;\r\n  const hotelDOM = module.hotelDOM;\r\n  const options = module.options;\r\n  const inputArray = module.inputArray;\r\n  const userIdInput = module.userIdInput;\r\n  const selectArray = module.selectArray;\r\n  const hotelAPI = 'http://www.mocky.io/v2/5d38314d9f00000f009b3cb0';\r\n\r\n  //--OBJECTS----\r\n\r\n  let Person = function(firstName, lastName, id, card, date = new Date()) {\r\n    this.firstName = firstName;\r\n    this.lastName = lastName;\r\n    this.id = id;\r\n    this.card = card;\r\n    this.date = date;\r\n  };\r\n\r\n  let Peroid = function(date1, date2) {\r\n    this.date1 = date1;\r\n    this.date2 = date2;\r\n  };\r\n\r\n  let Apartment = function(name, address, description, dayPrice) {\r\n    this.name = name;\r\n    this.address = address;\r\n    this.description = description;\r\n    this.dayPrice = dayPrice;\r\n  };\r\n\r\n  Apartment.prototype.setFullPrice = function(fullPrice) {\r\n    this.fullPrice = fullPrice;\r\n  };\r\n\r\n  //--INPUTS----\r\n\r\n  function getAllValues(userIdInput, inputArray, selectMenuArray) {\r\n    let result = [];\r\n    result = [...result, userIdInput.value];\r\n\r\n    inputArray.map(item => {\r\n      result = [...result, item.value];\r\n    });\r\n\r\n    selectMenuArray.map(item => {\r\n      result = [...result, item.options[item.selectedIndex].value];\r\n    });\r\n\r\n    return [...result];\r\n  }\r\n\r\n  function checkValidation(id, inputArray, selectArray, counter = 4) {\r\n    /* Checks if all inputs are filled, if so, all values from input\r\n    and select menu are returned */\r\n\r\n    let correct = 0;\r\n    let loginReg = /[0-9]{4}[0-3]{1}[0-9]{1}[0-9]{5}$/;\r\n\r\n    id.value === '' || loginReg.test(id.value) === false\r\n      ? id.classList.add('input-error')\r\n      : correct++;\r\n\r\n    inputArray.map(item => {\r\n      item.value === '' ? item.classList.add('input-error') : correct++;\r\n    });\r\n\r\n    if (counter - correct === 0) {\r\n      id.classList.remove('input-error');\r\n      inputArray.map(item => {\r\n        item.classList.remove('input-error');\r\n      });\r\n      return getAllValues(id, inputArray, selectArray);\r\n    } else {\r\n      correct = 0;\r\n      throw new Error('Not every inputs were filled');\r\n    }\r\n  }\r\n\r\n  //--APARTMENT----\r\n\r\n  function setHotelIndex(index) {\r\n    /* Set selected hotel index and update\r\n    DOM elements with hotel informations */\r\n    selectedHotel = index;\r\n\r\n    let [name, address, decription, price] = hotelDOM;\r\n    let currentHotel = getHotel(index);\r\n    name.innerHTML = currentHotel.name;\r\n    address.innerHTML = currentHotel.address;\r\n    decription.innerHTML = currentHotel.description;\r\n    price.innerHTML = `${currentHotel.dayPrice} USD`;\r\n  }\r\n\r\n  (async function getHotelData() {\r\n    /* Async function to get data from API */\r\n    try {\r\n      let response = await fetch(hotelAPI);\r\n      let data = await response.json();\r\n      hotelData = data;\r\n    } catch (error) {\r\n      console.log(error);\r\n    }\r\n  })();\r\n\r\n  function getHotel(index) {\r\n    /* Returns hotel object -> needed when we return \r\n        one big object (Person, Peroid, Apartment) */\r\n    let currentHotel = hotelData[index];\r\n    let {name, address, description, dayPrice} = currentHotel;\r\n    return new Apartment(name, address, description, dayPrice);\r\n  }\r\n\r\n  /* Click events to set the index of current Apartment */\r\n\r\n  options.map((item, index) => {\r\n    item.addEventListener('click', function() {\r\n      setHotelIndex(index);\r\n      submitButton.disabled = false;\r\n    });\r\n  });\r\n\r\n  //--DATE----\r\n\r\n  function daysAndPriceCounter(peroidObject, apartmentObject) {\r\n    let time = Math.abs(\r\n      peroidObject.date1.getTime() - peroidObject.date2.getTime()\r\n    );\r\n    let days = Math.ceil(time / (1000 * 3600 * 24));\r\n    days === 0 ? (days = 1) : null;\r\n\r\n    return Math.round(apartmentObject.dayPrice * days);\r\n  }\r\n\r\n  function getYear(yearArray, yearIndex) {\r\n    /* Returns a year based on year array(2019,2020,2021) \r\n    and a chosen index*/\r\n    return yearArray[parseInt(yearIndex) - 1];\r\n  }\r\n\r\n  function getDate(yearsArray, yearIndex, monthIndex, dayIndex) {\r\n    /* Returns full date */\r\n    try {\r\n      let date = new Date(\r\n        getYear(yearsArray, yearIndex),\r\n        parseInt(monthIndex) - 1,\r\n        dayIndex\r\n      );\r\n      date.setHours(date.getHours() + 2);\r\n      return date;\r\n    } catch (e) {\r\n      console.log(e);\r\n    }\r\n  }\r\n\r\n  function checkDate(firstDate, secondDate) {\r\n    /* Check if firstDate is not greater than secondDate\r\n    Returns Peroid object(Date from, Date to) */\r\n    let dayFrom = selectArray[0];\r\n\r\n    if (firstDate > secondDate) {\r\n      dayFrom.classList.add('select-error');\r\n      throw 'Peroid could not be created!';\r\n    } else {\r\n      dayFrom.classList.remove('select-error');\r\n      return new Peroid(firstDate, secondDate);\r\n    }\r\n  }\r\n\r\n  //--PERSON----\r\n\r\n  /* MEMOIZED - this function allows us to save person objects, \r\n     and read values from cache instead of getting\r\n     values from inputs over and over again */\r\n  function memoizedPersonObject() {\r\n    return function(firstName, lastName, id, card) {\r\n      if (cachedResults[id]) {\r\n        console.log('Fetching from cache');\r\n        cachedResults[id].date = new Date();\r\n        return cachedResults[id];\r\n      } else {\r\n        console.log('Adding new person to cache');\r\n        cachedResults[id] = new Person(firstName, lastName, id, card);\r\n        return cachedResults[id];\r\n      }\r\n    };\r\n  }\r\n\r\n  function sendToAPI(obj) {\r\n    let objJSON = JSON.stringify(obj);\r\n    let xhr = new XMLHttpRequest();\r\n    xhr.open('POST', '/add');\r\n\r\n    xhr.setRequestHeader('Content-Type', 'application/json');\r\n    xhr.send(objJSON);\r\n\r\n    xhr.addEventListener('load', function() {\r\n      console.log('Loaded');\r\n    });\r\n\r\n    xhr.addEventListener('error', function() {\r\n      console.log('Something went wrong');\r\n    });\r\n  }\r\n\r\n  function getData() {\r\n    try {\r\n      let array = checkValidation(userIdInput, inputArray, selectArray);\r\n      let [\r\n        id,\r\n        firstName,\r\n        lastName,\r\n        card,\r\n        dayFrom,\r\n        monthFrom,\r\n        yearFrom,\r\n        dayTo,\r\n        monthTo,\r\n        yearTo\r\n      ] = array;\r\n      let [firstDate, secondDate] = [\r\n        getDate(module.yearsArray, yearFrom, monthFrom, dayFrom),\r\n        getDate(module.yearsArray, yearTo, monthTo, dayTo)\r\n      ];\r\n      let currentPerson = memoizedPersonObject()(firstName, lastName, id, card);\r\n      let currentApartment = getHotel(selectedHotel);\r\n      let currentPeroid = checkDate(firstDate, secondDate);\r\n      console.log(currentPeroid);\r\n\r\n      return {\r\n        ...currentPerson,\r\n        ...currentPeroid,\r\n        ...currentApartment,\r\n        price: daysAndPriceCounter(currentPeroid, currentApartment)\r\n      };\r\n    } catch (e) {\r\n      console.log(e);\r\n    }\r\n  }\r\n\r\n  return {\r\n    getData: getData,\r\n    sendToAPI: sendToAPI\r\n  };\r\n})(_ui_module__WEBPACK_IMPORTED_MODULE_0__[\"userInterfaceModule\"]);\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/Client/js/data-module.js?");

/***/ }),

/***/ "./src/Client/js/ui-module.js":
/*!************************************!*\
  !*** ./src/Client/js/ui-module.js ***!
  \************************************/
/*! exports provided: userInterfaceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"userInterfaceModule\", function() { return userInterfaceModule; });\nlet userInterfaceModule = (function() {\r\n  let button = document.querySelector('.hamburger'),\r\n    slider = document.querySelector('.slider'),\r\n    nav = document.querySelector('.main-nav'),\r\n    list = document.querySelector('.main-list'),\r\n    inner = document.querySelector('.inner-hamburger'),\r\n    paragraph = document.querySelector('.menu-paragraph'),\r\n    confirmation = document.querySelector('.conf'),\r\n    social = document.querySelector('.social'),\r\n    menuItem = document.querySelectorAll('.item'),\r\n    loader = document.querySelector('.loader'),\r\n    firstOption = document.querySelector('.first'),\r\n    secondOption = document.querySelector('.second'),\r\n    thirdOption = document.querySelector('.third'),\r\n    fourthOption = document.querySelector('.fourth'),\r\n    /* FORM INPUTS */\r\n    inputNodeList = document.querySelectorAll('.in'),\r\n    userIdInput = document.querySelector('.user-id'),\r\n    selectNodeList = document.querySelectorAll('.sel'),\r\n    hotelName = document.querySelector('.hotel-name'),\r\n    hotelAddress = document.querySelector('.hotel-address'),\r\n    hotelDescription = document.querySelector('.hotel-description'),\r\n    hotelPrice = document.querySelector('.price');\r\n\r\n  let selectArr = Array.from(selectNodeList);\r\n  let inputArr = Array.from(inputNodeList);\r\n\r\n  const finalButton = document.querySelector('.submit-button');\r\n  const daysArray = [...Array(31).keys()].map(x => ++x);\r\n  const monthsArray = [\r\n    'January',\r\n    'February',\r\n    'March',\r\n    'April',\r\n    'May',\r\n    'June',\r\n    'July',\r\n    'August',\r\n    'September',\r\n    'October',\r\n    'November',\r\n    'December'\r\n  ];\r\n  const yearsArray = [2019, 2020, 2021];\r\n  const hotelDOM = [hotelName, hotelAddress, hotelDescription, hotelPrice];\r\n  const options = [firstOption, secondOption, thirdOption, fourthOption];\r\n\r\n  /* All events listener for DOM manipulation*/\r\n  (function() {\r\n    button.addEventListener('click', function() {\r\n      slider.classList.toggle('slider--active');\r\n      nav.classList.toggle('main-nav--open');\r\n      list.classList.toggle('main-list--open');\r\n      paragraph.classList.toggle('p-slider');\r\n      inner.classList.toggle('inner-hamburger--open');\r\n      social.classList.toggle('social-open');\r\n    });\r\n\r\n    for (let i of menuItem) {\r\n      i.addEventListener('mouseenter', function() {\r\n        paragraph.classList.toggle('menu-paragraph--hover');\r\n      }),\r\n        i.addEventListener('click', function() {\r\n          slider.classList.remove('slider--active');\r\n          nav.classList.remove('main-nav--open');\r\n          list.classList.remove('main-list--open');\r\n          paragraph.classList.remove('p-slider');\r\n          inner.classList.remove('inner-hamburger--open');\r\n          social.classList.remove('social-open');\r\n        });\r\n    }\r\n\r\n    document.addEventListener('DOMContentLoaded', function() {\r\n      window.setTimeout(function() {\r\n        loader.classList.add('loader-disappear');\r\n      }, 1000); //Zsuniecie loadera\r\n      window.setTimeout(function() {\r\n        loader.style.display = 'none';\r\n      }, 3000); //display: none dla loadera\r\n    });\r\n  })();\r\n\r\n  function setElementAsVisible(moduleElement) {\r\n    moduleElement.style.opacity = '1';\r\n    moduleElement.style.visibility = 'visible';\r\n\r\n    moduleElement.addEventListener('click', function() {\r\n      moduleElement.style.opacity = '0';\r\n      moduleElement.style.visibility = 'hidden';\r\n    });\r\n  }\r\n\r\n  //Function which allows us to set options in select menu\r\n  function fillSelectMenu(arrayName, selectMenu, secondSelectMenu) {\r\n    arrayName.map((item, index) => {\r\n      const option = document.createElement('option');\r\n      option.value = index + 1;\r\n      option.innerHTML = item;\r\n      selectMenu.appendChild(option);\r\n\r\n      const secondOption = option.cloneNode(true);\r\n      secondSelectMenu.appendChild(secondOption);\r\n    });\r\n  }\r\n  let [dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo] = selectArr;\r\n\r\n  fillSelectMenu(daysArray, dayFrom, dayTo);\r\n  fillSelectMenu(monthsArray, monthFrom, monthTo);\r\n  fillSelectMenu(yearsArray, yearFrom, yearTo);\r\n\r\n  return {\r\n    hotelDOM: hotelDOM,\r\n    options: options,\r\n    monthsArray: monthsArray,\r\n    yearsArray: yearsArray,\r\n    inputArray: inputArr,\r\n    userIdInput: userIdInput,\r\n    selectArray: selectArr,\r\n    confirmation: confirmation,\r\n    setElementAsVisible: setElementAsVisible,\r\n    submitButton: finalButton\r\n  };\r\n})();\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/Client/js/ui-module.js?");

/***/ })

/******/ });
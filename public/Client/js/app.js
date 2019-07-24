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

  const inputsArray = ([firstName, lastName, id, card] = inputArr);
  const selectArray = ([daysFrom, monthsFrom, yearFrom, daysTo, monthsTo, yearTo] = selectArr);

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

  fillSelectMenu(daysArray, daysFrom);
  fillSelectMenu(daysArray, daysTo);
  fillSelectMenu(monthsArray, monthsFrom);
  fillSelectMenu(monthsArray, monthsTo);
  fillSelectMenu(yearsArray, yearFrom);
  fillSelectMenu(yearsArray, yearTo);

  return {
    hotelDOM: hotelDOM,
    options: options,
    monthsArray: monthsArray,
    yearsArray: yearsArray,
    inputArray: inputsArray,
    selectArray: selectArray,
    submitButton: finalButton,
  }
})();


/* 
*
*
*   DATA MODULE
*   
*
*/


let dataModule = (function(UImodule){
  
  
  //--VARIABLES-----------------------------------------------

  let module = UImodule;
  let cachedResults = {};
  let hotelData;
  let selectedHotel = -1;
  let submitButton = module.submitButton;
  const hotelDOM = module.hotelDOM;
  const options = module.options;
  const inputArray = module.inputArray;
  const selectArray = module.selectArray;
  const hotelAPI = 'http://www.mocky.io/v2/5d38314d9f00000f009b3cb0';
  

  //--OBJECTS-----------------------------------------------

  let Person = function(firstName, lastName, id, card, date = new Date()){
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.card = card;
    this.date = date;
  }

  let Peroid = function(date1, date2){
    this.date1 = date1;
    this.date2 = date2;
  }

  let Apartment = function(name, address, description, dayPrice){
    this.name = name;
    this.address = address;
    this.description = description;
    this.dayPrice = dayPrice;
  }

  Apartment.prototype.setFullPrice = function(fullPrice){
    this.fullPrice = fullPrice;
  }


  //--INPUTS-----------------------------------------------

  function getSelectedText(selectMenuArray){
    /* Get text from select menu */
    let result = [];
    selectMenuArray.map(item=>{
      result = [...result, item.options[item.selectedIndex].value];
    })
    return result;
  }  

  function getInputText(inputArray){
    /* Get text from input */
    let result = [];
    inputArray.map(item=>{
      result = [...result, item.value];
    })
    return result;
  }  

  function getAllValues(inputArray, selectArray){
    /* Return all values from form */
    return [...getInputText(inputArray), ...getSelectedText(selectArray)];
  }

  function checkValidation(inputArray, selectArray, counter=4){
    /* Checks if all inputs are filled, if so, all values from input
    and select menu are returned */
    let correct = 0;
    inputArray.map(item => {
      item.value === '' ? item.classList.add('input-error') : correct++;
    })
    if(counter-correct === 0){
      inputArray.map(item=>{
        item.classList.remove('input-error');
      })
      return getAllValues(inputArray, selectArray); 
    }else{
      correct=0;
      throw 'Not every inputs were filled';
    }
  }
  

  //--APARTMENT---------------------------------------------

  function setHotelIndex(index){
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

  (async function getHotelData(){
    /* Async function to get data from API */
    try{
      let response = await fetch(hotelAPI);
      let data = response.json();
      return data;
    }catch(error){
      console.log(error);
    }
  })().then(response => {
      hotelData = response;
    })

    function getHotel(index){
      /* Returns hotel object -> needed when we return 
        one big object (Person, Peroid, Apartment) */
      let currentHotel = hotelData[index];
      let {name, address, description, dayPrice} = {...currentHotel};
      return new Apartment(name, address, description, dayPrice);
    }

    /* Click events to set the index of current Apartment */
    let [first, second, third, fourth] = options;
    first.addEventListener('click', function(){
      setHotelIndex(0);
      submitButton.disabled = false;
    })
    second.addEventListener('click', function(){
      setHotelIndex(1);
      submitButton.disabled = false;
    })
    third.addEventListener('click', function(){
      setHotelIndex(2);
      submitButton.disabled = false;
    })
    fourth.addEventListener('click', function(){
      setHotelIndex(3);
      submitButton.disabled = false;
    })


  //--DATE-----------------------------------------------

  function getYear(yearArray, yearIndex){
    /* Returns a year based on year array(2019,2020,2021) 
    and a chosen index*/
    return yearArray[parseInt(yearIndex)-1];
  }

  function getDate(yearsArray, yearIndex, monthIndex, dayIndex){
    /* Returns full date */
    try{
      return new Date(getYear(yearsArray, yearIndex), parseInt(monthIndex)-1, dayIndex);
    }catch(e){
      console.log(e);
    }
  }

  function checkDate(firstDate, secondDate){
    /* Check if firstDate is not greater than secondDate
    Returns Peroid object(Date from, Date to) */
    let [dayFrom] = [...selectArray];

    if(firstDate > secondDate){
      dayFrom.classList.add('select-error');
      throw 'Peroid could not be created!'; //Dodac klase css ktora zaznaczy pola dayFrom, monthFrom, yearFrom
    }else{
      dayFrom.classList.remove('select-error');
      return new Peroid(firstDate, secondDate);
    }
  }


  //--PERSON-----------------------------------------------

  /* MEMOIZED - this function allows us to save person objects, 
     and read values from cache instead of getting
     values from inputs over and over again */
  function memoizedPersonObject(){
    return function(firstName, lastName, id, card){
      if(cachedResults[id]){
        console.log('Fetching from cache');
        cachedResults[id].date = new Date();
        return cachedResults[id];
      }
      else{
        console.log('Adding new person to cache');
        cachedResults[id] = new Person(firstName, lastName, id, card);
        return cachedResults[id];
      }
    }
  }



  function getData(){
    try{
      let array = checkValidation(inputArray, selectArray);
      let [firstName, lastName, id, card, dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo] = array;
      let [firstDate, secondDate] = [getDate(module.yearsArray, yearFrom, monthFrom, dayFrom),getDate(module.yearsArray, yearTo, monthTo, dayTo)]
      

      return {...memoizedPersonObject()(firstName, lastName, id, card),
              ...checkDate(firstDate, secondDate),
              ...getHotel(selectedHotel)};

    }catch(e){ 
      console.log(e);
    }
  }

  /* All we have to do is send object to an API, and create a method to calculate price based on number of days.
     *. localstorage
  */

  return{
    getData: getData,
  }


})(userInterfaceModule);

// CONTROLLER MODULE -->-->-->-->-->-->-->-->-->-->-->-->

let controllerModule = (function(UImodule, userDataModule){
  UImodule.submitButton.addEventListener('click', function(){
    // console.log(userDataModule.getData());
    console.log(dataModule.getData());
  })
})(userInterfaceModule, dataModule);

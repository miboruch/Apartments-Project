// let dataModule = (function(UImodule){
//   let module = UImodule;
//   let cachedResults = {};
//   let hotelData;
//   let selectedHotel = module.selectedHotel;
//   const inputArray = module.inputArray;
//   const selectArray = module.selectArray;
//   const hotelAPI = 'http://www.mocky.io/v2/5d38314d9f00000f009b3cb0';
  

//   let Person = function(firstName, lastName, id, card, date = new Date()){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.id = id;
//     this.card = card;
//     this.date = date;
//   }

//   let Peroid = function(date1, date2){
//     this.date1 = date1;
//     this.date2 = date2;
//   }

//   let Apartment = function(name, address, description, dayPrice){
//     this.name = name;
//     this.address = address;
//     this.description = description;
//     this.dayPrice = dayPrice;
//   }

//   Apartment.prototype.setFullPrice = function(fullPrice){
//     this.fullPrice = fullPrice;
//   }

//   //--Get text from inputs-------------------------------------------------

//   function getSelectedText(selectMenuArray){
//     let result = [];
//     selectMenuArray.map(item=>{
//       result = [...result, item.options[item.selectedIndex].value];
//     })
//     return result;
//   }  

//   function getInputText(inputArray){
//     let result = [];
//     inputArray.map(item=>{
//       result = [...result, item.value];
//     })
//     return result;
//   }  

//   function getAllValues(inputArray, selectArray){
//     return [...getInputText(inputArray), ...getSelectedText(selectArray)];
//   }

//   //--Get hotel data from URL----------------------------------------------

//   function getHotel(index){
//     // let currentHotel = hotelData()
//     let {name, address, description, dayPrice} = {...hotelData[index]};
//     return new Apartment(name, address, description, dayPrice);
//   }

//   (async function getHotelData(){
//     try{
//       let response = await fetch(hotelAPI);
//       let data = response.json();
//       return data;
//     }catch(error){
//       console.log(error);
//     }
//   })().then(response => {
//       hotelData = response;
//       // console.log(hotelData[0]);
//       console.log(getHotel(1));
//     })

//   //--Get date from select-------------------------------------------------

//   function getYear(yearArray, yearIndex){ //We will pass monthIndex and yearIndex as a strings, because when we get data from input, their type is string.
//     return yearArray[parseInt(yearIndex)-1];
//   }

//   /* Get full date, we have to parse index from String to Int (try catch not necessary)*/
//   function getDate(yearsArray, yearIndex, monthIndex, dayIndex){
//     try{
//       return new Date(getYear(yearsArray, yearIndex), parseInt(monthIndex)-1, dayIndex);
//     }catch(e){
//       console.log(e);
//     }
//   }

//   function checkDate(firstDate, secondDate){
//     let [dayFrom] = [...selectArray];

//     if(firstDate > secondDate){
//       dayFrom.classList.add('select-error');
//       throw 'Peroid could not be created!'; //Dodac klase css ktora zaznaczy pola dayFrom, monthFrom, yearFrom
//     }else{
//       dayFrom.classList.remove('select-error');
//       return new Peroid(firstDate, secondDate);
//     }
//   }

//   function checkValidation(inputArray, selectArray, counter=4){
//     let correct = 0;
//     inputArray.map(item => {
//       item.value === '' ? item.classList.add('input-error') : correct++;
//     })
//     if(counter-correct === 0){
//       inputArray.map(item=>{
//         item.classList.remove('input-error');
//       })
//       return getAllValues(inputArray, selectArray); 
//     }else{
//       correct=0;
//       throw 'Not every inputs were filled';
//     }
//   }

//   /* MEMOIZED - this function allows us to save person objects, 
//      and read values from cache instead of getting
//      values from inputs over and over again */
//   function memoizedPersonObject(){
//     return function(firstName, lastName, id, card){
//       if(cachedResults[id]){
//         console.log('Fetching from cache');
//         cachedResults[id].date = new Date();
//         console.log(cachedResults[id]);
//         return cachedResults[id];
//       }
//       else{
//         console.log('Adding new person to cache');
//         cachedResults[id] = new Person(firstName, lastName, id, card);
//         console.log(cachedResults);
//         return cachedResults[id];
//       }
//     }
//   }

//   function getData(){
//     try{
//       let array = checkValidation(inputArray, selectArray);
//       let [firstName, lastName, id, card, dayFrom, monthFrom, yearFrom, dayTo, monthTo, yearTo] = array;
//       let [firstDate, secondDate] = [getDate(module.yearsArray, yearFrom, monthFrom, dayFrom),getDate(module.yearsArray, yearTo, monthTo, dayTo)]
      

//       return [memoizedPersonObject()(firstName, lastName, id, card),
//               checkDate(firstDate, secondDate)];

//     }catch(e){ 
//       console.log(e);
//     }
//   }

//   /* UI module jest prawie skonczony, podstawowe zadania dzialaja. Dodac element ustawienia wyboru hotelu -> metoda setValue(); Data module -> funkcja do pobierania 
//   danych z hotel.json, metoda do obliczania ilosc dni z dwoch dat, prototyp do apartamentu obliczajacy cala kwote (mozna to zrobic bez prototypu i zwrocic jako argument
//   w obiekcie). Stworzyc obiekt (ReadyObject) ktory bedzie destrukturyzowal wszystkie obiekty w tablicy i bedzie pozwalal na wysylanie tego obiektu do serwera.
//   Zmiana nazwy pliku z index.js na inna nazwe, dopisac server.js
  
//   Zmienic odczytywanie miesiaca nie jako text, ale jako value.
//   */

//   return{
//     getData: getData,
//   }


// })(userInterfaceModule);

// export default {dataModule};
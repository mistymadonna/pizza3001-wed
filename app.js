'use strict';

var locEl = document.getElementById('locations');

// Sample use of constructor
function PizzaShop(locationName, storeData) {
  this.locationName = locationName;
  this.locationId = locationName.replace(' ', '')
  this.storeData = storeData;
  this.createAndAppendTable();
}

function tableRowMaker(tableId, inputArray) {
  // make a table row
  var trEl = document.createElement('tr');
  // iterate thru array
  for (var i = 0; i < inputArray.length; i++) {
    var tdEl = document.createElement('td'); //create
    tdEl.textContent = inputArray[i]; // content
    trEl.appendChild(tdEl); // add cell to row
  }

  var tableEl = document.getElementById(tableId)
  tableEl.appendChild(trEl); // add row to table
}

PizzaShop.prototype.createAndAppendTable = function() {

  var str = document.createElement('strong');
  str.textContent = this.locationName;
  var p = document.createElement('p');
  p.appendChild(str);
  locEl.appendChild(p);

  var table = document.createElement('table');
  table.id = this.locationName;
  locEl.appendChild(table);

  tableRowMaker(this.locationName, [
    'Time',
    'Random Pizza/hr',
    'Random Delivery/hr',
  ]);
  tableRowMaker(this.locationName, [
    '8am-11am',
    this.storeData.am811.randomp,
    this.storeData.am811.randomd,
  ]);
  tableRowMaker(this.locationName, [
    '11am-2pm',
    this.storeData.am112.randomp,
    this.storeData.am112.randomd,
  ]);
  tableRowMaker(this.locationName, [
    '2pm-5pm',
    this.storeData.pm25.randomp,
    this.storeData.pm25.randomd,
  ]);
  tableRowMaker(this.locationName, [
    '5pm-8pm',
    this.storeData.pm58.randomp,
    this.storeData.pm58.randomd,
  ]);
  tableRowMaker(this.locationName, [
    '8pm-11pm',
    this.storeData.pm811.randomp,
    this.storeData.pm811.randomd,
  ]);
  tableRowMaker(this.locationName, [
    '11pm-2am',
    this.storeData.pm112.randomp,
    this.storeData.pm112.randomd,
  ]);
}

function StoreData(am811, am112, pm25, pm58, pm811, pm112) {
  this.am811 = am811;
  this.am112 = am112;
  this.pm25 = pm25;
  this.pm58 = pm58;
  this.pm811 = pm811;
  this.pm112 = pm112;
}

function TimeSlot(minp, maxp, mind, maxd) {
  this.randomp = randomBetween(minp, maxp);
  this.randomd = randomBetween(mind, maxd);
}

function randomBetween(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

var ballardStoreData = new StoreData(new TimeSlot(0, 4, 0, 4), new TimeSlot(0, 7, 0, 4), new TimeSlot(2, 15, 1, 4), new TimeSlot(15, 35, 3, 8), new TimeSlot(12, 31, 5, 12), new TimeSlot(5, 20, 6, 11))
var ballard = new PizzaShop('Ballard', ballardStoreData);

var firstHillStoreData = new StoreData(new TimeSlot(1, 3, 1, 7), new TimeSlot(5, 9, 2, 8), new TimeSlot(2, 13, 1, 6), new TimeSlot(18, 32, 3, 9), new TimeSlot(1, 3, 5, 12), new TimeSlot(8, 20, 6, 16))
var firstHill = new PizzaShop('First Hill', firstHillStoreData);

var theInternationalDistrictStoreData = new StoreData(new TimeSlot(0, 4, 0, 4), new TimeSlot(0, 7, 0, 4), new TimeSlot(5, 15, 0, 4), new TimeSlot(25, 39, 13, 38), new TimeSlot(22, 36, 5, 22), new TimeSlot(5, 21, 16, 31))
var theInternationalDistrict = new PizzaShop('The International District', theInternationalDistrictStoreData);

var southlakeUnionStoreData = new StoreData(new TimeSlot(0, 4, 0, 4), new TimeSlot(0, 7, 0, 4), new TimeSlot(5, 15, 0, 4), new TimeSlot(25, 39, 13, 18), new TimeSlot(22, 36, 5, 22), new TimeSlot(5, 21, 16, 31))
var southlakeUnion = new PizzaShop('Southlake Union', southlakeUnionStoreData);

var georgetownStoreData = new StoreData(new TimeSlot(2, 7, 3, 5), new TimeSlot(3, 8, 3, 9), new TimeSlot(1, 5, 1, 4), new TimeSlot(5, 13, 2, 4), new TimeSlot(22, 41, 15, 42), new TimeSlot(15, 20, 6, 21))
var georgetown = new PizzaShop('Georgetown', georgetownStoreData);

var ravennaStoreData = new StoreData(new TimeSlot(0, 4, 0, 4), new TimeSlot(0, 7, 0, 4), new TimeSlot(2, 15, 1, 4), new TimeSlot(6, 9, 5, 18), new TimeSlot(4, 8, 2, 5), new TimeSlot(2, 4, 3, 11))
var ravenna = new PizzaShop('Ravenna', ravennaStoreData);

//////////////////////

function createTimeslotFromDiv(divElement) {
  var timeslot = new TimeSlot(
    parseInt(divElement.children[2].value),
    parseInt(divElement.children[4].value),
    parseInt(divElement.children[6].value),
    parseInt(divElement.children[8].value)
  );
  return timeslot;
}

function handleCustomerOrder(event) {
  console.log(event);
  event.preventDefault(); //gotta have it. prevents page reload

  // check all inputs
  var inputs = event.target.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      return alert('Fields cannot be empty!');
    }
  }

  var fieldset = event.target.children[0];
  var timeSlots = [];
  for (var i = 2; i <= 7; i++) {
    var childDiv = fieldset.children[i]

    var userTimeSlot = createTimeslotFromDiv(childDiv)
    timeSlots.push(userTimeSlot)
  }

  var userStoreData = new StoreData(timeSlots[0], timeSlots[1], timeSlots[2], timeSlots[3], timeSlots[4], timeSlots[5])

  var userShop = new PizzaShop(event.target.name.value, userStoreData);
};

var customerOrder = document.getElementById('customerOrder');
customerOrder.addEventListener('submit', handleCustomerOrder);

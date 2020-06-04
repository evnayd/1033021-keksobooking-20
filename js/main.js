'use strict';

var MAP_WIDTH = 1200;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

/* находим шаблон, в который будем копировать и элемент, в который будем вставлять похожие пины
var mapPinsField = document.querySelector('.map__pins');
var mapPInTemplate = document.querySelector('#pin')
   .content
   .querySelector('.map__pins');

   for (var i = 0; i < 8; i++) {
    var pinElement = mapPInTemplate.cloneNode(true);
    mapPinsField.appendChild(pinElement);
  }*/

// массивы значений для случайного пина:
var avatarsList = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
  'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png',
  'img/avatars/user08.png'];
var titleList = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var checkInList = ['12:00', '13:00', '14:00'];
var checkOutList = ['12:00', '13:00', '14:00'];
var featersList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var picsList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinList = [];

// функция, которая возвращает случайный элемент массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// функция, которая возвращает случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// заводим объекты с описанием жилья

var getSimilarPins = function () {
  var i = pinList[i];
  var x = getRandomNumber(0, MAP_WIDTH);
  var y = getRandomNumber(130, 630);
  for (i = 0; i < 8; i++) {
    var similarPin = {
      'author': {
        'avatar': getRandomElement(avatarsList)
      },
      'offer': {
        'title': getRandomElement(titleList),
        'address': x + ', ' + y,
        'price': getRandomNumber(10000, 50000),
        'type': getRandomElement(typeList),
        'rooms': getRandomNumber(1, 3),
        'guests': getRandomNumber(0, 2),
        'checkin': getRandomElement(checkInList),
        'checkout': getRandomElement(checkOutList),
        'features': getRandomElement(featersList),
        'description': '',
        'photos': getRandomElement(picsList),
      },
      'location': {
        'x': x,
        'y': y
      }
    };
  }
  return similarPin;
};

getSimilarPins();



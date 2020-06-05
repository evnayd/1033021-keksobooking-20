'use strict';

var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var AVATAR_LIST = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
  'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png',
  'img/avatars/user08.png'];
var TITLE_LIST = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATERS_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PICS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_LIST = [];
var DESCRIPTION_LIST = ['cozy place', 'beutiful view', 'modern design'];
var PINS_NUMBER = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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
var getRandomPins = function () {
  var i = PIN_LIST[i];
  var locationX = getRandomNumber(0, MAP_WIDTH);
  var locationY = getRandomNumber(130, 630);
  for (i = 0; i < PINS_NUMBER; i++) {
    var randomPin = {
      'author': {
        'avatar': getRandomElement(AVATAR_LIST)
      },
      'offer': {
        'title': getRandomElement(TITLE_LIST),
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(10000, 50000),
        'type': getRandomElement(TYPE_LIST),
        'rooms': getRandomNumber(1, 3),
        'guests': getRandomNumber(0, 2),
        'checkin': getRandomElement(CHECKIN_LIST),
        'checkout': getRandomElement(CHECKOUT_LIST),
        'features': getRandomElement(FEATERS_LIST),
        'description': getRandomElement(DESCRIPTION_LIST),
        'photos': getRandomElement(PICS_LIST)
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return randomPin;
};

getRandomPins(8);
// var pins = getRandomPins([]);
var pinField = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

for (var i = 0; i < PINS_NUMBER; i++) {
  var thatPin = pinTemplate.cloneNode(true);
  pinField.appendChild(thatPin);
}



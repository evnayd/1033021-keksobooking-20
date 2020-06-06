'use strict';

var GAP = 20;
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
var MIN_Y = 130;
var MAX_Y = 630;

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
  for (i = 0; i < PINS_NUMBER; i++) {
    var randomPin = {
      'author': {
        'avatar': getRandomElement(AVATAR_LIST)
      },
      'offer': {
        'title': getRandomElement(TITLE_LIST),
        'address': getRandomNumber(GAP, MAP_WIDTH - GAP) + ', ' + getRandomNumber(MIN_Y, MAX_Y),
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
        'x': getRandomNumber(GAP, MAP_WIDTH - GAP),
        'y': getRandomNumber(MIN_Y, MAX_Y),
      }
    };
    PIN_LIST.push(randomPin);
  }
  return PIN_LIST;
};

// getRandomPins(8);

// находим шаблон и куда его будем копировать

var pinField = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// заполняем пин информацией
var createNewPin = function (data) {

  var pinElement = pinTemplate.cloneNode(true);
  var pinPicture = pinElement.querySelector('img');

  pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';

  pinPicture.src = data.author.avatar;
  pinPicture.alt = data.offer.title;

  return pinElement;
};

// рисуем пины
var pins = getRandomPins();
var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createNewPin(pins[i]));
  }
  pinField.appendChild(fragment);
};

renderPins();

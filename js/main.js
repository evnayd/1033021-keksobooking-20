'use strict';

var GAP = 20;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var AVATAR_LIST = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
  'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png',
  'img/avatars/user08.png'];
var TITLE_LIST = ['Чудесный уголок', 'Лучший вид на город', 'Тихое место', 'Отдых вашей мечты'];
var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATERS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PICS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_LIST = [];
var DESCRIPTION_LIST = ['cozy place', 'beutiful view', 'modern design'];
var PINS_NUMBER = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = GAP;

var field = document.querySelector('.map__pins');

var map = document.querySelector('.map');
// map.classList.remove('map--faded');

// функция, которая возвращает случайный элемент массива
var getRandomElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// функция, которая возвращает случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//  функция, которая возвращает массив случайной длинны
var getRandomArray = function (arr) {
  var randomObject = {};
  for (var i = 0; i <= getRandomNumber(1, arr.length - 1); i++) {
    var randomElement = getRandomElement(arr);
    randomObject[randomElement] = true;
  }

  return Object.keys(randomObject);
};

var featersList = getRandomArray(FEATERS);
// заводим объекты с описанием жилья
var getRandomPins = function () {
  for (var i = 0; i < PINS_NUMBER; i++) {
    var locationX = getRandomNumber(MIN_X, getRandomNumber(GAP, field.offsetWidth - GAP));
    var locationY = getRandomNumber(MIN_Y, MAX_Y);
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
        'guests': getRandomNumber(1, 2),
        'checkin': getRandomElement(CHECKIN_LIST),
        'checkout': getRandomElement(CHECKOUT_LIST),
        // 'features': getRandomArray(FEATERS_LIST),
        'features': featersList.join(', '),
        'description': getRandomElement(DESCRIPTION_LIST),
        'photos': getRandomArray(PICS_LIST)
      },
      'location': {
        'x': locationX,
        'y': locationY,
      }
    };
    PIN_LIST.push(randomPin);
  }
  return PIN_LIST;
};


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

/* var cardTemplate = document.querySelector('#card')
.content
.querySelector('.map__card');


var getPinCard = function (data) {
  var cardCopy = cardTemplate.cloneNode(true);

  cardCopy.querySelector('.popup__title').textContent = data.offer.title;
  cardCopy.querySelector('.popup__text--address').textContent = data.offer.adress;
  cardCopy.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

  var type = cardCopy.querySelector('.popup__type');
  type.textContent = 'Квартира';
  if (data.offer.type === 'bungalo') {
    type.textContent = 'Бунгало';
  } else if (data.offer.type === 'palace') {
    type.textContent = 'Дворец';
  } else if (data.offer.type === 'house') {
    type.textContent = 'Дoм';
  }

  cardCopy.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardCopy.querySelector('.popup__text--time').textContent = ' Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardCopy.querySelector('.popup__features').textContent = data.offer.features;
  cardCopy.querySelector('.popup__description').textContent = data.offer.description;

  var picFragment = document.createDocumentFragment();
  for (var j = 0; j < data.offer.photos.length; j++) {
    var cardPhoto = document.createElement('img');
    cardPhoto.src = data.offer.photos[j];
    cardPhoto.width = 45;
    cardPhoto.height = 44;
    picFragment.appendChild(cardPhoto);
  }

  var cardPhotos = cardCopy.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  cardPhotos.appendChild(picFragment);

  cardCopy.querySelector('.popup__avatar').textContent = data.author.avatar;
  return cardCopy;
};

var renderCard = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getPinCard(pins[0]));
  pinField.appendChild(fragment);
};

renderCard();*/


var formFilters = document.querySelector('.map__filters');
formFilters.classList.add('ad-form--disabled');
var formFieldsets = document.querySelectorAll('ad-form__element');

var setDisabled = function () {
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

setDisabled();


var form = document.querySelector('.ad-form');

var mainPin = document.querySelector('.map__pin--main');
var getMainPinAdress = function (data) {
  mainPin.style.left = data.location.x - PIN_WIDTH / 2;
  mainPin.style.top = data.location.y - PIN_HEIGHT;
  return mainPin;
};
  // mainPin.style.left = data.location.x - PIN_WIDTH / 2;
  // mainPin.style.top = data.location.y - PIN_HEIGHT;

var adressInput = document.querySelector('#address');

/* mainPin.addEventListener('mousedown', function (evt) {
   if (evt.wich === '1') {
  evt.preventDefault();
  renderPins();
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  formFilters.classList.remove('ad-form--disabled');
  // formFieldsets[i].removeAttribute('disabled');
  adressInput.value = mainPin.style.left + ' ' + mainPin.style.top;
  }
});*/

mainPin.addEventListener('mousedown', function () {
  renderPins();
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  formFilters.classList.remove('ad-form--disabled');
  // formFieldsets[i].removeAttribute('disabled');
  adressInput.value = mainPin.style.left + ' ' + mainPin.style.top;
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    renderPins();
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    formFilters.classList.remove('ad-form--disabled');
    // formFieldsets[i].removeAttribute('disabled');
  }
});

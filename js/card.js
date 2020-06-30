'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardCopy = cardTemplate.cloneNode(true);

  var adTitle = cardCopy.querySelector('.popup__title');
  var adAdress = cardCopy.querySelector('.popup__text--address');
  var adPrice = cardCopy.querySelector('.popup__text--price');
  var adType = cardCopy.querySelector('.popup__type');
  var adCapacity = cardCopy.querySelector('.popup__text--capacity');
  var adTime = cardCopy.querySelector('.popup__text--time');
  var adFeaters = cardCopy.querySelector('.popup__features');
  var adAvatar = cardCopy.querySelector('.popup__avatar');
  var adDescription = cardCopy.querySelector('.popup__description');
  var adPhotos = cardCopy.querySelector('.popup__photos');

  /*
  var TITLE_LIST = ['Чудесный уголок', 'Лучший вид на город', 'Тихое место', 'Отдых вашей мечты'];                                             var findRandom = function (){ for (var i = 0; i < 8; i++)                     var randomPin = {
        'offer': {
          'title': window.utils.getRandomElement(TITLE_LIST),
      }};}

var TITLE_LIST = ['Чудесный уголок', 'Лучший вид на город', 'Тихое место', 'Отдых вашей мечты'];

var findRandom = function () {
  for (var i = 0; i < 8; i++)  {            var randomPin = {
 'title': getRandomElement(TITLE_LIST)
  }
  }
  return randomPin;
 };

console.log(findRandom(TITLE_LIST));
  */

  var getPinCard = function () {
    for (var i = 0; i <= window.data.PINS_NUMBER; i++) {
      adTitle.textContent = window.data.randomPin.offer.title;
      adAdress.textContent = window.data.randomPin.offer.adress;
      adPrice.textContent = window.data.randomPin.offer.price + '₽/ночь';

      adType.textContent = 'Квартира';
      if (window.data.randomPin.offer.type === 'bungalo') {
        adType.textContent = 'Бунгало';
      } else if (window.data.randomPin.offer.typee === 'palace') {
        adType.textContent = 'Дворец';
      } else if (window.data.randomPin.offer.type === 'house') {
        adType.textContent = 'Дoм';
      }

      adCapacity.textContent = window.data.randomPin.offer.rooms + ' комнаты для ' + window.data.randomPin.offer.guests + ' гостей';
      adTime.textContent = ' Заезд после ' + window.data.randomPin.offer.checkin + ', выезд до ' + window.data.randomPin.offer.checkout;
      adFeaters.textContent = window.data.randomPin.offer.features;
      adDescription.textContent = window.data.randomPin.offer.description;

      var picFragment = document.createDocumentFragment();
      for (var j = 0; j < window.data.randomPin.offer.photos.length; j++) {
        var cardPhoto = document.createElement('img');
        cardPhoto.src = window.data.randomPin.offer.photos[j];
        cardPhoto.width = 45;
        cardPhoto.height = 44;
        picFragment.appendChild(cardPhoto);
      }

      adPhotos.innerHTML = '';
      adPhotos.appendChild(picFragment);

    //adAvatar.textContent = data.author.avatar;
  //}{
    }
    return cardCopy;
  };



  var renderCard = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var fragment = document.createDocumentFragment();
    for (var i = 1; i <= window.data.PINS_NUMBER; i++) {
      fragment.appendChild(getPinCard(allPins[i]));
      window.data.field.appendChild(fragment);
    }
  };

  var closeCard = function () {
    if (cardCopy) {
      cardCopy.remove();
    }
  };

  var closeCardBtn = cardCopy.querySelector('.popup__close');

  closeCardBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    cardCopy.remove();
  });


  closeCardBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.form.ESCAPE_KEY) {
      evt.preventDefault();
      cardCopy.remove();
    }
  });

  window.card = {
    getPinCard: getPinCard,
    renderCard: renderCard,
    closeCard: closeCard
  };
})();

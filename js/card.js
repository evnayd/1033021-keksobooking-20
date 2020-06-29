'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardCopy = cardTemplate.cloneNode(true);

  var getPinCard = function () {
    // cardCopy.querySelector('.popup__title').textContent = 'Ehf';
    //cardCopy.querySelector('.popup__title').textContent = window.data.offer.title;
    // cardCopy.querySelector('.popup__title').textContent = window.utils.getRandomElement(window.data.TITLE_LIST);
    cardCopy.querySelector('.popup__title').textContent = window.utils.getRandomElement(['Чудесный уголок', 'Лучший вид на город', 'Тихое место', 'Отдых вашей мечты']);
    /*cardCopy.querySelector('.popup__text--address').textContent = data.offer.adress;
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

    // cardCopy.querySelector('.popup__avatar').textContent = data.author.avatar;*/
    return cardCopy;
  };

  /*var getPinCard = function () {
    var adTitle = cardCopy.querySelector('.popup__title');
    var adAdress = cardCopy.querySelector('.popup__text--address');
    var adPrice = cardCopy.querySelector('.popup__text--price');
    var adType = cardCopy.querySelector('.popup__type');
    var adCapacity = cardCopy.querySelector('.popup__text--capacity');
    var adTime = cardCopy.querySelector('.popup__text--time');
    var adfeaters = cardCopy.querySelector('.popup__features');
    var adAvatar = cardCopy.querySelector('.popup__avatar');*/

  getPinCard();


  var renderCard = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < allPins.length; i++) {
      fragment.appendChild(getPinCard(allPins[i]));
      window.data.field.appendChild(fragment);
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
    renderCard: renderCard
  };
})();

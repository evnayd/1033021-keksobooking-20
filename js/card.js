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


  var getPinCard = function (data) {
    adTitle.textContent = data.offer.title;
    adAdress.textContent = data.offer.adress;
    adPrice.textContent = data.offer.price + '₽/ночь';

    adType.textContent = 'Квартира';
    if (data.offer.type === 'bungalo') {
      adType.textContent = 'Бунгало';
    } else if (data.offer.type === 'palace') {
      adType.textContent = 'Дворец';
    } else if (data.offer.type === 'house') {
      adType.textContent = 'Дoм';
    }

    adCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    adTime.textContent = ' Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    adFeaters.textContent = data.offer.features;
    adDescription.textContent = data.offer.description;

    var picFragment = document.createDocumentFragment();
    for (var j = 0; j < data.offer.photos.length; j++) {
      var cardPhoto = document.createElement('img');
      cardPhoto.src = data.offer.photos[j];
      cardPhoto.width = 45;
      cardPhoto.height = 44;
      cardPhoto.style.margin = 2 + 'px';
      picFragment.appendChild(cardPhoto);
    }

    adPhotos.innerHTML = '';
    adPhotos.appendChild(picFragment);
    adAvatar.src = data.author.avatar;

    adAvatar.src = data.author.avatar;
    return cardCopy;
  };

  var renderCard = function (data) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.getPinCard(data));
    window.map.field.appendChild(fragment);
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

  var closeCard = function () {
    if (!cardCopy === null) {
      cardCopy.remove();
    }
  };

  window.card = {
    getPinCard: getPinCard,
    renderCard: renderCard,
    closeCard: closeCard,
    cardCopy: cardCopy
  };
})();

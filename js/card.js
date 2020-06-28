'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var cardCopy = cardTemplate.cloneNode(true);

  var getPinCard = function () {
    cardCopy.querySelector('.popup__title').textContent = 'Ehf';
    /*cardCopy.querySelector('.popup__title').textContent = data.offer.title;
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

    // cardCopy.querySelector('.popup__avatar').textContent = data.author.avatar;*/
    return cardCopy;
  };

  getPinCard();

  var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var renderCard = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < allPins.length; i++) {
      fragment.appendChild(getPinCard(allPins[i]));
      window.data.field.appendChild(fragment);
    }
  };

  // renderCard();

  for (var i = 0; i < allPins.length; i++) {
    allPins[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      renderCard();
    });
  }

  for (var j = 0; j < allPins.length; j++) {
    allPins[j].addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        renderCard();
      }
    });
  }

  var closeCardBtn = cardCopy.querySelector('.popup__close');

  closeCardBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    cardCopy.remove();
  });

  cardCopy.addEventListener('mousedown', function (evt) {
    if (evt.button === 27) {
      evt.preventDefault();
      cardCopy.remove();
    }
  });

  window.card = {
    getPinCard: getPinCard,
    renderCard: renderCard
  };
})();

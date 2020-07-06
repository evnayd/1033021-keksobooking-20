'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
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

    pinElement.addEventListener('click', function (evt) {
      window.card.closeCard();
      window.card.renderCard(data);

      if (evt.keyCode === 'enter') {
        window.card.closeCard();
        window.card.renderCard(data);
      }
    });

    return pinElement;
  };

  window.pin = {
    createNewPin: createNewPin
  };
})();

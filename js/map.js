'use strict';


(function () {
  var map = document.querySelector('.map');

  // рисуем пины

  /*var renderCard = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < allPins.length; i++) {
      fragment.appendChild(window.card.getPinCard(allPins[i]));
      window.data.field.appendChild(fragment);
    }
  };*/

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createNewPin(pins[i]));
    }
    window.data.field.appendChild(fragment);

    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < allPins.length; j++) {
      allPins[j].addEventListener('click', function (evt) {
        evt.preventDefault();
        window.card.renderCard();
      });
    }
  };

  window.map = {
    renderPins: renderPins,
    map: map
  };
})();

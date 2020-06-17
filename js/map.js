'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinField = document.querySelector('.map__pins');

  // рисуем пины
  var pins = window.data.getRandomPins();
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createNewPin(pins[i]));
    }
    pinField.appendChild(fragment);

    window.map = {
      renderPins: renderPins
    };
  };
})();
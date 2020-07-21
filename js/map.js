'use strict';

(function () {

  var MAX_PINS = 5;
  var map = document.querySelector('.map');
  var field = document.querySelector('.map__pins');

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
       for (var i = 0; i < pins.length && i < MAX_PINS; i++) {
      fragment.appendChild(window.pin.createNewPin(pins[i]));
    }
    field.appendChild(fragment);
  };

  window.map = {
    renderPins: renderPins,
    map: map,
    field: field,
    MAX_PINS: MAX_PINS
  };
})();

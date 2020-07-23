'use strict';

(function () {

  var MAX_PINS = 5;
  var map = document.querySelector('.map');
  var field = document.querySelector('.map__pins');

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length && i < MAX_PINS; i++) {
      fragment.appendChild(window.pin.createNewPin(data[i]));
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

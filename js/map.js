'use strict';


(function () {

  var map = document.querySelector('.map');
  var field = document.querySelector('.map__pins');

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createNewPin(pins[i]));
    }
    field.appendChild(fragment);
  };

  window.map = {
    renderPins: renderPins,
    map: map,
    field: field
  };
})();

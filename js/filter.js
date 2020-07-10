'use strict';

(function () {

  var MAX_PINS = 5;

  var offerType = document.querySelector('#housing-type');

  var successHandler = function (data) {
    var updatePins = function () {
      var sameTypePins = data.filter(function (it) {
        return it.offer.type === offerType.value;
      });
      for (var i = 0; i <= MAX_PINS; i++) {
        window.map.renderPins(sameTypePins);
      }
    };
    window.form.formFilters.addEventListener('change', function () {
      window.card.cardCopy.remove();
      window.form.deletePins();
      updatePins(data);
    });
  };

  window.backend.load('https://javascript.pages.academy/keksobooking/data', successHandler, window.backend.errorHandler);
})();


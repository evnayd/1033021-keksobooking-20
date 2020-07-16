'use strict';

(function () {

  var DEFAULT_VALUE = 'any';

  var offerType = document.querySelector('#housing-type');

  var offerRooms = document.querySelector('#housing-rooms');
  var offerGuestsNumber = document.querySelector('#housing-guests');

  var filterPins = function (data) {

    var updatePins = function () {

      var sameTypePins = data.filter(function (it) {
        if (offerType.value !== DEFAULT_VALUE) {
          return it.offer.type === offerType.value;
        } else {
          return it;
        }
      });

      var sameRoomsPins = sameTypePins.filter(function (it) {
        if (offerRooms.value !== DEFAULT_VALUE) {
          return it.offer.rooms === +offerRooms.value;
        } else {
          return it;
        }
      });

      var sameGuestsNumPins = sameRoomsPins.filter(function (it) {
        if (offerGuestsNumber.value !== DEFAULT_VALUE) {
          return it.offer.guests === +offerGuestsNumber.value;
        } else {
          return it;
        }
      });

      // window.map.renderPins(sameGuestsNumPins);
      window.map.renderPins(sameGuestsNumPins.slice(0, 5));
    };

    window.form.formFilters.addEventListener('change', function () {
      window.card.cardCopy.remove();
      window.form.deletePins();
      updatePins(data);
    });
  };

  window.backend.load('https://javascript.pages.academy/keksobooking/data', filterPins, window.backend.errorHandler);
})();

'use strict';

(function () {

  // var DEFAULT_VALUE = 'any';

  var MAX_PINS = 5;

  var offerType = document.querySelector('#housing-type');

  var offerRooms = document.querySelector('#housing-rooms');
  var offerGuestsNumber = document.querySelector('#housing-guests');

  var successHandler = function (data) {

    var updatePins = function () {

      var sameTypePins = data.filter(function (it) {
        return it.offer.type === offerType.value;
      });

      var sameGuestsNumPins = data.filter(function (it) {
        return it.offer.guests === +offerGuestsNumber.value;
      });

      var sameRoomsPins = data.filter(function (it) {
        return it.offer.rooms === +offerRooms.value;
      });

      var filteredPins = sameGuestsNumPins.concat(sameRoomsPins).concat(sameTypePins);
      var uniquePins = filteredPins.filter(function (it, i) {
        return filteredPins.indexOf(it) === i &&
        it.offer.type === offerType.value &&
        it.offer.guests === +offerGuestsNumber.value &&
        it.offer.rooms === +offerRooms.value;
      });

      for (var i = 0; i <= MAX_PINS; i++) {
        window.map.renderPins(uniquePins);
      }
    };


    /* var successHandler = function (data) {

    var updatePins = function () {

      var sameTypePins = data.filter(function (it) {
        return it.offer.type === offerType.value;
      });

      var sameGuestsNumPins = data.filter(function (it) {
        return it.offer.guests === +offerGuestsNumber.value;
      });

      var sameRoomsPins = data.filter(function (it) {
        return it.offer.rooms === +offerRooms.value;
      });

      for (var i = 0; i <= MAX_PINS; i++) {
       // window.map.renderPins(sameTypePins);
        window.map.renderPins(sameRoomsPins);
        //window.map.renderPins(sameTypePins.concat(sameGuestsNumPins).concat(sameRoomsPins));
      }
    }; */


    window.form.formFilters.addEventListener('change', function () {
      window.card.cardCopy.remove();
      window.form.deletePins();
      updatePins(data);
    });
  };

  window.backend.load('https://javascript.pages.academy/keksobooking/data', successHandler, window.backend.errorHandler);
})();

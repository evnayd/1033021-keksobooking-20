'use strict';

(function () {

  var DEFAULT_VALUE = 'any';
  var MAX_PINS = 5;

  var offerType = document.querySelector('#housing-type');
  var offerRooms = document.querySelector('#housing-rooms');
  var offerGuestsNumber = document.querySelector('#housing-guests');
  var offerPrice = document.querySelector('#housing-price');

  var PRICE = {
    'low': {
      from: 0,
      to: 9999,
    },
    'middle': {
      from: 10000,
      to: 49999,
    },
    'high': {
      from: 50000,
      to: 100000,
    }
  };

  var filterPins = function (data) {

    var updatePins = function () {

      var sameTypePins = data.filter(function (it) {
        if (offerType.value !== DEFAULT_VALUE) {
          return it.offer.type === offerType.value;
        } else {
          return it;
        }
      });

      var samePricePins = sameTypePins.filter(function (it) {
        if (offerPrice.value !== DEFAULT_VALUE) {
          return it.offer.price >= PRICE[offerPrice.value].from &&
          it.offer.price <= PRICE[offerPrice.value].to;
        } else {
          return it;
        }
      });

      var sameRoomsPins = samePricePins.filter(function (it) {
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

      window.map.renderPins(sameGuestsNumPins.slice(0, MAX_PINS));
    };

    window.form.formFilters.addEventListener('change', function () {
      window.card.cardCopy.remove();
      window.form.deletePins();
      updatePins(data);
    });
  };

  window.backend.load('https://javascript.pages.academy/keksobooking/data', filterPins, window.backend.errorHandler);
})();

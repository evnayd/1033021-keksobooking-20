'use strict';

(function () {

  var DEFAULT_VALUE = 'any';
  var MAX_PINS = 5;

  var offerType = document.querySelector('#housing-type');
  var offerRooms = document.querySelector('#housing-rooms');
  var offerGuestsNumber = document.querySelector('#housing-guests');
  var offerPrice = document.querySelector('#housing-price');
  // var offerFeatures = document.querySelectorAll('.map__checkbox');
  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishWasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

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
        }
        return it;
      });

      var samePricePins = sameTypePins.filter(function (it) {
        if (offerPrice.value !== DEFAULT_VALUE) {
          return it.offer.price >= PRICE[offerPrice.value].from &&
          it.offer.price <= PRICE[offerPrice.value].to;
        }
        return it;
      });

      var sameRoomsPins = samePricePins.filter(function (it) {
        if (offerRooms.value !== DEFAULT_VALUE) {
          return it.offer.rooms === +offerRooms.value;
        }
        return it;
      });

      var sameGuestsNumPins = sameRoomsPins.filter(function (it) {
        if (offerGuestsNumber.value !== DEFAULT_VALUE) {
          return it.offer.guests === +offerGuestsNumber.value;
        }
        return it;
      });

      var wifiPins = sameGuestsNumPins.filter(function (it) {
        if (filterWifi.checked) {
          return it.offer.features.includes(filterWifi.value);
        }
        return it;
      });

      var filterdishwasherPins = wifiPins.filter(function (it) {
        if (filterDishWasher.checked) {
          return it.offer.features.includes(filterDishWasher.value);
        }
        return it;
      });

      var filterparkingPins = filterdishwasherPins.filter(function (it) {
        if (filterParking.checked) {
          return it.offer.features.includes(filterParking.value);
        }
        return it;
      });


      var filterwasherPins = filterparkingPins.filter(function (it) {
        if (filterWasher.checked) {
          return it.offer.features.includes(filterWasher.value);
        }
        return it;
      });

      var filterelevatorPins = filterwasherPins.filter(function (it) {
        if (filterElevator.checked) {
          return it.offer.features.includes(filterElevator.value);
        }
        return it;
      });


      var filterConditionerPins = filterelevatorPins.filter(function (it) {
        if (filterConditioner.checked) {
          return it.offer.features.includes(filterConditioner.value);
        }
        return it;
      });

      window.map.renderPins(filterConditionerPins.slice(0, MAX_PINS));

    };

    window.form.formFilters.addEventListener('change', function () {
      window.card.cardCopy.remove();
      window.form.deletePins();
      updatePins(data);
    });
  };

  window.backend.load('https://javascript.pages.academy/keksobooking/data', filterPins, window.backend.errorHandler);
})();

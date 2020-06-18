'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  formFilters.classList.add('ad-form--disabled');
  var formFieldsets = document.querySelectorAll('.ad-form__element');

  var setDisabled = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  setDisabled();

  var removeDisabled = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled', 'disabled');
    }
  };

  var form = document.querySelector('.ad-form');

  var mainPin = document.querySelector('.map__pin--main');

  var adressInput = document.querySelector('#address');

  var activatePage = function () {
    adressInput.value = mainPin.offsetLeft + ' ' + mainPin.offsetTop;
    window.map.renderPins();
    window.map.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    formFilters.classList.remove('ad-form--disabled');
    removeDisabled();
  };


  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      activatePage();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activatePage();
    }
  });

  // валидация количества гостей и комнат

  var roomNum = document.querySelector('#room_number');
  var guestNum = document.querySelector('#capacity');

  var getRoomValidated = function () {
    if (roomNum.value === '100') {
      roomNum.setCustomValidity('Это предложение не для гостей');
    } else if (roomNum.value < guestNum.value) {
      roomNum.setCustomValidity('Недостаточно места для выбранного количества гостей');
    } else if (roomNum.value > guestNum.value) {
      roomNum.setCustomValidity('Это предложение для большего числа гостей');
    } else {
      roomNum.setCustomValidity('');
    }
  };

  roomNum.addEventListener('change', function () {
    getRoomValidated();
  });

  guestNum.addEventListener('change', function () {
    getRoomValidated();
  });
})();

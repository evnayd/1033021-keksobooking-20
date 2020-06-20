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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var activatePage = function () {
    adressInput.value = mainPin.offsetLeft + ' ' + mainPin.offsetTop;
    window.backend.load('https://javascript.pages.academy/keksobooking/data', window.map.renderPins, errorHandler);
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

  // валидация заголовка объявления
  var adTitle = document.querySelector('#title');

  var getadTitleValidated = function () {
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Заголовок слишком короткий. Минимум: 30 символов.');
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity('Заголовок слишком длинный. Максимум: 100 символов.');
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Обязательное поле');
    } else {
      adTitle.setCustomValidity('');
    }
  };

  adTitle.addEventListener('change', function () {
    getadTitleValidated();
  });

  // валидация время заезда и выезда
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var getTimeEqual = function (n1, n2) {
    n2.value = n1.value;
  };

  timeIn.addEventListener('change', function () {
    getTimeEqual(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    getTimeEqual(timeOut, timeIn);
  });

  // валидация минимальной цены

  var typeOfPlace = form.querySelector('#type');
  var price = form.querySelector('#price');

  var getadPriceValidated = function () {
    if (typeOfPlace.value === 'flat') {
      price.min = '1000';
    } else if (typeOfPlace.value === 'house') {
      price.min = '5000';
    } else if (typeOfPlace.value === 'palace') {
      price.min = '10000';
    } else {
      price.min = '0';
    }
  };

  typeOfPlace.addEventListener('change', function () {
    getadPriceValidated();
    price.placeholder = price.min;
  });

  price.addEventListener('invalid', function () {
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Минимальная цена для данного типа жилья: ' + price.min);
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Максимальная цена: ' + price.max);
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  });

})();


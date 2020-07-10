'use strict';

(function () {
  var ESCAPE_KEY = 27;
  var LEFT_BUTTON = 0;

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
    adressInput.setAttribute('readonly', 'readonly');
    adressInput.value = mainPin.offsetLeft + ' ' + mainPin.offsetTop;
    window.backend.load('https://javascript.pages.academy/keksobooking/data', window.map.renderPins, window.backend.errorHandler);
    window.map.map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    formFilters.classList.remove('ad-form--disabled');
    removeDisabled();
  };

  var deletePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }
  };

  var deactivationPage = function () {
    deletePins();
    form.reset();
    adressInput.value = mainPin.offsetLeft + ' ' + mainPin.offsetTop;
    setDisabled();
    window.map.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    formFilters.classList.add('ad-form--disabled');
  };


  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_BUTTON) {
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

  getRoomValidated();

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

  // валидация времени заезда и выезда
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var getTimeEqual = function (checkInTime, checkoutTime) {
    checkoutTime.value = checkInTime.value;
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
    price.max = '1000000';
  };

  typeOfPlace.addEventListener('change', function () {
    getadPriceValidated();
    price.placeholder = price.min;
  });

  price.addEventListener('change', function () {
    getadPriceValidated();
  });

  price.addEventListener('invalid', function () {
    if (price.validity.rangeOverflow) {
      price.setCustomValidity('Максимальная цена: ' + price.max);
    } else if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Минимальная цена для данного типа жилья: ' + price.min);
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  });

  // отрисовываются сообщения об успехе и об ошибке
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var successPopup = successTemplate.cloneNode(true);
  var errorPopup = errorTemplate.cloneNode(true);

  var showSuccessMessage = function () {
    main.appendChild(successPopup);
  };

  successPopup.addEventListener('click', function () {
    successPopup.style.display = 'none';

  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE_KEY) {
      successPopup.style.display = 'none';
      errorPopup.style.display = 'none';
    }
  });


  var showErrorMessage = function (errorMessage) {
    var message = errorPopup.querySelector('.error__message');
    message.textContent = errorMessage;
    main.appendChild(errorPopup);
  };

  errorPopup.addEventListener('click', function () {
    errorPopup.style.display = 'none';
  });

  var errorBtn = errorPopup.querySelector('.error__button');
  errorBtn.addEventListener('click', function () {
    errorPopup.style.display = 'none';
  });

  var resetBtn = form.querySelector('.ad-form__reset');
  resetBtn.addEventListener('click', function () {
    form.reset();
    adressInput.value = mainPin.offsetLeft + ' ' + mainPin.offsetTop;
  });

  // форма отправляется

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), showSuccessMessage, showErrorMessage);
    deactivationPage();
  });

  window.form = {
    deactivationPage: deactivationPage,
    activatePage: activatePage,
    ESCAPE_KEY: ESCAPE_KEY,
    mainPin: mainPin,
    formFilters: formFilters,
    deletePins: deletePins
  };
})();


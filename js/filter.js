'use strict';

(function () {

  var offerType = document.querySelector('#housing-type');


  var pins = [];
  var successHandler = function (data) {
    pins = data;

    var updatePins = function () {
      var sameTypepins = pins.filter(function (it) {
        return it.offer.type === offerType.value;
      });
      window.map.renderPins(sameTypepins);
    };

    window.form.formFilters.addEventListener('change', function () {
      window.form.deletePins();
      updatePins();
    });
  };

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

  window.backend.load('https://javascript.pages.academy/keksobooking/data', successHandler, errorHandler);
})();


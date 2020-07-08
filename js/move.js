'use strict';

(function () {
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 0;
  var MAX_X = window.map.field.offsetWidth;
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 82;

  window.form.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.form.mainPin.offsetLeft - shift.x < MIN_X - (PIN_WIDTH / 2)) {
        window.form.mainPin.style.left = MIN_X - (PIN_WIDTH / 2) + 'px';
      } else if (window.form.mainPin.offsetLeft - shift.x > MAX_X - (PIN_WIDTH / 2)) {
        window.form.mainPin.style.left = MAX_X - (PIN_WIDTH / 2) + 'px';
      } else {
        window.form.mainPin.style.left = (window.form.mainPin.offsetLeft - shift.x) + 'px';
      }

      if (window.form.mainPin.offsetTop - shift.y < MIN_Y - PIN_HEIGHT) {
        window.form.mainPin.style.top = MIN_Y - PIN_HEIGHT + 'px';
      } else if (window.form.mainPin.offsetTop - shift.y > MAX_Y - PIN_HEIGHT) {
        window.form.mainPin.style.top = MAX_Y - PIN_HEIGHT + 'px';
      } else {
        window.form.mainPin.style.top = (window.form.mainPin.offsetTop - shift.y) + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      window.form.mainPin.style.top = (window.form.mainPin.offsetTop - shift.y) + 'px';
      window.form.mainPin.style.left = (window.form.mainPin.offsetLeft - shift.x) + 'px';

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

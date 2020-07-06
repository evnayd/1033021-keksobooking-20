'use strict';

(function () {
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
      if (moveEvt.clientX < window.map.field.offsetWidth && moveEvt.clientY < window.map.field.offsetHeight) {
        window.form.mainPin.style.top = (window.form.mainPin.offsetTop - shift.y) + 'px';
        window.form.mainPin.style.left = (window.form.mainPin.offsetLeft - shift.x) + 'px';
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
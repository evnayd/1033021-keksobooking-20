/* 'use strict';

(function () {
  // var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
    xhr.send();
  };
})();*/

'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.send();
  };
})();


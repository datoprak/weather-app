/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers.js":
/*!****************************!*\
  !*** ./src/controllers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAPIData": () => (/* binding */ getAPIData)
/* harmony export */ });
const getAPIData = async searchedCity => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric`;
  const url2 =
    "https://api.openweathermap.org/data/2.5/weather?q=london&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric";
  const response = await fetch(url2);
  const data = await response.json();
  console.log(data);

  const lon = data.coord.lon;
  const lat = data.coord.lat;

  const dailyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric`;
  const dailyResponse = await fetch(dailyUrl);
  const dailyData = await dailyResponse.json();
  const daily = dailyData.daily;
  const current = dailyData.current;
  console.log(current);
  //daily.shift();

  processData(data, daily);
};

const processData = (data, daily) => {
  const city = data.name;
  const temp = data.main.temp;
  const feel = data.main.feels_like;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const main = data.weather[0].main;
  const windSpeed = data.wind.speed;
  const windDirection = data.wind.deg;
  const cloud = data.clouds.all;

  console.log(daily);
  const requiredDailyData = [];
  daily.forEach(day => {
    let obj = {};
    const temp = day.temp.day;
    const feel = day.feels_like.day;
    const humidity = day.humidity;
    const description = day.weather[0].description;
    const icon = day.weather[0].icon;
    const main = day.weather[0].main;
    const windSpeed = day.wind_speed;
    const windDirection = day.wind_deg;
    const cloud = day.clouds;
    obj = {
      temp,
      feel,
      humidity,
      description,
      icon,
      main,
      windSpeed,
      windDirection,
      cloud,
    };
    requiredDailyData.push(obj);
  });

  const requiredData = {
    city,
    temp,
    feel,
    humidity,
    description,
    icon,
    main,
    windSpeed,
    windDirection,
    cloud,
    requiredDailyData,
  };
  console.log(requiredData);
};




/***/ }),

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCity": () => (/* binding */ getCity)
/* harmony export */ });
/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers */ "./src/controllers.js");


const getCity = e => {
  e.preventDefault();
  const searchbar = document.querySelector("#searchbar");
  const searchedCity = searchbar.value;
  console.log(searchedCity);
  (0,_controllers__WEBPACK_IMPORTED_MODULE_0__.getAPIData)(searchedCity);
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface */ "./src/interface.js");


const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", _interface__WEBPACK_IMPORTED_MODULE_0__.getCity);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsbUVBQW1FLGFBQWE7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLElBQUksT0FBTyxJQUFJO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzQjs7Ozs7Ozs7Ozs7Ozs7OztBQzdFcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx3REFBVTtBQUNaO0FBQ0E7QUFDbUI7Ozs7Ozs7VUNWbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zQztBQUN0QztBQUNBO0FBQ0EsdUNBQXVDLCtDQUFPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0QVBJRGF0YSA9IGFzeW5jIHNlYXJjaGVkQ2l0eSA9PiB7XHJcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtzZWFyY2hlZENpdHl9JmFwcGlkPTA5YjM4MDRjMGVhYmZjNDhhMDc5ZjE4ZWFlYmM1M2I5JnVuaXRzPW1ldHJpY2A7XHJcbiAgY29uc3QgdXJsMiA9XHJcbiAgICBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9bG9uZG9uJmFwcGlkPTA5YjM4MDRjMGVhYmZjNDhhMDc5ZjE4ZWFlYmM1M2I5JnVuaXRzPW1ldHJpY1wiO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsMik7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgY29uc3QgbG9uID0gZGF0YS5jb29yZC5sb247XHJcbiAgY29uc3QgbGF0ID0gZGF0YS5jb29yZC5sYXQ7XHJcblxyXG4gIGNvbnN0IGRhaWx5VXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmYXBwaWQ9MDliMzgwNGMwZWFiZmM0OGEwNzlmMThlYWViYzUzYjkmdW5pdHM9bWV0cmljYDtcclxuICBjb25zdCBkYWlseVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZGFpbHlVcmwpO1xyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IGF3YWl0IGRhaWx5UmVzcG9uc2UuanNvbigpO1xyXG4gIGNvbnN0IGRhaWx5ID0gZGFpbHlEYXRhLmRhaWx5O1xyXG4gIGNvbnN0IGN1cnJlbnQgPSBkYWlseURhdGEuY3VycmVudDtcclxuICBjb25zb2xlLmxvZyhjdXJyZW50KTtcclxuICAvL2RhaWx5LnNoaWZ0KCk7XHJcblxyXG4gIHByb2Nlc3NEYXRhKGRhdGEsIGRhaWx5KTtcclxufTtcclxuXHJcbmNvbnN0IHByb2Nlc3NEYXRhID0gKGRhdGEsIGRhaWx5KSA9PiB7XHJcbiAgY29uc3QgY2l0eSA9IGRhdGEubmFtZTtcclxuICBjb25zdCB0ZW1wID0gZGF0YS5tYWluLnRlbXA7XHJcbiAgY29uc3QgZmVlbCA9IGRhdGEubWFpbi5mZWVsc19saWtlO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gZGF0YS5tYWluLmh1bWlkaXR5O1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gIGNvbnN0IGljb24gPSBkYXRhLndlYXRoZXJbMF0uaWNvbjtcclxuICBjb25zdCBtYWluID0gZGF0YS53ZWF0aGVyWzBdLm1haW47XHJcbiAgY29uc3Qgd2luZFNwZWVkID0gZGF0YS53aW5kLnNwZWVkO1xyXG4gIGNvbnN0IHdpbmREaXJlY3Rpb24gPSBkYXRhLndpbmQuZGVnO1xyXG4gIGNvbnN0IGNsb3VkID0gZGF0YS5jbG91ZHMuYWxsO1xyXG5cclxuICBjb25zb2xlLmxvZyhkYWlseSk7XHJcbiAgY29uc3QgcmVxdWlyZWREYWlseURhdGEgPSBbXTtcclxuICBkYWlseS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBjb25zdCB0ZW1wID0gZGF5LnRlbXAuZGF5O1xyXG4gICAgY29uc3QgZmVlbCA9IGRheS5mZWVsc19saWtlLmRheTtcclxuICAgIGNvbnN0IGh1bWlkaXR5ID0gZGF5Lmh1bWlkaXR5O1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkYXkud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcclxuICAgIGNvbnN0IGljb24gPSBkYXkud2VhdGhlclswXS5pY29uO1xyXG4gICAgY29uc3QgbWFpbiA9IGRheS53ZWF0aGVyWzBdLm1haW47XHJcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBkYXkud2luZF9zcGVlZDtcclxuICAgIGNvbnN0IHdpbmREaXJlY3Rpb24gPSBkYXkud2luZF9kZWc7XHJcbiAgICBjb25zdCBjbG91ZCA9IGRheS5jbG91ZHM7XHJcbiAgICBvYmogPSB7XHJcbiAgICAgIHRlbXAsXHJcbiAgICAgIGZlZWwsXHJcbiAgICAgIGh1bWlkaXR5LFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgaWNvbixcclxuICAgICAgbWFpbixcclxuICAgICAgd2luZFNwZWVkLFxyXG4gICAgICB3aW5kRGlyZWN0aW9uLFxyXG4gICAgICBjbG91ZCxcclxuICAgIH07XHJcbiAgICByZXF1aXJlZERhaWx5RGF0YS5wdXNoKG9iaik7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlcXVpcmVkRGF0YSA9IHtcclxuICAgIGNpdHksXHJcbiAgICB0ZW1wLFxyXG4gICAgZmVlbCxcclxuICAgIGh1bWlkaXR5LFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpY29uLFxyXG4gICAgbWFpbixcclxuICAgIHdpbmRTcGVlZCxcclxuICAgIHdpbmREaXJlY3Rpb24sXHJcbiAgICBjbG91ZCxcclxuICAgIHJlcXVpcmVkRGFpbHlEYXRhLFxyXG4gIH07XHJcbiAgY29uc29sZS5sb2cocmVxdWlyZWREYXRhKTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGdldEFQSURhdGEgfTtcclxuIiwiaW1wb3J0IHsgZ2V0QVBJRGF0YSB9IGZyb20gXCIuL2NvbnRyb2xsZXJzXCI7XHJcblxyXG5jb25zdCBnZXRDaXR5ID0gZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGNvbnN0IHNlYXJjaGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoYmFyXCIpO1xyXG4gIGNvbnN0IHNlYXJjaGVkQ2l0eSA9IHNlYXJjaGJhci52YWx1ZTtcclxuICBjb25zb2xlLmxvZyhzZWFyY2hlZENpdHkpO1xyXG4gIGdldEFQSURhdGEoc2VhcmNoZWRDaXR5KTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGdldENpdHkgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRDaXR5IH0gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1idXR0b25cIik7XHJcbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0Q2l0eSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
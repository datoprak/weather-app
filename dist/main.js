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
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=1&appid=09b3804c0eabfc48a079f18eaebc53b9`;
  const url2 =
    "https://api.openweathermap.org/geo/1.0/direct?q=london&limit=1&appid=09b3804c0eabfc48a079f18eaebc53b9";
  const response = await fetch(geoUrl);
  const data = await response.json();

  const lon = data[0].lon;
  const lat = data[0].lat;
  const name = data[0].name;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  const requiredData = processData(name, weatherData);
  return requiredData;
};

const processData = (name, weatherData) => {
  const city = name;
  const current = weatherData.current;
  const daily = weatherData.daily;

  const unixTimeStamp = current.dt;
  const date = new Date(unixTimeStamp * 1000);
  const temp = current.temp;
  const humidity = current.humidity;
  const description = current.weather[0].description;
  const icon = current.weather[0].icon;
  const main = current.weather[0].main;
  const windSpeed = current.wind_speed;
  const windDirection = current.wind_deg;
  const cloud = current.clouds;

  const dailyData = [];
  daily.forEach(day => {
    let obj = {};
    const unixTimeStamp = day.dt;
    const date = new Date(unixTimeStamp * 1000);
    const temp = day.temp.day;
    const nightTemp = day.temp.night;
    const pop = day.pop;
    const humidity = day.humidity;
    const description = day.weather[0].description;
    const icon = day.weather[0].icon;
    const main = day.weather[0].main;
    const windSpeed = day.wind_speed;
    const windDirection = day.wind_deg;
    const cloud = day.clouds;
    obj = {
      date,
      temp,
      nightTemp,
      pop,
      humidity,
      description,
      icon,
      main,
      windSpeed,
      windDirection,
      cloud,
    };
    dailyData.push(obj);
  });

  const requiredData = {
    city,
    date,
    temp,
    humidity,
    description,
    icon,
    main,
    windSpeed,
    windDirection,
    cloud,
    dailyData,
  };
  console.log(requiredData);
  return requiredData;
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
  if (e === "london") {
    const requiredData = (0,_controllers__WEBPACK_IMPORTED_MODULE_0__.getAPIData)("london");
    requiredData.then(data => {
      console.log(data);
      loadInterface(data);
      loadDaily(data);
    });
  } else {
    e.preventDefault();
    const searchbar = document.querySelector("#searchbar");
    const searchedCity = searchbar.value;
    console.log(searchedCity);
    const requiredData = (0,_controllers__WEBPACK_IMPORTED_MODULE_0__.getAPIData)(searchedCity);
    requiredData.then(data => {
      console.log(data);
      loadInterface(data);
      loadDaily(data);
    });
  }
};

const loadInterface = data => {
  const cityName = document.querySelector(".city-name");
  cityName.textContent = data.city;
  const currentIcon = document.querySelector(".current-icon");
  currentIcon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  currentIcon.alt = "Weather icon";
  const temp = document.querySelector(".temp");
  temp.textContent = Math.round(data.temp);
  const dayName = document.querySelector(".day-name");
  dayName.textContent = data.date.toLocaleDateString("en-EN", {
    weekday: "long",
  });
  const description = document.querySelector(".desc");
  description.textContent =
    data.description.charAt(0).toUpperCase() + data.description.slice(1);
  const precipitation = document.querySelector(".precipitation");
  precipitation.textContent = `Precipitation: ${data.dailyData[0].pop * 100}%`;
  const humidity = document.querySelector(".humidity");
  humidity.textContent = `Humidity: ${data.humidity}%`;
  const wind = document.querySelector(".wind");
  if (data.windDirection < 45) {
    wind.textContent = `Wind: ${data.windSpeed} km/h ↑`;
  } else if (data.windDirection >= 45 && data.windDirection < 90) {
    wind.textContent = `Wind: ${data.windSpeed} km/h ↗`;
  } else if (data.windDirection >= 90 && data.windDirection < 135) {
    wind.textContent = `Wind: ${data.windSpeed} km/h →`;
  } else if (data.windDirection >= 135 && data.windDirection < 180) {
    wind.textContent = `Wind: ${data.windSpeed} km/h ↘`;
  } else if (data.windDirection >= 180 && data.windDirection < 225) {
    wind.textContent = `Wind: ${data.windSpeed} km/h ↓`;
  } else if (data.windDirection >= 225 && data.windDirection < 270) {
    wind.textContent = `Wind: ${data.windSpeed} km/h ↙`;
  } else if (data.windDirection >= 270 && data.windDirection < 315) {
    wind.textContent = `Wind: ${data.windSpeed} km/h ←`;
  } else if (data.windDirection >= 315) {
    wind.textContent = `Wind: ${data.windSpeed} km/h ↖`;
  }
};

const loadDaily = data => {
  const dailyData = data.dailyData;
  dailyData.forEach(day => {
    const dailyBox = document.createElement("div");
    dailyBox.classList.add("daily-box");
    const dayName = document.createElement("div");
    dayName.classList.add("short-day-name");
    dayName.textContent = day.date.toLocaleDateString("en-EN", {
      weekday: "short",
    });
    const weatherIcon = document.createElement("img");
    weatherIcon.classList.add("weather-icon");
    weatherIcon.src = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
    weatherIcon.alt = "Weather icon";
    const twoTemp = document.createElement("div");
    twoTemp.classList.add("two-temp");
    twoTemp.textContent = `${day.temp}° ${day.nightTemp}°`;
    dailyBox.appendChild(dayName);
    dailyBox.appendChild(weatherIcon);
    dailyBox.appendChild(twoTemp);
    const dailySide = document.querySelector(".daily-side");
    dailySide.appendChild(dailyBox);
  });
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


const london = (0,_interface__WEBPACK_IMPORTED_MODULE_0__.getCity)("london");
window.onload = london;

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", _interface__WEBPACK_IMPORTED_MODULE_0__.getCity);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0Esb0VBQW9FLGFBQWE7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLElBQUksT0FBTyxJQUFJO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDc0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRnFCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix3REFBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsd0RBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsVUFBVTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsNEJBQTRCO0FBQzVFO0FBQ0Esc0NBQXNDLGNBQWM7QUFDcEQ7QUFDQTtBQUNBLGdDQUFnQyxnQkFBZ0I7QUFDaEQsSUFBSTtBQUNKLGdDQUFnQyxnQkFBZ0I7QUFDaEQsSUFBSTtBQUNKLGdDQUFnQyxnQkFBZ0I7QUFDaEQsSUFBSTtBQUNKLGdDQUFnQyxnQkFBZ0I7QUFDaEQsSUFBSTtBQUNKLGdDQUFnQyxnQkFBZ0I7QUFDaEQsSUFBSTtBQUNKLGdDQUFnQyxnQkFBZ0I7QUFDaEQsSUFBSTtBQUNKLGdDQUFnQyxnQkFBZ0I7QUFDaEQsSUFBSTtBQUNKLGdDQUFnQyxnQkFBZ0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSwyREFBMkQsU0FBUztBQUNwRTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsU0FBUyxJQUFJLGNBQWM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ21COzs7Ozs7O1VDeEZuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ3RDO0FBQ0EsZUFBZSxtREFBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0NBQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250cm9sbGVycy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXRBUElEYXRhID0gYXN5bmMgc2VhcmNoZWRDaXR5ID0+IHtcclxuICBjb25zdCBnZW9VcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtzZWFyY2hlZENpdHl9JmxpbWl0PTEmYXBwaWQ9MDliMzgwNGMwZWFiZmM0OGEwNzlmMThlYWViYzUzYjlgO1xyXG4gIGNvbnN0IHVybDIgPVxyXG4gICAgXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT1sb25kb24mbGltaXQ9MSZhcHBpZD0wOWIzODA0YzBlYWJmYzQ4YTA3OWYxOGVhZWJjNTNiOVwiO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2VvVXJsKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICBjb25zdCBsb24gPSBkYXRhWzBdLmxvbjtcclxuICBjb25zdCBsYXQgPSBkYXRhWzBdLmxhdDtcclxuICBjb25zdCBuYW1lID0gZGF0YVswXS5uYW1lO1xyXG5cclxuICBjb25zdCB3ZWF0aGVyVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmYXBwaWQ9MDliMzgwNGMwZWFiZmM0OGEwNzlmMThlYWViYzUzYjkmdW5pdHM9bWV0cmljYDtcclxuICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh3ZWF0aGVyVXJsKTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XHJcblxyXG4gIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcclxuXHJcbiAgY29uc3QgcmVxdWlyZWREYXRhID0gcHJvY2Vzc0RhdGEobmFtZSwgd2VhdGhlckRhdGEpO1xyXG4gIHJldHVybiByZXF1aXJlZERhdGE7XHJcbn07XHJcblxyXG5jb25zdCBwcm9jZXNzRGF0YSA9IChuYW1lLCB3ZWF0aGVyRGF0YSkgPT4ge1xyXG4gIGNvbnN0IGNpdHkgPSBuYW1lO1xyXG4gIGNvbnN0IGN1cnJlbnQgPSB3ZWF0aGVyRGF0YS5jdXJyZW50O1xyXG4gIGNvbnN0IGRhaWx5ID0gd2VhdGhlckRhdGEuZGFpbHk7XHJcblxyXG4gIGNvbnN0IHVuaXhUaW1lU3RhbXAgPSBjdXJyZW50LmR0O1xyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZVN0YW1wICogMTAwMCk7XHJcbiAgY29uc3QgdGVtcCA9IGN1cnJlbnQudGVtcDtcclxuICBjb25zdCBodW1pZGl0eSA9IGN1cnJlbnQuaHVtaWRpdHk7XHJcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBjdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgY29uc3QgaWNvbiA9IGN1cnJlbnQud2VhdGhlclswXS5pY29uO1xyXG4gIGNvbnN0IG1haW4gPSBjdXJyZW50LndlYXRoZXJbMF0ubWFpbjtcclxuICBjb25zdCB3aW5kU3BlZWQgPSBjdXJyZW50LndpbmRfc3BlZWQ7XHJcbiAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGN1cnJlbnQud2luZF9kZWc7XHJcbiAgY29uc3QgY2xvdWQgPSBjdXJyZW50LmNsb3VkcztcclxuXHJcbiAgY29uc3QgZGFpbHlEYXRhID0gW107XHJcbiAgZGFpbHkuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgY29uc3QgdW5peFRpbWVTdGFtcCA9IGRheS5kdDtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZVN0YW1wICogMTAwMCk7XHJcbiAgICBjb25zdCB0ZW1wID0gZGF5LnRlbXAuZGF5O1xyXG4gICAgY29uc3QgbmlnaHRUZW1wID0gZGF5LnRlbXAubmlnaHQ7XHJcbiAgICBjb25zdCBwb3AgPSBkYXkucG9wO1xyXG4gICAgY29uc3QgaHVtaWRpdHkgPSBkYXkuaHVtaWRpdHk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRheS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgY29uc3QgaWNvbiA9IGRheS53ZWF0aGVyWzBdLmljb247XHJcbiAgICBjb25zdCBtYWluID0gZGF5LndlYXRoZXJbMF0ubWFpbjtcclxuICAgIGNvbnN0IHdpbmRTcGVlZCA9IGRheS53aW5kX3NwZWVkO1xyXG4gICAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGRheS53aW5kX2RlZztcclxuICAgIGNvbnN0IGNsb3VkID0gZGF5LmNsb3VkcztcclxuICAgIG9iaiA9IHtcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGVtcCxcclxuICAgICAgbmlnaHRUZW1wLFxyXG4gICAgICBwb3AsXHJcbiAgICAgIGh1bWlkaXR5LFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgaWNvbixcclxuICAgICAgbWFpbixcclxuICAgICAgd2luZFNwZWVkLFxyXG4gICAgICB3aW5kRGlyZWN0aW9uLFxyXG4gICAgICBjbG91ZCxcclxuICAgIH07XHJcbiAgICBkYWlseURhdGEucHVzaChvYmopO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXF1aXJlZERhdGEgPSB7XHJcbiAgICBjaXR5LFxyXG4gICAgZGF0ZSxcclxuICAgIHRlbXAsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgaWNvbixcclxuICAgIG1haW4sXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICB3aW5kRGlyZWN0aW9uLFxyXG4gICAgY2xvdWQsXHJcbiAgICBkYWlseURhdGEsXHJcbiAgfTtcclxuICBjb25zb2xlLmxvZyhyZXF1aXJlZERhdGEpO1xyXG4gIHJldHVybiByZXF1aXJlZERhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgeyBnZXRBUElEYXRhIH07XHJcbiIsImltcG9ydCB7IGdldEFQSURhdGEgfSBmcm9tIFwiLi9jb250cm9sbGVyc1wiO1xyXG5cclxuY29uc3QgZ2V0Q2l0eSA9IGUgPT4ge1xyXG4gIGlmIChlID09PSBcImxvbmRvblwiKSB7XHJcbiAgICBjb25zdCByZXF1aXJlZERhdGEgPSBnZXRBUElEYXRhKFwibG9uZG9uXCIpO1xyXG4gICAgcmVxdWlyZWREYXRhLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICBsb2FkSW50ZXJmYWNlKGRhdGEpO1xyXG4gICAgICBsb2FkRGFpbHkoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3Qgc2VhcmNoYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hiYXJcIik7XHJcbiAgICBjb25zdCBzZWFyY2hlZENpdHkgPSBzZWFyY2hiYXIudmFsdWU7XHJcbiAgICBjb25zb2xlLmxvZyhzZWFyY2hlZENpdHkpO1xyXG4gICAgY29uc3QgcmVxdWlyZWREYXRhID0gZ2V0QVBJRGF0YShzZWFyY2hlZENpdHkpO1xyXG4gICAgcmVxdWlyZWREYXRhLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICBsb2FkSW50ZXJmYWNlKGRhdGEpO1xyXG4gICAgICBsb2FkRGFpbHkoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2FkSW50ZXJmYWNlID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKTtcclxuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGRhdGEuY2l0eTtcclxuICBjb25zdCBjdXJyZW50SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1pY29uXCIpO1xyXG4gIGN1cnJlbnRJY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDJ4LnBuZ2A7XHJcbiAgY3VycmVudEljb24uYWx0ID0gXCJXZWF0aGVyIGljb25cIjtcclxuICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wXCIpO1xyXG4gIHRlbXAudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKGRhdGEudGVtcCk7XHJcbiAgY29uc3QgZGF5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF5LW5hbWVcIik7XHJcbiAgZGF5TmFtZS50ZXh0Q29udGVudCA9IGRhdGEuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICB3ZWVrZGF5OiBcImxvbmdcIixcclxuICB9KTtcclxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY1wiKTtcclxuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9XHJcbiAgICBkYXRhLmRlc2NyaXB0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZGF0YS5kZXNjcmlwdGlvbi5zbGljZSgxKTtcclxuICBjb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVjaXBpdGF0aW9uXCIpO1xyXG4gIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgUHJlY2lwaXRhdGlvbjogJHtkYXRhLmRhaWx5RGF0YVswXS5wb3AgKiAxMDB9JWA7XHJcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5XCIpO1xyXG4gIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke2RhdGEuaHVtaWRpdHl9JWA7XHJcbiAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcclxuICBpZiAoZGF0YS53aW5kRGlyZWN0aW9uIDwgNDUpIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpFgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDQ1ICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDkwKSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaXYDtcclxuICB9IGVsc2UgaWYgKGRhdGEud2luZERpcmVjdGlvbiA+PSA5MCAmJiBkYXRhLndpbmREaXJlY3Rpb24gPCAxMzUpIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpJgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDEzNSAmJiBkYXRhLndpbmREaXJlY3Rpb24gPCAxODApIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihphgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDE4MCAmJiBkYXRhLndpbmREaXJlY3Rpb24gPCAyMjUpIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpNgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDIyNSAmJiBkYXRhLndpbmREaXJlY3Rpb24gPCAyNzApIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihplgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDI3MCAmJiBkYXRhLndpbmREaXJlY3Rpb24gPCAzMTUpIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpBgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDMxNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGlmA7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9hZERhaWx5ID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgZGFpbHlEYXRhID0gZGF0YS5kYWlseURhdGE7XHJcbiAgZGFpbHlEYXRhLmZvckVhY2goZGF5ID0+IHtcclxuICAgIGNvbnN0IGRhaWx5Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRhaWx5Qm94LmNsYXNzTGlzdC5hZGQoXCJkYWlseS1ib3hcIik7XHJcbiAgICBjb25zdCBkYXlOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRheU5hbWUuY2xhc3NMaXN0LmFkZChcInNob3J0LWRheS1uYW1lXCIpO1xyXG4gICAgZGF5TmFtZS50ZXh0Q29udGVudCA9IGRheS5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLUVOXCIsIHtcclxuICAgICAgd2Vla2RheTogXCJzaG9ydFwiLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1pY29uXCIpO1xyXG4gICAgd2VhdGhlckljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RheS5pY29ufUAyeC5wbmdgO1xyXG4gICAgd2VhdGhlckljb24uYWx0ID0gXCJXZWF0aGVyIGljb25cIjtcclxuICAgIGNvbnN0IHR3b1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdHdvVGVtcC5jbGFzc0xpc3QuYWRkKFwidHdvLXRlbXBcIik7XHJcbiAgICB0d29UZW1wLnRleHRDb250ZW50ID0gYCR7ZGF5LnRlbXB9wrAgJHtkYXkubmlnaHRUZW1wfcKwYDtcclxuICAgIGRhaWx5Qm94LmFwcGVuZENoaWxkKGRheU5hbWUpO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQod2VhdGhlckljb24pO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQodHdvVGVtcCk7XHJcbiAgICBjb25zdCBkYWlseVNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhaWx5LXNpZGVcIik7XHJcbiAgICBkYWlseVNpZGUuYXBwZW5kQ2hpbGQoZGFpbHlCb3gpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2V0Q2l0eSB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdldENpdHkgfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IGxvbmRvbiA9IGdldENpdHkoXCJsb25kb25cIik7XHJcbndpbmRvdy5vbmxvYWQgPSBsb25kb247XHJcblxyXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1idXR0b25cIik7XHJcbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0Q2l0eSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
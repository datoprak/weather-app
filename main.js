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
/* harmony export */   "changeSystem": () => (/* binding */ changeSystem),
/* harmony export */   "getCity": () => (/* binding */ getCity)
/* harmony export */ });
/* harmony import */ var _controllers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers */ "./src/controllers.js");


const getCity = e => {
  if (e === "london") {
    const requiredData = (0,_controllers__WEBPACK_IMPORTED_MODULE_0__.getAPIData)("london");
    requiredData.then(data => {
      console.log(data);
      loadInterface(data);
      createDaily(data);
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
  currentIcon.alt = `${data.description}`;
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

const createDaily = data => {
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
    weatherIcon.alt = `${day.description}`;
    const twoTemp = document.createElement("div");
    twoTemp.classList.add("two-temp");
    const dailyTemp = document.createElement("div");
    dailyTemp.classList.add("daily-temp");
    dailyTemp.textContent = `${Math.round(day.temp)}°`;
    const nightlyTemp = document.createElement("div");
    nightlyTemp.classList.add("night-temp");
    nightlyTemp.textContent = `${Math.round(day.nightTemp)}°`;
    twoTemp.appendChild(dailyTemp);
    twoTemp.appendChild(nightlyTemp);
    dailyBox.appendChild(dayName);
    dailyBox.appendChild(weatherIcon);
    dailyBox.appendChild(twoTemp);
    const dailySide = document.querySelector(".daily-side");
    dailySide.appendChild(dailyBox);
  });
};

const loadDaily = data => {
  const dailyData = data.dailyData;
  dailyData.forEach((day, index) => {
    const dayName = document.querySelectorAll(".short-day-name");
    dayName.forEach((d, i) => {
      if (index === i) {
        d.textContent = day.date.toLocaleDateString("en-EN", {
          weekday: "short",
        });
      }
    });
    const weatherIcon = document.querySelectorAll(".weather-icon");
    weatherIcon.forEach((icon, i) => {
      if (index === i) {
        icon.src = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;
        icon.alt = day.description;
      }
    });
    const dailyTemp = document.querySelectorAll(".daily-temp");
    dailyTemp.forEach((t, i) => {
      if (index === i) {
        t.textContent = `${Math.round(day.temp)}°`;
      }
    });
    const nightlyTemp = document.querySelectorAll(".night-temp");
    nightlyTemp.forEach((t, i) => {
      if (index === i) {
        t.textContent = `${Math.round(day.nightTemp)}°`;
      }
    });
  });
};

const changeSystem = e => {
  const temp = document.querySelector(".temp");
  const wind = document.querySelector(".wind");
  const dailyTemp = document.querySelectorAll(".daily-temp");
  const nightlyTemp = document.querySelectorAll(".night-temp");

  if (e.target.className === "fahrenheit") {
    temp.textContent = `${Math.round(temp.textContent * 1.8 + 32)}`;
    dailyTemp.forEach(t => {
      let f = t.textContent.slice(0, -1) * 1.8 + 32;
      t.textContent = `${Math.round(f)}°`;
    });
    nightlyTemp.forEach(t => {
      console.log(t.textContent);
      let f = t.textContent.slice(0, -1) * 1.8 + 32;
      console.log(f);
      t.textContent = `${Math.round(f)}°`;
    });
    const windArr = wind.textContent.split(" ");
    let windSpeed = windArr[1];
    windSpeed = (windSpeed * 0.621371).toFixed(2);
    wind.textContent = `Wind: ${windSpeed} mph ${windArr[3]}`;
    e.target.classList.add("active");
    const celsius = document.querySelector(".celsius");
    celsius.classList.remove("active");
  } else if (e.target.className === "celsius") {
    temp.textContent = `${Math.round((temp.textContent - 32) / 1.8)}`;
    dailyTemp.forEach(t => {
      let c = (t.textContent.slice(0, -1) - 32) / 1.8;
      t.textContent = `${Math.round(c)}°`;
    });
    nightlyTemp.forEach(t => {
      let c = (t.textContent.slice(0, -1) - 32) / 1.8;
      t.textContent = `${Math.round(c)}°`;
    });
    const windArr = wind.textContent.split(" ");
    let windSpeed = windArr[1];
    windSpeed = (windSpeed * 1.609344).toFixed(2);
    wind.textContent = `Wind: ${windSpeed} km/h ${windArr[3]}`;
    e.target.classList.add("active");
    const fahrenheit = document.querySelector(".fahrenheit");
    fahrenheit.classList.remove("active");
  }
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

const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");
celsius.addEventListener("click", _interface__WEBPACK_IMPORTED_MODULE_0__.changeSystem);
fahrenheit.addEventListener("click", _interface__WEBPACK_IMPORTED_MODULE_0__.changeSystem);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDBCQUEwQiwwQ0FBMEM7QUFDcEU7QUFDQTtBQUNBLHlCQUF5QixjQUFjO0FBQ3ZDLEtBQUs7QUFDTDtBQUNBO0FBQ0EseUJBQXlCLGNBQWM7QUFDdkMsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxXQUFXLE9BQU8sV0FBVztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDaUM7Ozs7Ozs7VUM3S2pDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOb0Q7QUFDcEQ7QUFDQSxlQUFlLG1EQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QywrQ0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msb0RBQVk7QUFDOUMscUNBQXFDLG9EQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0QVBJRGF0YSA9IGFzeW5jIHNlYXJjaGVkQ2l0eSA9PiB7XHJcbiAgY29uc3QgZ2VvVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPSR7c2VhcmNoZWRDaXR5fSZsaW1pdD0xJmFwcGlkPTA5YjM4MDRjMGVhYmZjNDhhMDc5ZjE4ZWFlYmM1M2I5YDtcclxuICBjb25zdCB1cmwyID1cclxuICAgIFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9bG9uZG9uJmxpbWl0PTEmYXBwaWQ9MDliMzgwNGMwZWFiZmM0OGEwNzlmMThlYWViYzUzYjlcIjtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGdlb1VybCk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgY29uc3QgbG9uID0gZGF0YVswXS5sb247XHJcbiAgY29uc3QgbGF0ID0gZGF0YVswXS5sYXQ7XHJcbiAgY29uc3QgbmFtZSA9IGRhdGFbMF0ubmFtZTtcclxuXHJcbiAgY29uc3Qgd2VhdGhlclVybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mZXhjbHVkZT1taW51dGVseSxob3VybHksYWxlcnRzJmFwcGlkPTA5YjM4MDRjMGVhYmZjNDhhMDc5ZjE4ZWFlYmM1M2I5JnVuaXRzPW1ldHJpY2A7XHJcbiAgY29uc3Qgd2VhdGhlclJlc3BvbnNlID0gYXdhaXQgZmV0Y2god2VhdGhlclVybCk7XHJcbiAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyUmVzcG9uc2UuanNvbigpO1xyXG5cclxuICBjb25zb2xlLmxvZyh3ZWF0aGVyRGF0YSk7XHJcblxyXG4gIGNvbnN0IHJlcXVpcmVkRGF0YSA9IHByb2Nlc3NEYXRhKG5hbWUsIHdlYXRoZXJEYXRhKTtcclxuICByZXR1cm4gcmVxdWlyZWREYXRhO1xyXG59O1xyXG5cclxuY29uc3QgcHJvY2Vzc0RhdGEgPSAobmFtZSwgd2VhdGhlckRhdGEpID0+IHtcclxuICBjb25zdCBjaXR5ID0gbmFtZTtcclxuICBjb25zdCBjdXJyZW50ID0gd2VhdGhlckRhdGEuY3VycmVudDtcclxuICBjb25zdCBkYWlseSA9IHdlYXRoZXJEYXRhLmRhaWx5O1xyXG5cclxuICBjb25zdCB1bml4VGltZVN0YW1wID0gY3VycmVudC5kdDtcclxuICBjb25zdCBkYXRlID0gbmV3IERhdGUodW5peFRpbWVTdGFtcCAqIDEwMDApO1xyXG4gIGNvbnN0IHRlbXAgPSBjdXJyZW50LnRlbXA7XHJcbiAgY29uc3QgaHVtaWRpdHkgPSBjdXJyZW50Lmh1bWlkaXR5O1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gIGNvbnN0IGljb24gPSBjdXJyZW50LndlYXRoZXJbMF0uaWNvbjtcclxuICBjb25zdCBtYWluID0gY3VycmVudC53ZWF0aGVyWzBdLm1haW47XHJcbiAgY29uc3Qgd2luZFNwZWVkID0gY3VycmVudC53aW5kX3NwZWVkO1xyXG4gIGNvbnN0IHdpbmREaXJlY3Rpb24gPSBjdXJyZW50LndpbmRfZGVnO1xyXG4gIGNvbnN0IGNsb3VkID0gY3VycmVudC5jbG91ZHM7XHJcblxyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IFtdO1xyXG4gIGRhaWx5LmZvckVhY2goZGF5ID0+IHtcclxuICAgIGxldCBvYmogPSB7fTtcclxuICAgIGNvbnN0IHVuaXhUaW1lU3RhbXAgPSBkYXkuZHQ7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodW5peFRpbWVTdGFtcCAqIDEwMDApO1xyXG4gICAgY29uc3QgdGVtcCA9IGRheS50ZW1wLmRheTtcclxuICAgIGNvbnN0IG5pZ2h0VGVtcCA9IGRheS50ZW1wLm5pZ2h0O1xyXG4gICAgY29uc3QgcG9wID0gZGF5LnBvcDtcclxuICAgIGNvbnN0IGh1bWlkaXR5ID0gZGF5Lmh1bWlkaXR5O1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkYXkud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcclxuICAgIGNvbnN0IGljb24gPSBkYXkud2VhdGhlclswXS5pY29uO1xyXG4gICAgY29uc3QgbWFpbiA9IGRheS53ZWF0aGVyWzBdLm1haW47XHJcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBkYXkud2luZF9zcGVlZDtcclxuICAgIGNvbnN0IHdpbmREaXJlY3Rpb24gPSBkYXkud2luZF9kZWc7XHJcbiAgICBjb25zdCBjbG91ZCA9IGRheS5jbG91ZHM7XHJcbiAgICBvYmogPSB7XHJcbiAgICAgIGRhdGUsXHJcbiAgICAgIHRlbXAsXHJcbiAgICAgIG5pZ2h0VGVtcCxcclxuICAgICAgcG9wLFxyXG4gICAgICBodW1pZGl0eSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIGljb24sXHJcbiAgICAgIG1haW4sXHJcbiAgICAgIHdpbmRTcGVlZCxcclxuICAgICAgd2luZERpcmVjdGlvbixcclxuICAgICAgY2xvdWQsXHJcbiAgICB9O1xyXG4gICAgZGFpbHlEYXRhLnB1c2gob2JqKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVxdWlyZWREYXRhID0ge1xyXG4gICAgY2l0eSxcclxuICAgIGRhdGUsXHJcbiAgICB0ZW1wLFxyXG4gICAgaHVtaWRpdHksXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGljb24sXHJcbiAgICBtYWluLFxyXG4gICAgd2luZFNwZWVkLFxyXG4gICAgd2luZERpcmVjdGlvbixcclxuICAgIGNsb3VkLFxyXG4gICAgZGFpbHlEYXRhLFxyXG4gIH07XHJcbiAgY29uc29sZS5sb2cocmVxdWlyZWREYXRhKTtcclxuICByZXR1cm4gcmVxdWlyZWREYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2V0QVBJRGF0YSB9O1xyXG4iLCJpbXBvcnQgeyBnZXRBUElEYXRhIH0gZnJvbSBcIi4vY29udHJvbGxlcnNcIjtcclxuXHJcbmNvbnN0IGdldENpdHkgPSBlID0+IHtcclxuICBpZiAoZSA9PT0gXCJsb25kb25cIikge1xyXG4gICAgY29uc3QgcmVxdWlyZWREYXRhID0gZ2V0QVBJRGF0YShcImxvbmRvblwiKTtcclxuICAgIHJlcXVpcmVkRGF0YS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgbG9hZEludGVyZmFjZShkYXRhKTtcclxuICAgICAgY3JlYXRlRGFpbHkoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3Qgc2VhcmNoYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hiYXJcIik7XHJcbiAgICBjb25zdCBzZWFyY2hlZENpdHkgPSBzZWFyY2hiYXIudmFsdWU7XHJcbiAgICBjb25zb2xlLmxvZyhzZWFyY2hlZENpdHkpO1xyXG4gICAgY29uc3QgcmVxdWlyZWREYXRhID0gZ2V0QVBJRGF0YShzZWFyY2hlZENpdHkpO1xyXG4gICAgcmVxdWlyZWREYXRhLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICBsb2FkSW50ZXJmYWNlKGRhdGEpO1xyXG4gICAgICBsb2FkRGFpbHkoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2FkSW50ZXJmYWNlID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKTtcclxuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGRhdGEuY2l0eTtcclxuICBjb25zdCBjdXJyZW50SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1pY29uXCIpO1xyXG4gIGN1cnJlbnRJY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDJ4LnBuZ2A7XHJcbiAgY3VycmVudEljb24uYWx0ID0gYCR7ZGF0YS5kZXNjcmlwdGlvbn1gO1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XHJcbiAgdGVtcC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoZGF0YS50ZW1wKTtcclxuICBjb25zdCBkYXlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXktbmFtZVwiKTtcclxuICBkYXlOYW1lLnRleHRDb250ZW50ID0gZGF0YS5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLUVOXCIsIHtcclxuICAgIHdlZWtkYXk6IFwibG9uZ1wiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjXCIpO1xyXG4gIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID1cclxuICAgIGRhdGEuZGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkYXRhLmRlc2NyaXB0aW9uLnNsaWNlKDEpO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWNpcGl0YXRpb25cIik7XHJcbiAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IGBQcmVjaXBpdGF0aW9uOiAke2RhdGEuZGFpbHlEYXRhWzBdLnBvcCAqIDEwMH0lYDtcclxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XHJcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX0lYDtcclxuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG4gIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPCA0NSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkWA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gNDUgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgOTApIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpdgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDkwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDEzNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkmA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMTM1ICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDE4MCkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGmGA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMTgwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDIyNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGk2A7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMjI1ICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDI3MCkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGmWA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMjcwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDMxNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkGA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMzE1KSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaWYDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVEYWlseSA9IGRhdGEgPT4ge1xyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IGRhdGEuZGFpbHlEYXRhO1xyXG4gIGRhaWx5RGF0YS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICBjb25zdCBkYWlseUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYWlseUJveC5jbGFzc0xpc3QuYWRkKFwiZGFpbHktYm94XCIpO1xyXG4gICAgY29uc3QgZGF5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYXlOYW1lLmNsYXNzTGlzdC5hZGQoXCJzaG9ydC1kYXktbmFtZVwiKTtcclxuICAgIGRheU5hbWUudGV4dENvbnRlbnQgPSBkYXkuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICAgIHdlZWtkYXk6IFwic2hvcnRcIixcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaWNvblwiKTtcclxuICAgIHdlYXRoZXJJY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXkuaWNvbn1AMngucG5nYDtcclxuICAgIHdlYXRoZXJJY29uLmFsdCA9IGAke2RheS5kZXNjcmlwdGlvbn1gO1xyXG4gICAgY29uc3QgdHdvVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0d29UZW1wLmNsYXNzTGlzdC5hZGQoXCJ0d28tdGVtcFwiKTtcclxuICAgIGNvbnN0IGRhaWx5VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYWlseVRlbXAuY2xhc3NMaXN0LmFkZChcImRhaWx5LXRlbXBcIik7XHJcbiAgICBkYWlseVRlbXAudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheS50ZW1wKX3CsGA7XHJcbiAgICBjb25zdCBuaWdodGx5VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBuaWdodGx5VGVtcC5jbGFzc0xpc3QuYWRkKFwibmlnaHQtdGVtcFwiKTtcclxuICAgIG5pZ2h0bHlUZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkubmlnaHRUZW1wKX3CsGA7XHJcbiAgICB0d29UZW1wLmFwcGVuZENoaWxkKGRhaWx5VGVtcCk7XHJcbiAgICB0d29UZW1wLmFwcGVuZENoaWxkKG5pZ2h0bHlUZW1wKTtcclxuICAgIGRhaWx5Qm94LmFwcGVuZENoaWxkKGRheU5hbWUpO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQod2VhdGhlckljb24pO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQodHdvVGVtcCk7XHJcbiAgICBjb25zdCBkYWlseVNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhaWx5LXNpZGVcIik7XHJcbiAgICBkYWlseVNpZGUuYXBwZW5kQ2hpbGQoZGFpbHlCb3gpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgbG9hZERhaWx5ID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgZGFpbHlEYXRhID0gZGF0YS5kYWlseURhdGE7XHJcbiAgZGFpbHlEYXRhLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IGRheU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNob3J0LWRheS1uYW1lXCIpO1xyXG4gICAgZGF5TmFtZS5mb3JFYWNoKChkLCBpKSA9PiB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xyXG4gICAgICAgIGQudGV4dENvbnRlbnQgPSBkYXkuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICAgICAgICB3ZWVrZGF5OiBcInNob3J0XCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndlYXRoZXItaWNvblwiKTtcclxuICAgIHdlYXRoZXJJY29uLmZvckVhY2goKGljb24sIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgaWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF5Lmljb259QDJ4LnBuZ2A7XHJcbiAgICAgICAgaWNvbi5hbHQgPSBkYXkuZGVzY3JpcHRpb247XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgZGFpbHlUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYWlseS10ZW1wXCIpO1xyXG4gICAgZGFpbHlUZW1wLmZvckVhY2goKHQsIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5LnRlbXApfcKwYDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuaWdodGx5VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmlnaHQtdGVtcFwiKTtcclxuICAgIG5pZ2h0bHlUZW1wLmZvckVhY2goKHQsIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5Lm5pZ2h0VGVtcCl9wrBgO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGNoYW5nZVN5c3RlbSA9IGUgPT4ge1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XHJcbiAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcclxuICBjb25zdCBkYWlseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRhaWx5LXRlbXBcIik7XHJcbiAgY29uc3QgbmlnaHRseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5pZ2h0LXRlbXBcIik7XHJcblxyXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiZmFocmVuaGVpdFwiKSB7XHJcbiAgICB0ZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh0ZW1wLnRleHRDb250ZW50ICogMS44ICsgMzIpfWA7XHJcbiAgICBkYWlseVRlbXAuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgbGV0IGYgPSB0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAqIDEuOCArIDMyO1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChmKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIG5pZ2h0bHlUZW1wLmZvckVhY2godCA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHQudGV4dENvbnRlbnQpO1xyXG4gICAgICBsZXQgZiA9IHQudGV4dENvbnRlbnQuc2xpY2UoMCwgLTEpICogMS44ICsgMzI7XHJcbiAgICAgIGNvbnNvbGUubG9nKGYpO1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChmKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHdpbmRBcnIgPSB3aW5kLnRleHRDb250ZW50LnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aW5kU3BlZWQgPSB3aW5kQXJyWzFdO1xyXG4gICAgd2luZFNwZWVkID0gKHdpbmRTcGVlZCAqIDAuNjIxMzcxKS50b0ZpeGVkKDIpO1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke3dpbmRTcGVlZH0gbXBoICR7d2luZEFyclszXX1gO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNlbHNpdXNcIik7XHJcbiAgICBjZWxzaXVzLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiY2Vsc2l1c1wiKSB7XHJcbiAgICB0ZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCgodGVtcC50ZXh0Q29udGVudCAtIDMyKSAvIDEuOCl9YDtcclxuICAgIGRhaWx5VGVtcC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICBsZXQgYyA9ICh0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAtIDMyKSAvIDEuODtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoYyl9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBuaWdodGx5VGVtcC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICBsZXQgYyA9ICh0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAtIDMyKSAvIDEuODtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoYyl9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB3aW5kQXJyID0gd2luZC50ZXh0Q29udGVudC5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgd2luZFNwZWVkID0gd2luZEFyclsxXTtcclxuICAgIHdpbmRTcGVlZCA9ICh3aW5kU3BlZWQgKiAxLjYwOTM0NCkudG9GaXhlZCgyKTtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHt3aW5kU3BlZWR9IGttL2ggJHt3aW5kQXJyWzNdfWA7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgY29uc3QgZmFocmVuaGVpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmFocmVuaGVpdFwiKTtcclxuICAgIGZhaHJlbmhlaXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyBnZXRDaXR5LCBjaGFuZ2VTeXN0ZW0gfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjaGFuZ2VTeXN0ZW0sIGdldENpdHkgfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IGxvbmRvbiA9IGdldENpdHkoXCJsb25kb25cIik7XHJcbndpbmRvdy5vbmxvYWQgPSBsb25kb247XHJcblxyXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1idXR0b25cIik7XHJcbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0Q2l0eSk7XHJcblxyXG5jb25zdCBjZWxzaXVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jZWxzaXVzXCIpO1xyXG5jb25zdCBmYWhyZW5oZWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYWhyZW5oZWl0XCIpO1xyXG5jZWxzaXVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VTeXN0ZW0pO1xyXG5mYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VTeXN0ZW0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
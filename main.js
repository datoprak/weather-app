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
      createDaily(data);
      loadInterface(data);
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
  cityName.textContent = data.city.toUpperCase();
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
  precipitation.textContent = `Precipitation: ${Math.round(
    data.dailyData[0].pop * 100
  )}%`;
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
  changeColors(data.temp);
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
  const input = document.querySelector("#searchbar");
  input.value = "";
};

const changeSystem = e => {
  const temp = document.querySelector(".temp");
  const wind = document.querySelector(".wind");
  const dailyTemp = document.querySelectorAll(".daily-temp");
  const nightlyTemp = document.querySelectorAll(".night-temp");
  const celsius = document.querySelector(".celsius");
  const fahrenheit = document.querySelector(".fahrenheit");

  if (e.target.className === "fahrenheit") {
    temp.textContent = `${Math.round(temp.textContent * 1.8 + 32)}`;
    dailyTemp.forEach(t => {
      let f = t.textContent.slice(0, -1) * 1.8 + 32;
      t.textContent = `${Math.round(f)}°`;
    });
    nightlyTemp.forEach(t => {
      console.log(t.textContent);
      let f = t.textContent.slice(0, -1) * 1.8 + 32;
      t.textContent = `${Math.round(f)}°`;
    });
    const windArr = wind.textContent.split(" ");
    let windSpeed = windArr[1];
    windSpeed = (windSpeed * 0.621371).toFixed(2);
    wind.textContent = `Wind: ${windSpeed} mph ${windArr[3]}`;
    e.target.classList.add("active");
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
    fahrenheit.classList.remove("active");
  }
};

const changeColors = data => {
  const input = document.querySelector("#searchbar");
  const button = document.querySelector(".search-button");
  const body = document.querySelector("body");
  const dailyBox = document.querySelectorAll(".daily-box");

  if (data <= 5) {
    input.style.backgroundColor = "#567189";
    button.style.backgroundColor = "#567189";
    dailyBox.forEach(box => {
      box.style.backgroundColor = "#567189";
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundColor = "#FAD6A5";
  } else if (data <= 10 && data > 5) {
    input.style.backgroundColor = "#FFD8A9";
    button.style.backgroundColor = "#FFD8A9";
    dailyBox.forEach(box => {
      box.style.backgroundColor = "#FFD8A9";
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundColor = "#E38B29";
  } else if (data <= 15 && data > 10) {
    input.style.backgroundColor = "#F7A4A4";
    button.style.backgroundColor = "#F7A4A4";
    dailyBox.forEach(box => {
      box.style.backgroundColor = "#F7A4A4";
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundColor = "#B6E2A1";
  } else if (data > 15) {
    input.style.backgroundColor = "#9CFF2E";
    button.style.backgroundColor = "#9CFF2E";
    dailyBox.forEach(box => {
      box.style.backgroundColor = "#9CFF2E";
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundColor = "#2192FF";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250cm9sbGVycy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXRBUElEYXRhID0gYXN5bmMgc2VhcmNoZWRDaXR5ID0+IHtcclxuICBjb25zdCBnZW9VcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtzZWFyY2hlZENpdHl9JmxpbWl0PTEmYXBwaWQ9MDliMzgwNGMwZWFiZmM0OGEwNzlmMThlYWViYzUzYjlgO1xyXG4gIGNvbnN0IHVybDIgPVxyXG4gICAgXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT1sb25kb24mbGltaXQ9MSZhcHBpZD0wOWIzODA0YzBlYWJmYzQ4YTA3OWYxOGVhZWJjNTNiOVwiO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZ2VvVXJsKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICBjb25zdCBsb24gPSBkYXRhWzBdLmxvbjtcclxuICBjb25zdCBsYXQgPSBkYXRhWzBdLmxhdDtcclxuICBjb25zdCBuYW1lID0gZGF0YVswXS5uYW1lO1xyXG5cclxuICBjb25zdCB3ZWF0aGVyVXJsID0gYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD0ke2xhdH0mbG9uPSR7bG9ufSZleGNsdWRlPW1pbnV0ZWx5LGhvdXJseSxhbGVydHMmYXBwaWQ9MDliMzgwNGMwZWFiZmM0OGEwNzlmMThlYWViYzUzYjkmdW5pdHM9bWV0cmljYDtcclxuICBjb25zdCB3ZWF0aGVyUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh3ZWF0aGVyVXJsKTtcclxuICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXJSZXNwb25zZS5qc29uKCk7XHJcblxyXG4gIGNvbnNvbGUubG9nKHdlYXRoZXJEYXRhKTtcclxuXHJcbiAgY29uc3QgcmVxdWlyZWREYXRhID0gcHJvY2Vzc0RhdGEobmFtZSwgd2VhdGhlckRhdGEpO1xyXG4gIHJldHVybiByZXF1aXJlZERhdGE7XHJcbn07XHJcblxyXG5jb25zdCBwcm9jZXNzRGF0YSA9IChuYW1lLCB3ZWF0aGVyRGF0YSkgPT4ge1xyXG4gIGNvbnN0IGNpdHkgPSBuYW1lO1xyXG4gIGNvbnN0IGN1cnJlbnQgPSB3ZWF0aGVyRGF0YS5jdXJyZW50O1xyXG4gIGNvbnN0IGRhaWx5ID0gd2VhdGhlckRhdGEuZGFpbHk7XHJcblxyXG4gIGNvbnN0IHVuaXhUaW1lU3RhbXAgPSBjdXJyZW50LmR0O1xyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZVN0YW1wICogMTAwMCk7XHJcbiAgY29uc3QgdGVtcCA9IGN1cnJlbnQudGVtcDtcclxuICBjb25zdCBodW1pZGl0eSA9IGN1cnJlbnQuaHVtaWRpdHk7XHJcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBjdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgY29uc3QgaWNvbiA9IGN1cnJlbnQud2VhdGhlclswXS5pY29uO1xyXG4gIGNvbnN0IG1haW4gPSBjdXJyZW50LndlYXRoZXJbMF0ubWFpbjtcclxuICBjb25zdCB3aW5kU3BlZWQgPSBjdXJyZW50LndpbmRfc3BlZWQ7XHJcbiAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGN1cnJlbnQud2luZF9kZWc7XHJcbiAgY29uc3QgY2xvdWQgPSBjdXJyZW50LmNsb3VkcztcclxuXHJcbiAgY29uc3QgZGFpbHlEYXRhID0gW107XHJcbiAgZGFpbHkuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgY29uc3QgdW5peFRpbWVTdGFtcCA9IGRheS5kdDtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZVN0YW1wICogMTAwMCk7XHJcbiAgICBjb25zdCB0ZW1wID0gZGF5LnRlbXAuZGF5O1xyXG4gICAgY29uc3QgbmlnaHRUZW1wID0gZGF5LnRlbXAubmlnaHQ7XHJcbiAgICBjb25zdCBwb3AgPSBkYXkucG9wO1xyXG4gICAgY29uc3QgaHVtaWRpdHkgPSBkYXkuaHVtaWRpdHk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRheS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgY29uc3QgaWNvbiA9IGRheS53ZWF0aGVyWzBdLmljb247XHJcbiAgICBjb25zdCBtYWluID0gZGF5LndlYXRoZXJbMF0ubWFpbjtcclxuICAgIGNvbnN0IHdpbmRTcGVlZCA9IGRheS53aW5kX3NwZWVkO1xyXG4gICAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGRheS53aW5kX2RlZztcclxuICAgIGNvbnN0IGNsb3VkID0gZGF5LmNsb3VkcztcclxuICAgIG9iaiA9IHtcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGVtcCxcclxuICAgICAgbmlnaHRUZW1wLFxyXG4gICAgICBwb3AsXHJcbiAgICAgIGh1bWlkaXR5LFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgaWNvbixcclxuICAgICAgbWFpbixcclxuICAgICAgd2luZFNwZWVkLFxyXG4gICAgICB3aW5kRGlyZWN0aW9uLFxyXG4gICAgICBjbG91ZCxcclxuICAgIH07XHJcbiAgICBkYWlseURhdGEucHVzaChvYmopO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXF1aXJlZERhdGEgPSB7XHJcbiAgICBjaXR5LFxyXG4gICAgZGF0ZSxcclxuICAgIHRlbXAsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgaWNvbixcclxuICAgIG1haW4sXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICB3aW5kRGlyZWN0aW9uLFxyXG4gICAgY2xvdWQsXHJcbiAgICBkYWlseURhdGEsXHJcbiAgfTtcclxuICBjb25zb2xlLmxvZyhyZXF1aXJlZERhdGEpO1xyXG4gIHJldHVybiByZXF1aXJlZERhdGE7XHJcbn07XHJcblxyXG5leHBvcnQgeyBnZXRBUElEYXRhIH07XHJcbiIsImltcG9ydCB7IGdldEFQSURhdGEgfSBmcm9tIFwiLi9jb250cm9sbGVyc1wiO1xyXG5cclxuY29uc3QgZ2V0Q2l0eSA9IGUgPT4ge1xyXG4gIGlmIChlID09PSBcImxvbmRvblwiKSB7XHJcbiAgICBjb25zdCByZXF1aXJlZERhdGEgPSBnZXRBUElEYXRhKFwibG9uZG9uXCIpO1xyXG4gICAgcmVxdWlyZWREYXRhLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICBjcmVhdGVEYWlseShkYXRhKTtcclxuICAgICAgbG9hZEludGVyZmFjZShkYXRhKTtcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBzZWFyY2hiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaGJhclwiKTtcclxuICAgIGNvbnN0IHNlYXJjaGVkQ2l0eSA9IHNlYXJjaGJhci52YWx1ZTtcclxuICAgIGNvbnNvbGUubG9nKHNlYXJjaGVkQ2l0eSk7XHJcbiAgICBjb25zdCByZXF1aXJlZERhdGEgPSBnZXRBUElEYXRhKHNlYXJjaGVkQ2l0eSk7XHJcbiAgICByZXF1aXJlZERhdGEudGhlbihkYXRhID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgIGxvYWRJbnRlcmZhY2UoZGF0YSk7XHJcbiAgICAgIGxvYWREYWlseShkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvYWRJbnRlcmZhY2UgPSBkYXRhID0+IHtcclxuICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eS1uYW1lXCIpO1xyXG4gIGNpdHlOYW1lLnRleHRDb250ZW50ID0gZGF0YS5jaXR5LnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgY3VycmVudEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtaWNvblwiKTtcclxuICBjdXJyZW50SWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF0YS5pY29ufUAyeC5wbmdgO1xyXG4gIGN1cnJlbnRJY29uLmFsdCA9IGAke2RhdGEuZGVzY3JpcHRpb259YDtcclxuICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wXCIpO1xyXG4gIHRlbXAudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKGRhdGEudGVtcCk7XHJcbiAgY29uc3QgZGF5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF5LW5hbWVcIik7XHJcbiAgZGF5TmFtZS50ZXh0Q29udGVudCA9IGRhdGEuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICB3ZWVrZGF5OiBcImxvbmdcIixcclxuICB9KTtcclxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY1wiKTtcclxuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9XHJcbiAgICBkYXRhLmRlc2NyaXB0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZGF0YS5kZXNjcmlwdGlvbi5zbGljZSgxKTtcclxuICBjb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVjaXBpdGF0aW9uXCIpO1xyXG4gIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgUHJlY2lwaXRhdGlvbjogJHtNYXRoLnJvdW5kKFxyXG4gICAgZGF0YS5kYWlseURhdGFbMF0ucG9wICogMTAwXHJcbiAgKX0lYDtcclxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XHJcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX0lYDtcclxuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG4gIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPCA0NSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkWA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gNDUgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgOTApIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpdgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDkwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDEzNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkmA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMTM1ICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDE4MCkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGmGA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMTgwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDIyNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGk2A7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMjI1ICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDI3MCkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGmWA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMjcwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDMxNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkGA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMzE1KSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaWYDtcclxuICB9XHJcbiAgY2hhbmdlQ29sb3JzKGRhdGEudGVtcCk7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVEYWlseSA9IGRhdGEgPT4ge1xyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IGRhdGEuZGFpbHlEYXRhO1xyXG4gIGRhaWx5RGF0YS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICBjb25zdCBkYWlseUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYWlseUJveC5jbGFzc0xpc3QuYWRkKFwiZGFpbHktYm94XCIpO1xyXG4gICAgY29uc3QgZGF5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYXlOYW1lLmNsYXNzTGlzdC5hZGQoXCJzaG9ydC1kYXktbmFtZVwiKTtcclxuICAgIGRheU5hbWUudGV4dENvbnRlbnQgPSBkYXkuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICAgIHdlZWtkYXk6IFwic2hvcnRcIixcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaWNvblwiKTtcclxuICAgIHdlYXRoZXJJY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXkuaWNvbn1AMngucG5nYDtcclxuICAgIHdlYXRoZXJJY29uLmFsdCA9IGAke2RheS5kZXNjcmlwdGlvbn1gO1xyXG4gICAgY29uc3QgdHdvVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0d29UZW1wLmNsYXNzTGlzdC5hZGQoXCJ0d28tdGVtcFwiKTtcclxuICAgIGNvbnN0IGRhaWx5VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYWlseVRlbXAuY2xhc3NMaXN0LmFkZChcImRhaWx5LXRlbXBcIik7XHJcbiAgICBkYWlseVRlbXAudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheS50ZW1wKX3CsGA7XHJcbiAgICBjb25zdCBuaWdodGx5VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBuaWdodGx5VGVtcC5jbGFzc0xpc3QuYWRkKFwibmlnaHQtdGVtcFwiKTtcclxuICAgIG5pZ2h0bHlUZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkubmlnaHRUZW1wKX3CsGA7XHJcbiAgICB0d29UZW1wLmFwcGVuZENoaWxkKGRhaWx5VGVtcCk7XHJcbiAgICB0d29UZW1wLmFwcGVuZENoaWxkKG5pZ2h0bHlUZW1wKTtcclxuICAgIGRhaWx5Qm94LmFwcGVuZENoaWxkKGRheU5hbWUpO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQod2VhdGhlckljb24pO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQodHdvVGVtcCk7XHJcbiAgICBjb25zdCBkYWlseVNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhaWx5LXNpZGVcIik7XHJcbiAgICBkYWlseVNpZGUuYXBwZW5kQ2hpbGQoZGFpbHlCb3gpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgbG9hZERhaWx5ID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgZGFpbHlEYXRhID0gZGF0YS5kYWlseURhdGE7XHJcbiAgZGFpbHlEYXRhLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IGRheU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNob3J0LWRheS1uYW1lXCIpO1xyXG4gICAgZGF5TmFtZS5mb3JFYWNoKChkLCBpKSA9PiB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xyXG4gICAgICAgIGQudGV4dENvbnRlbnQgPSBkYXkuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICAgICAgICB3ZWVrZGF5OiBcInNob3J0XCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndlYXRoZXItaWNvblwiKTtcclxuICAgIHdlYXRoZXJJY29uLmZvckVhY2goKGljb24sIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgaWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF5Lmljb259QDJ4LnBuZ2A7XHJcbiAgICAgICAgaWNvbi5hbHQgPSBkYXkuZGVzY3JpcHRpb247XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgZGFpbHlUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYWlseS10ZW1wXCIpO1xyXG4gICAgZGFpbHlUZW1wLmZvckVhY2goKHQsIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5LnRlbXApfcKwYDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuaWdodGx5VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmlnaHQtdGVtcFwiKTtcclxuICAgIG5pZ2h0bHlUZW1wLmZvckVhY2goKHQsIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5Lm5pZ2h0VGVtcCl9wrBgO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoYmFyXCIpO1xyXG4gIGlucHV0LnZhbHVlID0gXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGNoYW5nZVN5c3RlbSA9IGUgPT4ge1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XHJcbiAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcclxuICBjb25zdCBkYWlseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRhaWx5LXRlbXBcIik7XHJcbiAgY29uc3QgbmlnaHRseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5pZ2h0LXRlbXBcIik7XHJcbiAgY29uc3QgY2Vsc2l1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2Vsc2l1c1wiKTtcclxuICBjb25zdCBmYWhyZW5oZWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYWhyZW5oZWl0XCIpO1xyXG5cclxuICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImZhaHJlbmhlaXRcIikge1xyXG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQodGVtcC50ZXh0Q29udGVudCAqIDEuOCArIDMyKX1gO1xyXG4gICAgZGFpbHlUZW1wLmZvckVhY2godCA9PiB7XHJcbiAgICAgIGxldCBmID0gdC50ZXh0Q29udGVudC5zbGljZSgwLCAtMSkgKiAxLjggKyAzMjtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZil9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBuaWdodGx5VGVtcC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyh0LnRleHRDb250ZW50KTtcclxuICAgICAgbGV0IGYgPSB0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAqIDEuOCArIDMyO1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChmKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHdpbmRBcnIgPSB3aW5kLnRleHRDb250ZW50LnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aW5kU3BlZWQgPSB3aW5kQXJyWzFdO1xyXG4gICAgd2luZFNwZWVkID0gKHdpbmRTcGVlZCAqIDAuNjIxMzcxKS50b0ZpeGVkKDIpO1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke3dpbmRTcGVlZH0gbXBoICR7d2luZEFyclszXX1gO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGNlbHNpdXMuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJjZWxzaXVzXCIpIHtcclxuICAgIHRlbXAudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKCh0ZW1wLnRleHRDb250ZW50IC0gMzIpIC8gMS44KX1gO1xyXG4gICAgZGFpbHlUZW1wLmZvckVhY2godCA9PiB7XHJcbiAgICAgIGxldCBjID0gKHQudGV4dENvbnRlbnQuc2xpY2UoMCwgLTEpIC0gMzIpIC8gMS44O1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChjKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIG5pZ2h0bHlUZW1wLmZvckVhY2godCA9PiB7XHJcbiAgICAgIGxldCBjID0gKHQudGV4dENvbnRlbnQuc2xpY2UoMCwgLTEpIC0gMzIpIC8gMS44O1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChjKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHdpbmRBcnIgPSB3aW5kLnRleHRDb250ZW50LnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aW5kU3BlZWQgPSB3aW5kQXJyWzFdO1xyXG4gICAgd2luZFNwZWVkID0gKHdpbmRTcGVlZCAqIDEuNjA5MzQ0KS50b0ZpeGVkKDIpO1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke3dpbmRTcGVlZH0ga20vaCAke3dpbmRBcnJbM119YDtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBmYWhyZW5oZWl0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY2hhbmdlQ29sb3JzID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaGJhclwiKTtcclxuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1idXR0b25cIik7XHJcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG4gIGNvbnN0IGRhaWx5Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYWlseS1ib3hcIik7XHJcblxyXG4gIGlmIChkYXRhIDw9IDUpIHtcclxuICAgIGlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzU2NzE4OVwiO1xyXG4gICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzU2NzE4OVwiO1xyXG4gICAgZGFpbHlCb3guZm9yRWFjaChib3ggPT4ge1xyXG4gICAgICBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTY3MTg5XCI7XHJcbiAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIm5vbmVcIjtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7XHJcbiAgICAgIH0sIDEwKTtcclxuICAgIH0pO1xyXG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGQUQ2QTVcIjtcclxuICB9IGVsc2UgaWYgKGRhdGEgPD0gMTAgJiYgZGF0YSA+IDUpIHtcclxuICAgIGlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0ZGRDhBOVwiO1xyXG4gICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0ZGRDhBOVwiO1xyXG4gICAgZGFpbHlCb3guZm9yRWFjaChib3ggPT4ge1xyXG4gICAgICBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRkZEOEE5XCI7XHJcbiAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIm5vbmVcIjtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7XHJcbiAgICAgIH0sIDEwKTtcclxuICAgIH0pO1xyXG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNFMzhCMjlcIjtcclxuICB9IGVsc2UgaWYgKGRhdGEgPD0gMTUgJiYgZGF0YSA+IDEwKSB7XHJcbiAgICBpbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGN0E0QTRcIjtcclxuICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGN0E0QTRcIjtcclxuICAgIGRhaWx5Qm94LmZvckVhY2goYm94ID0+IHtcclxuICAgICAgYm94LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0Y3QTRBNFwiO1xyXG4gICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJub25lXCI7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIlwiO1xyXG4gICAgICB9LCAxMCk7XHJcbiAgICB9KTtcclxuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjQjZFMkExXCI7XHJcbiAgfSBlbHNlIGlmIChkYXRhID4gMTUpIHtcclxuICAgIGlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzlDRkYyRVwiO1xyXG4gICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzlDRkYyRVwiO1xyXG4gICAgZGFpbHlCb3guZm9yRWFjaChib3ggPT4ge1xyXG4gICAgICBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOUNGRjJFXCI7XHJcbiAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIm5vbmVcIjtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7XHJcbiAgICAgIH0sIDEwKTtcclxuICAgIH0pO1xyXG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMyMTkyRkZcIjtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgeyBnZXRDaXR5LCBjaGFuZ2VTeXN0ZW0gfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjaGFuZ2VTeXN0ZW0sIGdldENpdHkgfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IGxvbmRvbiA9IGdldENpdHkoXCJsb25kb25cIik7XHJcbndpbmRvdy5vbmxvYWQgPSBsb25kb247XHJcblxyXG5jb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1idXR0b25cIik7XHJcbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0Q2l0eSk7XHJcblxyXG5jb25zdCBjZWxzaXVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jZWxzaXVzXCIpO1xyXG5jb25zdCBmYWhyZW5oZWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYWhyZW5oZWl0XCIpO1xyXG5jZWxzaXVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VTeXN0ZW0pO1xyXG5mYWhyZW5oZWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjaGFuZ2VTeXN0ZW0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
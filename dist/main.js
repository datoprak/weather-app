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
  const response = await fetch(geoUrl);
  const data = await response.json();

  const lon = data[0].lon;
  const lat = data[0].lat;
  const name = data[0].name;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

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
    loading(true, true);
    requiredData
      .then(data => {
        loading(false, true);
        createDaily(data);
        loadInterface(data);
      })
      .catch(err => {
        const cityName = document.querySelector(".city-name");
        cityName.style.fontFamily = "Roboto";
        cityName.textContent = "Something went wrong.";
        throw new Error(err);
      });
  } else {
    e.preventDefault();
    const searchbar = document.querySelector("#searchbar");
    const searchedCity = searchbar.value;
    const requiredData = (0,_controllers__WEBPACK_IMPORTED_MODULE_0__.getAPIData)(searchedCity);
    loading(true);
    requiredData
      .then(data => {
        loading(false);
        loadInterface(data);
        loadDaily(data);
      })
      .catch(err => {
        const cityName = document.querySelector(".city-name");
        cityName.style.fontFamily = "Roboto";
        cityName.textContent = "Could not find city.";
        throw new Error(err);
      });
  }
};

const loadInterface = data => {
  const cityName = document.querySelector(".city-name");
  cityName.style.fontFamily = "Pacifico";
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
  changeColors(data.main);
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
  const body = document.querySelector("body");
  const dailyBox = document.querySelectorAll(".daily-box");

  if (data === "Drizzle" || data === "Rain") {
    dailyBox.forEach(box => {
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundImage = "url(images/rain.jpg)";
  } else if (data === "Clouds") {
    dailyBox.forEach(box => {
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundImage = "url(images/cloud.jpg)";
  } else if (data === "Thunderstorm") {
    dailyBox.forEach(box => {
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundImage = "url(images/thunderstorm.jpg)";
  } else if (data === "Clear") {
    dailyBox.forEach(box => {
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundImage = "url('images/sun.jpg')";
  } else if (data === "Snow") {
    dailyBox.forEach(box => {
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundImage = "url('images/snow.jpg')";
  } else {
    dailyBox.forEach(box => {
      box.style.animation = "none";
      setTimeout(() => {
        box.style.animation = "";
      }, 10);
    });
    body.style.backgroundImage = "url('images/mist.jpg')";
  }
};

const loading = (state, first = false) => {
  const modal = document.querySelector(".loading-modal");
  const form = document.querySelector("form");
  const tempContainer = document.querySelector(".temp-container");
  modal.style.display = state ? "flex" : "none";
  if (first) {
    form.style.display = state ? "none" : "flex";
    tempContainer.style.display = state ? "none" : "flex";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9EO0FBQ3BEO0FBQ0EsZUFBZSxtREFBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsK0NBQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLG9EQUFZO0FBQzlDLHFDQUFxQyxvREFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRyb2xsZXJzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldEFQSURhdGEgPSBhc3luYyBzZWFyY2hlZENpdHkgPT4ge1xyXG4gIGNvbnN0IGdlb1VybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke3NlYXJjaGVkQ2l0eX0mbGltaXQ9MSZhcHBpZD0wOWIzODA0YzBlYWJmYzQ4YTA3OWYxOGVhZWJjNTNiOWA7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZW9VcmwpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gIGNvbnN0IGxvbiA9IGRhdGFbMF0ubG9uO1xyXG4gIGNvbnN0IGxhdCA9IGRhdGFbMF0ubGF0O1xyXG4gIGNvbnN0IG5hbWUgPSBkYXRhWzBdLm5hbWU7XHJcblxyXG4gIGNvbnN0IHdlYXRoZXJVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5LGFsZXJ0cyZhcHBpZD0wOWIzODA0YzBlYWJmYzQ4YTA3OWYxOGVhZWJjNTNiOSZ1bml0cz1tZXRyaWNgO1xyXG4gIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKHdlYXRoZXJVcmwpO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgY29uc3QgcmVxdWlyZWREYXRhID0gcHJvY2Vzc0RhdGEobmFtZSwgd2VhdGhlckRhdGEpO1xyXG4gIHJldHVybiByZXF1aXJlZERhdGE7XHJcbn07XHJcblxyXG5jb25zdCBwcm9jZXNzRGF0YSA9IChuYW1lLCB3ZWF0aGVyRGF0YSkgPT4ge1xyXG4gIGNvbnN0IGNpdHkgPSBuYW1lO1xyXG4gIGNvbnN0IGN1cnJlbnQgPSB3ZWF0aGVyRGF0YS5jdXJyZW50O1xyXG4gIGNvbnN0IGRhaWx5ID0gd2VhdGhlckRhdGEuZGFpbHk7XHJcblxyXG4gIGNvbnN0IHVuaXhUaW1lU3RhbXAgPSBjdXJyZW50LmR0O1xyXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZVN0YW1wICogMTAwMCk7XHJcbiAgY29uc3QgdGVtcCA9IGN1cnJlbnQudGVtcDtcclxuICBjb25zdCBodW1pZGl0eSA9IGN1cnJlbnQuaHVtaWRpdHk7XHJcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBjdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgY29uc3QgaWNvbiA9IGN1cnJlbnQud2VhdGhlclswXS5pY29uO1xyXG4gIGNvbnN0IG1haW4gPSBjdXJyZW50LndlYXRoZXJbMF0ubWFpbjtcclxuICBjb25zdCB3aW5kU3BlZWQgPSBjdXJyZW50LndpbmRfc3BlZWQ7XHJcbiAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGN1cnJlbnQud2luZF9kZWc7XHJcbiAgY29uc3QgY2xvdWQgPSBjdXJyZW50LmNsb3VkcztcclxuXHJcbiAgY29uc3QgZGFpbHlEYXRhID0gW107XHJcbiAgZGFpbHkuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgY29uc3QgdW5peFRpbWVTdGFtcCA9IGRheS5kdDtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4VGltZVN0YW1wICogMTAwMCk7XHJcbiAgICBjb25zdCB0ZW1wID0gZGF5LnRlbXAuZGF5O1xyXG4gICAgY29uc3QgbmlnaHRUZW1wID0gZGF5LnRlbXAubmlnaHQ7XHJcbiAgICBjb25zdCBwb3AgPSBkYXkucG9wO1xyXG4gICAgY29uc3QgaHVtaWRpdHkgPSBkYXkuaHVtaWRpdHk7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRheS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgY29uc3QgaWNvbiA9IGRheS53ZWF0aGVyWzBdLmljb247XHJcbiAgICBjb25zdCBtYWluID0gZGF5LndlYXRoZXJbMF0ubWFpbjtcclxuICAgIGNvbnN0IHdpbmRTcGVlZCA9IGRheS53aW5kX3NwZWVkO1xyXG4gICAgY29uc3Qgd2luZERpcmVjdGlvbiA9IGRheS53aW5kX2RlZztcclxuICAgIGNvbnN0IGNsb3VkID0gZGF5LmNsb3VkcztcclxuICAgIG9iaiA9IHtcclxuICAgICAgZGF0ZSxcclxuICAgICAgdGVtcCxcclxuICAgICAgbmlnaHRUZW1wLFxyXG4gICAgICBwb3AsXHJcbiAgICAgIGh1bWlkaXR5LFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgaWNvbixcclxuICAgICAgbWFpbixcclxuICAgICAgd2luZFNwZWVkLFxyXG4gICAgICB3aW5kRGlyZWN0aW9uLFxyXG4gICAgICBjbG91ZCxcclxuICAgIH07XHJcbiAgICBkYWlseURhdGEucHVzaChvYmopO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXF1aXJlZERhdGEgPSB7XHJcbiAgICBjaXR5LFxyXG4gICAgZGF0ZSxcclxuICAgIHRlbXAsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgaWNvbixcclxuICAgIG1haW4sXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICB3aW5kRGlyZWN0aW9uLFxyXG4gICAgY2xvdWQsXHJcbiAgICBkYWlseURhdGEsXHJcbiAgfTtcclxuICByZXR1cm4gcmVxdWlyZWREYXRhO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2V0QVBJRGF0YSB9O1xyXG4iLCJpbXBvcnQgeyBnZXRBUElEYXRhIH0gZnJvbSBcIi4vY29udHJvbGxlcnNcIjtcclxuXHJcbmNvbnN0IGdldENpdHkgPSBlID0+IHtcclxuICBpZiAoZSA9PT0gXCJsb25kb25cIikge1xyXG4gICAgY29uc3QgcmVxdWlyZWREYXRhID0gZ2V0QVBJRGF0YShcImxvbmRvblwiKTtcclxuICAgIGxvYWRpbmcodHJ1ZSwgdHJ1ZSk7XHJcbiAgICByZXF1aXJlZERhdGFcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgbG9hZGluZyhmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgY3JlYXRlRGFpbHkoZGF0YSk7XHJcbiAgICAgICAgbG9hZEludGVyZmFjZShkYXRhKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNpdHktbmFtZVwiKTtcclxuICAgICAgICBjaXR5TmFtZS5zdHlsZS5mb250RmFtaWx5ID0gXCJSb2JvdG9cIjtcclxuICAgICAgICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuXCI7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBzZWFyY2hiYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaGJhclwiKTtcclxuICAgIGNvbnN0IHNlYXJjaGVkQ2l0eSA9IHNlYXJjaGJhci52YWx1ZTtcclxuICAgIGNvbnN0IHJlcXVpcmVkRGF0YSA9IGdldEFQSURhdGEoc2VhcmNoZWRDaXR5KTtcclxuICAgIGxvYWRpbmcodHJ1ZSk7XHJcbiAgICByZXF1aXJlZERhdGFcclxuICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgbG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgbG9hZEludGVyZmFjZShkYXRhKTtcclxuICAgICAgICBsb2FkRGFpbHkoZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XHJcbiAgICAgICAgY2l0eU5hbWUuc3R5bGUuZm9udEZhbWlseSA9IFwiUm9ib3RvXCI7XHJcbiAgICAgICAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBcIkNvdWxkIG5vdCBmaW5kIGNpdHkuXCI7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvYWRJbnRlcmZhY2UgPSBkYXRhID0+IHtcclxuICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eS1uYW1lXCIpO1xyXG4gIGNpdHlOYW1lLnN0eWxlLmZvbnRGYW1pbHkgPSBcIlBhY2lmaWNvXCI7XHJcbiAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBkYXRhLmNpdHkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBjdXJyZW50SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1pY29uXCIpO1xyXG4gIGN1cnJlbnRJY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDJ4LnBuZ2A7XHJcbiAgY3VycmVudEljb24uYWx0ID0gYCR7ZGF0YS5kZXNjcmlwdGlvbn1gO1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XHJcbiAgdGVtcC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoZGF0YS50ZW1wKTtcclxuICBjb25zdCBkYXlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXktbmFtZVwiKTtcclxuICBkYXlOYW1lLnRleHRDb250ZW50ID0gZGF0YS5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLUVOXCIsIHtcclxuICAgIHdlZWtkYXk6IFwibG9uZ1wiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjXCIpO1xyXG4gIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID1cclxuICAgIGRhdGEuZGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkYXRhLmRlc2NyaXB0aW9uLnNsaWNlKDEpO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWNpcGl0YXRpb25cIik7XHJcbiAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IGBQcmVjaXBpdGF0aW9uOiAke01hdGgucm91bmQoXHJcbiAgICBkYXRhLmRhaWx5RGF0YVswXS5wb3AgKiAxMDBcclxuICApfSVgO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcclxuICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHtkYXRhLmh1bWlkaXR5fSVgO1xyXG4gIGNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRcIik7XHJcbiAgaWYgKGRhdGEud2luZERpcmVjdGlvbiA8IDQ1KSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaRYDtcclxuICB9IGVsc2UgaWYgKGRhdGEud2luZERpcmVjdGlvbiA+PSA0NSAmJiBkYXRhLndpbmREaXJlY3Rpb24gPCA5MCkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGl2A7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gOTAgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgMTM1KSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaSYDtcclxuICB9IGVsc2UgaWYgKGRhdGEud2luZERpcmVjdGlvbiA+PSAxMzUgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgMTgwKSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaYYDtcclxuICB9IGVsc2UgaWYgKGRhdGEud2luZERpcmVjdGlvbiA+PSAxODAgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgMjI1KSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaTYDtcclxuICB9IGVsc2UgaWYgKGRhdGEud2luZERpcmVjdGlvbiA+PSAyMjUgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgMjcwKSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaZYDtcclxuICB9IGVsc2UgaWYgKGRhdGEud2luZERpcmVjdGlvbiA+PSAyNzAgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgMzE1KSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaQYDtcclxuICB9IGVsc2UgaWYgKGRhdGEud2luZERpcmVjdGlvbiA+PSAzMTUpIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpZgO1xyXG4gIH1cclxuICBjaGFuZ2VDb2xvcnMoZGF0YS5tYWluKTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZURhaWx5ID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgZGFpbHlEYXRhID0gZGF0YS5kYWlseURhdGE7XHJcbiAgZGFpbHlEYXRhLmZvckVhY2goZGF5ID0+IHtcclxuICAgIGNvbnN0IGRhaWx5Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRhaWx5Qm94LmNsYXNzTGlzdC5hZGQoXCJkYWlseS1ib3hcIik7XHJcbiAgICBjb25zdCBkYXlOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRheU5hbWUuY2xhc3NMaXN0LmFkZChcInNob3J0LWRheS1uYW1lXCIpO1xyXG4gICAgZGF5TmFtZS50ZXh0Q29udGVudCA9IGRheS5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLUVOXCIsIHtcclxuICAgICAgd2Vla2RheTogXCJzaG9ydFwiLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICB3ZWF0aGVySWNvbi5jbGFzc0xpc3QuYWRkKFwid2VhdGhlci1pY29uXCIpO1xyXG4gICAgd2VhdGhlckljb24uc3JjID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RheS5pY29ufUAyeC5wbmdgO1xyXG4gICAgd2VhdGhlckljb24uYWx0ID0gYCR7ZGF5LmRlc2NyaXB0aW9ufWA7XHJcbiAgICBjb25zdCB0d29UZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHR3b1RlbXAuY2xhc3NMaXN0LmFkZChcInR3by10ZW1wXCIpO1xyXG4gICAgY29uc3QgZGFpbHlUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRhaWx5VGVtcC5jbGFzc0xpc3QuYWRkKFwiZGFpbHktdGVtcFwiKTtcclxuICAgIGRhaWx5VGVtcC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5LnRlbXApfcKwYDtcclxuICAgIGNvbnN0IG5pZ2h0bHlUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG5pZ2h0bHlUZW1wLmNsYXNzTGlzdC5hZGQoXCJuaWdodC10ZW1wXCIpO1xyXG4gICAgbmlnaHRseVRlbXAudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheS5uaWdodFRlbXApfcKwYDtcclxuICAgIHR3b1RlbXAuYXBwZW5kQ2hpbGQoZGFpbHlUZW1wKTtcclxuICAgIHR3b1RlbXAuYXBwZW5kQ2hpbGQobmlnaHRseVRlbXApO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQoZGF5TmFtZSk7XHJcbiAgICBkYWlseUJveC5hcHBlbmRDaGlsZCh3ZWF0aGVySWNvbik7XHJcbiAgICBkYWlseUJveC5hcHBlbmRDaGlsZCh0d29UZW1wKTtcclxuICAgIGNvbnN0IGRhaWx5U2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGFpbHktc2lkZVwiKTtcclxuICAgIGRhaWx5U2lkZS5hcHBlbmRDaGlsZChkYWlseUJveCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBsb2FkRGFpbHkgPSBkYXRhID0+IHtcclxuICBjb25zdCBkYWlseURhdGEgPSBkYXRhLmRhaWx5RGF0YTtcclxuICBkYWlseURhdGEuZm9yRWFjaCgoZGF5LCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgZGF5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hvcnQtZGF5LW5hbWVcIik7XHJcbiAgICBkYXlOYW1lLmZvckVhY2goKGQsIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgZC50ZXh0Q29udGVudCA9IGRheS5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLUVOXCIsIHtcclxuICAgICAgICAgIHdlZWtkYXk6IFwic2hvcnRcIixcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2VhdGhlci1pY29uXCIpO1xyXG4gICAgd2VhdGhlckljb24uZm9yRWFjaCgoaWNvbiwgaSkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IGkpIHtcclxuICAgICAgICBpY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXkuaWNvbn1AMngucG5nYDtcclxuICAgICAgICBpY29uLmFsdCA9IGRheS5kZXNjcmlwdGlvbjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYWlseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRhaWx5LXRlbXBcIik7XHJcbiAgICBkYWlseVRlbXAuZm9yRWFjaCgodCwgaSkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IGkpIHtcclxuICAgICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkudGVtcCl9wrBgO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IG5pZ2h0bHlUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uaWdodC10ZW1wXCIpO1xyXG4gICAgbmlnaHRseVRlbXAuZm9yRWFjaCgodCwgaSkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IGkpIHtcclxuICAgICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkubmlnaHRUZW1wKX3CsGA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hiYXJcIik7XHJcbiAgaW5wdXQudmFsdWUgPSBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgY2hhbmdlU3lzdGVtID0gZSA9PiB7XHJcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcFwiKTtcclxuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG4gIGNvbnN0IGRhaWx5VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGFpbHktdGVtcFwiKTtcclxuICBjb25zdCBuaWdodGx5VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmlnaHQtdGVtcFwiKTtcclxuICBjb25zdCBjZWxzaXVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jZWxzaXVzXCIpO1xyXG4gIGNvbnN0IGZhaHJlbmhlaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhaHJlbmhlaXRcIik7XHJcblxyXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiZmFocmVuaGVpdFwiKSB7XHJcbiAgICB0ZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh0ZW1wLnRleHRDb250ZW50ICogMS44ICsgMzIpfWA7XHJcbiAgICBkYWlseVRlbXAuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgbGV0IGYgPSB0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAqIDEuOCArIDMyO1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChmKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIG5pZ2h0bHlUZW1wLmZvckVhY2godCA9PiB7XHJcbiAgICAgIGxldCBmID0gdC50ZXh0Q29udGVudC5zbGljZSgwLCAtMSkgKiAxLjggKyAzMjtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZil9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB3aW5kQXJyID0gd2luZC50ZXh0Q29udGVudC5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgd2luZFNwZWVkID0gd2luZEFyclsxXTtcclxuICAgIHdpbmRTcGVlZCA9ICh3aW5kU3BlZWQgKiAwLjYyMTM3MSkudG9GaXhlZCgyKTtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHt3aW5kU3BlZWR9IG1waCAke3dpbmRBcnJbM119YDtcclxuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBjZWxzaXVzLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiY2Vsc2l1c1wiKSB7XHJcbiAgICB0ZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCgodGVtcC50ZXh0Q29udGVudCAtIDMyKSAvIDEuOCl9YDtcclxuICAgIGRhaWx5VGVtcC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICBsZXQgYyA9ICh0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAtIDMyKSAvIDEuODtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoYyl9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBuaWdodGx5VGVtcC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICBsZXQgYyA9ICh0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAtIDMyKSAvIDEuODtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoYyl9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB3aW5kQXJyID0gd2luZC50ZXh0Q29udGVudC5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgd2luZFNwZWVkID0gd2luZEFyclsxXTtcclxuICAgIHdpbmRTcGVlZCA9ICh3aW5kU3BlZWQgKiAxLjYwOTM0NCkudG9GaXhlZCgyKTtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHt3aW5kU3BlZWR9IGttL2ggJHt3aW5kQXJyWzNdfWA7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgZmFocmVuaGVpdC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNoYW5nZUNvbG9ycyA9IGRhdGEgPT4ge1xyXG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuICBjb25zdCBkYWlseUJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGFpbHktYm94XCIpO1xyXG5cclxuICBpZiAoZGF0YSA9PT0gXCJEcml6emxlXCIgfHwgZGF0YSA9PT0gXCJSYWluXCIpIHtcclxuICAgIGRhaWx5Qm94LmZvckVhY2goYm94ID0+IHtcclxuICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwibm9uZVwiO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJcIjtcclxuICAgICAgfSwgMTApO1xyXG4gICAgfSk7XHJcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKGltYWdlcy9yYWluLmpwZylcIjtcclxuICB9IGVsc2UgaWYgKGRhdGEgPT09IFwiQ2xvdWRzXCIpIHtcclxuICAgIGRhaWx5Qm94LmZvckVhY2goYm94ID0+IHtcclxuICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwibm9uZVwiO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJcIjtcclxuICAgICAgfSwgMTApO1xyXG4gICAgfSk7XHJcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKGltYWdlcy9jbG91ZC5qcGcpXCI7XHJcbiAgfSBlbHNlIGlmIChkYXRhID09PSBcIlRodW5kZXJzdG9ybVwiKSB7XHJcbiAgICBkYWlseUJveC5mb3JFYWNoKGJveCA9PiB7XHJcbiAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIm5vbmVcIjtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7XHJcbiAgICAgIH0sIDEwKTtcclxuICAgIH0pO1xyXG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChpbWFnZXMvdGh1bmRlcnN0b3JtLmpwZylcIjtcclxuICB9IGVsc2UgaWYgKGRhdGEgPT09IFwiQ2xlYXJcIikge1xyXG4gICAgZGFpbHlCb3guZm9yRWFjaChib3ggPT4ge1xyXG4gICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJub25lXCI7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIlwiO1xyXG4gICAgICB9LCAxMCk7XHJcbiAgICB9KTtcclxuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltYWdlcy9zdW4uanBnJylcIjtcclxuICB9IGVsc2UgaWYgKGRhdGEgPT09IFwiU25vd1wiKSB7XHJcbiAgICBkYWlseUJveC5mb3JFYWNoKGJveCA9PiB7XHJcbiAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIm5vbmVcIjtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7XHJcbiAgICAgIH0sIDEwKTtcclxuICAgIH0pO1xyXG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnaW1hZ2VzL3Nub3cuanBnJylcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgZGFpbHlCb3guZm9yRWFjaChib3ggPT4ge1xyXG4gICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJub25lXCI7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIlwiO1xyXG4gICAgICB9LCAxMCk7XHJcbiAgICB9KTtcclxuICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJ2ltYWdlcy9taXN0LmpwZycpXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9hZGluZyA9IChzdGF0ZSwgZmlyc3QgPSBmYWxzZSkgPT4ge1xyXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2FkaW5nLW1vZGFsXCIpO1xyXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcclxuICBjb25zdCB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wLWNvbnRhaW5lclwiKTtcclxuICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gc3RhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiO1xyXG4gIGlmIChmaXJzdCkge1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gc3RhdGUgPyBcIm5vbmVcIiA6IFwiZmxleFwiO1xyXG4gICAgdGVtcENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gc3RhdGUgPyBcIm5vbmVcIiA6IFwiZmxleFwiO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IGdldENpdHksIGNoYW5nZVN5c3RlbSB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNoYW5nZVN5c3RlbSwgZ2V0Q2l0eSB9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgbG9uZG9uID0gZ2V0Q2l0eShcImxvbmRvblwiKTtcclxud2luZG93Lm9ubG9hZCA9IGxvbmRvbjtcclxuXHJcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJ1dHRvblwiKTtcclxuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRDaXR5KTtcclxuXHJcbmNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNlbHNpdXNcIik7XHJcbmNvbnN0IGZhaHJlbmhlaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhaHJlbmhlaXRcIik7XHJcbmNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVN5c3RlbSk7XHJcbmZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVN5c3RlbSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
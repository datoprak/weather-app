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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YXBwLy4vc3JjL2NvbnRyb2xsZXJzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldEFQSURhdGEgPSBhc3luYyBzZWFyY2hlZENpdHkgPT4ge1xyXG4gIGNvbnN0IGdlb1VybCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0ke3NlYXJjaGVkQ2l0eX0mbGltaXQ9MSZhcHBpZD0wOWIzODA0YzBlYWJmYzQ4YTA3OWYxOGVhZWJjNTNiOWA7XHJcbiAgY29uc3QgdXJsMiA9XHJcbiAgICBcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPWxvbmRvbiZsaW1pdD0xJmFwcGlkPTA5YjM4MDRjMGVhYmZjNDhhMDc5ZjE4ZWFlYmM1M2I5XCI7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChnZW9VcmwpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gIGNvbnN0IGxvbiA9IGRhdGFbMF0ubG9uO1xyXG4gIGNvbnN0IGxhdCA9IGRhdGFbMF0ubGF0O1xyXG4gIGNvbnN0IG5hbWUgPSBkYXRhWzBdLm5hbWU7XHJcblxyXG4gIGNvbnN0IHdlYXRoZXJVcmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PSR7bGF0fSZsb249JHtsb259JmV4Y2x1ZGU9bWludXRlbHksaG91cmx5LGFsZXJ0cyZhcHBpZD0wOWIzODA0YzBlYWJmYzQ4YTA3OWYxOGVhZWJjNTNiOSZ1bml0cz1tZXRyaWNgO1xyXG4gIGNvbnN0IHdlYXRoZXJSZXNwb25zZSA9IGF3YWl0IGZldGNoKHdlYXRoZXJVcmwpO1xyXG4gIGNvbnN0IHdlYXRoZXJEYXRhID0gYXdhaXQgd2VhdGhlclJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgY29uc29sZS5sb2cod2VhdGhlckRhdGEpO1xyXG5cclxuICBjb25zdCByZXF1aXJlZERhdGEgPSBwcm9jZXNzRGF0YShuYW1lLCB3ZWF0aGVyRGF0YSk7XHJcbiAgcmV0dXJuIHJlcXVpcmVkRGF0YTtcclxufTtcclxuXHJcbmNvbnN0IHByb2Nlc3NEYXRhID0gKG5hbWUsIHdlYXRoZXJEYXRhKSA9PiB7XHJcbiAgY29uc3QgY2l0eSA9IG5hbWU7XHJcbiAgY29uc3QgY3VycmVudCA9IHdlYXRoZXJEYXRhLmN1cnJlbnQ7XHJcbiAgY29uc3QgZGFpbHkgPSB3ZWF0aGVyRGF0YS5kYWlseTtcclxuXHJcbiAgY29uc3QgdW5peFRpbWVTdGFtcCA9IGN1cnJlbnQuZHQ7XHJcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHVuaXhUaW1lU3RhbXAgKiAxMDAwKTtcclxuICBjb25zdCB0ZW1wID0gY3VycmVudC50ZW1wO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gY3VycmVudC5odW1pZGl0eTtcclxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGN1cnJlbnQud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcclxuICBjb25zdCBpY29uID0gY3VycmVudC53ZWF0aGVyWzBdLmljb247XHJcbiAgY29uc3QgbWFpbiA9IGN1cnJlbnQud2VhdGhlclswXS5tYWluO1xyXG4gIGNvbnN0IHdpbmRTcGVlZCA9IGN1cnJlbnQud2luZF9zcGVlZDtcclxuICBjb25zdCB3aW5kRGlyZWN0aW9uID0gY3VycmVudC53aW5kX2RlZztcclxuICBjb25zdCBjbG91ZCA9IGN1cnJlbnQuY2xvdWRzO1xyXG5cclxuICBjb25zdCBkYWlseURhdGEgPSBbXTtcclxuICBkYWlseS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICBsZXQgb2JqID0ge307XHJcbiAgICBjb25zdCB1bml4VGltZVN0YW1wID0gZGF5LmR0O1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHVuaXhUaW1lU3RhbXAgKiAxMDAwKTtcclxuICAgIGNvbnN0IHRlbXAgPSBkYXkudGVtcC5kYXk7XHJcbiAgICBjb25zdCBuaWdodFRlbXAgPSBkYXkudGVtcC5uaWdodDtcclxuICAgIGNvbnN0IHBvcCA9IGRheS5wb3A7XHJcbiAgICBjb25zdCBodW1pZGl0eSA9IGRheS5odW1pZGl0eTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZGF5LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgICBjb25zdCBpY29uID0gZGF5LndlYXRoZXJbMF0uaWNvbjtcclxuICAgIGNvbnN0IG1haW4gPSBkYXkud2VhdGhlclswXS5tYWluO1xyXG4gICAgY29uc3Qgd2luZFNwZWVkID0gZGF5LndpbmRfc3BlZWQ7XHJcbiAgICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZGF5LndpbmRfZGVnO1xyXG4gICAgY29uc3QgY2xvdWQgPSBkYXkuY2xvdWRzO1xyXG4gICAgb2JqID0ge1xyXG4gICAgICBkYXRlLFxyXG4gICAgICB0ZW1wLFxyXG4gICAgICBuaWdodFRlbXAsXHJcbiAgICAgIHBvcCxcclxuICAgICAgaHVtaWRpdHksXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBpY29uLFxyXG4gICAgICBtYWluLFxyXG4gICAgICB3aW5kU3BlZWQsXHJcbiAgICAgIHdpbmREaXJlY3Rpb24sXHJcbiAgICAgIGNsb3VkLFxyXG4gICAgfTtcclxuICAgIGRhaWx5RGF0YS5wdXNoKG9iaik7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlcXVpcmVkRGF0YSA9IHtcclxuICAgIGNpdHksXHJcbiAgICBkYXRlLFxyXG4gICAgdGVtcCxcclxuICAgIGh1bWlkaXR5LFxyXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpY29uLFxyXG4gICAgbWFpbixcclxuICAgIHdpbmRTcGVlZCxcclxuICAgIHdpbmREaXJlY3Rpb24sXHJcbiAgICBjbG91ZCxcclxuICAgIGRhaWx5RGF0YSxcclxuICB9O1xyXG4gIGNvbnNvbGUubG9nKHJlcXVpcmVkRGF0YSk7XHJcbiAgcmV0dXJuIHJlcXVpcmVkRGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCB7IGdldEFQSURhdGEgfTtcclxuIiwiaW1wb3J0IHsgZ2V0QVBJRGF0YSB9IGZyb20gXCIuL2NvbnRyb2xsZXJzXCI7XHJcblxyXG5jb25zdCBnZXRDaXR5ID0gZSA9PiB7XHJcbiAgaWYgKGUgPT09IFwibG9uZG9uXCIpIHtcclxuICAgIGNvbnN0IHJlcXVpcmVkRGF0YSA9IGdldEFQSURhdGEoXCJsb25kb25cIik7XHJcbiAgICByZXF1aXJlZERhdGEudGhlbihkYXRhID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgIGNyZWF0ZURhaWx5KGRhdGEpO1xyXG4gICAgICBsb2FkSW50ZXJmYWNlKGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHNlYXJjaGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoYmFyXCIpO1xyXG4gICAgY29uc3Qgc2VhcmNoZWRDaXR5ID0gc2VhcmNoYmFyLnZhbHVlO1xyXG4gICAgY29uc29sZS5sb2coc2VhcmNoZWRDaXR5KTtcclxuICAgIGNvbnN0IHJlcXVpcmVkRGF0YSA9IGdldEFQSURhdGEoc2VhcmNoZWRDaXR5KTtcclxuICAgIHJlcXVpcmVkRGF0YS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgbG9hZEludGVyZmFjZShkYXRhKTtcclxuICAgICAgbG9hZERhaWx5KGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9hZEludGVyZmFjZSA9IGRhdGEgPT4ge1xyXG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XHJcbiAgY2l0eU5hbWUudGV4dENvbnRlbnQgPSBkYXRhLmNpdHkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBjdXJyZW50SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1pY29uXCIpO1xyXG4gIGN1cnJlbnRJY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDJ4LnBuZ2A7XHJcbiAgY3VycmVudEljb24uYWx0ID0gYCR7ZGF0YS5kZXNjcmlwdGlvbn1gO1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XHJcbiAgdGVtcC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoZGF0YS50ZW1wKTtcclxuICBjb25zdCBkYXlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXktbmFtZVwiKTtcclxuICBkYXlOYW1lLnRleHRDb250ZW50ID0gZGF0YS5kYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLUVOXCIsIHtcclxuICAgIHdlZWtkYXk6IFwibG9uZ1wiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjXCIpO1xyXG4gIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID1cclxuICAgIGRhdGEuZGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBkYXRhLmRlc2NyaXB0aW9uLnNsaWNlKDEpO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWNpcGl0YXRpb25cIik7XHJcbiAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IGBQcmVjaXBpdGF0aW9uOiAke2RhdGEuZGFpbHlEYXRhWzBdLnBvcCAqIDEwMH0lYDtcclxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XHJcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5odW1pZGl0eX0lYDtcclxuICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kXCIpO1xyXG4gIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPCA0NSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkWA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gNDUgJiYgZGF0YS53aW5kRGlyZWN0aW9uIDwgOTApIHtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHtkYXRhLndpbmRTcGVlZH0ga20vaCDihpdgO1xyXG4gIH0gZWxzZSBpZiAoZGF0YS53aW5kRGlyZWN0aW9uID49IDkwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDEzNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkmA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMTM1ICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDE4MCkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGmGA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMTgwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDIyNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGk2A7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMjI1ICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDI3MCkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGmWA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMjcwICYmIGRhdGEud2luZERpcmVjdGlvbiA8IDMxNSkge1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2RhdGEud2luZFNwZWVkfSBrbS9oIOKGkGA7XHJcbiAgfSBlbHNlIGlmIChkYXRhLndpbmREaXJlY3Rpb24gPj0gMzE1KSB7XHJcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7ZGF0YS53aW5kU3BlZWR9IGttL2gg4oaWYDtcclxuICB9XHJcbiAgY2hhbmdlQ29sb3JzKGRhdGEudGVtcCk7XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVEYWlseSA9IGRhdGEgPT4ge1xyXG4gIGNvbnN0IGRhaWx5RGF0YSA9IGRhdGEuZGFpbHlEYXRhO1xyXG4gIGRhaWx5RGF0YS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICBjb25zdCBkYWlseUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYWlseUJveC5jbGFzc0xpc3QuYWRkKFwiZGFpbHktYm94XCIpO1xyXG4gICAgY29uc3QgZGF5TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYXlOYW1lLmNsYXNzTGlzdC5hZGQoXCJzaG9ydC1kYXktbmFtZVwiKTtcclxuICAgIGRheU5hbWUudGV4dENvbnRlbnQgPSBkYXkuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICAgIHdlZWtkYXk6IFwic2hvcnRcIixcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgd2VhdGhlckljb24uY2xhc3NMaXN0LmFkZChcIndlYXRoZXItaWNvblwiKTtcclxuICAgIHdlYXRoZXJJY29uLnNyYyA9IGBodHRwczovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXkuaWNvbn1AMngucG5nYDtcclxuICAgIHdlYXRoZXJJY29uLmFsdCA9IGAke2RheS5kZXNjcmlwdGlvbn1gO1xyXG4gICAgY29uc3QgdHdvVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0d29UZW1wLmNsYXNzTGlzdC5hZGQoXCJ0d28tdGVtcFwiKTtcclxuICAgIGNvbnN0IGRhaWx5VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkYWlseVRlbXAuY2xhc3NMaXN0LmFkZChcImRhaWx5LXRlbXBcIik7XHJcbiAgICBkYWlseVRlbXAudGV4dENvbnRlbnQgPSBgJHtNYXRoLnJvdW5kKGRheS50ZW1wKX3CsGA7XHJcbiAgICBjb25zdCBuaWdodGx5VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBuaWdodGx5VGVtcC5jbGFzc0xpc3QuYWRkKFwibmlnaHQtdGVtcFwiKTtcclxuICAgIG5pZ2h0bHlUZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChkYXkubmlnaHRUZW1wKX3CsGA7XHJcbiAgICB0d29UZW1wLmFwcGVuZENoaWxkKGRhaWx5VGVtcCk7XHJcbiAgICB0d29UZW1wLmFwcGVuZENoaWxkKG5pZ2h0bHlUZW1wKTtcclxuICAgIGRhaWx5Qm94LmFwcGVuZENoaWxkKGRheU5hbWUpO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQod2VhdGhlckljb24pO1xyXG4gICAgZGFpbHlCb3guYXBwZW5kQ2hpbGQodHdvVGVtcCk7XHJcbiAgICBjb25zdCBkYWlseVNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhaWx5LXNpZGVcIik7XHJcbiAgICBkYWlseVNpZGUuYXBwZW5kQ2hpbGQoZGFpbHlCb3gpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgbG9hZERhaWx5ID0gZGF0YSA9PiB7XHJcbiAgY29uc3QgZGFpbHlEYXRhID0gZGF0YS5kYWlseURhdGE7XHJcbiAgZGFpbHlEYXRhLmZvckVhY2goKGRheSwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IGRheU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNob3J0LWRheS1uYW1lXCIpO1xyXG4gICAgZGF5TmFtZS5mb3JFYWNoKChkLCBpKSA9PiB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gaSkge1xyXG4gICAgICAgIGQudGV4dENvbnRlbnQgPSBkYXkuZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1FTlwiLCB7XHJcbiAgICAgICAgICB3ZWVrZGF5OiBcInNob3J0XCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndlYXRoZXItaWNvblwiKTtcclxuICAgIHdlYXRoZXJJY29uLmZvckVhY2goKGljb24sIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgaWNvbi5zcmMgPSBgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duLyR7ZGF5Lmljb259QDJ4LnBuZ2A7XHJcbiAgICAgICAgaWNvbi5hbHQgPSBkYXkuZGVzY3JpcHRpb247XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgZGFpbHlUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYWlseS10ZW1wXCIpO1xyXG4gICAgZGFpbHlUZW1wLmZvckVhY2goKHQsIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5LnRlbXApfcKwYDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBuaWdodGx5VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmlnaHQtdGVtcFwiKTtcclxuICAgIG5pZ2h0bHlUZW1wLmZvckVhY2goKHQsIGkpID0+IHtcclxuICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoZGF5Lm5pZ2h0VGVtcCl9wrBgO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGNoYW5nZVN5c3RlbSA9IGUgPT4ge1xyXG4gIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XHJcbiAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcclxuICBjb25zdCBkYWlseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRhaWx5LXRlbXBcIik7XHJcbiAgY29uc3QgbmlnaHRseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5pZ2h0LXRlbXBcIik7XHJcblxyXG4gIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiZmFocmVuaGVpdFwiKSB7XHJcbiAgICB0ZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCh0ZW1wLnRleHRDb250ZW50ICogMS44ICsgMzIpfWA7XHJcbiAgICBkYWlseVRlbXAuZm9yRWFjaCh0ID0+IHtcclxuICAgICAgbGV0IGYgPSB0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAqIDEuOCArIDMyO1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChmKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIG5pZ2h0bHlUZW1wLmZvckVhY2godCA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHQudGV4dENvbnRlbnQpO1xyXG4gICAgICBsZXQgZiA9IHQudGV4dENvbnRlbnQuc2xpY2UoMCwgLTEpICogMS44ICsgMzI7XHJcbiAgICAgIGNvbnNvbGUubG9nKGYpO1xyXG4gICAgICB0LnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChmKX3CsGA7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHdpbmRBcnIgPSB3aW5kLnRleHRDb250ZW50LnNwbGl0KFwiIFwiKTtcclxuICAgIGxldCB3aW5kU3BlZWQgPSB3aW5kQXJyWzFdO1xyXG4gICAgd2luZFNwZWVkID0gKHdpbmRTcGVlZCAqIDAuNjIxMzcxKS50b0ZpeGVkKDIpO1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke3dpbmRTcGVlZH0gbXBoICR7d2luZEFyclszXX1gO1xyXG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNlbHNpdXNcIik7XHJcbiAgICBjZWxzaXVzLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IFwiY2Vsc2l1c1wiKSB7XHJcbiAgICB0ZW1wLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZCgodGVtcC50ZXh0Q29udGVudCAtIDMyKSAvIDEuOCl9YDtcclxuICAgIGRhaWx5VGVtcC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICBsZXQgYyA9ICh0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAtIDMyKSAvIDEuODtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoYyl9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBuaWdodGx5VGVtcC5mb3JFYWNoKHQgPT4ge1xyXG4gICAgICBsZXQgYyA9ICh0LnRleHRDb250ZW50LnNsaWNlKDAsIC0xKSAtIDMyKSAvIDEuODtcclxuICAgICAgdC50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoYyl9wrBgO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCB3aW5kQXJyID0gd2luZC50ZXh0Q29udGVudC5zcGxpdChcIiBcIik7XHJcbiAgICBsZXQgd2luZFNwZWVkID0gd2luZEFyclsxXTtcclxuICAgIHdpbmRTcGVlZCA9ICh3aW5kU3BlZWQgKiAxLjYwOTM0NCkudG9GaXhlZCgyKTtcclxuICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHt3aW5kU3BlZWR9IGttL2ggJHt3aW5kQXJyWzNdfWA7XHJcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgY29uc3QgZmFocmVuaGVpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmFocmVuaGVpdFwiKTtcclxuICAgIGZhaHJlbmhlaXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjaGFuZ2VDb2xvcnMgPSBkYXRhID0+IHtcclxuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoYmFyXCIpO1xyXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJ1dHRvblwiKTtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgY29uc3QgZGFpbHlCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRhaWx5LWJveFwiKTtcclxuXHJcbiAgaWYgKGRhdGEgPD0gNSkge1xyXG4gICAgaW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTY3MTg5XCI7XHJcbiAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTY3MTg5XCI7XHJcbiAgICBkYWlseUJveC5mb3JFYWNoKGJveCA9PiB7XHJcbiAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM1NjcxODlcIjtcclxuICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwibm9uZVwiO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJcIjtcclxuICAgICAgfSwgMTApO1xyXG4gICAgfSk7XHJcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0ZBRDZBNVwiO1xyXG4gIH0gZWxzZSBpZiAoZGF0YSA8PSAxMCAmJiBkYXRhID4gNSkge1xyXG4gICAgaW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRkZEOEE5XCI7XHJcbiAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRkZEOEE5XCI7XHJcbiAgICBkYWlseUJveC5mb3JFYWNoKGJveCA9PiB7XHJcbiAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGRkQ4QTlcIjtcclxuICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwibm9uZVwiO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJcIjtcclxuICAgICAgfSwgMTApO1xyXG4gICAgfSk7XHJcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0UzOEIyOVwiO1xyXG4gIH0gZWxzZSBpZiAoZGF0YSA8PSAxNSAmJiBkYXRhID4gMTApIHtcclxuICAgIGlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0Y3QTRBNFwiO1xyXG4gICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI0Y3QTRBNFwiO1xyXG4gICAgZGFpbHlCb3guZm9yRWFjaChib3ggPT4ge1xyXG4gICAgICBib3guc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRjdBNEE0XCI7XHJcbiAgICAgIGJveC5zdHlsZS5hbmltYXRpb24gPSBcIm5vbmVcIjtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwiXCI7XHJcbiAgICAgIH0sIDEwKTtcclxuICAgIH0pO1xyXG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNCNkUyQTFcIjtcclxuICB9IGVsc2UgaWYgKGRhdGEgPiAxNSkge1xyXG4gICAgaW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOUNGRjJFXCI7XHJcbiAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOUNGRjJFXCI7XHJcbiAgICBkYWlseUJveC5mb3JFYWNoKGJveCA9PiB7XHJcbiAgICAgIGJveC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM5Q0ZGMkVcIjtcclxuICAgICAgYm94LnN0eWxlLmFuaW1hdGlvbiA9IFwibm9uZVwiO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBib3guc3R5bGUuYW5pbWF0aW9uID0gXCJcIjtcclxuICAgICAgfSwgMTApO1xyXG4gICAgfSk7XHJcbiAgICBib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzIxOTJGRlwiO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IGdldENpdHksIGNoYW5nZVN5c3RlbSB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNoYW5nZVN5c3RlbSwgZ2V0Q2l0eSB9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5cclxuY29uc3QgbG9uZG9uID0gZ2V0Q2l0eShcImxvbmRvblwiKTtcclxud2luZG93Lm9ubG9hZCA9IGxvbmRvbjtcclxuXHJcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJ1dHRvblwiKTtcclxuc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRDaXR5KTtcclxuXHJcbmNvbnN0IGNlbHNpdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNlbHNpdXNcIik7XHJcbmNvbnN0IGZhaHJlbmhlaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhaHJlbmhlaXRcIik7XHJcbmNlbHNpdXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVN5c3RlbSk7XHJcbmZhaHJlbmhlaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNoYW5nZVN5c3RlbSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
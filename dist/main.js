/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const getAPIData = async searchedCity => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const city = data.name;
  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const main = data.weather[0].main;
  const windSpeed = data.wind.speed;
  const requiredData = {
    city,
    temp,
    humidity,
    pressure,
    description,
    icon,
    main,
    windSpeed,
  };
  console.log(requiredData);
};

const getCity = e => {
  e.preventDefault();
  const searchbar = document.querySelector("#searchbar");
  const searchedCity = searchbar.value;
  console.log(searchedCity);
  getAPIData(searchedCity);
};

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", getCity);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsbUVBQW1FLGFBQWE7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXRBUElEYXRhID0gYXN5bmMgc2VhcmNoZWRDaXR5ID0+IHtcclxuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke3NlYXJjaGVkQ2l0eX0mYXBwaWQ9MDliMzgwNGMwZWFiZmM0OGEwNzlmMThlYWViYzUzYjkmdW5pdHM9bWV0cmljYDtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICBjb25zdCBjaXR5ID0gZGF0YS5uYW1lO1xyXG4gIGNvbnN0IHRlbXAgPSBkYXRhLm1haW4udGVtcDtcclxuICBjb25zdCBodW1pZGl0eSA9IGRhdGEubWFpbi5odW1pZGl0eTtcclxuICBjb25zdCBwcmVzc3VyZSA9IGRhdGEubWFpbi5wcmVzc3VyZTtcclxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcclxuICBjb25zdCBpY29uID0gZGF0YS53ZWF0aGVyWzBdLmljb247XHJcbiAgY29uc3QgbWFpbiA9IGRhdGEud2VhdGhlclswXS5tYWluO1xyXG4gIGNvbnN0IHdpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcclxuICBjb25zdCByZXF1aXJlZERhdGEgPSB7XHJcbiAgICBjaXR5LFxyXG4gICAgdGVtcCxcclxuICAgIGh1bWlkaXR5LFxyXG4gICAgcHJlc3N1cmUsXHJcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGljb24sXHJcbiAgICBtYWluLFxyXG4gICAgd2luZFNwZWVkLFxyXG4gIH07XHJcbiAgY29uc29sZS5sb2cocmVxdWlyZWREYXRhKTtcclxufTtcclxuXHJcbmNvbnN0IGdldENpdHkgPSBlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3Qgc2VhcmNoYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hiYXJcIik7XHJcbiAgY29uc3Qgc2VhcmNoZWRDaXR5ID0gc2VhcmNoYmFyLnZhbHVlO1xyXG4gIGNvbnNvbGUubG9nKHNlYXJjaGVkQ2l0eSk7XHJcbiAgZ2V0QVBJRGF0YShzZWFyY2hlZENpdHkpO1xyXG59O1xyXG5cclxuY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtYnV0dG9uXCIpO1xyXG5zZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdldENpdHkpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
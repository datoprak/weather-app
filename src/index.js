import { changeSystem, getCity } from "./interface";

const london = getCity("london");
window.onload = london;

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", getCity);

const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");
celsius.addEventListener("click", changeSystem);
fahrenheit.addEventListener("click", changeSystem);

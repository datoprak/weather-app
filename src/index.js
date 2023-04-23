import { getCity } from "./interface";

const london = getCity("london");
window.onload = london;

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", getCity);

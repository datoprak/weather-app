import { getAPIData } from "./controllers";

const getCity = e => {
  e.preventDefault();
  const searchbar = document.querySelector("#searchbar");
  const searchedCity = searchbar.value;
  console.log(searchedCity);
  getAPIData(searchedCity);
};

export { getCity };

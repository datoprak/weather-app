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

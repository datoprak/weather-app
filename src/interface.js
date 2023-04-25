import { getAPIData } from "./controllers";

const getCity = e => {
  if (e === "london") {
    const requiredData = getAPIData("london");
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
    const requiredData = getAPIData(searchedCity);
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

export { getCity, changeSystem };

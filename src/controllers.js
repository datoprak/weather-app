const getAPIData = async searchedCity => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric`;
  const url2 =
    "https://api.openweathermap.org/data/2.5/weather?q=london&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric";
  const response = await fetch(url2);
  const data = await response.json();
  console.log(data);

  const lon = data.coord.lon;
  const lat = data.coord.lat;

  const dailyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric`;
  const dailyResponse = await fetch(dailyUrl);
  const dailyData = await dailyResponse.json();
  const daily = dailyData.daily;
  const current = dailyData.current;
  console.log(current);
  //daily.shift();

  processData(data, daily);
};

const processData = (data, daily) => {
  const city = data.name;
  const temp = data.main.temp;
  const feel = data.main.feels_like;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const main = data.weather[0].main;
  const windSpeed = data.wind.speed;
  const windDirection = data.wind.deg;
  const cloud = data.clouds.all;

  console.log(daily);
  const requiredDailyData = [];
  daily.forEach(day => {
    let obj = {};
    const temp = day.temp.day;
    const feel = day.feels_like.day;
    const humidity = day.humidity;
    const description = day.weather[0].description;
    const icon = day.weather[0].icon;
    const main = day.weather[0].main;
    const windSpeed = day.wind_speed;
    const windDirection = day.wind_deg;
    const cloud = day.clouds;
    obj = {
      temp,
      feel,
      humidity,
      description,
      icon,
      main,
      windSpeed,
      windDirection,
      cloud,
    };
    requiredDailyData.push(obj);
  });

  const requiredData = {
    city,
    temp,
    feel,
    humidity,
    description,
    icon,
    main,
    windSpeed,
    windDirection,
    cloud,
    requiredDailyData,
  };
  console.log(requiredData);
};

export { getAPIData };

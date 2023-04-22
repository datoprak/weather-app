const getAPIData = async () => {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=london&appid=09b3804c0eabfc48a079f18eaebc53b9&units=metric"
  );
  const data = await response.json();
  console.log(data);
};

getAPIData();

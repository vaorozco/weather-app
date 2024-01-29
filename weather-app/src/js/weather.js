const title = document.getElementById("header");
const status = document.getElementById("status");
const temperature = document.getElementById("temperature");

//function to retrieve any Api
export const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

//get weather, executes first api url, then send data to search for coords
//after getting coordinates of the zipcode, execute function to get forecast
export const getWeather = async (url) => {
  const data = await getData(url);
  const coordinates = parseZipCode(data);
  getForecast(coordinates);
};

//looks for coordinates
const parseZipCode = (data) => {
  const { city, latitude, longitude } = data;
  title.innerHTML = `Weather Forecast For ${city}`;
  return {
    latitude,
    longitude,
  };
};

//retrieves data based on coords and date, returns data with only the first 3 days
const getForecast = async (coordinates) => {
  const date = new Date().toLocaleDateString("en-US"); //US date format mm/dd/yyyy
  const { latitude, longitude } = coordinates;
  const url = "https://se-weather-api.herokuapp.com/api/v1/forecast";
  let weatherUrl = new URL(url);
  weatherUrl.search = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    date: date,
  });
  const forecastData = await getData(weatherUrl);
  const { daily } = forecastData;

  let weekInfo = {
    days: {},
  };

  for (let i = 0; i < 3; i++) {
    const { icon, temperatureLow, temperatureHigh } = daily.data[i];
    let currentDay = {
      icon: icon,
      tempLow: temperatureLow,
      tempHigh: temperatureHigh,
    };
    weekInfo.days[i] = currentDay;
  }
  renderData(weekInfo);
};

const renderData = (weekInfo) => {
  //rendering values only for today
  status.innerHTML = weekInfo.days[0].icon;
  temperature.innerHTML = `${weekInfo.days[0].tempLow}&deg; / ${weekInfo.days[0].tempHigh}&deg;`;
  //ideally implement for loop to iterate over the rest html cards and assign value for the upcoming days
};

import { getWeather } from "./weather";

const apiUrl = "https://se-weather-api.herokuapp.com/api/v1/geo";
let zipCodeUrl = new URL(apiUrl);

//query parameters
zipCodeUrl.search = new URLSearchParams({
  zip_code: "90210", //change for spefic zip code
});

getWeather(zipCodeUrl);

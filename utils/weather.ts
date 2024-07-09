import axios from "axios";
import { City } from "../types/city";

export function getCityWeathers(
  cities: Array<string>,
  cityCardInfo: Array<City>,
  setIsLoading: (isLoading: boolean) => void
): Array<City> {
  cities.forEach(async (city: string, index) => {
    const response: any = await axios
      .post("api/weather-api", {
        targetUrl: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`,
        method: "POST",
      })
      .catch((e) => {
        console.error(e);
      });

    cityCardInfo.push({
      name: city,
      weather: response.data.weather[0].description,
      weatherIcon: response.data.weather[0].icon,
      temp_max: response.data.main.temp_max,
      temp_min: response.data.main.temp_min,
    });

    console.log("cityCardInfo: ", cityCardInfo);
    // // Index number starts from 0. So I added 1.
    if (cityCardInfo.length === index + 1) {
      setIsLoading(false);
    }
  });

  return cityCardInfo;
}

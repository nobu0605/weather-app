import axios from "axios";
import { City } from "../types/city";

export function getCityWeather(
  cities: Array<string>,
  cityCardInfo: Array<City>,
  setIsLoading: (isLoading: boolean) => void
): Array<City> {
  cities.forEach(async (city, index) => {
    await axios
      .post(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
      )
      .then((response: any) => {
        cityCardInfo.push({
          name: city,
          weather: response.data.weather[0].description,
          weatherIcon: response.data.weather[0].icon,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
        });
        if (cities.length === index + 1) {
          setIsLoading(false);
        }
      });
  });

  return cityCardInfo;
}

import axios from "axios";
import { City } from "../types/city";

export async function getCityWeathers(
  cities: Array<string>,
  setIsLoading: (isLoading: boolean) => void,
  setCityCardInfo: (cityCardInfo: Array<City>) => void
): Promise<void> {
  const promises = cities.map(async (city: string) => {
    try {
      const response = await axios.post("api/weather-api", {
        targetUrl: `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}`,
        method: "POST",
      });

      return {
        name: city,
        weather: response.data.weather[0].description,
        weatherIcon: response.data.weather[0].icon,
        temp_max: response.data.main.temp_max,
        temp_min: response.data.main.temp_min,
      };
    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error);
      return null; // or handle error as needed
    }
  });

  try {
    const cityCardInfo = (await Promise.all(
      promises.filter((p) => p !== null)
    )) as Array<City>;

    setIsLoading(false);
    setCityCardInfo(cityCardInfo);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setIsLoading(false);
  }
}

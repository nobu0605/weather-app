import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/pages/world-weather.module.scss";
import axios from "axios";
import { worldCities } from "../constants/cities";
import { Dimmer, Loader } from "semantic-ui-react";
import { City } from "../types/city";

export default function WorldWeather(): JSX.Element {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCityWeather();
  }, []);

  function getCityWeather() {
    worldCities.forEach(async (worldCity, index) => {
      await axios
        .post(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${worldCity}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
        )
        .then((response: any) => {
          cities.push({
            name: worldCity,
            weather: response.data.weather[0].description,
            weatherIcon: response.data.weather[0].icon,
            temp_max: response.data.main.temp_max,
            temp_min: response.data.main.temp_min,
          });
          setCities(cities);
          // Index number starts from 0. So I added 1.
          if (worldCities.length === index + 1) {
            setIsLoading(false);
          }
        });
    });
  }

  if (isLoading) {
    return (
      <Dimmer active={true} inverted>
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }

  let trimedName = "";
  return (
    <div className={styles["world-wrapper"]}>
      <Header />
      <div className={styles["world-wrapper__container"]}>
        <div className={styles["world-wrapper__world-map"]}>
          <ul className={styles["cities"]}>
            {cities.map((city: City, Index: number) => {
              trimedName = city.name.replace(/\s/g, "");
              return (
                <li className={styles[`cities__${trimedName}`]} key={Index}>
                  <span className={styles[`cities__name`]}>{city.name}</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${city.weatherIcon}@2x.png`}
                    alt="weather icon"
                    width="40"
                    height="40"
                  />
                  <span>
                    <span style={{ color: "red" }}>
                      {Math.floor(city.temp_max)}
                    </span>
                    &nbsp;/&nbsp;
                    <span style={{ color: "blue" }}>
                      {Math.floor(city.temp_min)}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

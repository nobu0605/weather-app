import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/pages/index.module.scss";
import axios from "axios";
import { japanCities } from "../constants/cities";
import { Dimmer, Loader } from "semantic-ui-react";

export default function Home(): JSX.Element {
  type City = {
    name: string;
    weather: string;
    weatherIcon: string;
  };

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCityWeather();
  }, []);

  function getCityWeather() {
    japanCities.forEach(async (japanCity, index) => {
      await axios
        .post(
          `https://api.openweathermap.org/data/2.5/weather?q=${japanCity}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY}`
        )
        .then((response: any) => {
          cities.push({
            name: japanCity,
            weather: response.data.weather[0].description,
            weatherIcon: response.data.weather[0].icon,
          });
          setCities(cities);
          // Index number starts from 0. So I added 1.
          if (japanCities.length === index + 1) {
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

  return (
    <div className={styles["home-wrapper"]}>
      <Header />
      <div className={styles["home-wrapper__container"]}>
        <div className={styles["home-wrapper__japan-map"]}>
          <ul className={styles["cities"]}>
            {cities.map((city: City, Index: number) => {
              return (
                <li className={styles[`cities__${city.name}`]} key={Index}>
                  <span className={styles[`cities__name`]}>{city.name}</span>
                  <span>{city.weather}</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${city.weatherIcon}@2x.png`}
                    alt="weather icon"
                    width="40"
                    height="40"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

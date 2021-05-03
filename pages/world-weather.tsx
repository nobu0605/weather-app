import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/pages/world-weather.module.scss";
import { Dimmer, Loader } from "semantic-ui-react";
import { City } from "../types/city";
import { worldCities } from "../constants/cities";
import { getCityWeather } from "../utils/weather";
import CityCard from "../components/CityCard";

export default function WorldWeather(): JSX.Element {
  const [cityCardInfo, setCityCardInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const result = getCityWeather(worldCities, cityCardInfo, setIsLoading);
    setCityCardInfo(result);
  }, []);

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
      <h1 className={styles["world-wrapper__title"]}>
        Current weather in the world
      </h1>
      <div className={styles["world-wrapper__container"]}>
        <div className={styles["world-wrapper__world-map"]}>
          <ul className={styles["cities"]}>
            {cityCardInfo.map((city: City, Index: number) => {
              trimedName = city.name.replace(/\s/g, "");
              return (
                <CityCard key={Index} city={city} nameForStyle={trimedName} />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

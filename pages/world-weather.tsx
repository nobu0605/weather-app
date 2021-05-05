import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/pages/world-weather.module.scss";
import { Dimmer, Loader } from "semantic-ui-react";
import { City } from "../types/city";
import { worldCities } from "../constants/cities";
import { getCityWeather } from "../utils/weather";
import CityCard from "../components/CityCard";
import CityList from "../components/CityList";
import { worldCitiesInRegion } from "../constants/cities";
import { worldRegions } from "../constants/regions";

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
        <Header />
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }

  let trimedCityName = "";

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
              trimedCityName = city.name.replace(/\s/g, "");
              return (
                <CityCard
                  key={Index}
                  city={city}
                  nameForStyle={trimedCityName}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <CityList regions={worldRegions} citiesInRegion={worldCitiesInRegion} />
      <Footer />
    </div>
  );
}

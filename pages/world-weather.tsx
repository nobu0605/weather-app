import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import CustomHead from "../components/CustomHead";
import Footer from "../components/Footer";
import styles from "../styles/pages/world-weather.module.scss";
import { Dimmer, Loader } from "semantic-ui-react";
import { City } from "../types/city";
import { worldCities } from "../constants/cities";
import { getCityWeathers } from "../utils/weather";
import CityCard from "../components/CityCard";
import CityList from "../components/CityList";
import { worldCitiesInRegion } from "../constants/cities";
import { worldRegions } from "../constants/regions";

export default function WorldWeather(): JSX.Element {
  const [cityCardInfo, setCityCardInfo] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ogpContents = {
    title: "Weather app",
    description: "Weather app",
    keyword: "Weather app",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/world-ogp.jpg`,
    url: "https://weather-data-application.herokuapp.com/world-weather",
  };

  useEffect(() => {
    getCityWeathers(worldCities, setIsLoading, setCityCardInfo);
  }, []);

  if (isLoading && worldCities.length !== cityCardInfo.length) {
    return (
      <Dimmer active={true} inverted>
        <CustomHead contents={ogpContents} />
        <Loader inline="centered" size="huge">
          Loading
        </Loader>
      </Dimmer>
    );
  }

  let trimedCityName = "";

  return (
    <div className={styles["world-wrapper"]}>
      <Header contents={ogpContents} />
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
